/**
 * Controlador de Uploads - Sistema Local SIMPLIFICADO
 * 
 * Las fotos se guardan en la carpeta 'uploads/' del servidor.
 * Ideal para proyectos de aprendizaje.
 */

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // TODAS las fotos van a la carpeta 'uploads/'
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp-nombreoriginal.ext
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// Filtro de archivos (solo imágenes)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (jpg, png, webp, gif)'), false);
  }
};

// Configurar multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite: 5MB
  }
});

// Middleware para subir una sola imagen
export const uploadSingle = upload.single('foto');

// Middleware para subir múltiples imágenes
export const uploadMultiple = upload.array('fotos', 5); // Máximo 5 fotos

// POST /api/uploads - Subir foto
export const subirFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No se proporcionó ninguna imagen' 
      });
    }

    // URL pública del archivo
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      mensaje: 'Foto subida exitosamente',
      foto: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        fullUrl: `${req.protocol}://${req.get('host')}${fileUrl}`
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al subir foto',
      mensaje: error.message 
    });
  }
};

// POST /api/uploads/multiple - Subir múltiples fotos
export const subirMultiplesFotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'No se proporcionaron imágenes' 
      });
    }

    const fotos = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/uploads/${file.filename}`,
      fullUrl: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    }));

    res.status(201).json({
      mensaje: `${fotos.length} foto(s) subida(s) exitosamente`,
      fotos
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al subir fotos',
      mensaje: error.message 
    });
  }
};

// DELETE /api/uploads/:filename - Eliminar foto
export const eliminarFoto = async (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = `uploads/${filename}`;

    // Verificar que el archivo existe
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ 
        error: 'Archivo no encontrado' 
      });
    }

    // Eliminar archivo
    fs.unlinkSync(filepath);

    res.json({
      mensaje: 'Foto eliminada exitosamente',
      filename
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar foto',
      mensaje: error.message 
    });
  }
};

// GET /api/uploads/config - Obtener configuración
export const obtenerConfig = async (req, res) => {
  try {
    res.json({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      maxFiles: 5,
      allowedTypes: [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/webp',
        'image/gif'
      ],
      allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener configuración',
      mensaje: error.message 
    });
  }
};
