import { useEffect, useState } from 'react'
import { useLanguage } from '../language'

import { BrandImage } from './BrandImage'

export function ArchiveHeader() {
  const { t } = useLanguage()
  const [compact, setCompact] = useState(false)
  const [section, setSection] = useState('')
  useEffect(() => {
    let previous = window.scrollY
    function update() {
      const y = window.scrollY
      if (Math.abs(y - previous) >= 4 || y < 24) {
        setCompact(y > 80 && y > previous)
        previous = y
      }
      const atAbout = y > 0 && window.innerHeight + y >= document.documentElement.scrollHeight - 4
      const atIndex = (document.getElementById('index')?.getBoundingClientRect().top ?? Infinity) < 155
      setSection(atAbout ? 'about' : atIndex ? 'index' : '')
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return (
    <header className="site-header" data-compact={compact}>
      <div className="wrap header-inner">
        <a className="wordmark" href={import.meta.env.BASE_URL}><BrandImage variant="clean" /></a>
        <nav aria-label={t('Main navigation')}>
          <a href="#index" aria-current={section === 'index' ? 'location' : undefined}>{t('Study index')}</a>
          <a href="#about" aria-current={section === 'about' ? 'location' : undefined}>{t('About')}</a>
        </nav>
      </div>
    </header>
  )
}
