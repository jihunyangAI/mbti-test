export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export type Temperament = 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

export type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';

export interface Question {
  id: number;
  dichotomy: Dichotomy;
  // direction 1 means agreeing leans towards first letter (E, S, T, J)
  // direction -1 means agreeing leans towards second letter (I, N, F, P)
  direction: 1 | -1;
  category: string;
  text: string;
  subtext: string;
}

export interface DimensionScore {
  first: { code: string; name: string; percentage: number };
  second: { code: string; name: string; percentage: number };
  dominant: string;
}

export interface TestResultScore {
  EI: DimensionScore;
  SN: DimensionScore;
  TF: DimensionScore;
  JP: DimensionScore;
}

export interface MBTIProfile {
  code: MBTIType;
  title: string;
  englishTitle: string;
  temperament: Temperament;
  temperamentName: string;
  catchphrase: string;
  summary: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  workStyle: {
    overview: string;
    strengths: string[];
    recommendedCareers: string[];
  };
  relationshipStyle: {
    overview: string;
    datingTraits: string[];
    bestMatches: { type: MBTIType; reason: string }[];
    challengingMatches: { type: MBTIType; reason: string }[];
  };
  stressRelief: string[];
  famousArchetypes: string[];
  color: {
    primary: string;
    bg: string;
    text: string;
    border: string;
  };
}

export interface CompatibilityResult {
  typeA: MBTIType;
  typeB: MBTIType;
  score: number;
  grade: '천생연분' | '매우 좋은 궁합' | '서로 보완하는 조화' | '노력이 필요한 관계' | '극과 극의 긴장';
  description: string;
  workSynergy: string;
  relationshipSynergy: string;
  advice: string;
}

export interface TestHistoryItem {
  id: string;
  date: string;
  type: MBTIType;
  scores: TestResultScore;
  mode: 'quick' | 'detailed';
}
