import Producto from '../models/Producto.js';
import ResenaProducto from '../models/ResenaProducto.js';
import { resenaProductoSchema } from '../schemas/index.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// GET /api/products - Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const { limite = 20, pagina = 1, enStock } = req.query;
    
    const filtro = {};
    if (enStock === 'true') {
      filtro.stock = { $gt: 0 };
    }

    const productos = await Producto.find(filtro)
      .sort({ createdAt: -1 })
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await Producto.countDocuments(filtro);

    res.json({
      productos,
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener productos',
      mensaje: error.message 
    });
  }
};

// GET /api/products/:id - Obtener producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    
    const producto = await Producto.findById(id);
    
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener producto',
      mensaje: error.message 
    });
  }
};

// POST /api/products/:id/review - Crear reseña de producto
export const crearResenaProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datosValidados = resenaProductoSchema.parse(req.body);

    // Verificar que el producto existe
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar si el usuario ya reseñó este producto
    const resenaExistente = await ResenaProducto.findOne({
      usuario_id: req.usuario._id,
      producto_id: id
    });

    if (resenaExistente) {
      return res.status(400).json({ 
        error: 'Ya has reseñado este producto' 
      });
    }

    const nuevaResena = await ResenaProducto.create({
      ...datosValidados,
      usuario_id: req.usuario._id,
      producto_id: id
    });

    await nuevaResena.populate('usuario_id', 'nombre email');

    res.status(201).json({
      mensaje: 'Reseña creada exitosamente',
      resena: nuevaResena
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al crear reseña',
      mensaje: error.message 
    });
  }
};

// GET /api/products/:id/reviews - Obtener reseñas de un producto
export const obtenerResenasProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { limite = 20, pagina = 1 } = req.query;

    // Verificar que el producto existe
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const resenas = await ResenaProducto.find({ producto_id: id })
      .populate('usuario_id', 'nombre email')
      .sort({ createdAt: -1 })
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await ResenaProducto.countDocuments({ producto_id: id });

    // Calcular calificación promedio
    const calificaciones = await ResenaProducto.find({ producto_id: id }).select('calificacion');
    const promedioCalificacion = calificaciones.length > 0
      ? calificaciones.reduce((sum, r) => sum + r.calificacion, 0) / calificaciones.length
      : 0;

    res.json({
      resenas,
      estadisticas: {
        totalResenas: total,
        calificacionPromedio: parseFloat(promedioCalificacion.toFixed(2))
      },
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener reseñas',
      mensaje: error.message 
    });
  }
};

// GET /api/products/:id/reviews/summary - Obtener resumen AI de reseñas de un producto
export const obtenerResumenResenasProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Verificar que el producto existe
    const producto = await Producto.findById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // 2. Buscar todas las reseñas del producto
    const resenas = await ResenaProducto.find({ producto_id: id })
      .select('comentario calificacion')
      .lean();

    // 3. Manejar caso sin reseñas
    if (!resenas || resenas.length === 0) {
      return res.json({ 
        summary: 'Este producto aún no tiene reseñas.' 
      });
    }

    // 4. Preparar el texto de todas las reseñas
    const textoResenas = resenas
      .map((r, index) => {
        const comentario = r.comentario || 'Sin comentario';
        const calificacion = r.calificacion;
        return `Reseña ${index + 1} (${calificacion}/5 estrellas): ${comentario}`;
      })
      .join('\n');

    // 5. Crear el prompt para Gemini
    const prompt = `Eres un asistente de e-commerce. Resume las siguientes reseñas de clientes sobre un café en un párrafo corto de 2 a 3 líneas. Destaca los puntos positivos y negativos más comunes. Aquí están las reseñas:

${textoResenas}`;

    // 6. Inicializar y llamar a Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    // 7. Devolver el resumen generado
    res.json({
      summary: summary.trim(),
      totalResenas: resenas.length
    });

  } catch (error) {
    console.error('Error al generar resumen con Gemini:', error);
    res.status(500).json({ 
      error: 'Error al generar resumen de reseñas',
      mensaje: error.message 
    });
  }
};
