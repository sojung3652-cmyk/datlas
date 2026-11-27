import type { Example, Study } from '../studies'
import { typographyStudies } from './typographyStudies'

export const typographyGroups = [
  { id: 'anatomy', title: { en: 'Anatomy', ko: '글자 구조' }, count: 8 },
  { id: 'typeface', title: { en: 'Typeface', ko: '서체' }, count: 8 },
  { id: 'composition', title: { en: 'Composition', ko: '조판' }, count: 8 },
  { id: 'advanced', title: { en: 'Advanced', ko: '심화' }, count: 7 },
] as const

export type TypographyGroup = typeof typographyGroups[number]['id']

const levels: Record<string, NonNullable<Study['level']>> = {
  tracking: 'LINE', kerning: 'LINE', leading: 'LINE', measure: 'LINE', alignment: 'LINE',
  hierarchy: 'PLANE', 'editorial-typography': 'PLANE', 'kinetic-typography': 'LINE',
}

export const typographyContent = new Map(typographyStudies.map((study) => [study.id, study]))

export const typographyCatalog = typographyStudies.map((study, index): Study => {
  const group = typographyGroups[Math.min(3, Math.floor(index / 8))].id
  if (study.examples.length !== 4) throw new Error(`Expected four typography examples for ${study.id}`)

  function example(position: 0 | 1 | 2 | 3): Example {
    return {
      kind: 'typography', topic: study.id, group, position,
      label: study.examples[position].label.en, note: '',
    }
  }

  return {
    id: study.id, index: String(index + 1).padStart(2, '0'),
    group, level: levels[study.id] ?? 'POINT', category: 'Typography',
    title: study.title.en, definition: study.definition.en, principle: study.principle.en,
    examples: [example(0), example(1), example(2), example(3)],
  }
})
