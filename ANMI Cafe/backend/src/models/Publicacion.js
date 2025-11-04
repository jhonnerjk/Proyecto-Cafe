import mongoose from 'mongoose';

const PublicacionSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  texto_anecdota: { type: String, required: true },
  fotos: [{ type: String }]
}, { timestamps: true, collection: 'publicaciones' });

export default mongoose.model('Publicacion', PublicacionSchema);
