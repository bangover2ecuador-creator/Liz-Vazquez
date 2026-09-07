// Recorta Playfair Display a los caracteres que puede usar una página
// en español y deja los .woff2 en src/fonts/.
//
// Por qué: Playfair solo aparece en los títulos, pero el subset "latin"
// completo trae ~330 glifos y pesa 22 KB por variante — casi la mitad
// del peso de la primera pantalla entre las tres.
//
// El recorte NO se limita a los caracteres de hoy: incluye el español
// entero más puntuación y números, para que añadir textos nuevos en
// site.ts no rompa nada. Uso: npm run fonts
import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

const SALIDA = 'src/fonts'
const ORIGEN = 'node_modules/@fontsource/playfair-display/files'

const VARIANTES = [
  'playfair-display-latin-500-normal',
  'playfair-display-latin-600-normal',
  'playfair-display-latin-500-italic',
]

// Español completo + puntuación + números + símbolos de la página.
const UNICODES = [
  'U+0020-007E', // ASCII imprimible
  'U+00A0-00FF', // acentos, ñ, ¿, ¡, ©
  'U+0152-0153',
  'U+2013-2014', // guiones
  'U+2018-201A',
  'U+201C-201E', // comillas
  'U+2026', // …
  'U+00AB,U+00BB', // « »
  'U+2039,U+203A',
  'U+20AC', // €
  'U+2122', // ™
].join(',')

mkdirSync(SALIDA, { recursive: true })

let antes = 0
let despues = 0

for (const nombre of VARIANTES) {
  const entrada = path.join(ORIGEN, `${nombre}.woff2`)
  const salida = path.join(SALIDA, `${nombre}.woff2`)

  execFileSync('python', [
    '-m',
    'fontTools.subset',
    entrada,
    `--unicodes=${UNICODES}`,
    '--layout-features=kern,liga,calt',
    '--flavor=woff2',
    // Playfair es TrueType y casi la mitad de su peso es hinting, que
    // los navegadores modernos ignoran en pantallas de alta densidad.
    '--no-hinting',
    '--drop-tables+=DSIG',
    `--output-file=${salida}`,
  ])

  const a = statSync(entrada).size
  const d = statSync(salida).size
  antes += a
  despues += d
  console.log(
    `✓ ${nombre}  ${(a / 1024).toFixed(1)} KB → ${(d / 1024).toFixed(1)} KB` +
      `  (−${Math.round((1 - d / a) * 100)} %)`,
  )
}

console.log(
  `\nTotal: ${(antes / 1024).toFixed(1)} KB → ${(despues / 1024).toFixed(1)} KB ` +
    `(ahorro ${((antes - despues) / 1024).toFixed(1)} KB)`,
)
