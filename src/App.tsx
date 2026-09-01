import { Hero } from './components/Hero'
import { Giveaway } from './components/Giveaway'
import { Gallery } from './components/Gallery'
import { Socials } from './components/Socials'
import { About, Finale, Highlights, Stats } from './components/Sections'
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

      <Hero />

      <main>
        {/* Sorteos justo debajo de los dos botones del hero. */}
        <Giveaway />

        <hr className="rule" />

        <Stats />
        <Gallery />
        <About />
        <Highlights />
        <Finale />

        {/* Las redes cierran la página. */}
        <Socials />
      </main>

      <Footer />
      <Dock />
    </>
  )
}
