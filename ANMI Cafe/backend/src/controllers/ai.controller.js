import { GoogleGenerativeAI } from '@google/generative-ai';
import Producto from '../models/Producto.js';
import RecetaOficial from '../models/RecetaOficial.js';
import RecetaUGC from '../models/RecetaUGC.js';
import Restaurante from '../models/Restaurante.js';
import Publicacion from '../models/Publicacion.js';

// Función para obtener instancia de Gemini (lazy initialization)
const getGeminiAI = () => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
    throw new Error('GEMINI_API_KEY no configurada en .env');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

// POST /api/ai/chat - Chat global con contexto del proyecto
export const chatGlobal = async (req, res) => {
  try {
    const { pregunta, contexto = 'general' } = req.body;

    if (!pregunta || !pregunta.trim()) {
      return res.status(400).json({ 
        error: 'La pregunta es requerida' 
      });
    }

    // Obtener contexto relevante de la base de datos
    const [productos, recetasOficiales, recetasUGC, restaurantes, publicaciones] = await Promise.all([
      Producto.find({ stock: { $gt: 0 } }).limit(10).select('nombre descripcion precio tipo_tostado origen stock'),
      RecetaOficial.find().limit(5).select('titulo descripcion ingredientes pasos'),
      RecetaUGC.find({ estado: 'aprobada' }).limit(5).select('titulo descripcion ingredientes'),
      Restaurante.find().limit(5).select('nombre direccion descripcion especialidades horario_atencion'),
      Publicacion.find().sort({ createdAt: -1 }).limit(5).select('titulo contenido categoria')
    ]);

    // Construir el contexto del proyecto
    let contextoProjeto = `
# Contexto del Proyecto ANMI Café

## Sobre ANMI Café
ANMI Café es una plataforma de comercio electrónico y comunidad dedicada al café de especialidad en Bolivia. 
Ofrecemos cafés premium de diferentes orígenes (Bolivia, Colombia, Perú, Brasil) con distintos tipos de tostado.

## Productos Disponibles (${productos.length} en stock):
${productos.map(p => `- **${p.nombre}**: ${p.descripcion} - Precio: Bs ${p.precio} - Origen: ${p.origen} - Tostado: ${p.tipo_tostado} - Stock: ${p.stock} unidades`).join('\n')}

## Recetas Oficiales (${recetasOficiales.length}):
${recetasOficiales.map(r => `- **${r.titulo}**: ${r.descripcion}`).join('\n')}

## Recetas de la Comunidad (${recetasUGC.length} aprobadas):
${recetasUGC.map(r => `- **${r.titulo}**: ${r.descripcion}`).join('\n')}

## Restaurantes Asociados (${restaurantes.length}):
${restaurantes.map(r => `- **${r.nombre}**: ${r.descripcion} - ${r.direccion} - Horario: ${r.horario_atencion}`).join('\n')}

## Publicaciones Recientes (${publicaciones.length}):
${publicaciones.map(p => `- **${p.titulo}** (${p.categoria}): ${p.contenido?.substring(0, 100)}...`).join('\n')}

## Páginas del Sitio Web:
- **Dashboard Comunitario**: Publicaciones, recetas y comunidad
- **Tienda**: Catálogo de productos de café con carrito de compras
- **Guía de Restaurantes**: Directorio de cafeterías y restaurantes
- **Explorar Recetas**: Recetas oficiales y de la comunidad
- **Perfil de Usuario**: Gestión de cuenta y pedidos

## Contexto Actual de la Conversación:
Usuario está en la página: ${contexto}
`;

    // Construir el prompt para Gemini
    const prompt = `
Eres un asistente virtual inteligente de ANMI Café, una plataforma boliviana de café de especialidad.

Tu personalidad:
- Amigable, entusiasta y conocedor del café
- Usas emojis ocasionalmente (☕ 🌟 💰 📦 🚚 👨‍🍳 etc.)
- Respondes en español de forma natural y conversacional
- Eres preciso con datos (precios, stock, nombres) del proyecto

Tus capacidades:
- Conoces todos los productos, precios, stock y características
- Puedes recomendar cafés según preferencias del usuario
- Conoces las recetas disponibles y cómo prepararlas
- Sabes sobre los restaurantes asociados
- Puedes explicar diferencias entre tipos de tostado y orígenes
- Das información sobre envíos, disponibilidad y pedidos

${contextoProjeto}

Pregunta del usuario: "${pregunta}"

Responde de forma útil, precisa y amigable. Si la pregunta es sobre productos específicos, menciona nombres exactos, precios y detalles. Si preguntan sobre disponibilidad, usa la información del stock. Si es una conversación general sobre café, comparte tu conocimiento.

Respuesta:`;

    // Llamar directamente a Gemini API
    const genAI = getGeminiAI();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const respuesta = result.response.text();

    res.json({
      pregunta,
      respuesta,
      contexto,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error en chat global:', error);
    res.status(500).json({ 
      error: 'Error al procesar la pregunta con Gemini AI',
      detalles: error.message 
    });
  }
};

// POST /api/ai/analizar-pagina - Analiza el contenido de la página actual
export const analizarPagina = async (req, res) => {
  try {
    const { pagina, contenidoVisible } = req.body;

    const genAI = getGeminiAI();

    const prompt = `
Eres un asistente de ANMI Café analizando la página "${pagina}".

Contenido visible en la página:
${contenidoVisible || 'No se proporcionó contenido específico'}

Basándote en esta página, proporciona:
1. Un resumen breve de qué puede hacer el usuario aquí
2. 3 sugerencias de acciones útiles
3. Responde cualquier duda común sobre esta sección

Respuesta:`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(prompt);
    const analisis = result.response.text();

    res.json({
      pagina,
      analisis,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error al analizar página:', error);
    res.status(500).json({ 
      error: 'Error al analizar la página con Gemini AI',
      detalles: error.message 
    });
  }
};
