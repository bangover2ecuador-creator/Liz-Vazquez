import { about, gallery, highlights, site, socials, stats } from '../data/site'
import { CountUp, Photo, Reveal } from './Primitives'
import { CheckIcon, TikTokIcon } from './Icons'

const mainTikTok = socials.find((s) => s.featured)?.url ?? 'https://www.tiktok.com/@lis_iv'

// ── Cifras ───────────────────────────────────────────────────

export function Stats() {
  return (
    <section className="section section--tight shell" aria-label="Cifras de la comunidad">
      <div className="stats">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <div className="stat">
              <p className="stat__value">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="stat__label">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Galería ──────────────────────────────────────────────────

export function Gallery() {
  return (
    <section className="section shell" id="fotos">
      <Reveal className="section-head section-head--center">
        <span className="eyebrow">Galería</span>
        <h2 className="section-title">
          Momentos <em>favoritos</em>
        </h2>
        <p className="section-sub">Capturados para ti.</p>
      </Reveal>

      <div className="gallery">
        {gallery.map((shot, i) => (
          <Reveal
            key={shot.id}
            delay={i * 90}
            className={shot.ratio === 'wide' ? 'shot shot--wide' : 'shot'}
          >
            <Photo
              name={shot.src}
              alt={`${site.name} — ${shot.caption}`}
              sizes={shot.ratio === 'wide' ? '(min-width: 48rem) 640px, 92vw' : '(min-width: 48rem) 320px, 46vw'}
            />
            <p className="shot__caption">{shot.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Sobre Liz ────────────────────────────────────────────────

export function About() {
  return (
    <section className="section shell" id="sobre-mi">
      <Reveal className="section-head">
        <span className="eyebrow">Sobre mí</span>
        <h2 className="section-title">{about.heading}</h2>
      </Reveal>

      <Reveal delay={80} className="about__text">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <blockquote className="about__quote">«{site.tagline}»</blockquote>
      </Reveal>

      <Reveal delay={160}>
        <ul className="pillars">
          {about.pillars.map((p) => (
            <li key={p.id}>
              <CheckIcon />
              {p.title}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

// ── Momentos destacados ──────────────────────────────────────

export function Highlights() {
  return (
    <section className="section shell" aria-label="Momentos destacados">
      <Reveal className="section-head section-head--center">
        <span className="eyebrow">Trayectoria</span>
        <h2 className="section-title">
          Momentos <em>destacados</em>
        </h2>
        <p className="section-sub">Mis mejores recuerdos, contigo.</p>
      </Reveal>

      <div className="highlights">
        {highlights.map((h, i) => (
          <Reveal key={h.id} delay={i * 60}>
            <article className="highlight">
              <span className="highlight__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="highlight__title">{h.title}</h3>
              <p className="highlight__detail">{h.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── CTA final ────────────────────────────────────────────────

export function Finale() {
  return (
    <section className="section section--tight shell">
      <Reveal>
        <div className="finale">
          <span className="eyebrow">Te espero</span>
          <h2 className="finale__title">¿Nos vemos en el live?</h2>
          <p className="finale__body">
            No te pierdas ningún live ni momento especial. Estoy todos los días.
          </p>
          <a
            className="btn btn--primary btn--block"
            href={mainTikTok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokIcon />
            Seguirme en TikTok
          </a>
        </div>
      </Reveal>
    </section>
  )
}
