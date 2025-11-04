import Restaurante from '../models/Restaurante.js';
import OpinionRestaurante from '../models/OpinionRestaurante.js';
import { opinionRestauranteSchema } from '../schemas/index.js';

// GET /api/restaurants - Obtener restaurantes
export const obtenerRestaurantes = async (req, res) => {
  try {
    const { limite = 20, pagina = 1, cerca } = req.query;
    
    let query = Restaurante.find();

    // Si se proporciona parámetro "cerca" (latitud,longitud)
    if (cerca) {
      const [lat, lng] = cerca.split(',').map(Number);
      
      if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ 
          error: 'Formato de coordenadas inválido. Use: cerca=latitud,longitud' 
        });
      }

      // Búsqueda geoespacial (asumiendo que tienes índice 2dsphere en ubicacion)
      query = Restaurante.find({
        ubicacion: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat]
            },
            $maxDistance: 10000 // 10km
          }
        }
      });
    }

    const restaurantes = await query
      .limit(parseInt(limite))
      .skip((parseInt(pagina) - 1) * parseInt(limite));

    const total = await Restaurante.countDocuments();

    res.json({
      restaurantes,
      paginacion: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / parseInt(limite))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener restaurantes',
      mensaje: error.message 
    });
  }
};

// POST /api/restaurants/:id/review - Crear opinión de restaurante
export const crearOpinionRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const datosValidados = opinionRestauranteSchema.parse(req.body);

    // Verificar que el restaurante existe
    const restaurante = await Restaurante.findById(id);
    if (!restaurante) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }

    const nuevaOpinion = await OpinionRestaurante.create({
      ...datosValidados,
      usuario_id: req.usuario._id,
      restaurante_id: id
    });

    await nuevaOpinion.populate('usuario_id', 'nombre email');

    res.status(201).json({
      mensaje: 'Opinión registrada exitosamente',
      opinion: nuevaOpinion
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al crear opinión',
      mensaje: error.message 
    });
  }
};
