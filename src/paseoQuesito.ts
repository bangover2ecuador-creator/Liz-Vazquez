/**
 * El paseo del quesito por la barra.
 *
 * La coreografía no puede vivir en el CSS porque depende de dónde
 * están las letras: el quesito pisa la L, sube al puntito de la i,
 * baja a la z, salta el espacio, sube a la tilde de la á y sigue por
 * s, q, u, e, z. Esas alturas cambian con la tipografía, con el ancho
 * de la pantalla y otra vez cuando la fuente termina de cargar, así
 * que se miden aquí y los fotogramas se construyen con esas medidas.
 *
 * El paso está montado como camina alguien, no como gira un péndulo:
 * la pierna que pisa gira a velocidad constante mientras el cuerpo le
 * pasa por encima, y la que va en el aire adelanta con acelerón y se
 * encoge por el medio, que es lo que hace de rodilla. Sin esa
 * diferencia las dos piernas se cruzan iguales y parece un robot.
 *
 * Se anima con `translate`, `rotate` y `scale` por separado en vez de
 * con `transform`, para que cuerpo, piernas, brazos y dedo puedan
 * moverse cada uno por su lado sin pisarse.
 */

/** Lo que dura la pasada entera, de entrar a quedarse sentado. */
const CICLO = 18_000
/** Y lo que tarda en dar una patadita, ya sentado. */
const BALANCEO = 2_600

// Dónde caen los pies dentro de la caja del dibujo, en tanto por uno.
// Sale del viewBox "10 24 82 68": los pies están en x≈48,4 e y≈86,3.
const PIE_X = (48.4 - 10) / 82
const PIE_Y = (86.3 - 24) / 68
// Y dónde tiene la cadera, que es por donde se sienta.
const CADERA_Y = (66.5 - 24) / 68

// Cuánto se encoge para andar sobre las letras. De pie y a tamaño
// completo no cabe entre el texto y el borde de la barra; encogido
// además se lee como que está allá arriba.
const ESCALA_LETRAS = 0.58

const ABRE_PIERNA = 23
const ABRE_BRAZO = 16
/** El izquierdo abre mucho más: colgando corto parecía una cola. */
const ABRE_BRAZO_IZQ = 30
/** Cuánto encoge al sentarse en el filo de la barra. */
const ESCALA_SENTADO = 0.82
/** Cuánto se acorta la pierna en el aire. Es la rodilla. */
const ENCOGE = 0.82
/** Reposo de cada brazo, en grados. Uno a cada lado del cuerpo. */
const BRAZO_DER = 14
const BRAZO_IZQ = 0
/** Fotogramas por paso. Con menos, el paso se ve a tirones. */
const MUESTRAS = 4

/** Los tramos del recorrido, en tanto por uno del ciclo. */
const T = {
  entraFin: 0.055,
  quietoIni: 0.065,
  sorpresa: 0.18,
  senalaIni: 0.22,
  senalaFin: 0.3,
  agacha: 0.325,
  letrasIni: 0.36,
  letrasFin: 0.63,
  baja: 0.665,
  seVaFin: 0.73,
  fuera: 0.745,
  vuelveIni: 0.8,
  vuelveFin: 0.88,
  sientaFin: 0.93,
}

type Letra = { ch: string; centro: number; techo: number }

/** Mide dónde cae y cuánto sube cada letra del nombre. */
function medirLetras(nombre: HTMLElement): Letra[] {
  const st = getComputedStyle(nombre)
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) return []
  ctx.font = st.fontStyle + ' ' + st.fontWeight + ' ' + st.fontSize + ' ' + st.fontFamily

  const texto = nombre.textContent || ''
  const caja = nombre.getBoundingClientRect()
  const todo = ctx.measureText(texto)
  if (!todo.width || !caja.width) return []

  // La línea base dentro de la caja, y un ajuste por si el ancho
  // pintado no coincide al milímetro con el medido en el lienzo.
  const base =
    caja.top +
    (caja.height + (todo.actualBoundingBoxAscent - todo.actualBoundingBoxDescent)) / 2
  const ajuste = caja.width / todo.width

  const letras: Letra[] = []
  let x = caja.left
  for (const ch of texto) {
    const m = ctx.measureText(ch)
    const ancho = m.width * ajuste
    // El espacio no es un apoyo: por encima de él se salta.
    if (ch.trim()) {
      letras.push({ ch, centro: x + ancho / 2, techo: base - m.actualBoundingBoxAscent })
    }
    x += ancho
  }
  return letras
}

