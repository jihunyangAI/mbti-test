import React, { useState } from 'react';
import { MBTIType } from '../types/mbti';
import { MBTI_PROFILES, calculateCompatibility } from '../data/mbtiData';

interface CompatibilityViewProps {
  initialTypeA?: MBTIType;
  initialTypeB?: MBTIType;
  onStartTest: () => void;
}

const ALL_TYPES: MBTIType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

const GOLDEN_PRESETS: { label: string; a: MBTIType; b: MBTIType }[] = [
  { label: 'INTJ ❤️ ENFP (전설의 콤비)', a: 'INTJ', b: 'ENFP' },
  { label: 'INTP 💡 ENTJ (지적 시너지)', a: 'INTP', b: 'ENTJ' },
  { label: 'INFJ 🔮 ENTP (소울메이트)', a: 'INFJ', b: 'ENTP' },
  { label: 'INFP 🌿 ENTJ (이상과 실행)', a: 'INFP', b: 'ENTJ' },
  { label: 'ISFJ 🛡️ ESTP (포근함과 모험)', a: 'ISFJ', b: 'ESTP' },
  { label: 'ISTJ 📐 ESFP (안정과 활력)', a: 'ISTJ', b: 'ESFP' },
];

export const CompatibilityView: React.FC<CompatibilityViewProps> = ({
  initialTypeA = 'INFP',
  initialTypeB = 'ENTJ',
  onStartTest
}) => {
  const [typeA, setTypeA] = useState<MBTIType>(initialTypeA);
  const [typeB, setTypeB] = useState<MBTIType>(initialTypeB);

  const result = calculateCompatibility(typeA, typeB);
  const profileA = MBTI_PROFILES[typeA];
  const profileB = MBTI_PROFILES[typeB];

  const handleSwap = () => {
    const temp = typeA;
    setTypeA(typeB);
    setTypeB(temp);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-3">
          <span>MBTI Chemistry Matcher</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          두 사람의 MBTI 궁합 분석기
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          두 성격 유형 간의 심리적 케미스트리, 협업 시너지, 연애 조화도와 관계 팁을 확인해 보세요.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-slate-500 block mb-2 text-center">
          대표적인 황금 궁합 조합 바로보기
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {GOLDEN_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTypeA(p.a);
                setTypeB(p.b);
              }}
              className="px-3 py-1.5 text-xs bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selector Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-6">
          {/* Type A */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              첫 번째 성격 (나 또는 파트너 A)
            </label>
            <select
              value={typeA}
              onChange={(e) => setTypeA(e.target.value as MBTIType)}
              aria-label="첫 번째 성격 유형 선택"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t} - {MBTI_PROFILES[t].title} ({MBTI_PROFILES[t].temperamentName})
                </option>
              ))}
            </select>
            <div className="mt-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{profileA.title}</span> : "{profileA.catchphrase}"
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              title="유형 서로 바꾸기"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shadow-xs transition-colors cursor-pointer"
            >
              ⇄
            </button>
          </div>

          {/* Type B */}
          <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 mb-2">
              두 번째 성격 (상대방 또는 파트너 B)
            </label>
            <select
              value={typeB}
              onChange={(e) => setTypeB(e.target.value as MBTIType)}
              aria-label="두 번째 성격 유형 선택"
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {ALL_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t} - {MBTI_PROFILES[t].title} ({MBTI_PROFILES[t].temperamentName})
                </option>
              ))}
            </select>
            <div className="mt-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{profileB.title}</span> : "{profileB.catchphrase}"
            </div>
          </div>
        </div>
      </div>

      {/* Match Result Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(result.score)}`}>
              {result.grade}
            </span>
          </div>

          <div className="text-5xl sm:text-6xl font-black text-slate-900 mb-2 tracking-tight">
            {result.score}<span className="text-3xl font-bold text-slate-600">점</span>
          </div>

          <div className="text-base sm:text-lg font-bold text-indigo-700 mb-3">
            {typeA} ({profileA.title}) & {typeB} ({profileB.title})
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {result.description}
          </p>
        </div>

        {/* Breakdown Synergy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">💼</span>
              <h3 className="text-sm font-bold text-indigo-950">
                업무 및 프로젝트 시너지
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {result.workSynergy}
            </p>
          </div>

          <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">💖</span>
              <h3 className="text-sm font-bold text-rose-950">
                연애 및 감정적 조화
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {result.relationshipSynergy}
            </p>
          </div>
        </div>

        {/* Practical Advice */}
        <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">💡</span>
            <h3 className="text-sm font-bold text-amber-950">
              더 좋은 관계를 위한 조언 & 팁
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {result.advice}
          </p>
        </div>

        {/* Action */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStartTest}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            내 진짜 MBTI 직접 검사해보기
          </button>
        </div>
      </div>
    </div>
  );
};
