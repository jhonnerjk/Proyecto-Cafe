import React from 'react'
import AppHeader from './layout/AppHeader'

const SamplingMaps = () => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      <AppHeader active="mapas" />

  <main className="flex flex-1 pt-[64px] h-full">
        <aside className="hidden lg:flex flex-col w-72 bg-background-light dark:bg-background-dark border-r border-primary/20 p-6 space-y-6">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Filtros de Muestreo</h1>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="species-filter">Especie</label>
              <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary" id="species-filter">
                <option>Arábica</option>
                <option>Robusta</option>
                <option>Todas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="date-filter">Rango de Fechas</label>
              <input className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary" id="date-filter" type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="researcher-filter">Investigador</label>
              <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary focus:ring-primary" id="researcher-filter">
                <option>Juan Pérez</option>
                <option>Ana García</option>
                <option>Todos</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-2 pt-4 border-t border-primary/20">
            <button className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium">Aplicar Filtros</button>
            <button className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium">Limpiar</button>
          </div>
        </aside>

        <div className="flex-1 relative @container">
          {/* MAP BACKGROUND - replace '/images/map-satellite.svg' with your real map image */}
          <div className="bg-cover bg-center flex h-full w-full flex-col justify-between" data-alt="Mapa satelital de una región cafetera con puntos de muestreo marcados" data-location="Coffee Region, Colombia" style={{ backgroundImage: `url('/images/map-satellite.svg')` }}>
            <div className="p-4 flex justify-between items-start">
              <label className="flex flex-col min-w-40 h-12 w-full max-w-sm">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-lg">
                  <div className="text-gray-500 dark:text-gray-400 flex border-none bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-background-light dark:bg-background-dark h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-2 text-base font-normal leading-normal" placeholder="Buscar una muestra específica..." defaultValue="" />
                </div>
              </label>
              {/* Floating filter button for mobile */}
              <button className="lg:hidden flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>

            {/* Sample map point with a popup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
              <span className="material-symbols-outlined text-primary text-4xl drop-shadow-lg cursor-pointer">fmd_good</span>
              <div className="p-4 @container absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-72 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <div className="flex flex-col items-stretch justify-start rounded-xl shadow-2xl bg-background-light dark:bg-background-dark overflow-hidden">
                  {/* POPUP IMAGE - replace '/images/map-popup.svg' with your sample photo */}
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" data-alt="Foto de granos de café Arábica en una planta" style={{ backgroundImage: `url('/images/map-popup.svg')` }}></div>
                  <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 p-4">
                    <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Muestra #12345</p>
                    <div className="flex items-end gap-3 justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-300">Especie: Arábica</p>
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-300">Fecha: 15/08/2023</p>
                      </div>
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-medium">
                        <span className="truncate">Ver Detalles</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 p-4">
              <div className="flex flex-col gap-0.5 rounded-lg overflow-hidden shadow-lg">
                <button className="flex size-10 items-center justify-center bg-background-light dark:bg-background-dark">
                  <span className="material-symbols-outlined text-gray-800 dark:text-gray-200">add</span>
                </button>
                <button className="flex size-10 items-center justify-center bg-background-light dark:bg-background-dark">
                  <span className="material-symbols-outlined text-gray-800 dark:text-gray-200">remove</span>
                </button>
              </div>
              <button className="flex size-10 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark shadow-lg">
                <span className="material-symbols-outlined text-gray-800 dark:text-gray-200">navigation</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SamplingMaps
