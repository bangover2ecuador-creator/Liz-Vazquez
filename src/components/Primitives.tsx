import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

// ── Reveal ───────────────────────────────────────────────────
// Aparece al entrar en pantalla. Si el navegador no soporta
// IntersectionObserver, el contenido se muestra igual.

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  id?: string
}

export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', id }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${shown ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}

// ── Photo ────────────────────────────────────────────────────
// <picture> con WebP responsive y respaldo JPEG.

type PhotoProps = {
  name: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
  /** Anchos candidatos. Un solo valor evita que el preload del <head>
   *  y el <img> resuelvan a archivos distintos. */
  widths?: number[]
}

export function Photo({
  name,
  alt,
  sizes,
  className,
  priority = false,
  width,
  height,
  widths = [320, 480, 640, 960],
}: PhotoProps) {
  const juego = (ext: string) =>
    widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')

  return (
    <picture>
      {/* AVIF primero: pesa un cuarto menos con la misma calidad. Quien
          no lo entienda se lleva el WebP, y quien tampoco, el JPEG. */}
      <source type="image/avif" srcSet={juego('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={juego('webp')} sizes={sizes} />
      <img
        src={`/images/${name}-640.jpg`}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
      />
    </picture>
  )
}

// ── CountUp ──────────────────────────────────────────────────
// Cuenta hasta el valor final al entrar en pantalla. Arranca en
// una fracción alta del total para que nunca se lea como "0".

type CountUpProps = {
  value: number
  decimals?: number
  suffix?: string
  duration?: number
}

export function CountUp({ value, decimals = 0, suffix = '', duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // El estado por defecto es la cifra real: si la animación no llega a
  // correr por lo que sea, se lee el número correcto y nunca uno a medias.
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') return

    let frame = 0

    const run = () => {
      const from = value * 0.72
      const t0 = performance.now()

      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay(p < 1 ? from + (value - from) * eased : value)
        if (p < 1) frame = requestAnimationFrame(tick)
      }

      setDisplay(from)
      frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        run()
      },
      { threshold: 0.4 },
    )

    io.observe(node)

    return () => {
      io.disconnect()
      // Al desmontar a media animación, deja la cifra final, no la parcial.
      if (frame) {
        cancelAnimationFrame(frame)
        setDisplay(value)
      }
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display.toLocaleString('es-PE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}
