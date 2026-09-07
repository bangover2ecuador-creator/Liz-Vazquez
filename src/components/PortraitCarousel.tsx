import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery, site } from '../data/site'
import { Photo } from './Primitives'
import { CrownIcon } from './Icons'

// Cuántas fotos se cargan de entrada. Las demás esperan a que el dedo
// se acerque, para no descargar 17 imágenes al abrir.
const INICIALES = 3

/**
 * La portada es el carrusel.
 *
 * La foto principal es la primera del carrusel, no una imagen aparte:
 * se desliza dentro del mismo marco circular dorado y las demás llegan
 * detrás. Así no hace falta una tira de fotos más abajo — es todo el
 * mismo elemento.
 *
 * El marco, los anillos y la corona se quedan fijos; lo único que se
 * mueve es la foto de dentro.
 */
export function PortraitCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activa, setActiva] = useState(0)
  const [cargarTodas, setCargarTodas] = useState(false)

  const sincronizar = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const i = Math.round(track.scrollLeft / track.clientWidth)
    setActiva(Math.min(Math.max(i, 0), gallery.length - 1))
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const alDesplazar = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(sincronizar)
    }

    track.scrollLeft = 0
    track.addEventListener('scroll', alDesplazar, { passive: true })
    // Al primer contacto se montan todas: ya está claro que va a deslizar.
    const alTocar = () => setCargarTodas(true)
    track.addEventListener('pointerdown', alTocar, { passive: true, once: true })

    return () => {
      track.removeEventListener('scroll', alDesplazar)
      track.removeEventListener('pointerdown', alTocar)
      cancelAnimationFrame(frame)
    }
  }, [sincronizar])

  const irA = useCallback((i: number) => {
    const track = trackRef.current
    if (!track) return
    setCargarTodas(true)
    track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' })
  }, [])

  return (
    <div className="portrait">
      <span className="portrait__ring portrait__ring--outer" aria-hidden="true" />
      <span className="portrait__ring" aria-hidden="true" />
      <span className="portrait__halo" aria-hidden="true" />

      <div className="portrait__frame">
        <div
          className="portrait__track"
          ref={trackRef}
          role="group"
          aria-roledescription="carrusel"
          aria-label={`Fotos de ${site.name}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              irA(Math.min(activa + 1, gallery.length - 1))
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              irA(Math.max(activa - 1, 0))
            }
          }}
        >
          {gallery.map((foto, i) => (
            <div className="portrait__slide" key={foto.id} aria-hidden={i !== activa}>
              {(cargarTodas || i < INICIALES) && (
                <Photo
                  name={foto.src}
                  alt={`${site.name} — ${foto.caption}`}
                  sizes="320px"
                  widths={[320, 480, 640]}
                  priority={i === 0}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <span className="portrait__badge" title={site.award}>
        <CrownIcon />
        <span className="sr-only">{site.award}</span>
      </span>

      {/* Puntos: dicen cuántas fotos hay y permiten saltar */}
      <div className="portrait__dots">
        {gallery.map((foto, i) => (
          <button
            key={foto.id}
            type="button"
            className={`portrait__dot${i === activa ? ' is-active' : ''}`}
            aria-label={`Foto ${i + 1} de ${gallery.length}: ${foto.caption}`}
            aria-current={i === activa}
            onClick={() => irA(i)}
          />
        ))}
      </div>

      <p className="portrait__caption" aria-live="polite">
        {gallery[activa]?.caption}
      </p>
    </div>
  )
}
