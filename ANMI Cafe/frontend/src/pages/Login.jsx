import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.nombre, formData.email, formData.password);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Error al autenticarse');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background-light to-secondary/10 dark:from-background-dark dark:via-background-dark dark:to-background-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo y header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-black text-primary mb-2">ANMI Café</h1>
          </Link>
          <p className="text-text-light/70 dark:text-text-dark/70">
            {isLogin ? '¡Bienvenido de nuevo!' : 'Únete a nuestra comunidad'}
          </p>
        </div>

        {/* Card de formulario */}
        <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-xl border border-border-light dark:border-border-dark p-8">
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-600 dark:text-red-400">
              <span className="material-symbols-outlined">error</span>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Juan Pérez"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light dark:text-text-dark mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={4}
                className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary hover:brightness-110 text-white font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                  Procesando...
                </span>
              ) : isLogin ? (
                'Iniciar Sesión'
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ nombre: '', email: '', password: '' });
              }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
