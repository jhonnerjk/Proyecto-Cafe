import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ImportedDashboard from './components/ImportedDashboard'
import SampleRegistration from './components/SampleRegistration'
import RegistrationSuccess from './components/RegistrationSuccess'
import FruitsCatalog from './components/FruitsCatalog'
import SensoryEvaluation from './components/SensoryEvaluation'
import SamplingMaps from './components/SamplingMaps'
import Recipes from './components/Recipes'
import UserProfile from './components/UserProfile'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ImportedDashboard />} />
      <Route path="/registro" element={<SampleRegistration />} />
      <Route path="/registro/exito" element={<RegistrationSuccess />} />
      <Route path="/catalogo" element={<FruitsCatalog />} />
      <Route path="/evaluacion" element={<SensoryEvaluation />} />
      <Route path="/mapas" element={<SamplingMaps />} />
      <Route path="/recetas" element={<Recipes />} />
      <Route path="/perfil" element={<UserProfile />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
