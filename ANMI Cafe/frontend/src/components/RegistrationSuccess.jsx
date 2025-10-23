import React from 'react'
import { Link } from 'react-router-dom'

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white/80 dark:bg-secondary/20 border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center shadow-md">
        <div className="mx-auto mb-4 size-16 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#0e1b0e] dark:text-white mb-2">Muestra guardada</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Tu registro se ha completado correctamente.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/registro" className="px-4 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-[#0e1b0e] dark:text-white font-medium flex items-center">Registrar otra</Link>
          <Link to="/" className="px-4 h-10 rounded-lg bg-[#14b814] text-white font-semibold flex items-center">Ir al inicio</Link>
        </div>
      </div>
    </div>
  )
}

export default RegistrationSuccess
