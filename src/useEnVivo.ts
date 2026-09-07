import { useEffect, useState } from 'react'
import { site } from './data/site'

/**
 * Dice si Liz está emitiendo ahora mismo.
 *
 * Lee `/api/live`, que devuelve el último estado que guardó la
 * comprobación programada. No habla con TikTok desde el navegador:
 * TikTok no lo permitiría desde otro dominio, y además así mil
 * visitas no son mil peticiones.
 *
 * Vuelve a preguntar cada dos minutos y al volver a la pestaña, para
 * que alguien que deja la página abierta vea empezar el directo.
 *
 * Si la comprobación no responde, manda `site.liveNow`, el
 * interruptor manual: la landing nunca se queda peor de como estaba.
 */
const CADA_MS = 2 * 60_000

export type Directo = {
  enVivo: boolean
  titulo: string | null
  espectadores: number | null
}

export function useEnVivo(): Directo {
  const [directo, setDirecto] = useState<Directo>({
    enVivo: site.liveNow,
    titulo: null,
    espectadores: null,
  })

  useEffect(() => {
    // Modo de prueba: ?live=1 enciende el aviso sin esperar a que
    // haya un directo, para poder ver como queda.
    if (new URLSearchParams(location.search).get('live') === '1') {
      setDirecto({ enVivo: true, titulo: 'Probando el aviso', espectadores: 128 })
      return
    }

    let vivo = true
    const control = new AbortController()

    const preguntar = async () => {
      try {
        const r = await fetch('/api/live', {
          signal: control.signal,
          cache: 'no-store',
        })
        if (!r.ok) return
        const d = (await r.json()) as Partial<Directo>
        if (vivo && typeof d.enVivo === 'boolean') {
          setDirecto({
            enVivo: d.enVivo,
            titulo: d.titulo ?? null,
            espectadores: d.espectadores ?? null,
          })
        }
      } catch {
        // Sin conexión o función caída: se queda el interruptor manual.
      }
    }

    preguntar()
    const id = window.setInterval(preguntar, CADA_MS)

    // Al volver a la pestaña, preguntar de nuevo: puede haber pasado
    // media hora con la página abierta de fondo.
    const alVolver = () => {
      if (document.visibilityState === 'visible') preguntar()
    }
    document.addEventListener('visibilitychange', alVolver)

    return () => {
      vivo = false
      control.abort()
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', alVolver)
    }
  }, [])

  return directo
}
