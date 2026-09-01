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

### Añadir o cambiar redes

Edita el array `socials`. El orden del array es el orden en pantalla, y
`featured: true` marca la cuenta principal (también es la que usan los botones
"Seguirme en TikTok" y la barra fija inferior).

### Añadir fotos

1. Deja el JPG original en `assets-src/` (cualquier resolución, cuanto mayor mejor).
2. Ejecuta `npm run images` — genera WebP de 320/480/640/960 px y un JPEG de respaldo.
3. Añádela al array `gallery` en `src/data/site.ts`.

La retícula es de dos columnas: `ratio: 'wide'` ocupa las dos, `'tall'` una.
Para que no queden huecos, mantén el ritmo **una ancha + un par**
(wide, tall, tall, wide, tall, tall…).

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

Primera carga en móvil: **~149 KB en 8 peticiones**.

- Fotos en WebP con `srcset` (la del retrato usa un único candidato para que
  el `preload` del `<head>` y el `<img>` nunca resuelvan a archivos distintos).
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
- `lang="es"` y enlace de salto al contenido.
