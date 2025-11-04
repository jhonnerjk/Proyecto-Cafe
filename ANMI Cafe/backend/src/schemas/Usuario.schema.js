import { z } from 'zod';

export const usuarioSchema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto').max(100),
  email: z.string().email('Email inválido').max(200),
  password: z.string().min(4, 'Password muy corta').max(200),
  rol: z.enum(['usuario', 'admin']).optional().default('usuario')
});

export const usuarioLoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(4, 'Password muy corta')
});

export default { usuarioSchema, usuarioLoginSchema };
