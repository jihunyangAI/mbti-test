import React from 'react';
import { TestHistoryItem } from '../types/mbti';
import { MBTI_PROFILES } from '../data/mbtiData';

interface HistoryViewProps {
  history: TestHistoryItem[];
  onSelectHistory: (item: TestHistoryItem) => void;
  onDeleteHistory: (id: string) => void;
  onClearAll: () => void;
  onStartTest: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectHistory,
  onDeleteHistory,
  onClearAll,
  onStartTest
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-2">
            <span>나의 검사 히스토리</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            과거 MBTI 검사 기록
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            시간의 흐름에 따라 변화하는 나의 성향과 정밀 점수를 비교해 보세요.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="self-start sm:self-auto px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200"
          >
            기록 전체 삭제
          </button>
        )}
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-10 sm:p-16 text-center shadow-xs">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            📋
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            저장된 검사 기록이 없습니다
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            MBTI 정밀 검사를 완료하면 결과와 4대 성향 지표가 브라우저에 안전하게 저장됩니다.
          </p>
          <button
            type="button"
            onClick={onStartTest}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            지금 검사 시작하기 →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const profile = MBTI_PROFILES[item.type];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-indigo-600">
                      {item.type}
                    </span>
                    <span className="text-sm font-bold text-slate-800">
                      {profile?.title || '성격 유형'}
                    </span>
                    <span className="text-xs text-slate-600">
                      · {item.mode === 'detailed' ? '정밀 검사 (28문항)' : '빠른 검사 (16문항)'}
                    </span>
                  </div>

                  {/* 4 Dichotomy summary numbers */}
                  {item.scores?.EI && item.scores?.SN && item.scores?.TF && item.scores?.JP && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                      <span>
                        E/I: <strong className="text-slate-800">{item.scores.EI.dominant}</strong> ({item.scores.EI.dominant === 'E' ? item.scores.EI.first?.percentage : item.scores.EI.second?.percentage}%)
                      </span>
                      <span>·</span>
                      <span>
                        S/N: <strong className="text-slate-800">{item.scores.SN.dominant}</strong> ({item.scores.SN.dominant === 'S' ? item.scores.SN.first?.percentage : item.scores.SN.second?.percentage}%)
                      </span>
                      <span>·</span>
                      <span>
                        T/F: <strong className="text-slate-800">{item.scores.TF.dominant}</strong> ({item.scores.TF.dominant === 'T' ? item.scores.TF.first?.percentage : item.scores.TF.second?.percentage}%)
                      </span>
                      <span>·</span>
                      <span>
                        J/P: <strong className="text-slate-800">{item.scores.JP.dominant}</strong> ({item.scores.JP.dominant === 'J' ? item.scores.JP.first?.percentage : item.scores.JP.second?.percentage}%)
                      </span>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-600">
                    검사 일시: {item.date}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectHistory(item)}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    결과 다시 보기
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteHistory(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title="기록 삭제"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
