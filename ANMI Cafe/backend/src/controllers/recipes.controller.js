import RecetaUGC from '../models/RecetaUGC.js';
import RecetaOficial from '../models/RecetaOficial.js';
import { recetaUGCSchema } from '../schemas/index.js';

// POST /api/recipes-ugc - Crear receta colaborativa

export const crearRecetaUGC = async (req, res) => {
  try {
    const datosValidados = recetaUGCSchema.parse(req.body);
    // Si se recibe foto, se guarda en el campo correspondiente
    const nuevaReceta = await RecetaUGC.create({
      ...datosValidados,
      usuario_id: req.usuario._id,
      calificacion_promedio: 0,
      foto: datosValidados.foto || ''
    });

    await nuevaReceta.populate('usuario_id', 'nombre email');

    res.status(201).json({
      mensaje: 'Receta creada exitosamente',
      receta: nuevaReceta
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al crear receta',
      mensaje: error.message 
    });
  }
};

// GET /api/recipes-ugc - Obtener recetas colaborativas
export const obtenerRecetasUGC = async (req, res) => {
  try {
    const { filtro_fruta, limite = 20, pagina = 1 } = req.query;
    
    const filtro = {};
    if (filtro_fruta) {
      filtro.filtro_fruta = filtro_fruta;
    }

    const recetas = await RecetaUGC.find(filtro)
      .populate('usuario_id', 'nombre email')
      .sort({ calificacion_promedio: -1, createdAt: -1 })
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await RecetaUGC.countDocuments(filtro);

    res.json({
      recetas,
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener recetas',
      mensaje: error.message 
    });
  }
};

// POST /api/recipes-ugc/:id/rate - Calificar receta
export const calificarReceta = async (req, res) => {
  try {
    const { id } = req.params;
    const { calificacion } = req.body;

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ 
        error: 'La calificación debe estar entre 1 y 5' 
      });
    }

    const receta = await RecetaUGC.findById(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    // Aquí podrías implementar lógica para evitar calificaciones duplicadas
    // Por ahora, solo actualizamos el promedio de manera simple
    const nuevaCalificacion = ((receta.calificacion_promedio * 10) + calificacion) / 11;
    receta.calificacion_promedio = parseFloat(nuevaCalificacion.toFixed(2));
    
    await receta.save();

    res.json({
      mensaje: 'Calificación registrada exitosamente',
      receta: {
        id: receta._id,
        titulo: receta.titulo,
        calificacion_promedio: receta.calificacion_promedio
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al calificar receta',
      mensaje: error.message 
    });
  }
};

// DELETE /api/recipes-ugc/:id - Eliminar receta (usuario o admin)
export const eliminarRecetaUGC = async (req, res) => {
  try {
    const { id } = req.params;
    const { justificacion } = req.body;
    
    const receta = await RecetaUGC.findById(id);
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    // Si es admin, requiere justificación
    if (req.usuario.role === 'admin') {
      if (!justificacion || justificacion.trim().length < 10) {
        return res.status(400).json({ 
          error: 'Los administradores deben proporcionar una justificación de al menos 10 caracteres' 
        });
      }
      // Aquí podrías registrar la acción del admin en un log
      console.log(`Admin ${req.usuario.email} eliminó receta ${id}. Justificación: ${justificacion}`);
    } else {
      // Si no es admin, verificar que sea el creador
      if (receta.usuario_id.toString() !== req.usuario._id.toString()) {
        return res.status(403).json({ 
          error: 'No tienes permiso para eliminar esta receta' 
        });
      }
    }

    await RecetaUGC.findByIdAndDelete(id);

    res.json({
      mensaje: 'Receta eliminada exitosamente',
      eliminadaPor: req.usuario.role === 'admin' ? 'admin' : 'usuario',
      ...(req.usuario.role === 'admin' && { justificacion })
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar receta',
      mensaje: error.message 
    });
  }
};

// GET /api/recipes-official - Obtener recetas oficiales
export const obtenerRecetasOficiales = async (req, res) => {
  try {
    const { limite = 20, pagina = 1 } = req.query;
    
    const recetas = await RecetaOficial.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await RecetaOficial.countDocuments();

    res.json({
      recetas,
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener recetas oficiales',
      mensaje: error.message 
    });
  }
};
