import type { Study } from '../studies'

type Copy = { en: string; ko: string }
type LayoutContent = {
  id: string; title: Copy; definition: Copy; principle: Copy;
  examples: readonly [{ label: Copy }, { label: Copy }, { label: Copy }, { label: Copy }];
  webApplication: Copy; commonMistake: Copy; related: string[];
}

const layouts: LayoutContent[] = [
  {
    id: 'spacing', title: {"en":"Spacing","ko":"간격"},
    definition: {"en":"Spacing groups related elements and separates independent groups.","ko":"간격은 관련 요소를 묶고 독립된 그룹을 구분한다."},
    principle: {"en":"Use small gaps within a group and larger gaps between groups.","ko":"그룹 안에는 좁은 간격을, 그룹 사이에는 넓은 간격을 둔다."},
    examples: [{"label":{"en":"Proximity","ko":"근접성"}},{"label":{"en":"Consistent rhythm","ko":"일관된 리듬"}},{"label":{"en":"Group separation","ko":"그룹 구분"}},{"label":{"en":"Generous spacing","ko":"넉넉한 간격"}}],
    webApplication: {"en":"Use repeated spacing values for labels, controls, and sections.","ko":"라벨, 컨트롤, 섹션에 반복 가능한 간격 값을 적용한다."},
    commonMistake: {"en":"Equal gaps can erase the distinction between groups.","ko":"모든 간격을 같게 두면 그룹의 경계가 모호해진다."},
    related: ["alignment-layout","05"],
  },
  {
    id: 'alignment-layout', title: {"en":"Alignment","ko":"정렬"},
    definition: {"en":"Alignment creates a shared visual edge or axis between elements.","ko":"정렬은 요소 사이에 공통된 시각적 기준선이나 축을 만든다."},
    principle: {"en":"Choose an alignment that supports the order of reading.","ko":"읽는 순서를 뒷받침하는 정렬 방식을 선택한다."},
    examples: [{"label":{"en":"Left edge","ko":"왼쪽 기준선"}},{"label":{"en":"Center axis","ko":"중앙 축"}},{"label":{"en":"Right edge","ko":"오른쪽 기준선"}},{"label":{"en":"Shared baseline","ko":"공통 베이스라인"}}],
    webApplication: {"en":"Align headings, summaries, and actions to a shared edge.","ko":"제목, 요약, 버튼을 공통 기준선에 맞춘다."},
    commonMistake: {"en":"Mixing alignments without a purpose makes the eye search for the next item.","ko":"이유 없이 정렬을 섞으면 다음 요소를 찾아야 하는 부담이 생긴다."},
    related: ["spacing","baseline","05"],
  },
  {
    id: 'responsive-layout', title: {"en":"Responsive Layout","ko":"반응형 레이아웃"},
    definition: {"en":"A responsive layout changes its structure as available space changes.","ko":"반응형 레이아웃은 사용할 수 있는 공간에 따라 구조를 바꾼다."},
    principle: {"en":"Let content determine when columns stack, wrap, or expand.","ko":"콘텐츠에 필요한 공간에 맞춰 열을 쌓거나 줄을 바꾸거나 넓힌다."},
    examples: [{"label":{"en":"Stack","ko":"세로 쌓기"}},{"label":{"en":"Two columns","ko":"두 열"}},{"label":{"en":"Sidebar","ko":"사이드바"}},{"label":{"en":"Wrap","ko":"줄바꿈"}}],
    webApplication: {"en":"Stack a sidebar below the main content when the reading column gets too narrow.","ko":"본문 열이 너무 좁아지면 사이드바를 본문 아래로 옮긴다."},
    commonMistake: {"en":"Shrinking a desktop layout can produce narrow, unreadable columns.","ko":"데스크톱 배치를 그대로 줄이면 열이 너무 좁아져 읽기 어려워진다."},
    related: ["05","responsive-typography","spacing"],
  },
]

export const layoutContent = new Map(layouts.map((study) => [study.id, study]))

export const layoutCatalog = layouts.map((study, index): Study => ({
  id: study.id, category: 'Layout', level: study.id === 'responsive-layout' ? 'PLANE' : 'LINE',
  index: String(index + 2).padStart(2, '0'),
  title: study.title.en, definition: study.definition.en, principle: study.principle.en,
  examples: [
    layoutExample(study, 0), layoutExample(study, 1),
    layoutExample(study, 2), layoutExample(study, 3),
  ],
}))

function layoutExample(study: LayoutContent, position: 0 | 1 | 2 | 3) {
  return { kind: 'layout' as const, topic: study.id, position, label: study.examples[position].label.en, note: '' }
}
