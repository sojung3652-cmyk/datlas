import type { CSSProperties } from 'react'
import type { Study } from '../studies'
import { useLanguage } from '../language'
import { useReveal } from '../motion'
import { Specimen } from './Specimen'

export function StudyCard({ study, index, onSelect }: { study: Study; index: number; onSelect: (example?: number) => void }) {
  const { studyIndex } = useLanguage()
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} className={`study-card study-card--${study.id}${study.group ? ' study-card--color' : ''}`} style={{ '--stagger': `${index % 3 * 55}ms` } as CSSProperties} aria-labelledby={`study-${study.id}`}>
      <div className="study-meta"><span>{studyIndex(study.category, study.index ?? study.id)}</span><span aria-hidden="true">↗</span></div>
      <h3 id={`study-${study.id}`}><button className="study-open" onClick={() => onSelect()} aria-haspopup="dialog"><span>{study.title}</span></button></h3>
      <p className="definition">{study.definition}</p>
      <p className="principle">{study.principle}</p>
      <div className="examples">
        {study.examples.map((example, exampleIndex) => (
          <button key={exampleIndex} className="example" onClick={() => onSelect(exampleIndex)}
            aria-haspopup="dialog" aria-label={`${study.title}, ${example.label}`}>
            <Specimen example={example} />
            <span className="example-label"><small aria-hidden="true">0{exampleIndex + 1}</small>{example.label}</span>
          </button>
        ))}
      </div>
    </article>
  )
}
