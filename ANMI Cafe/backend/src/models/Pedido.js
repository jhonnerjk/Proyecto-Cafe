import mongoose from 'mongoose';

const PedidoSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  total_pagado: { type: Number, required: true },
  estado: { type: String, default: 'pendiente' },
  fecha_pedido: { type: Date, required: true }
}, { timestamps: true, collection: 'pedidos' });

export default mongoose.model('Pedido', PedidoSchema);
