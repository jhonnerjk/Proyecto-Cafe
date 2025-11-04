# 🤖 Integración de Gemini AI - Resumen de Reseñas de Productos

## 📋 Descripción

Este proyecto integra la API de **Google Gemini AI** para generar resúmenes inteligentes de las reseñas de productos utilizando procesamiento de lenguaje natural (NLP).

---

## 🚀 Características

- ✅ **Resumen automático** de reseñas de productos usando IA
- ✅ **Análisis de sentimientos** (positivos y negativos)
- ✅ **Respuesta rápida** con modelo `gemini-1.5-flash`
- ✅ **Manejo de casos especiales** (productos sin reseñas)
- ✅ **Integración completa** con el sistema de e-commerce existente

---

## 🔧 Instalación

### 1. Instalar el SDK de Gemini

```bash
cd backend
npm install @google/generative-ai
```

### 2. Configurar la API Key

Agregar la clave de API en el archivo `.env`:

```env
GEMINI_API_KEY=AIzaSyB3UhixmqlXDUXpwOkxrobKmeOVqsRN2cs
```

> ⚠️ **IMPORTANTE**: Nunca compartas tu API Key públicamente. Agrégala al `.gitignore`.

---

## 📡 Endpoint

### **GET** `/api/products/:id/reviews/summary`

Obtiene un resumen generado por IA de todas las reseñas de un producto específico.

#### **Parámetros de URL**
- `id` (string, requerido): ID del producto en MongoDB

#### **Respuestas**

**✅ Éxito (200 OK)**
```json
{
  "summary": "Los clientes destacan el excelente sabor y aroma del café, considerándolo ideal para las mañanas. Algunos mencionan que el precio es elevado, aunque la calidad lo justifica. Se reportan ocasionales problemas con el empaque durante el envío.",
  "totalResenas": 6
}
```

**📭 Sin reseñas (200 OK)**
```json
{
  "summary": "Este producto aún no tiene reseñas."
}
```

**❌ Producto no encontrado (404)**
```json
{
  "error": "Producto no encontrado"
}
```

**❌ Error del servidor (500)**
```json
{
  "error": "Error al generar resumen de reseñas",
  "mensaje": "Detalles del error..."
}
```

---

## 🧪 Pruebas

### Opción 1: Script de Datos de Prueba

Ejecutar el script para insertar reseñas de ejemplo:

```bash
cd backend
node test-gemini-reviews.js
```

El script:
1. Se conecta a MongoDB
2. Crea/busca un usuario de prueba
3. Crea/busca un producto
4. Inserta 6 reseñas variadas
5. Muestra el comando para probar el endpoint

### Opción 2: Curl

```bash
curl http://localhost:3000/api/products/PRODUCT_ID/reviews/summary
```

### Opción 3: Postman/Thunder Client

```
GET http://localhost:3000/api/products/PRODUCT_ID/reviews/summary
```

### Opción 4: Frontend (JavaScript)

```javascript
import { getProductReviewsSummary } from './services/api';

const summary = await getProductReviewsSummary(productId);
console.log(summary.summary);
```

---

## 🔍 Ejemplo de Implementación en Frontend

### Componente React de Ejemplo

```jsx
import React, { useState, useEffect } from 'react';
import { getProductReviewsSummary } from '../services/api';

function ProductReviewSummary({ productId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        setLoading(true);
        const data = await getProductReviewsSummary(productId);
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadSummary();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
        <span className="material-symbols-outlined animate-spin">sync</span>
        <span>Generando resumen con IA...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-purple-600">psychology</span>
        <h3 className="font-bold text-purple-900">Resumen IA de Reseñas</h3>
        {summary.totalResenas > 0 && (
          <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">
            {summary.totalResenas} reseñas analizadas
          </span>
        )}
      </div>
      <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
    </div>
  );
}

export default ProductReviewSummary;
```

---

## 🏗️ Arquitectura

### Flujo de Datos

```
1. Cliente → GET /api/products/:id/reviews/summary
2. Backend → Busca producto en MongoDB
3. Backend → Obtiene todas las reseñas del producto
4. Backend → Construye prompt para Gemini
5. Gemini AI → Procesa y genera resumen
6. Backend → Devuelve JSON con resumen
7. Cliente → Muestra resumen al usuario
```

### Modelo de IA Utilizado

- **Modelo**: `gemini-1.5-flash`
- **Proveedor**: Google Generative AI
- **Ventajas**:
  - ⚡ Respuesta ultra-rápida (< 2 segundos)
  - 💰 Costo reducido
  - 🎯 Excelente para tareas de resumen
  - 🌐 Soporte multilenguaje

---

## 📊 Estructura del Prompt

El sistema envía a Gemini el siguiente prompt optimizado:

```
Eres un asistente de e-commerce. Resume las siguientes reseñas de clientes 
sobre un café en un párrafo corto de 2 a 3 líneas. Destaca los puntos 
positivos y negativos más comunes. Aquí están las reseñas:

Reseña 1 (5/5 estrellas): Excelente café! El sabor es increíble...
Reseña 2 (4/5 estrellas): Muy buen producto, aunque el precio...
...
```

---

## 🔐 Seguridad

### Mejores Prácticas Implementadas

1. ✅ API Key almacenada en variables de entorno
2. ✅ Validación de existencia del producto
3. ✅ Manejo de errores robusto
4. ✅ Límite implícito de tokens por el modelo
5. ✅ Sin exposición de datos sensibles

### Recomendaciones Adicionales

- 🔒 Agregar rate limiting (ej: 10 requests/minuto)
- 📦 Cachear resúmenes para evitar llamadas repetidas
- 💾 Guardar resúmenes en DB para reutilizarlos
- 🛡️ Validar y sanitizar inputs del usuario

---

## 💡 Ideas de Mejoras Futuras

1. **Cache de Resúmenes**
   - Guardar resúmenes en la colección de productos
   - Regenerar solo cuando hay nuevas reseñas

2. **Análisis de Sentimientos**
   - Agregar porcentaje positivo/negativo
   - Clasificar reseñas por categorías

3. **Multilenguaje**
   - Detectar idioma de las reseñas
   - Generar resúmenes en español/inglés

4. **Respuestas Sugeridas**
   - Generar respuestas automáticas a reseñas negativas
   - Sugerencias de mejora del producto

5. **Visualización**
   - Nube de palabras más mencionadas
   - Gráficos de distribución de calificaciones

---

## 🐛 Troubleshooting

### Error: "API key not valid"
**Solución**: Verifica que la API key en `.env` sea correcta y esté activa en Google Cloud Console.

### Error: "Producto no encontrado"
**Solución**: Asegúrate de que el ID del producto sea válido y exista en la base de datos.

### Error: "Este producto aún no tiene reseñas"
**Solución**: Normal. Usa el script `test-gemini-reviews.js` para insertar datos de prueba.

### Resumen en inglés en vez de español
**Solución**: El prompt ya especifica "resumen en español". Si persiste, ajusta el prompt para ser más explícito.

---

## 📚 Referencias

- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Gemini API Quickstart](https://ai.google.dev/tutorials/get_started_node)
- [Best Practices for Prompts](https://ai.google.dev/docs/prompt_best_practices)

---

## 👨‍💻 Autor

Proyecto **Amboró Café**  
Implementación de IA: Gemini Review Summarizer  
Fecha: Octubre 2025

---

## 📝 Licencia

Este módulo es parte del proyecto Amboró Café y sigue la misma licencia del proyecto principal.
