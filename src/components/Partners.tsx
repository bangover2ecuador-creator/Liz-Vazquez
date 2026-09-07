import { useCallback, useState, type ReactNode } from 'react'
import { partners, partnersIntro, site, type Colaborador } from '../data/site'
import { Reveal } from './Primitives'
import { Vista } from './Vista'
import {
  ArrowIcon,
  BuildingIcon,
  MusicIcon,
  PlayIcon,
  ShopIcon,
  SparkIcon,
} from './Icons'

const iconos: Record<string, ReactNode> = {
  marcas: <SparkIcon />,
  emprendedores: <ShopIcon />,
  empresas: <BuildingIcon />,
  creadores: <MusicIcon />,
}

/**
 * Ficha de una colaboración.
 *
 * Tiene dos destinos cuando conocemos la cuenta de la marca: el cuerpo
 * lleva a su TikTok y el botón dorado al vídeo que Liz publicó con
 * ella. Si no hay cuenta, la ficha entera lleva al vídeo, que es lo
 * único que podemos enseñar de esa colaboración.
 */
function Ficha({ item }: { item: Colaborador }) {
  const destino = item.url ?? item.video
  const tieneDos = Boolean(item.url && item.video)

  return (
    <li className="colab">
      <a className="colab__marca" href={destino} target="_blank" rel="noopener noreferrer">
        <span className="colab__nombre">{item.name}</span>
        <span className="colab__que">{item.que}</span>
        <span className="colab__handle">{item.handle ?? partnersIntro.soloVideo}</span>
      </a>

      {tieneDos && (
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
  )
}

/**
 * Marcas y colaboraciones.
 *
 * Veinte fichas seguidas serían una lista larga de recorrer. En su
 * lugar, los grupos son una tira que se desliza a la derecha, igual
 * que el menú de la portada, y cada uno se abre a pantalla completa.
 * Se entra en el grupo, no se despliega.
 */
export function Partners() {
  const [abierto, setAbierto] = useState<string | null>(null)
  const cerrar = useCallback(() => setAbierto(null), [])
  const grupo = partners.find((g) => g.id === abierto)

  return (
    <section className="section shell" id="marcas">
      <Reveal className="section-head section-head--center">
        <h2 className="section-title">{partnersIntro.heading}</h2>
        <p className="section-sub">{partnersIntro.sub}</p>
      </Reveal>

      <Reveal delay={80}>
        <nav aria-label="Grupos de colaboraciones">
          <ul className="grupos">
            {partners.map((g) => (
              <li key={g.id}>
                <button type="button" className="menu__boton" onClick={() => setAbierto(g.id)}>
                  <span className="menu__icono" aria-hidden="true">
                    {iconos[g.id]}
                  </span>
                  <span className="menu__texto">
                    <span className="menu__titulo">{g.title}</span>
                    <span className="menu__pista">
                      {g.items.length === 1
                        ? '1 colaboración'
                        : `${g.items.length} colaboraciones`}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Reveal>

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

      <Vista abierta={grupo != null} titulo={grupo?.title ?? ''} onCerrar={cerrar}>
        {grupo && (
          <div className="section shell">
            <Reveal className="section-head section-head--center">
              <h3 className="section-title">{grupo.title}</h3>
              <p className="section-sub">{grupo.blurb}</p>
            </Reveal>

            {grupo.items.length > 0 ? (
              <Reveal delay={80}>
                <ul className="colabs">
                  {grupo.items.map((item) => (
                    <Ficha item={item} key={item.name} />
                  ))}
                </ul>
              </Reveal>
            ) : (
              <Reveal delay={80}>
                <p className="grupo-vacio">{partnersIntro.vacio}</p>
              </Reveal>
            )}
          </div>
        )}
      </Vista>
    </section>
  )
}
