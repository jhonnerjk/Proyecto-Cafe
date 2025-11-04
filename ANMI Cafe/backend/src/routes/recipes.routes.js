import { Router } from 'express';
import { 
  crearRecetaUGC,
  obtenerRecetasUGC,
  calificarReceta,
  eliminarRecetaUGC,
  obtenerRecetasOficiales
} from '../controllers/recipes.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

// POST /api/recipes-ugc - Crear receta colaborativa
router.post('/ugc', verificarToken, crearRecetaUGC);

// GET /api/recipes-ugc - Obtener recetas colaborativas
router.get('/ugc', obtenerRecetasUGC);

// POST /api/recipes-ugc/:id/rate - Calificar receta
router.post('/ugc/:id/rate', verificarToken, calificarReceta);

// DELETE /api/recipes-ugc/:id - Eliminar receta
router.delete('/ugc/:id', verificarToken, eliminarRecetaUGC);

// GET /api/recipes-official - Obtener recetas oficiales
router.get('/official', obtenerRecetasOficiales);

export default router;
