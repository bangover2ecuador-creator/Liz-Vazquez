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
// minimo deja que el quesito termine de entrar y salude una vez: sin
// el, en conexion rapida se ve medio fotograma y queda peor que no
// ponerlo. La salida (encoge y desaparece) la lleva el CSS.
const carga = document.getElementById('carga')
if (carga) {
  const arranque = performance.now()
  const quitar = () => {
    carga.classList.add('fuera')
    setTimeout(() => carga.remove(), 600)
  }
  requestAnimationFrame(() =>
    setTimeout(quitar, Math.max(0, 1150 - (performance.now() - arranque))),
  )
}
