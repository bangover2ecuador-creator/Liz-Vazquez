import { cuentaPrincipal, site } from '../data/site'
import { Reveal } from './Primitives'
import { Logo } from './Logo'
import { SocialCard } from './Socials'

/**
 * Cierre de la portada.
 *
 * Aquí vive su cuenta principal de TikTok, fuera de "Mis redes": es
 * donde emite a diario y por donde la buscan las marcas y quien
 * quiere contratarla, así que termina la página en vez de esconderse
 * detrás de un botón.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer shell">
      <Reveal>
        <Logo className="footer__logo" title={`Logotipo de ${site.name}`} />
        <p className="footer__name">{site.name}</p>
        <p className="footer__tagline">{site.tagline}</p>

        <div className="footer__cuenta">
          <span className="footer__contact-label">Mi cuenta principal</span>
          <SocialCard item={cuentaPrincipal} />
        </div>

        <p className="footer__contact">
          <span className="footer__contact-label">Colaboraciones y marcas</span>
          <a
            className="footer__contact-link"
            href={site.contactUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.contactHandle} en Instagram
          </a>
        </p>

        <p className="footer__legal">
          © {year} {site.name}. Todos los derechos reservados.
          <br />
          Hecho con cariño para mi comunidad.
        </p>
      </Reveal>
    </footer>
  )
}
