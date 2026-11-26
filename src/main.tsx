import { StrictMode, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArchiveHeader } from './components/ArchiveHeader'
import { BrandImage } from './components/BrandImage'
import { Hero } from './components/Hero'
import { ColorIndex } from './components/ColorIndex'
import { colorCatalog, type ColorGroup } from './studies/colorCatalog'
import { StudyCard } from './components/StudyCard'
import { StudyDetail } from './components/StudyDetail'
import { reducedMotion, useReveal } from './motion'
import { LanguageContext, initialLanguage, languageKey, localizeStudy, useLanguage, type Language } from './language'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { categories, studies, type Category, type Study } from './studies'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource-variable/inter'
import './styles/tokens.css'
import './styles/global.css'
import './styles/specimens.css'
import './styles/color.css'

const filters = ['All', ...categories] as const
const filterLabels = ['All', 'Color', 'Type', 'Layout', 'Perception', 'UI', 'UX', 'Material', 'Motion', 'Brand']

function App() {
  const { language, t, count, empty } = useLanguage()
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [group, setGroup] = useState<ColorGroup | 'all'>('all')
  const [selection, setSelection] = useState<{ study: Study; initial?: number } | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const categoryNav = useRef<HTMLElement>(null)
  const divider = useReveal<HTMLDivElement>()
  const footer = useReveal<HTMLDivElement>()
  const visible = category === 'All' ? studies : studies.filter((study) => study.category === category && (category !== 'Color' || group === 'all' || study.group === group))

  useLayoutEffect(() => {
    const nav = categoryNav.current
    const button = nav?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
    if (!nav || !button) return
    function align() {
      if (!nav || !button) return
      nav.style.setProperty('--indicator-x', `${button.offsetLeft}px`)
      nav.style.setProperty('--indicator-width', `${button.offsetWidth}px`)
    }
    align()
    const observer = new ResizeObserver(align)
    observer.observe(nav)
    observer.observe(button)
    return () => observer.disconnect()
  }, [category, language])

  function openStudy(study: Study, initial?: number) {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setSelection({ study, initial })
  }

  function closeStudy() {
    setSelection(null)
    requestAnimationFrame(() => returnFocus.current?.focus({ preventScroll: true }))
  }

  return (
    <>
      <ArchiveHeader />
      <main>
        <Hero />
        <section className="wrap" id="index" aria-labelledby="index-title">
          <div className="index-heading section-rule" ref={divider}>
            <span className="section-number" aria-hidden="true">01</span>
            <h2 id="index-title">{t('Study index')}</h2>
            <span className="eyebrow study-count" role="status">{count(visible.length)}</span>
          </div>
          <nav ref={categoryNav} className="category-nav" aria-label={t('Study categories')}>
            {filters.map((item, index) => (
              <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{t(filterLabels[index])}</button>
            ))}
          </nav>
          {category === 'Color' && <ColorIndex group={group} onSelect={setGroup} total={colorCatalog.length} />}
          {visible.length > 0 ? (
            <div key={`${category}-${category === 'Color' ? group : ''}`} className={`study-grid ${category === 'All' ? 'study-grid--all' : ''}`}>
              {visible.map((study, index) => <StudyCard key={study.id} study={localizeStudy(study, language)} index={index} onSelect={(initial) => openStudy(study, initial)} />)}
            </div>
          ) : <p className="empty-state">{empty(category)}</p>}
        </section>
      </main>
      <footer className="site-footer" id="about">
        <div className="wrap footer-inner section-rule" ref={footer}>
          <span className="section-number" aria-hidden="true">02</span>
          <a href="#top" className="wordmark"><BrandImage variant="clean" /></a>
          <p>{t('A visual study archive. First edition.')}</p>
          <a href="#top">{t('Back to top')} <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
      {selection ? <StudyDetail key={selection.study.id} {...selection} study={localizeStudy(selection.study, language)} onClose={closeStudy} onRelated={(id) => {
        const study = studies.find((item) => item.id === id)
        if (study) setSelection({ study })
      }} /> : <LanguageSwitcher />}
    </>
  )
}

function LocalizedApp() {
  const [language, updateLanguage] = useState(initialLanguage)
  const scrollPosition = useRef<{ page: number; detail: number | undefined } | null>(null)

  function setLanguage(next: Language) {
    if (next === language) return
    scrollPosition.current = { page: window.scrollY, detail: document.querySelector('.detail-inner')?.scrollTop }
    updateLanguage(next)
  }

  useLayoutEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'ko' ? '디자인 아틀라스 — 시각 디자인 레퍼런스' : 'Design Atlas — A visual reference for design'
    try { localStorage.setItem(languageKey, language) } catch { /* Keep the current session usable. */ }
    if (scrollPosition.current === null) return
    window.scrollTo({ top: scrollPosition.current.page, behavior: 'instant' })
    if (scrollPosition.current.detail !== undefined) {
      document.querySelector('.detail-inner')?.scrollTo({ top: scrollPosition.current.detail, behavior: 'instant' })
    }
    scrollPosition.current = null
    if (matchMedia(reducedMotion).matches) return
    const targets = document.querySelectorAll('main, .site-footer, .header-inner, .detail-inner')
    const animations = Array.from(targets, (target) => target.animate(
      [{ opacity: .55 }, { opacity: 1 }], { duration: 260, easing: 'cubic-bezier(.22, 1, .36, 1)' },
    ))
    return () => animations.forEach((animation) => animation.cancel())
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage }}><App /></LanguageContext.Provider>
}

createRoot(document.getElementById('root')!).render(<StrictMode><LocalizedApp /></StrictMode>)
