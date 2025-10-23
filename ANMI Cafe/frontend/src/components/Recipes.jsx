import React from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const Recipes = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <AppHeader active="recetas" />
        
        <main className="flex flex-1 w-full">
          <div className="flex flex-1 flex-col lg:flex-row px-4 sm:px-10 py-5 gap-8">
            {/* Sidebar con filtros */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-28">
                <div className="flex h-full min-h-[700px] flex-col justify-between p-4 rounded-xl bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col">
                      <h1 className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Filtros</h1>
                      <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal">Por tipo de producto</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#14b814]/20" href="#">
                        <span className="material-symbols-outlined text-[#14b814]">local_cafe</span>
                        <p className="text-[#14b814] text-sm font-medium leading-normal">Bebidas</p>
                      </a>
                      <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#14b814]/10" href="#">
                        <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">cake</span>
                        <p className="text-[#0e1b0e] dark:text-white text-sm font-medium leading-normal">Postres</p>
                      </a>
                      <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#14b814]/10" href="#">
                        <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">science</span>
                        <p className="text-[#0e1b0e] dark:text-white text-sm font-medium leading-normal">Fermentados</p>
                      </a>
                      <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#14b814]/10" href="#">
                        <span className="material-symbols-outlined text-[#0e1b0e] dark:text-white">spa</span>
                        <p className="text-[#0e1b0e] dark:text-white text-sm font-medium leading-normal">Tradicionales</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Contenido principal */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 gap-4">
                <Link to="/" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-[#e7f3e7] hover:bg-[#14b814]/10">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Volver al inicio
                </Link>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-[#14b814] text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/90 transition-colors">
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="truncate">Agregar receta</span>
                </button>
              </div>

              {/* Grid de recetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
                {/* Receta 1 - IMAGEN: Café con Frutas - replace '/images/recipe-cafe-frutas.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Una refrescante combinación de café y frutas de temporada" style={{ backgroundImage: `url('/images/recipe-cafe-frutas.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Café con Frutas</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">Una refrescante combinación de café y frutas de temporada.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>

                {/* Receta 2 - IMAGEN: Mermelada de Café - replace '/images/recipe-mermelada.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Una deliciosa mermelada para acompañar tus tostadas" style={{ backgroundImage: `url('/images/recipe-mermelada.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Mermelada de Café</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">Una deliciosa mermelada para acompañar tus tostadas.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>

                {/* Receta 3 - IMAGEN: Infusión de Café - replace '/images/recipe-infusion.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Una infusión aromática para relajarse en cualquier momento" style={{ backgroundImage: `url('/images/recipe-infusion.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Infusión de Café</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">Una infusión aromática para relajarse en cualquier momento.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>

                {/* Receta 4 - IMAGEN: Postre de Café - replace '/images/recipe-postre.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Un postre cremoso y lleno de sabor a café" style={{ backgroundImage: `url('/images/recipe-postre.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Postre de Café</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">Un postre cremoso y lleno de sabor a café.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>

                {/* Receta 5 - IMAGEN: Bebida Fermentada - replace '/images/recipe-fermentada.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Una bebida probiótica con un toque único de café" style={{ backgroundImage: `url('/images/recipe-fermentada.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Bebida Fermentada de Café</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">Una bebida probiótica con un toque único de café.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>

                {/* Receta 6 - IMAGEN: Café Tradicional - replace '/images/recipe-tradicional.svg' */}
                <div className="flex flex-col gap-3 pb-3 rounded-xl overflow-hidden bg-white dark:bg-secondary/20 border border-[#e7f3e7] dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="El clásico café de olla con un toque especial de la casa" style={{ backgroundImage: `url('/images/recipe-tradicional.svg')` }}></div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal">Café Tradicional</p>
                    <p className="text-secondary dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4 flex-1">El clásico café de olla con un toque especial de la casa.</p>
                    <button className="mt-auto w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#14b814]/20 text-[#14b814] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/30 transition-colors">Ver receta</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-[#e7f3e7] dark:border-gray-700 mt-10 bg-white dark:bg-secondary/10">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
            <a className="text-secondary dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary dark:hover:text-accent transition-colors" href="#">Términos y condiciones</a>
            <a className="text-secondary dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary dark:hover:text-accent transition-colors" href="#">Política de privacidad</a>
            <a className="text-secondary dark:text-gray-400 text-base font-normal leading-normal min-w-40 hover:text-primary dark:hover:text-accent transition-colors" href="#">Contacto</a>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
          </div>
          <p className="text-secondary dark:text-gray-400 text-base font-normal leading-normal">© 2024 ANMI Café. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  )
}

export default Recipes
