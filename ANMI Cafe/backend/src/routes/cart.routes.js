import { Router } from 'express';
import { 
  agregarAlCarrito,
  obtenerCarrito,
  finalizarCompra
} from '../controllers/cart.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// Todas las rutas del carrito requieren autenticación
router.use(verificarToken);

// POST /api/cart/add - Añadir producto al carrito
router.post('/add', agregarAlCarrito);

// GET /api/cart - Obtener carrito actual
router.get('/', obtenerCarrito);

// POST /api/checkout - Finalizar compra
router.post('/checkout', finalizarCompra);

export default router;
