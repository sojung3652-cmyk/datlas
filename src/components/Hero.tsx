import { useEffect, useRef } from 'react'
import { mountHeroMotion } from '../hero-motion.js'
import { mountHeroOrbit } from '../hero-orbit.js'
import { useLanguage } from '../language'
import '../styles/brand.css'

export function Hero() {
  const { t } = useLanguage()
  const artwork = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = artwork.current
    if (!root) return
    const motion = mountHeroMotion(root)
    return () => motion.destroy()
  }, [])

  useEffect(() => {
    const root = copy.current
    if (!root) return
    const orbit = mountHeroOrbit(root)
    return () => orbit.destroy()
  }, [])

  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title" lang="en">Design Atlas</h1>
      <div className="hero-stage">
        <div className="hero-artwork" ref={artwork} lang="en" />
      </div>
      <div className="hero-copy" ref={copy}>
        <p className="hero-description">{t('A visual reference for the fundamentals of design. Explore color, typography, composition, interaction, and the way we see.')}</p>
        <a className="hero-link eyebrow" href="#index">{t('Explore the index')} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
