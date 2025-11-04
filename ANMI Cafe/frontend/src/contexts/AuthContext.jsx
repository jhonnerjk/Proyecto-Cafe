import React, { createContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          // Si el usuario no tiene rol, intentar obtenerlo del backend
          if (!parsedUser.rol) {
            try {
              const userData = await api.getMe();
              if (userData.usuario) {
                localStorage.setItem('user', JSON.stringify(userData.usuario));
                setUser(userData.usuario);
              } else {
                setUser(parsedUser);
              }
            } catch (error) {
              console.error('Error al obtener usuario actualizado:', error);
              setUser(parsedUser);
            }
          } else {
            setUser(parsedUser);
          }
        } catch (e) {
          console.error('Error al parsear usuario:', e);
          logout();
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, []);

  const login = async (email, password) => {
    const data = await api.login(email, password);
    console.log('Login - Respuesta completa:', data);
    console.log('Login - Usuario recibido:', data.usuario);
    console.log('Login - Rol del usuario:', data.usuario?.rol);
    setUser(data.usuario);
    return data;
  };

  const register = async (nombre, email, password) => {
    const data = await api.register(nombre, email, password);
    console.log('Registro - Respuesta completa:', data);
    console.log('Registro - Usuario creado:', data.usuario);
    setUser(data.usuario);
    return data;
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const userData = await api.getMe();
      if (userData.usuario) {
        localStorage.setItem('user', JSON.stringify(userData.usuario));
        setUser(userData.usuario);
      }
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.rol === 'admin';

  console.log('AuthContext Estado actual:', {
    user,
    isAuthenticated,
    isAdmin,
    userRol: user?.rol
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
