import { partners, partnersIntro, site } from '../data/site'
import { Reveal } from './Primitives'
import { ArrowIcon } from './Icons'

// Espacios que se muestran vacíos por grupo mientras no hay marcas.
// Suficientes para que se lea como "aquí caben", sin parecer abandono.
const HUECOS = 2

/**
 * Marcas y colaboraciones.
 *
 * Nace vacía a propósito: hoy no hay ninguna marca cargada, así que en
 * vez de esconder la sección se muestran los espacios libres. Un hueco
 * con forma dice "aquí va una marca" y funciona como invitación; una
 * sección ausente no dice nada. Al añadir marcas en site.ts, las
 * tarjetas reales van sustituyendo a los huecos.
 */
export function Partners() {
  return (
    <section className="section shell" id="marcas">
      <Reveal className="section-head section-head--center">
        <h2 className="section-title">{partnersIntro.heading}</h2>
        <p className="section-sub">{partnersIntro.sub}</p>
      </Reveal>

      <div className="partners">
        {partners.map((grupo, g) => (
          <Reveal key={grupo.id} delay={g * 80}>
            <article className="partner-group">
              <header className="partner-group__head">
                <h3 className="partner-group__title">{grupo.title}</h3>
                <p className="partner-group__blurb">{grupo.blurb}</p>
              </header>

              <ul className="partner-slots">
                {grupo.items.map((item) => (
                  <li key={item.name} className="partner-slot partner-slot--filled">
                    {item.url ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </li>
                ))}

                {Array.from({ length: Math.max(HUECOS - grupo.items.length, 0) }).map((_, i) => (
                  <li key={`hueco-${i}`} className="partner-slot" aria-hidden="true">
                    <span>{partnersIntro.emptyLabel}</span>
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
        </div>
      </Reveal>
    </section>
  )
}
