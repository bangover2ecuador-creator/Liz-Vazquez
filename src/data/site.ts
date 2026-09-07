// ─────────────────────────────────────────────────────────────
//  Todo el contenido editable de la landing vive aquí.
//  Para actualizar cifras, handles o textos, cambia solo este archivo.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Liz Vásquez',
  tagline: 'Todo a su tiempo',
  location: 'Cajamarca, Perú',
  award: 'Mejor Influencer Cajamarquina',
  intro: 'Lives diarios en TikTok',
  contactHandle: '@liss_iv',
  contactUrl: 'https://www.instagram.com/liss_iv',
  // Los lives los hace en su cuenta principal, no en la de respaldo.
  // Apagada se va al perfil; encendida, directa a la sala del directo.
  liveUrl: 'https://www.tiktok.com/@lis_iv',
  liveGoUrl: 'https://www.tiktok.com/@lis_iv/live',

  // ── Aviso de directo ────────────────────────────────────────
  // Normalmente NO hay que tocar esto: una funcion de Netlify
  // comprueba TikTok cada cinco minutos en su horario y enciende el
  // aviso sola (ver netlify/functions/revisar-live.mts).
  //
  // Este valor es solo el respaldo: lo que se ve mientras llega la
  // respuesta, o si la comprobacion falla. Dejalo en false.
  liveNow: false,
  liveNowLabel: 'En vivo ahora',
  liveOffLabel: 'Lives diarios en TikTok',
} as const

export type Social = {
  id: string
  platform: string
  handle: string
  url: string
  accent: string
  note?: string
  featured?: boolean
}

export const socials: Social[] = [
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@lis_iv',
    url: 'https://www.tiktok.com/@lis_iv',
    accent: '#25F4EE',
    note: 'Lives diarios',
    featured: true,
  },
  {
    id: 'tiktok-live',
    platform: 'TikTok',
    handle: '@lizvasquezlive',
    url: 'https://www.tiktok.com/@lizvasquezlive',
    accent: '#25F4EE',
    note: 'Cuenta de respaldo',
  },
  {
    id: 'tiktok-2',
    platform: 'TikTok',
    handle: '@lizvasquez2.0',
    url: 'https://www.tiktok.com/@lizvasquez2.0',
    accent: '#25F4EE',
    note: 'Cuenta de respaldo',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@liss_iv',
    url: 'https://www.instagram.com/liss_iv',
    accent: '#F35BA8',
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: '@Lisssiv',
    url: 'https://www.facebook.com/Lisssiv',
    accent: '#4C8DFF',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@lis_iv',
    url: 'https://www.youtube.com/@lis_iv',
    accent: '#FF4E45',
  },
]

// La cuenta principal no vive en "Mis redes": va al pie de la página,
// porque además de sus lives es por donde llegan las marcas y quien
// quiere contratarla. Marcar `featured: true` es lo que la mueve ahí.
export const cuentaPrincipal = socials.find((s) => s.featured) ?? socials[0]
export const redesSecundarias = socials.filter((s) => s !== cuentaPrincipal)

// Cifras mostradas en la tira de estadísticas.
// `value` es el número que anima; `suffix` el texto fijo que lo acompaña.
export const stats = [
  { id: 'followers', value: 925.7, suffix: 'K', decimals: 1, label: 'Seguidores en TikTok' },
  { id: 'likes', value: 20.9, suffix: 'M', decimals: 1, label: 'Me gusta acumulados' },
  { id: 'instagram', value: 89, suffix: 'K', decimals: 0, label: 'Seguidores en Instagram' },
  { id: 'posts', value: 300, suffix: '', decimals: 0, label: 'Publicaciones' },
]

