import { useEffect, useState } from 'react'
import { GiftIcon, LinkIcon } from './Icons'

/**
 * Barra fija inferior (solo móvil). Aparece cuando el hero sale de
 * pantalla y deja las redes siempre a un toque, sin obligar a bajar
 * hasta el final.
 */
export function Dock() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`dock${shown ? ' is-shown' : ''}`}>
      <div className="dock__inner">
        {/* Apunta a las redes, no a TikTok: quien llega ya viene de ahi. */}
        <a className="dock__btn" href="#redes">
          <LinkIcon />
          Ver todas mis redes
        </a>
        <a className="dock__gold" href="#sorteos" aria-label="Ir a sorteos y promociones">
          <GiftIcon />
        </a>
      </div>
    </div>
  )
}
