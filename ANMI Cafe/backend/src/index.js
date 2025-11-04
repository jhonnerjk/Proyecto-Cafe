import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import postsRoutes from './routes/posts.routes.js';
import recipesRoutes from './routes/recipes.routes.js';
import restaurantsRoutes from './routes/restaurants.routes.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import adminRoutes from './routes/admin.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import aiRoutes from './routes/ai.routes.js';

// Configurar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (fotos subidas)
app.use('/uploads', express.static('uploads'));

// Función para crear índices
async function crearIndices() {
  const db = mongoose.connection.db;
  
  try {
    console.log('Creando índices de MongoDB...');
    
    // Usuarios - Email único
    await db.collection('usuarios').createIndex({ email: 1 }, { unique: true });
    
    // Restaurantes - Búsqueda geoespacial
    await db.collection('restaurantes').createIndex({ ubicacion: '2dsphere' });
    
    // Productos - Búsquedas
    await db.collection('productos').createIndex({ nombre: 1 });
    await db.collection('productos').createIndex({ categoria: 1 });
    
    // Publicaciones - Ordenamiento
    await db.collection('publicaciones').createIndex({ createdAt: -1 });
    
    // Recetas - Búsqueda por fruta
    await db.collection('recetasugc').createIndex({ fruta: 1 });
    await db.collection('recetasoficiales').createIndex({ fruta: 1 });
    
    console.log('Índices creados correctamente');
  } catch (error) {
    console.log('Algunos índices ya existen (esto es normal)');
  }
}

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API ANMI Café - Funcionando correctamente',
    version: '2.0.0',
    endpoints: {
      autenticacion: '/api/auth',
      usuarios: '/api/users',
      publicaciones: '/api/posts',
      recetas: '/api/recipes',
      restaurantes: '/api/restaurants',
      productos: '/api/products',
      carrito: '/api/cart',
      admin: '/api/admin',
      uploads: '/api/uploads',
      ai: '/api/ai'
    }
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/restaurants', restaurantsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/ai', aiRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    ruta: req.originalUrl
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Error interno del servidor'
  });
});

// Conectar a MongoDB y luego iniciar el servidor
async function iniciarServidor() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Crear índices
    await crearIndices();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`\nServidor corriendo en http://localhost:${PORT}`);
      console.log(`Endpoints disponibles:`);
      console.log(`\nAutenticación:`);
      console.log(`   POST   /api/auth/register`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   GET    /api/users/me`);
      console.log(`\nComunidad:`);
      console.log(`   POST   /api/posts`);
      console.log(`   GET    /api/posts`);
      console.log(`   POST   /api/posts/:id/comment`);
      console.log(`\nRecetas:`);
      console.log(`   POST   /api/recipes/ugc`);
      console.log(`   GET    /api/recipes/ugc`);
      console.log(`   POST   /api/recipes/ugc/:id/rate`);
      console.log(`   GET    /api/recipes/official`);
      console.log(`\nRestaurantes:`);
      console.log(`   GET    /api/restaurants`);
      console.log(`   POST   /api/restaurants/:id/review`);
      console.log(`\nE-Commerce:`);
      console.log(`   GET    /api/products`);
      console.log(`   GET    /api/products/:id`);
      console.log(`   POST   /api/products/:id/review`);
      console.log(`   GET    /api/products/:id/reviews`);
      console.log(`   POST   /api/cart/add`);
      console.log(`   GET    /api/cart`);
      console.log(`   POST   /api/cart/checkout`);
      console.log(`\nModeración (Admin):`);
      console.log(`   GET    /api/admin/content?filter=negative`);
      console.log(`   DELETE /api/admin/content/:id`);
      console.log(`\nUploads:`);
      console.log(`   POST   /api/uploads`);
      console.log(`Carpeta de uploads: ./uploads/`);
    });
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

// Iniciar la aplicación
iniciarServidor();

export default app;
