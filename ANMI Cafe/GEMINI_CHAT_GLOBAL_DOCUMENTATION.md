# 🤖 Chat Global con Gemini AI - ANMI Café

## ✅ ¿Qué se implementó?

### 1. **Backend - Controlador de IA** 📡
**Archivo**: `backend/src/controllers/ai.controller.js`

**Funciones creadas**:
- `chatGlobal()` - Chat inteligente con contexto del proyecto
- `analizarPagina()` - Analiza el contenido de páginas específicas

**¿Qué hace el chat?**
- ✅ Lee TODOS los datos de tu base de datos (productos, recetas, restaurantes, publicaciones)
- ✅ Construye un contexto completo del proyecto para Gemini
- ✅ Responde preguntas sobre CUALQUIER cosa usando IA real
- ✅ Conoce precios, stock, características, reseñas en tiempo real
- ✅ Sabe en qué página está el usuario para dar respuestas contextuales

**Ejemplo de contexto que envía a Gemini**:
```javascript
## Productos Disponibles (4 en stock):
- **Café de Altura - Tostado Medio**: Café boliviano de altura - Precio: Bs 104.5 - Origen: Bolivia - Stock: 50 unidades
- **Café Geisha - Tostado Claro**: Café colombiano premium - Precio: Bs 153.0 - Origen: Colombia - Stock: 30 unidades
...

## Recetas Oficiales (5):
- **Espresso Clásico**: La base de todo buen café
- **Cappuccino Italiano**: Cremoso y delicioso
...

## Restaurantes Asociados (5):
- **Café Central**: Cafetería tradicional en el centro - Horario: 7:00 - 22:00
...
```

### 2. **Backend - Rutas de IA** 🛣️
**Archivo**: `backend/src/routes/ai.routes.js`

**Endpoints creados**:
```
POST /api/ai/chat
Body: { "pregunta": "¿Qué café me recomiendas?", "contexto": "tienda" }
Response: { "pregunta": "...", "respuesta": "...", "contexto": "tienda", "timestamp": "..." }

POST /api/ai/analizar-pagina
Body: { "pagina": "Dashboard", "contenidoVisible": "..." }
Response: { "pagina": "...", "analisis": "...", "timestamp": "..." }
```

### 3. **Backend - Integración en Index** 🔧
**Archivo**: `backend/src/index.js`

- ✅ Importado `aiRoutes`
- ✅ Registrado `app.use('/api/ai', aiRoutes)`
- ✅ Añadido a la lista de endpoints disponibles

### 4. **Frontend - Servicios API** 🌐
**Archivo**: `frontend/src/services/api.js`

**Funciones creadas**:
```javascript
// Chat con IA usando Gemini
chatWithAI(pregunta, contexto)

// Analizar página actual
analyzePageWithAI(pagina, contenidoVisible)
```

### 5. **Frontend - AIAssistant (Componente de Dashboard)** 💜
**Archivo**: `frontend/src/components/AIAssistant.jsx`

**Cambios realizados**:
- ❌ Eliminado sistema de respuestas basado en keywords
- ✅ Integrado con Gemini AI real
- ✅ Recibe prop `contexto` para saber en qué página está
- ✅ Llama a `chatWithAI()` con contexto de página
- ✅ Muestra respuestas inteligentes generadas por IA

**Uso en páginas**:
```jsx
<AIAssistant contexto="dashboard" />
```

### 6. **Frontend - AIFloatingWidget (Componente Flotante)** 🎈
**Archivo**: `frontend/src/components/AIFloatingWidget.jsx`

**Cambios realizados**:
- ❌ Eliminado sistema de IDs de productos
- ✅ Convertido a chat conversacional
- ✅ Integrado con Gemini AI real
- ✅ Recibe prop `contexto` para saber en qué página está
- ✅ Modal flotante con interfaz de chat completa

**Uso en páginas**:
```jsx
<AIFloatingWidget contexto="tienda" />
<AIFloatingWidget contexto="restaurantes" />
```

### 7. **Integración en Páginas** 📄

**CommunityDashboard.jsx**:
```jsx
<AIAssistant contexto="dashboard" />
```

**Store.jsx**:
```jsx
<AIFloatingWidget contexto="tienda" />
```

**RestaurantsGuide.jsx**:
```jsx
<AIFloatingWidget contexto="restaurantes" />
```

---

## 🎯 ¿Qué puede hacer ahora el chat?

### **Responde CUALQUIER pregunta** 🧠

**Sobre productos**:
- "¿Cuál es el café más barato?"
- "Muéstrame todos los cafés de origen boliviano"
- "¿Cuánto cuesta el Café Geisha?"
- "¿Hay stock del Café de Altura?"

**Sobre recetas**:
- "¿Cómo preparar un espresso?"
- "Dame recetas con café colombiano"
- "¿Qué recetas hay aprobadas de la comunidad?"

**Sobre restaurantes**:
- "¿Qué cafeterías están abiertas ahora?"
- "Recomiéndame un restaurante en el centro"
- "¿Cuáles son los horarios del Café Central?"

**Comparaciones**:
- "¿Cuál es la diferencia entre tostado claro y medio?"
- "Compara el Café de Altura vs Café Geisha"
- "¿Qué café tiene mejor precio?"

**Recomendaciones personalizadas**:
- "Quiero un café suave para principiantes"
- "Necesito un café fuerte para la mañana"
- "¿Qué café me recomiendas si me gusta el chocolate?"

### **Lee el proyecto en tiempo real** 📊

El chat accede a:
- ✅ **Productos** - Nombre, precio, stock, origen, tipo de tostado
- ✅ **Recetas Oficiales** - Título, descripción, ingredientes, pasos
- ✅ **Recetas UGC** - Solo las aprobadas por moderadores
- ✅ **Restaurantes** - Nombre, dirección, horarios, especialidades
- ✅ **Publicaciones** - Últimas 5 publicaciones de la comunidad

