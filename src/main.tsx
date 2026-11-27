import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { About } from './components/About'
import { ArchiveHeader } from './components/ArchiveHeader'
import { BrandImage } from './components/BrandImage'
import { Hero } from './components/Hero'
import { CategoryGuide } from './components/CategoryGuide'
import { colorGroups } from './studies/colorCatalog'
import { bilingualGroup, massContent } from './studies/massCatalog'
import { StudyCard } from './components/StudyCard'
import { specimenVisualKey } from './components/Specimen'
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
import './styles/typography.css'
import './styles/study-index.css'
import './styles/atlas-specimens.css'

const filters = ['All', ...categories] as const
const filterLabels = ['All', 'Color', 'Typography', 'Layout', 'Perception', 'UI', 'UX', 'Material & Texture', 'Motion', 'Brand']
const pageSize = 12
const categoryCounts = new Map(categories.map((category) => [category, studies.filter((study) => study.category === category).length]))

function groupTitle(group: string) {
  return colorGroups.find((item) => item.id === group)?.title ?? bilingualGroup(group)
}

const searchIndex = new Map(studies.map((study) => {
  const localized = [localizeStudy(study, 'en'), localizeStudy(study, 'ko')]
  const source = massContent.get(study.id)
  const titles = [...localized.map((item) => item.title), source?.title.en, source?.title.ko].join(' ').toLowerCase()
  const group = study.group ? groupTitle(study.group) : undefined
  const keywords = [titles, study.category, group?.en, group?.ko, ...(study.keywords ?? []),
    ...localized.flatMap((item) => [item.definition, ...item.examples.map((example) => example.label)])].join(' ').toLowerCase()
  return [study.id, { titles, keywords }] as const
}))

