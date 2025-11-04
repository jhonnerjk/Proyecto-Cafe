import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>,
)
