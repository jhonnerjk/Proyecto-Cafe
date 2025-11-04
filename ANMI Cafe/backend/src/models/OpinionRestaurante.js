import mongoose from 'mongoose';

const OpinionRestauranteSchema = new mongoose.Schema({
  restaurante_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurante', required: true },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  opinion: { type: String },
  calificacion: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true, collection: 'opiniones_restaurante' });

export default mongoose.model('OpinionRestaurante', OpinionRestauranteSchema);
