import mongoose from 'mongoose';

const ComentarioSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion', required: true },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  contenido: { type: String, required: true }
}, { timestamps: true, collection: 'comentarios' });

export default mongoose.model('Comentario', ComentarioSchema);
