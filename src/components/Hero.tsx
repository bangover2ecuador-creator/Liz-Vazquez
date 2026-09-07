import { site } from '../data/site'
import { Reveal } from './Primitives'
import { PortraitCarousel } from './PortraitCarousel'

/**
 * Portada.
 *
 * La foto principal es la primera del carrusel: se desliza dentro del
 * marco, así que no hay tira de fotos aparte más abajo.
 */
export function Hero() {
  const enVivo = site.liveNow

  return (
    <section className="hero shell" id="inicio">
      <Reveal>
        <a
          className={`live-pill${enVivo ? ' is-live' : ''}`}
          href={site.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="live-pill__dot" aria-hidden="true" />
          {enVivo ? site.liveNowLabel : site.liveOffLabel}
          {enVivo && <span className="live-pill__go" aria-hidden="true">Entrar</span>}
        </a>
      </Reveal>

      <Reveal delay={80}>
        <PortraitCarousel />
      </Reveal>

      <Reveal delay={140}>
        <p className="hero__tagline">{site.tagline}</p>
        <p className="hero__meta">
          <span>{site.award}</span>
          <span className="hero__dot" aria-hidden="true" />
          <span>{site.location}</span>
        </p>
      </Reveal>
    </section>
  )
}
