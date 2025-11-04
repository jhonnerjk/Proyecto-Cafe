import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import CartMiniPanel from './CartMiniPanel';
import PaymentModal from './PaymentModal';
import { useEffect, useRef, useState } from 'react';
import Avatar from './Avatar';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const { count, checkout } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpenCart(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const headerHeightPx = 72; // slightly larger header for clarity
  return (
  <>
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 bg-card-light dark:bg-card-dark/80 backdrop-blur-sm w-full px-4 sm:px-8 md:px-16 lg:px-32 py-4 font-display" style={{ minHeight: `${headerHeightPx}px`, maxWidth: '100vw' }}>
      <Link to="/" className="flex items-center gap-2 text-[#131811] dark:text-white min-w-[120px]">
        <div className="size-6 text-primary">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
          </svg>
        </div>
        <h2 className="text-[#131811] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]" style={{ marginLeft: 2 }}>ANMI Amboró</h2>
      </Link>
      
  <nav className="hidden md:flex items-center gap-8">
        <Link 
          to="/" 
          className={`text-sm font-medium leading-normal ${
            isActive('/') 
              ? 'text-[#131811] dark:text-gray-300 border-b-2 border-primary' 
              : 'text-[#131811] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
          }`}
        >
          Inicio
        </Link>
        <Link 
          to="/recetas" 
          className={`text-sm font-medium leading-normal ${
            isActive('/recetas') 
              ? 'text-[#131811] dark:text-gray-300 border-b-2 border-primary' 
              : 'text-[#131811] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
          }`}
        >
          Explorar Recetas
        </Link>
        <Link 
          to="/restaurantes" 
          className={`text-sm font-medium leading-normal ${
            isActive('/restaurantes') 
              ? 'text-[#131811] dark:text-gray-300 border-b-2 border-primary' 
              : 'text-[#131811] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
          }`}
        >
          Restaurantes
        </Link>
        <Link 
          to="/tienda" 
          className={`text-sm font-medium leading-normal ${
            isActive('/tienda') 
              ? 'text-[#131811] dark:text-gray-300 border-b-2 border-primary' 
              : 'text-[#131811] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
          }`}
        >
          Tienda
        </Link>
        {/* Mostrar Moderación solo para usuarios admin */}
        {isAdmin && (
          <Link 
            to="/moderacion" 
            className={`text-sm font-medium leading-normal ${
              isActive('/moderacion') 
                ? 'text-[#131811] dark:text-gray-300 border-b-2 border-primary' 
                : 'text-[#131811] dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors'
            }`}
          >
            Moderación
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-4">
        {/* Botón de cambio de tema */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-300 ease-in-out"
          aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          title={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
        >
          {isDarkMode ? (
            <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>
              light_mode
            </span>
          ) : (
            <span className="material-symbols-outlined text-slate-700">
              dark_mode
            </span>
          )}
        </button>

        <div className="relative" ref={cartRef}>
          <button
            type="button"
            onClick={() => setOpenCart((v) => !v)}
            className="relative p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
            aria-label="Abrir carrito"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1">
                {count}
              </span>
            )}
          </button>
          {openCart && (
            <>
              <div className="fixed inset-0 z-[50]" onClick={() => setOpenCart(false)} />
              <CartMiniPanel onClose={() => setOpenCart(false)} onPay={() => { setOpenCart(false); setOpenPayment(true); }} />
            </>
          )}
        </div>
        <button className="hidden md:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#131811] text-sm font-bold leading-normal tracking-[0.015em] gap-2 hover:brightness-110 active:brightness-95 transition-all shadow-md hover:shadow-lg shadow-primary/30">
          <span className="material-symbols-outlined text-base">add</span>
          <span className="truncate">Crea tu Receta</span>
        </button>
        
        {isAuthenticated ? (
          <>
            <Link to="/perfil" title={user?.nombre || 'Perfil'} className="shrink-0 group">
              <div className="flex items-center gap-2">
                <span className="hidden lg:inline text-sm font-medium text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                  {user?.nombre}
                </span>
                <Avatar size="sm" className="hover:ring-primary transition-shadow" />
              </div>
            </Link>
          </>
        ) : (
          <Link 
            to="/login"
            className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-background-light dark:bg-background-dark border border-primary text-primary text-sm font-bold hover:bg-primary/10 transition-all"
          >
            Iniciar sesión
          </Link>
        )}
        
        <div className="md:hidden">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
      {openPayment && (
        <PaymentModal
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          onConfirm={(payload) => {
            checkout(payload);
          }}
        />
      )}
    </header>
    {/* Spacer to prevent content being overlapped by fixed header */}
    <div aria-hidden className="w-full" style={{ height: headerHeightPx }} />
  </>
  );
};

export default Header;
