import { site, socials } from '../data/site'
import { Photo, Reveal } from './Primitives'
import { CrownIcon, TikTokIcon } from './Icons'

const mainTikTok = socials.find((s) => s.featured)?.url ?? 'https://www.tiktok.com/@lis_iv'

export function Hero() {
  return (
    <header className="hero shell">
      <Reveal>
        <span className="live-pill">
          <span className="live-pill__dot" aria-hidden="true" />
          {site.intro}
        </span>
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
              sizes="224px"
              widths={[480]}
              priority
              width={480}
              height={480}
            />
          </div>
          <span className="portrait__badge" title={site.award}>
            <CrownIcon />
            <span className="sr-only">{site.award}</span>
          </span>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <h1 className="hero__name">{site.name}</h1>
        <p className="hero__tagline">{site.tagline}</p>

        <p className="hero__meta">
          <span>{site.award}</span>
          <span className="hero__dot" aria-hidden="true" />
          <span>{site.location}</span>
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="hero__actions">
          <a
            className="btn btn--primary"
            href={mainTikTok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokIcon />
            Seguirme en TikTok
          </a>
          <a className="btn btn--ghost" href="#redes">
            Ver todas mis redes
          </a>
        </div>
      </Reveal>
    </header>
  )
}
