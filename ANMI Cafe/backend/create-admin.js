/**
 * Script para crear usuario administrador
 * Ejecutar con: node create-admin.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '.env') });

// Esquema de Usuario (simplificado para el script)
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
}, { timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

async function createAdmin() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Primero, eliminar todos los usuarios admin existentes
    const deletedUsers = await Usuario.deleteMany({ rol: 'admin' });
    if (deletedUsers.deletedCount > 0) {
      console.log(`Eliminados ${deletedUsers.deletedCount} usuario(s) admin antiguo(s)`);
    }

    // Datos del nuevo admin
    const adminData = {
      nombre: 'Admin User',
      email: 'admin@anmicafe.com',
      password: 'admin123', // ADVERTENCIA: En producción usar bcrypt
      rol: 'admin'
    };

    // Crear nuevo admin
    const newAdmin = await Usuario.create(adminData);
    console.log('Nuevo usuario admin creado exitosamente');

    console.log('\nEmail:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Rol: admin');
    console.log('ID:', newAdmin._id, '\n');

    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
