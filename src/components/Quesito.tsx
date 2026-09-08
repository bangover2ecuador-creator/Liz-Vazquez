/**
 * El quesito: la mascota, no el logotipo.
 *
 * El logo de identidad (Logo.tsx) es una cuña dentro de un anillo, y
 * un anillo que se desplaza parece una rueda rodando. Para caminar
 * hace falta un personaje: cuerpo, dos piernas con sus pies, un brazo
 * que señala y una cara que se ve.
 *
 * Cada parte va en su propio grupo con su punto de giro, porque el
 * paseo las mueve por separado: las piernas alternan, los brazos
 * balancean, el derecho señala y la cara cambia de contenta a
 * sorprendida sin que el cuerpo se entere.
 */
type Props = {
  className?: string
  title?: string
}

export function Quesito({ className, title = 'Liz Vásquez' }: Props) {
  return (
    <svg
      className={className}
      viewBox="10 24 82 68"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="qOro" x1="16" y1="24" x2="80" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBF0D2" />
          <stop offset="0.5" stopColor="#E4C480" />
          <stop offset="1" stopColor="#B98F3E" />
        </linearGradient>
        <linearGradient id="qOroHondo" x1="20" y1="60" x2="60" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D8B268" />
          <stop offset="1" stopColor="#9E7530" />
        </linearGradient>
      </defs>

      {/* Brazo izquierdo. Sale por el canto de abajo y va detrás del
          cuerpo: la cuña se ensancha hacia abajo, así que por el lado
          no hay por dónde asomar sin cruzarla como una raya oscura.
          Es largo y balancea mucho —bastante más que un brazo real—
          porque colgando corto y quieto parecía una cola. Más fino
          que las piernas y con la mano redonda, para que no se lea
          como una tercera pata. */}
      <g className="q__brazo q__brazo--izq">
        <path
          d="M33 63c-2.8 3.6-5.2 7-7.2 10.4"
          stroke="url(#qOroHondo)"
          strokeWidth="4.2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="24.2" cy="76.4" r="3.6" fill="url(#qOroHondo)" />
      </g>

      {/* Piernas debajo del peso del cuerpo, no del pico: la cuña
          tiene la masa a la derecha, y colgadas del lado fino parecía
          que se iba a caer. Van antes que el cuerpo para que salgan
          por detrás. */}
      <g className="q__pata q__pata--tras">
        <path d="M53 67v12.5" stroke="url(#qOroHondo)" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="55.4" cy="82.6" rx="6.2" ry="3.5" fill="url(#qOroHondo)" />
      </g>

      <g className="q__pata q__pata--del">
        <path d="M39 67v12.5" stroke="url(#qOro)" strokeWidth="6.2" strokeLinecap="round" />
        <ellipse cx="41.4" cy="82.6" rx="6.4" ry="3.7" fill="url(#qOro)" />
      </g>

      <g className="q__cuerpo">
        {/* Cuña de queso */}
        <path
          d="M14 66 44 36a3 3 0 0 1 2.1-.9h20.5a2.4 2.4 0 0 1 2.4 2.4v20.4a3 3 0 0 1-.9 2.1L62.4 71H16.1A2.1 2.1 0 0 1 14 68.9Z"
          fill="url(#qOro)"
        />
        {/* Canto superior iluminado, para darle volumen */}
        <path
          d="M14 66 44 36a3 3 0 0 1 2.1-.9h20.5a2.4 2.4 0 0 1 2.4 2.4v2.6H46.2a3 3 0 0 0-2.1.9L16.4 69Z"
          fill="#FFF6E0"
          opacity="0.5"
        />

        {/* Agujeros, lejos de la cara para que no se confundan */}
        <circle cx="26" cy="63" r="3.4" fill="#0B0709" opacity="0.85" />
        <circle cx="37" cy="55" r="2.4" fill="#0B0709" opacity="0.85" />
        <circle cx="64" cy="63" r="2" fill="#0B0709" opacity="0.85" />

        {/* Cara contenta: la de siempre */}
        <g className="q__cara q__cara--contenta">
          <circle cx="50" cy="49" r="2.2" fill="#0B0709" />
          <circle cx="60" cy="49" r="2.2" fill="#0B0709" />
          <circle cx="50.7" cy="48.2" r="0.7" fill="#FFF6E0" />
          <circle cx="60.7" cy="48.2" r="0.7" fill="#FFF6E0" />
          <path
            d="M48.8 54.6c2.4 3.4 5.6 4.1 8.8 1.9"
            stroke="#0B0709"
            strokeWidth="1.9"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="44" cy="54" r="2.6" fill="#E07A5F" opacity="0.35" />
          <circle cx="65" cy="54" r="2.6" fill="#E07A5F" opacity="0.35" />
        </g>

        {/* Cara de sorpresa: ojos abiertos, cejas arriba y boca en o */}
        <g className="q__cara q__cara--sorpresa">
          <path
            d="M47.6 43.2c1.5-1.2 3.3-1.4 4.9-.6M57.6 42.6c1.6-.8 3.4-.6 4.9.6"
            stroke="#0B0709"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="50" cy="48.6" r="3.1" fill="#0B0709" />
          <circle cx="60" cy="48.6" r="3.1" fill="#0B0709" />
          <circle cx="51.1" cy="47.3" r="1.05" fill="#FFF6E0" />
          <circle cx="61.1" cy="47.3" r="1.05" fill="#FFF6E0" />
          <ellipse cx="54.6" cy="56.2" rx="2.3" ry="2.9" fill="#0B0709" />
          <circle cx="43.6" cy="54" r="2.9" fill="#E07A5F" opacity="0.48" />
          <circle cx="65.4" cy="54" r="2.9" fill="#E07A5F" opacity="0.48" />
        </g>
      </g>

      {/* Brazo derecho: nace en el canto derecho, que es hacia
          donde mira, y va por encima del cuerpo para que se lea al
          señalar. */}
      <g className="q__brazo q__brazo--der">
        <path
          d="M65 47c5 1.2 8.8 3 11.6 5.2"
          stroke="url(#qOro)"
          strokeWidth="5.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* La mano cerrada. El dedo sale de ella solo al señalar: un
            dedo siempre estirado parece un palo pegado al brazo. */}
        <ellipse
          cx="79"
          cy="53.4"
          rx="4.7"
          ry="4"
          transform="rotate(-22 79 53.4)"
          fill="url(#qOro)"
        />
        <path
          className="q__dedo"
          d="M81.6 50.8 86.4 46.4"
          stroke="url(#qOro)"
          strokeWidth="2.9"
          strokeLinecap="round"
        />
      </g>

      {/* Destellos, como su ✨ */}
      <path
        className="q__chispa"
        d="M23 33c.2 2.2.9 3.6 2.2 4.3-1.3.7-2 2.1-2.2 4.3-.2-2.2-.9-3.6-2.2-4.3 1.3-.7 2-2.1 2.2-4.3Z"
        fill="#F6E3B8"
      />
      <path
        className="q__chispa q__chispa--dos"
        d="M60 26c.15 1.6.7 2.6 1.6 3.1-.9.5-1.45 1.5-1.6 3.1-.15-1.6-.7-2.6-1.6-3.1.9-.5 1.45-1.5 1.6-3.1Z"
        fill="#F6E3B8"
      />
    </svg>
  )
}
