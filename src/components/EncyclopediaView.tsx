import React, { useState } from 'react';
import { MBTIType, Temperament, MBTIProfile } from '../types/mbti';
import { MBTI_PROFILES, TEMPERAMENT_INFO } from '../data/mbtiData';

interface EncyclopediaViewProps {
  onSelectTypeForCompatibility: (type: MBTIType) => void;
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({
  onSelectTypeForCompatibility
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | Temperament>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingProfile, setInspectingProfile] = useState<MBTIProfile | null>(null);

  const allProfiles = Object.values(MBTI_PROFILES);

  const filteredProfiles = allProfiles.filter((p) => {
    const matchesFilter = selectedFilter === 'all' || p.temperament === selectedFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      p.code.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.englishTitle.toLowerCase().includes(query) ||
      p.traits.some(t => t.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-3">
          <span>16 Personalities Encyclopedia</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          16가지 MBTI 성격유형 백과사전
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          모든 성격 유형의 고유한 사고방식, 잠재력, 연애 스타일과 직무 성향을 자유롭게 탐색해 보세요.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Temperament Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            전체 (16)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('analysts')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedFilter === 'analysts'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            분석가형 (NT)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('diplomats')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedFilter === 'diplomats'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            외교관형 (NF)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('sentinels')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedFilter === 'sentinels'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            관리자형 (SJ)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('explorers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedFilter === 'explorers'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            탐험가형 (SP)
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="유형 또는 키워드 검색..."
            className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of 16 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProfiles.map((p) => {
          const tempInfo = TEMPERAMENT_INFO[p.temperament];
          return (
            <div
              key={p.code}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: tempInfo.bgSoft, color: tempInfo.color }}
                  >
                    {p.code}
                  </span>
                  <span className="text-[11px] text-slate-600">
                    {p.temperamentName}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 mb-1">
                  {p.title}
                </h3>
                <span className="text-xs text-slate-600 block mb-3 font-mono">
                  {p.englishTitle}
                </span>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {p.catchphrase}
                </p>

                {/* Traits tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.traits.slice(0, 2).map((trait, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setInspectingProfile(p)}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  상세 프로필 보기
                </button>
                <button
                  type="button"
                  onClick={() => onSelectTypeForCompatibility(p.code)}
                  className="px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                >
                  궁합 확인
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          검색 조건에 맞는 MBTI 유형이 없습니다.
        </div>
      )}

      {/* Modal Profile Inspection */}
      {inspectingProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-indigo-600">
                  {inspectingProfile.temperamentName}
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  {inspectingProfile.code} · {inspectingProfile.title}
                </h2>
                <span className="text-xs text-slate-600 font-mono">
                  {inspectingProfile.englishTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setInspectingProfile(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-sm font-medium text-indigo-900 bg-indigo-50 p-3 rounded-xl border border-indigo-100 mb-6 italic">
              "{inspectingProfile.catchphrase}"
            </p>

            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">성격 종합 개요</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {inspectingProfile.summary}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">주요 특징</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {inspectingProfile.traits.map((t, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 text-xs text-slate-700 rounded-lg border border-slate-100">
                      • {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h4 className="text-xs font-bold text-emerald-800 mb-2">대표 강점</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {inspectingProfile.strengths.slice(0, 3).map((s, idx) => (
                      <li key={idx}>✓ {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100">
                  <h4 className="text-xs font-bold text-amber-800 mb-2">보완할 점</h4>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {inspectingProfile.weaknesses.map((w, idx) => (
                      <li key={idx}>! {w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">추천 직무 분야</h3>
                <div className="flex flex-wrap gap-1.5">
                  {inspectingProfile.workStyle.recommendedCareers.map((c, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">환상의 궁합 유형</h3>
                <div className="flex gap-2">
                  {inspectingProfile.relationshipStyle.bestMatches.map((m, idx) => (
                    <span key={idx} className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                      {m.type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  const type = inspectingProfile.code;
                  setInspectingProfile(null);
                  onSelectTypeForCompatibility(type);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              >
                이 유형과 궁합 보기
              </button>
              <button
                type="button"
                onClick={() => setInspectingProfile(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
