import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { ProvedorAutenticacao } from './context/AutenticacaoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProvedorAutenticacao>
      <CartProvider>
        <App />
      </CartProvider>
    </ProvedorAutenticacao>
  </StrictMode>,
)