### **Respuestas contextuales** 🎯

Si el usuario está en:
- **Dashboard** → Habla sobre publicaciones, comunidad, actividad
- **Tienda** → Enfoca en productos, precios, stock, recomendaciones
- **Restaurantes** → Habla sobre ubicaciones, horarios, especialidades

---

## 🚀 Cómo probarlo

### 1. **Inicia el backend** (ya corriendo):
```bash
cd "c:\Users\hp\Documents\Proyecto-Cafe\ANMI Cafe\backend"
npm start
```

### 2. **Inicia el frontend** (ya corriendo):
```bash
cd "c:\Users\hp\Documents\Proyecto-Cafe\ANMI Cafe\frontend"
npm run dev
```

### 3. **Abre el navegador**:
```
http://localhost:5174
```

### 4. **Prueba el chat**:

**En Dashboard** (sidebar derecho):
- Click en el asistente morado
- Pregunta: "¿Qué productos tienes disponibles?"
- Pregunta: "¿Cuál es el más barato?"

**En Tienda** (botón flotante abajo derecha):
- Click en el botón flotante morado
- Pregunta: "Necesito un café para principiantes"
- Pregunta: "¿Cuánto cuesta el Café Geisha?"

**En Restaurantes** (botón flotante):
- Pregunta: "¿Qué cafeterías me recomiendas?"
- Pregunta: "¿Cuáles están abiertas ahora?"

---

## 📝 Ejemplo de conversación real

**Usuario**: "Hola, quiero comprar café"

**IA**: "¡Hola! 👋 En ANMI Café tenemos excelentes opciones de café de especialidad. Actualmente tenemos 4 productos en stock:

1. **Café de Altura - Tostado Medio** (Bolivia) - Bs 104.5 - Perfecto equilibrio de sabor y aroma
2. **Café Geisha - Tostado Claro** (Colombia) - Bs 153.0 - Premium, suave y afrutado
3. **Café Bourbon - Tostado Medio** (Brasil) - Bs 120.0 - Clásico y versátil
4. **Café Orgánico - Tostado Claro** (Perú) - Bs 135.0 - Certificado orgánico

¿Hay algún tipo de sabor o tostado que prefieras? 😊☕"

**Usuario**: "Quiero algo para empezar, no muy fuerte"

**IA**: "¡Perfecto! Te recomiendo el **Café Geisha - Tostado Claro** 🌟

Es ideal para principiantes porque:
- **Sabor suave y afrutado** - No es amargo ni fuerte
- **Tostado claro** - Resalta notas dulces y frutales
- **Origen colombiano** - Calidad premium reconocida mundialmente
- **Precio**: Bs 153.0
- **Stock disponible**: 30 unidades

Si buscas algo más económico, el **Café de Altura - Tostado Medio** (Bs 104.5) también es excelente y muy balanceado. 

¿Te gustaría saber cómo prepararlo? ☕✨"

---

## 🎨 Características del diseño

### **Mantiene el diseño hermoso** 💜
- ✅ Mismo gradiente morado-azul-índigo
- ✅ Mismas animaciones y efectos
- ✅ Mismo indicador de actividad
- ✅ Mismo sticky positioning
- ✅ Mismo dark mode

### **Mejoras en UX**
- ✅ Burbujas de chat diferenciadas (usuario vs IA)
- ✅ Indicador de "Pensando..." animado
- ✅ Mensajes de error informativos
- ✅ Input con Enter para enviar
- ✅ Placeholder contextual

---

## 🔑 API Key utilizada

**Gemini API Key**: `AIzaSyB3UhixmqlXDUXpwOkxrobKmeOVqsRN2cs`
**Modelo**: `gemini-1.5-flash`
**Ubicación**: `backend/.env`

---

## 📊 Flujo de datos

```
Usuario escribe pregunta
    ↓
Frontend (AIAssistant / AIFloatingWidget)
    ↓
api.js → chatWithAI(pregunta, contexto)
    ↓
Backend → POST /api/ai/chat
    ↓
ai.controller.js → chatGlobal()
    ↓
1. Lee productos de MongoDB
2. Lee recetas de MongoDB
3. Lee restaurantes de MongoDB
4. Lee publicaciones de MongoDB
5. Construye contexto del proyecto
6. Crea prompt para Gemini
    ↓
Google Gemini AI (genera respuesta)
    ↓
Respuesta JSON con texto generado
    ↓
Frontend muestra respuesta en chat
```

---

## ✨ Ventajas vs sistema anterior

| Antes | Ahora |
|-------|-------|
| Respuestas fijas por keywords | IA generativa que entiende contexto |
| Solo sabía lo programado | Lee TODA la base de datos |
| Sin conocimiento del proyecto | Conoce productos, precios, stock real |
| Respuestas genéricas | Recomendaciones personalizadas |
| Input de IDs de productos | Chat natural conversacional |
| No aprende ni se adapta | Respuestas inteligentes y naturales |

---

## 🎉 ¡LISTO!

Ahora tienes un **chat global inteligente** que:
- 🧠 **Usa IA real** (Gemini 1.5 Flash)
- 📚 **Lee tu proyecto completo** (productos, recetas, restaurantes)
- 💬 **Responde CUALQUIER pregunta** de forma natural
- 🎯 **Entiende el contexto** de cada página
- 💜 **Mantiene tu diseño hermoso**
- 🌍 **Funciona en todas las páginas**

**Fecha de implementación**: 27 de octubre de 2025
**Estado**: ✅ Completamente funcional
**Servidores**: ✅ Backend corriendo en puerto 3000, Frontend en puerto 5174
