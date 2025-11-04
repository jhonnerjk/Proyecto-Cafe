/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext(null);

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

export const UserProvider = ({ children }) => {
  const userId = getCurrentUserId();
  
  const [paymentMethods, setPaymentMethods] = useState(() => {
    try {
      const raw = localStorage.getItem(`paymentMethods_${userId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`paymentMethods_${userId}`, JSON.stringify(paymentMethods));
    } catch {
      // Ignorar error de persistencia
    }
  }, [paymentMethods, userId]);

  const addPaymentMethod = (method) => {
    setPaymentMethods(prev => [...prev, { ...method, id: Date.now() }]);
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
  };

  const value = useMemo(() => ({
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
  }), [paymentMethods]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};

export default UserContext;
