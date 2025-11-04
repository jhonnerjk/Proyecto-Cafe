import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { usuarioSchema, usuarioLoginSchema } from '../schemas/index.js';

const router = Router();

// POST /api/auth/register - Registro de usuario
router.post('/register', validate(usuarioSchema, 'body'), register);

// POST /api/auth/login - Autenticación JWT
router.post('/login', validate(usuarioLoginSchema, 'body'), login);

export default router;
