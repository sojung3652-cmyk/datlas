import type { CSSProperties } from 'react'
import type { Example } from '../studies'
import { useLanguage } from '../language'

type AtlasExample = Extract<Example, { kind: 'atlas' }>

const geometries: Record<string, string> = {
  'f-pattern': 'M17 14H83M17 25H61M17 36H44M17 14V52',
  'z-pattern': 'M17 13H83L17 49H83',
  'rule-of-thirds': 'M37 6V58M63 6V58M9 23H91M9 41H91',
  'golden-ratio': 'M61 6V58M61 38H91M76 38V58',
  'baseline-grid': 'M9 17H91M9 28H91M9 39H91M9 50H91',
}
const curves: Record<string, string> = {
  linear: 'M15 50L85 12',
  'ease-in': 'M15 50C54 50 69 35 85 12',
  'ease-out': 'M15 50C30 22 48 12 85 12',
  'ease-in-out': 'M15 50C45 50 55 12 85 12',
  delay: 'M15 50H38C52 50 61 12 85 12',
  spring: 'M15 50C37 50 44 6 61 10S67 17 85 12',
}
const surfaces: Record<string, string> = {
  paper: '#f3ead8', fabric: '#c8b8a4', glass: '#bdc9ca', metal: '#aeb2b3',
  wood: '#bd9b79', stone: '#b5b4ad', plastic: '#c6b6ab', ceramic: '#e5d8c9',
}
const symbols = ['M25 43L50 15 75 43z', 'M28 18H72V44H28z', 'M26 31H74M50 10V50', 'M26 42L50 16 74 42 M37 35H63']

export function atlasVisualKey({ family, topic, group, position, label }: AtlasExample) {
  switch (family) {
    case 'layout': return [family, ['12-column-grid', 'gutter', 'margins', 'masonry'].includes(topic) || geometries[topic] ? topic : group === 'Grid' ? 'grid' : 'page', position === 2 ? 0 : position]
    case 'perception': {
      if (topic === 'closure' || topic === 'illusory-contours') return [family, 'closure', position === 3]
      const motif = ['common-region', 'proximity', 'isolation', 'connectedness', 'direction'].includes(topic) ? topic
        : ['common-fate', 'movement'].includes(topic) ? 'direction'
        : topic === 'continuity' ? 'connectedness'
        : ['focal-point', 'contrast', 'scale', 'visual-weight'].includes(topic) ? 'emphasis'
        : group === 'Cognition' ? 'region' : 'dots'
      return [family, motif, position === 3 ? 3 : position === 1 && ['emphasis', 'isolation'].includes(motif) ? 1 : 0]
    }
    case 'ui': {
      if (['tabs', 'navigation', 'pagination'].includes(topic)) return [family, topic === 'pagination' ? topic : 'tabs', position % 3]
      if (['input', 'form', 'card', 'table'].includes(topic)) return [family, topic === 'form' ? 'input' : topic]
      if (topic === 'toast') return [family, topic, position === 3]
      const motif = ['modal', 'dropdown', 'tooltip', 'focus', 'disabled', 'loading', 'glassmorphism', 'neo-brutalism', 'neumorphism'].includes(topic) ? topic : 'control'
      return [family, motif, position, group === 'States' ? label : '']
    }
    case 'ux':
      if (topic === 'hick-s-law') return [family, topic]
      if (topic === 'fitts-s-law') return [family, topic, position === 1]
      return [family, group === 'Research' ? 'research' : 'flow', position % 3]
    case 'material': return [family, surfaces[topic] || ['grain', 'noise', 'soft-shadow', 'hard-shadow', 'inner-shadow', 'contact-shadow', 'rim-light', 'transparency'].includes(topic) ? (topic === 'noise' ? 'grain' : topic) : 'surface', position]
    case 'motion': return [family, group === 'Timing' ? curves[topic] ?? 'easing' : 'timeline', topic === 'duration', position]
    case 'brand': return [family, group === 'Strategy', position]
    case 'typography': return [family, position]
  }
}

