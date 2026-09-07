/**
 * Monograma de Liz Vásquez.
 *
 * Tres cosas que ella ya eligió, no inventadas aquí:
 * — La "L" y la "V" en itálica, como firma su nombre en TikTok.
 * — Los tres huecos redondos: el 🧀 que lleva delante del nombre en
 *   sus dos cuentas. Cajamarca es la cuenca quesera del Perú, así que
 *   el guiño es local y suyo; se queda en geometría, sin dibujar queso.
 * — El dorado de la landing, en degradado para que tenga peso de metal.
 *
 * El anillo abierto por arriba deja respirar el monograma y funciona
 * igual a 32 px (favicon) que a 200 px (hero).
 */

type Props = {
  /** Tamaño en píxeles. Por defecto hereda del contenedor. */
  size?: number | string
  /** Sin anillo: para usarlo suelto sobre un fondo que ya lo enmarca. */
  bare?: boolean
  className?: string
  title?: string
}

export function Logo({ size, bare = false, className, title = 'Liz Vásquez' }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lizGold" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8E7BC" />
          <stop offset="0.45" stopColor="#E4C480" />
          <stop offset="1" stopColor="#A87B2A" />
        </linearGradient>
      </defs>

      {/* Anillo abierto arriba, donde entra el monograma */}
      {!bare && (
        <path
          d="M40.5 7.6a27 27 0 1 1-17 0"
          stroke="url(#lizGold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}

      {/* L y V entrelazadas, trazo itálico */}
      <g stroke="url(#lizGold)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        {/* L: asta inclinada y pie */}
        <path d="M26.2 20.5 21.4 42.2h11.2" />
        {/* V: cruza el pie de la L y sube */}
        <path d="M31.6 26.4 36.4 42.2 45 22.8" />
      </g>

      {/* Los tres huecos del queso, como contrapunto al trazo */}
      <g fill="url(#lizGold)">
        <circle cx="38.4" cy="18.6" r="1.9" />
        <circle cx="18.6" cy="30.4" r="1.5" />
        <circle cx="44.2" cy="33.8" r="1.2" />
      </g>
    </svg>
  )
}

/**
 * Imagotipo: el monograma junto al nombre.
 *
 * Se usa donde hace falta identificar la marca completa (la barra
 * superior). El monograma solo, sin nombre, se reserva para cuando el
 * contexto ya dice de quién es: el favicon y el pie.
 */
export function Wordmark({
  className,
  /** Etiqueta del nombre. La barra lo monta como <h1>: es el título
   *  de la página, y al salir del hero se llevó el h1 con él. */
  nameAs: Name = 'span',
}: {
  className?: string
  nameAs?: 'h1' | 'span'
}) {
  return (
    <span className={className}>
      <Logo className="wordmark__mark" />
      <span className="wordmark__text">
        <Name className="wordmark__name">Liz Vásquez</Name>
        <span className="wordmark__tag">Todo a su tiempo</span>
      </span>
    </span>
  )
}
