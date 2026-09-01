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
  '.shot',
  '.stat',
  '.highlight',
  '.pillars li',
  '.footer__links a',
  '.footer__contact-link',
  '.carousel__arrow',
  '.dock__btn',
  '.dock__gold',
  '.portrait',
  '.live-pill',
  '.giveaway__badge',
  '.about__quote',
  '.finale',
].join(',')

export function usePressFeedback() {
  useEffect(() => {
    let pressed: HTMLElement | null = null

    const release = () => {
      if (!pressed) return
      pressed.removeAttribute('data-pressed')
      pressed = null
    }

    const press = (event: PointerEvent) => {
      const target = event.target as Element | null
      const el = target?.closest?.(PRESSABLE) as HTMLElement | null
      if (!el) return

      release()
      pressed = el
      el.setAttribute('data-pressed', '')
    }

    document.addEventListener('pointerdown', press, { passive: true })
    document.addEventListener('pointerup', release, { passive: true })
    document.addEventListener('pointercancel', release, { passive: true })
    // Al desplazarse, el navegador se queda el gesto: soltar para que
    // nada quede hundido mientras la página se mueve.
    window.addEventListener('scroll', release, { passive: true, capture: true })
    window.addEventListener('blur', release)

    // iOS solo aplica :active si existe algún listener de touch.
    // Sirve de respaldo por si los eventos de puntero fallan.
    const noop = () => {}
    document.addEventListener('touchstart', noop, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', press)
      document.removeEventListener('pointerup', release)
      document.removeEventListener('pointercancel', release)
      window.removeEventListener('scroll', release, { capture: true })
      window.removeEventListener('blur', release)
      document.removeEventListener('touchstart', noop)
      release()
    }
  }, [])
}
