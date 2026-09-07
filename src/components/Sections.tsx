import { about, highlights, site, stats } from '../data/site'
import { CountUp, Reveal } from './Primitives'
import { ArrowIcon, CheckIcon } from './Icons'

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

// ── Sobre Liz ────────────────────────────────────────────────

export function About() {
  return (
    <section className="section shell" id="sobre-mi">
      <Reveal className="section-head">
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
        <h2 className="section-title">Momentos destacados</h2>
        <p className="section-sub">Mis mejores recuerdos, contigo.</p>
      </Reveal>

      <div className="highlights">
        {highlights.map((h, i) => (
          <Reveal key={h.id} delay={i * 60}>
            <article className="highlight">
              <h3 className="highlight__title">{h.title}</h3>
              <p className="highlight__detail">{h.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// ── Cierre ───────────────────────────────────────────────────
// Antesala de las redes. Sin boton propio: las tarjetas de abajo
// ya son el llamado a la accion, y repetir "Seguirme en TikTok"
// aqui lo dejaria tres veces en la misma pantalla.

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
          <p className="finale__cue" aria-hidden="true">
            Elige por dónde seguirme
            <ArrowIcon />
          </p>
        </div>
      </Reveal>
    </section>
  )
}
