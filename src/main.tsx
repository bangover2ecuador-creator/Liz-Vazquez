import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Solo los subsets y pesos que usa una landing en espanol:
// el subset 'latin' ya cubre acentos y signos de apertura.
// Manrope variable trae sus subsets con unicode-range: el navegador
// descarga unicamente el que necesita.
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-500-italic.css'
import '@fontsource-variable/manrope'

import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
