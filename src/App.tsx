import { useCallback, useState } from 'react'
import { Hero } from './components/Hero'
import { TopBar } from './components/TopBar'
import { Menu, type Destino } from './components/Menu'
import { Vista } from './components/Vista'
import { Giveaway } from './components/Giveaway'
import { Partners } from './components/Partners'
import { Socials } from './components/Socials'
import { About, Stats } from './components/Sections'
import { Footer } from './components/Footer'
import { usePressFeedback } from './usePressFeedback'

const titulos: Record<Destino, string> = {
  beneficios: 'Beneficios',
  marcas: 'Colaboraciones',
  'sobre-mi': 'Conoce más de mí',
  redes: 'Mis redes',
}

/**
 * La portada es una pantalla, no una página larga.
 *
 * Todo lo que antes se recorría haciendo scroll (sorteos, marcas,
 * sobre mí, redes) vive ahora detrás del menú: se entra en cada
 * sección a pantalla completa y se vuelve con atrás. Por eso ya no
 * hace falta la barra fija de abajo.
 */
export default function App() {
  usePressFeedback()
  const [vista, setVista] = useState<Destino | null>(null)
  const cerrar = useCallback(() => setVista(null), [])

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <TopBar />

      <main className="pantalla">
        <Hero />
        <Menu onAbrir={setVista} />
        <Stats />
      </main>

      <Footer />

      <Vista abierta={vista === 'beneficios'} titulo={titulos.beneficios} onCerrar={cerrar}>
        <Giveaway />
      </Vista>

      <Vista abierta={vista === 'marcas'} titulo={titulos.marcas} onCerrar={cerrar}>
        <Partners />
      </Vista>

      <Vista abierta={vista === 'sobre-mi'} titulo={titulos['sobre-mi']} onCerrar={cerrar}>
        <About />
      </Vista>

      <Vista abierta={vista === 'redes'} titulo={titulos.redes} onCerrar={cerrar}>
        <Socials />
      </Vista>
    </>
  )
}
