import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Playfair va recortada al espanol (src/fonts.css). Manrope variable
// trae sus subsets con unicode-range: el navegador baja solo el latino.
import './fonts.css'
import '@fontsource-variable/manrope'

import './styles.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
