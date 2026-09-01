// Iconos de marca y de interfaz, como SVG inline (sin peso de red).

type P = { className?: string }

export const TikTokIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06v-3.13a5.66 5.66 0 0 0-.77-.05A5.66 5.66 0 1 0 15.52 15V8.99a7.35 7.35 0 0 0 4.3 1.38V7.28a4.29 4.29 0 0 1-3.22-1.46Z" />
  </svg>
)

export const InstagramIcon = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
  </svg>
)

export const FacebookIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
  </svg>
)

export const YouTubeIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.5 2.5 0 0 0 2.42 7.2 26.1 26.1 0 0 0 2 12a26.1 26.1 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77A26.1 26.1 0 0 0 22 12a26.1 26.1 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
  </svg>
)

export const ArrowIcon = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
)

export const CheckIcon = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12.5 9.5 18 20 6.5" />
  </svg>
)

export const CrownIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 8.2a1.2 1.2 0 1 1 1.94.94l1.9 3.06L10.8 6.9a1.35 1.35 0 1 1 2.4 0l3.96 5.3 1.9-3.06A1.2 1.2 0 1 1 21 8.2a1.2 1.2 0 0 1-.72 1.1l-1.4 7.2a1 1 0 0 1-.98.8H6.1a1 1 0 0 1-.98-.8l-1.4-7.2A1.2 1.2 0 0 1 3 8.2Zm3.3 10.9h11.4a.9.9 0 0 1 0 1.8H6.3a.9.9 0 0 1 0-1.8Z" />
  </svg>
)

export const GiftIcon = ({ className }: P) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 12v8.2a.8.8 0 0 1-.8.8H4.8a.8.8 0 0 1-.8-.8V12" />
    <rect x="2.5" y="7.5" width="19" height="4.5" rx="1" />
    <path d="M12 7.5V21" />
    <path d="M12 7.5S10.6 3 8.2 3a2.3 2.3 0 0 0 0 4.6h3.8Z" />
    <path d="M12 7.5S13.4 3 15.8 3a2.3 2.3 0 0 1 0 4.6H12Z" />
  </svg>
)

export const SparkIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5c.3 3.9 1.6 6.4 3.6 7.7 1.1.7 2.4 1.2 3.9 1.4-3.9.3-6.4 1.6-7.7 3.6-.7 1.1-1.2 2.4-1.4 3.9-.3-3.9-1.6-6.4-3.6-7.7-1.1-.7-2.4-1.2-3.9-1.4 3.9-.3 6.4-1.6 7.7-3.6.7-1.1 1.2-2.4 1.4-3.9Z" />
    <path d="M19 15.5c.15 1.7.75 2.85 1.7 3.45.5.35 1.15.55 1.8.65-1.8.15-2.95.75-3.5 1.7-.35.5-.55 1.15-.65 1.8-.15-1.8-.75-2.95-1.7-3.5-.5-.35-1.15-.55-1.8-.65 1.8-.15 2.95-.75 3.5-1.7.35-.5.55-1.15.65-1.75Z" />
  </svg>
)