function LayoutPlate({ topic, group, position }: AtlasExample) {
  const columns = topic === '12-column-grid' ? 12 : group === 'Grid' ? [4, 6, 4, 3][position] : [3, 4, 3, 2][position]
  const gap = topic === 'gutter' ? [1, 4, 7, 0][position] : 2
  return <svg viewBox="0 0 100 64" className="atlas-diagram">
    <rect x="9" y="6" width="82" height="52" className="atlas-outline" />
    {Array.from({ length: columns }, (_, i) => (
      <rect key={i} x={10 + i * 80 / columns} y="8" width={80 / columns - gap} height="48" className="atlas-track" />
    ))}
    <rect x={topic === 'margins' ? 14 + position * 3 : 15} y="17" width={position === 1 ? 57 : 35} height={position === 3 ? 9 : 15} className="atlas-ink" />
    {topic === 'masonry' ? <path d="M15 35h20v18H15z M40 32h18v9H40z M63 18h20v29H63z" className="atlas-mid" />
      : <path d={position === 3 ? 'M15 30h68v6H15z M15 41h68v6H15z' : 'M15 38h40v5H15z M15 47h27v4H15z M64 20h19v31H64z'} className="atlas-mid" />}
    {geometries[topic] && <path d={geometries[topic]} className="atlas-guide" />}
  </svg>
}

function PerceptionPlate({ topic, group, position }: AtlasExample) {
  const grouped = position !== 3
  const strong = ['focal-point', 'contrast', 'scale', 'visual-weight', 'isolation'].includes(topic)
  return <svg viewBox="0 0 100 64" className="atlas-diagram">
    {topic === 'closure' || topic === 'illusory-contours' ? (
      <path d="M26 28V13H42 M58 13H74V28 M74 36V51H58 M42 51H26V36" className={grouped ? 'atlas-outline' : 'atlas-guide'} />
    ) : <>
      {(topic === 'common-region' || group === 'Cognition') && grouped && <rect x="14" y="12" width="34" height="40" rx="3" className="atlas-outline" />}
      {(topic === 'connectedness' || topic === 'continuity') && grouped && <path d="M19 37Q45 7 81 32" className="atlas-guide" />}
      {[19, 32, 45, 62, 78].map((x, i) => (
        <circle key={x} cx={topic === 'proximity' && grouped ? [19, 28, 37, 66, 75][i] : topic === 'isolation' && i === 4 ? 88 : x} cy={topic === 'proximity' ? 32 : grouped && i < 3 ? 26 : 38}
          r={strong && i === (position === 1 ? 0 : 3) ? 9 : 4}
          className={grouped && (strong ? i === (position === 1 ? 0 : 3) : i < 3) ? 'atlas-ink' : 'atlas-mid'} />
      ))}
      {(topic === 'direction' || topic === 'common-fate' || topic === 'movement') && <path d="M58 15h25l-5-4m5 4-5 4" className="atlas-guide" />}
    </>}
  </svg>
}

