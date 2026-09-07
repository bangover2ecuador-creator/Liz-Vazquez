/**
 * Isotipo de Liz Vásquez.
 *
 * Todo sale de lo que ella ya usa, no de una idea de diseño:
 * — La cuña de queso es el 🧀 que lleva delante del nombre en sus dos
 *   cuentas de TikTok. Cajamarca es la cuenca quesera del Perú, así
 *   que el guiño es suyo y es local.
 * — Los destellos son el ✨ con que enmarca su frase en YouTube.
 * — El anillo abierto le da forma reconocible a tamaño de favicon.
 *
 * En dorado champagne, el mismo de la landing.
 */

type Props = {
  /** Tamaño en píxeles. Por defecto hereda del contenedor. */
  size?: number | string
  /** Sin anillo, para cuando el contexto ya lo enmarca. */
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
        <linearGradient id="lizGold" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8E7BC" />
          <stop offset="0.45" stopColor="#E4C480" />
          <stop offset="1" stopColor="#A87B2A" />
        </linearGradient>
      </defs>

      {!bare && (
        <path
          d="M40.5 8.4a26 26 0 1 1-17 0"
          stroke="url(#lizGold)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}

      {/* Cuña de queso */}
      <path
        d="M15 38.5 32 21.5a2 2 0 0 1 1.4-.6H47a1.6 1.6 0 0 1 1.6 1.6v13.6a2 2 0 0 1-.6 1.4L44 41.5H16.4A1.4 1.4 0 0 1 15 40Z"
        fill="url(#lizGold)"
      />

      {/* Los agujeros, en el color del fondo */}
      <g fill="#070310">
        <circle cx="27" cy="35" r="2.4" />
        <circle cx="36" cy="30" r="1.9" />
        <circle cx="40.5" cy="37" r="1.6" />
      </g>

      {/* Destellos: el ✨ de su frase */}
      <path
        d="M28 21 24 17M32 19.5l-1-5M36.5 20l3-4.5"
        stroke="url(#lizGold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
