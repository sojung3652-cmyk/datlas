import { useLanguage } from '../language'
import { categoryGuides } from '../studies/categoryGuides'
import type { Category } from '../studies'

export function CategoryGuide({ category, title, total }: { category: Category; title: string; total: number }) {
  const { language, t, count } = useLanguage()
  const guide = categoryGuides[category]
  const introduction = category === 'Color' ? 'Color is structure, hierarchy, atmosphere, and meaning.'
    : category === 'Typography' ? 'Typography gives language a visual voice.' : null
  return (
    <header className="study-category-intro">
      <div className="study-category-title">
        <h3>{title}</h3>
        <p className="eyebrow">{count(total)}</p>
      </div>
      {introduction && <p className="study-category-tagline">{t(introduction)}</p>}
    <details className="category-guide">
      <summary>
        <span className="eyebrow">{t('Introduction')}</span>
        <strong>{guide.title[language]}</strong>
      </summary>
      <div className="category-guide-copy">
        {guide.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph[language]}</p>)}
      </div>
    </details>
    </header>
  )
}
