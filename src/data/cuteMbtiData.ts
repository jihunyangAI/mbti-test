export type MBTIType =
  | 'ENFP' | 'ENFJ' | 'ENTP' | 'ENTJ'
  | 'INFP' | 'INFJ' | 'INTP' | 'INTJ'
  | 'ESFP' | 'ESFJ' | 'ESTP' | 'ESTJ'
  | 'ISFP' | 'ISFJ' | 'ISTP' | 'ISTJ';

export interface CuteChoice {
  text: string;
  type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  emoji: string;
}

export interface CuteQuestion {
  id: number;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  dimensionLabel: string;
  emoji: string;
  title: string;
  situation: string;
  choiceA: CuteChoice;
  choiceB: CuteChoice;
}

export interface CuteResultTheme {
  primaryColorName: string;
  pageBg: string; // Background gradient of the entire page
  cardHeaderBg: string; // Header background gradient of result card
  typeTextColor: string; // Color of big MBTI letters
  subTextColor: string; // Nickname and tagline subtext
  jobBadge: string;
  accentBorder: string;
  shareBtnBg: string;
  highlightPill: string;
}

export interface CuteResult {
  code: MBTIType;
  nickname: string;
  emoji: string;
  tagline: string;
  description: string[]; // 3~4 lines
  careers: string[]; // exactly 3 jobs
  bestMatch: {
    type: MBTIType;
    name: string;
  };
  goodVibe: string;
  theme: CuteResultTheme;
}

