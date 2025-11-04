/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);

// Obtener el ID del usuario actual para almacenamiento aislado
const getCurrentUserId = () => {
  try {
    const user = localStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.id || parsed._id || 'guest';
    }
  } catch {
    // Si falla, usar 'guest'
  }
  return 'guest';
};

export const CartProvider = ({ children }) => {
  const userId = getCurrentUserId();
  
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(`cart_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [purchases, setPurchases] = useState(() => {
    try {
      const raw = localStorage.getItem(`purchases_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
    } catch {
      // Ignorar error de persistencia
    }
  }, [items, userId]);

  useEffect(() => {
    try {
      localStorage.setItem(`purchases_${userId}`, JSON.stringify(purchases));
    } catch {
      // Ignorar error de persistencia
    }
  }, [purchases, userId]);

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + qty };
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, qty }];
    });
  };

  const removeFromCart = (id, qty = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.id === id);
      if (idx === -1) return prev;
      const item = prev[idx];
      const newQty = (item.qty || 1) - qty;
      if (newQty <= 0) return prev.filter(p => p.id !== id);
      const copy = [...prev];
      copy[idx] = { ...item, qty: newQty };
      return copy;
    });
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((acc, it) => acc + (it.qty || 1), 0), [items]);
  const total = useMemo(() => items.reduce((acc, it) => acc + (it.price || 0) * (it.qty || 1), 0), [items]);

  const checkout = useCallback((payload) => {
    // payload: { method, methodDetails, feeAmount, grandTotal, subtotal }
    const snapshot = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      subtotal: total,
      fee: payload?.feeAmount ?? 0,
      total: payload?.grandTotal ?? total,
      method: payload?.method ?? 'unknown',
      methodDetails: payload?.methodDetails ?? {},
    };
    setPurchases(prev => [snapshot, ...prev]);
    clearCart();
    return snapshot.id;
  }, [items, total]);

  const value = useMemo(() => ({ 
    items, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    count, 
    total, 
    purchases, 
    checkout 
  }), [items, count, total, purchases, checkout]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
