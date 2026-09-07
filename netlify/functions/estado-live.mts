import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

/**
 * Lo que consulta la landing: devuelve el último estado guardado por
 * `revisar-live`. No llama a TikTok, así que responde al instante y
 * mil visitas no se convierten en mil peticiones a TikTok.
 *
 * Si el dato es viejo (más de 20 minutos) se devuelve apagado: es
 * preferible no anunciar un directo a anunciar uno que ya terminó.
 */

const CADUCA_MS = 20 * 60_000

type Estado = {
  enVivo: boolean
  titulo: string | null
  espectadores: number | null
  revisadoEn: string
  horaPeru: number
  dentroDeHorario: boolean
  motivo: string
}

export default async () => {
  const store = getStore('liz-live')
  const guardado = (await store.get('estado', { type: 'json' })) as Estado | null

  const antiguedad = guardado ? Date.now() - Date.parse(guardado.revisadoEn) : Infinity
  const vigente = guardado != null && antiguedad < CADUCA_MS

  const cuerpo = {
    enVivo: vigente ? guardado!.enVivo : false,
    titulo: vigente ? guardado!.titulo : null,
    espectadores: vigente ? guardado!.espectadores : null,
    revisadoEn: guardado?.revisadoEn ?? null,
    // Útil para saber, desde el navegador, si la comprobación va bien.
    vigente,
    motivo: vigente ? guardado!.motivo : 'sin dato reciente',
  }

  return new Response(JSON.stringify(cuerpo), {
    headers: {
      'content-type': 'application/json',
      // Un minuto de caché en el borde: el estado se refresca cada
      // cinco, así que nadie ve un dato con más de un minuto de mas.
      'cache-control': 'public, max-age=60',
    },
  })
}

export const config: Config = {
  path: '/api/live',
}
