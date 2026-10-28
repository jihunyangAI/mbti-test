import React, { useState, useEffect, useCallback } from 'react';
import { Question, MBTIType, TestResultScore } from '../types/mbti';
import { MBTI_QUESTIONS } from '../data/mbtiData';
import { calculateMBTIResult } from '../utils/mbtiCalculator';

interface TestViewProps {
  onComplete: (type: MBTIType, scores: TestResultScore, mode: 'quick' | 'detailed') => void;
  onExploreTypes: () => void;
}

const LIKERT_OPTIONS = [
  { value: 2, label: '매우 그렇다', sublabel: '전적으로 동의', key: '1', color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
  { value: 1, label: '약간 그렇다', sublabel: '대체로 동의', key: '2', color: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
  { value: 0, label: '보통 / 중립', sublabel: '상황에 따라 다름', key: '3', color: 'bg-slate-500 hover:bg-slate-600 text-white' },
  { value: -1, label: '약간 아니다', sublabel: '대체로 비동의', key: '4', color: 'bg-amber-600 hover:bg-amber-700 text-white' },
  { value: -2, label: '매우 아니다', sublabel: '전혀 동의하지 않음', key: '5', color: 'bg-rose-600 hover:bg-rose-700 text-white' },
];

export const TestView: React.FC<TestViewProps> = ({ onComplete, onExploreTypes }) => {
  const [testMode, setTestMode] = useState<'quick' | 'detailed'>('detailed');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Active question set based on mode
  const activeQuestions = React.useMemo(() => {
    if (testMode === 'quick') {
      // Pick first 4 questions of each dichotomy (16 total)
      const ei = MBTI_QUESTIONS.filter(q => q.dichotomy === 'EI').slice(0, 4);
      const sn = MBTI_QUESTIONS.filter(q => q.dichotomy === 'SN').slice(0, 4);
      const tf = MBTI_QUESTIONS.filter(q => q.dichotomy === 'TF').slice(0, 4);
      const jp = MBTI_QUESTIONS.filter(q => q.dichotomy === 'JP').slice(0, 4);
      return [...ei, ...sn, ...tf, ...jp];
    }
    return MBTI_QUESTIONS;
  }, [testMode]);

  const totalQuestions = activeQuestions.length;
  const currentQuestion = activeQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Keyboard navigation
  const handleSelectOption = useCallback((val: number) => {
    if (!currentQuestion) return;

    setShowWarning(false);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: val
    }));

    if (autoAdvance) {
      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentIndex(i => i + 1);
          setShowWarning(false);
        }, 180);
      }
    }
  }, [currentQuestion, autoAdvance, currentIndex, totalQuestions]);

  const handleNext = () => {
    if (!currentQuestion) return;
    if (answers[currentQuestion.id] === undefined) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  useEffect(() => {
    if (!isStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const optionMap: Record<string, number> = {
          '1': 2,
          '2': 1,
          '3': 0,
          '4': -1,
          '5': -2
        };
        handleSelectOption(optionMap[e.key]);
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (!currentQuestion) return;
        if (answers[currentQuestion.id] === undefined) {
          setShowWarning(true);
        } else if (currentIndex < totalQuestions - 1) {
          setShowWarning(false);
          setCurrentIndex(i => i + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setShowWarning(false);
          setCurrentIndex(i => i - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, currentIndex, totalQuestions, answers, currentQuestion, handleSelectOption]);

  const handleFinish = () => {
    if (!currentQuestion) return;
    if (answers[currentQuestion.id] === undefined) {
      setShowWarning(true);
      return;
    }
    const { type, scores } = calculateMBTIResult(activeQuestions, answers);
    onComplete(type, scores, testMode);
  };

  // Intro Screen
  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        {/* Intro Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-4">
            <span>2026 개정판</span>
            <span aria-hidden="true">·</span>
            <span>한국형 16가지 성격유형 정밀 검사</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            나를 가장 나답게 만드는 성격의 지도
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            자신의 생각, 감정, 행동 패턴을 정밀하게 분석하여 16가지 성격 유형과 숨겨진 잠재력, 최적의 커리어와 연애 궁합까지 한눈에 확인해 보세요.
          </p>

          {/* Mode Selector */}
          <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
            <button
              type="button"
              onClick={() => setTestMode('detailed')}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                testMode === 'detailed'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-base">정밀 심층 검사</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-600 text-white">
                  추천
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                4대 성향별 7문항씩 총 28문항으로 나의 성향 비율을 최고 정밀도로 산출합니다.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>28문항</span>
                <span>·</span>
                <span>약 4~5분 소요</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTestMode('quick')}
              className={`p-5 rounded-xl border-2 transition-all cursor-pointer ${
                testMode === 'quick'
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 text-base">빠른 핵심 검사</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  스피드
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                핵심 질문 16문항으로 빠르게 자신의 MBTI 유형과 기본 특징을 파악합니다.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>16문항</span>
                <span>·</span>
                <span>약 2분 소요</span>
              </div>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setCurrentIndex(0);
                setIsStarted(true);
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base rounded-xl shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer"
            >
              검사 시작하기
            </button>
            <button
              type="button"
              onClick={onExploreTypes}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              16가지 유형 먼저 둘러보기
            </button>
          </div>
        </div>

        {/* 4 Pillars Guide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-indigo-600 mb-1">에너지 방향</div>
            <div className="text-sm font-semibold text-slate-900 mb-1">외향 (E) vs 내향 (I)</div>
            <p className="text-xs text-slate-500">외부 사람들과의 교류 vs 내면의 사색과 혼자만의 재충전</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-emerald-600 mb-1">인식 기능</div>
            <div className="text-sm font-semibold text-slate-900 mb-1">감각 (S) vs 직관 (N)</div>
            <p className="text-xs text-slate-500">구체적인 사실과 경험 vs 가능성과 미래의 비전</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-blue-600 mb-1">판단 기능</div>
            <div className="text-sm font-semibold text-slate-900 mb-1">사고 (T) vs 감정 (F)</div>
            <p className="text-xs text-slate-500">객관적 논리와 인과관계 vs 사람과의 조화와 가치</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-bold text-amber-600 mb-1">생활 양식</div>
            <div className="text-sm font-semibold text-slate-900 mb-1">판단 (J) vs 인식 (P)</div>
            <p className="text-xs text-slate-500">체계적인 계획과 통제 vs 유연하고 자발적인 적응</p>
          </div>
        </div>
      </div>
    );
  }

  // Active Testing View
  if (!currentQuestion) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 mb-4 text-sm font-medium">검사 데이터를 준비 중입니다.</p>
        <button
          onClick={() => { setIsStarted(false); setCurrentIndex(0); }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canFinish = answeredCount === totalQuestions;

  const getDichotomyLabel = (d: string) => {
    switch (d) {
      case 'EI': return '에너지 방향 · E(외향) vs I(내향)';
      case 'SN': return '정보 인식 · S(감각) vs N(직관)';
      case 'TF': return '의사결정 · T(사고) vs F(감정)';
      case 'JP': return '생활양식 · J(판단) vs P(인식)';
      default: return '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Sticky Progress Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
          <span className="font-semibold text-indigo-600">
            질문 {currentIndex + 1} / {totalQuestions}
          </span>
          <span className="text-slate-500">{getDichotomyLabel(currentQuestion.dichotomy)}</span>
          <span className="font-mono">{progressPercent}% 완료</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Setting Toggle */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setIsStarted(false)}
            className="hover:text-slate-800 transition-colors cursor-pointer"
          >
            ← 검사 다시 설정
          </button>
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
            />
            <span>응답 시 자동 넘김</span>
          </label>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-6">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
          {currentQuestion.category}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
          {currentQuestion.text}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {currentQuestion.subtext}
        </p>

        {/* Unanswered Warning Alert */}
        {showWarning && (
          <div className="mb-5 p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-2 text-amber-900 text-xs sm:text-sm font-semibold animate-pulse">
            <span className="text-base shrink-0">⚠️</span>
            <span>답변을 선택해야 다음 질문으로 이동할 수 있습니다. 아래 보기 중 하나를 선택해 주세요.</span>
          </div>
        )}

        {/* Likert Scale Choices */}
        <div className={`space-y-2.5 transition-all ${showWarning ? 'ring-2 ring-amber-400/50 p-1.5 rounded-2xl bg-amber-50/20' : ''}`}>
          {LIKERT_OPTIONS.map((opt) => {
            const isSelected = currentAnswer === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelectOption(opt.value)}
                className={`w-full min-h-[52px] px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-1 ring-indigo-600'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className={`text-sm font-semibold block ${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-800'}`}>
                      {opt.label}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {opt.sublabel}
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-xs font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                  [{opt.key}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            setShowWarning(false);
            setCurrentIndex((i) => Math.max(0, i - 1));
          }}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          이전 질문
        </button>

        <div className="flex items-center gap-2">
          {isLastQuestion ? (
            <button
              type="button"
              onClick={handleFinish}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer ${
                canFinish
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-300 hover:bg-slate-400 text-slate-700'
              }`}
            >
              {canFinish ? '결과 확인하기 →' : '답변 후 결과 보기'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer ${
                currentAnswer !== undefined
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              {currentAnswer !== undefined ? '다음 질문 →' : '답변 선택 필요 →'}
            </button>
          )}
        </div>
      </div>

      {/* Keyboard helper hint */}
      <p className="text-center text-xs text-slate-600 mt-6">
        키보드 숫자키 [1~5]를 누르면 즉시 선택됩니다 · 좌우 방향키로 이동 가능
      </p>
    </div>
  );
};
