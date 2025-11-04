import { Router } from 'express';
import { chatGlobal, analizarPagina } from '../controllers/ai.controller.js';

const router = Router();

// POST /api/ai/chat - Chat global con IA
router.post('/chat', chatGlobal);

// POST /api/ai/analizar-pagina - Analizar contenido de página
router.post('/analizar-pagina', analizarPagina);

export default router;
