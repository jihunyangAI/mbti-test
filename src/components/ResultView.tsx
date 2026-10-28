import React, { useState } from 'react';
import { MBTIType, TestResultScore, DimensionScore } from '../types/mbti';
import { MBTI_PROFILES } from '../data/mbtiData';

interface ResultViewProps {
  type: MBTIType;
  scores: TestResultScore;
  onRetake: () => void;
  onCheckCompatibility: (type: MBTIType) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  type,
  scores,
  onRetake,
  onCheckCompatibility
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'career' | 'love' | 'stress'>('profile');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const profile = MBTI_PROFILES[type] || MBTI_PROFILES['INFP'];

  const fallbackCopy = (text: string, onSuccess: () => void) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      onSuccess();
    } catch {
      // ignore
    }
  };

  const safeCopy = (text: string, onSuccess: () => void) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
          fallbackCopy(text, onSuccess);
        });
      } else {
        fallbackCopy(text, onSuccess);
      }
    } catch {
      fallbackCopy(text, onSuccess);
    }
  };

  // Helper to copy share link
  const handleCopyLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('type', type);
      safeCopy(url.toString(), () => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    } catch {
      // ignore
    }
  };

  // Helper to copy text summary
  const handleCopySummary = () => {
    const text = `[나의 MBTI 정밀 검사 결과: ${profile.code} ${profile.title}]
"${profile.catchphrase}"

• 4대 성향 분석
- 외향(E) ${scores?.EI?.first?.percentage ?? 50}% : 내향(I) ${scores?.EI?.second?.percentage ?? 50}%
- 감각(S) ${scores?.SN?.first?.percentage ?? 50}% : 직관(N) ${scores?.SN?.second?.percentage ?? 50}%
- 사고(T) ${scores?.TF?.first?.percentage ?? 50}% : 감정(F) ${scores?.TF?.second?.percentage ?? 50}%
- 판단(J) ${scores?.JP?.first?.percentage ?? 50}% : 인식(P) ${scores?.JP?.second?.percentage ?? 50}%

• 핵심 특징
${profile.traits.map(t => `- ${t}`).join('\n')}

• 추천 직업: ${profile.workStyle.recommendedCareers.join(', ')}
• 환상의 짝꿍: ${profile.relationshipStyle.bestMatches.map(m => m.type).join(', ')}

지금 MBTI 정밀 연구소에서 당신의 성향을 확인해 보세요!`;

    safeCopy(text, () => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    });
  };

  const renderMeter = (title: string, dimension?: DimensionScore) => {
    if (!dimension || !dimension.first || !dimension.second) return null;
    const isFirstDominant = dimension.dominant === dimension.first.code;
    return (
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
          <span className={isFirstDominant ? 'text-indigo-600 font-bold' : 'text-slate-600'}>
            {dimension.first.name} ({dimension.first.percentage}%)
          </span>
          <span className={!isFirstDominant ? 'text-indigo-600 font-bold' : 'text-slate-600'}>
            {dimension.second.name} ({dimension.second.percentage}%)
          </span>
        </div>

        {/* Dual Bar */}
        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex">
          <div
            className={`h-full transition-all duration-500 ${
              isFirstDominant ? 'bg-indigo-600' : 'bg-slate-400'
            }`}
            style={{ width: `${dimension.first.percentage}%` }}
          />
          <div
            className={`h-full transition-all duration-500 ${
              !isFirstDominant ? 'bg-indigo-600' : 'bg-slate-300'
            }`}
            style={{ width: `${dimension.second.percentage}%` }}
          />
        </div>

        <div className="mt-2 text-[11px] text-slate-500 text-center">
          우세 성향: <span className="font-bold text-slate-800">{dimension.dominant}</span> (
          {isFirstDominant ? dimension.first.percentage : dimension.second.percentage}%)
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Result Hero Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-8 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full mb-3">
          <span>{profile.temperamentName}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.englishTitle}</span>
        </div>

        <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight mb-2">
          {profile.code}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
          {profile.title}
        </h1>

        <p className="text-base sm:text-lg text-indigo-900 font-medium italic max-w-xl mx-auto mb-6 bg-indigo-50/60 py-2.5 px-4 rounded-xl border border-indigo-100">
          "{profile.catchphrase}"
        </p>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-left sm:text-center">
          {profile.summary}
        </p>

        {/* Action button row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{copiedLink ? '링크 복사 완료!' : '결과 링크 공유'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>{copiedSummary ? '요약 텍스트 복사됨!' : '요약 텍스트 복사'}</span>
          </button>

          <button
            type="button"
            onClick={() => onCheckCompatibility(type)}
            className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            궁합 확인하기 →
          </button>

          <button
            type="button"
            onClick={onRetake}
            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            다시 검사하기
          </button>
        </div>
      </div>

      {/* 4 Dichotomy Meters Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">
            4대 성향 정밀 지표
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {profile.code} 정밀 산출치
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderMeter('에너지 방향', scores.EI)}
          {renderMeter('인식 기능', scores.SN)}
          {renderMeter('판단 기능', scores.TF)}
          {renderMeter('생활 양식', scores.JP)}
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
        {/* Tab Headers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-50/70 text-center">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'profile'
                ? 'bg-white text-indigo-600 border-indigo-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            핵심 특징 & 역량
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('career')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'career'
                ? 'bg-white text-indigo-600 border-indigo-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            직무 & 커리어
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('love')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'love'
                ? 'bg-white text-indigo-600 border-indigo-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            연애 & 궁합
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stress')}
            className={`py-3.5 px-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'stress'
                ? 'bg-white text-indigo-600 border-indigo-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            힐링 팁 & 인물
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Core Traits */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  대표 성격 키워드
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {profile.traits.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-800 font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    핵심 강점 (Strengths)
                  </h4>
                  <ul className="space-y-2.5">
                    {profile.strengths.map((s, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-amber-800 flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    보완할 점 (Growth Points)
                  </h4>
                  <ul className="space-y-2.5">
                    {profile.weaknesses.map((w, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Career */}
          {activeTab === 'career' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  업무 스타일 및 조직 내 역할
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {profile.workStyle.overview}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  핵심 업무 강점
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.workStyle.strengths.map((str, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg"
                    >
                      {str}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  최적의 추천 직업군
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {profile.workStyle.recommendedCareers.map((career, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-800 text-center hover:border-indigo-400 transition-colors"
                    >
                      {career}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Romance & Compatibility */}
          {activeTab === 'love' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  연애 성향 및 사랑의 언어
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {profile.relationshipStyle.overview}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  연애할 때 두드러지는 모습
                </h4>
                <div className="space-y-2">
                  {profile.relationshipStyle.datingTraits.map((t, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-slate-700 bg-pink-50/50 border border-pink-100 p-3 rounded-lg">
                      ❤️ {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30">
                  <span className="text-xs font-bold text-emerald-800 block mb-2">
                    환상의 궁합 (Best Match)
                  </span>
                  {profile.relationshipStyle.bestMatches.map((m, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">
                          {m.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCheckCompatibility(m.type)}
                          className="text-xs text-emerald-700 hover:underline font-semibold cursor-pointer"
                        >
                          궁합 분석 보기 →
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {m.reason}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30">
                  <span className="text-xs font-bold text-amber-800 block mb-2">
                    노력이 필요한 관계 (Caution)
                  </span>
                  {profile.relationshipStyle.challengingMatches.map((m, idx) => (
                    <div key={idx} className="mb-3 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">
                          {m.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCheckCompatibility(m.type)}
                          className="text-xs text-amber-700 hover:underline font-semibold cursor-pointer"
                        >
                          궁합 분석 보기 →
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {m.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Stress Relief & Famous Archetypes */}
          {activeTab === 'stress' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  스트레스 해소 및 재충전 솔루션
                </h3>
                <div className="space-y-2.5">
                  {profile.stressRelief.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-xs sm:text-sm text-slate-800 flex items-start gap-2.5"
                    >
                      <span className="font-bold text-blue-600">0{idx + 1}.</span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-3">
                  동일한 유형의 대표 인물 & 가상 캐릭터
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.famousArchetypes.map((person, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-slate-100 text-slate-800 font-medium text-xs rounded-full border border-slate-200"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
