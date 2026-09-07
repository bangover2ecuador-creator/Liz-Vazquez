import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

/**
 * Lo que consulta la landing: devuelve el último estado guardado por
 * `revisar-live`. No llama a TikTok, así que responde al instante y
 * mil visitas no se convierten en mil peticiones a TikTok.
 *
 * Si el dato es viejo se devuelve apagado: es preferible no anunciar
 * un directo a anunciar uno que ya terminó.
 */

// La comprobación corre cada minuto, así que diez minutos sin noticias
// significan que algo falla. Es también lo que apaga el aviso cuando
// acaba su horario y la comprobación se va a dormir.
const CADUCA_MS = 10 * 60_000

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
      // El navegador no guarda nada: si guardase, alguien que recarga
      // seguiría viendo el aviso apagado con ella ya emitiendo.
      'cache-control': 'public, max-age=0, must-revalidate',
      // Netlify sí guarda, 30 segundos, y `durable` hace que ese dato
      // valga para todo el mundo en vez de uno por cada servidor suyo.
      // Eso es lo que mantiene barata la factura aunque entren miles:
      // como mucho dos lecturas por minuto en total, no por visita.
      //
      // `stale-while-revalidate` sirve el dato de hace un momento sin
      // hacer esperar a nadie mientras busca el nuevo por detrás.
      'netlify-cdn-cache-control':
        'public, durable, max-age=30, stale-while-revalidate=60',
    },
  })
}

export const config: Config = {
  path: '/api/live',
}
