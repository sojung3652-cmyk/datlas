import type { Category, Example, Study } from '../studies'
import { atlasStudies } from './atlasStudies.mass'
import { massConcepts } from './massConcepts'

export const categoryNames = {
  typography: 'Typography', layout: 'Layout', perception: 'Perception',
  ui: 'UI Styles', ux: 'UX', material: 'Materials', motion: 'Motion', brand: 'Brand',
} as const satisfies Record<string, Category>

export type MassCategory = keyof typeof categoryNames
type Copy = { en: string; ko: string }
const sourceCategory = (value: string) => value as MassCategory
const entries = atlasStudies.map((entry) => ({ ...entry, topic: entry.id.slice(entry.category.length + 1), family: sourceCategory(entry.category) }))
const aliases: Record<string, string> = {
  'typography-serif': 'serif-typeface', 'typography-typography-hierarchy': 'hierarchy',
  'typography-leading-line-height': 'leading', 'typography-measure-line-length': 'measure',
  'typography-text-alignment': 'alignment', 'typography-body-vs-display': 'body-display',
  'layout-grid-system': '05', 'layout-alignment': 'alignment-layout', 'perception-visual-hierarchy': '06',
}
const levels: Record<MassCategory, NonNullable<Study['level']>> = {
  typography: 'POINT', layout: 'PLANE', perception: 'PLANE', ui: 'VOLUME',
  ux: 'WORLD', material: 'VOLUME', motion: 'LINE', brand: 'WORLD',
}
const groupNames: Record<string, string> = {
  Anatomy: '글자 구조', Typeface: '서체', Composition: '구성', Advanced: '심화',
  Grid: '그리드', Patterns: '패턴', Responsive: '반응형', Gestalt: '게슈탈트', Attention: '주의',
  Cognition: '인지', Optical: '시각 보정', Components: '컴포넌트', States: '상태', Principles: '원칙',
  Styles: '스타일', Foundations: '기초', Usability: '사용성', Laws: '법칙', Research: '리서치',
  Surface: '표면', Light: '빛', Shadow: '그림자', 'Digital Texture': '디지털 질감',
  Timing: '타이밍', Interaction: '상호작용', Identity: '아이덴티티', 'Visual Language': '시각 언어',
  Strategy: '전략', System: '시스템',
}

export function bilingualGroup(group: string): Copy {
  return { en: group, ko: groupNames[group] ?? group }
}

const instructions: Record<MassCategory, [Copy, Copy, Copy]> = {
  typography: [
    { en: 'Compare the same text before and after changing the treatment.', ko: '같은 문구를 사용해 조판 조건을 바꾸기 전과 후를 비교한다.' },
    { en: 'Test the treatment on a real heading, label, or paragraph at its intended size.', ko: '실제 크기의 제목, 라벨 또는 문단에 적용해 읽어 본다.' },
    { en: 'Changing font, content, and spacing at once hides which decision improved readability.', ko: '서체, 문구, 간격을 한꺼번에 바꾸면 어떤 결정이 읽기 쉬움을 높였는지 알기 어렵다.' },
  ],
  layout: [
    { en: 'Choose the arrangement that preserves reading order and relationships at the available width.', ko: '사용 가능한 너비에서 읽기 순서와 요소 관계를 유지하는 배치를 선택한다.' },
    { en: 'Sketch a content page with a heading, main content, and a supporting area, then test it at two widths.', ko: '제목, 주요 콘텐츠, 보조 영역이 있는 페이지를 그리고 두 가지 너비에서 확인한다.' },
    { en: 'Applying a proportion or pattern mechanically can place a secondary element before the main content.', ko: '비례나 패턴을 기계적으로 적용하면 보조 요소가 주요 콘텐츠보다 먼저 보일 수 있다.' },
  ],
  perception: [
    { en: 'Test what people notice first when the visual cue is present and when it is removed.', ko: '시각 단서를 넣었을 때와 뺐을 때 사람들이 무엇부터 보는지 비교한다.' },
    { en: 'Use the cue to group related controls or make one important target easy to locate.', ko: '관련 컨트롤을 묶거나 중요한 한 요소를 쉽게 찾도록 단서를 배치한다.' },
    { en: 'Several equally strong cues can compete and obscure the intended reading order.', ko: '같은 강도의 단서가 여러 개 있으면 시선이 분산돼 의도한 순서가 흐려질 수 있다.' },
  ],
  ui: [
    { en: 'Make the control or state recognizable from its label, placement, and feedback.', ko: '라벨, 위치, 피드백을 통해 컨트롤의 역할과 상태를 알아볼 수 있게 한다.' },
    { en: 'Prototype the control in the screen where it will be used and test pointer and keyboard interaction.', ko: '실제로 쓸 화면에 프로토타입을 놓고 포인터와 키보드로 각각 조작해 본다.' },
    { en: 'Relying on color or decoration alone can hide the meaning from users who cannot see that cue.', ko: '색이나 장식만으로 상태를 전달하면 그 단서를 보기 어려운 사용자가 의미를 놓칠 수 있다.' },
  ],
  ux: [
    { en: 'Evaluate the idea in the context of a concrete user task and observable behavior.', ko: '구체적인 사용자 과제와 관찰 가능한 행동을 기준으로 개념을 검증한다.' },
    { en: 'Map the path from the first cue to the result, including what happens when the user makes a mistake.', ko: '첫 단서에서 결과까지의 흐름을 그리고 사용자가 실수했을 때의 경로도 포함한다.' },
    { en: 'Do not infer intent from a screen metric alone. Compare it with what people actually do or report.', ko: '화면 지표 하나로 의도를 판단하지 않는다. 실제 행동이나 사용자 설명과 대조한다.' },
  ],
  material: [
    { en: 'Keep the direction of light and the separation between layers consistent.', ko: '광원의 방향과 레이어 사이의 깊이 관계를 일관되게 유지한다.' },
    { en: 'Compare a base surface and a raised panel against the same background.', ko: '같은 배경 위에 바닥 표면과 떠 있는 패널을 두고 표면 표현을 비교한다.' },
    { en: 'Texture, blur, and shadow that compete with text can make a surface harder to use.', ko: '텍스처, 블러, 그림자가 글자보다 두드러지면 표면의 내용이 읽기 어려워질 수 있다.' },
  ],
  motion: [
    { en: 'Use timing and movement to clarify one state change at a time.', ko: '타이밍과 움직임으로 한 번에 한 가지 상태 변화를 설명한다.' },
    { en: 'Prototype the transition in place and compare the initial, moving, and settled states.', ko: '실제 위치에서 전환을 구현하고 시작, 이동, 정착 상태를 비교한다.' },
    { en: 'Motion that delays reading or hides essential information needs a simpler reduced-motion path.', ko: '읽기를 지연시키거나 필수 정보를 숨기는 모션에는 더 단순한 모션 감소 경로가 필요하다.' },
  ],
  brand: [
    { en: 'Define which elements stay recognizable and which can adapt to the medium.', ko: '매체가 달라져도 알아볼 수 있어야 할 요소와 상황에 맞춰 바꿀 수 있는 요소를 구분한다.' },
    { en: 'Apply the rule to a compact interface label and a larger editorial composition.', ko: '작은 인터페이스 라벨과 넓은 에디토리얼 구성에 같은 규칙을 적용해 본다.' },
    { en: 'Repeating one composition everywhere can make the identity brittle across formats.', ko: '어디서나 같은 구성을 반복하면 매체에 맞춰 아이덴티티를 적용하기 어려워진다.' },
  ],
}

