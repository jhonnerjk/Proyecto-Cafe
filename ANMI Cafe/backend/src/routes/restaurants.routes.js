import { Router } from 'express';
import { 
  obtenerRestaurantes,
  crearOpinionRestaurante
} from '../controllers/restaurants.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// GET /api/restaurants - Obtener restaurantes
router.get('/', obtenerRestaurantes);

// POST /api/restaurants/:id/review - Crear opinión de restaurante
router.post('/:id/review', verificarToken, crearOpinionRestaurante);

export default router;
