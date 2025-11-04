import Pedido from '../models/Pedido.js';
import DetallePedido from '../models/DetallePedido.js';
import Producto from '../models/Producto.js';

// Variable temporal para simular carrito en memoria (en producción usar sesiones o BD)
const carritos = new Map();

// POST /api/cart/add - Añadir producto al carrito
export const agregarAlCarrito = async (req, res) => {
  try {
    const { producto_id, cantidad = 1 } = req.body;
    const usuarioId = req.usuario._id.toString();

    if (!producto_id) {
      return res.status(400).json({ error: 'Se requiere producto_id' });
    }

    // Verificar que el producto existe y tiene stock
    const producto = await Producto.findById(producto_id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (producto.stock < cantidad) {
      return res.status(400).json({ 
        error: 'Stock insuficiente',
        stockDisponible: producto.stock 
      });
    }

    // Obtener o crear carrito del usuario
    let carrito = carritos.get(usuarioId) || [];

    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.producto_id === producto_id);
    
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
      itemExistente.subtotal = itemExistente.cantidad * producto.precio;
    } else {
      carrito.push({
        producto_id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal: producto.precio * cantidad
      });
    }

    carritos.set(usuarioId, carrito);

    res.json({
      mensaje: 'Producto añadido al carrito',
      carrito,
      total: carrito.reduce((sum, item) => sum + item.subtotal, 0)
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al añadir al carrito',
      mensaje: error.message 
    });
  }
};

// GET /api/cart - Obtener carrito actual
export const obtenerCarrito = async (req, res) => {
  try {
    const usuarioId = req.usuario._id.toString();
    const carrito = carritos.get(usuarioId) || [];
    
    const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      carrito,
      total,
      cantidadItems: carrito.length
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener carrito',
      mensaje: error.message 
    });
  }
};

// POST /api/checkout - Finalizar compra
export const finalizarCompra = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const carrito = carritos.get(usuarioId.toString()) || [];

    if (carrito.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + item.subtotal, 0);

    // Crear pedido
    const nuevoPedido = await Pedido.create({
      usuario_id: usuarioId,
      total_pagado: total,
      estado: 'pendiente',
      fecha_pedido: new Date()
    });

    // Crear detalles del pedido y actualizar stock
    for (const item of carrito) {
      await DetallePedido.create({
        pedido_id: nuevoPedido._id,
        producto_id: item.producto_id,
        cantidad: item.cantidad,
        precio_en_compra: item.precio
      });

      // Reducir stock del producto
      await Producto.findByIdAndUpdate(item.producto_id, {
        $inc: { stock: -item.cantidad }
      });
    }

    // Limpiar carrito
    carritos.delete(usuarioId.toString());

    // Poblar información completa del pedido
    const pedidoCompleto = await Pedido.findById(nuevoPedido._id)
      .populate('usuario_id', 'nombre email');

    const detalles = await DetallePedido.find({ pedido_id: nuevoPedido._id })
      .populate('producto_id', 'nombre url_imagen');

    res.status(201).json({
      mensaje: 'Compra realizada exitosamente',
      pedido: {
        ...pedidoCompleto.toObject(),
        detalles
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al procesar compra',
      mensaje: error.message 
    });
  }
};
