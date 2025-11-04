import { Router } from 'express';
import { 
  obtenerProductos,
  obtenerProductoPorId,
  crearResenaProducto,
  obtenerResenasProducto,
  obtenerResumenResenasProducto
} from '../controllers/products.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// GET /api/products - Obtener todos los productos
router.get('/', obtenerProductos);

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', obtenerProductoPorId);

// GET /api/products/:id/reviews/summary - Obtener resumen AI de reseñas
router.get('/:id/reviews/summary', obtenerResumenResenasProducto);

// POST /api/products/:id/review - Crear reseña de producto
router.post('/:id/review', verificarToken, crearResenaProducto);

// GET /api/products/:id/reviews - Obtener reseñas de un producto
router.get('/:id/reviews', obtenerResenasProducto);

export default router;
