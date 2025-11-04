import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirigir a login si no está autenticado
        navigate('/login', { state: { from: window.location.pathname } });
      } else if (requireAdmin && !isAdmin) {
        // Redirigir al inicio si requiere admin y no lo es
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, loading, navigate, requireAdmin]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-text-light dark:text-text-dark">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // No renderizar si no está autenticado o no tiene permisos
  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
