// Genera versiones WebP responsive + la imagen de vista previa social.
// Uso: npm run images
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC_DIR = 'assets-src'
const SRC = 'public/images'
const WIDTHS = [320, 480, 640, 960]

const sources = (await readdir(SRC_DIR)).filter(
  (f) => f.endsWith('.jpg') && !f.startsWith('og-'),
)

await mkdir(SRC, { recursive: true })

for (const file of sources) {
  const name = path.basename(file, '.jpg')
  const input = path.join(SRC_DIR, file)

  for (const w of WIDTHS) {
    const out = path.join(SRC, `${name}-${w}.webp`)
    await sharp(input)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(out)
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

// Icono para pantalla de inicio en iOS
await sharp(path.join(SRC_DIR, 'liz-hero.jpg'))
  .resize({ width: 180, height: 180, fit: 'cover', position: 'top' })
  .png()
  .toFile(path.join(SRC, 'apple-touch-icon.png'))
console.log('✓ apple-touch-icon.png')
