import { useEffect, useRef, useState } from 'react'
import { mountHeroMotion } from '../hero-motion.js'
import { mountHeroOrbit } from '../hero-orbit.js'
import { useLanguage } from '../language'
import { reducedMotion } from '../motion'
import '../styles/brand.css'

export function Hero() {
  const { t } = useLanguage()
  const artwork = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<'pending' | 'video' | 'fallback'>('pending')

  useEffect(() => {
    const root = artwork.current
    const media = video.current
    if (!root || !media) return
    const preference = matchMedia(reducedMotion)
    let fallback: ReturnType<typeof mountHeroMotion> | undefined
    let timeout: number | undefined
    let started = false
    let disposed = false
    let attempt = 0

    function announce(playing: boolean) {
      const state = window as Window & { __daHeroPlaying?: boolean }
      state.__daHeroPlaying = playing
      window.dispatchEvent(new CustomEvent(playing ? 'da:hero-play' : 'da:hero-end'))
    }

    function showFallback() {
      if (disposed || started || fallback) return
      window.clearTimeout(timeout)
      setMode('fallback')
      fallback = mountHeroMotion(root!)
    }

    function onPlaying() {
      if (preference.matches) { media!.pause(); return }
      window.clearTimeout(timeout)
      started = true
      fallback?.destroy()
      fallback = undefined
      announce(true)
      setMode('video')
    }

    function onStopped() {
      if (started) announce(false)
    }

    function onError() {
      started = false
      showFallback()
    }

    function initialize() {
      const currentAttempt = ++attempt
      window.clearTimeout(timeout)
      started = false
      fallback?.destroy()
      fallback = undefined
      if (preference.matches) {
        media!.pause()
        showFallback()
        return
      }
      setMode('pending')
      announce(true)
      if (media!.error) { showFallback(); return }
      timeout = window.setTimeout(showFallback, 4000)
      try {
        void media!.play().catch(() => { if (currentAttempt === attempt) showFallback() })
      } catch {
        showFallback()
      }
    }

    media.addEventListener('playing', onPlaying)
    media.addEventListener('ended', onStopped)
    media.addEventListener('pause', onStopped)
    media.addEventListener('error', onError)
    preference.addEventListener('change', initialize)
    initialize()
    return () => {
      disposed = true
      window.clearTimeout(timeout)
      media.removeEventListener('playing', onPlaying)
      media.removeEventListener('ended', onStopped)
      media.removeEventListener('pause', onStopped)
      media.removeEventListener('error', onError)
      preference.removeEventListener('change', initialize)
      media.pause()
      fallback?.destroy()
      announce(false)
    }
  }, [])

  useEffect(() => {
    const root = copy.current
    if (!root) return
    const orbit = mountHeroOrbit(root, { hideWhileHeroPlays: 'all' })
    return () => orbit.destroy()
  }, [])

  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-title" lang="en">Design Atlas</h1>
      <div className="hero-stage hero-stage--media" data-mode={mode}>
        <video ref={video} className="hero-video" src={`${import.meta.env.BASE_URL}design-atlas-hero-light-web.mp4`} muted playsInline preload="metadata" aria-hidden="true" />
        <div className="hero-artwork" ref={artwork} lang="en" />
      </div>
      <div className="hero-copy" ref={copy}>
        <p className="hero-description">{t('A visual reference for the fundamentals of design. Explore color, typography, composition, interaction, and the way we see.')}</p>
        <a className="hero-link eyebrow" href="#index">{t('Explore the index')} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
