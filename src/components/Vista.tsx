import { useEffect, useRef, type ReactNode } from 'react'
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
 */
type Props = {
  abierta: boolean
  titulo: string
  onCerrar: () => void
  children: ReactNode
}

export function Vista({ abierta, titulo, onCerrar, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const antesDelFoco = useRef<Element | null>(null)

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
    history.pushState({ vista: titulo }, '')
    const alVolver = () => onCerrar()
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

  return (
    <div className="vista" role="dialog" aria-modal="true" aria-label={titulo}>
      <header className="vista__barra">
        <button
          type="button"
          className="vista__atras"
          onClick={() => {
            // Deshace la entrada del historial que se apiló al abrir.
            if (history.state?.vista === titulo) history.back()
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
    </div>
  )
}
