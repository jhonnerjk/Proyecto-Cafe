import React from 'react'
import { Link } from 'react-router-dom'
import AppHeader from './layout/AppHeader'

const FruitsCatalog = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <AppHeader active="inventario" />
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">

            <main className="px-4 md:px-10 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div className="w-full md:w-1/2 lg:w-1/3">
                  <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                      <div className="text-[#14b814] flex border-none bg-[#e7f3e7] dark:bg-[#2d372d] items-center justify-center pl-4 rounded-l-lg border-r-0">
                        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>search</span>
                      </div>
                      <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e1b0e] dark:text-[#e7f3e7] focus:outline-0 focus:ring-0 border-none bg-[#e7f3e7] dark:bg-[#2d372d] focus:border-none h-full placeholder:text-[#0e1b0e]/50 dark:placeholder:text-[#e7f3e7]/50 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" placeholder="Buscar fruta..." defaultValue="" />
                    </div>
                  </label>
                </div>
                <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#14b814]/20 dark:bg-[#14b814]/30 pl-4 pr-4 cursor-pointer">
                    <p className="text-[#14b814] text-sm font-medium leading-normal">Todos</p>
                  </div>
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] pl-4 pr-4 cursor-pointer hover:bg-[#14b814]/20 dark:hover:bg-[#14b814]/30 transition-colors">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-sm font-medium leading-normal">Cítricos</p>
                  </div>
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] pl-4 pr-4 cursor-pointer hover:bg-[#14b814]/20 dark:hover:bg-[#14b814]/30 transition-colors">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-sm font-medium leading-normal">Bayas</p>
                  </div>
                  <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] pl-4 pr-4 cursor-pointer hover:bg-[#14b814]/20 dark:hover:bg-[#14b814]/30 transition-colors">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-sm font-medium leading-normal">Aromáticas</p>
                  </div>
                </div>
              </div>

              {/* FRUIT IMAGES: Replace each '/images/fruit-N.svg' with your real image path under public/images (e.g., /images/limon.jpg). */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
                {/* Card 1 - replace '/images/fruit-1.svg' with image for Limón */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Fresh lemons on a branch" style={{ backgroundImage: `url('/images/fruit-1.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Limón</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Citrus limon</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 2 - replace '/images/fruit-2.svg' with image for Fresa */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Ripe strawberries in a basket" style={{ backgroundImage: `url('/images/fruit-2.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Fresa</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Fragaria ananassa</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 3 - replace '/images/fruit-3.svg' with image for Menta */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Mint leaves on a dark background" style={{ backgroundImage: `url('/images/fruit-3.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Menta</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Mentha</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 4 - replace '/images/fruit-4.svg' with image for Naranja */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Juicy oranges, whole and sliced" style={{ backgroundImage: `url('/images/fruit-4.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Naranja</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Citrus × sinensis</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 5 - replace '/images/fruit-5.svg' with image for Mora */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="A handful of fresh blackberries" style={{ backgroundImage: `url('/images/fruit-5.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Mora</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Rubus ulmifolius</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 6 - replace '/images/fruit-6.svg' with image for Lavanda */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Lavender flowers in a field" style={{ backgroundImage: `url('/images/fruit-6.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Lavanda</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Lavandula</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 7 - replace '/images/fruit-7.svg' with image for Pomelo */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Sliced grapefruit showing its pink flesh" style={{ backgroundImage: `url('/images/fruit-7.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Pomelo</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Citrus × paradisi</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>

                {/* Card 8 - replace '/images/fruit-8.svg' with image for Arándano */}
                <div className="flex flex-col gap-3 pb-3 group">
                  <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl overflow-hidden transform group-hover:scale-105 transition-transform duration-300" data-alt="Blueberries in a white bowl" style={{ backgroundImage: `url('/images/fruit-8.svg')` }}></div>
                  <div className="px-1">
                    <p className="text-[#0e1b0e] dark:text-[#e7f3e7] text-lg font-bold leading-normal">Arándano</p>
                    <p className="text-[#0e1b0e]/70 dark:text-[#e7f3e7]/70 text-sm font-normal leading-normal italic">Vaccinium corymbosum</p>
                    <a className="text-[#14b814] text-sm font-medium leading-normal mt-1 inline-block" href="#">Ver detalles de la fruta</a>
                  </div>
                </div>
              </div>

              {/* Back button */}
              <div className="mt-10">
                <Link to="/" className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-[#e7f3e7] dark:bg-[#2d372d] text-[#0e1b0e] dark:text-[#e7f3e7]">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Volver al inicio
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FruitsCatalog
