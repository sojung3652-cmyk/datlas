import { typographyCatalog, type TypographyGroup } from './studies/typographyCatalog'
import { colorCatalog } from './studies/colorCatalog'
import { layoutCatalog } from './studies/layoutCatalog'
import { mergeMassStudies, type MassCategory } from './studies/massCatalog'

export const categories = ['Color', 'Typography', 'Layout', 'Perception', 'UI Styles', 'UX', 'Materials', 'Motion', 'Brand'] as const
export type Category = typeof categories[number]

type PalettePresentation = 'strip' | 'fan' | 'chips' | 'scale' | 'field' | 'orbit' | 'band' | 'wheel' | 'ratio' | 'ui'
export type Example = {
  label: string
  note: string
} & ({ kind: 'palette'; presentation: PalettePresentation; colors: readonly string[]; uiVariant?: string } | { kind: 'grid' | 'focus'; variant: string } | { kind: 'typography'; topic: string; group: TypographyGroup; position: 0 | 1 | 2 | 3 } | { kind: 'layout'; topic: string; position: 0 | 1 | 2 | 3 } | { kind: 'atlas'; family: MassCategory; group: string; topic: string; position: 0 | 1 | 2 | 3 })

export type Study = {
  id: string
  index?: string
  group?: string
  keywords?: readonly string[]
  sourceId?: string
  level?: 'POINT' | 'LINE' | 'PLANE' | 'VOLUME' | 'WORLD'
  category: Category
  title: string
  definition: string
  principle: string
  examples: readonly [Example, Example, Example, Example]
}

export const studies: readonly Study[] = mergeMassStudies([
  ...colorCatalog,
  ...typographyCatalog,
  {
    id: '05', index: '01', level: 'LINE', category: 'Layout', title: 'Grid Systems',
    definition: 'An underlying structure that aligns elements across a composition.',
    principle: 'Use shared edges and intervals to organize varied content.',
    examples: [
      { kind: 'grid', variant: 'two', label: '2-column', note: 'Two equal tracks give portfolio projects the same visual weight.' },
      { kind: 'grid', variant: 'four', label: '4-column', note: 'The lead magazine story spans two tracks and the others span one each.' },
      { kind: 'grid', variant: 'eight', label: '8-column', note: 'Each item spans two tracks, giving the four products equal space.' },
      { kind: 'grid', variant: 'twelve', label: '12-column', note: 'The lead story uses six tracks and two secondary stories use three each.' },
    ],
  },
  {
    id: '06', level: 'PLANE', category: 'Perception', title: 'Visual Hierarchy',
    definition: 'The order in which elements attract attention in a composition.',
    principle: 'Make the first point of attention easy to distinguish.',
    examples: [
      { kind: 'focus', variant: 'size', label: 'Scale', note: 'An oversized headline becomes the first read in this editorial landing page.' },
      { kind: 'focus', variant: 'contrast', label: 'Contrast', note: 'A dark panel emphasizes the primary metric in this dashboard.' },
      { kind: 'focus', variant: 'position', label: 'Position', note: 'The product image sits ahead of its title and edition details in the reading order.' },
      { kind: 'focus', variant: 'isolation', label: 'Isolation', note: 'Open space around the event name makes it the poster’s focal point.' },
    ],
  },
  ...layoutCatalog,
])
