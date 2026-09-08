import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery, site } from '../data/site'
import { Photo } from './Primitives'
import { ArrowIcon, CrownIcon } from './Icons'

// Cuántas fotos se montan de entrada. Las demás esperan al primer
// contacto, para no descargar diecisiete imágenes al abrir.
const INICIALES = 3

/**
 * Carrusel de la portada.
 *
 * Compacto a propósito: deja sitio al menú de abajo, que es por donde
 * se navega. Las fotos vecinas asoman por los lados — sin ese borde
 * visible nadie sabe que hay más y el carrusel no se desliza.
 *
 * El pie va dentro de la foto, sobre el degradado inferior, no debajo:
 * así el bloque termina en el canto de la tarjeta y no arrastra texto.
 */
export function PortraitCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activa, setActiva] = useState(0)
  const [cargarTodas, setCargarTodas] = useState(false)

  // Publica en cada tarjeta su distancia al centro: el CSS la usa para
  // escalar y atenuar de forma continua mientras el dedo arrastra.
  const sincronizar = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const centro = track.scrollLeft + track.clientWidth / 2
    let cerca = 0
    let min = Infinity

    Array.from(track.children).forEach((hijo, i) => {
      const el = hijo as HTMLElement
      const medio = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(medio - centro)
      if (dist < min) {
        min = dist
        cerca = i
      }
      el.style.setProperty('--d', Math.min(dist / (el.offsetWidth || 1), 1).toFixed(3))
    })

    // En los extremos manda la posicion, no la geometria: con el
    // scroll a cero la primera no puede centrarse y se marcaria la
    // segunda.
    if (track.scrollLeft <= 2) cerca = 0
    else if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2)
      cerca = track.children.length - 1

    setActiva(cerca)
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
    sincronizar()

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

    const el = track.children[i] as HTMLElement | undefined
    if (!el) return
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className="portada">
      <div
        className="portada__track"
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
          <button
            type="button"
            className={`toma${i === activa ? ' is-active' : ''}`}
            key={foto.id}
            aria-label={`Foto ${i + 1} de ${gallery.length}: ${foto.caption}`}
            aria-current={i === activa}
            onClick={() => irA(i)}
          >
            {(cargarTodas || i < INICIALES) && (
              <Photo
                name={foto.src}
                alt={`${site.name} — ${foto.caption}`}
                sizes="(min-width: 48rem) 260px, 62vw"
                /* La primera va con un solo ancho a propósito: es la
                   que precarga el <head>, y con varios candidatos el
                   precargador y el <img> resuelven a archivos
                   distintos y la foto se descarga dos veces. 480
                   cuadra con las pantallas de doble densidad, que son
                   casi todos los móviles. */
                widths={i === 0 ? [480] : [320, 480, 640]}
                priority={i === 0}
              />
            )}

            {/* El pie vive dentro de la foto */}
            <span className="toma__pie">{foto.caption}</span>

            {/* Contorno que late al tocar */}
            <span className="toma__aro" aria-hidden="true" />

            {i === 0 && (
              <span className="toma__premio" title={site.award}>
                <CrownIcon />
                <span className="sr-only">{site.award}</span>
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="portada__flecha portada__flecha--atras"
        aria-label="Foto anterior"
        onClick={() => irA(Math.max(activa - 1, 0))}
        disabled={activa === 0}
      >
        <ArrowIcon />
      </button>

      <button
        type="button"
        className="portada__flecha portada__flecha--siguiente"
        aria-label="Foto siguiente"
        onClick={() => irA(Math.min(activa + 1, gallery.length - 1))}
        disabled={activa === gallery.length - 1}
      >
        <ArrowIcon />
      </button>

      <div className="portada__puntos">
        {gallery.map((foto, i) => (
          <button
            key={foto.id}
            type="button"
            className={`portada__punto${i === activa ? ' is-active' : ''}`}
            aria-label={`Ir a la foto ${i + 1}: ${foto.caption}`}
            aria-current={i === activa}
            onClick={() => irA(i)}
          />
        ))}
      </div>
    </div>
  )
}
