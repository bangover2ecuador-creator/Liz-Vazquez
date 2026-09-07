import { Hero } from './components/Hero'
import { Giveaway } from './components/Giveaway'
import { Gallery } from './components/Gallery'
import { Socials } from './components/Socials'
import { About, Finale, Stats } from './components/Sections'
import { Partners } from './components/Partners'
import { TopBar } from './components/TopBar'
import { Footer } from './components/Footer'
import { Dock } from './components/Dock'
import { usePressFeedback } from './usePressFeedback'

export default function App() {
  // Marca lo que el dedo toca; ver el hook para por que no basta :active.
  usePressFeedback()

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <a className="skip" href="#fotos">
        Saltar al contenido
      </a>

      <TopBar />
      <Hero />

      <main>
        {/* Las fotos primero: es lo que mas retiene al llegar. */}
        <Gallery />
        <Giveaway />

        <hr className="rule" />

        <Stats />
        <About />
        <Partners />
        <Finale />

        {/* Las redes cierran la página. */}
        <Socials />
      </main>

      <Footer />
      <Dock />
    </>
  )
}
