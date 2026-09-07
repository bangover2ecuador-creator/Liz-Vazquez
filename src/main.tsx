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

// Retira la pantalla de carga en cuanto la app esta montada. El
// minimo de 600 ms evita que el quesito parpadee medio fotograma en
// una conexion rapida, que se ve peor que no ponerlo.
const carga = document.getElementById('carga')
if (carga) {
  const arranque = performance.now()
  const quitar = () => {
    carga.classList.add('fuera')
    setTimeout(() => carga.remove(), 500)
  }
  requestAnimationFrame(() => setTimeout(quitar, Math.max(0, 600 - (performance.now() - arranque))))
}
