import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const SensoryEvaluation = () => {
  // Estado para los sliders interactivos
  const [aroma, setAroma] = useState(8.5)
  const [acidez, setAcidez] = useState(7.0)
  const [cuerpo, setCuerpo] = useState(7.5)
  const [dulzura, setDulzura] = useState(9.0)

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="flex h-full grow flex-col">
        <AppHeader active="evaluacion" />

        <div className="flex flex-1">
          <aside className="hidden lg:flex w-64 p-4 border-r border-[#e0e0e0] dark:border-gray-700 flex-col justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">Evaluaciones Recientes</h3>
              <div className="flex flex-col gap-2">
                {/* RECENT EVALUATION 1 - replace '/images/eval-sample-1.svg' with coffee sample image */}
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10" data-alt="Coffee sample" style={{ backgroundImage: `url('/images/eval-sample-1.svg')` }}></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">#ANMI-C00122</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">15/07/2024</p>
                  </div>
                </a>
                
                {/* RECENT EVALUATION 2 - replace '/images/eval-sample-2.svg' with coffee sample image */}
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10" data-alt="Coffee sample" style={{ backgroundImage: `url('/images/eval-sample-2.svg')` }}></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">#ANMI-C00121</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">12/07/2024</p>
                  </div>
                </a>
                
                {/* RECENT EVALUATION 3 - replace '/images/eval-sample-3.svg' with coffee sample image */}
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" href="#">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md size-10" data-alt="Coffee sample" style={{ backgroundImage: `url('/images/eval-sample-3.svg')` }}></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">#ANMI-C00120</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">10/07/2024</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors bg-transparent">
                <span className="material-symbols-outlined text-[#2196F3]">settings</span>
                <p className="text-sm font-medium">Configuración</p>
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors bg-transparent">
                <span className="material-symbols-outlined text-[#2196F3]">help</span>
                <p className="text-sm font-medium">Ayuda</p>
              </button>
            </div>
          </aside>

          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <p className="text-3xl sm:text-4xl font-black tracking-tighter">Evaluación Sensorial de la Muestra #ANMI-C00123</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="@container">
                      <div className="relative flex w-full flex-col items-start justify-between gap-3 @[320px]:flex-row @[320px]:items-center">
                        <div className="flex w-full shrink-[3] items-center justify-between">
                          <p className="text-base font-medium leading-normal">Aroma</p>
                          <p className="text-sm font-normal leading-normal @[320px]:hidden">{aroma.toFixed(1)}</p>
                        </div>
                        <div className="flex h-4 w-full items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={aroma}
                            onChange={(e) => setAroma(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-[#E0E0E0] dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #14b814 0%, #14b814 ${aroma * 10}%, #E0E0E0 ${aroma * 10}%, #E0E0E0 100%)`
                            }}
                          />
                          <p className="text-sm font-normal leading-normal hidden @[320px]:block">{aroma.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="@container">
                      <div className="relative flex w-full flex-col items-start justify-between gap-3 @[320px]:flex-row @[320px]:items-center">
                        <div className="flex w-full shrink-[3] items-center justify-between">
                          <p className="text-base font-medium leading-normal">Acidez</p>
                          <p className="text-sm font-normal leading-normal @[320px]:hidden">{acidez.toFixed(1)}</p>
                        </div>
                        <div className="flex h-4 w-full items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={acidez}
                            onChange={(e) => setAcidez(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-[#E0E0E0] dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #14b814 0%, #14b814 ${acidez * 10}%, #E0E0E0 ${acidez * 10}%, #E0E0E0 100%)`
                            }}
                          />
                          <p className="text-sm font-normal leading-normal hidden @[320px]:block">{acidez.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="@container">
                      <div className="relative flex w-full flex-col items-start justify-between gap-3 @[320px]:flex-row @[320px]:items-center">
                        <div className="flex w-full shrink-[3] items-center justify-between">
                          <p className="text-base font-medium leading-normal">Cuerpo</p>
                          <p className="text-sm font-normal leading-normal @[320px]:hidden">{cuerpo.toFixed(1)}</p>
                        </div>
                        <div className="flex h-4 w-full items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={cuerpo}
                            onChange={(e) => setCuerpo(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-[#E0E0E0] dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #14b814 0%, #14b814 ${cuerpo * 10}%, #E0E0E0 ${cuerpo * 10}%, #E0E0E0 100%)`
                            }}
                          />
                          <p className="text-sm font-normal leading-normal hidden @[320px]:block">{cuerpo.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="@container">
                      <div className="relative flex w-full flex-col items-start justify-between gap-3 @[320px]:flex-row @[320px]:items-center">
                        <div className="flex w-full shrink-[3] items-center justify-between">
                          <p className="text-base font-medium leading-normal">Dulzura</p>
                          <p className="text-sm font-normal leading-normal @[320px]:hidden">{dulzura.toFixed(1)}</p>
                        </div>
                        <div className="flex h-4 w-full items-center gap-4">
                          <input
                            type="range"
                            min="0"
                            max="10"
                            step="0.1"
                            value={dulzura}
                            onChange={(e) => setDulzura(parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-[#E0E0E0] dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #14b814 0%, #14b814 ${dulzura * 10}%, #E0E0E0 ${dulzura * 10}%, #E0E0E0 100%)`
                            }}
                          />
                          <p className="text-sm font-normal leading-normal hidden @[320px]:block">{dulzura.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Notas de Sabor</h3>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Cítrico</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input defaultChecked className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Frutos Rojos</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Tropical</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input defaultChecked className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Chocolate</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Nueces</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 px-3 rounded-full border border-gray-300 dark:border-gray-600 has-[:checked]:bg-primary/20 has-[:checked]:border-primary transition-colors">
                      <input className="form-checkbox rounded text-primary focus:ring-primary/50 focus:ring-offset-0 border-gray-300 dark:border-gray-600" type="checkbox" />
                      <span>Floral</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg font-bold mb-4">Registro de Campo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ÁREA DE SUBIR FOTO */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#e0e0e0] dark:border-gray-600 rounded-lg text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-transparent">
                      <span className="material-symbols-outlined text-4xl text-[#2196F3]">add_a_photo</span>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Arrastra una foto o</p>
                      {/* BOTÓN SUBE UN ARCHIVO - hover con fondo azul transparente */}
                      <button className="mt-1 px-3 py-1 rounded-lg text-sm font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors bg-transparent border-none">Sube un archivo</button>
                    </div>
                    {/* ÁREA DE GRABAR AUDIO */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#e0e0e0] dark:border-gray-600 rounded-lg text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-transparent">
                      <span className="material-symbols-outlined text-4xl text-[#2196F3]">mic</span>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Arrastra un audio o</p>
                      {/* BOTÓN GRABA AHORA - hover con fondo azul transparente */}
                      <button className="mt-1 px-3 py-1 rounded-lg text-sm font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors bg-transparent border-none">Graba ahora</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                  <Link to="/" className="flex items-center gap-2 px-4 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver al inicio
                  </Link>
                  <button className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-md hover:bg-primary/90 transition-colors duration-300">
                    <span className="truncate">Guardar Evaluación</span>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default SensoryEvaluation