export function AtlasSpecimen({ example }: { example: AtlasExample }) {
  const { language } = useLanguage()
  const { family, topic, group, position, label } = example
  const ko = language === 'ko'
  const action = ko ? ['열기', '선택', '저장', '다시 시도'][position] : ['Open', 'Select', 'Save', 'Retry'][position]
  const curve = group === 'Timing' ? curves[topic] ?? 'M15 50C28 50 63 12 85 12' : 'M15 46H38L54 22H85'
  const style = {
    '--atlas-tint': surfaces[topic] ?? '#d8cfc3',
    '--atlas-curve': `path("${curve}")`,
    '--atlas-progress': `${position * 30 + 5}%`,
    '--atlas-duration': topic === 'duration' ? ['.32s', '.64s', '1.2s', '2.4s'][position] : '1.45s',
  } as CSSProperties
  return (
    <div className={`specimen atlas-specimen atlas-${family} atlas-topic-${topic} atlas-step-${position}`} style={style} aria-hidden="true">
      {family === 'layout' && <LayoutPlate {...example} />}
      {family === 'perception' && <PerceptionPlate {...example} />}
      {family === 'typography' && <div className="atlas-type-proof" lang="en"><b>{['Ag', 'Aa 012', 'Atlas', 'Aa'][position]}</b><span>abcdefghijklmnopqrstuvwxyz</span></div>}
      {family === 'ui' && (
        <div className="atlas-ui-panel">
          {topic === 'tabs' || topic === 'navigation' || topic === 'pagination' ? <div className="atlas-ui-tabs">{(topic === 'pagination' ? ['1', '2', '3'] : ko ? ['홈', '목록', '정보'] : ['Home', 'Index', 'Info']).map((label, i) => <span key={label} data-current={i === position % 3}>{label}</span>)}</div>
          : topic === 'input' || topic === 'form' ? <><span>{ko ? '이메일' : 'Email'}</span><i className="atlas-ui-input">name@example.com</i></>
          : topic === 'table' ? <div className="atlas-ui-table"><span>{ko ? '단계' : 'Stage'}</span><span>{ko ? '개수' : 'Count'}</span><b>Point</b><b>04</b></div>
          : topic === 'modal' ? <div className="atlas-ui-modal"><b>{ko ? '변경하시겠어요?' : 'Apply changes?'}</b><span className="atlas-ui-control">{action}</span></div>
          : topic === 'toast' ? <div className="atlas-ui-toast"><b>{position === 3 ? '!' : '✓'}</b> {ko ? '변경 사항' : 'Changes'} <span>×</span></div>
          : topic === 'card' ? <><i className="atlas-ui-card-image" /><b>{ko ? '표본 컬렉션' : 'Specimen collection'}</b></>
          : topic === 'dropdown' || topic === 'tooltip' ? <><b className="atlas-ui-control">{action} {topic === 'dropdown' ? '▾' : 'ⓘ'}</b><span className="atlas-ui-input">{ko ? '추가 정보' : 'More information'}</span></>
          : <><span>{group === 'States' ? label : ko ? '항목' : 'Item'}</span><b className="atlas-ui-control">{action}</b></>}
        </div>
      )}
      {family === 'ux' && (topic === 'fitts-s-law' || topic === 'hick-s-law' ? (
        <svg viewBox="0 0 100 64" className="atlas-diagram">
          <path d="M15 51H85M15 51V12" className="atlas-outline" />
          {topic === 'hick-s-law' ? <path d={curves['ease-out']} className="atlas-guide" /> : <><path d="M20 44L72 25" className="atlas-guide" /><rect x={position === 1 ? 67 : 72} y="16" width={position === 1 ? 18 : 9} height="17" className="atlas-mid" /></>}
        </svg>
      ) : (
        <div className="atlas-flow">{(group === 'Research' ? ko ? ['관찰', '비교', '검증'] : ['Observe', 'Compare', 'Test'] : ko ? ['목표', '선택', '결과'] : ['Goal', 'Choice', 'Result']).map((label, i) => <span key={label} data-current={i === position % 3}>{label}</span>)}</div>
      ))}
      {family === 'material' && <div className="atlas-material-object"><i /></div>}
      {family === 'motion' && (
        <svg viewBox="0 0 100 64" className="atlas-diagram">
          <path d="M15 50H86M15 50V11" className="atlas-outline" />
          <path d={curve} className="atlas-guide" />
          <circle r="3.7" className="atlas-motion-dot atlas-ink" />
        </svg>
      )}
      {family === 'brand' && (
        <div className="atlas-brand-panel">
          <svg viewBox="0 0 100 60" className="atlas-diagram"><path d={symbols[position]} className="atlas-guide" /></svg>
          <span>{group === 'Strategy' ? (ko ? ['대상', '목소리', '맥락', '검토'][position] : ['Audience', 'Voice', 'Context', 'Review'][position]) : 'FORM / FIELD'}</span>
        </div>
      )}
    </div>
  )
}
