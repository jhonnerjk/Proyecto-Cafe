import { Router } from 'express';
import {
  subirFoto,
  subirMultiplesFotos,
  eliminarFoto,
  obtenerConfig,
  uploadSingle,
  uploadMultiple
} from '../controllers/upload.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// POST /api/uploads - Subir una foto
router.post('/', verificarToken, uploadSingle, subirFoto);

// POST /api/uploads/multiple - Subir múltiples fotos
router.post('/multiple', verificarToken, uploadMultiple, subirMultiplesFotos);

// DELETE /api/uploads/:filename - Eliminar foto
router.delete('/:filename', verificarToken, eliminarFoto);

// GET /api/uploads/config - Obtener configuración
router.get('/config', obtenerConfig);

export default router;
