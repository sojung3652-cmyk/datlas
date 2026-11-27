import type { Category } from '../studies'

type Bilingual = { en: string; ko: string }
type CategoryGuide = { title: Bilingual; paragraphs: readonly Bilingual[] }

export const categoryGuides: Record<Category, CategoryGuide> = {
  'Color': {
    title: {"en":"What is color in design?","ko":"디자인에서 색채란?"},
    paragraphs: [
      {"en":"Color gives a design structure before the viewer reads a word. A light surface, dark text, and a small accent already suggest where to start looking and where to act.","ko":"색채는 글을 읽기 전부터 화면의 구조를 전달한다. 밝은 표면, 어두운 글자, 작은 강조색만으로도 어디를 먼저 보고 어디서 행동할지 짐작할 수 있다."},
      {"en":"Separate hue, value, and saturation. Hue tells you the color family, value tells you how light or dark it is, and saturation tells you how intense it looks. Change one at a time to see what it contributes.","ko":"색상, 명도, 채도를 나눠 보자. 색상은 색의 계열, 명도는 밝고 어두운 정도, 채도는 선명한 정도다. 한 번에 하나씩만 바꾸면 각 속성이 화면에 어떤 역할을 하는지 보인다."},
      {"en":"Start with a neutral background and set one accent for the main action. Then view the page in grayscale. If the main action still stands out, the hierarchy has support from value as well as hue.","ko":"중성 배경과 주요 행동에 쓸 강조색 하나로 시작해 보자. 화면을 흑백으로 바꿔도 주요 행동이 눈에 띈다면 색상뿐 아니라 명도도 위계를 뒷받침하고 있다."},
    ],
  },
  'Typography': {
    title: {"en":"What is typography?","ko":"타이포그래피란?"},
    paragraphs: [
      {"en":"Typography is how written language is given a visual form. A typeface provides the letter shapes. Typography is what you do with those shapes on a page, including their size, weight, spacing, alignment, and arrangement.","ko":"타이포그래피는 글에 시각적인 형태를 부여하는 일이다. 서체가 글자 모양을 제공한다면, 타이포그래피는 그 글자를 화면에 어떤 크기와 굵기, 간격, 정렬로 배치할지 결정한다."},
      {"en":"It operates at three scales. The shape of a letter affects how easily you recognize it. Letter spacing, line length, and line height affect how comfortably you read a paragraph. Differences between headings, body text, and captions help you navigate the page.","ko":"세 가지 규모에서 작동한다. 글자 모양은 한 글자를 얼마나 쉽게 알아보는지에 영향을 준다. 자간, 한 줄의 길이, 줄 높이는 문단을 얼마나 편하게 읽는지를 좌우한다. 제목·본문·캡션의 차이는 페이지를 탐색하는 단서가 된다."},
      {"en":"Imagine an article with a headline, a short introduction, and a photo caption. The headline should be easy to find, the introduction should flow across several lines, and the caption should stay visibly connected to its photo. One typeface can do all three jobs through size, weight, and position.","ko":"제목, 짧은 도입문, 사진 캡션이 있는 글을 떠올려 보자. 제목은 쉽게 눈에 띄어야 하고, 도입문은 여러 줄에 걸쳐 자연스럽게 읽혀야 하며, 캡션은 사진과의 관계가 보여야 한다. 하나의 서체도 크기·굵기·위치 조절만으로 이 세 역할을 해낼 수 있다."},
      {"en":"Try setting one article with a single family and just three text roles. Read it on a phone and on a wider screen. Look for the first line your eye lands on and any lines that become hard to follow when the width changes.","ko":"서체 하나로 제목, 본문, 캡션 세 역할만 사용해 글 한 편을 배치해 보자. 휴대폰과 넓은 화면에서 읽어 보고, 시선이 처음 닿는 줄과 화면 너비가 바뀔 때 따라 읽기 어려워지는 줄을 확인한다."},
    ],
  },
  'Layout': {
    title: {"en":"What is layout?","ko":"레이아웃이란?"},
    paragraphs: [
      {"en":"Layout is the arrangement of content in space. It determines where a reader starts, what belongs together, what takes priority, and how the eye moves between sections. Empty space is part of that arrangement.","ko":"레이아웃은 공간 안에 콘텐츠를 배치하는 일이다. 독자가 어디서 읽기 시작하고, 무엇을 한 묶음으로 보며, 어떤 요소에 먼저 주목하고, 섹션 사이를 어떻게 이동할지 결정한다. 여백도 그 배치의 일부다."},
      {"en":"Begin by grouping content by purpose. Then establish edges or axes for alignment, choose the spacing between groups, and decide which element needs the most space. A grid makes those decisions repeatable across a page or a series of pages.","ko":"먼저 목적에 따라 콘텐츠를 묶는다. 다음으로 정렬의 기준이 되는 가장자리나 축을 잡고, 그룹 사이 간격을 정한 뒤, 어느 요소에 가장 많은 공간을 줄지 결정한다. 그리드는 이런 결정을 한 페이지 안에서, 또는 여러 페이지에 걸쳐 일관되게 적용하도록 돕는다."},
      {"en":"For example, an article and its related links can sit side by side on a wide screen. On a phone, the links can move below the article. The arrangement changes, while the reading priority stays clear.","ko":"예를 들어 넓은 화면에서는 기사와 관련 링크를 나란히 둘 수 있다. 휴대폰에서는 관련 링크를 기사 아래로 옮길 수 있다. 배치는 달라져도 무엇을 먼저 읽어야 하는지는 분명해야 한다."},
      {"en":"Try sketching the same page with plain rectangles and real section labels. Look at the order before choosing colors or fonts. If a reader can find the main content and its next action in that sketch, the layout is already doing useful work.","ko":"같은 페이지를 사각형과 실제 섹션 이름만으로 그려 보자. 색이나 서체를 정하기 전에 읽는 순서를 확인한다. 스케치만으로도 주요 콘텐츠와 다음 행동을 찾을 수 있다면 레이아웃이 제 역할을 하고 있는 것이다."},
    ],
  },
  'Perception': {
    title: {"en":"What is visual perception?","ko":"시각 인지란?"},
    paragraphs: [
      {"en":"Perception is how people make sense of what they see. The eye notices relationships such as proximity, similarity, and contrast before a reader consciously analyzes the individual elements.","ko":"시각 인지는 눈에 들어온 정보를 이해하는 과정이다. 사람은 요소 하나하나를 의식적으로 분석하기 전에 근접성, 유사성, 대비 같은 관계를 먼저 알아차린다."},
      {"en":"Related items can appear grouped when they share spacing, boundaries, or visual style. An element that breaks that pattern often becomes a focal point.","ko":"관련 요소는 간격이나 경계, 시각적 스타일을 공유할 때 한 그룹으로 보일 수 있다. 그 패턴에서 벗어나는 요소는 흔히 시선의 초점이 된다."},
      {"en":"Look at a page for a few seconds, then look away. Recall what you noticed first and which items felt connected. Compare that impression with the order you intended.","ko":"페이지를 몇 초 동안 보고 시선을 돌려 보자. 가장 먼저 본 요소와 서로 연결돼 보였던 항목을 떠올리고, 의도한 읽기 순서와 비교한다."},
    ],
  },
  'UI Styles': {
    title: {"en":"What is UI style?","ko":"UI 스타일이란?"},
    paragraphs: [
      {"en":"UI style is the visual language of an interface. Type, surfaces, borders, icons, and spacing work together to give controls a recognizable appearance and express a consistent character.","ko":"UI 스타일은 인터페이스의 시각 언어다. 글자, 표면, 테두리, 아이콘, 여백이 함께 작동해 컨트롤을 쉽게 알아볼 수 있게 하고 일관된 인상을 만든다."},
      {"en":"A style can also communicate function. A button’s shape, contrast, and state changes help the user understand what is clickable, selected, or unavailable.","ko":"스타일은 기능도 전달한다. 버튼의 형태, 대비, 상태 변화는 무엇을 누를 수 있는지, 무엇이 선택됐거나 사용할 수 없는지 알려 준다."},
      {"en":"Design the same button in its default, hover, focus, and disabled states. Check that the states are distinct and still look like the same control.","ko":"같은 버튼을 기본, 호버, 포커스, 비활성 상태로 그려 보자. 상태끼리 구분되면서도 하나의 컨트롤로 인식되는지 확인한다."},
    ],
  },
  'UX': {
    title: {"en":"What is UX?","ko":"UX란?"},
    paragraphs: [
      {"en":"User experience is what a person goes through while trying to accomplish a goal. It includes finding the starting point, understanding choices, seeing what happened, and recovering when something goes wrong.","ko":"사용자 경험은 사람이 목표를 이루려 할 때 겪는 전체 과정이다. 시작점을 찾고, 선택지를 이해하고, 결과를 확인하고, 문제가 생겼을 때 회복하는 과정이 포함된다."},
      {"en":"A single screen may look clear in isolation while the whole journey still feels confusing. Study the steps before and after that screen to see where the user loses context or confidence.","ko":"한 화면만 보면 명확해도 전체 과정은 혼란스러울 수 있다. 앞뒤 단계를 함께 보면 사용자가 맥락을 놓치거나 다음 행동을 확신하지 못하는 지점이 드러난다."},
      {"en":"Pick one task, such as saving an item. Walk through it from the first cue to the confirmation, then try it again after making a mistake. Notice where the interface helps you recover.","ko":"항목 저장처럼 한 가지 작업을 정해 첫 단서부터 완료 확인까지 따라가 보자. 다음에는 일부러 실수해 보고, 인터페이스가 어떻게 회복을 돕는지 확인한다."},
    ],
  },
  'Materials': {
    title: {"en":"What are materials in interface design?","ko":"인터페이스에서 재질이란?"},
    paragraphs: [
      {"en":"Materials describe how digital surfaces appear to behave. Opacity, texture, shadows, and light can make a flat interface suggest paper, glass, or layers of different depth.","ko":"재질은 디지털 표면이 어떻게 보이고 반응하는지를 나타낸다. 투명도, 질감, 그림자, 빛으로 평면 화면에서도 종이, 유리, 깊이가 다른 레이어를 떠올리게 할 수 있다."},
      {"en":"Use surface differences to explain relationships. A shadow can distinguish a floating panel from the content below it. A quiet border might be enough when two items share the same plane.","ko":"표면의 차이로 요소 사이의 관계를 설명한다. 그림자는 떠 있는 패널과 그 아래 콘텐츠를 구분할 수 있다. 두 요소가 같은 평면에 있다면 얇은 테두리만으로 충분할 수 있다."},
      {"en":"Compare a panel with a border, a shadow, and a translucent surface. Ask which treatment makes the panel’s role clearest while keeping its content easy to read.","ko":"패널에 테두리, 그림자, 반투명 표면을 각각 적용해 비교해 보자. 내용을 읽기 편하게 유지하면서 패널의 역할이 가장 분명해지는 방식을 고른다."},
    ],
  },
  'Motion': {
    title: {"en":"What is motion in design?","ko":"디자인에서 모션이란?"},
    paragraphs: [
      {"en":"Motion uses change over time to explain what is happening. It can show where an element came from, confirm an action, or connect two states of the same interface.","ko":"모션은 시간에 따른 변화로 무슨 일이 일어나는지 설명한다. 요소가 어디서 나왔는지 보여주고, 행동의 결과를 확인해 주거나, 같은 인터페이스의 두 상태를 연결할 수 있다."},
      {"en":"Duration, easing, and direction affect how a transition reads. A short fade can mark a small change. A move from the edge can explain where a panel belongs.","ko":"길이, 이징, 방향은 전환이 어떻게 읽히는지에 영향을 준다. 짧은 페이드는 작은 변화를 알릴 수 있고, 가장자리에서 들어오는 움직임은 패널의 위치 관계를 설명할 수 있다."},
      {"en":"Open a panel with and without motion. Keep the controls usable in both versions, and make sure the final state communicates the same information when motion is reduced.","ko":"모션이 있는 버전과 없는 버전에서 패널을 각각 열어 보자. 두 경우 모두 조작할 수 있어야 하고, 모션을 줄여도 최종 상태가 같은 정보를 전달해야 한다."},
    ],
  },
  'Brand': {
    title: {"en":"What is brand in design?","ko":"디자인에서 브랜드란?"},
    paragraphs: [
      {"en":"A brand is the set of associations people build through repeated encounters. Visual identity contributes to those associations through type, color, imagery, layout, and recognizable marks.","ko":"브랜드는 사람들이 반복해서 접하며 형성하는 인상의 묶음이다. 시각 아이덴티티는 서체, 색, 이미지, 레이아웃, 알아보기 쉬운 표식으로 그 인상에 기여한다."},
      {"en":"Consistency comes from repeating a few recognizable decisions across different contexts. A website, a caption, and a presentation can share a voice while using different compositions.","ko":"일관성은 맥락이 달라져도 알아볼 수 있는 몇 가지 결정을 반복할 때 생긴다. 웹사이트, 캡션, 발표 자료는 구성이 달라도 같은 목소리를 낼 수 있다."},
      {"en":"Compare three touchpoints from the same project. Identify the decisions that make them feel connected, then test whether the same character comes through with the logo covered.","ko":"같은 프로젝트의 세 접점을 비교해 보자. 서로 같은 계열로 느껴지게 하는 결정을 찾고, 로고를 가려도 같은 인상이 전달되는지 확인한다."},
    ],
  },
}
