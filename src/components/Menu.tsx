import type { ReactNode } from 'react'
import { GiftIcon, LinkIcon, SparkIcon, CrownIcon } from './Icons'

export type Destino = 'beneficios' | 'marcas' | 'sobre-mi' | 'redes'

export const entradas: { id: Destino; titulo: string; pista: string; icono: ReactNode }[] = [
  {
    id: 'redes',
    titulo: 'Mis redes',
    pista: 'Instagram, Facebook y YouTube',
    icono: <LinkIcon />,
  },
  {
    id: 'sobre-mi',
    titulo: 'Conoce más de mí',
    pista: 'Quién soy y qué hago',
    icono: <CrownIcon />,
  },
  {
    id: 'marcas',
    titulo: 'Colaboraciones',
    pista: 'Marcas, empresas y creadores',
    icono: <SparkIcon />,
  },
  {
    id: 'beneficios',
    titulo: 'Beneficios',
    pista: 'Sorteos y promociones',
    icono: <GiftIcon />,
  },
]

/**
 * Menú de la portada.
 *
 * Tira horizontal de tarjetas: se desliza hacia la derecha y cada una
 * abre su vista a pantalla completa. Es el único camino de navegación
 * del sitio, así que va inmediatamente debajo de la foto.
 *
 * El orden lo eligió Liz: primero sus redes, que es lo que más se
 * busca, y al final los beneficios, que aún no están activos.
 */
export function Menu({ onAbrir }: { onAbrir: (d: Destino) => void }) {
  return (
    <nav className="menu shell" aria-label="Secciones">
      <ul className="menu__tira">
        {entradas.map((e) => (
          <li key={e.id}>
            <button type="button" className="menu__boton" onClick={() => onAbrir(e.id)}>
              <span className="menu__icono" aria-hidden="true">
                {e.icono}
              </span>
              <span className="menu__texto">
                <span className="menu__titulo">{e.titulo}</span>
                <span className="menu__pista">{e.pista}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
