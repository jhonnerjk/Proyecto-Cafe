import React from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const AdminDashboard = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
  {/* Header full width */}
  <AppHeader active="admin" />

      <main className="flex-1 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                {/* Back to home button at top-left */}
                <div className="mb-4">
                  <Link to="/" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-[#e7f3e7] hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver al inicio
                  </Link>
                </div>

                <div className="flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700">
                  <h1 className="text-[#0e1b0e] dark:text-white text-lg font-bold mb-2">Panel de Admin</h1>
                  <Link className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 text-primary" to="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <p className="text-sm font-bold">Dashboard</p>
                  </Link>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-[#0e1b0e] dark:text-white" href="#">
                    <span className="material-symbols-outlined">group</span>
                    <p className="text-sm font-bold">Usuarios</p>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-[#0e1b0e] dark:text-white" href="#">
                    <span className="material-symbols-outlined">eco</span>
                    <p className="text-sm font-bold">Especies</p>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-[#0e1b0e] dark:text-white" href="#">
                    <span className="material-symbols-outlined">science</span>
                    <p className="text-sm font-bold">Muestras</p>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-[#0e1b0e] dark:text-white" href="#">
                    <span className="material-symbols-outlined">menu_book</span>
                    <p className="text-sm font-bold">Recetas</p>
                  </a>
                  <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 text-[#0e1b0e] dark:text-white" href="#">
                    <span className="material-symbols-outlined">assessment</span>
                    <p className="text-sm font-bold">Reportes</p>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <section className="lg:col-span-3">
              {/* Top toolbar within page: two profile/admin actions */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#0e1b0e] dark:text-white">Dashboard de Administración</h2>
                <div className="flex items-center gap-2">
                  {/* Admin button */}
                  <Link to="/admin" className="flex items-center gap-2 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] px-4 h-10 text-sm font-bold text-[#0e1b0e] dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    <span className="hidden sm:inline">Admin</span>
                  </Link>
                  {/* Profile button */}
                  <Link to="/perfil" className="flex items-center gap-2 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] px-4 h-10 text-sm font-bold text-[#0e1b0e] dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    <span className="material-symbols-outlined">person</span>
                    <span className="hidden sm:inline">Perfil</span>
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20 p-6">
                  <p className="text-base font-medium text-secondary dark:text-gray-400">Usuarios Activos</p>
                  <p className="text-3xl font-bold text-[#0e1b0e] dark:text-white">1,234</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20 p-6">
                  <p className="text-base font-medium text-secondary dark:text-gray-400">Muestras Registradas</p>
                  <p className="text-3xl font-bold text-[#0e1b0e] dark:text-white">5,678</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20 p-6">
                  <p className="text-base font-medium text-secondary dark:text-gray-400">Especies Catalogadas</p>
                  <p className="text-3xl font-bold text-[#0e1b0e] dark:text-white">90</p>
                </div>
              </div>

              {/* User management */}
              <div className="mt-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <h3 className="text-xl font-bold text-[#0e1b0e] dark:text-white">Gestión de Usuarios</h3>
                  <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg bg-primary h-10 px-4 text-sm font-bold text-white hover:bg-primary/90">
                    <span className="material-symbols-outlined mr-2">add</span>
                    <span className="truncate">Crear Usuario</span>
                  </button>
                </div>
                <div className="mt-4 overflow-x-auto rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20">
                  <div className="p-4">
                    <input className="w-full rounded-lg border-[#d0e7d0] dark:border-gray-600 bg-[#f6f8f6] dark:bg-gray-700 px-4 py-2 text-sm text-[#0e1b0e] dark:text-gray-200 focus:border-primary focus:ring-primary" placeholder="Buscar usuarios..." type="text" />
                  </div>
                  <table className="min-w-full divide-y divide-[#e7f3e7] dark:divide-gray-700">
                    <thead className="bg-[#f6f8f6] dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Rol</th>
                        <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7f3e7] dark:divide-gray-700 bg-white dark:bg-secondary/20">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0e1b0e] dark:text-white">John Doe</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">john.doe@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">Admin</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a className="text-primary hover:underline" href="#">Editar</a>
                          <a className="ml-4 text-red-600 hover:text-red-700" href="#">Eliminar</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0e1b0e] dark:text-white">Jane Smith</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">jane.smith@example.com</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">Colaborador</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a className="text-primary hover:underline" href="#">Editar</a>
                          <a className="ml-4 text-red-600 hover:text-red-700" href="#">Eliminar</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Species & Recipe Validation */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#0e1b0e] dark:text-white">Validación de Especies y Recetas</h3>

                {/* Species */}
                <div className="mt-4 overflow-x-auto rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20">
                  <div className="p-4 border-b border-[#e7f3e7] dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-[#0e1b0e] dark:text-white">Especies</h4>
                  </div>
                  <table className="min-w-full divide-y divide-[#e7f3e7] dark:divide-gray-700">
                    <thead className="bg-[#f6f8f6] dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Estado</th>
                        <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7f3e7] dark:divide-gray-700 bg-white dark:bg-secondary/20">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0e1b0e] dark:text-white">Arábica</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">2023-10-26</td>
                        <td className="whitespace-nowrap px-6 py-4"><span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Aprobado</span></td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a className="text-primary hover:underline" href="#">Validar</a>
                          <a className="ml-4 text-red-600 hover:text-red-700" href="#">Eliminar</a>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0e1b0e] dark:text-white">Robusta</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">2023-10-25</td>
                        <td className="whitespace-nowrap px-6 py-4"><span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">Pendiente</span></td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a className="text-primary hover:underline" href="#">Validar</a>
                          <a className="ml-4 text-red-600 hover:text-red-700" href="#">Eliminar</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Recipes */}
                <div className="mt-6 overflow-x-auto rounded-lg border border-[#e7f3e7] dark:border-gray-700 bg-white dark:bg-secondary/20">
                  <div className="p-4 border-b border-[#e7f3e7] dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-[#0e1b0e] dark:text-white">Recetas</h4>
                  </div>
                  <table className="min-w-full divide-y divide-[#e7f3e7] dark:divide-gray-700">
                    <thead className="bg-[#f6f8f6] dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary dark:text-gray-300">Estado</th>
                        <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7f3e7] dark:divide-gray-700 bg-white dark:bg-secondary/20">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#0e1b0e] dark:text-white">Espresso</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-secondary dark:text-gray-300">2023-10-24</td>
                        <td className="whitespace-nowrap px-6 py-4"><span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Aprobado</span></td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a className="text-primary hover:underline" href="#">Aprobar</a>
                          <a className="ml-4 text-red-600 hover:text-red-700" href="#">Eliminar</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
