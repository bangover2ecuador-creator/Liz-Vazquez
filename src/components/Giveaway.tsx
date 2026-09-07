import { giveaway } from '../data/site'
import { Reveal } from './Primitives'
import { ArrowIcon, CheckIcon, GiftIcon, SparkIcon } from './Icons'

/**
 * Sorteos y promociones.
 *
 * Hoy el botón dorado está en modo "Muy pronto": se ve y brilla, pero no
 * lleva a ningún lado y los lectores de pantalla lo anuncian como no
 * disponible. Para activarlo, en `src/data/site.ts` pon `active: true`
 * y rellena `url` — el botón pasa solo a ser un enlace real.
 */
export function Giveaway() {
  const isActive = giveaway.active && giveaway.url.length > 0

  return (
    <section className="section section--tight shell" id="sorteos">
      <Reveal>
        <div className="giveaway">
          <div className="giveaway__inner">
            <span className="giveaway__badge">
              <SparkIcon />
              {giveaway.eyebrow}
            </span>

            <h2 className="giveaway__title">{giveaway.heading}</h2>
            <p className="giveaway__body">{giveaway.body}</p>

            <ul className="giveaway__perks">
              {giveaway.perks.map((perk) => (
                <li key={perk}>
                  <span className="giveaway__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="giveaway__cta">
              {isActive ? (
                <a
                  className="btn btn--gold btn--block"
                  href={giveaway.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GiftIcon />
                  {giveaway.buttonActive}
                  <ArrowIcon />
                </a>
              ) : (
                <button
                  className="btn btn--gold btn--block"
                  type="button"
                  aria-disabled="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <GiftIcon />
                  {giveaway.buttonSoon}
                </button>
              )}

              {!isActive && (
                <a
                  className="giveaway__waiting"
                  href={giveaway.waitingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {giveaway.waitingLabel}
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
