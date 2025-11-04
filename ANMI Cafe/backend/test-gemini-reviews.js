/**
 * Script de prueba para el endpoint de resumen de reseñas con Gemini AI
 * Ejecutar: node test-gemini-reviews.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Producto from './src/models/Producto.js';
import ResenaProducto from './src/models/ResenaProducto.js';
import Usuario from './src/models/Usuario.js';

dotenv.config();

// Datos de prueba
const resenasEjemplo = [
  {
    comentario: "Excelente café! El sabor es increíble y muy aromático. Lo recomiendo al 100%.",
    calificacion: 5
  },
  {
    comentario: "Muy buen producto, aunque el precio es un poco elevado. La calidad lo vale.",
    calificacion: 4
  },
  {
    comentario: "El mejor café que he probado. Perfecto para las mañanas.",
    calificacion: 5
  },
  {
    comentario: "Buen sabor pero esperaba algo más fuerte. Aún así está bien.",
    calificacion: 3
  },
  {
    comentario: "Me encanta! Tiene un sabor suave y delicado. Ideal para tomar en cualquier momento.",
    calificacion: 5
  },
  {
    comentario: "El empaque llegó dañado pero el café está bien. Sabor agradable.",
    calificacion: 4
  }
];

async function insertarDatosDePrueba() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB\n');

    // Buscar o crear un usuario de prueba
    let usuario = await Usuario.findOne({ email: 'test@example.com' });
    if (!usuario) {
      console.log('👤 Creando usuario de prueba...');
      usuario = await Usuario.create({
        nombre: 'Usuario Prueba',
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('✅ Usuario creado:', usuario.nombre);
    } else {
      console.log('✅ Usuario encontrado:', usuario.nombre);
    }

    // Buscar el primer producto disponible
    let producto = await Producto.findOne();
    if (!producto) {
      console.log('📦 Creando producto de prueba...');
      producto = await Producto.create({
        nombre: 'Café de Altura - Tostado Medio',
        descripcion: 'Café premium de las montañas de Bolivia',
        precio: 104.5,
        stock: 50,
        categoria: 'cafe',
        imagen: 'https://example.com/cafe.jpg'
      });
      console.log('✅ Producto creado:', producto.nombre);
    } else {
      console.log('✅ Producto encontrado:', producto.nombre);
    }

    // Limpiar reseñas anteriores de este producto
    await ResenaProducto.deleteMany({ producto_id: producto._id });
    console.log('\n🗑️  Reseñas anteriores eliminadas');

    // Insertar nuevas reseñas de ejemplo
    console.log('\n📝 Insertando reseñas de ejemplo...');
    for (const resena of resenasEjemplo) {
      await ResenaProducto.create({
        producto_id: producto._id,
        usuario_id: usuario._id,
        comentario: resena.comentario,
        calificacion: resena.calificacion
      });
      console.log(`  ⭐ ${resena.calificacion}/5 - "${resena.comentario.substring(0, 50)}..."`);
    }

    console.log('\n✅ Todas las reseñas insertadas correctamente!');
    console.log('\n📊 Información del producto:');
    console.log(`   ID: ${producto._id}`);
    console.log(`   Nombre: ${producto.nombre}`);
    console.log(`   Total de reseñas: ${resenasEjemplo.length}`);
    
    console.log('\n🔗 Prueba el endpoint:');
    console.log(`   GET http://localhost:3000/api/products/${producto._id}/reviews/summary`);
    console.log('\n💡 O usa este comando curl:');
    console.log(`   curl http://localhost:3000/api/products/${producto._id}/reviews/summary`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

// Ejecutar el script
insertarDatosDePrueba();
