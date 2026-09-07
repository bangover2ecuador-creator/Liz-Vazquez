import { getStore } from '@netlify/blobs'
import type { Config } from '@netlify/functions'

/**
 * Comprueba cada minuto si Liz está emitiendo en TikTok y
 * guarda el resultado. La landing lo lee de `/api/live`, así que quien
 * entra no toca TikTok: solo lee el dato ya guardado.
 *
 * Cómo se sabe: el endpoint de sala que usa la propia web de TikTok
 * devuelve `status: 2` mientras se emite y `status: 4` cuando la
 * emisión terminó. No pide sesión y responde en menos de un segundo.
 *
 * Solo corre en su horario: fuera de él sale sin llamar a TikTok.
 */

// Su cuenta principal: es donde emite todos los dias. La cuenta
// @lizvasquezlive no se usa para los directos.
const CUENTA_LIVE = 'lis_iv'

// Horario de Liz, en hora de Perú: empieza a las 8 de la mañana y
// puede alargarse hasta las 2 de la madrugada del día siguiente.
const HORA_INICIO = 8
const HORA_FIN = 2

// Perú no aplica horario de verano, así que el desfase es fijo.
const DESFASE_PERU = -5

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0 Safari/537.36'

// TikTok marca 2 mientras se emite y 4 cuando ha terminado.
const EMITIENDO = 2

export function horaEnPeru(ahora = new Date()) {
  return (ahora.getUTCHours() + 24 + DESFASE_PERU) % 24
}

export function estaEnHorario(hora: number) {
  // El tramo cruza la medianoche: de 8 a 23 y de 0 a 2.
  return hora >= HORA_INICIO || hora < HORA_FIN
}

export type Estado = {
  enVivo: boolean
  titulo: string | null
  espectadores: number | null
  revisadoEn: string
  horaPeru: number
  dentroDeHorario: boolean
  /** Para poder diagnosticar desde el navegador. */
  motivo: string
}

type Respuesta = {
  data?: {
    user?: { status?: number; roomId?: string }
    liveRoom?: {
      status?: number
      title?: string
      liveRoomStats?: { userCount?: number }
    }
  }
}

async function consultarTikTok() {
  const url =
    'https://www.tiktok.com/api-live/user/room/' +
    `?aid=1988&sourceType=54&uniqueId=${encodeURIComponent(CUENTA_LIVE)}`

  const respuesta = await fetch(url, {
    headers: {
      // Sin agente de navegador real, TikTok devuelve una pantalla de
      // verificación en lugar de JSON.
      'User-Agent': UA,
      Referer: `https://www.tiktok.com/@${CUENTA_LIVE}/live`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(12_000),
  })

  if (!respuesta.ok) {
    throw new Error(`TikTok respondió ${respuesta.status}`)
  }

  const datos = (await respuesta.json()) as Respuesta
  const usuario = datos.data?.user
  const sala = datos.data?.liveRoom

  // Una cuenta que nunca ha emitido no trae `status`: eso no es un
  // fallo, es que no hay directo.
  if (usuario?.status == null) {
    return { enVivo: false, titulo: null, espectadores: null, motivo: 'sin datos de sala' }
  }

  const enVivo = usuario.status === EMITIENDO || sala?.status === EMITIENDO

  return {
    enVivo,
    titulo: enVivo ? (sala?.title ?? null) : null,
    espectadores: enVivo ? (sala?.liveRoomStats?.userCount ?? null) : null,
    motivo: enVivo ? 'emitiendo' : `sala en estado ${usuario.status}`,
  }
}

export default async () => {
  const store = getStore('liz-live')
  const hora = horaEnPeru()
  const dentro = estaEnHorario(hora)

  const guardar = async (estado: Estado) => {
    await store.setJSON('estado', estado)
    return new Response(JSON.stringify(estado), {
      headers: { 'content-type': 'application/json' },
    })
  }

  // Fuera de su horario no se molesta a TikTok.
  if (!dentro) {
    return guardar({
      enVivo: false,
      titulo: null,
      espectadores: null,
      revisadoEn: new Date().toISOString(),
      horaPeru: hora,
      dentroDeHorario: false,
      motivo: 'fuera de horario',
    })
  }

  try {
    const resultado = await consultarTikTok()
    return guardar({
      ...resultado,
      revisadoEn: new Date().toISOString(),
      horaPeru: hora,
      dentroDeHorario: true,
    })
  } catch (error) {
    // Si TikTok falla, se conserva lo último que sí supimos durante
    // 15 minutos: un corte de red no debería apagar un directo real.
    const previo = (await store.get('estado', { type: 'json' })) as Estado | null
    const frescura = previo ? Date.now() - Date.parse(previo.revisadoEn) : Infinity
    const conservar = previo != null && frescura < 15 * 60_000

    return guardar({
      enVivo: conservar ? previo!.enVivo : false,
      titulo: conservar ? previo!.titulo : null,
      espectadores: conservar ? previo!.espectadores : null,
      revisadoEn: new Date().toISOString(),
      horaPeru: hora,
      dentroDeHorario: true,
      motivo: conservar
        ? 'se conserva el último estado conocido'
        : `error consultando: ${(error as Error).message}`,
    })
  }
}

// Cada minuto, solo en las horas UTC que cubren su horario de Perú:
// 13–23 UTC son las 08:00–18:59 allí, y 0–6 UTC las 19:00–01:59. La
// hora 7 UTC (02:00 en Perú) queda fuera a propósito, porque ahí ya
// termina su horario y la función saldría sin hacer nada.
//
// Son 1.080 ejecuciones al día. Si algún día hay que abaratarlo, el
// número de aquí es el que manda: '*/2' lo deja en la mitad.
export const config: Config = {
  schedule: '* 13-23,0-6 * * *',
}
