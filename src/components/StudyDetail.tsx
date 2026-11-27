import { useLayoutEffect, useRef, useState } from 'react'
import { studies, type Study } from '../studies'
import { basicConcepts } from '../studies/basicConcepts'
import { transition } from '../motion'
import { Specimen, specimenVisualKey } from './Specimen'
import { LanguageSwitcher } from './LanguageSwitcher'
import { getStudyContent, localizeStudy, studyGuidance, useLanguage } from '../language'

export function StudyDetail({ study, initial, onClose, onRelated }: { study: Study; initial?: number; onClose: () => void; onRelated: (id: string) => void }) {
  const { language, t, studyIndex } = useLanguage()
  const dialog = useRef<HTMLDialogElement>(null)
  const closing = useRef(false)
  const [selected, setSelected] = useState(initial ?? 0)
  const example = study.examples[selected]
  const distinctVisuals = new Map<string, number[]>()
  study.examples.forEach((item, index) => {
    const key = specimenVisualKey(item)
    const matches = distinctVisuals.get(key)
    if (matches) matches.push(index)
    else distinctVisuals.set(key, [index])
  })
  const content = getStudyContent(study.id)
  useLayoutEffect(() => {
    const node = dialog.current
    node?.showModal()
    return () => node?.close()
  }, [])

  function close() {
    if (closing.current) return
    closing.current = true
    void transition(onClose)
  }

  return (
    <dialog ref={dialog} className="study-detail" aria-labelledby="detail-title"
      onCancel={(event) => { event.preventDefault(); close() }}
      onClick={(event) => { if (event.target === event.currentTarget) close() }}>
      <div className="detail-inner">
        <div className="dialog-top"><span className="eyebrow">{study.level && t(study.level) + ' / '}{studyIndex(study.category, study.index ?? study.id)}</span><button onClick={close} autoFocus>{t('Close')} <span aria-hidden="true">×</span></button></div>
        <h2 id="detail-title">{study.title}</h2>
        <p className="definition">{study.definition}</p>
        <p className="principle">{study.principle}</p>
        {basicConcepts[study.id] && <section className="basic-concept" aria-labelledby="basic-concept-title">
          <h3 id="basic-concept-title" className="eyebrow">{t('Basic concept')}</h3>
          <p>{basicConcepts[study.id][language]}</p>
        </section>}
        <div className="detail-examples">
          {[...distinctVisuals].map(([key, indexes]) => (
            <div className="detail-specimen" key={key}>
              <button className="example" aria-pressed={selected === indexes[0]} onClick={() => setSelected(indexes[0])}>
                <Specimen example={study.examples[indexes[0]]} />
                <span className="example-label"><small aria-hidden="true">0{indexes[0] + 1}</small>{study.examples[indexes[0]].label}</span>
              </button>
              {indexes.slice(1).map((index) => (
                <button className="example" key={index} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                  <span className="example-label"><small aria-hidden="true">0{index + 1}</small>{study.examples[index].label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="detail-note" aria-live="polite">
          <h3>{example.label}</h3>
          {example.note && <p>{example.note}</p>}
          {example.kind === 'palette' && <ul className="hex-list">{example.colors.map((color) => <li key={color}>{color.toUpperCase()}</li>)}</ul>}
        </div>
        {content ? (
          <dl className="detail-guidance color-guidance">
            <div><dt>{t('Applied example')}</dt><dd>{content.webApplication[language]}</dd></div>
            <div><dt>{t('Common Mistake')}</dt><dd>{content.commonMistake[language]}</dd></div>
            <div>
              <dt>{t('Related Concepts')}</dt>
              <dd><ul className="related-studies">{content.related.map((id) => {
                const target = id === 'layout' ? '05' : id === 'accessibility' ? 'accessibility-contrast' : id
                const related = studies.find((candidate) => candidate.id === target)
                const label = t(id.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
                return <li key={id}>{related ? <button type="button" onClick={() => onRelated(related.id)}>{localizeStudy(related, language).title}</button> : <span>{label}</span>}</li>
              })}</ul></dd>
            </div>
          </dl>
        ) : (
          <dl className="detail-guidance">
            {studyGuidance(study.id, language).map(([label, note]) => <div key={label}><dt>{label}</dt><dd>{note}</dd></div>)}
          </dl>
        )}
      </div>
      <LanguageSwitcher />
    </dialog>
  )
}
