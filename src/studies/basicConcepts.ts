type Concept = { en: string; ko: string }

export const basicConcepts: Record<string, Concept> = {
  'hue': {
    en: "Hue answers which color family a sample belongs to. A pale blue and a navy can share a hue even though their lightness differs.",
    ko: "색상은 색이 어느 계열에 속하는지 알려 준다. 하늘색과 남색은 밝기가 달라도 같은 파랑 계열일 수 있다.",
  },
  'value': {
    en: "Imagine viewing a composition in grayscale. The differences you can still see are differences in value.",
    ko: "화면을 흑백으로 바꿔 본다고 생각해 보자. 그래도 보이는 밝고 어두운 차이가 명도 차이다.",
  },
  'saturation': {
    en: "Compare a clear red with a grayish red of similar brightness. The clear red has higher saturation and usually draws more attention.",
    ko: "밝기가 비슷한 선명한 빨강과 회색빛 빨강을 비교해 보자. 선명한 빨강은 채도가 더 높아 대개 시선을 더 끈다.",
  },
  'tone': {
    en: "Tone describes the overall character produced by a color’s lightness and saturation. Different hues can feel related when they share a similar tone.",
    ko: "톤은 명도와 채도가 함께 만드는 색의 전체 인상이다. 색상이 달라도 톤이 비슷하면 한 묶음으로 느껴진다.",
  },
  'temperature': {
    en: "Warm and cool are often the result of comparison. The same neutral may feel warm beside blue and cool beside ochre.",
    ko: "따뜻함과 차가움은 주변 색에 따라 달라진다. 같은 중성색도 파랑 옆에서는 따뜻하고 황토색 옆에서는 차갑게 느껴질 수 있다.",
  },
  'vivid': {
    en: "A vivid color has strong chroma. Even a small area can become the focal point when the surrounding colors are quieter.",
    ko: "비비드 톤은 채도가 높고 선명하다. 차분한 색에 둘러싸이면 작은 면적도 초점이 될 수 있다.",
  },
  'bright': {
    en: "Bright tones combine clarity with a relatively light value. Compare them with vivid tones to see how greater lightness changes their energy.",
    ko: "브라이트 톤은 선명함과 비교적 높은 명도를 함께 지닌다. 비비드와 나란히 두면 밝기 차이가 분위기를 어떻게 바꾸는지 보인다.",
  },
  'light': {
    en: "Light tones keep their hue recognizable at a high value. They can cover a large surface while leaving room for darker text and accents.",
    ko: "라이트 톤은 명도가 높으면서도 색상 계열이 잘 드러난다. 넓은 표면에 쓰고 어두운 글자나 강조색으로 위계를 만들 수 있다.",
  },
  'pale': {
    en: "Pale tones sit close to white. Two pale surfaces may look nearly identical, so spacing or a border can help separate them.",
    ko: "페일 톤은 흰색에 가깝다. 옅은 표면끼리는 구분이 어려울 수 있어 여백이나 테두리가 경계에 도움이 된다.",
  },
  'soft': {
    en: "Soft tones keep some color identity while reducing intensity. They give supporting surfaces character without drawing attention away from the focus.",
    ko: "소프트 톤은 색상의 인상을 남긴 채 자극을 줄인다. 보조 표면에 색감을 주면서도 주요 요소를 돋보이게 할 수 있다.",
  },
  'light-grayish': {
    en: "A light grayish color combines high lightness with low saturation. It can establish a color family across several subdued surfaces.",
    ko: "라이트 그레이시 톤은 명도가 높고 채도가 낮다. 차분한 여러 표면에 같은 색상 계열의 인상을 줄 수 있다.",
  },
  'grayish': {
    en: "Grayish tones keep a perceptible hue but have little chroma. Value differences help nearby tones read as separate layers.",
    ko: "그레이시 톤은 색상은 느껴지지만 채도가 낮다. 가까운 톤을 층으로 구분할 때는 명도 차이가 중요하다.",
  },
  'dull': {
    en: "Dull colors feel grounded because they combine restrained chroma with lower lightness. A clean neutral can make their undertone easier to see.",
    ko: "덜 톤은 낮은 채도와 낮은 편의 명도가 만나 안정적인 느낌을 준다. 깔끔한 중성색 옆에 두면 색의 기운이 더 잘 보인다.",
  },
  'dark': {
    en: "A dark tone is defined mainly by low lightness. Navy and dark forest green can both be dark while remaining visibly different in hue.",
    ko: "다크 톤은 주로 낮은 명도로 구분한다. 남색과 짙은 초록은 모두 어둡지만 색상은 구별된다.",
  },
  'deep': {
    en: "Deep colors combine low lightness with enough chroma to retain richness. Burgundy next to charcoal shows how chroma can remain strong at a dark value.",
    ko: "딥 톤은 명도가 낮아도 색이 풍부하게 느껴진다. 버건디와 차콜을 나란히 두면 어두운 색에서도 채도 차이가 드러난다.",
  },
  'tone-on-tone': {
    en: "Build a palette around one hue family, then give each tone a role. A light surface, a midtone layer, and dark text create depth without a hue shift.",
    ko: "한 색상 계열 안에서 각 톤에 역할을 준다. 밝은 표면, 중간 톤의 레이어, 어두운 글자를 조합하면 색상 변화 없이 깊이가 생긴다.",
  },
  'tone-in-tone': {
    en: "Start with a shared tonal character, such as light and soft, then vary the hue. The palette feels connected even when its hues are different.",
    ko: "밝고 부드러운 느낌처럼 공통 톤을 먼저 정하고 색상을 바꾼다. 색상이 달라도 전체 인상이 이어진다.",
  },
  'monochromatic': {
    en: "A monochromatic palette develops one hue through lighter, darker, or less saturated versions. Its hierarchy depends on how these versions are assigned.",
    ko: "모노크로매틱 팔레트는 한 색상을 밝게, 어둡게, 또는 덜 선명하게 바꿔 구성한다. 각 변형에 어떤 역할을 주느냐에 따라 위계가 생긴다.",
  },
  'analogous': {
    en: "Adjacent hues share part of their color character, which makes transitions feel gradual. Give the focal element extra lightness or chroma so it remains distinct.",
    ko: "이웃한 색상은 일부 색감을 공유해 전환이 자연스럽다. 초점에는 명도나 채도 차이를 줘 주변과 구분한다.",
  },
  'complementary': {
    en: "Opposite hues create a strong distinction when placed together. Using one over a larger area lets the smaller color work as an accent.",
    ko: "색상환에서 마주 보는 색은 나란히 놓으면 차이가 크게 느껴진다. 한 색을 넓게 쓰면 다른 색은 작은 강조점으로 기능한다.",
  },
  'split-complementary': {
    en: "Start with one hue, find its opposite, then use the two neighbors of that opposite. This keeps the contrast while offering two accent choices.",
    ko: "기준 색의 보색을 찾고, 그 보색 양옆의 두 색을 사용한다. 보색의 대비를 살리면서 두 가지 강조색을 선택할 수 있다.",
  },
  'triadic': {
    en: "Three evenly spaced hues create variety. Changing their area and tone keeps the three from competing equally.",
    ko: "색상환에서 간격이 같은 세 색은 다양성을 만든다. 면적과 톤을 조절하면 세 색이 같은 강도로 경쟁하지 않는다.",
  },
  'tetradic': {
    en: "A tetradic palette brings together two complementary pairs. Choosing a dominant hue and giving the others smaller roles makes the palette easier to control.",
    ko: "테트라딕 팔레트는 두 쌍의 보색을 함께 쓴다. 주조색을 정하고 나머지 색에 작은 역할을 주면 조합을 다루기 쉽다.",
  },
  'achromatic': {
    en: "Achromatic design uses whites, grays, and blacks. Lightness, spacing, and typography carry hierarchy when hue is absent.",
    ko: "무채색 디자인은 흰색, 회색, 검정을 쓴다. 색상 차이가 없는 만큼 명도, 여백, 타이포그래피가 위계를 만든다.",
  },
  'warm-cool-harmony': {
    en: "Warm and cool colors can set apart the foreground and background. A neutral between them can soften the transition.",
    ko: "난색과 한색의 차이로 앞뒤 레이어를 구분할 수 있다. 그 사이에 중성색을 두면 전환이 부드러워진다.",
  },
  'dominant-color': {
    en: "The dominant color establishes the overall mood through area or repetition. It can be a quiet neutral that makes small accents easier to notice.",
    ko: "주조색은 넓은 면적이나 반복으로 전체 분위기를 정한다. 차분한 중성색도 주조색이 되어 작은 강조색을 살릴 수 있다.",
  },
  'accent-color': {
    en: "An accent stands out through limited use. Reusing the same accent for the same role helps users recognize it across screens.",
    ko: "강조색은 제한적으로 쓸수록 눈에 띈다. 같은 역할에 같은 강조색을 쓰면 화면이 바뀌어도 쉽게 알아볼 수 있다.",
  },
  '60-30-10': {
    en: "Think of 60–30–10 as a starting balance between large surfaces, supporting areas, and small highlights. Adjust the areas to fit the content.",
    ko: "60–30–10은 넓은 표면, 보조 영역, 작은 강조 요소의 비중을 계획하는 출발점이다. 콘텐츠에 맞춰 각 면적을 조정한다.",
  },
  'color-contrast': {
    en: "Contrast can come from hue, lightness, saturation, or temperature. Decide what should stand out before choosing which difference to emphasize.",
    ko: "대비는 색상, 명도, 채도, 색온도의 차이에서 생긴다. 무엇을 돋보이게 할지 정한 뒤 어떤 차이를 강조할지 선택한다.",
  },
  'accessibility-contrast': {
    en: "Readability depends on the contrast between the foreground and its actual background. Text, controls, and focus indicators each need to remain distinguishable in context.",
    ko: "가독성은 요소와 실제 배경 사이의 대비에 달려 있다. 글자, 컨트롤, 포커스 표시는 각각 사용되는 화면에서 구별돼야 한다.",
  },
  'semantic-colors': {
    en: "Give each state a consistent meaning and reinforce it with words or symbols. A warning should still be recognizable without distinguishing its color.",
    ko: "상태마다 일관된 의미를 주고 글자나 기호로 보완한다. 색을 구별하기 어려워도 경고 상태임을 알아볼 수 있어야 한다.",
  },
  'color-tokens': {
    en: "A token names what a color does, such as text, surface, or border. The underlying value can change by theme while the role stays consistent.",
    ko: "토큰은 텍스트, 표면, 테두리처럼 색의 역할을 이름 붙인 것이다. 테마에 따라 실제 색상 값이 달라져도 역할은 그대로 유지된다.",
  },
  'baseline': {
    en: "A baseline is the line letters rest on. Aligning that line across differently sized text creates a shared visual reference.",
    ko: "베이스라인은 글자가 놓이는 선이다. 크기가 다른 글자도 이 선을 맞추면 시각적 기준을 공유할 수 있다.",
  },
  'x-height': {
    en: "X-height is the height of lowercase letters such as x. Two fonts set at the same size can look noticeably different when their x-heights differ.",
    ko: "엑스하이트는 x처럼 위로 뻗는 획이 없는 소문자의 높이다. 같은 크기로 설정해도 엑스하이트가 다르면 글자가 달리 보인다.",
  },
  'cap-height': {
    en: "Cap height measures the height of flat-topped capitals from the baseline. It is useful when matching capital labels to icons.",
    ko: "캡 높이는 베이스라인부터 윗부분이 평평한 대문자 끝까지의 높이다. 대문자 라벨과 아이콘의 크기를 맞출 때 유용하다.",
  },
  'ascender': {
    en: "An ascender is the part of a lowercase glyph that rises above the x-height, as in b or h. It contributes to the overall height of a line of type.",
    ko: "어센더는 b나 h처럼 엑스하이트 위로 솟는 소문자의 부분이다. 한 줄의 글자가 차지하는 높이에 영향을 준다.",
  },
  'descender': {
    en: "A descender extends below the baseline, as in p or y. Leave enough vertical space for descenders where lines or controls sit close together.",
    ko: "디센더는 p나 y처럼 베이스라인 아래로 내려오는 부분이다. 줄이나 컨트롤이 가까이 놓일 때 아래로 내려오는 획의 공간을 확보한다.",
  },
  'serif-anatomy': {
    en: "A serif is a finishing stroke at the end of a main stroke. Its thickness and the way it joins the stem contribute to the character of the face.",
    ko: "세리프는 주요 획 끝에 붙는 마무리 획이다. 굵기와 몸통에 이어지는 형태가 서체의 인상을 바꾼다.",
  },
  'counter': {
    en: "The counter is the empty space enclosed or partly enclosed by a letter. Larger openings can keep shapes distinct at small sizes.",
    ko: "카운터는 글자 안에서 완전히 또는 일부 둘러싸인 빈 공간이다. 내부 공간과 열린 부분이 넉넉하면 작은 크기에서도 글자를 구분하기 쉽다.",
  },
  'stroke': {
    en: "Strokes make up a letter’s visible shape. Compare the thickness of its main strokes and fine strokes to see how much contrast the face has.",
    ko: "획은 글자의 형태를 이루는 선이다. 굵은 주요 획과 가는 획을 비교하면 서체의 획 대비를 파악할 수 있다.",
  },
  'serif-typeface': {
    en: "Serif faces differ in stroke contrast and the shape of their terminals. Those details can change the impression from soft and literary to crisp and formal.",
    ko: "세리프 서체는 획 대비와 끝부분의 형태가 서로 다르다. 이런 차이로 부드럽고 문학적인 느낌부터 선명하고 격식 있는 느낌까지 달라진다.",
  },
  'sans-serif': {
    en: "Sans serifs omit terminal serifs, but their proportions and curves still vary. Compare several families at the same size to see the differences.",
    ko: "산세리프는 획 끝의 세리프가 없지만 비례와 곡선은 다양하다. 같은 크기로 여러 계열을 놓으면 차이가 보인다.",
  },
  'grotesk': {
    en: "Grotesks often combine fairly even strokes with compact openings and sturdy forms. They can give labels and headlines a direct, utilitarian character.",
    ko: "그로테스크는 비교적 고른 획, 좁은 열린 부분, 단단한 형태가 특징인 경우가 많다. 라벨과 제목에 간결하고 실용적인 느낌을 줄 수 있다.",
  },
  'geometric-sans': {
    en: "Geometric sans faces often build letters around circles and simple shapes. Those repeated proportions give words a consistent visual rhythm.",
    ko: "기하학적 산세리프는 원과 단순한 도형을 바탕으로 글자를 만드는 경우가 많다. 비슷한 비례가 반복되면서 단어에 일정한 리듬이 생긴다.",
  },
  'humanist-sans': {
    en: "Humanist sans faces often use open shapes and proportions influenced by handwriting. These differences show up clearly in small lowercase text.",
    ko: "휴머니스트 산세리프는 열린 형태와 손글씨에서 비롯된 비례를 자주 사용한다. 작은 소문자에서 이런 특징을 특히 확인하기 쉽다.",
  },
  'slab-serif': {
    en: "Slab serifs have substantial terminal strokes. Their terminals add visual weight, which can make a short heading feel grounded.",
    ko: "슬랩 세리프는 끝부분의 획이 두툼하다. 이 획이 시각적 무게를 더해 짧은 제목에 안정감을 줄 수 있다.",
  },
  'display-typeface': {
    en: "Display faces make distinctive details visible at larger sizes. Test those details at the intended size before choosing the face for a heading.",
    ko: "디스플레이 서체는 큰 크기에서 특징적인 디테일이 잘 드러난다. 제목에 쓰기 전 실제 사용할 크기에서 확인한다.",
  },
  'monospace': {
    en: "In a monospace face, every character occupies the same width. Columns of numbers or code then line up character by character.",
    ko: "고정폭 서체에서는 문자마다 같은 너비를 차지한다. 그래서 숫자나 코드의 열이 글자 단위로 정렬된다.",
  },
  'hierarchy': {
    en: "Readers use size, weight, contrast, and position to decide what to read first. Assign those cues consistently to titles, summaries, and supporting text.",
    ko: "독자는 크기, 굵기, 대비, 위치로 무엇을 먼저 읽을지 판단한다. 제목, 요약, 보조 문구에 이런 단서를 일관되게 배치한다.",
  },
  'type-scale': {
    en: "A type scale is a small set of sizes with planned steps between them. Use enough contrast between steps to make text roles clear.",
    ko: "타입 스케일은 크기 사이의 차이를 계획한 제한된 글자 크기 집합이다. 각 단계의 크기 차이가 있어야 텍스트 역할이 분명해진다.",
  },
  'font-weight': {
    en: "Weight describes how visually heavy the strokes are. Nearby weights can create subtle emphasis while keeping a shared letterform style.",
    ko: "굵기는 획이 얼마나 무겁게 보이는지를 나타낸다. 같은 서체 안에서 굵기를 조금 바꾸면 글자 형태를 유지하며 강조할 수 있다.",
  },
  'tracking': {
    en: "Tracking changes spacing across a whole run of letters. A slightly open treatment can help short uppercase labels, while excessive spacing interrupts the word shape.",
    ko: "트래킹은 글자 묶음 전체의 간격을 조절한다. 짧은 대문자 라벨의 간격을 살짝 벌리면 읽기 좋을 수 있지만 지나치면 단어 형태가 흐트러진다.",
  },
  'kerning': {
    en: "Kerning adjusts the space between particular pairs. A diagonal pair such as AV may need less space to look as even as nearby letters.",
    ko: "커닝은 특정 두 글자 사이의 간격을 조절한다. AV처럼 대각선이 만나는 조합은 주변 글자와 간격이 비슷해 보이도록 더 붙일 수 있다.",
  },
  'leading': {
    en: "Leading describes space from one text baseline to the next. The right amount depends on the type size, line length, and reading task.",
    ko: "리딩은 한 줄의 베이스라인에서 다음 줄 베이스라인까지의 간격이다. 적절한 간격은 글자 크기, 한 줄의 길이, 읽는 목적에 따라 달라진다.",
  },
  'measure': {
    en: "Measure is the width of the line of text. A very long line makes it harder to find the next line, while a very short line creates frequent breaks.",
    ko: "행장은 한 줄의 글이 차지하는 너비다. 너무 길면 다음 줄의 시작을 찾기 어렵고, 너무 짧으면 줄이 자주 끊긴다.",
  },
  'alignment': {
    en: "Alignment gives lines of text a predictable edge or axis. A shared starting edge is easy to follow in a paragraph, while centered text often suits short lines.",
    ko: "텍스트 정렬은 각 줄에 일정한 기준선이나 축을 준다. 문단은 시작 위치가 같으면 따라 읽기 쉽고, 가운데 정렬은 짧은 문구에 잘 어울린다.",
  },
  'font-pairing': {
    en: "Pairing works when each face has a clear role and the two share enough visual character. Test them together at real heading and body sizes.",
    ko: "서체 조합은 각 서체의 역할이 뚜렷하고 어느 정도의 시각적 특성을 공유할 때 자연스럽다. 실제 제목과 본문 크기로 함께 확인한다.",
  },
  'variable-fonts': {
    en: "A variable font can interpolate along the axes it provides, such as weight or width. Check the axes available in a specific family before styling it.",
    ko: "가변 폰트는 굵기나 너비처럼 지원하는 축을 따라 중간 값을 만들 수 있다. 실제 서체가 어떤 축을 제공하는지 먼저 확인한다.",
  },
  'optical-size': {
    en: "Optical size adjusts letterform detail for the size at which it is read. Small-size designs may open counters and strengthen fine strokes.",
    ko: "옵티컬 사이즈는 읽는 크기에 맞춰 글자의 세부 형태를 조정한다. 작은 크기에서는 내부 공간을 열거나 가는 획을 조금 굵게 만들 수 있다.",
  },
  'body-display': {
    en: "Body type supports repeated reading across many lines, while display type sets the tone in a short, prominent space. Evaluate each at its real size.",
    ko: "본문용 서체는 여러 줄을 계속 읽기 편하도록 돕고, 제목용 서체는 짧고 눈에 띄는 자리에서 분위기를 만든다. 각각 실제 크기에서 확인한다.",
  },
  'editorial-typography': {
    en: "Editorial typography uses headings, captions, and text blocks to set a reading order. Repeated relationships between these roles make different pages feel connected.",
    ko: "에디토리얼 타이포그래피는 제목, 캡션, 본문으로 읽는 순서를 만든다. 이 역할 사이의 관계가 반복되면 다른 페이지도 한 흐름으로 느껴진다.",
  },
  'kinetic-typography': {
    en: "Kinetic typography changes type over time through reveal, spacing, or weight. Keep the final state readable and let motion support the intended reading order.",
    ko: "키네틱 타이포그래피는 등장 방식, 간격, 굵기 등을 시간에 따라 바꾼다. 마지막 상태의 가독성을 유지하고, 모션은 읽는 순서를 돕는 데 쓴다.",
  },
  'responsive-typography': {
    en: "Responsive typography adapts size, line height, and measure as space changes. A heading may need to wrap earlier on a phone while the body stays comfortably readable.",
    ko: "반응형 타이포그래피는 공간에 따라 글자 크기, 줄 높이, 행장을 조절한다. 휴대폰에서는 읽기 좋은 본문 크기를 유지하면서 제목을 더 일찍 줄바꿈할 수 있다.",
  },
  '05': {
    en: "A grid gives content shared lines to align to. Elements can span different numbers of columns while still belonging to the same layout.",
    ko: "그리드는 콘텐츠가 맞춰지는 공통 기준선을 제공한다. 각 요소가 서로 다른 수의 열을 차지해도 같은 구조 안에서 정렬된다.",
  },
  '06': {
    en: "Visual hierarchy guides attention from the most important element to supporting information. A large title or isolated action can create a clear first stop.",
    ko: "시각적 위계는 가장 중요한 요소에서 보조 정보로 시선을 이끈다. 큰 제목이나 여백으로 분리한 버튼이 시선의 첫 지점이 될 수 있다.",
  },
  'spacing': {
    en: "Compare the space between a label and its control with the space between two controls. The smaller gap tells readers which items belong together.",
    ko: "라벨과 해당 컨트롤 사이의 간격을 컨트롤끼리의 간격과 비교해 보자. 작은 간격은 어느 요소가 한 그룹인지 알려 준다.",
  },
  'alignment-layout': {
    en: "An edge or center axis can be implied without a visible rule. Repeating the same axis across elements helps the eye move naturally through a layout.",
    ko: "기준선이 화면에 없어도 요소의 가장자리나 중심이 맞으면 정렬이 느껴진다. 같은 축을 반복하면 시선이 화면 안에서 자연스럽게 이어진다.",
  },
  'responsive-layout': {
    en: "At different widths, the same content can sit side by side, stack, or wrap. Keep the reading order understandable when elements change position.",
    ko: "화면 너비에 따라 같은 콘텐츠를 나란히 두거나 세로로 쌓거나 다음 줄로 넘길 수 있다. 요소가 옮겨져도 읽는 순서는 이해하기 쉬워야 한다.",
  },
}
