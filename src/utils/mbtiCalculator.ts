import { Question, MBTIType, TestResultScore } from '../types/mbti';

export function calculateMBTIResult(
  questions: Question[],
  answers: Record<number, number>
): {
  type: MBTIType;
  scores: TestResultScore;
} {
  const dichotomies = ['EI', 'SN', 'TF', 'JP'] as const;

  const summary = {
    EI: { sum: 0, count: 0 },
    SN: { sum: 0, count: 0 },
    TF: { sum: 0, count: 0 },
    JP: { sum: 0, count: 0 }
  };

  questions.forEach((q) => {
    const answer = answers[q.id] ?? 0; // -2 to +2
    const contribution = answer * q.direction; // positive favors 1st letter, negative favors 2nd letter
    summary[q.dichotomy].sum += contribution;
    summary[q.dichotomy].count += 1;
  });

  const getDimensionScore = (
    dichotomy: 'EI' | 'SN' | 'TF' | 'JP',
    firstCode: string,
    firstName: string,
    secondCode: string,
    secondName: string
  ) => {
    const { sum, count } = summary[dichotomy];
    const maxScore = count * 2;
    // Normalize sum from [-maxScore, maxScore] to [0, 100]
    let firstPercent = Math.round(((sum + maxScore) / (2 * maxScore)) * 100);
    firstPercent = Math.max(5, Math.min(95, firstPercent));
    const secondPercent = 100 - firstPercent;

    const dominant = firstPercent >= 50 ? firstCode : secondCode;

    return {
      first: { code: firstCode, name: firstName, percentage: firstPercent },
      second: { code: secondCode, name: secondName, percentage: secondPercent },
      dominant
    };
  };

  const eiScore = getDimensionScore('EI', 'E', '외향형 (Extraversion)', 'I', '내향형 (Introversion)');
  const snScore = getDimensionScore('SN', 'S', '감각형 (Sensing)', 'N', '직관형 (Intuition)');
  const tfScore = getDimensionScore('TF', 'T', '사고형 (Thinking)', 'F', '감정형 (Feeling)');
  const jpScore = getDimensionScore('JP', 'J', '판단형 (Judging)', 'P', '인식형 (Perceiving)');

  const type = `${eiScore.dominant}${snScore.dominant}${tfScore.dominant}${jpScore.dominant}` as MBTIType;

  const scores: TestResultScore = {
    EI: eiScore,
    SN: snScore,
    TF: tfScore,
    JP: jpScore
  };

  return { type, scores };
}
