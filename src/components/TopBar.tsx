import { useEffect, useState } from 'react'
import { Wordmark } from './Logo'

/**
 * Barra superior fija con el imagotipo.
 *
 * Lleva el nombre que antes estaba en grande dentro del hero, así que
 * la portada se queda solo con la foto y respira. Al empezar es
 * transparente para no competir con el retrato; en cuanto se hace
 * scroll gana fondo y filete dorado para seguir legible sobre las
 * fotos claras del carrusel.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <a className="topbar__brand" href="#inicio" aria-label="Liz Vásquez — inicio">
        <Wordmark className="wordmark" nameAs="h1" />
      </a>
    </header>
  )
}
