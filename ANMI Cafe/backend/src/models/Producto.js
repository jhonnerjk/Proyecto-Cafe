import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  categoria: { type: String, index: true },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  url_imagen: { type: String }
}, { timestamps: true, collection: 'productos' });

export default mongoose.model('Producto', ProductoSchema);
