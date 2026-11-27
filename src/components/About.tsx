import { useEffect, useRef } from 'react'
import { mountAboutMotion } from '../about-motion.js'
import point from '../design_atlas_typography_manual/point-manual-construction.svg?inline'
import line from '../design_atlas_typography_manual/line-manual-construction.svg?inline'
import plane from '../design_atlas_typography_manual/plane-manual-construction.svg?inline'
import volume from '../design_atlas_typography_manual/volume-manual-construction.svg?inline'
import world from '../design_atlas_typography_manual/world-manual-construction.svg?inline'
import { useLanguage } from '../language'
import './About.css'

const stages = [
  { name: 'POINT', image: point, topics: { en: 'Color · Shape · Type', ko: '색채 · 형태 · 타이포그래피' }, description: { en: 'The smallest units that make up a design.', ko: '디자인을 구성하는 최소 단위.' } },
  { name: 'LINE', image: line, topics: { en: 'Spacing · Alignment · Grid · Rhythm · Motion', ko: '간격 · 정렬 · 그리드 · 리듬 · 모션' }, description: { en: 'The relationships and flow between elements.', ko: '요소 사이의 관계와 흐름.' } },
  { name: 'PLANE', image: plane, topics: { en: 'Layout · Composition · Hierarchy · Gestalt', ko: '레이아웃 · 구성 · 위계 · 게슈탈트' }, description: { en: 'How elements form a structure on the screen.', ko: '요소가 화면 위에서 구조를 만드는 단계.' } },
  { name: 'VOLUME', image: volume, topics: { en: 'Material · Light · Depth · UI · Interaction', ko: '재질 · 빛 · 깊이 · UI · 인터랙션' }, description: { en: 'Giving a flat surface depth and responsiveness.', ko: '평면에 깊이와 반응을 부여하는 단계.' } },
  { name: 'WORLD', image: world, topics: { en: 'UX · Brand · Design System · Accessibility', ko: 'UX · 브랜드 · 디자인 시스템 · 접근성' }, description: { en: 'Connecting individual elements into an experience and a system.', ko: '개별 요소들이 하나의 경험과 시스템으로 연결되는 단계.' } },
] as const

const geometry = {
  POINT: <circle cx="16" cy="16" r="2.2" fill="currentColor" />,
  LINE: <path d="M7 16h18" />,
  PLANE: <path d="M16 6l11 10-11 10L5 16z" />,
  VOLUME: <path d="M16 4l10 6v12l-10 6-10-6V10z M6 10l10 6 10-6 M16 16v12" />,
  WORLD: <><circle cx="16" cy="16" r="11" /><ellipse cx="16" cy="16" rx="5" ry="11" /><path d="M5 16h22" /></>,
}

export function About() {
  const { language, t } = useLanguage()
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!section.current) return
    const headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height
    const motion = mountAboutMotion(section.current, { stickyTop: headerHeight })
    return () => motion.destroy()
  }, [])
  return (
    <section ref={section} className="wrap about" id="about" aria-labelledby="about-title">
      <header className="about-heading">
        <span className="eyebrow">{t('About')}</span>
        <h2 id="about-title" lang="en">POINT <span aria-hidden="true">→</span><span className="about-heading-connector"> to </span> WORLD</h2>
      </header>
      <ol className="about-stages">
        {stages.map((stage) => (
          <li className="about-stage" key={stage.name}>
            <span className="about-geometry" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
                {geometry[stage.name]}
              </svg>
            </span>
            <div className="about-stage-copy">
              <h3 className="about-artwork" lang="en">
                <img src={stage.image} alt={stage.name} width="500" height="250" loading="lazy" />
              </h3>
              <p className="about-topics">{stage.topics[language]}</p>
              <p className="about-description">{stage.description[language]}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
