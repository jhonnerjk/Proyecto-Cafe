import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'admin'], default: 'usuario' }
}, { timestamps: true, collection: 'usuarios' });

export default mongoose.model('Usuario', UsuarioSchema);
