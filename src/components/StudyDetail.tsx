import { colorContent } from '../studies/colorCatalog'
import { useLayoutEffect, useRef, useState } from 'react'
import type { Study } from '../studies'
import { transition } from '../motion'
import { Specimen } from './Specimen'
import { LanguageSwitcher } from './LanguageSwitcher'
import { studyGuidance, useLanguage } from '../language'

export function StudyDetail({ study, initial, onClose, onRelated }: { study: Study; initial?: number; onClose: () => void; onRelated: (id: string) => void }) {
  const { language, t, studyIndex } = useLanguage()
  const dialog = useRef<HTMLDialogElement>(null)
  const closing = useRef(false)
  const [selected, setSelected] = useState(initial ?? 0)
  const example = study.examples[selected]
  const color = colorContent.get(study.id)
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
        <div className="detail-examples">
          {study.examples.map((item, index) => (
            <button className="example" key={index} aria-pressed={selected === index} onClick={() => setSelected(index)}>
              <Specimen example={item} />
              <span className="example-label"><small aria-hidden="true">0{index + 1}</small>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="detail-note" aria-live="polite">
          <h3>{example.label}</h3>
          {example.note && <p>{example.note}</p>}
          {example.kind === 'palette' && <ul className="hex-list">{example.colors.map((color) => <li key={color}>{color.toUpperCase()}</li>)}</ul>}
        </div>
        {color ? (
          <dl className="detail-guidance color-guidance">
            <div><dt>{t('Web Application')}</dt><dd>{color.webApplication[language]}</dd></div>
            <div><dt>{t('Common Mistake')}</dt><dd>{color.commonMistake[language]}</dd></div>
            <div>
              <dt>{t('Related Concepts')}</dt>
              <dd><ul className="related-studies">{color.related.map((id) => {
                const related = colorContent.get(id)
                const label = t(id.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
                return <li key={id}>{related ? <button type="button" onClick={() => onRelated(id)}>{related.title[language]}</button> : <span>{label}</span>}</li>
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
