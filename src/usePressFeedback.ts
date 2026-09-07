import { useEffect } from 'react'

/**
 * Marca con `data-pressed` lo que el dedo está tocando.
 *
 * El `:active` de CSS no basta en móvil: iOS Safari no lo aplica a
 * elementos que no sean enlaces o botones, y Android lo retira al
 * primer píxel de movimiento, así que el toque se sentía muerto.
 * Con eventos de puntero el comportamiento es el mismo en los dos.
 *
 * Un único listener delegado en el documento cubre toda la página,
 * incluidos los elementos que React monta más tarde.
 */
const PRESSABLE = [
  '.btn',
  '.social',
  '.toma',
  '.stat',
  '.highlight',
  '.pillars li',
  '.partner-slot--filled',
  '.footer__contact-link',
  '.menu__boton',
  '.topbar__brand',
  '.vista__atras',
  '.live-pill',
  '.giveaway__badge',
  '.giveaway__waiting',
  '.about__quote',
  '.finale',
].join(',')

// Cuanto se mantiene el destello como minimo. Sobre un contenedor
// desplazable el navegador emite pointercancel a los ~40 ms para
// quedarse el gesto, y sin este minimo el toque no llegaba a verse.
// Tambien hace que un toque rapido siempre de respuesta.
const MINIMO_MS = 220

export function usePressFeedback() {
  useEffect(() => {
    let pressed: HTMLElement | null = null
    let desde = 0
    let pendiente = 0

    const soltar = (el: HTMLElement) => {
      el.removeAttribute('data-pressed')
    }

    const release = () => {
      if (!pressed) return
      const el = pressed
      pressed = null

      const queda = MINIMO_MS - (performance.now() - desde)
      if (queda > 0) {
        window.clearTimeout(pendiente)
        pendiente = window.setTimeout(() => soltar(el), queda)
      } else {
        soltar(el)
      }
    }

    const press = (event: PointerEvent) => {
      const target = event.target as Element | null
      const el = target?.closest?.(PRESSABLE) as HTMLElement | null
      if (!el) return

      window.clearTimeout(pendiente)
      if (pressed && pressed !== el) soltar(pressed)

      pressed = el
      desde = performance.now()
      el.setAttribute('data-pressed', '')
    }

    document.addEventListener('pointerdown', press, { passive: true })
    document.addEventListener('pointerup', release, { passive: true })
    document.addEventListener('pointercancel', release, { passive: true })
    // Al desplazarse, el navegador se queda el gesto: soltar para que
    // nada quede hundido mientras la página se mueve.
    window.addEventListener('scroll', release, {
      passive: true,
      capture: true,
    })
    window.addEventListener('blur', release)

    // iOS solo aplica :active si existe algún listener de touch.
    // Sirve de respaldo por si los eventos de puntero fallan.
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', press)
      document.removeEventListener('pointerup', release)
      document.removeEventListener('pointercancel', release)
      window.removeEventListener('scroll', release)
      window.removeEventListener('blur', release)
      document.removeEventListener('touchstart', noop)
      window.clearTimeout(pendiente)
      if (pressed) soltar(pressed)
      pressed = null
    }
  }, [])
}
