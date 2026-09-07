import { useState, type ReactNode } from 'react'
import { partners, partnersIntro, site, type Colaborador } from '../data/site'
import { Reveal } from './Primitives'
import { ArrowIcon, BuildingIcon, MusicIcon, PlayIcon, ShopIcon, SparkIcon } from './Icons'

const iconos: Record<string, ReactNode> = {
  marcas: <SparkIcon />,
  emprendedores: <ShopIcon />,
  empresas: <BuildingIcon />,
  creadores: <MusicIcon />,
}

/** El nombre del archivo de la portada sale del propio enlace. */
function portadaDe(video: string) {
  return `/images/covers/${video.split('/').pop()}.webp`
}

/**
 * Ficha de una colaboración.
 *
 * La portada del vídeo se ve, no se adivina: es lo que convence a
 * quien mira. Se guarda en el sitio porque los enlaces de imagen que
 * da TikTok van firmados y caducan al día siguiente.
 *
 * Cuando conocemos la cuenta de la marca hay dos destinos: la ficha
 * entera lleva a su TikTok y la portada al vídeo. Si no la conocemos,
 * todo lleva al vídeo, que es lo único que podemos enseñar.
 */
function Ficha({ item, conPortada }: { item: Colaborador; conPortada: boolean }) {
  const soloVideo = !item.url && item.video
  const portada = conPortada && item.video

  return (
    <li className="colab">
      <a
        className="colab__marca"
        href={item.url ?? item.video}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="colab__nombre">{item.name}</span>
        <span className="colab__que">{item.que}</span>
        <span className="colab__handle">{item.handle ?? partnersIntro.soloVideo}</span>
      </a>

      {portada &&
        (soloVideo ? (
          // Sin cuenta de marca no hay segundo destino: la portada es
          // decoración del enlace que ya cubre la ficha entera.
          <span className="colab__toma" aria-hidden="true">
            <img src={portadaDe(portada)} alt="" width={240} height={427} loading="lazy" />
            <span className="colab__play">
              <PlayIcon />
            </span>
          </span>
        ) : (
          <a
            className="colab__toma"
            href={item.video}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver el vídeo que hice con ${item.name}`}
          >
            <img
              src={portadaDe(portada)}
              alt=""
              width={240}
              height={427}
              loading="lazy"
            />
            <span className="colab__play" aria-hidden="true">
              <PlayIcon />
            </span>
          </a>
        ))}
    </li>
  )
}

/**
 * Marcas y colaboraciones.
 *
 * Los grupos son una tira que se desliza a la derecha; al tocar uno se
 * desglosa justo debajo y se cierra el anterior. Sin salir de la
 * pantalla: entrar y volver por cada grupo cansaba.
 *
 * Las portadas de un grupo no se piden hasta que ese grupo se abre por
 * primera vez. `loading="lazy"` no basta: dentro de un panel plegado
 * el navegador las descarga igual, y serían dieciocho imágenes por una
 * que se mira. El hueco ya está reservado por el `aspect-ratio`, así
 * que al abrirse no salta nada.
 */
export function Partners() {
  const [abierto, setAbierto] = useState<string>(partners[0]?.id ?? '')
  const [vistos, setVistos] = useState<string[]>([partners[0]?.id ?? ''])

  const abrir = (id: string) => {
    setAbierto(abierto === id ? '' : id)
    setVistos((v) => (v.includes(id) ? v : [...v, id]))
  }

  return (
    <section className="section shell" id="marcas">
      <Reveal className="section-head section-head--center">
        <h2 className="section-title">{partnersIntro.heading}</h2>
        <p className="section-sub">{partnersIntro.sub}</p>
      </Reveal>

      <Reveal delay={80}>
        <ul className="grupos">
          {partners.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                className={`menu__boton${abierto === g.id ? ' is-abierto' : ''}`}
                aria-expanded={abierto === g.id}
                aria-controls={`grupo-${g.id}`}
                onClick={() => abrir(g.id)}
              >
                <span className="menu__icono" aria-hidden="true">
                  {iconos[g.id]}
                </span>
                <span className="menu__texto">
                  <span className="menu__titulo">{g.title}</span>
                  <span className="menu__pista">
                    {g.items.length === 1 ? '1 colaboración' : `${g.items.length} colaboraciones`}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>

      {partners.map((g) => (
        <div
          className={`desglose${abierto === g.id ? ' is-abierto' : ''}`}
          id={`grupo-${g.id}`}
          key={g.id}
        >
          <div className="desglose__caja">
            <p className="desglose__blurb">{g.blurb}</p>
            {g.items.length > 0 ? (
              <ul className="colabs">
                {g.items.map((item) => (
                  <Ficha item={item} conPortada={vistos.includes(g.id)} key={item.name} />
                ))}
              </ul>
            ) : (
              <p className="grupo-vacio">{partnersIntro.vacio}</p>
            )}
          </div>
        </div>
      ))}

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
