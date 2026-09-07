import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowIcon } from './Icons'

/**
 * Vista a pantalla completa.
 *
 * Entra deslizando desde la derecha y tapa la portada, como una
 * pantalla de app: no se despliega hacia abajo, se entra en ella.
 *
 * Se cierra con el botón de atrás de la cabecera, con Escape y con el
 * botón físico de atrás del móvil — para eso se apila una entrada en
 * el historial al abrir, que es lo que espera cualquiera que use un
 * teléfono.
 *
 * Se puede entrar en una vista desde dentro de otra. Cada una firma su
 * entrada del historial, y al volver solo se cierra aquella cuya firma
 * ya no está en pantalla: sin eso, un solo toque de atrás cerraría las
 * dos a la vez y saldrías de golpe a la portada.
 *
 * Se dibuja colgando del <body>, no de donde se escribe. La vista se
 * abre deslizando, y esa animación es un `transform`: cualquier capa
 * fija que naciera dentro quedaría encerrada en ella y ocuparía solo
 * ese trozo de pantalla en vez de taparla entera.
 */

// El historial sobrevive a una recarga, y con el sus estados. Si las
// firmas fueran solo un numero, tras recargar dentro de una vista la
// nueva "v1" chocaria con la "v1" vieja y el boton de atras se
// quedaria atascado. Por eso cada carga estrena su propio prefijo.
const SESION = Math.random().toString(36).slice(2, 8)
let contador = 0
type Props = {
  abierta: boolean
  titulo: string
  onCerrar: () => void
  children: ReactNode
}

export function Vista({ abierta, titulo, onCerrar, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const antesDelFoco = useRef<Element | null>(null)
  const firma = useRef('')

  useEffect(() => {
    if (!abierta) return

    antesDelFoco.current = document.activeElement

    // El fondo no debe desplazarse detrás de la vista.
    const scrollY = window.scrollY
    const bodyAntes = document.body.style.cssText
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    // El botón de atrás del móvil cierra la vista en vez de salir del sitio.
    firma.current = `${SESION}-${(contador += 1)}`
    history.pushState({ vista: firma.current }, '')

    // Al volver, el historial entrega el estado de la pantalla que
    // queda debajo. Si esa sigue siendo la mía, es que se cerró una
    // vista que estaba encima y esta se queda.
    const alVolver = (e: PopStateEvent) => {
      if ((e.state as { vista?: string } | null)?.vista === firma.current) return
      onCerrar()
    }
    window.addEventListener('popstate', alVolver)

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar()
    }
    document.addEventListener('keydown', alTeclear)

    panelRef.current?.focus()

    return () => {
      window.removeEventListener('popstate', alVolver)
      document.removeEventListener('keydown', alTeclear)
      document.body.style.cssText = bodyAntes
      window.scrollTo(0, scrollY)
      ;(antesDelFoco.current as HTMLElement | null)?.focus?.()
    }
  }, [abierta, titulo, onCerrar])

  if (!abierta) return null

  return createPortal(
    <div className="vista" role="dialog" aria-modal="true" aria-label={titulo}>
      <header className="vista__barra">
        <button
          type="button"
          className="vista__atras"
          onClick={() => {
            // Deshace la entrada del historial que se apiló al abrir.
            if (history.state?.vista === firma.current) history.back()
            else onCerrar()
          }}
        >
          <ArrowIcon />
          Atrás
        </button>
        <h2 className="vista__titulo">{titulo}</h2>
      </header>

      <div className="vista__cuerpo" ref={panelRef} tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body,
  )
}
