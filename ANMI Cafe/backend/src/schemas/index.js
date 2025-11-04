import { z } from 'zod';
export { usuarioSchema, usuarioLoginSchema } from './Usuario.schema.js';

// Publicaciones
export const publicacionSchema = z.object({
  texto_anecdota: z.string().min(1, 'La anécdota es requerida').max(5000),
  fotos: z.array(z.string().url()).optional()
});

// Comentarios
export const comentarioSchema = z.object({
  contenido: z.string().min(1, 'El comentario es requerido').max(2000)
});

// Recetas UGC
export const recetaUGCSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido').max(200),
  fruta: z.string().min(1, 'La fruta es requerida').max(100),
  descripcion: z.string().max(5000).optional(),
  ingredientes: z.array(z.string().min(1)).min(1, 'Debes agregar al menos un ingrediente').optional(),
  instrucciones: z.string().max(10000).optional(),
  foto: z.string().url('Debe ser una URL válida').optional().or(z.literal('')) // URL de imagen o vacío
});

// Opinión de Restaurante
export const opinionRestauranteSchema = z.object({
  opinion: z.string().max(3000).optional(),
  calificacion: z.number().int().min(1).max(5)
});

// Reseña de Producto
export const resenaProductoSchema = z.object({
  comentario: z.string().max(3000).optional(),
  calificacion: z.number().int().min(1).max(5)
});
