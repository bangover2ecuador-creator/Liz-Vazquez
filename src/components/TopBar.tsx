import { useEffect, useRef, useState } from 'react'
import { Wordmark } from './Logo'
import { iniciarPaseo } from '../paseoQuesito'

/**
 * Barra superior fija con el imagotipo.
 *
 * Lleva el nombre que antes estaba en grande dentro del hero, así que
 * la portada se queda solo con la foto y respira. Al empezar es
 * transparente para no competir con el retrato; en cuanto se hace
 * scroll gana fondo y filete dorado para seguir legible sobre las
 * fotos claras del carrusel.
 *
 * El quesito hace su recorrido por la barra: entra corriendo, señala
 * la L, y salta a caminar por encima de las letras. La coreografía
 * vive en paseoQuesito.ts porque hay que medir dónde cae cada letra.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  const marcaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const marca = marcaRef.current
    if (!marca) return
    return iniciarPaseo(marca)
  }, [])

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <a
        className="topbar__brand"
        href="#inicio"
        aria-label="Liz Vásquez — inicio"
        ref={marcaRef}
      >
        <Wordmark className="wordmark" nameAs="h1" mascota />
      </a>
    </header>
  )
}
