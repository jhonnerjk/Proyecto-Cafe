import mongoose from 'mongoose';

const RecetaOficialSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  fruta: { type: String, required: true, index: true },
  descripcion: { type: String },
  url_imagen: { type: String }
}, { timestamps: true, collection: 'recetasoficiales' });

export default mongoose.model('RecetaOficial', RecetaOficialSchema);
