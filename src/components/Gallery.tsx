import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery, site } from '../data/site'
import { Photo, Reveal } from './Primitives'
import { ArrowIcon } from './Icons'

// Ninguna foto se descarga hasta que el carrusel se acerca a pantalla.
// El margen del observador (abajo) da tiempo de sobra a que carguen
// mientras el usuario se desplaza hacia la galeria.

/**
 * Tira de fotos de la portada.
 *
 * Va pegada al retrato, sin encabezado propio: es la entrada, no una
 * sección aparte. Por eso no lleva título ni subtítulo — el carrusel
 * se explica solo en cuanto se ve media foto asomando por el lado.
 *
 * Sin librerías: el navegador ya hace el desplazamiento con inercia y
 * el snap, que en móvil se siente mejor que cualquier reimplementación
 * en JavaScript. Al tocar una foto se marca con borde dorado y se
 * centra sola.
 */
export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [warm, setWarm] = useState(false)

  // Marca como activa la foto más cercana al centro mientras se desliza.
  const syncActive = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let min = Infinity

    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const mid = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(mid - center)
      if (dist < min) {
        min = dist
        closest = i
      }
      // 0 en el centro, 1 a una tarjeta de distancia. El CSS lo usa
      // para escalar y atenuar de forma continua mientras se desliza,
      // en vez de saltar de golpe entre activa e inactiva.
      el.style.setProperty('--d', Math.min(dist / (el.offsetWidth || 1), 1).toFixed(3))
    })

    // En los extremos manda la posicion, no la geometria: con el
    // scroll a cero la primera foto no puede centrarse, y sin esto
    // se marcaria la segunda.
    if (track.scrollLeft <= 2) {
      closest = 0
    } else if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
      closest = track.children.length - 1
    }

    setActive(closest)
  }, [])

  // Monta el resto de fotos cuando el carrusel se acerca al viewport.
  // Sin esto el navegador se adelanta y descarga media galeria en la
  // carga inicial, que es justo lo que no queremos en red movil.
  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setWarm(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWarm(true)
        io.disconnect()
      },
      { rootMargin: '400px 0px' },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncActive)
    }

    track.scrollLeft = 0
    track.addEventListener('scroll', onScroll, { passive: true })
    syncActive()

    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [syncActive])

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return

    const el = track.children[index] as HTMLElement | undefined
    if (!el) return

    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [])

  const step = (dir: -1 | 1) => {
    scrollTo(Math.min(Math.max(active + dir, 0), gallery.length - 1))
  }

  return (
    <div className="shell gallery-strip" id="fotos" ref={sectionRef}>
      <Reveal className="carousel">
        <div
          className="carousel__track"
          ref={trackRef}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Galería de fotos de Liz Vásquez"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault()
              step(1)
            }
            if (e.key === 'ArrowLeft') {
              e.preventDefault()
              step(-1)
            }
          }}
        >
          {gallery.map((shot, i) => (
            <button
              key={shot.id}
              type="button"
              className={`shot${i === active ? ' is-active' : ''}`}
              aria-label={`Foto ${i + 1} de ${gallery.length}: ${shot.caption}`}
              aria-current={i === active}
              onClick={() => {
                setActive(i)
                scrollTo(i)
              }}
            >
              {warm && (
                <Photo
                  name={shot.src}
                  alt={`${site.name} — ${shot.caption}`}
                  sizes="(min-width: 48rem) 320px, 72vw"
                  // Sin candidato de 960: la tarjeta mide ~270 px, y con
                  // 640 sobra incluso en pantallas de densidad 3.
                  widths={[320, 480, 640]}
                />
              )}
              <span className="shot__caption">{shot.caption}</span>
            </button>
          ))}
        </div>

        <div className="carousel__nav">
          <button
            type="button"
            className="carousel__arrow"
            aria-label="Foto anterior"
            disabled={active === 0}
            onClick={() => step(-1)}
          >
            <ArrowIcon />
          </button>

          <p className="carousel__count" aria-live="polite">
            <span>{active + 1}</span> / {gallery.length}
          </p>

          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            aria-label="Foto siguiente"
            disabled={active === gallery.length - 1}
            onClick={() => step(1)}
          >
            <ArrowIcon />
          </button>
        </div>
      </Reveal>
    </div>
  )
}
