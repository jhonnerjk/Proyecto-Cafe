import mongoose from 'mongoose';

const DetallePedidoSchema = new mongoose.Schema({
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precio_en_compra: { type: Number, required: true }
}, { timestamps: true, collection: 'detalles_pedido' });

export default mongoose.model('DetallePedido', DetallePedidoSchema);