type Caja = { cx: number; cy: number; ancho: number; alto: number }
type Punto = { x: number; y: number }

/** La traslación que deja los pies justo en (x, y) con esa escala. */
function haciaElPie(caja: Caja, x: number, y: number, escala: number): Punto {
  const w = caja.ancho * escala
  const h = caja.alto * escala
  return {
    x: x - caja.cx + w * (0.5 - PIE_X),
    y: y - caja.cy + h * (0.5 - PIE_Y),
  }
}

type Paso = {
  t: number
  x: number
  y: number
  escala: number
  giro: number
  opacidad: number
  /** Ángulo de cada pierna: [delante, atrás]. */
  patas: [number, number]
  /** Cuánto está encogida cada pierna: 1 estirada. */
  largos: [number, number]
}

const suave = (u: number) => 0.5 - Math.cos(Math.PI * u) / 2

/**
 * Un tramo caminado: recorre los apoyos uno a uno, alternando qué
 * pierna pisa y cuál va por el aire.
 */
function caminar(
  apoyos: Punto[],
  tIni: number,
  tFin: number,
  escala: number,
  levante: number,
  saltoEn = -1,
  levanteSalto = 0,
): Paso[] {
  const salida: Paso[] = []
  const tramos = apoyos.length - 1
  if (tramos < 1) return salida

  for (let i = 0; i < tramos; i += 1) {
    const a = apoyos[i]
    const b = apoyos[i + 1]
    const t0 = tIni + ((tFin - tIni) * i) / tramos
    const t1 = tIni + ((tFin - tIni) * (i + 1)) / tramos
    const salta = i + 1 === saltoEn
    const alza = salta ? levanteSalto : levante
    // La pierna que pisa alterna en cada apoyo.
    const pisaDelante = i % 2 === 0

    for (let j = 0; j < MUESTRAS; j += 1) {
      const u = j / MUESTRAS
      // La que pisa gira a velocidad constante: el pie se queda
      // clavado y es el cuerpo el que le pasa por encima.
      const clavada = ABRE_PIERNA * (1 - 2 * u)
      // La del aire adelanta con acelerón y se encoge por el medio.
      const suelta = ABRE_PIERNA * (2 * suave(u) - 1)
      const rodilla = 1 - (1 - ENCOGE) * Math.sin(Math.PI * u)

      salida.push({
        t: t0 + (t1 - t0) * u,
        x: a.x + (b.x - a.x) * u,
        y: a.y + (b.y - a.y) * u - alza * Math.sin(Math.PI * u),
        escala,
        giro: (salta ? -7 : -2) * Math.sin(Math.PI * u),
        opacidad: 1,
        patas: pisaDelante ? [clavada, suelta] : [suelta, clavada],
        largos: pisaDelante ? [1, rodilla] : [rodilla, 1],
      })
    }
  }

  // El último apoyo, con el pie ya puesto.
  const fin = apoyos[apoyos.length - 1]
  const par = tramos % 2 === 0
  salida.push({
    t: tFin,
    ...fin,
    escala,
    giro: 0,
    opacidad: 1,
    patas: par ? [ABRE_PIERNA, -ABRE_PIERNA] : [-ABRE_PIERNA, ABRE_PIERNA],
    largos: [1, 1],
  })
  return salida
}

/** La traslación que deja la cadera justo en (x, y): sentado. */
function haciaLaCadera(caja: Caja, x: number, y: number, escala: number): Punto {
  const w = caja.ancho * escala
  const h = caja.alto * escala
  return {
    x: x - caja.cx + w * (0.5 - PIE_X),
    y: y - caja.cy + h * (0.5 - CADERA_Y),
  }
}

