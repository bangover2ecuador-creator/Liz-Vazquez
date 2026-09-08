// Genera versiones AVIF y WebP responsive + la imagen de vista previa
// social.
//
// Las dos, no una: AVIF pesa un cuarto menos que WebP con la misma
// calidad a la vista, pero no lo entiende todo el mundo. El <picture>
// ofrece AVIF primero y WebP detrás, y cada navegador coge lo que sabe
// leer.
// Uso: npm run images
import sharp from 'sharp'
import { readdir, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const FAVICON_SVG = await readFile('public/favicon.svg')

const SRC_DIR = 'assets-src'
const SRC = 'public/images'
// Nadie pide mas de 640: el retrato usa 480 y el carrusel hasta 640.
const WIDTHS = [320, 480, 640]

const sources = (await readdir(SRC_DIR)).filter(
  (f) => f.endsWith('.jpg') && !f.startsWith('og-'),
)

await mkdir(SRC, { recursive: true })

for (const file of sources) {
  const name = path.basename(file, '.jpg')
  const input = path.join(SRC_DIR, file)

  for (const w of WIDTHS) {
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(SRC, `${name}-${w}.webp`))

    // La calidad 50 de AVIF se ve igual que la 78 de WebP; comparadas
    // lado a lado no se distinguen, y pesa un 26 % menos.
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 50, effort: 5 })
      .toFile(path.join(SRC, `${name}-${w}.avif`))
  }

  // Fallback JPEG comprimido para navegadores sin WebP
  await sharp(input)
    .resize({ width: 640, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(path.join(SRC, `${name}-640.jpg`))

  console.log(`✓ ${name}`)
}

// Vista previa social 1200x630 (WhatsApp / Facebook / Telegram)
await sharp(path.join(SRC_DIR, 'liz-hero.jpg'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(SRC, 'og-liz.jpg'))
console.log('✓ og-liz.jpg')

// Icono PNG de respaldo: sin el, los navegadores piden /favicon.ico
// y se llevan un 404 en cada visita.
await sharp(Buffer.from(FAVICON_SVG))
  .resize(48, 48)
  .png()
  .toFile('public/favicon-48.png')
console.log('✓ favicon-48.png')

// Icono para pantalla de inicio en iOS
await sharp(path.join(SRC_DIR, 'liz-hero.jpg'))
  .resize({ width: 180, height: 180, fit: 'cover', position: 'top' })
  .png()
  .toFile(path.join(SRC, 'apple-touch-icon.png'))
console.log('✓ apple-touch-icon.png')
