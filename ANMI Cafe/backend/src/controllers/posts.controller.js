import Publicacion from '../models/Publicacion.js';
import Comentario from '../models/Comentario.js';
import { publicacionSchema, comentarioSchema } from '../schemas/index.js';

// POST /api/posts - Crear nueva publicación
export const crearPublicacion = async (req, res) => {
  try {
    const datosValidados = publicacionSchema.parse(req.body);
    
    const nuevaPublicacion = await Publicacion.create({
      ...datosValidados,
      usuario_id: req.usuario._id
    });

    // Poblar información del usuario
    await nuevaPublicacion.populate('usuario_id', 'nombre email');

    res.status(201).json({
      mensaje: 'Publicación creada exitosamente',
      publicacion: nuevaPublicacion
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al crear publicación',
      mensaje: error.message 
    });
  }
};

// GET /api/posts - Obtener todas las publicaciones
export const obtenerPublicaciones = async (req, res) => {
  try {
    const { limite = 20, pagina = 1 } = req.query;
    
    const publicaciones = await Publicacion.find()
      .populate('usuario_id', 'nombre email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await Publicacion.countDocuments();

    res.json({
      publicaciones,
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener publicaciones',
      mensaje: error.message 
    });
  }
};

// POST /api/posts/:id/comment - Comentar en una publicación
export const comentarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const datosValidados = comentarioSchema.parse(req.body);

    // Verificar que la publicación existe
    const publicacion = await Publicacion.findById(id);
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    const nuevoComentario = await Comentario.create({
      ...datosValidados,
      usuario_id: req.usuario._id,
      post_id: id
    });

    await nuevoComentario.populate('usuario_id', 'nombre email');

    res.status(201).json({
      mensaje: 'Comentario añadido exitosamente',
      comentario: nuevoComentario
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al crear comentario',
      mensaje: error.message 
    });
  }
};
