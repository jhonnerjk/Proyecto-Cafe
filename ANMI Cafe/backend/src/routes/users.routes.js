import { Router } from 'express';
import { getMe } from '../controllers/users.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// GET /api/users/me - Obtener perfil del usuario autenticado
router.get('/me', verificarToken, getMe);

export default router;
