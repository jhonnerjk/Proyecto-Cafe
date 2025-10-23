import React from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const UserProfile = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <AppHeader active="perfil" />
      {/* Cover/Hero superior con acento visual */}
      <section aria-label="Portada del perfil" className="bg-gradient-to-r from-[#e7f3e7] to-[#dff0ff] dark:from-[#1f251f] dark:to-[#0b1220] border-b border-[#e7f3e7] dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div className="flex items-center gap-4">
            {/* HERO ICON - opcional; se puede sustituir por una imagen de portada */}
            <div className="hidden sm:flex size-12 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur border border-white/50 dark:border-white/10 items-center justify-center text-primary">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-secondary dark:text-gray-400">Perfil</p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0e1b0e] dark:text-white truncate">NegroJose</h1>
              <p className="text-sm text-primary/90">Head Barista · ANMI Roastery</p>
            </div>
            <div className="ml-auto hidden sm:flex">
              <Link to="/" className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-white/80 dark:bg-white/10 text-[#0e1b0e] dark:text-white border border-[#e7f3e7] dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700" aria-label="Volver al inicio">
                <span className="material-symbols-outlined">arrow_back</span>
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          {/* Nota: El botón de inicio se movió al lateral izquierdo superior para todas las resoluciones */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Inicio + Perfil y estadísticas */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
              {/* Botón Inicio lateral superior */}
              <div className="mb-4">
                <Link to="/" aria-label="Volver al inicio" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-[#e7f3e7] hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Volver al inicio
                </Link>
              </div>
              <div className="bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm">
                {/* Avatar y nombre */}
                <div className="flex flex-col items-center gap-4 mb-6">
                  {/* PROFILE IMAGE - replace '/images/user-profile.svg' with user avatar */}
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 ring-4 ring-primary/20" role="img" aria-label="Avatar del usuario" style={{ backgroundImage: `url('/images/user-profile.svg')` }}></div>
                  <div className="text-center">
                    <h1 className="text-[#0e1b0e] dark:text-white text-2xl font-bold leading-tight mb-1">NegroJose</h1>
                    <p className="text-primary text-base font-medium">Head Barista</p>
                    <p className="text-secondary dark:text-gray-400 text-sm">ANMI Roastery</p>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d]">
                    <p className="text-[#0e1b0e] dark:text-white text-2xl font-bold">86</p>
                    <p className="text-secondary dark:text-gray-400 text-xs font-medium">Muestras</p>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d]">
                    <p className="text-[#0e1b0e] dark:text-white text-2xl font-bold">102</p>
                    <p className="text-secondary dark:text-gray-400 text-xs font-medium">Evaluaciones</p>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d]">
                    <p className="text-[#0e1b0e] dark:text-white text-2xl font-bold">12</p>
                    <p className="text-secondary dark:text-gray-400 text-xs font-medium">Recetas</p>
                  </div>
                </div>

                {/* Botón Editar Perfil */}
                <button className="w-full flex items-center justify-center gap-2 rounded-lg h-12 px-5 bg-[#14b814] text-white text-base font-bold hover:bg-[#14b814]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700" aria-label="Editar perfil">
                  <span className="material-symbols-outlined">edit</span>
                  Editar Perfil
                </button>
              </div>

              {/* Información adicional - Desktop */}
              <div className="hidden lg:block mt-6 bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-[#0e1b0e] dark:text-white text-lg font-bold mb-4">Información</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <div>
                      <p className="text-secondary dark:text-gray-400 text-xs">Discord</p>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">joseed23</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">phone</span>
                    <div>
                      <p className="text-secondary dark:text-gray-400 text-xs">Teléfono</p>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">+591 61551242</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <div>
                      <p className="text-secondary dark:text-gray-400 text-xs">Ubicación</p>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">SCZ, Bolivia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <div>
                      <p className="text-secondary dark:text-gray-400 text-xs">Miembro desde</p>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">Enero 2023</p>
                    </div>
                  </div>
                  {/* Preferencias de sabor */}
                  <div className="pt-1">
                    <p className="text-secondary dark:text-gray-400 text-xs mb-2">Preferencias de sabor</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white">Frutal</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white">Caramelo</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white">Florales</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white">Cítrico</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Contenido principal */}
            <div className="lg:col-span-2">
              {/* Sección Actividad Reciente */}
              <div className="bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0e1b0e] dark:text-white text-xl font-bold">Actividad Reciente</h2>
                  <button className="px-3 h-9 rounded-lg text-[#0e1b0e] dark:text-white bg-[#e7f3e7] dark:bg-[#2d372d] hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">Ver todo</button>
                </div>
                <div className="space-y-4">
                  {/* Actividad 1 */}
                  <div className="flex items-start gap-4 pb-4 border-b border-[#e7f3e7] dark:border-gray-700">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#14b814]/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#14b814]">science</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">Evaluación sensorial completada</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Muestra #ANMI-C00123 - Geisha Lavado</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Hace 2 horas</p>
                    </div>
                  </div>

                  {/* Actividad 2 */}
                  <div className="flex items-start gap-4 pb-4 border-b border-[#e7f3e7] dark:border-gray-700">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#14b814]/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#14b814]">add_circle</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">Nueva muestra registrada</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Bourbon Rojo - Finca El Sol</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Hace 5 horas</p>
                    </div>
                  </div>

                  {/* Actividad 3 */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#14b814]/20 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#14b814]">restaurant</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium">Receta compartida</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Café con Frutas</p>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Hace 1 día</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección Certificaciones */}
              <div className="bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm mb-6">
                <h2 className="text-[#0e1b0e] dark:text-white text-xl font-bold mb-4">Certificaciones</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d]">
                    <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
                    <div>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-bold">Q Grader</p>
                      <p className="text-secondary dark:text-gray-400 text-xs">CQI - 2022</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d]">
                    <span className="material-symbols-outlined text-primary text-3xl">star</span>
                    <div>
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-bold">Barista SCA</p>
                      <p className="text-secondary dark:text-gray-400 text-xs">Nivel 3 - 2021</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sección Mis Recetas Guardadas */}
              <div className="bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0e1b0e] dark:text-white text-xl font-bold">Mis Recetas Guardadas</h2>
                  <Link to="/recetas" className="px-3 h-9 rounded-lg text-[#0e1b0e] dark:text-white bg-[#e7f3e7] dark:bg-[#2d372d] hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">Ver todo</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* RECIPE IMAGE - Reemplazar cada background por la imagen real de la receta */}
                  <article className="group rounded-xl overflow-hidden border border-[#e7f3e7] dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-center bg-cover" style={{ backgroundImage: `url('/images/recipe-cafe-frutas.svg')` }} aria-label="Imagen de receta guardada"></div>
                    <div className="p-4">
                      <h3 className="text-[#0e1b0e] dark:text-white text-sm font-bold group-hover:underline">Café con Frutas</h3>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Tiempo: 10 min · Nivel: Fácil</p>
                    </div>
                  </article>
                  <article className="group rounded-xl overflow-hidden border border-[#e7f3e7] dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-center bg-cover" style={{ backgroundImage: `url('/images/recipe-infusion.svg')` }} aria-label="Imagen de receta guardada"></div>
                    <div className="p-4">
                      <h3 className="text-[#0e1b0e] dark:text-white text-sm font-bold group-hover:underline">Infusión Cítrica</h3>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Tiempo: 8 min · Nivel: Fácil</p>
                    </div>
                  </article>
                  <article className="group rounded-xl overflow-hidden border border-[#e7f3e7] dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="aspect-video bg-center bg-cover" style={{ backgroundImage: `url('/images/recipe-postre.svg')` }} aria-label="Imagen de receta guardada"></div>
                    <div className="p-4">
                      <h3 className="text-[#0e1b0e] dark:text-white text-sm font-bold group-hover:underline">Postre con Café</h3>
                      <p className="text-secondary dark:text-gray-400 text-xs mt-1">Tiempo: 25 min · Nivel: Medio</p>
                    </div>
                  </article>
                </div>
              </div>

              {/* Sección Mis Evaluaciones */}
              <div className="bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#0e1b0e] dark:text-white text-xl font-bold">Mis Evaluaciones</h2>
                  <Link to="/evaluacion" className="px-3 h-9 rounded-lg text-[#0e1b0e] dark:text-white bg-[#e7f3e7] dark:bg-[#2d372d] hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">Ir a evaluar</Link>
                </div>
                <div className="space-y-3">
                  {/* Ítem evaluación 1 */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#e7f3e7] dark:border-gray-700 hover:bg-[#14b814]/5 dark:hover:bg-white/5 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium truncate">Muestra #ANMI-C00123 · Geisha Lavado</p>
                      <p className="text-secondary dark:text-gray-400 text-xs">Puntaje: 87.25</p>
                    </div>
                    <button className="inline-flex items-center gap-1 px-3 h-9 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">
                      <span className="material-symbols-outlined text-base">visibility</span>
                      Ver
                    </button>
                  </div>
                  {/* Ítem evaluación 2 */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-[#e7f3e7] dark:border-gray-700 hover:bg-[#14b814]/5 dark:hover:bg-white/5 transition-colors">
                    <div className="min-w-0">
                      <p className="text-[#0e1b0e] dark:text-white text-sm font-medium truncate">Muestra #ANMI-C00902 · Bourbon Natural</p>
                      <p className="text-secondary dark:text-gray-400 text-xs">Puntaje: 84.50</p>
                    </div>
                    <button className="inline-flex items-center gap-1 px-3 h-9 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/40 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700">
                      <span className="material-symbols-outlined text-base">visibility</span>
                      Ver
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección Configuración - Mobile */}
              <div className="lg:hidden bg-white dark:bg-secondary/20 rounded-xl border border-[#e7f3e7] dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-[#0e1b0e] dark:text-white text-lg font-bold mb-4">Configuración</h2>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#14b814]/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">notifications</span>
                      <span className="text-[#0e1b0e] dark:text-white text-sm font-medium">Notificaciones</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary dark:text-gray-400">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#14b814]/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">lock</span>
                      <span className="text-[#0e1b0e] dark:text-white text-sm font-medium">Privacidad</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary dark:text-gray-400">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#14b814]/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">help</span>
                      <span className="text-[#0e1b0e] dark:text-white text-sm font-medium">Ayuda</span>
                    </div>
                    <span className="material-symbols-outlined text-secondary dark:text-gray-400">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botón inferior eliminado para mantener un único acceso lateral superior */}
        </div>
      </main>
    </div>
  )
}

export default UserProfile
