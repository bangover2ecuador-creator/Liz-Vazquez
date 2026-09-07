// Descarga la portada de cada vídeo de TikTok y la deja optimizada.
// Uso: npm run covers
//
// Hace falta descargarlas porque los enlaces que da TikTok vienen
// firmados y caducan en un día: enlazarlos directos dejaría la sección
// llena de imágenes rotas al día siguiente.
//
// Las portadas se leen de src/data/site.ts, así que al añadir una
// colaboración con vídeo basta con volver a lanzar este script.
import sharp from 'sharp'
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const ORIGINALES = 'assets-src/covers'
const DESTINO = 'public/images/covers'
// La ficha muestra la portada a 76 px; 240 cubre pantallas de 3x.
const ANCHO = 240

const datos = await readFile('src/data/site.ts', 'utf8')
const ids = [...new Set([...datos.matchAll(/@lis_iv\/video\/(\d+)/g)].map((m) => m[1]))]

await mkdir(ORIGINALES, { recursive: true })
await mkdir(DESTINO, { recursive: true })

const existe = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

let nuevas = 0
for (const id of ids) {
  const original = path.join(ORIGINALES, `${id}.jpg`)

  if (!(await existe(original))) {
    const r = await fetch(
      `https://www.tiktok.com/oembed?url=https://www.tiktok.com/@lis_iv/video/${id}`,
      { headers: { 'User-Agent': UA } },
    )
    if (!r.ok) {
      console.warn(`✗ ${id}: TikTok respondió ${r.status}`)
      continue
    }
    const { thumbnail_url: portada } = await r.json()
    if (!portada) {
      console.warn(`✗ ${id}: sin portada`)
      continue
    }
    const img = await fetch(portada, { headers: { 'User-Agent': UA } })
    await writeFile(original, Buffer.from(await img.arrayBuffer()))
    nuevas += 1
  }

  await sharp(original)
    .resize({ width: ANCHO, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(path.join(DESTINO, `${id}.webp`))

  console.log(`✓ ${id}`)
}

console.log(`\n${ids.length} portadas listas (${nuevas} descargadas ahora).`)
