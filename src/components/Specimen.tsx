import { ColorUiSpecimen } from './ColorUiSpecimen'
import type { CSSProperties } from 'react'
import { useLanguage } from '../language'
import type { Example } from '../studies'

const typography: Record<string, [string, string, string]> = {
  scale: ['THE FIELD JOURNAL', 'On the coast', 'An atlas of the shoreline'],
  weight: ['STUDIO / SYSTEM', 'Interface', 'Tools for everyday work'],
  contrast: ['MAISON / OBJECTS', 'Quiet form', 'Collection 01 · Objects in use'],
  spacing: ['NOTES ON DESIGN', 'Open space', 'The rhythm between words'],
}

const grids: Record<string, { title: string; subtitle: string; columns: number; entries: string[] }> = {
  two: { title: 'Fieldwork', subtitle: 'Selected projects', columns: 2, entries: ['Dune House', 'Soft Quarry'] },
  four: { title: 'The Review', subtitle: 'Notes on culture', columns: 4, entries: ['A slower city', 'Field notes', 'In print'] },
  eight: { title: 'Object Index', subtitle: 'Edition 01 / Shop', columns: 8, entries: ['Vessel', 'Form', 'Arc', 'Fold'] },
  twelve: { title: 'Common Ground', subtitle: 'Design & spaces', columns: 12, entries: ['The shared room', 'On materials', 'New work'] },
}

export function Specimen({ example }: { example: Example }) {
  const { language, t } = useLanguage()
  if (example.kind === 'palette') {
    if (example.presentation === 'ui') return <ColorUiSpecimen example={example} />
    const center = (example.colors.length - 1) / 2
    return (
      <div className={`specimen palette palette--${example.presentation}`} aria-hidden="true">
        {example.colors.map((color, index) => (
          <div className="swatch" key={color} style={{ '--swatch': color, '--offset': index - center, '--angle': index * 360 / example.colors.length + 'deg' } as CSSProperties}>
            <span>{color.toUpperCase()}</span>
          </div>
        ))}
      </div>
    )
  }

  if (example.kind === 'type') {
    const [eyebrow, title, subtitle] = typography[example.variant]
    return <div className={`specimen mini type-${example.variant}`} aria-hidden="true">
      <div className="mini-sheet type-sheet"><small>{t(eyebrow)}</small><b>{t(title)}</b><span>{t(subtitle)}</span><i /></div>
    </div>
  }

  if (example.kind === 'grid') {
    const { title, subtitle, columns, entries } = grids[example.variant]
    return <div className={`specimen mini grid-${example.variant}`} aria-hidden="true">
      <div className="mini-sheet grid-sheet" style={{ '--tracks': columns } as CSSProperties}>
        <div className="grid-guides">{Array.from({ length: columns }, (_, index) => <i key={index} />)}</div>
        <header><b>{t(title)}</b><small>{t(subtitle)}</small></header>
        <div className="mini-entries">{entries.map((entry, index) => <div key={entry}><i className={`mini-art art-${index}`} /><span>{t(entry)}</span></div>)}</div>
      </div>
    </div>
  }

  return <div className={`specimen mini focus-${example.variant}`} aria-hidden="true">
    <div className="mini-sheet focus-sheet">
      {example.variant === 'size' && <><small>{t('FORM / EDITORIAL')}</small><b>{language === 'ko' ? <>생각할<br />공간.</> : <>Space<br />to think.</>}</b><span>{t('Essays on the built world')}</span></>}
      {example.variant === 'contrast' && <><small>{t('Studio overview')}</small><div className="mini-metrics"><div><b>84%</b><span>{t('Read rate')}</span></div><div><b>24</b><span>{t('Issues')}</span></div></div><span>{t('Publication analytics')}</span></>}
      {example.variant === 'position' && <><small>{t('OBJECTS / SHOP')}</small><i className="mini-art art-2" /><b>{t('Arc vessel')}</b><span>{t('Edition of 50')}</span></>}
      {example.variant === 'isolation' && <><small>{t('18 OCT / STUDIO 03')}</small><b>{t('FORM')}</b><span>{t('An evening of design')}</span></>}
    </div>
  </div>
}