export const CUTE_QUESTIONS: CuteQuestion[] = [
  // --- E vs I (1~3) ---
  {
    id: 1,
    dimension: 'EI',
    dimensionLabel: '주말 일상',
    emoji: '🛋️',
    title: '주말에 잡혀있던 약속이 갑자기 취소되었다면?',
    situation: '"미안, 오늘 급한 일 생겨서 못 만날 것 같아 ㅠㅠ"',
    choiceA: {
      text: '오예 자유다! 침대에서 넷플릭스 보며 혼자만의 힐링 시작',
      type: 'I',
      emoji: '🛌'
    },
    choiceB: {
      text: '헐 심심한데? 당장 다른 친구들 단톡방에 번개 약속 소집!',
      type: 'E',
      emoji: '⚡'
    }
  },
  {
    id: 2,
    dimension: 'EI',
    dimensionLabel: '새로운 모임',
    emoji: '🎈',
    title: '낯선 사람들이 많은 파티나 모임에 갔을 때 나는?',
    situation: '음악이 흐르고 사람들이 삼삼오오 모여있는 장소',
    choiceA: {
      text: '아는 친구 옆에 찰떡처럼 붙어있거나 조용히 분위기를 살핀다',
      type: 'I',
      emoji: '👀'
    },
    choiceB: {
      text: '처음 보는 사람들과도 5분 만에 맞팔하고 폭풍 수다를 떤다',
      type: 'E',
      emoji: '🗣️'
    }
  },
  {
    id: 3,
    dimension: 'EI',
    dimensionLabel: '에너지 충전',
    emoji: '🔋',
    title: '친구들과 하루 종일 텐션 높게 놀고 집에 왔을 때?',
    situation: '신나게 놀고 현관문을 열고 들어선 순간',
    choiceA: {
      text: '진짜 재밌었지만... 이제 아무 말도 안 하고 혼자 쉬어야 충전됨',
      type: 'I',
      emoji: '📴'
    },
    choiceB: {
      text: '아직도 아드레날린 뿜뿜! 단톡방에 사진 올리며 수다 이어감',
      type: 'E',
      emoji: '💬'
    }
  },

  // --- S vs N (4~6) ---
  {
    id: 4,
    dimension: 'SN',
    dimensionLabel: '멍 때리기',
    emoji: '💭',
    title: '버스나 지하철에서 멍 때릴 때 주로 하는 생각은?',
    situation: '창밖을 물끄러미 바라보는 평화로운 시간',
    choiceA: {
      text: '"오늘 저녁 뭐 먹지? 내일 뭐 입지?" 같은 현실적인 생각',
      type: 'S',
      emoji: '🍱'
    },
    choiceB: {
      text: '"만약 지금 좀비 사태 터지면 난 어디로 숨지?" 같은 무한 상상',
      type: 'N',
      emoji: '🧟'
    }
  },
  {
    id: 5,
    dimension: 'SN',
    dimensionLabel: '여행 준비',
    emoji: '🏖️',
    title: '친구가 "우리 여기 숙소 어때?" 하고 사진을 보여줬을 때?',
    situation: '여행지 감성 숙소 사진을 톡으로 받은 순간',
    choiceA: {
      text: '"역에서 얼마나 걸려? 1박에 얼마야?" 현실적인 조건부터 체크',
      type: 'S',
      emoji: '🗺️'
    },
    choiceB: {
      text: '"와 분위기 미쳤다! 여기서 인생샷 찍고 노는 상상"부터 펼쳐짐',
      type: 'N',
      emoji: '📸'
    }
  },
  {
    id: 6,
    dimension: 'SN',
    dimensionLabel: '영화 취향',
    emoji: '🍿',
    title: '영화나 드라마를 고를 때 더 끌리는 장르는?',
    situation: '주말 저녁 볼거리를 고르는 중',
    choiceA: {
      text: '일상에서 진짜 일어날 법한 공감 100% 하이퍼리얼리즘 스토리',
      type: 'S',
      emoji: '🎬'
    },
    choiceB: {
      text: '반전과 떡밥 가득한 미스터리, 평행우주나 판타지 세계관',
      type: 'N',
      emoji: '🛸'
    }
  },

  // --- T vs F (7~9) ---
  {
    id: 7,
    dimension: 'TF',
    dimensionLabel: '친구의 고민',
    emoji: '🥺',
    title: '친구가 "나 오늘 너무 우울해서 쇼핑했어..."라고 할 때?',
    situation: '친구가 약간 풀이 죽은 목소리로 말했을 때',
    choiceA: {
      text: '"헐 무슨 일 있었어? 왜 우울했어 ㅠㅠ 괜찮아?" 감정 공감 먼저',
      type: 'F',
      emoji: '🫂'
    },
    choiceB: {
      text: '"우울했구나... 근데 뭐 샀어? 얼마 주고 샀는데?" 팩트 확인 먼저',
      type: 'T',
      emoji: '🛍️'
    }
  },
  {
    id: 8,
    dimension: 'TF',
    dimensionLabel: '시험 탈락',
    emoji: '📞',
    title: '열심히 준비하던 시험에서 떨어진 친구에게 전화가 왔다면?',
    situation: '친구가 울먹거리며 결과를 알려줄 때',
    choiceA: {
      text: '"너 진짜 열심히 했는데 어떡해... 일단 맛있는 거 먹자"며 달래줌',
      type: 'F',
      emoji: '🍲'
    },
    choiceB: {
      text: '위로는 하지만, 속으로는 다음 시험 일정과 보완점을 함께 고민해 줌',
      type: 'T',
      emoji: '📊'
    }
  },
  {
    id: 9,
    dimension: 'TF',
    dimensionLabel: '지적을 받을 때',
    emoji: '⚡',
    title: '팀플이나 모임에서 피드백을 받을 때 더 서운한 상황은?',
    situation: '내 작업물에 대해 피드백을 듣는 자리',
    choiceA: {
      text: '내 노력과 고생은 안 알아주고 차갑고 날카로운 말투로 말할 때',
      type: 'F',
      emoji: '💔'
    },
    choiceB: {
      text: '앞뒤 맥락도 안 맞고 사실과 다른 엉뚱한 내용으로 트집 잡힐 때',
      type: 'T',
      emoji: '🤔'
    }
  },

  // --- J vs P (10~12) ---
  {
    id: 10,
    dimension: 'JP',
    dimensionLabel: '여행 계획',
    emoji: '🎒',
    title: '내일 당장 떠나는 1박 2일 여행! 나의 짐 싸기와 계획은?',
    situation: '여행 전날 밤 나의 가방 상태',
    choiceA: {
      text: '시간대별 동선, 맛집 휴무일, 비상약까지 체크리스트 작성 완료!',
      type: 'J',
      emoji: '📝'
    },
    choiceB: {
      text: '일단 대충 필수품만 챙기고, 맛집은 내일 가서 끌리는 곳으로 고!',
      type: 'P',
      emoji: '🚗'
    }
  },
  {
    id: 11,
    dimension: 'JP',
    dimensionLabel: '과제 마감',
    emoji: '⏰',
    title: '과제나 업무 마감일이 일주일 앞으로 다가왔을 때?',
    situation: '마감까지 7일 남은 여유로운(?) 시간',
    choiceA: {
      text: '하루 분량씩 미리 나눠서 미리 끝내놔야 마음이 편안함',
      type: 'J',
      emoji: '📅'
    },
    choiceB: {
      text: '마감 직전의 쫄깃한 긴장감이 진정한 집중력을 부른다! 벼락치기 돌입',
      type: 'P',
      emoji: '🔥'
    }
  },
  {
    id: 12,
    dimension: 'JP',
    dimensionLabel: '내 방 상태',
    emoji: '🧹',
    title: '내 방 책상이나 서랍의 평소 모습은?',
    situation: '평소 내가 생활하는 공간을 돌아보았을 때',
    choiceA: {
      text: '물건이 제자리에 착착 정리되어 있어야 머릿속도 맑아짐',
      type: 'J',
      emoji: '🗂️'
    },
    choiceB: {
      text: '남들이 보기엔 어질러져 보여도 내 눈엔 다 보이는 나만의 질서가 있음',
      type: 'P',
      emoji: '✨'
    }
  }
];

