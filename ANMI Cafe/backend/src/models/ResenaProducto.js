import mongoose from 'mongoose';

const ResenaProductoSchema = new mongoose.Schema({
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  comentario: { type: String },
  calificacion: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true, collection: 'resenas_producto' });

export default mongoose.model('ResenaProducto', ResenaProductoSchema);
