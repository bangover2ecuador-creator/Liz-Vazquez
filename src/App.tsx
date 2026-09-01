import { Hero } from './components/Hero'
import { Socials } from './components/Socials'
import { Giveaway } from './components/Giveaway'
import { About, Finale, Gallery, Highlights, Stats } from './components/Sections'
import { Footer } from './components/Footer'
import { Dock } from './components/Dock'

export default function App() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <a className="skip" href="#redes">
        Saltar a mis redes
      </a>

      <Hero />

      <main>
        {/* Lo que la gente vino a buscar, primero. */}
        <Socials />
        <Giveaway />

        <hr className="rule" />

        <Stats />
        <Gallery />
        <About />
        <Highlights />
        <Finale />
      </main>

      <Footer />
      <Dock />
    </>
  )
}
