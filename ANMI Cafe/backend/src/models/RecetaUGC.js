import mongoose from 'mongoose';


const RecetaUGCSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  fruta: { type: String, required: true, index: true },
  descripcion: { type: String },
  ingredientes: [{ type: String }],
  instrucciones: { type: String },
  foto: { type: String }, // URL de imagen asociada a la receta
  calificacion_promedio: { type: Number, default: 0 },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true, collection: 'recetasugc' });

export default mongoose.model('RecetaUGC', RecetaUGCSchema);