/** De pie y quieto. */
function plantado(t: number, p: Punto, escala: number, giro: number, opacidad = 1): Paso {
  return { t, ...p, escala, giro, opacidad, patas: [0, 0], largos: [1, 1] }
}

export function iniciarPaseo(marca: HTMLElement) {
  const cuerpo = marca.querySelector<SVGElement>('.wordmark__mark')
  const nombre = marca.querySelector<HTMLElement>('.wordmark__name')
  if (!cuerpo || !nombre) return () => {}

  const pieza = (sel: string) => marca.querySelector<SVGElement>(sel)
  const pataDel = pieza('.q__pata--del')
  const pataTras = pieza('.q__pata--tras')
  const brazoDer = pieza('.q__brazo--der')
  const brazoIzq = pieza('.q__brazo--izq')
  const dedo = pieza('.q__dedo')
  const caraContenta = pieza('.q__cara--contenta')
  const caraSorpresa = pieza('.q__cara--sorpresa')

  let vivas: Animation[] = []
  // Una vez sentado, ya no vuelve a hacer el recorrido: si se gira el
  // teléfono solo se recoloca en el filo nuevo.
  let yaSentado = false

  // Quien pide menos movimiento no ve el paseo: el quesito se queda
  // quieto junto al nombre.
  const quieto = window.matchMedia('(prefers-reduced-motion: reduce)')

  const montar = () => {
    vivas.forEach((a) => a.cancel())
    vivas = []
    if (quieto.matches) return

    // Se mide con la animación apagada: si no, se leerían posiciones
    // ya desplazadas y el recorrido se descuadraría solo.
    marca.classList.add('sin-paseo')
    const letras = medirLetras(nombre)
    const r = cuerpo.getBoundingClientRect()
    const n = nombre.getBoundingClientRect()
    marca.classList.remove('sin-paseo')

    if (letras.length < 4 || !r.width) return

    const caja: Caja = {
      cx: r.left + r.width / 2,
      cy: r.top + r.height / 2,
      ancho: r.width,
      alto: r.height,
    }
    const sueloY = r.bottom
    const casaX = r.left + PIE_X * r.width
    const enSuelo = (x: number, extra = 0) => haciaElPie(caja, x, sueloY + extra, 1)

    // Un apoyo por letra, ya convertidos en traslación.
    const apoyos = letras.map((l) => haciaElPie(caja, l.centro, l.techo, ESCALA_LETRAS))

    // Dónde estaba el espacio: el hueco más ancho entre dos letras
    // seguidas. Ahí no hay dónde pisar y toca saltar.
    let hueco = -1
    let mayor = 0
    for (let i = 1; i < letras.length; i += 1) {
      const d = letras[i].centro - letras[i - 1].centro
      if (d > mayor) {
        mayor = d
        hueco = i
      }
    }

    const pasos: Paso[] = []
    const casa = enSuelo(casaX)

    // ── Entra corriendo por la izquierda ─────────────────────────
    const fueraIzq = enSuelo(-r.width)
    pasos.push(plantado(0, fueraIzq, 1, 0, 0))
    pasos.push(plantado(0.004, fueraIzq, 1, 0, 1))
    const zancadas = 5
    const entrada: Punto[] = []
    for (let i = 0; i <= zancadas; i += 1) {
      entrada.push(enSuelo(-r.width + (casaX + r.width) * (i / zancadas)))
    }
    pasos.push(...caminar(entrada, 0.004, T.entraFin, 1, 2))

    // ── Quieto junto al nombre, y luego la sorpresa ──────────────
    pasos.push(plantado(T.quietoIni, casa, 1, 0))
    pasos.push(plantado(T.sorpresa, casa, 1, 0))
    pasos.push(plantado(T.senalaIni, casa, 1, 6))
    pasos.push(plantado(T.senalaFin, casa, 1, 6))

    // ── Se agacha y salta a la primera letra ─────────────────────
    pasos.push({
      ...plantado(T.agacha, enSuelo(casaX, 3), 1, -4),
      patas: [14, 14],
      largos: [0.9, 0.9],
    })
    pasos.push({
      t: (T.agacha + T.letrasIni) / 2,
      x: (apoyos[0].x + casa.x) / 2,
      y: apoyos[0].y - 12,
      escala: (1 + ESCALA_LETRAS) / 2,
      giro: -12,
      opacidad: 1,
      patas: [-16, -16],
      largos: [1, 1],
    })

    // ── Y ahora, letra por letra ─────────────────────────────────
    pasos.push(...caminar(apoyos, T.letrasIni, T.letrasFin, ESCALA_LETRAS, 1.6, hueco, 9))

    // ── Salta de la última letra al suelo ────────────────────────
    const ultimo = apoyos[apoyos.length - 1]
    const traselNombre = n.right + r.width * 0.3
    pasos.push({
      t: (T.letrasFin + T.baja) / 2,
      x: (ultimo.x + enSuelo(traselNombre).x) / 2,
      y: ultimo.y - 6,
      escala: (1 + ESCALA_LETRAS) / 2,
      giro: 9,
      opacidad: 1,
      patas: [-14, -14],
      largos: [1, 1],
    })
    pasos.push({
      ...plantado(T.baja, enSuelo(traselNombre, 3), 1, 4),
      patas: [13, 13],
      largos: [0.9, 0.9],
    })

    // ── Y se va caminando por la derecha ─────────────────────────
    const salidaX = window.innerWidth + r.width
    const trozos = 4
    const marcha: Punto[] = []
    for (let i = 0; i <= trozos; i += 1) {
      marcha.push(enSuelo(traselNombre + (salidaX - traselNombre) * (i / trozos)))
    }
    pasos.push(...caminar(marcha, T.baja, T.seVaFin, 1, 2).slice(1))

    const fuera = enSuelo(salidaX)
    pasos.push(plantado(T.fuera, fuera, 1, 0, 0))

    // ── Vuelve por la izquierda y se sienta en el filo ───────────
    // No se repite la subida: dar la vuelta entera una y otra vez
    // cansa. Se queda sentado en la línea de abajo de la barra, con
    // los pies colgando, y de ahí ya solo patalea despacio.
    const barra = marca.closest('.topbar')?.getBoundingClientRect()
    const filo = barra ? barra.bottom : sueloY
    const sitioX = casaX
    const sentado = haciaLaCadera(caja, sitioX, filo, ESCALA_SENTADO)

    // ── Y cuando llega, se queda ahí sentado ─────────────────────
    // Al acabar la pasada se cambian las animaciones por las de
    // estar sentado: se cancelan las de antes en vez de dejarlas
    // rellenando, porque el balanceo tiene que mandar sobre ellas.
    const alSentarse = () => {
      vivas.forEach((a) => a.cancel())
      vivas = []
      yaSentado = true

      const cuna: KeyframeAnimationOptions = {
        duration: BALANCEO,
        iterations: Infinity,
        easing: 'ease-in-out',
        direction: 'alternate',
      }

      vivas.push(
        cuerpo.animate(
          [
            {
              translate: sentado.x.toFixed(2) + 'px ' + sentado.y.toFixed(2) + 'px',
              scale: String(ESCALA_SENTADO),
              rotate: '-1.5deg',
            },
            {
              translate: sentado.x.toFixed(2) + 'px ' + (sentado.y - 0.8).toFixed(2) + 'px',
              scale: String(ESCALA_SENTADO),
              rotate: '1.5deg',
            },
          ],
          cuna,
        ),
      )

      // Los pies colgando: una patadita cada uno, a contratiempo.
      const patalea = (el: SVGElement | null, signo: number) => {
        if (!el) return
        vivas.push(
          el.animate(
            [
              { rotate: (11 * signo).toFixed(1) + 'deg' },
              { rotate: (-11 * signo).toFixed(1) + 'deg' },
            ],
            cuna,
          ),
        )
      }
      patalea(pataDel, 1)
      patalea(pataTras, -1)

      const brazo = (el: SVGElement | null, base: number, signo: number) => {
        if (!el) return
        vivas.push(
          el.animate(
            [
              { rotate: (base + 5 * signo).toFixed(1) + 'deg' },
              { rotate: (base - 5 * signo).toFixed(1) + 'deg' },
            ],
            cuna,
          ),
        )
      }
      brazo(brazoDer, BRAZO_DER, 1)
      brazo(brazoIzq, BRAZO_IZQ, -1)
      if (caraContenta) caraContenta.style.opacity = '1'
      if (caraSorpresa) caraSorpresa.style.opacity = '0'
      if (dedo) {
        dedo.style.scale = '0'
        dedo.style.opacity = '0'
      }
    }


    const vuelta: Punto[] = []
    const trozosVuelta = 4
    for (let i = 0; i <= trozosVuelta; i += 1) {
      vuelta.push(enSuelo(-r.width + (sitioX + r.width) * (i / trozosVuelta)))
    }
    pasos.push(plantado(T.vuelveIni - 0.004, fueraIzq, 1, 0, 0))
    pasos.push(plantado(T.vuelveIni, fueraIzq, 1, 0, 1))
    pasos.push(...caminar(vuelta, T.vuelveIni, T.vuelveFin, 1, 2).slice(1))

    // Se dobla y se deja caer sentado en el canto.
    pasos.push({
      ...plantado((T.vuelveFin + T.sientaFin) / 2, enSuelo(sitioX, 2), 0.92, 0),
      patas: [15, 15],
      largos: [0.9, 0.9],
    })
    pasos.push(plantado(T.sientaFin, sentado, ESCALA_SENTADO, 0))
    pasos.push(plantado(1, sentado, ESCALA_SENTADO, 0))

    pasos.sort((a, b) => a.t - b.t)

    // Una sola pasada. `forwards` deja al quesito sentado donde
    // termina, en vez de devolverlo de golpe al principio.
    const opciones: KeyframeAnimationOptions = {
      duration: CICLO,
      iterations: 1,
      easing: 'linear',
      delay: 400,
      fill: 'forwards',
    }
    const corte = (t: number) => Math.min(1, Math.max(0, t))

    if (yaSentado) {
      alSentarse()
      return
    }

    vivas.push(
      cuerpo.animate(
        pasos.map((p) => ({
          offset: corte(p.t),
          translate: p.x.toFixed(2) + 'px ' + p.y.toFixed(2) + 'px',
          rotate: p.giro.toFixed(1) + 'deg',
          scale: String(p.escala),
          opacity: p.opacidad,
          easing: 'ease-in-out',
        })),
        opciones,
      ),
    )

    // Las piernas van sin suavizado entre fotogramas: el paso ya trae
    // el suyo dentro y encadenar dos suavizados lo vuelve blandengue.
    const pierna = (el: SVGElement | null, idx: 0 | 1) => {
      if (!el) return
      vivas.push(
        el.animate(
          pasos.map((p) => ({
            offset: corte(p.t),
            rotate: p.patas[idx].toFixed(1) + 'deg',
            scale: '1 ' + p.largos[idx].toFixed(3),
            easing: 'linear',
          })),
          opciones,
        ),
      )
    }
    pierna(pataDel, 0)
    pierna(pataTras, 1)

    // Al andar, el brazo va con la pierna del lado contrario: el
    // izquierdo con la pierna derecha. El derecho, además, deja de
    // balancear para señalar la L.
    const senalando = (t: number) => t >= T.sorpresa - 0.001 && t <= T.senalaFin + 0.001
    if (brazoDer) {
      const marcos = pasos
        .filter((p) => !senalando(p.t))
        .map((p) => ({
          offset: corte(p.t),
          rotate: (BRAZO_DER - (p.patas[1] / ABRE_PIERNA) * ABRE_BRAZO).toFixed(1) + 'deg',
          easing: 'ease-in-out',
        }))
        .concat([
          { offset: T.sorpresa, rotate: BRAZO_DER + 'deg', easing: 'ease-out' },
          { offset: T.senalaIni, rotate: '-30deg', easing: 'ease-out' },
          { offset: T.senalaIni + 0.018, rotate: '-8deg', easing: 'ease-in' },
          { offset: T.senalaIni + 0.036, rotate: '-30deg', easing: 'ease-out' },
          { offset: T.senalaIni + 0.054, rotate: '-8deg', easing: 'ease-in' },
          { offset: T.senalaFin, rotate: '-26deg', easing: 'ease-in-out' },
        ])
        .sort((a, b) => a.offset - b.offset)
      vivas.push(brazoDer.animate(marcos, opciones))
    }

    if (brazoIzq) {
      vivas.push(
        brazoIzq.animate(
          pasos.map((p) => ({
            offset: corte(p.t),
            rotate: (BRAZO_IZQ - (p.patas[0] / ABRE_PIERNA) * ABRE_BRAZO_IZQ).toFixed(1) + 'deg',
            easing: 'ease-in-out',
          })),
          opciones,
        ),
      )
    }

    // El dedo sale del puño solo mientras señala.
    if (dedo) {
      vivas.push(
        dedo.animate(
          [
            { offset: 0, scale: '0', opacity: 0, easing: 'linear' },
            { offset: T.senalaIni - 0.012, scale: '0', opacity: 0, easing: 'ease-out' },
            { offset: T.senalaIni, scale: '1', opacity: 1, easing: 'linear' },
            { offset: T.senalaFin, scale: '1', opacity: 1, easing: 'ease-in' },
            { offset: T.senalaFin + 0.012, scale: '0', opacity: 0, easing: 'linear' },
            { offset: 1, scale: '0', opacity: 0 },
          ],
          opciones,
        ),
      )
    }

    // Las caras se cambian de golpe, sin fundido: un fundido entre dos
    // caras deja un fotograma con cuatro ojos.
    const cara = (el: SVGElement | null, sorprendida: boolean) => {
      if (!el) return
      const dentro = sorprendida ? 1 : 0
      const afuera = sorprendida ? 0 : 1
      vivas.push(
        el.animate(
          // El suavizado va EN CADA FOTOGRAMA, no en las opciones: ahi
          // se aplicaria a la vuelta entera y `steps` la dejaria
          // congelada en el primer valor, sin llegar a cambiar de cara.
          [
            { offset: 0, opacity: afuera, easing: 'steps(1, end)' },
            { offset: T.sorpresa - 0.004, opacity: afuera, easing: 'steps(1, end)' },
            { offset: T.sorpresa, opacity: dentro, easing: 'steps(1, end)' },
            { offset: T.senalaFin, opacity: dentro, easing: 'steps(1, end)' },
            { offset: T.senalaFin + 0.004, opacity: afuera, easing: 'steps(1, end)' },
            { offset: 1, opacity: afuera },
          ],
          opciones,
        ),
      )
    }
    cara(caraSorpresa, true)
    cara(caraContenta, false)

    if (yaSentado) alSentarse()
    else vivas[0]?.finished.then(alSentarse).catch(() => {})
  }

  montar()

  let pendiente = 0
  const remontar = () => {
    cancelAnimationFrame(pendiente)
    pendiente = requestAnimationFrame(montar)
  }

  // El nombre cambia de ancho al cargar la tipografía, y por dónde se
  // sale de la pantalla depende del ancho de esta.
  const ro = new ResizeObserver(remontar)
  ro.observe(nombre)
  document.fonts?.ready.then(montar).catch(() => {})
  window.addEventListener('resize', remontar)
  quieto.addEventListener('change', remontar)

  return () => {
    ro.disconnect()
    window.removeEventListener('resize', remontar)
    quieto.removeEventListener('change', remontar)
    cancelAnimationFrame(pendiente)
    vivas.forEach((a) => a.cancel())
  }
}