function App() {
  const { language, t, count, empty } = useLanguage()
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [group, setGroup] = useState('all')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selection, setSelection] = useState<{ study: Study; initial?: number } | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const categoryNav = useRef<HTMLElement>(null)
  const searchField = useRef<HTMLInputElement>(null)
  const resultHeading = useRef<HTMLHeadingElement>(null)
  const studyTools = useRef<HTMLDivElement>(null)
  const indexSection = useRef<HTMLElement>(null)
  const [showBack, setShowBack] = useState(false)
  const divider = useReveal<HTMLDivElement>()
  const footer = useReveal<HTMLDivElement>()
  const categoryStudies = category === 'All' ? studies : studies.filter((study) => study.category === category)
  const groups = new Map<string, number>()
  if (category !== 'All') {
    for (const study of categoryStudies) {
      if (study.group) groups.set(study.group, (groups.get(study.group) ?? 0) + 1)
    }
  }
  const scoped = group === 'all' ? categoryStudies : categoryStudies.filter((study) => study.group === group)
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const results = terms.length ? scoped.flatMap((study) => {
    const entry = searchIndex.get(study.id)!
    return terms.every((term) => entry.keywords.includes(term))
      ? [{ study, score: terms.filter((term) => entry.titles.includes(term)).length }]
      : []
  }).sort((a, b) => b.score - a.score).map(({ study }) => study) : scoped
  const pageCount = Math.ceil(results.length / pageSize)
  const first = (page - 1) * pageSize
  const visible = results.slice(first, first + pageSize)
  const resultTitle = group === 'all' ? t(filterLabels[filters.indexOf(category)]) : groupTitle(group)[language]
  const seenVisuals = new Set<string>()
  const cards = visible.map((study) => {
    const localized = localizeStudy(study, language)
    const visualIndexes = new Set<number>()
    localized.examples.forEach((example, index) => {
      const key = specimenVisualKey(example)
      if (!seenVisuals.has(key)) visualIndexes.add(index)
      seenVisuals.add(key)
    })
    return { study, localized, visualIndexes }
  })

  function search(value: string) {
    setQuery(value)
    setPage(1)
  }

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      const target = event.target
      if (event.key !== '/' || event.altKey || event.ctrlKey || event.metaKey || event.isComposing ||
        !matchMedia('(pointer: fine)').matches || document.querySelector('dialog[open]') ||
        (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select')))) return
      event.preventDefault()
      searchField.current?.focus()
    }
    function onScroll() {
      const bounds = indexSection.current?.getBoundingClientRect()
      setShowBack(Boolean(bounds && bounds.top < -360 && bounds.bottom > 140))
    }
    document.addEventListener('keydown', shortcut)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      document.removeEventListener('keydown', shortcut)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function jumpToResults() {
    requestAnimationFrame(() => {
      resultHeading.current?.scrollIntoView({ block: 'start' })
      resultHeading.current?.focus({ preventScroll: true })
    })
  }

  function selectGroup(next: string) {
    setGroup(next)
    setPage(1)
    jumpToResults()
  }

  function selectPage(next: number) {
    setPage(next)
    requestAnimationFrame(() => studyTools.current?.scrollIntoView({ block: 'start' }))
  }

  function selectCategory(next: Category | 'All') {
    setCategory(next)
    setGroup('all')
    setPage(1)
    if ((studyTools.current?.getBoundingClientRect().top ?? 0) < 135) jumpToResults()
  }

  const pager = pageCount > 1 && <nav className="study-pages" aria-label={t('Study pages')}>
    <button type="button" aria-label={t('Previous page')} disabled={page === 1} onClick={() => selectPage(page - 1)}>‹</button>
    <span className="study-page-count">{page} / {pageCount}</span>
    <button type="button" aria-label={t('Next page')} disabled={page === pageCount} onClick={() => selectPage(page + 1)}>›</button>
  </nav>

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
        <section ref={indexSection} className="wrap" id="index" aria-labelledby="index-title">
          <div className="index-heading section-rule" ref={divider}>
            <span className="section-number" aria-hidden="true">01</span>
            <h2 id="index-title">{t('Study index')}</h2>
            <span className="eyebrow study-count" role="status">{count(results.length)}</span>
          </div>
          <div className="study-navigation">
            <nav ref={categoryNav} className="category-nav" aria-label={t('Study categories')}>
              {filters.map((item, index) => (
                <button key={item} aria-pressed={category === item} onClick={() => selectCategory(item)}>
                  {t(filterLabels[index])} <small>{item === 'All' ? studies.length : categoryCounts.get(item)}</small>
                </button>
              ))}
            </nav>
            {groups.size > 0 && <nav className="study-group-nav" aria-label={t('Study groups')}>
              {[['all', categoryStudies.length] as const, ...groups].map(([id, total]) => (
                <a key={id} href="#study-results" aria-current={group === id ? 'location' : undefined}
                  onClick={(event) => { event.preventDefault(); selectGroup(id) }}>
                  {id === 'all' ? t('All') : groupTitle(id)[language]} <small>{total}</small>
                </a>
              ))}
            </nav>}
          </div>
          {category !== 'All' && <CategoryGuide key={category} category={category} title={t(filterLabels[filters.indexOf(category)])} total={categoryStudies.length} />}
          <div className="study-tools" ref={studyTools}>
            <div className="study-search">
              <input ref={searchField} type="search" aria-label={t('Search studies')} placeholder={t('Search studies')} value={query} onChange={(event) => search(event.target.value)} />
              {query && <button type="button" aria-label={t('Clear search')} onClick={() => search('')}>×</button>}
            </div>
            {pager}
          </div>
          <h3 id="study-results" ref={resultHeading} tabIndex={-1} className={`study-results-heading${category !== 'All' && group === 'all' ? ' visually-hidden' : ''}`}>{resultTitle}</h3>
          {visible.length > 0 ? (
            <div key={`${category}-${group}-${page}`} className="study-grid study-grid--paged">
              {cards.map(({ study, localized, visualIndexes }, index) => <StudyCard key={study.id} study={localized} index={index} visualIndexes={visualIndexes} onSelect={(initial) => openStudy(study, initial)} />)}
            </div>
          ) : <p className="empty-state">{terms.length ? t('No studies match your search.') : empty(category)}</p>}
          {pager && <div className="study-pagination-bottom">{pager}</div>}
          {showBack && <a className="study-back" href="#index">{t('Back to categories')} ↑</a>}
        </section>
        <About />
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner section-rule" ref={footer}>
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
