import React from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const ImportedDashboard = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <AppHeader active="inicio" />

      <main className="flex-1">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="py-12">
            <div className="@container">
              <div className="@[480px]:p-4">
                {/* HERO - replace '/images/hero-placeholder.svg' with your hero/banner image URL */}
                <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10" data-alt="High-quality image blending coffee beans with exotic fruits" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), url('/images/hero-placeholder.svg')` }}>
                  <div className="flex flex-col gap-2 text-left">
                    <h1 className="text-white text-4xl font-black tracking-tight @[480px]:text-5xl">Bienvenido a ANMI Café</h1>
                    <h2 className="text-white text-base font-normal @[480px]:text-lg">Gestiona la calidad y trazabilidad de tu café, desde la siembra hasta la taza.</h2>
                  </div>
                  <Link to="/registro" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary hover:bg-opacity-90 text-white text-sm font-bold @[480px]:text-base transition-all duration-300 ease-in-out transform hover:scale-105">
                    <span className="truncate">Explorar muestras</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex h-full min-h-[700px] flex-col justify-start bg-background-light dark:bg-background-dark p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-secondary dark:text-white text-lg font-bold">Filtros</h1>
                      <button className="lg:hidden text-secondary dark:text-white">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-secondary dark:text-white text-base font-medium">Especie</h2>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Arábica</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Robusta</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Libérica</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-secondary dark:text-white text-base font-medium">Tipo de café</h2>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Lavado</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Natural</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Honey</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h2 className="text-secondary dark:text-white text-base font-medium">Región</h2>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Antioquia</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Huila</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600" type="checkbox" />
                          <span className="text-text-light dark:text-text-dark text-sm">Sierra Nevada</span>
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                {/** Card 1 - replace '/images/card-1.svg' with image for Card 1 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Geisha coffee beans ready for washing process" style={{ backgroundImage: `url('/images/card-1.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Geisha Lavado - Finca La Esperanza</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">23/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

                {/** Card 2 - replace '/images/card-2.svg' with image for Card 2 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Red Bourbon coffee cherries on a branch" style={{ backgroundImage: `url('/images/card-2.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Bourbon Rojo - Finca El Sol</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">21/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

                {/** Card 3 - replace '/images/card-3.svg' with image for Card 3 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Caturra coffee beans drying in the sun" style={{ backgroundImage: `url('/images/card-3.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Caturra Natural - Finca Las Nubes</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">19/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

                {/** Card 4 - replace '/images/card-4.svg' with image for Card 4 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Typica coffee with a honey-like texture" style={{ backgroundImage: `url('/images/card-4.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Typica Miel - Finca El Valle</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">18/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

                {/** Card 5 - replace '/images/card-5.svg' with image for Card 5 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Pacamara coffee cherries in a mountain landscape" style={{ backgroundImage: `url('/images/card-5.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Pacamara Lavado - Finca La Montaña</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">17/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

                {/** Card 6 - replace '/images/card-6.svg' with image for Card 6 */}
                <div className="flex flex-col gap-3 pb-3 rounded-lg overflow-hidden bg-white dark:bg-secondary/20 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover" data-alt="Maragogipe coffee beans surrounded by forest elements" style={{ backgroundImage: `url('/images/card-6.svg')` }}></div>
                  <div className="p-4">
                    <p className="text-secondary dark:text-white text-base font-bold leading-normal">Maragogipe Natural - Finca El Bosque</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">15/10/2024</p>
                    <a className="text-primary dark:text-accent text-sm font-medium leading-normal mt-2 inline-block group-hover:underline" href="#">Ver detalle</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-secondary/10 mt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:justify-around mb-6">
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent text-sm font-normal transition-colors" href="#">Términos y condiciones</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent text-sm font-normal transition-colors" href="#">Política de privacidad</a>
            <a className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent text-sm font-normal transition-colors" href="#">Contacto</a>
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors" href="#" aria-label="Facebook">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
            </a>
            <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors" href="#" aria-label="Twitter">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
            </a>
            <a className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors" href="#" aria-label="Instagram">
              <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2h.001zm-1.04 4.25a.75.75 0 00-1.5 0v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5a.75.75 0 001.5 0v-1.5h1.5a.75.75 0 000-1.5h-1.5v-1.5zm-3.61 1.543a.75.75 0 00-1.06-1.06l-2.02 2.02a.75.75 0 101.06 1.06l2.02-2.02zM12 12a3 3 0 100-6 3 3 0 000 6z" fillRule="evenodd"></path></svg>
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 ANMI Café</p>
        </div>
      </footer>
    </div>
  )
}

export default ImportedDashboard
