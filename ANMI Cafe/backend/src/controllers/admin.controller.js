import Publicacion from '../models/Publicacion.js';
import Comentario from '../models/Comentario.js';
import OpinionRestaurante from '../models/OpinionRestaurante.js';
import ResenaProducto from '../models/ResenaProducto.js';

// Lista de palabras negativas (básica - en producción usar ML o API externa)
const palabrasNegativas = [
  'malo', 'terrible', 'pésimo', 'horrible', 'desastre', 'porquería',
  'asqueroso', 'disgusto', 'asco', 'decepción', 'fraude', 'estafa'
];

// Función para detectar contenido negativo
const esContenidoNegativo = (texto) => {
  const textoLower = texto.toLowerCase();
  return palabrasNegativas.some(palabra => textoLower.includes(palabra));
};

// GET /api/admin/content?filter=negative - Obtener contenido según filtro
export const obtenerContenido = async (req, res) => {
  try {
    const { filter = 'all', tipo, limite = 50, pagina = 1 } = req.query;
    
    let resultados = [];

    // Recopilar todo el contenido
    if (!tipo || tipo === 'publicaciones') {
      const publicaciones = await Publicacion.find()
        .populate('usuario_id', 'nombre email')
        .sort({ createdAt: -1 });

      publicaciones.forEach(pub => {
        const esNegativo = esContenidoNegativo(pub.texto_anecdota || '');
        if (filter === 'all' || (filter === 'negative' && esNegativo)) {
          resultados.push({
            id: pub._id,
            tipo: 'publicacion',
            contenido: pub.texto_anecdota,
            usuario: pub.usuario_id,
            fecha: pub.createdAt,
            esNegativo
          });
        }
      });
    }

    if (!tipo || tipo === 'comentarios') {
      const comentarios = await Comentario.find()
        .populate('usuario_id', 'nombre email')
        .sort({ createdAt: -1 });

      comentarios.forEach(com => {
        const esNegativo = esContenidoNegativo(com.contenido || '');
        if (filter === 'all' || (filter === 'negative' && esNegativo)) {
          resultados.push({
            id: com._id,
            tipo: 'comentario',
            contenido: com.contenido,
            usuario: com.usuario_id,
            fecha: com.createdAt,
            esNegativo
          });
        }
      });
    }

    if (!tipo || tipo === 'opiniones') {
      const opiniones = await OpinionRestaurante.find()
        .populate('usuario_id', 'nombre email')
        .populate('restaurante_id', 'nombre')
        .sort({ createdAt: -1 });

      opiniones.forEach(op => {
        const esNegativo = op.calificacion <= 2 || esContenidoNegativo(op.opinion || '');
        if (filter === 'all' || (filter === 'negative' && esNegativo)) {
          resultados.push({
            id: op._id,
            tipo: 'opinion_restaurante',
            contenido: op.opinion,
            calificacion: op.calificacion,
            restaurante: op.restaurante_id,
            usuario: op.usuario_id,
            fecha: op.createdAt,
            esNegativo
          });
        }
      });
    }

    if (!tipo || tipo === 'resenas') {
      const resenas = await ResenaProducto.find()
        .populate('usuario_id', 'nombre email')
        .populate('producto_id', 'nombre')
        .sort({ createdAt: -1 });

      resenas.forEach(res => {
        const esNegativo = res.calificacion <= 2 || esContenidoNegativo(res.comentario || '');
        if (filter === 'all' || (filter === 'negative' && esNegativo)) {
          resultados.push({
            id: res._id,
            tipo: 'resena_producto',
            contenido: res.comentario,
            calificacion: res.calificacion,
            producto: res.producto_id,
            usuario: res.usuario_id,
            fecha: res.createdAt,
            esNegativo
          });
        }
      });
    }

    // Ordenar por fecha más reciente
    resultados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Paginación
    const inicio = (parseInt(pagina) - 1) * parseInt(limite);
    const fin = inicio + parseInt(limite);
    const resultadosPaginados = resultados.slice(inicio, fin);

    res.json({
      contenido: resultadosPaginados,
      estadisticas: {
        total: resultados.length,
        negativos: resultados.filter(r => r.esNegativo).length,
        positivos: resultados.filter(r => !r.esNegativo).length
      },
      paginacion: {
        total: resultados.length,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(resultados.length / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener contenido',
      mensaje: error.message 
    });
  }
};

// DELETE /api/admin/content/:id - Eliminar contenido
export const eliminarContenido = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.query; // publicacion, comentario, opinion, resena

    if (!tipo) {
      return res.status(400).json({ 
        error: 'Se requiere el parámetro "tipo" (publicacion, comentario, opinion, resena)' 
      });
    }

    let resultado;

    switch (tipo) {
      case 'publicacion':
        resultado = await Publicacion.findByIdAndDelete(id);
        // También eliminar sus comentarios
        await Comentario.deleteMany({ post_id: id });
        break;

      case 'comentario':
        resultado = await Comentario.findByIdAndDelete(id);
        break;

      case 'opinion':
        resultado = await OpinionRestaurante.findByIdAndDelete(id);
        break;

      case 'resena':
        resultado = await ResenaProducto.findByIdAndDelete(id);
        break;

      default:
        return res.status(400).json({ 
          error: 'Tipo inválido. Use: publicacion, comentario, opinion o resena' 
        });
    }

    if (!resultado) {
      return res.status(404).json({ error: 'Contenido no encontrado' });
    }

    res.json({
      mensaje: 'Contenido eliminado exitosamente',
      tipo,
      id
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar contenido',
      mensaje: error.message 
    });
  }
};
