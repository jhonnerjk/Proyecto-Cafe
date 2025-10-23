import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Props:
// - active: 'inicio' | 'registro' | 'inventario' | 'evaluacion' | 'mapas' | 'recetas' | 'perfil' | 'admin'
// - showBack?: boolean
// - backTo?: string (default '/')
const AppHeader = ({ active = 'inicio', showBack = false, backTo = '/' }) => {
  const navigate = useNavigate()
  const isActive = (key) => active === key

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7f3e7] dark:border-gray-700 px-4 md:px-10 py-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-primary dark:text-accent">
        {showBack ? (
          <button onClick={() => navigate(backTo)} className="p-2 rounded-lg hover:bg-primary/10" aria-label="Volver">
            <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">arrow_back</span>
          </button>
        ) : null}
        <div className="size-8">
          <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
          </svg>
        </div>
        <h2 className="text-secondary dark:text-white text-xl font-bold">ANMI Café</h2>
      </div>

      <nav className="hidden md:flex flex-1 justify-center items-center gap-6">
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('inicio') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/">Inicio</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('registro') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/registro">Registro de muestra</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('inventario') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/catalogo">Inventario de Frutas</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('evaluacion') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/evaluacion">Evaluación sensorial</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('mapas') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/mapas">Mapas</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('admin') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/admin">Admin</Link>
        <Link className={`text-secondary dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-accent transition-colors ${isActive('recetas') ? 'text-primary dark:text-accent font-semibold' : ''}`} to="/recetas">Recetas</Link>
      </nav>

      <div className="flex items-center gap-4">
        {/* Admin quick access */}
        <Link to="/admin" className="hidden md:flex items-center justify-center size-10 rounded-lg hover:bg-primary/10" title="Administración">
          <span className="material-symbols-outlined">admin_panel_settings</span>
        </Link>
        {/* Profile quick access */}
        <Link to="/perfil" title="Perfil">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User profile picture" style={{ backgroundImage: `url('/images/profile-placeholder.svg')` }}></div>
        </Link>
        <button className="md:hidden flex items-center justify-center size-10 rounded-lg hover:bg-primary/10">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  )
}

export default AppHeader
