import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from './layout/AppHeader'
import SidebarNav from './layout/SidebarNav'

const SampleRegistration = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState({ name: '', species: '' })
  const nameRef = useRef(null)
  const speciesRef = useRef(null)

  const saveSample = () => {
    const newErrors = { name: '', species: '' }
    if (!name.trim()) newErrors.name = 'El nombre de la muestra es obligatorio.'
    if (!species) newErrors.species = 'Selecciona una especie.'
    setErrors(newErrors)

    if (newErrors.name) {
      nameRef.current?.focus()
      return
    }
    if (newErrors.species) {
      speciesRef.current?.focus()
      return
    }
    // All good → navigate to success
    navigate('/registro/exito')
  }
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <div className="flex flex-1">
        <SidebarNav active="inventario" />
        <main className="flex-1">
          <AppHeader active="registro" showBack backTo="/" />
          <div className="p-4 sm:p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-between gap-3 mb-8">
                <p className="text-[#0e1b0e] dark:text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Registro de Nueva Muestra</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex max-w-full flex-wrap items-end gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal pb-2">Nombre de la muestra <span className="text-red-500">*</span></p>
                      <div className="flex w-full flex-1 items-stretch rounded-lg">
                        <input
                          ref={nameRef}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={!!errors.name}
                          className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e1b0e] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#14b814]/50 border bg-background-light dark:bg-background-dark h-14 placeholder:text-secondary/70 dark:placeholder-gray-400 p-[15px] text-base font-normal leading-normal ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-[#d0e7d0] dark:border-gray-600 focus:border-[#14b814]'}`}
                          placeholder="Ej. Geisha Finca Las Nubes"
                        />
                      </div>
                      {errors.name ? <p className="text-sm text-red-600 mt-1">{errors.name}</p> : null}
                    </label>
                  </div>
                  <div className="flex max-w-full flex-wrap items-end gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal pb-2">Especie/Fruta <span className="text-red-500">*</span></p>
                      <select
                        ref={speciesRef}
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        aria-invalid={!!errors.species}
                        className={`form-select appearance-none flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e1b0e] dark:text-white focus:outline-0 focus:ring-2 border bg-background-light dark:bg-background-dark h-14 placeholder:text-secondary/70 dark:placeholder-gray-400 p-[15px] text-base font-normal leading-normal ${errors.species ? 'border-red-500 focus:ring-red-200' : 'border-[#d0e7d0] dark:border-gray-600 focus:border-[#14b814] focus:ring-[#14b814]/50'}`}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="arabica">Arábica</option>
                        <option value="robusta">Robusta</option>
                        <option value="liberica">Libérica</option>
                        <option value="excelsa">Excelsa</option>
                      </select>
                      {errors.species ? <p className="text-sm text-red-600 mt-1">{errors.species}</p> : null}
                    </label>
                  </div>
                  <div>
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal pb-2">Ubicación</p>
                    {/* MAP IMAGE - replace '/images/map-placeholder.svg' with your map image URL or static map snapshot */}
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-lg bg-cover bg-center" data-location="Antigua, Guatemala" style={{ backgroundImage: `url('/images/map-placeholder.svg')` }}>
                    </div>
                    <p className="text-xs text-secondary dark:text-gray-400 mt-2">Puedes arrastrar el pin para ajustar la ubicación exacta.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal pb-2 block" htmlFor="sensory-notes">Notas Sensoriales</label>
                    <textarea
                      id="sensory-notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="form-textarea w-full resize-y rounded-lg text-[#0e1b0e] dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#14b814]/50 border border-[#d0e7d0] dark:border-gray-600 bg-background-light dark:bg-background-dark focus:border-[#14b814] placeholder:text-secondary/70 dark:placeholder-gray-400 p-[15px] text-base font-normal leading-normal"
                      placeholder="Describe los aromas, sabores, acidez, cuerpo..."
                      rows={4}
                    ></textarea>
                  </div>
                  <div>
                    <p className="text-[#0e1b0e] dark:text-white text-base font-medium leading-normal pb-2">Foto de la Muestra</p>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#d0e7d0] dark:border-gray-600 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <span className="material-symbols-outlined text-4xl text-[#795548]/50 dark:text-gray-500">cloud_upload</span>
                        <div className="flex text-sm text-secondary dark:text-gray-400">
                          <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-[#14b814] hover:text-[#14b814]/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#14b814]/50" htmlFor="file-upload">
                            <span>Sube un archivo</span>
                            <input className="sr-only" id="file-upload" name="file-upload" type="file" />
                          </label>
                          <p className="pl-1">o arrástralo y suéltalo</p>
                        </div>
                        <p className="text-xs text-secondary/70 dark:text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <button onClick={saveSample} className="w-full flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-4 bg-[#14b814] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#14b814]/90 transition-colors">
                      <span className="truncate">Guardar muestra</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SampleRegistration
