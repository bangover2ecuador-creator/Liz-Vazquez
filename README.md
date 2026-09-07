# Landing de Liz Vásquez

Link-in-bio de [@lis_iv](https://www.tiktok.com/@lis_iv) — creadora de contenido de Cajamarca, Perú.

Sitio estático (Vite + React + TypeScript), pensado para que el 95 % del tráfico
llegue desde la bio de TikTok en un móvil con red lenta.

---

## Empezar

```bash
npm install
npm run dev
```

| Comando             | Qué hace                                                    |
| ------------------- | ----------------------------------------------------------- |
| `npm run dev`       | Servidor de desarrollo con recarga en caliente               |
| `npm run build`     | Compila a `dist/` (comprueba tipos antes)                    |
| `npm run preview`   | Sirve `dist/` tal como quedará en producción                 |
| `npm run typecheck` | Solo comprueba tipos                                         |
| `npm run images`    | Regenera los WebP responsive desde `assets-src/`             |

---

## Cambios habituales

Casi todo el contenido está en **[`src/data/site.ts`](src/data/site.ts)**.
No hace falta tocar componentes para el mantenimiento del día a día.

### Actualizar seguidores y cifras

```ts
export const stats = [
  { id: 'followers', value: 925.7, suffix: 'K', decimals: 1, label: 'Seguidores en TikTok' },
  ...
]
```

### Activar el botón dorado de sorteos

Hoy la sección "Sorteos y promociones" muestra un botón dorado en modo
**Muy pronto**: brilla, pero no lleva a ningún lado. Para activarlo:

```ts
export const giveaway = {
  active: true,                          // ← cambiar a true
  url: 'https://...',                    // ← enlace de las bases del sorteo
  ...
}
```

El botón pasa solo de "Muy pronto" a un enlace real. Nada más que tocar.

### El aviso de directo (automático)

**No hay que tocar nada.** Una función de Netlify comprueba TikTok cada
cinco minutos y enciende sola el aviso verde de arriba cuando Liz está
emitiendo, con el número de gente viendo y un botón que lleva a su live.

**Horario.** Solo comprueba en su franja: de **8:00 a 2:00 de la
madrugada, hora de Perú**. Fuera de ahí ni siquiera llama a TikTok.
Para cambiarla, en [`netlify/functions/revisar-live.mts`](netlify/functions/revisar-live.mts):

```ts
const HORA_INICIO = 8   // empieza
const HORA_FIN = 2      // termina (de la madrugada)
```

Si mueves mucho la franja, ajusta también el `schedule` del final del
archivo, que está en horario UTC (Perú es UTC−5).

**Cómo lo sabe.** Consulta el mismo endpoint que usa la web de TikTok,
que devuelve `status: 2` mientras se emite y `4` cuando terminó. No
necesita contraseña ni cuenta.

**Ver cómo queda sin esperar a un directo:** añade `?live=1` a la URL.

**Piezas:**

| Archivo | Qué hace |
| --- | --- |
| `netlify/functions/revisar-live.mts` | Comprueba TikTok cada 5 min y guarda el estado |
| `netlify/functions/estado-live.mts` | Sirve ese estado en `/api/live` |
| `src/useEnVivo.ts` | Lo consulta desde la landing cada 2 min |

Quien visita la página **no** toca TikTok: solo lee el dato ya guardado,
así que mil visitas no son mil peticiones.

**Si la comprobación fallara**, la landing usa `liveNow` de
[`src/data/site.ts`](src/data/site.ts) como respaldo manual. Déjalo en
`false`; solo ponlo en `true` si algún día hay que forzarlo a mano.

### Añadir o cambiar redes

Edita el array `socials`. El orden del array es el orden en pantalla, y
`featured: true` marca la cuenta principal — la que abre el botón de la barra
fija inferior.

### Añadir fotos

1. Deja el JPG original en `assets-src/` (cualquier resolución, cuanto mayor mejor).
2. Ejecuta `npm run images` — genera WebP de 320/480/640 px y un JPEG de respaldo.
3. Añádela al array `gallery` en `src/data/site.ts`, con su `caption`.

La galería **es la portada**: la primera foto del array es la que se ve al
abrir, dentro del marco redondo dorado, y las demás llegan deslizando en ese
mismo marco. No hay una sección de fotos aparte más abajo.

Solo las tres primeras se cargan de entrada; el resto espera al primer
deslizamiento. Por eso puedes añadir muchas sin penalizar la carga inicial.

### Añadir una marca o colaboración

En el array `partners` de [`src/data/site.ts`](src/data/site.ts), mete el
nombre en el grupo que toque:

```ts
{ id: 'marcas', title: 'Marcas', blurb: '...', items: [
  { name: 'Nombre de la marca', url: 'https://...' },
]},
```

La tarjeta aparece sola y va sustituyendo a los huecos de "Espacio libre".
La sección está pensada para verse bien vacía: los huecos con borde
discontinuo funcionan como invitación.

### Cambiar el orden de las secciones

En [`src/App.tsx`](src/App.tsx). Hoy es: portada (con el carrusel dentro) →
sorteos → cifras → sobre mí → marcas → cierre → redes → pie.

---

## Desplegar en Netlify

`netlify.toml` ya trae la configuración (build, cabeceras de caché, redirecciones).

1. Sube el repositorio a GitHub.
2. En Netlify: **Add new site → Import an existing project** y elige el repo.
3. Netlify lee `netlify.toml`; no hay que configurar nada a mano.

### Después del primer despliegue

Cambia el dominio en **`index.html`** — aparece en `canonical`, `og:url`,
`og:image`, `twitter:image` y en el bloque JSON-LD:

```
https://soylizvasquez.netlify.app/   →   tu dominio real
```

Es importante: `og:image` tiene que ser una **URL absoluta** o WhatsApp y
Facebook no mostrarán la vista previa con la foto.

Después, para actualizar la vista previa en las plataformas:

- Facebook / WhatsApp: <https://developers.facebook.com/tools/debug/>
- Actualiza también el enlace de la bio de TikTok al dominio nuevo.

---

## Notas de rendimiento

Primera carga en móvil: **~150 KB en 10 peticiones**, con 16 fotos en la galería.

- Fotos en WebP con `srcset` (la del retrato usa un único candidato para que
  el `preload` del `<head>` y el `<img>` nunca resuelvan a archivos distintos).
- Las fotos del carrusel se montan solo cuando la galería se acerca a pantalla:
  sin eso el navegador se adelanta y descarga media galería en la carga inicial.
- Tipografías autoalojadas, solo subset `latin` y solo los pesos que se usan.
- Sin librería de animación: todo es CSS + `IntersectionObserver`.
- Los originales pesados viven en `assets-src/` y **no** se publican.

Si vuelves a tocar imágenes o fuentes, comprueba que no se cuelen descargas
duplicadas:

```bash
npm run build && npm run preview
```

y mira la pestaña Red del navegador: debe haber **una sola versión por foto**.

---

## Accesibilidad

- Contraste verificado sobre el fondo oscuro; nada de texto negro sobre negro.
- Áreas táctiles de 44 px o más en todos los enlaces y botones.
- `prefers-reduced-motion` desactiva grano, giros y transiciones.
- El botón de sorteos inactivo se anuncia con `aria-disabled`.
- El carrusel se maneja con flechas izquierda/derecha del teclado y anuncia la
  posición con `aria-live`.
- Todo lo tocable se hunde al presionar: sin esa respuesta, el dedo tapa el
  elemento y no hay confirmación de que el toque entró.
- `lang="es"` y enlace de salto al contenido.
