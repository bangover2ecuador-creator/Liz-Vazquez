import type { ReactNode } from 'react'
import { socials, type Social } from '../data/site'
import { Reveal } from './Primitives'
import { ArrowIcon, FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from './Icons'

const iconFor: Record<string, ReactNode> = {
  tiktok: <TikTokIcon />,
  'tiktok-live': <TikTokIcon />,
  'tiktok-2': <TikTokIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  youtube: <YouTubeIcon />,
}

function SocialCard({ item }: { item: Social }) {
  return (
    <a
      className={`social${item.featured ? ' social--featured' : ''}`}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--accent': item.accent } as React.CSSProperties}
    >
      <span className="social__icon" aria-hidden="true">
        {iconFor[item.id]}
      </span>

      <span className="social__text">
        <span className="social__platform">
          {item.platform}
          {item.note && <span className="social__note">{item.note}</span>}
        </span>
        <span className="social__handle">{item.handle}</span>
      </span>

      <span className="social__arrow" aria-hidden="true">
        <ArrowIcon />
      </span>
    </a>
  )
}

export function Socials() {
  return (
    <section className="section section--tight shell" id="redes">
      <Reveal className="section-head section-head--center">
        <span className="eyebrow">Conéctate conmigo</span>
        <h2 className="section-title">
          Todas mis <em>redes</em>
        </h2>
        <p className="section-sub">Un toque y estás dentro. Te espero en los lives.</p>
      </Reveal>

      <div className="socials">
        {socials.map((item, i) => (
          <Reveal key={item.id} delay={i * 70}>
            <SocialCard item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
