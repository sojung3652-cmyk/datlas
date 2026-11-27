import type { CSSProperties } from 'react'
import type { Example } from '../studies'
import { useLanguage } from '../language'

const anatomy = {
  baseline: ['Atlas', 'Aa Aa', '＋ Aa', 'Aa Aa'],
  'x-height': ['xeno', 'xeno', 'xeno', 'xeno'],
  'cap-height': ['AT', 'AT', 'AT', 'UI'],
  ascender: ['b', 'd', 'h', 'l'],
  descender: ['g', 'p', 'q', 'y'],
  'serif-anatomy': ['T', 'T', 'T', 'T'],
  counter: ['c', 'o', 'e', 'a'],
  stroke: ['A', 'A', 'A', 'A'],
} as const

const faces: Record<string, readonly string[]> = {
  'serif-typeface': ['old', 'transitional', 'didone', 'contemporary'],
  'sans-serif': ['grotesk', 'neo', 'geometric', 'humanist'],
  grotesk: ['grotesk', 'grotesk', 'grotesk', 'grotesk'],
  'geometric-sans': ['geometric', 'geometric', 'geometric', 'geometric'],
  'humanist-sans': ['humanist', 'humanist', 'humanist', 'humanist'],
  'slab-serif': ['clarendon', 'slab', 'slab', 'clarendon'],
  'display-typeface': ['contemporary', 'didone', 'geometric', 'grotesk'],
  monospace: ['mono', 'mono', 'mono', 'mono'],
}

const anatomyFaces: Record<string, readonly string[]> = {
  'x-height': ['old', 'transitional', 'neo', 'neo'],
  'cap-height': ['geometric', 'neo', 'contemporary', 'grotesk'],
  'serif-anatomy': ['old', 'didone', 'slab', 'wedge'],
  counter: ['humanist', 'geometric', 'neo', 'contemporary'],
  stroke: ['geometric', 'old', 'didone', 'neo'],
}

const guidePositions: Record<string, number> = {
  baseline: 65, 'x-height': 39, 'cap-height': 28, ascender: 24, descender: 80,
}

const sampleCopy = {
  en: { title: 'Form & field', text: 'A quiet page gives each line room to breathe. Type sets the pace of reading.', label: 'Field notes', action: 'Read the story' },
  ko: { title: '형태와 공간', text: '한 줄마다 여백을 두면 글이 차분하게 읽힌다. 글자의 형태가 읽기의 리듬을 만든다.', label: '디자인 노트', action: '본문 읽기' },
}

type TypographyExample = Extract<Example, { kind: 'typography' }>

function AnatomySpecimen({ example }: { example: TypographyExample }) {
  const { topic, position, label } = example
  const glyphs = anatomy[topic as keyof typeof anatomy]
  const face = anatomyFaces[topic]?.[position] ?? 'neo'
  const guide = guidePositions[topic]
  return (
    <svg className={`anatomy-svg face-${face}`} viewBox="0 0 160 88" aria-hidden="true">
      <path className="type-guide" d="M10 65h140" />
      {guide !== undefined && guide !== 65 && <path className="type-guide" d={`M10 ${guide}h140`} />}
      {topic === 'baseline' && position === 3 && <path className="type-guide" d="M10 40h140 M32 22v52 M80 22v52 M128 22v52" />}
      {topic === 'baseline' && position === 1 ? (
        <text x="80" y="65" textAnchor="middle" className="type-glyph"><tspan>Aa</tspan><tspan dx="4" fontSize="23">Aa</tspan></text>
      ) : (
        <text x="80" y="65" textAnchor="middle" className="type-glyph" style={{ fontWeight: topic === 'stroke' && position === 3 ? 780 : undefined }}>{glyphs?.[position]}</text>
      )}
      {guide === undefined && <path className="type-pointer" d={topic === 'counter' ? 'M126 30l-39 18' : 'M130 31l-39 20'} />}
      <text className="type-guide-label" x="12" y="13">{label}</text>
    </svg>
  )
}

export function TypographySpecimen({ example }: { example: TypographyExample }) {
  const { language } = useLanguage()
  const { topic, group, position, label } = example
  const copy = sampleCopy[language]
  const face = faces[topic]?.[position] ?? 'neo'
  const classes = `specimen type-sample type-sample--${topic} type-step-${position} face-${face}`
  const style = {
    '--sample-weight': [300, 400, 560, 780][position],
    '--sample-tracking': ['-.085em', '0em', '.12em', '.19em'][position],
    '--sample-leading': [1.02, 1.4, 1.75, 2.05][position],
    '--sample-measure': ['37%', '57%', '90%', 'clamp(48%, 75cqw, 78%)'][position],
    '--sample-scale': [1.2, 1.25, 1.333, 1.45][position],
    '--sample-alignment': ['start', 'center', 'end', 'justify'][position],
  } as CSSProperties
  return (
    <div className={classes} style={style} aria-hidden="true">
      {group === 'anatomy' ? <AnatomySpecimen example={example} /> : group === 'typeface' ? (
        <div className="type-face-proof" lang="en"><b>{topic === 'monospace' ? ['A9:01', '08 / 12', 'Aa [04]', 'Atlas_'][position] : ['Ag', 'Rao', 'Form', 'Atlas'][position]}</b><span>abcdefghijklmnopqrstuvwxyz</span></div>
      ) : topic === 'kerning' ? (
        <div className="type-kern-proof" lang="en"><span>{label}</span><b>{label}</b></div>
      ) : ['leading', 'measure', 'alignment'].includes(topic) ? (
        <div className="type-text-proof">{copy.text}</div>
      ) : topic === 'type-scale' ? (
        <div className="type-scale-proof"><small>{copy.label}</small><span>{copy.action}</span><b>{copy.title}</b></div>
      ) : topic === 'variable-fonts' || topic === 'optical-size' ? (
        <div className="type-axis-proof">
          <small>{label}</small><b lang="en">Atlas</b>
        </div>
      ) : topic === 'tracking' || topic === 'font-weight' || topic === 'kinetic-typography' ? (
        <b className="type-motion-proof" lang="en">{topic === 'tracking' ? 'ATLAS' : 'Form'}</b>
      ) : (
        <div className="type-editorial-proof">
          <small>{copy.label}</small><b>{copy.title}</b>
          <p>{topic === 'hierarchy' || topic === 'responsive-typography' ? copy.action : copy.text}</p>
        </div>
      )}
    </div>
  )
}
