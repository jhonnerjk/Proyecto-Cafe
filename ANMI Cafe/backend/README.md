# ANMI Café - Backend API

## Descripción del Producto

API REST para ANMI Café, una plataforma de comercio electrónico y comunidad dedicada al café de especialidad en Bolivia. El backend proporciona servicios para:

- **E-Commerce**: Gestión de productos de café, carrito de compras y pedidos
- **Comunidad**: Publicaciones, comentarios y contenido generado por usuarios
- **Recetas**: Recetas oficiales y contribuciones de la comunidad
- **Restaurantes**: Directorio de cafeterías con ubicación geoespacial
- **IA Conversacional**: Chat inteligente con Gemini AI que conoce todo el catálogo
- **Moderación**: Panel administrativo para gestión de contenido

---

## Tecnologías Utilizadas

### Backend
- **Node.js** v18+ con ES Modules
- **Express.js** 5.1.0 - Framework web
- **MongoDB** 8.19.2 con Mongoose - Base de datos NoSQL
- **JWT** - Autenticación basada en tokens
- **Zod** - Validación de esquemas
- **Google Gemini AI** - Inteligencia artificial conversacional
- **Multer** - Manejo de uploads de imágenes
- **CORS** - Comunicación cross-origin

---

## Instalación

### Prerrequisitos

```bash
# Node.js 18 o superior
node --version

# MongoDB 6.0 o superior (local o MongoDB Atlas)
mongod --version

# npm o yarn
npm --version
```

### Pasos de Instalación

```bash
# 1. Navegar al directorio del backend
cd "ANMI Cafe/backend"

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con las variables de entorno
cp .env.example .env

# 4. Editar .env con tus configuraciones
# (Ver sección Variables de Entorno)

# 5. Iniciar el servidor
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## Variables de Entorno (.env)

Crea un archivo `.env` en la raíz del directorio backend con las siguientes variables:

### `.env.example`

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/anmi_cafe

# JWT Secret Key (CAMBIAR EN PRODUCCIÓN)
APP_TOKEN=tu_clave_secreta_super_segura_aqui_12345

# Gemini AI Configuration
GEMINI_API_KEY=tu_api_key_de_google_gemini_aqui
```

### Descripción de Variables

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor Express | `3000` |
| `MONGODB_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/anmi_cafe` |
| `APP_TOKEN` | Clave secreta para JWT (mínimo 32 caracteres en producción) | `mi_clave_super_secreta_jwt` |
| `GEMINI_API_KEY` | API Key de Google Gemini AI | `AIzaSy...` |

### Obtener API Key de Gemini

1. Ir a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crear un nuevo API Key
3. Copiar y pegar en `.env`

---

## Ejecución

### Desarrollo

```bash
npm start
```

### Producción

```bash
# Con PM2
npm install -g pm2
pm2 start src/index.js --name anmi-backend

# O con Docker
docker build -t anmi-backend .
docker run -p 3000:3000 --env-file .env anmi-backend
```

---

## Dependencias Principales

```json
{
  "dependencies": {
    "express": "^5.1.0",
    "mongoose": "^8.9.2",
    "jsonwebtoken": "^9.0.2",
    "zod": "^4.1.12",
    "@google/generative-ai": "^0.24.1",
    "multer": "^1.4.5-lts.1",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3"
  }
}
```

---

## Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/users/me` - Obtener usuario actual (requiere JWT)

### Productos (E-Commerce)
- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Detalle de producto
- `POST /api/products/:id/review` - Crear reseña (requiere JWT)
- `GET /api/products/:id/reviews` - Obtener reseñas
- `GET /api/products/:id/reviews/summary` - Resumen con IA

### Carrito & Pedidos
- `POST /api/cart/add` - Agregar al carrito (requiere JWT)
- `GET /api/cart` - Ver carrito (requiere JWT)
- `POST /api/cart/checkout` - Finalizar compra (requiere JWT)

### Publicaciones (Comunidad)
- `GET /api/posts` - Listar publicaciones
- `POST /api/posts` - Crear publicación (requiere JWT)
- `POST /api/posts/:id/comment` - Comentar (requiere JWT)

### Recetas
- `GET /api/recipes/ugc` - Recetas de usuarios
- `POST /api/recipes/ugc` - Crear receta (requiere JWT)
- `GET /api/recipes/official` - Recetas oficiales
- `POST /api/recipes/ugc/:id/rate` - Calificar (requiere JWT)

