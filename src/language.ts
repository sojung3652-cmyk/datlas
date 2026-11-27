import { typographyContent } from './studies/typographyCatalog'
import { colorContent } from './studies/colorCatalog'
import { massContent } from './studies/massCatalog'
import { createContext, useContext } from 'react'
import type { Study } from './studies'

export type Language = 'en' | 'ko'
export const languageKey = 'design-atlas-language'
export function initialLanguage(): Language {
  try { return localStorage.getItem(languageKey) === 'ko' ? 'ko' : 'en' }
  catch { return 'en' }
}

export const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => {} })

const korean: Record<string, string> = {
  'Introduction': '입문',
  'Basic concept': '기본 개념',
  'Search studies': '학습자료 검색', 'Search by topic or keyword': '주제 또는 키워드로 검색',
  'Study groups': '스터디 그룹', 'Back to categories': '카테고리로 돌아가기',
  'Previous page': '이전 페이지', 'Next page': '다음 페이지',
  'Material & Texture': '재질과 질감', 'Applied example': '적용 사례',
  'Clear search': '검색어 지우기', 'Study pages': '스터디 페이지',
  'No studies match your search.': '검색 조건에 맞는 스터디가 없습니다.',
  'Typography gives language a visual voice.': '타이포그래피는 언어에 시각적인 목소리를 부여한다.',
  'Typography groups': '타이포그래피 스터디 그룹',
  'Accessibility': '접근성', 'Wordmark': '워드마크',
  'Motion': '모션', 'Brand': '브랜드', 'POINT': '점', 'LINE': '선', 'PLANE': '면', 'VOLUME': '입체', 'WORLD': '세계',
  'Color groups': '색채 스터디 그룹',
  'Color is structure, hierarchy, atmosphere, and meaning.': '색은 구조이자 위계이며, 분위기이자 의미다.',
  'Web Application': '웹 적용', 'Common Mistake': '흔한 실수', 'Related Concepts': '관련 개념',
  'Luxury Minimalism': '럭셔리 미니멀리즘', 'Warm Neutral': '웜 뉴트럴', 'Dark Mode': '다크 모드', 'Design System': '디자인 시스템',
  'Continue': '계속', 'Example text': '예시 텍스트',
  'Design Atlas': '디자인 아틀라스',
  'Study index': '스터디 인덱스', 'About': '소개',
  'Main navigation': '주 메뉴', 'Study categories': '스터디 카테고리',
  'Fig. 01 / Form & proportion': '그림 01 / 형태와 비례',
  'A visual reference for the fundamentals of design. Explore color, typography, composition, interaction, and the way we see.': '디자인의 기본을 살펴보는 시각 자료집. 색채, 타이포그래피, 구성, 인터랙션과 우리가 보는 방식을 탐구합니다.',
  'Explore the index': '스터디 살펴보기',
  'All': '전체', 'Color': '색채', 'Type': '타이포그래피', 'Typography': '타이포그래피',
  'Layout': '레이아웃', 'Perception': '시각 인지', 'UI': 'UI', 'UI Styles': 'UI 스타일',
  'Material': '재질과 질감', 'Materials': '재질과 질감',
  'A visual study archive. First edition.': '시각 디자인 스터디 아카이브. 첫 번째 에디션.',
  'Back to top': '맨 위로', 'Close': '닫기',
  'THE FIELD JOURNAL': '현장 기록', 'On the coast': '해안에서', 'An atlas of the shoreline': '해안선 도감',
  'STUDIO / SYSTEM': '스튜디오 / 시스템', 'Interface': '인터페이스', 'Tools for everyday work': '일상 업무를 위한 도구',
  'MAISON / OBJECTS': '메종 / 오브제', 'Quiet form': '고요한 형태', 'Collection 01 · Objects in use': '컬렉션 01 · 일상의 오브제',
  'NOTES ON DESIGN': '디자인 노트', 'Open space': '열린 공간', 'The rhythm between words': '단어 사이의 리듬',
  'Fieldwork': '현장 작업', 'Selected projects': '주요 프로젝트', 'Dune House': '모래언덕 집', 'Soft Quarry': '고요한 채석장',
  'The Review': '리뷰', 'Notes on culture': '문화 노트', 'A slower city': '느린 도시', 'Field notes': '현장 노트', 'In print': '인쇄판',
  'Object Index': '오브제 목록', 'Edition 01 / Shop': '에디션 01 / 상점', 'Vessel': '용기', 'Form': '형태', 'Arc': '곡선', 'Fold': '접힘',
  'Common Ground': '공통의 공간', 'Design & spaces': '디자인과 공간', 'The shared room': '공유하는 방', 'On materials': '재료에 관하여', 'New work': '신작',
  'FORM / EDITORIAL': '형태 / 에디토리얼', 'Essays on the built world': '건축 환경에 관한 에세이',
  'Studio overview': '스튜디오 개요', 'Read rate': '열람률', 'Issues': '발행 호수', 'Publication analytics': '발행 통계',
  'OBJECTS / SHOP': '오브제 / 상점', 'Arc vessel': '곡선형 화병', 'Edition of 50': '50점 한정',
  '18 OCT / STUDIO 03': '10월 18일 / 스튜디오 03', 'FORM': '형태', 'An evening of design': '디자인의 저녁',
}

