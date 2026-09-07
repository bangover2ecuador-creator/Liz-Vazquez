import { partners, partnersIntro, site } from '../data/site'
import { Reveal } from './Primitives'
import { ArrowIcon, PlayIcon } from './Icons'

/**
 * Marcas y colaboraciones.
 *
 * Cada ficha tiene dos destinos, y por eso no es un solo enlace: el
 * cuerpo lleva a la cuenta de la marca y el botón de al lado al vídeo
 * que Liz publicó con ella. El vídeo es la prueba del trabajo, así que
 * es lo que se ve primero al mirar la tarjeta de reojo.
 *
 * Los grupos sin ninguna marca no se pintan. Una sección llena
 * convence; un hueco vacío al lado de tres llenas, no.
 */
export function Partners() {
  const grupos = partners.filter((g) => g.items.length > 0)
  const total = grupos.reduce((n, g) => n + g.items.length, 0)

  return (
    <section className="section shell" id="marcas">
      <Reveal className="section-head section-head--center">
        <h2 className="section-title">{partnersIntro.heading}</h2>
        <p className="section-sub">{partnersIntro.sub}</p>
      </Reveal>

      <div className="partners">
        {grupos.map((grupo, g) => (
          <Reveal key={grupo.id} delay={g * 80}>
            <article className="partner-group">
              <header className="partner-group__head">
                <h3 className="partner-group__title">{grupo.title}</h3>
                <p className="partner-group__blurb">{grupo.blurb}</p>
              </header>

              <ul className="colabs">
                {grupo.items.map((item) => (
                  <li className="colab" key={item.handle}>
                    <a
                      className="colab__marca"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="colab__nombre">{item.name}</span>
                      <span className="colab__que">{item.que}</span>
                      <span className="colab__handle">{item.handle}</span>
                    </a>

                    {item.video && (
                      <a
                        className="colab__video"
                        href={item.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver el vídeo que hice con ${item.name}`}
                      >
                        <PlayIcon />
                        <span>{partnersIntro.videoLabel}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="partners__cta">
          <p className="partners__cta-title">{partnersIntro.ctaTitle}</p>
          <p className="partners__cta-body">{partnersIntro.ctaBody}</p>
          <a
            className="btn btn--ghost"
            href={site.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {partnersIntro.ctaLabel}
            <ArrowIcon />
          </a>
          <p className="partners__cta-nota">
            {total} colaboraciones hasta hoy, y contando.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
