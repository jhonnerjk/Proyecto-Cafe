import { Router } from 'express';
import { 
  crearPublicacion, 
  obtenerPublicaciones, 
  comentarPublicacion 
} from '../controllers/posts.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// POST /api/posts - Crear nueva publicación
router.post('/', verificarToken, crearPublicacion);

// GET /api/posts - Obtener todas las publicaciones
router.get('/', obtenerPublicaciones);

// POST /api/posts/:id/comment - Comentar en una publicación
router.post('/:id/comment', verificarToken, comentarPublicacion);

export default router;
