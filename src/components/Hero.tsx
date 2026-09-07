import { site } from '../data/site'
import { Photo, Reveal } from './Primitives'
import { CrownIcon } from './Icons'

/**
 * Portada: la foto manda.
 *
 * El nombre se fue a la barra superior, y los dos botones de antes
 * ("Ver mis fotos", "Ver todas mis redes") desaparecieron: el carrusel
 * va justo debajo y la barra fija inferior ya lleva a las redes, así
 * que eran atajos hacia cosas que ya están a la vista.
 */
export function Hero() {
  return (
    <section className="hero shell" id="inicio">
      <Reveal>
        <a className="live-pill" href={site.liveUrl} target="_blank" rel="noopener noreferrer">
          <span className="live-pill__dot" aria-hidden="true" />
          {site.intro}
        </a>
      </Reveal>

      <Reveal delay={80}>
        <div className="portrait">
          <span className="portrait__ring portrait__ring--outer" aria-hidden="true" />
          <span className="portrait__ring" aria-hidden="true" />
          <span className="portrait__halo" aria-hidden="true" />
          <div className="portrait__frame">
            <Photo
              name="liz-hero"
              alt={`${site.name}, creadora de contenido de ${site.location}`}
              sizes="288px"
              widths={[640]}
              priority
              width={640}
              height={640}
            />
          </div>
          <span className="portrait__badge" title={site.award}>
            <CrownIcon />
            <span className="sr-only">{site.award}</span>
          </span>
        </div>
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
