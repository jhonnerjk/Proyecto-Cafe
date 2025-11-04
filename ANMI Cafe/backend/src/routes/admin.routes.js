import { Router } from 'express';
import { 
  obtenerContenido,
  eliminarContenido
} from '../controllers/admin.controller.js';
import { verificarToken, verificarAdmin } from '../middleware/auth.js';

const router = Router();

// Todas las rutas de admin requieren autenticación Y rol de admin
router.use(verificarToken);
router.use(verificarAdmin);

// GET /api/admin/content?filter=negative - Obtener contenido según filtro
router.get('/content', obtenerContenido);

// DELETE /api/admin/content/:id - Eliminar contenido
router.delete('/content/:id', eliminarContenido);

export default router;