export const gallery = [
  // Carrusel de la portada. La primera es la foto principal, la que
  // se ve al abrir; las demas llegan deslizando en ese mismo marco.
  { id: 'gala', src: 'liz-gala', caption: 'Noche de gala' },
  { id: 'principal', src: 'liz-hero', caption: 'Todo a su tiempo' },
  { id: 'corazon', src: 'liz-corazon', caption: 'Bajo el arco de flores' },
  { id: 'caballo', src: 'liz-caballo', caption: 'Mi caballo y yo' },
  { id: 'jardin', src: 'liz-jardin', caption: 'Mañana en el jardín' },
  { id: 'plaza', src: 'liz-plaza', caption: 'Paz y buena vibra' },
  { id: 'lima', src: 'liz-lima', caption: 'Paseo por Lima' },
  { id: 'cute', src: 'liz-cute', caption: 'Estilo único' },
  { id: 'paseo', src: 'liz-paseo', caption: 'De paseo' },
  { id: 'sombrero', src: 'liz-sombrero', caption: 'Entre amigos' },
  { id: 'rancho', src: 'liz-rancho', caption: 'Día de campo' },
  { id: 'hamaca', src: 'liz-hamaca', caption: 'Descanso merecido' },
  { id: 'amigas', src: 'liz-amigas', caption: 'Con las mías' },
  { id: 'smile', src: 'liz-smile', caption: 'Sonrisa radiante' },
  { id: 'patrias', src: 'liz-patrias', caption: 'Fiestas patrias' },
  { id: 'elegant', src: 'liz-elegant', caption: 'Elegancia natural' },
  { id: 'selfie', src: 'liz-selfie', caption: 'Sin filtros' },
] as const

// ── Marcas y colaboraciones ───────────────────────────────────
// Cada colaboración lleva la cuenta de la marca y el vídeo que Liz
// hizo para ella: el vídeo es la prueba, la cuenta es la cortesía.
//
// Para añadir una nueva, mete su ficha en el grupo que le toque. Si
// aún no hay vídeo, deja `video` fuera y la tarjeta se ve igual, solo
// que sin el botón de reproducir.

export type Colaborador = {
  /** Como se llama el negocio, no su usuario. */
  name: string
  /** Su cuenta de TikTok, con arroba. */
  handle: string
  url: string
  /** Que venden, en tres o cuatro palabras. */
  que: string
  /** El video que Liz publico con ellos. */
  video?: string
  logo?: string
}

export const partners: {
  id: string
  title: string
  blurb: string
  items: Colaborador[]
}[] = [
  {
    id: 'marcas',
    title: 'Marcas',
    blurb: 'Fabrican lo que venden y llegan a todo el Perú.',
    items: [
      {
        name: 'Coralí Clothing',
        handle: '@coraliclothing',
        url: 'https://www.tiktok.com/@coraliclothing',
        que: 'Ropa de fábrica, envíos a todo el Perú',
      },
      {
        name: 'Free Sport',
        handle: '@freelsport',
        url: 'https://www.tiktok.com/@freelsport',
        que: 'Ropa deportiva',
        video: 'https://www.tiktok.com/@lis_iv/video/7649859781179493652',
      },
      {
        name: 'Confecciones JN Stilo',
        handle: '@confecciones_jnstilo',
        url: 'https://www.tiktok.com/@confecciones_jnstilo',
        que: 'Ropa deportiva hecha a medida',
        video: 'https://www.tiktok.com/@lis_iv/video/7673611505241246996',
      },
      {
        name: 'Punto Original Huánuco',
        handle: '@huanuco_puntooriginal',
        url: 'https://www.tiktok.com/@huanuco_puntooriginal',
        que: 'Zapatillas para caminar',
        video: 'https://www.tiktok.com/@lis_iv/video/7674035301374790932',
      },
    ],
  },
  {
    id: 'emprendedores',
    title: 'Emprendedores',
    blurb: 'Negocios de Cajamarca y del Perú.',
    items: [
      {
        name: "Siray Tejidos",
        handle: '@siray.pee',
        url: 'https://www.tiktok.com/@siray.pee',
        que: 'Chompas tejidas a mano',
        video: 'https://www.tiktok.com/@lis_iv/video/7682143005985361172',
      },
      {
        name: 'Elikutiara Cacao',
        handle: '@elikutiaracacao',
        url: 'https://www.tiktok.com/@elikutiaracacao',
        que: 'Chocolate artesanal de cacao',
        video: 'https://www.tiktok.com/@lis_iv/video/7650588363006676244',
      },
      {
        name: "Linar's",
        handle: '@creaciones.linars_chota',
        url: 'https://www.tiktok.com/@creaciones.linars_chota',
        que: 'Vestidos y ropa, en Chota',
        video: 'https://www.tiktok.com/@lis_iv/video/7678490083594341653',
      },
      {
        name: 'Mayari',
        handle: '@mayari_chota',
        url: 'https://www.tiktok.com/@mayari_chota',
        que: 'Ropa de Shein y Temu, en Chota',
        video: 'https://www.tiktok.com/@lis_iv/video/7680344789367213333',
      },
      {
        name: 'Store Khalessi',
        handle: '@daaeimdustria',
        url: 'https://www.tiktok.com/@daaeimdustria',
        que: 'Zapatillas originales',
        video: 'https://www.tiktok.com/@lis_iv/video/7651347492767829269',
      },
      {
        name: 'Modas Yahil',
        handle: '@yahil457',
        url: 'https://www.tiktok.com/@yahil457',
        que: 'Tienda de ropa de invierno',
        video: 'https://www.tiktok.com/@lis_iv/video/7663195905725648148',
      },
      {
        name: 'La Casa del 10',
        handle: '@lacasadel10',
        url: 'https://www.tiktok.com/@lacasadel10',
        que: 'Artículos deportivos',
        video: 'https://www.tiktok.com/@lis_iv/video/7656593638075534613',
      },
      {
        name: 'Ivi Vega',
        handle: '@vianel60',
        url: 'https://www.tiktok.com/@vianel60',
        que: 'Zapatillas Punto Original',
        video: 'https://www.tiktok.com/@lis_iv/video/7678388058839862548',
      },
    ],
  },
  {
    id: 'empresas',
    title: 'Empresas',
    blurb: 'Eventos, presencia y activaciones.',
    items: [],
  },
  {
    id: 'creadores',
    title: 'Artistas y creadores',
    blurb: 'Música y colaboraciones con otros creadores.',
    items: [
      {
        name: 'Agrupación Los Fénix',
        handle: '@agrupacionlosfenix',
        url: 'https://www.tiktok.com/@agrupacionlosfenix',
        que: 'Cumbia en vivo',
      },
      {
        name: 'La Nueva Juventud',
        handle: '@bandalanuevajuventud',
        url: 'https://www.tiktok.com/@bandalanuevajuventud',
        que: 'Cumbia peruana',
        video: 'https://www.tiktok.com/@lis_iv/video/7675443705544740116',
      },
    ],
  },
]

