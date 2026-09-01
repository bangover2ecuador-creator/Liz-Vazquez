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
    note: 'Cuenta principal',
    featured: true,
  },
  {
    id: 'tiktok-live',
    platform: 'TikTok Live',
    handle: '@lizvasquezlive',
    url: 'https://www.tiktok.com/@lizvasquezlive',
    accent: '#FE2C55',
    note: 'Lives diarios',
  },
  {
    id: 'tiktok-2',
    platform: 'TikTok',
    handle: '@lizvasquez2.0',
    url: 'https://www.tiktok.com/@lizvasquez2.0',
    accent: '#25F4EE',
    note: 'Segunda cuenta',
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

// Cifras mostradas en la tira de estadísticas.
// `value` es el número que anima; `suffix` el texto fijo que lo acompaña.
export const stats = [
  { id: 'followers', value: 925.7, suffix: 'K', decimals: 1, label: 'Seguidores en TikTok' },
  { id: 'likes', value: 20.9, suffix: 'M', decimals: 1, label: 'Me gusta acumulados' },
  { id: 'posts', value: 294, suffix: '', decimals: 0, label: 'Publicaciones' },
  { id: 'platforms', value: 4, suffix: '', decimals: 0, label: 'Plataformas activas' },
]

export const gallery = [
  // Carrusel horizontal. El orden es el de aparicion: las mas
  // llamativas primero, porque casi nadie desliza hasta el final.
  { id: 'gala', src: 'liz-gala', caption: 'Noche de gala' },
  { id: 'corazon', src: 'liz-corazon', caption: 'Todo a su tiempo' },
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

export const highlights = [
  { id: 'award', title: 'Mejor Influencer', detail: 'Premio Cajamarca' },
  { id: 'likes', title: '20M+ Me gusta', detail: 'En TikTok' },
  { id: 'sanjuan', title: 'Fiesta San Juan', detail: 'Chota 2025' },
  { id: 'lives', title: 'Lives diarios', detail: 'Conexión real' },
  { id: 'community', title: '925K+ Familia', detail: 'Mi comunidad' },
  { id: 'vip', title: 'Contenido exclusivo', detail: 'Solo para ti' },
]

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
  body: 'Estoy preparando sorteos exclusivos y promociones especiales solo para mi comunidad. Sigue mis lives para no quedarte fuera cuando se active.',
  buttonSoon: 'Muy pronto',
  buttonActive: 'Participar ahora',
  url: '',
  perks: [
    'Sorteos exclusivos para seguidores',
    'Promociones con marcas aliadas',
    'Anuncios primero en mis lives',
  ],
}
