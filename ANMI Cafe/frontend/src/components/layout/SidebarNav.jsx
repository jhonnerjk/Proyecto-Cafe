import React from 'react'
import { Link } from 'react-router-dom'

const SidebarNav = ({ active = 'inventario', className = '' }) => {
  return (
    <aside className={`hidden lg:flex flex-col w-64 bg-background-light dark:bg-background-dark p-4 border-r border-[#e7f3e7] dark:border-gray-700 ${className}`}>
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[#0e1b0e] dark:text-white text-base font-bold">ANMI Café</h1>
          <p className="text-secondary dark:text-gray-400 text-sm">Coffee management app</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg ${active==='inventario' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-[#0e1b0e] dark:text-white'}`} to="/catalogo">
          <span className="material-symbols-outlined {active==='inventario' ? 'text-primary' : ''}">inventory_2</span>
          <p className="text-sm font-medium">Inventario de Frutas</p>
        </Link>
        <Link className={`flex items-center gap-3 px-3 py-2 rounded-lg ${active==='mapas' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10 text-[#0e1b0e] dark:text-white'}`} to="/mapas">
          <span className="material-symbols-outlined">map</span>
          <p className="text-sm font-medium">Mapas</p>
        </Link>
      </div>
    </aside>
  )
}

export default SidebarNav