export const CUTE_RESULTS: Record<MBTIType, CuteResult> = {
  ENFP: {
    code: 'ENFP',
    nickname: '에너지 넘치는 모험가',
    emoji: '🦄',
    tagline: '세상 모든 것이 신기하고 재밌는 열정 만수르!',
    description: [
      '번뜩이는 아이디어가 마르지 않는 걸어 다니는 비타민이에요.',
      '사람을 너무 좋아해서 처음 만난 사람과도 5분 만에 절친이 될 수 있어요.',
      '하고 싶은 게 너무 많아 시작은 거창하지만 뒷정리는 살짝 미뤄두곤 해요.',
      '감수성이 풍부하고 리액션이 좋아 친구들에게 늘 인기 만점이에요.'
    ],
    careers: ['콘텐츠 크리에이터', '광고/마케팅 기획자', '이벤트 플래너'],
    bestMatch: { type: 'INTJ', name: '용의주도한 전략가' },
    goodVibe: '지치지 않는 긍정 에너지로 주변을 늘 환하게 밝혀요!',
    theme: {
      primaryColorName: '비타민 옐로우',
      pageBg: 'from-amber-100/90 via-yellow-50 to-orange-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-yellow-300 via-amber-300 to-amber-400',
      typeTextColor: 'text-amber-950',
      subTextColor: 'text-amber-900',
      jobBadge: 'bg-amber-100/90 text-amber-950 border-amber-300/80',
      accentBorder: 'border-amber-300',
      shareBtnBg: 'bg-amber-500 hover:bg-amber-600 text-slate-950',
      highlightPill: 'bg-amber-400 text-amber-950'
    }
  },
  ISTJ: {
    code: 'ISTJ',
    nickname: '오차 없는 갓벽 현실주의자',
    emoji: '📐',
    tagline: '원칙과 성실함으로 세상을 지탱하는 든든한 바위',
    description: [
      '한번 약속한 것은 비가 오나 눈이 오나 반드시 지키는 신뢰의 상징이에요.',
      '느낌이나 뜬구름 잡는 이야기보다 검증된 팩트와 데이터를 신뢰해요.',
      '갑작스러운 계획 변경이나 돌발 상황을 싫어하며 예측 가능한 일상을 선호해요.',
      '겉은 과묵하고 무뚝뚝해 보여도 알면 알수록 진국인 진정한 의리파예요.'
    ],
    careers: ['공인회계사(CPA)', '공공기관 행정가', '품질관리(QC) 엔지니어'],
    bestMatch: { type: 'ESFP', name: '자유로운 연예인' },
    goodVibe: '어떤 일을 맡겨도 안심할 수 있는 최고의 신뢰감!',
    theme: {
      primaryColorName: '클래식 블루',
      pageBg: 'from-blue-100/90 via-sky-50 to-slate-100/80',
      cardHeaderBg: 'bg-gradient-to-br from-blue-500 via-sky-600 to-indigo-600',
      typeTextColor: 'text-white',
      subTextColor: 'text-blue-100',
      jobBadge: 'bg-blue-100/90 text-blue-950 border-blue-300/80',
      accentBorder: 'border-blue-300',
      shareBtnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      highlightPill: 'bg-blue-400 text-blue-950'
    }
  },
  INFP: {
    code: 'INFP',
    nickname: '마음 따뜻한 낭만 몽상가',
    emoji: '🌸',
    tagline: '나만의 우주를 품은 섬세하고 다정한 영혼',
    description: [
      '조용하지만 내면에 풍부한 감수성과 깊은 생각의 우주를 품고 있어요.',
      '작은 사물이나 음악, 노을 한 조각에서도 남다른 감동을 찾아내요.',
      '남에게 상처 주는 말은 절대 못 하고, 혼자 조용히 삼키며 상처받곤 해요.',
      '나만의 개성과 진정성을 가장 소중하게 여기는 예술가적 감성의 소유자예요.'
    ],
    careers: ['일러스트레이터/작가', '브랜드 스토리텔러', '음악/영상 기획자'],
    bestMatch: { type: 'ENFJ', name: '정의로운 주인공' },
    goodVibe: '세상의 어두운 곳까지 따스하게 어루만지는 힐러!',
    theme: {
      primaryColorName: '포근한 벚꽃 핑크',
      pageBg: 'from-rose-100/90 via-pink-50 to-amber-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-pink-300 via-rose-300 to-rose-400',
      typeTextColor: 'text-rose-950',
      subTextColor: 'text-rose-900',
      jobBadge: 'bg-rose-100/90 text-rose-950 border-rose-300/80',
      accentBorder: 'border-rose-300',
      shareBtnBg: 'bg-rose-500 hover:bg-rose-600 text-white',
      highlightPill: 'bg-rose-400 text-rose-950'
    }
  },
  INTJ: {
    code: 'INTJ',
    nickname: '철두철미한 두뇌 전략가',
    emoji: '♟️',
    tagline: '모든 것은 내 계획 안에 있다! 냉철한 마스터마인드',
    description: [
      '감정에 휘둘리지 않고 언제나 최선의 논리적 플랜을 설계해요.',
      '목표가 정해지면 뒤도 돌아보지 않고 끝까지 해내는 뚝심이 있어요.',
      '알맹이 없는 스몰토크는 지루해하지만 깊이 있는 지적 대화는 밤새 나눠요.',
      '남의 시선에 신경 쓰지 않고 나만의 높은 기준을 묵묵히 지켜나가요.'
    ],
    careers: ['시스템 아키텍트', '금융/투자 분석가', '전략 기획자'],
    bestMatch: { type: 'ENFP', name: '재기발랄한 활동가' },
    goodVibe: '혼돈 속에서도 흔들림 없는 정확한 해결책 제시!',
    theme: {
      primaryColorName: '미드나잇 퍼플',
      pageBg: 'from-purple-100/90 via-indigo-50 to-slate-100/80',
      cardHeaderBg: 'bg-gradient-to-br from-purple-600 via-indigo-700 to-slate-800',
      typeTextColor: 'text-purple-100',
      subTextColor: 'text-purple-200',
      jobBadge: 'bg-purple-100/90 text-purple-950 border-purple-300/80',
      accentBorder: 'border-purple-300',
      shareBtnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      highlightPill: 'bg-purple-400 text-purple-950'
    }
  },
  ENFJ: {
    code: 'ENFJ',
    nickname: '다정하고 따뜻한 반장님',
    emoji: '🌟',
    tagline: '모두의 행복을 진심으로 챙기는 배려의 아이콘',
    description: [
      '사람들의 마음에 깊이 공감하고 숨은 장점을 귀신같이 찾아내 칭찬해 줘요.',
      '모임에서 소외되는 사람 없이 모두가 즐거운지 살뜰하게 챙겨요.',
      '남의 부탁을 거절하는 게 세상에서 제일 어려워서 스스로 과로할 때가 있어요.',
      '따뜻한 카리스마로 사람들을 자연스럽게 이끄는 타고난 리더예요.'
    ],
    careers: ['HR/인재개발 전문가', '심리상담사', '방송 프로듀서'],
    bestMatch: { type: 'INFP', name: '열정적인 중재자' },
    goodVibe: '함께 있으면 자존감이 쑥쑥 올라가는 힐링 요정!',
    theme: {
      primaryColorName: '싱그러운 에메랄드',
      pageBg: 'from-emerald-100/90 via-teal-50 to-lime-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-emerald-400 via-teal-400 to-green-500',
      typeTextColor: 'text-emerald-950',
      subTextColor: 'text-emerald-900',
      jobBadge: 'bg-emerald-100/90 text-emerald-950 border-emerald-300/80',
      accentBorder: 'border-emerald-300',
      shareBtnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      highlightPill: 'bg-emerald-400 text-emerald-950'
    }
  },
  ENTP: {
    code: 'ENTP',
    nickname: '재치 넘치는 말빨 천재',
    emoji: '⚡',
    tagline: '틀에 갇힌 건 질색! 위트와 두뇌 회전 1등',
    description: [
      '빠른 두뇌 회전과 화려한 언변으로 어떤 대화든 꿀잼으로 만들어요.',
      '당연하다고 여기는 규칙에 질문을 던지며 색다른 해결책을 찾아내요.',
      '지루하고 반복적인 루틴은 딱 질색! 새로운 자극과 도전을 찾아 헤매요.',
      '논쟁을 스포츠처럼 즐기지만 악의는 전혀 없는 쿨한 성격이에요.'
    ],
    careers: ['스타트업 창업가', '크리에이티브 디렉터', '변호사'],
    bestMatch: { type: 'INFJ', name: '선의의 옹호자' },
    goodVibe: '언제나 지루할 틈 없는 신선한 웃음을 선물해요!',
    theme: {
      primaryColorName: '통통 튀는 오렌지',
      pageBg: 'from-orange-100/90 via-amber-50 to-rose-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-orange-400 via-amber-400 to-rose-400',
      typeTextColor: 'text-orange-950',
      subTextColor: 'text-orange-900',
      jobBadge: 'bg-orange-100/90 text-orange-950 border-orange-300/80',
      accentBorder: 'border-orange-300',
      shareBtnBg: 'bg-orange-500 hover:bg-orange-600 text-slate-950',
      highlightPill: 'bg-orange-400 text-orange-950'
    }
  },
  ENTJ: {
    code: 'ENTJ',
    nickname: '당찬 갓생러 리더',
    emoji: '👑',
    tagline: '목표가 생기면 직진! 비효율은 용납 못 해',
    description: [
      '확고한 비전과 추진력으로 일을 착착 진행시키는 능력자예요.',
      '시간 낭비와 비효율적인 방식을 보면 참지 못하고 솔루션을 내놓아요.',
      '자기관리에 철저하며 끊임없이 발전하고 성취하는 과정에서 도파민이 터져요.',
      '겉은 냉철해 보이지만 내 사람들에게는 아낌없이 퍼주는 든든한 보호자예요.'
    ],
    careers: ['경영 전략 컨설턴트', '프로젝트 총괄 매니저', '투자 심사역'],
    bestMatch: { type: 'INTP', name: '논리적인 사색가' },
    goodVibe: '어떤 난관도 척척 뚫어내는 든든한 추진력!',
    theme: {
      primaryColorName: '카리스마 네이비',
      pageBg: 'from-indigo-100/90 via-blue-50 to-slate-100/80',
      cardHeaderBg: 'bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900',
      typeTextColor: 'text-indigo-100',
      subTextColor: 'text-indigo-200',
      jobBadge: 'bg-indigo-100/90 text-indigo-950 border-indigo-300/80',
      accentBorder: 'border-indigo-300',
      shareBtnBg: 'bg-indigo-700 hover:bg-indigo-800 text-white',
      highlightPill: 'bg-indigo-400 text-indigo-950'
    }
  },
  INFJ: {
    code: 'INFJ',
    nickname: '속 깊은 비밀의 예언가',
    emoji: '🔮',
    tagline: '말하지 않아도 눈빛만으로 마음을 읽는 통찰력',
    description: [
      '겉은 차분하고 부드럽지만 속에는 흔들리지 않는 단단한 신념이 있어요.',
      '사람의 표정과 말투 변화만 보고도 그 사람의 속마음을 찰떡같이 알아채요.',
      '생각이 워낙 깊어 가끔은 현실과 살짝 동떨어진 깊은 철학에 빠져들어요.',
      '진짜 내 속마음은 아주 신뢰하는 극소수의 사람에게만 열어줘요.'
    ],
    careers: ['심리상담 전문가', '문화인류학/인문학 연구원', '카피라이터'],
    bestMatch: { type: 'ENTP', name: '뜨거운 논쟁가' },
    goodVibe: '듣고만 있어도 복잡한 마음이 정리되는 마법 같은 존재!',
    theme: {
      primaryColorName: '신비로운 라벤더',
      pageBg: 'from-violet-100/90 via-purple-50 to-rose-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-violet-400 via-purple-300 to-indigo-300',
      typeTextColor: 'text-violet-950',
      subTextColor: 'text-violet-900',
      jobBadge: 'bg-violet-100/90 text-violet-950 border-violet-300/80',
      accentBorder: 'border-violet-300',
      shareBtnBg: 'bg-violet-600 hover:bg-violet-700 text-white',
      highlightPill: 'bg-violet-400 text-violet-950'
    }
  },
  INTP: {
    code: 'INTP',
    nickname: '호기심 만렙 엉뚱 사색가',
    emoji: '🧪',
    tagline: '세상의 모든 원리가 궁금한 방구석 아인슈타인',
    description: [
      '하나에 꽂히면 밤새 구글링하고 탐구하는 지적 호기심의 끝판왕이에요.',
      '남들이 보지 못하는 논리적 허점을 기가 막히게 찾아내는 분석가예요.',
      '감정적인 위로보다는 "왜 그랬을까?" 원인 분석이 먼저 튀어나와요.',
      '조용히 혼자 생각할 때 가장 행복하며, 가식 없는 담백함을 추구해요.'
    ],
    careers: ['소프트웨어 개발자', '데이터 사이언티스트', '게임 기획자'],
    bestMatch: { type: 'ENTJ', name: '대담한 통솔자' },
    goodVibe: '복잡한 문제도 핵심 원리 하나로 깔끔하게 풀어버려요!',
    theme: {
      primaryColorName: '민트 틸',
      pageBg: 'from-cyan-100/90 via-teal-50 to-slate-100/80',
      cardHeaderBg: 'bg-gradient-to-br from-teal-300 via-cyan-300 to-emerald-300',
      typeTextColor: 'text-teal-950',
      subTextColor: 'text-teal-900',
      jobBadge: 'bg-teal-100/90 text-teal-950 border-teal-300/80',
      accentBorder: 'border-teal-300',
      shareBtnBg: 'bg-teal-600 hover:bg-teal-700 text-white',
      highlightPill: 'bg-teal-400 text-teal-950'
    }
  },
  ESFP: {
    code: 'ESFP',
    nickname: '흥 넘치는 무대 위의 스타',
    emoji: '🎉',
    tagline: '지금 이 순간이 축제! 인생을 200% 즐기는 파티러버',
    description: [
      '어디를 가나 분위기를 업시키는 인간 비타민이자 무대 체질이에요.',
      '맛있는 음식, 예쁜 옷, 신나는 음악 등 오감으로 즐기는 라이프를 사랑해요.',
      '고민이 생겨도 자고 일어나면 훌훌 털어버리는 낙천적인 멘탈의 소유자예요.',
      '친구들의 즐거움이 곧 나의 기쁨! 깜짝 선물과 이벤트의 달인이에요.'
    ],
    careers: ['패션/뷰티 크리에이터', '엔터테인먼트 기획자', '항공/여행 승무원'],
    bestMatch: { type: 'ISFJ', name: '용감한 수호자' },
    goodVibe: '옆에만 있어도 텐션이 쫙 올라가고 웃음이 빵빵 터져요!',
    theme: {
      primaryColorName: '비비드 탠저린',
      pageBg: 'from-orange-100/90 via-amber-50 to-yellow-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-400',
      typeTextColor: 'text-orange-950',
      subTextColor: 'text-orange-900',
      jobBadge: 'bg-orange-100/90 text-orange-950 border-orange-300/80',
      accentBorder: 'border-orange-300',
      shareBtnBg: 'bg-orange-500 hover:bg-orange-600 text-slate-950',
      highlightPill: 'bg-orange-400 text-orange-950'
    }
  },
  ESFJ: {
    code: 'ESFJ',
    nickname: '친절 끝판왕 분위기 메이커',
    emoji: '🧁',
    tagline: '주변 사람 챙기기가 1등인 다정다감 핵인싸',
    description: [
      '친구들의 생일, 취향, 사소한 말 한마디까지 다 기억하고 챙겨줘요.',
      '어색한 침묵을 참지 못하고 먼저 살갑게 말을 걸며 분위기를 띄워요.',
      '칭찬과 인정을 받으면 신나서 더 열심히 주변을 돕는 따뜻한 마음씨예요.',
      '규칙과 예의를 잘 지키며 주변 사람들과의 평화로운 조화를 최우선으로 여겨요.'
    ],
    careers: ['고객경험(CX) 매니저', '초등/유아 교육자', '사내 조직문화 담당자'],
    bestMatch: { type: 'ISTP', name: '만능 재주꾼' },
    goodVibe: '모두가 편안하고 행복하게 만들어주는 온기 가득한 친구!',
    theme: {
      primaryColorName: '달콤한 피치 핑크',
      pageBg: 'from-pink-100/90 via-rose-50 to-amber-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-rose-300 via-pink-300 to-orange-200',
      typeTextColor: 'text-rose-950',
      subTextColor: 'text-rose-900',
      jobBadge: 'bg-pink-100/90 text-pink-950 border-pink-300/80',
      accentBorder: 'border-pink-300',
      shareBtnBg: 'bg-rose-500 hover:bg-rose-600 text-white',
      highlightPill: 'bg-pink-400 text-pink-950'
    }
  },
  ESTP: {
    code: 'ESTP',
    nickname: '스릴을 즐기는 직진 승부사',
    emoji: '🏎️',
    tagline: '생각보단 일단 행동! 위기 대처 능력 1등',
    description: [
      '말로만 하는 탁상공론은 질색! 몸으로 직접 부딪치며 바로 해결해요.',
      '눈치가 백 단이라 상대방의 분위기나 태도 변화를 기막히게 캐치해요.',
      '짜릿한 스포츠나 액티비티를 즐기며 뒤끝 없이 쿨하고 시원시원해요.',
      '갑작스러운 돌발 상황이 닥쳐도 당황하지 않고 번뜩이는 순발력으로 극복해요.'
    ],
    careers: ['스포츠/피트니스 전문가', '스타트업 영업/BD', '응급구조/소방관'],
    bestMatch: { type: 'ISFJ', name: '용감한 수호자' },
    goodVibe: '두려움 없이 앞으로 직진하는 시원시원한 매력!',
    theme: {
      primaryColorName: '열정의 레드 코랄',
      pageBg: 'from-red-100/90 via-orange-50 to-amber-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-rose-500 via-red-500 to-orange-500',
      typeTextColor: 'text-white',
      subTextColor: 'text-rose-100',
      jobBadge: 'bg-red-100/90 text-red-950 border-red-300/80',
      accentBorder: 'border-red-300',
      shareBtnBg: 'bg-red-500 hover:bg-red-600 text-white',
      highlightPill: 'bg-red-400 text-red-950'
    }
  },
  ESTJ: {
    code: 'ESTJ',
    nickname: '칼각의 든든한 현실 리더',
    emoji: '📋',
    tagline: '원칙과 실력으로 증명하는 믿음직한 해결사',
    description: [
      '약속 시간, 마감 기한, 세부 규칙을 칼같이 지키는 책임감 대장이에요.',
      '모임이나 프로젝트에서 누가 무엇을 해야 할지 일목요연하게 정리해 줘요.',
      '빙빙 돌려 말하기보다 솔직하고 직설적인 피드백으로 빠른 개선을 이끌어요.',
      '맡겨만 두면 결과물이 완벽하게 나오는 믿고 보는 든든한 동료예요.'
    ],
    careers: ['운영/프로젝트 매니저', '공공행정 전문가', '금융/회계 분석가'],
    bestMatch: { type: 'ISFP', name: '호기심 많은 예술가' },
    goodVibe: '어떤 혼란도 질서정연하게 정리해 주는 든든함!',
    theme: {
      primaryColorName: '사파이어 블루',
      pageBg: 'from-sky-100/90 via-blue-50 to-indigo-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700',
      typeTextColor: 'text-white',
      subTextColor: 'text-sky-100',
      jobBadge: 'bg-sky-100/90 text-sky-950 border-sky-300/80',
      accentBorder: 'border-sky-300',
      shareBtnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      highlightPill: 'bg-sky-400 text-sky-950'
    }
  },
  ISFP: {
    code: 'ISFP',
    nickname: '포근하고 센스 있는 힐링 예술가',
    emoji: '🎨',
    tagline: '따뜻한 온기와 남다른 미적 감각의 평화주의자',
    description: [
      '다정하고 순한 성격으로 누구와도 편안하게 어울리는 순둥이예요.',
      '방 꾸미기, 패션, 음악 등 나만의 감각적인 취향을 가꾸는 것을 좋아해요.',
      '남에게 싫은 소리를 잘 못 하고 갈등이 생기면 조용히 자리를 피해요.',
      '침대 속에서 뒹굴거리며 힐링하는 혼자만의 시간을 진심으로 사랑해요.'
    ],
    careers: ['비주얼 디자이너', '플로리스트/파티시에', '사진작가/영상제작자'],
    bestMatch: { type: 'ESTJ', name: '엄격한 관리자' },
    goodVibe: '보고만 있어도 마음이 사르르 녹아내리는 편안한 존재!',
    theme: {
      primaryColorName: '포근한 버터 레몬',
      pageBg: 'from-yellow-100/90 via-amber-50 to-lime-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-amber-200 via-yellow-200 to-lime-200',
      typeTextColor: 'text-amber-950',
      subTextColor: 'text-amber-900',
      jobBadge: 'bg-yellow-100/90 text-yellow-950 border-yellow-300/80',
      accentBorder: 'border-yellow-300',
      shareBtnBg: 'bg-amber-400 hover:bg-amber-500 text-slate-950',
      highlightPill: 'bg-yellow-400 text-yellow-950'
    }
  },
  ISFJ: {
    code: 'ISFJ',
    nickname: '묵묵히 지켜주는 따뜻한 수호천사',
    emoji: '🛡️',
    tagline: '보이지 않는 곳에서 소중한 사람을 챙기는 헌신러',
    description: [
      '성실하고 책임감이 강해 맡은 일은 조용히 완벽하게 끝마쳐요.',
      '친구의 기분이 안 좋아 보이면 먼저 조용히 다가가 달달한 간식을 건네줘요.',
      '거절을 잘 못 해서 부탁을 다 들어주다가 속으로 혼자 끙끙 앓기도 해요.',
      '변함없는 한결같음과 성실함으로 모든 사람에게 깊은 신뢰를 얻어요.'
    ],
    careers: ['간호사/의료 보건인', '도서관/데이터 아카이비스트', '초등 교육자'],
    bestMatch: { type: 'ESTP', name: '모험을 즐기는 사업가' },
    goodVibe: '언제나 내 편이 되어줄 것 같은 든든하고 다정한 친구!',
    theme: {
      primaryColorName: '편안한 세이지 그린',
      pageBg: 'from-emerald-100/90 via-teal-50 to-slate-100/80',
      cardHeaderBg: 'bg-gradient-to-br from-emerald-300 via-teal-300 to-green-300',
      typeTextColor: 'text-emerald-950',
      subTextColor: 'text-emerald-900',
      jobBadge: 'bg-emerald-100/90 text-emerald-950 border-emerald-300/80',
      accentBorder: 'border-emerald-300',
      shareBtnBg: 'bg-teal-600 hover:bg-teal-700 text-white',
      highlightPill: 'bg-emerald-400 text-emerald-950'
    }
  },
  ISTP: {
    code: 'ISTP',
    nickname: '쿨내 진동하는 만능 재주꾼',
    emoji: '🔧',
    tagline: '말보단 손으로! 조용하지만 실속 있는 해결사',
    description: [
      '말수는 적지만 관찰력이 예리하고 기계나 손재주가 뛰어난 능력자예요.',
      '쓸데없는 감정 소모나 참견은 딱 사절! 쿨하고 독립적인 마이웨이예요.',
      '위기 상황이 터지면 당황하지 않고 무표정으로 슥슥 고쳐내요.',
      '평소엔 에너지 절약 모드로 누워있다가 흥미 있는 일엔 초집중해요.'
    ],
    careers: ['소프트웨어/임베디드 엔지니어', '정밀 기술 장인', '데이터베이스 관리자'],
    bestMatch: { type: 'ESFJ', name: '사교적인 외교관' },
    goodVibe: '군더더기 없는 담백함과 든든한 실력의 조화!',
    theme: {
      primaryColorName: '시크한 카키 슬레이트',
      pageBg: 'from-slate-200/90 via-zinc-100 to-teal-50/80',
      cardHeaderBg: 'bg-gradient-to-br from-slate-600 via-teal-700 to-zinc-700',
      typeTextColor: 'text-white',
      subTextColor: 'text-slate-200',
      jobBadge: 'bg-slate-200/90 text-slate-950 border-slate-300/80',
      accentBorder: 'border-slate-300',
      shareBtnBg: 'bg-slate-700 hover:bg-slate-800 text-white',
      highlightPill: 'bg-slate-400 text-slate-950'
    }
  }
};

export function calculateCuteMBTI(answers: Record<number, 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'>): MBTIType {
  let eCount = 0, iCount = 0;
  let sCount = 0, nCount = 0;
  let tCount = 0, fCount = 0;
  let jCount = 0, pCount = 0;

  Object.values(answers).forEach((ans) => {
    if (ans === 'E') eCount++;
    else if (ans === 'I') iCount++;
    else if (ans === 'S') sCount++;
    else if (ans === 'N') nCount++;
    else if (ans === 'T') tCount++;
    else if (ans === 'F') fCount++;
    else if (ans === 'J') jCount++;
    else if (ans === 'P') pCount++;
  });

  const letter1 = eCount >= iCount ? 'E' : 'I';
  const letter2 = sCount >= nCount ? 'S' : 'N';
  const letter3 = tCount >= fCount ? 'T' : 'F';
  const letter4 = jCount >= pCount ? 'J' : 'P';

  return `${letter1}${letter2}${letter3}${letter4}` as MBTIType;
}