type KoreanStudy = { title: string; definition: string; principle: string; examples: readonly [readonly [string, string], readonly [string, string], readonly [string, string], readonly [string, string]] }

const koreanStudies: Record<string, KoreanStudy> = {
  '05': {
    title: '그리드 시스템', definition: '화면의 요소를 일정한 기준에 맞춰 배치하는 구조.', principle: '공통된 정렬선과 간격으로 서로 다른 콘텐츠를 정돈한다.',
    examples: [['2열', '같은 너비의 두 열이 포트폴리오 프로젝트에 같은 비중을 준다.'], ['4열', '주요 기사는 두 열을, 나머지는 각각 한 열을 사용한다.'], ['8열', '상품 네 개가 각각 두 열을 사용해 같은 공간을 차지한다.'], ['12열', '주요 기사에는 여섯 열을, 보조 기사 두 편에는 각각 세 열을 배정한다.']],
  },
  '06': {
    title: '시각적 위계', definition: '한 화면에서 요소가 시선을 끄는 순서.', principle: '어디를 먼저 봐야 하는지 쉽게 구별할 수 있게 한다.',
    examples: [['크기', '큰 제목이 에디토리얼 랜딩 페이지에서 가장 먼저 읽힌다.'], ['대비', '어두운 패널이 대시보드의 핵심 지표를 강조한다.'], ['위치', '상품 이미지가 제목과 에디션 설명보다 먼저 보이는 위치에 놓인다.'], ['고립', '행사 이름 주위의 여백이 포스터의 초점을 만든다.']],
  },
}

export function useLanguage() {
  const state = useContext(LanguageContext)
  const ko = state.language === 'ko'
  return {
    ...state,
    t: (text: string) => ko ? korean[text] ?? text : text,
    studyIndex: (category: string, id: string) => ko ? `${korean[category] ?? category} / 스터디 ${id}` : `${category} / Study ${id}`,
    count: (number: number) => {
      const value = String(number).padStart(2, '0')
      return ko ? `스터디 ${value}개` : `${value} ${number === 1 ? 'study' : 'studies'}`
    },
    empty: (category: string) => ko ? `${korean[category] ?? category} 스터디는 다음 에디션에서 만나볼 수 있습니다.` : `${category} studies are planned for a future edition.`,
  }
}

export function getStudyContent(id: string) {
  return colorContent.get(id) ?? typographyContent.get(id) ?? layoutContent.get(id) ?? massContent.get(id)
}

export function localizeStudy(study: Study, language: Language): Study {
  const content = getStudyContent(study.id)
  if (content && 'definition' in content) {
    const labels = study.examples.map((example, index) => ({ ...example, label: content.examples[index].label[language] }))
    return {
      ...study,
      title: content.title[language], definition: content.definition[language], principle: content.principle[language],
      examples: [labels[0], labels[1], labels[2], labels[3]],
    }
  }
  if (content && !koreanStudies[study.id]) {
    const labels = study.examples.map((example, index) => ({ ...example, label: content.examples[index][language] }))
    return {
      ...study, title: content.title[language], definition: (content.concept ?? content.summary)[language], principle: content.principle[language],
      examples: [labels[0], labels[1], labels[2], labels[3]],
    }
  }
  const copy = koreanStudies[study.id]
  if (language === 'en' || !copy) return study
  const { examples, ...text } = copy
  function localizeExample(index: 0 | 1 | 2 | 3) {
    const [label, note] = examples[index]
    return { ...study.examples[index], label, note }
  }
  return { ...study, ...text, examples: [localizeExample(0), localizeExample(1), localizeExample(2), localizeExample(3)] }
}

const applications: Record<string, readonly [string, string, string, string, string, string]> = {
  '05': ["Choose tracks that support the content and its proportions.","Forcing equal spans can undermine the reading order.","Use a flexible grid whose columns can combine or collapse at smaller widths.","콘텐츠의 양과 비율에 맞는 열 구조를 선택한다.","모든 요소에 같은 너비를 강제하면 읽는 순서가 흐려질 수 있다.","작은 화면에서 열을 합치거나 줄일 수 있는 유연한 그리드를 사용한다."],
  '06': ["Make the most important element the clearest focal point.","Several equally strong focal points can pull attention in different directions.","Give the main headline or primary action a distinct visual treatment.","가장 중요한 요소가 뚜렷한 초점이 되도록 구성한다.","강조점이 여러 곳에 있으면 시선이 흩어진다.","핵심 제목이나 주요 행동에 구별되는 시각 스타일을 적용한다."],
}

export function studyGuidance(id: string, language: Language) {
  const copy = applications[id]
  if (!copy) return []
  return language === 'ko'
    ? [['활용 방법', copy[3]], ['흔한 실수', copy[4]], ['웹 디자인 적용', copy[5]]]
    : [['Usage', copy[0]], ['Common mistakes', copy[1]], ['Web design application', copy[2]]]
}
import { layoutContent } from './studies/layoutCatalog'
