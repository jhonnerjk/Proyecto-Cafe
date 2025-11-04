import Usuario from '../models/Usuario.js';

// GET /api/users/me - Obtener perfil del usuario autenticado
export const getMe = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario._id).select('-password');
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener perfil',
      mensaje: error.message 
    });
  }
};
