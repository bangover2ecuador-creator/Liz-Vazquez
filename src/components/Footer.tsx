import { site, socials } from '../data/site'
import { Reveal } from './Primitives'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer shell">
      <Reveal>
        <Logo className="footer__logo" title={`Logotipo de ${site.name}`} />
        <p className="footer__name">{site.name}</p>
        <p className="footer__tagline">{site.tagline}</p>

        <ul className="footer__links">
          {socials.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.platform} {s.handle}
              </a>
            </li>
          ))}
        </ul>

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