### Restaurantes
- `GET /api/restaurants` - Listar restaurantes
- `POST /api/restaurants/:id/review` - Crear opinión (requiere JWT)

### Inteligencia Artificial
- `POST /api/ai/chat` - Chat con Gemini AI
- `POST /api/ai/analizar-pagina` - Analizar contexto de página

### Administración
- `GET /api/admin/content?filter=negative` - Contenido para moderar (requiere admin)
- `DELETE /api/admin/content/:id` - Eliminar contenido (requiere admin)

### Uploads
- `POST /api/uploads` - Subir imagen (requiere JWT)
- `POST /api/uploads/multiple` - Subir múltiples imágenes (requiere JWT)

---

## Matriz de Trazabilidad

### Investigación → Requisitos → Interfaz

| ID | Investigación UX | Requisito Funcional | Endpoint/Función | Interfaz Frontend |
|----|------------------|---------------------|------------------|-------------------|
| **RF-01** | Usuarios necesitan ver productos de café con información clara | Sistema debe listar productos con precio, origen, tostado y stock | `GET /api/products` | Página Store con grid de productos |
| **RF-02** | Carrito persistente mejora tasa de conversión | Sistema debe mantener carrito por usuario | `POST /api/cart/add`<br>`GET /api/cart` | CartMiniPanel y checkout |
| **RF-03** | Reseñas aumentan confianza en compra | Sistema debe permitir crear y ver reseñas | `POST /api/products/:id/review`<br>`GET /api/products/:id/reviews` | Sección de reseñas en detalle |
| **RF-04** | Resumen IA reduce tiempo de decisión | IA debe resumir reseñas automáticamente | `GET /api/products/:id/reviews/summary` | Badge "Resumen IA" en producto |
| **RF-05** | Comunidad fomenta engagement | Usuarios deben poder publicar anécdotas | `POST /api/posts`<br>`POST /api/posts/:id/comment` | CommunityDashboard con feed |
| **RF-06** | Recetas inspiran nuevas compras | Sistema debe almacenar recetas oficiales y UGC | `GET /api/recipes/official`<br>`POST /api/recipes/ugc` | ExploreRecipes con tabs |
| **RF-07** | Ubicación geoespacial facilita visitas | Restaurantes con coordenadas y búsqueda cercana | `GET /api/restaurants?cerca=` | RestaurantsGuide con mapa |
| **RF-08** | Chat IA reduce fricción en compra | Asistente debe responder preguntas en tiempo real | `POST /api/ai/chat` | AIAssistant (sidebar) y AIFloatingWidget |
| **RF-09** | Moderación mantiene calidad | Admin debe poder filtrar contenido negativo | `GET /api/admin/content?filter=negative` | ModerationPanel con filtros |
| **RF-10** | Autenticación protege datos | JWT para rutas protegidas | Middleware `verificarToken` | Login/Register + ProtectedRoute |

---

## Evidencia de Métricas UX Definidas

### Métricas de Usabilidad Implementadas

#### 1. **Tasa de Éxito en Tareas**
**Definición**: Porcentaje de usuarios que completan una tarea sin errores.

| Tarea | Métrica | Objetivo | Implementación Backend |
|-------|---------|----------|------------------------|
| Agregar producto al carrito | ≥ 95% | > 90% | Endpoint `/api/cart/add` con validación de stock |
| Completar checkout | ≥ 85% | > 80% | Endpoint `/api/cart/checkout` con validación de pedido |
| Crear publicación | ≥ 90% | > 85% | Endpoint `/api/posts` con validación Zod |
| Subir receta UGC | ≥ 80% | > 75% | Endpoint `/api/recipes/ugc` con validación de campos |

**Tracking**: Logs de errores en `console.error()` de cada controlador

#### 2. **Tiempo Promedio de Tarea**
**Definición**: Tiempo que tarda un usuario en completar una acción.

| Tarea | Tiempo Objetivo | Respuesta API | Optimización |
|-------|----------------|---------------|--------------|
| Cargar lista de productos | < 2 seg | < 500ms | Índices en MongoDB (`nombre`, `categoria`) |
| Búsqueda de restaurantes | < 1.5 seg | < 300ms | Índice geoespacial `2dsphere` |
| Obtener resumen IA | < 5 seg | < 3seg | Caché de respuestas Gemini (futuro) |
| Login/Register | < 1 seg | < 200ms | JWT sin bcrypt (demo) |

