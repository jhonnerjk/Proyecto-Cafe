/**
 * Controlador de Autenticación
 * 
 * ADVERTENCIA DE SEGURIDAD:
 * Este código guarda contraseñas sin encriptar para propósitos de aprendizaje.
 * NUNCA hacer esto en un proyecto real de producción.
 * 
 * En producción usar:
 * - bcrypt o argon2 para hashear passwords
 * - Variables de entorno seguras
 * - HTTPS obligatorio
 * - Rate limiting en endpoints de auth
 */

import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { usuarioSchema, usuarioLoginSchema } from '../schemas/Usuario.schema.js';

// Generar JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.APP_TOKEN, {
    expiresIn: '30d'
  });
};

// POST /api/auth/register - Registrar un nuevo usuario
export const register = async (req, res) => {
  try {
    // Validar datos con Zod (si vienen del middleware validate estarán en req.validated.body)
    const datosValidados = req.validated?.body || usuarioSchema.parse(req.body);

    // Verificar si el email ya existe
    const usuarioExiste = await Usuario.findOne({ email: datosValidados.email });
    if (usuarioExiste) {
      return res.status(400).json({ 
        error: 'El email ya está registrado' 
      });
    }

    // Crear usuario (sin encriptar password - solo para aprendizaje)
    const nuevoUsuario = await Usuario.create(datosValidados);

    // Generar token
    const token = generarToken(nuevoUsuario._id);

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol
      },
      token
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al registrar usuario',
      mensaje: error.message 
    });
  }
};

// POST /api/auth/login - Iniciar sesión
export const login = async (req, res) => {
  try {
    // Validar datos con Zod (si vienen del middleware validate estarán en req.validated.body)
    const datosValidados = req.validated?.body || usuarioLoginSchema.parse(req.body);

    // Buscar usuario
    const usuario = await Usuario.findOne({ email: datosValidados.email });
    if (!usuario) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Verificar password (comparación directa - solo para aprendizaje)
    if (usuario.password !== datosValidados.password) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }

    // Generar token
    const token = generarToken(usuario._id);

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token
    });
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos', 
        detalles: error.errors 
      });
    }
    res.status(500).json({ 
      error: 'Error al iniciar sesión',
      mensaje: error.message 
    });
  }
};
