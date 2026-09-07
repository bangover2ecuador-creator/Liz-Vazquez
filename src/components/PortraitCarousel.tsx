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
 * Tarjeta vertical con esquinas muy redondeadas, no el círculo de
 * antes: aquel venía de cuando esto era un avatar, y recortaba un
 * tercio de cada foto vertical. El marco lleva un bisel de luz arriba
 * y sombra profunda debajo, para que se lea como un objeto con
 * grosor y no como una imagen pegada al fondo.
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
    track.addEventListener('pointerdown', alTocar, {
      passive: true,
      once: true,
    })

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
        {/* Bisel: brillo arriba y sombra abajo, como el canto de un cristal */}
        <span className="portrait__bevel" aria-hidden="true" />
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