**Medición**: Timestamps en respuestas JSON (`timestamp: new Date()`)

#### 3. **Tasa de Error**
**Definición**: Porcentaje de peticiones que resultan en error.

| Endpoint | Error Rate Objetivo | Manejo de Errores |
|----------|---------------------|-------------------|
| `/api/products` | < 1% | Try-catch con respuesta JSON estructurada |
| `/api/cart/add` | < 2% | Validación de stock antes de agregar |
| `/api/ai/chat` | < 5% | Fallback si Gemini falla (implementado) |
| `/api/uploads` | < 3% | Validación de tipo MIME y tamaño |

**Implementación**: 
```javascript
try {
  // Lógica del endpoint
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ 
    error: 'Mensaje amigable',
    detalles: error.message 
  });
}
```

#### 4. **Satisfacción del Usuario (SUS Score)**
**Objetivo**: > 75/100 (percentil 70)

**Indicadores medidos**:
- Calificaciones de recetas: `/api/recipes/ugc/:id/rate` (1-5 estrellas)
- Reseñas de productos: `/api/products/:id/review` (1-5 estrellas)
- Opiniones de restaurantes: `/api/restaurants/:id/review` (1-5 estrellas)

#### 5. **Tasa de Retención**
**Definición**: Usuarios que regresan después de 7 días.

**Tracking**:
- Campo `createdAt` en modelo Usuario
- Análisis de `updatedAt` en Pedidos
- Frecuencia de publicaciones por usuario

#### 6. **Eficiencia de Conversación con IA**
**Métricas específicas del chat**:

| Métrica | Objetivo | Implementación |
|---------|----------|----------------|
| Tiempo de respuesta IA | < 3 segundos | Gemini 2.0 Flash (más rápido) |
| Relevancia de respuestas | > 80% útiles | Contexto del proyecto en prompts |
| Preguntas resueltas sin escalación | > 70% | Base de conocimiento integrada |

**Logs de Chat**:
```javascript
{
  pregunta: "...",
  respuesta: "...",
  contexto: "tienda",
  timestamp: new Date(),
  modelo: "gemini-2.0-flash-exp"
}
```

---

## Testing

### Tests Manuales

```bash
# Test del chat con IA
node test-chat-ia.js

# Test de inserción de datos
node test-gemini-reviews.js
```

### Tests Automatizados (Futuro)

```bash
# Instalar Jest
npm install --save-dev jest supertest

# Ejecutar tests
npm test
```

---

## Estructura del Proyecto

```
backend/
├── src/
│   ├── index.js              # Punto de entrada
│   ├── controllers/          # Lógica de negocio
│   │   ├── auth.controller.js
│   │   ├── products.controller.js
│   │   ├── ai.controller.js
│   │   └── ...
│   ├── models/               # Esquemas de MongoDB
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   └── ...
│   ├── routes/               # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── products.routes.js
│   │   └── ...
│   ├── middleware/           # Middlewares personalizados
│   │   ├── auth.js           # Verificación JWT
│   │   └── validate.js       # Validación Zod
│   └── schemas/              # Esquemas de validación
│       └── Usuario.schema.js
├── uploads/                  # Imágenes subidas
├── .env                      # Variables de entorno
├── .env.example              # Ejemplo de configuración
├── package.json
└── README.md
```

---

## Seguridad

### Notas Importantes

**IMPORTANTE: Este proyecto es para fines educativos**

- Las contraseñas NO están hasheadas (usar bcrypt en producción)
- JWT sin rate limiting (implementar en producción)
- CORS abierto a todos los orígenes (configurar whitelist)
- Sin validación de sanitización SQL injection (MongoDB previene, pero validar)

### Mejoras Recomendadas para Producción

```bash
# Instalar dependencias de seguridad
npm install helmet express-rate-limit bcrypt validator

# En src/index.js
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
```

---

## Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## Licencia

Este proyecto es de código abierto para fines educativos.

---

## Autores

**Equipo ANMI Café**  
Universidad: [Tu Universidad]  
Materia: Interacción Humano-Computador  
Fecha: Octubre 2025

---

## Soporte

Para reportar bugs o solicitar features:
- GitHub Issues: [Enlace al repositorio]
- Email: [tu-email@ejemplo.com]

---

## Agradecimientos

- Google Gemini AI por la API de inteligencia artificial
- MongoDB por la base de datos NoSQL
- Comunidad de Node.js y Express
