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
 * El dorado va en degradado de cinco paradas, la cuña lleva canto
 * lateral y brillo especular, y los agujeros tienen sombra propia:
 * a tamaño grande se ve el trabajo, y a 28 px sigue leyéndose.
 */

type Props = {
  /** Tamaño en píxeles. Por defecto hereda del contenedor. */
  size?: number | string
  className?: string
  title?: string
}

export function Logo({ size, className, title = 'Liz Vásquez' }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="oro" x1="16" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBF0D2" />
          <stop offset="0.22" stopColor="#F0D89C" />
          <stop offset="0.5" stopColor="#E4C480" />
          <stop offset="0.74" stopColor="#B98F3E" />
          <stop offset="1" stopColor="#8C6520" />
        </linearGradient>
        <linearGradient
          id="oroClaro"
          x1="30"
          y1="34"
          x2="70"
          y2="66"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFF8E4" />
          <stop offset="0.55" stopColor="#EFD79C" />
          <stop offset="1" stopColor="#C79E4E" />
        </linearGradient>
        <linearGradient id="brillo" x1="28" y1="30" x2="60" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="rubor" cx="50%" cy="42%" r="58%">
          <stop offset="0" stopColor="#E8A0A8" stopOpacity="0.30" />
          <stop offset="1" stopColor="#E8A0A8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="48" cy="48" r="46" fill="url(#rubor)" />

      {/* Anillo doble: exterior fino, interior filo */}
      <circle
        cx="48"
        cy="48"
        r="43"
        fill="none"
        stroke="url(#oro)"
        strokeWidth="1.1"
        opacity="0.55"
      />
      <path
        d="M62.5 8.6a41 41 0 1 1-29 0"
        fill="none"
        stroke="url(#oro)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Cuña de queso, con canto lateral para darle volumen */}
      <path
        d="M22 60.5 47.5 35a3 3 0 0 1 2.1-.9h20.6a2.4 2.4 0 0 1 2.4 2.4v20.4a3 3 0 0 1-.9 2.1L66 65.6H24.1a2.1 2.1 0 0 1-2.1-2.1Z"
        fill="url(#oro)"
      />
      <path
        d="M22 60.5 47.5 35a3 3 0 0 1 2.1-.9h20.6a2.4 2.4 0 0 1 2.4 2.4v3.1H49.8a3 3 0 0 0-2.1.9L24.4 63.6H24.1a2.1 2.1 0 0 1-2.1-2.1Z"
        fill="url(#oroClaro)"
      />
      <path
        d="M22 60.5 47.5 35a3 3 0 0 1 2.1-.9h20.6a2.4 2.4 0 0 1 2.4 2.4v1.2H49.9a3 3 0 0 0-2.1.9L23.4 62.9Z"
        fill="url(#brillo)"
      />

      {/* Agujeros, con sombra interior para que se lean como huecos */}
      <g>
        <circle cx="36.5" cy="55" r="3.6" fill="#0B0709" />
        <circle cx="36.5" cy="54.3" r="3.6" fill="#4A2029" opacity="0.55" />
        <circle cx="52" cy="47.5" r="2.8" fill="#0B0709" />
        <circle cx="52" cy="46.9" r="2.8" fill="#4A2029" opacity="0.5" />
        <circle cx="61.5" cy="56" r="2.1" fill="#0B0709" />
        <circle cx="61.5" cy="55.5" r="2.1" fill="#4A2029" opacity="0.5" />
      </g>

      {/* Destellos de distinto peso, como su ✨ */}
      <path
        d="M42 30.5c.15 2.1.9 3.5 2.1 4.2-1.2.7-1.95 2.1-2.1 4.2-.15-2.1-.9-3.5-2.1-4.2 1.2-.7 1.95-2.1 2.1-4.2Z"
        fill="url(#oroClaro)"
      />
      <path
        d="M56.5 24c.1 1.5.65 2.5 1.5 3-.85.5-1.4 1.5-1.5 3-.1-1.5-.65-2.5-1.5-3 .85-.5 1.4-1.5 1.5-3Z"
        fill="url(#oroClaro)"
        opacity="0.85"
      />
      <circle cx="30" cy="40" r="1.15" fill="url(#oroClaro)" opacity="0.7" />
    </svg>
  )
}

/**
 * Imagotipo: el monograma junto al nombre, en una sola línea.
 *
 * Sin la frase debajo: en 66 px de barra, dos líneas de tamaños
 * distintos se pisan, y además la frase ya aparece en el hero. Una
 * barra de identidad tiene que leerse de un golpe.
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
      <Name className="wordmark__name">Liz Vásquez</Name>
    </span>
  )
}
