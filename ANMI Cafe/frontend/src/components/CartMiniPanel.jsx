import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartMiniPanel = ({ onClose, onPay }) => {
  const { items, removeFromCart, addToCart, clearCart, total, count } = useCart();

  return (
    <div className="absolute right-4 top-16 z-[60] w-[340px] sm:w-[380px] rounded-xl border border-primary/30 bg-white shadow-2xl overflow-hidden transform origin-top-right animate-[fadeIn_.15s_ease-out]">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <p className="font-bold text-sm">Tu carrito <span className="text-gray-500 font-normal">({count})</span></p>
        {items.length > 0 && (
          <button className="text-xs text-gray-600 rounded px-2 py-1 transition-colors hover:bg-blue-100 hover:text-blue-700" onClick={clearCart}>Vaciar</button>
        )}
      </div>
      <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-100">
        {items.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            <img alt="Empty cart" className="w-16 h-16 mx-auto opacity-70" src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" />
            <p className="mt-2">Tu carrito está vacío</p>
          </div>
        ) : (
          items.map((it) => (
            <div key={it.id} className="p-3 flex items-center gap-3 flex-wrap">
              <div className="w-12 h-12 bg-center bg-cover rounded-lg" style={{ backgroundImage: `url('${it.image}')` }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{it.name}</p>
                <p className="text-xs text-gray-500">{it.qty} x Bs {it.price?.toFixed?.(2) ?? it.price}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded transition-colors hover:bg-blue-100 hover:text-blue-700" onClick={() => removeFromCart(it.id)} title="Quitar 1">
                  <span className="material-symbols-outlined text-base">remove</span>
                </button>
                <span className="px-1 text-sm tabular-nums">{it.qty}</span>
                <button className="p-1 rounded transition-colors hover:bg-blue-100 hover:text-blue-700" onClick={() => addToCart(it, 1)} title="Agregar 1">
                  <span className="material-symbols-outlined text-base">add</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total</span>
          <span className="font-bold">Bs {total.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Link to="/tienda" onClick={onClose} className="flex-1 inline-flex items-center justify-center rounded-lg h-9 bg-gray-100 hover:bg-gray-200 text-sm font-semibold">
            Ver tienda
          </Link>
          <button disabled={items.length === 0} onClick={items.length === 0 ? undefined : onPay} className={`flex-1 inline-flex items-center justify-center rounded-lg h-9 text-sm font-bold ${items.length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:brightness-110'}`}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartMiniPanel;
