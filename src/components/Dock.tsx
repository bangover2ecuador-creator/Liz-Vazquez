import { useEffect, useState } from 'react'
import { socials } from '../data/site'
import { GiftIcon, TikTokIcon } from './Icons'

const mainTikTok = socials.find((s) => s.featured)?.url ?? 'https://www.tiktok.com/@lis_iv'

/**
 * Barra fija inferior (solo móvil). Aparece cuando el hero sale de
 * pantalla, para que seguir en TikTok esté siempre a un toque.
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
        <a className="dock__btn" href={mainTikTok} target="_blank" rel="noopener noreferrer">
          <TikTokIcon />
          Seguirme en TikTok
        </a>
        <a className="dock__gold" href="#sorteos" aria-label="Ir a sorteos y promociones">
          <GiftIcon />
        </a>
      </div>
    </div>
  )
}