export const partnersIntro = {
  heading: 'Marcas que han trabajado conmigo',
  sub: 'Cada una con el vídeo que hicimos juntos.',
  emptyLabel: 'Espacio libre',
  videoLabel: 'Vídeo',
  ctaTitle: '¿Quieres trabajar conmigo?',
  ctaBody: 'Escríbeme por Instagram y armamos algo juntos.',
  ctaLabel: 'Escribirme',
}

export const about = {
  heading: '¿Quién es Liz?',
  paragraphs: [
    'Soy Liz Vásquez, creadora de contenido apasionada por conectar con mi comunidad.',
    'Nací en la hermosa Cajamarca, Perú, y fui reconocida como Mejor Influencer Cajamarquina.',
    'Comparto mi día a día a través de lives diarios en TikTok, llenos de humor y conexión real.',
  ],
  pillars: [
    { id: 'lives', title: 'Lives diarios' },
    { id: 'content', title: 'Contenido original' },
    { id: 'humor', title: 'Humor y diversión' },
    { id: 'community', title: 'Comunidad unida' },
  ],
}

// ── Sección "Muy pronto" ──────────────────────────────────────
// Cuando los sorteos estén listos: pon `active: true` y añade `url`.
// El botón dorado pasa solo de "Muy pronto" a enlace real.
export const giveaway = {
  active: false,
  eyebrow: 'Muy pronto',
  heading: 'Sorteos y promociones',
  body: 'Estoy preparando sorteos exclusivos y promociones especiales solo para mi comunidad. Los anuncio primero en mis lives.',
  buttonSoon: 'Muy pronto',
  buttonActive: 'Participar ahora',
  url: '',
  // Mientras el sorteo no esta activo, la seccion no puede ser un
  // callejon sin salida: quien llega con ganas necesita donde ir.
  waitingLabel: 'Avísame en el live',
  waitingUrl: 'https://www.tiktok.com/@lis_iv',
  perks: [
    'Sorteos exclusivos para seguidores',
    'Promociones con marcas aliadas',
    'Anuncios primero en mis lives',
  ],
}
