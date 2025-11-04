import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

// Middleware de autenticación con JWT
export const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || '';
    const [scheme, token] = authHeader.split(' ');

    if (!token || scheme.toLowerCase() !== 'bearer') {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar token y extraer id de usuario
    const payload = jwt.verify(token, process.env.APP_TOKEN);

    // Cargar usuario (solo campos básicos)
    const usuario = await Usuario.findById(payload.id).select('_id nombre email rol');
    if (!usuario) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

// Middleware para verificar rol de admin
export const verificarAdmin = async (req, res, next) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar permisos' });
  }
};

export default verificarToken;