const studyId = (entry: typeof entries[number]) => aliases[entry.id] ?? (entry.family === 'typography' && entry.topic !== 'neo-grotesk' ? entry.topic : entry.id)

export const massContent = new Map(entries.map((entry) => {
  const [principle, webApplication, commonMistake] = instructions[entry.family]
  const concept = massConcepts[entry.id]
  const related = entries.filter((item) => item !== entry && item.family === entry.family && item.group === entry.group)
    .sort((a, b) => Math.abs(entries.indexOf(a) - entries.indexOf(entry)) - Math.abs(entries.indexOf(b) - entries.indexOf(entry)))
    .slice(0, 3).map(studyId)
  return [studyId(entry), { ...entry, concept, principle, webApplication, commonMistake, related }] as const
}))

export function mergeMassStudies(existing: readonly Study[]): Study[] {
  const previous = new Map(existing.map((study) => [study.id, study]))
  const used = new Set<string>()
  const indexes = new Map<MassCategory, number>()
  const expanded = entries.map((entry): Study => {
    const id = studyId(entry)
    const prior = previous.get(id)
    used.add(id)
    const index = (indexes.get(entry.family) ?? 0) + 1
    indexes.set(entry.family, index)
    if (entry.examples.length !== 4) throw new Error(`Expected four specimens for ${entry.id}`)
    const metadata = { index: String(index).padStart(2, '0'), group: entry.group, keywords: entry.keywords, sourceId: entry.id }
    if (prior) return { ...prior, ...metadata }
    const content = massContent.get(id)!
    function specimen(position: 0 | 1 | 2 | 3): Example {
      return { kind: 'atlas', family: entry.family, topic: entry.topic, group: entry.group, position, label: entry.examples[position].en, note: '' }
    }
    return {
      id, ...metadata, category: categoryNames[entry.family], level: levels[entry.family],
      title: entry.title.en, definition: content.concept?.en ?? entry.summary.en,
      principle: content.principle.en, examples: [specimen(0), specimen(1), specimen(2), specimen(3)],
    }
  })
  return [...existing.filter((study) => !used.has(study.id) && study.category === 'Color'), ...expanded,
    ...existing.filter((study) => !used.has(study.id) && study.category !== 'Color').map((study, index) =>
      study.category === 'Layout' ? {
        ...study, group: study.id === 'responsive-layout' ? 'Responsive' : 'Composition',
        index: String((indexes.get('layout') ?? 0) + index + 1),
      } : study)]
}
