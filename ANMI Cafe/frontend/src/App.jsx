import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import CommunityDashboard from './pages/CommunityDashboard'
import ExploreRecipes from './pages/ExploreRecipes'
import RestaurantsGuide from './pages/RestaurantsGuide'
import Store from './pages/Store'
import UserProfile from './pages/UserProfile'
import ModerationPanel from './pages/ModerationPanel'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<CommunityDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recetas" element={<ExploreRecipes />} />
        <Route path="/restaurantes" element={<RestaurantsGuide />} />
        <Route path="/guia-restaurantes" element={<RestaurantsGuide />} />
        <Route path="/tienda" element={<Store />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route 
          path="/moderacion" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <ModerationPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  )
}

export default App

