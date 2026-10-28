import { useState, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import {
  CUTE_QUESTIONS,
  CUTE_RESULTS,
  calculateCuteMBTI,
  CuteResult,
  CuteChoice
} from './data/cuteMbtiData';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, CuteChoice['type']>>({});
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [result, setResult] = useState<CuteResult | null>(null);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [downloadToast, setDownloadToast] = useState<boolean>(false);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  // Check URL param for shared result (e.g., ?mbti=ENFP)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedType = params.get('mbti');
      if (sharedType && CUTE_RESULTS[sharedType as keyof typeof CUTE_RESULTS]) {
        setResult(CUTE_RESULTS[sharedType as keyof typeof CUTE_RESULTS]);
        setScreen('result');
      }
    } catch {
      // ignore
    }
  }, []);

  const total = CUTE_QUESTIONS.length;
  const currentQ = CUTE_QUESTIONS[currentIndex];

  const handleStart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setResult(null);
    setCopiedToast(false);
    setDownloadToast(false);
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectChoice = (option: 'A' | 'B', choice: CuteChoice) => {
    if (selectedOption !== null) return; // Prevent double taps during transition

    setSelectedOption(option);
    const updatedAnswers = {
      ...answers,
      [currentQ.id]: choice.type
    };
    setAnswers(updatedAnswers);

    // Auto-advance after playful bounce animation
    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // Calculate result
        const finalType = calculateCuteMBTI(updatedAnswers);
        const finalResult = CUTE_RESULTS[finalType];
        setResult(finalResult);
        setScreen('result');
        setSelectedOption(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 240);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedOption(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setResult(null);
    setCopiedToast(false);
    setDownloadToast(false);
    setScreen('start');
    try {
      window.history.replaceState({}, '', window.location.pathname);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Copy Result Text to Clipboard
  const handleShare = () => {
    if (!result) return;
    const url = new URL(window.location.href);
    url.searchParams.set('mbti', result.code);

    const shareText = `[MBTI성향 테스트 결과]
✨ 나의 MBTI: ${result.code} (${result.nickname})
"${result.tagline}"

📝 성격 특징:
${result.description.map((d) => `• ${d}`).join('\n')}

💼 나에게 찰떡인 직업:
${result.careers.join(', ')}

❤️ 환상의 짝꿍: ${result.bestMatch.type} (${result.bestMatch.name})

👉 너도 12문제로 1분 만에 테스트해봐!
${url.toString()}`;

    const triggerSuccess = () => {
      setDownloadToast(false);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    };

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(triggerSuccess).catch(() => {
          fallbackCopy(shareText, triggerSuccess);
        });
      } else {
        fallbackCopy(shareText, triggerSuccess);
      }
    } catch {
      fallbackCopy(shareText, triggerSuccess);
    }
  };

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

  // Capture Result Card as High-Resolution PNG Download
  const handleDownloadImage = async () => {
    if (!cardRef.current || !result || isCapturing) return;

    try {
      setIsCapturing(true);
      // Brief pause to ensure all DOM styles are painted
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 2x crisp resolution for mobile & retina
        backgroundColor: '#ffffff'
      });

      const downloadLink = document.createElement('a');
      downloadLink.download = `MBTI_${result.code}_${result.nickname.replace(/\s+/g, '_')}.png`;
      downloadLink.href = dataUrl;
      downloadLink.click();

      setCopiedToast(false);
      setDownloadToast(true);
      setTimeout(() => setDownloadToast(false), 3000);
    } catch (err) {
      console.error('Failed to capture card as PNG image:', err);
    } finally {
      setIsCapturing(false);
    }
  };

  // Determine page background: If result screen, use the type's custom theme!
  const pageBackground =
    screen === 'result' && result
      ? `bg-gradient-to-b ${result.theme.pageBg}`
      : 'bg-gradient-to-b from-amber-50/80 via-rose-50/40 to-sky-50/60';

  return (
    <div className={`min-h-screen ${pageBackground} text-slate-800 font-sans flex flex-col justify-between selection:bg-amber-200 transition-colors duration-500`}>
      {/* Top Header / Branding */}
      <header className="px-4 py-3.5 max-w-lg mx-auto w-full flex items-center justify-between">
        <button
          onClick={handleRestart}
          className="flex items-center gap-2 font-black text-slate-800 text-lg tracking-tight hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-8 h-8 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-base shadow-xs">
            ✨
          </span>
          <span>MBTI성향 테스트</span>
        </button>
        {screen === 'quiz' && (
          <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-white/80 border border-slate-200/60 shadow-xs text-amber-900">
            {currentIndex + 1} / {total}
          </span>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md mx-auto">

          {/* ==================== 1. START SCREEN ==================== */}
          {screen === 'start' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-100/60 border border-amber-100/80 text-center animate-fade-in relative overflow-hidden">
              {/* Cute Decorative Stickers */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-4">
                <span>총 12문제</span>
                <span>·</span>
                <span>약 1분 소요</span>
              </div>

              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-amber-300 via-rose-300 to-indigo-300 rounded-3xl flex items-center justify-center text-4xl shadow-md rotate-3 transform transition-transform hover:rotate-6">
                🧁
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2 leading-tight">
                일상 속 질문으로 알아보는<br />
                <span className="text-amber-500">나의 진짜 MBTI</span>
              </h1>

              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                침대, 넷플릭스, 단톡방, 여행까지!<br />
                공감 100% 일상 질문으로 나의 성향을 확인해 보세요.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-[length:200%_auto] hover:bg-right text-slate-900 font-black text-base rounded-2xl shadow-lg shadow-rose-200/50 hover:shadow-xl active:scale-95 transition-all cursor-pointer"
                >
                  테스트 시작하기 🚀
                </button>

                <a
                  href="/mbti-test-project.zip"
                  download="mbti-test-project.zip"
                  className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200/80"
                >
                  <span>📦</span>
                  <span>깃허브 업로드용 전체 소스코드(ZIP) 다운로드</span>
                </a>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-600 font-medium">
                <span>⚡ 자동 다음 이동</span>
                <span>·</span>
                <span>📸 PNG 이미지 저장</span>
                <span>·</span>
                <span>👭 친구 공유</span>
              </div>
            </div>
          )}

          {/* ==================== 2. QUIZ SCREEN ==================== */}
          {screen === 'quiz' && currentQ && (
            <div className="space-y-4">
              {/* Progress Bar (1/12, 2/12 ...) */}
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 border border-slate-200/60 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2 px-1">
                  <span className="flex items-center gap-1.5 text-amber-900">
                    <span>{currentQ.emoji}</span>
                    <span>Q{currentQ.id}. {currentQ.dimensionLabel}</span>
                  </span>
                  <span className="font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                    {currentQ.id} / {total}
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500 h-full rounded-full transition-all duration-300 ease-out shadow-xs"
                    style={{ width: `${(currentQ.id / total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Rounded Question Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/50 border border-slate-100">
                {/* Situation Tag */}
                <div className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full inline-block mb-3">
                  {currentQ.situation}
                </div>

                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-6">
                  {currentQ.title}
                </h2>

                {/* 2 Choices (Touch / Click Bouncy Micro-animation) */}
                <div className="space-y-3.5">
                  {/* Choice A */}
                  <button
                    type="button"
                    onClick={() => handleSelectChoice('A', currentQ.choiceA)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex items-center gap-3.5 ${
                      selectedOption === 'A'
                        ? 'bg-amber-50 border-amber-400 scale-[1.03] shadow-md ring-2 ring-amber-300'
                        : selectedOption === 'B'
                        ? 'opacity-40 border-slate-200 bg-white'
                        : 'border-slate-200/80 bg-white hover:border-amber-300 hover:bg-amber-50/30 active:scale-95 shadow-xs'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 text-xl flex items-center justify-center shrink-0 shadow-xs">
                      {currentQ.choiceA.emoji}
                    </span>
                    <span className="text-sm font-bold text-slate-800 leading-snug">
                      {currentQ.choiceA.text}
                    </span>
                  </button>

                  {/* Choice B */}
                  <button
                    type="button"
                    onClick={() => handleSelectChoice('B', currentQ.choiceB)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer flex items-center gap-3.5 ${
                      selectedOption === 'B'
                        ? 'bg-amber-50 border-amber-400 scale-[1.03] shadow-md ring-2 ring-amber-300'
                        : selectedOption === 'A'
                        ? 'opacity-40 border-slate-200 bg-white'
                        : 'border-slate-200/80 bg-white hover:border-amber-300 hover:bg-amber-50/30 active:scale-95 shadow-xs'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 text-xl flex items-center justify-center shrink-0 shadow-xs">
                      {currentQ.choiceB.emoji}
                    </span>
                    <span className="text-sm font-bold text-slate-800 leading-snug">
                      {currentQ.choiceB.text}
                    </span>
                  </button>
                </div>

                {/* Back Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-1 font-semibold hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <span>← 이전 질문</span>
                  </button>
                  <span className="text-[11px] text-slate-600">
                    선택 즉시 다음으로 이동해요 ✨
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. PRETTIER RESULT SCREEN ==================== */}
          {screen === 'result' && result && (
            <div className="space-y-4 animate-fade-in">
              {/* Main Card with Ref for PNG Capture */}
              <div
                ref={cardRef}
                className={`bg-white rounded-3xl shadow-2xl border-2 ${result.theme.accentBorder} overflow-hidden text-center transition-all`}
              >
                {/* 🎨 Themed Header Area: Distinct background color for each MBTI type! */}
                <div className={`${result.theme.cardHeaderBg} p-8 sm:p-10 relative overflow-hidden text-center`}>
                  {/* Subtle Background Pattern Elements */}
                  <div className="absolute top-2 right-3 text-4xl opacity-20 pointer-events-none select-none">
                    {result.emoji}
                  </div>
                  <div className="absolute bottom-2 left-3 text-3xl opacity-20 pointer-events-none select-none">
                    ✨
                  </div>

                  {/* Cute Theme Color Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-extrabold mb-4 shadow-xs">
                    <span>{result.emoji}</span>
                    <span>{result.theme.primaryColorName} 테마</span>
                  </div>

                  {/* 🌟 1. HUGE & EXTRA BOLD MBTI TYPE LETTERS 🌟 */}
                  <div className={`text-6xl sm:text-7xl font-black ${result.theme.typeTextColor} tracking-wider mb-2 font-mono drop-shadow-sm`}>
                    {result.code}
                  </div>

                  {/* Nickname (한줄 별명) */}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 drop-shadow-xs">
                    {result.nickname}
                  </h2>

                  {/* Tagline */}
                  <p className="text-xs sm:text-sm font-bold bg-white/95 text-slate-800 py-1.5 px-4 rounded-full inline-block shadow-xs border border-white/40">
                    "{result.tagline}"
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  {/* 📝 Personality Description (3~4 lines) */}
                  <div className="text-left bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/70 mb-5 space-y-2.5">
                    <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span>📝</span>
                        <span>나의 성향 특징 4가지</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-600">공감률 99%</span>
                    </div>
                    {result.description.map((line, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                        <span className="font-medium">{line}</span>
                      </div>
                    ))}
                  </div>

                  {/* 💼 3 Suitable Jobs (어울리는 직업 3개) */}
                  <div className="mb-5">
                    <div className="text-xs font-bold text-slate-600 mb-2.5 flex items-center justify-center gap-1.5">
                      <span>💼</span>
                      <span>나에게 찰떡인 직업 3가지</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {result.careers.map((job, idx) => (
                        <div
                          key={idx}
                          className={`${result.theme.jobBadge} border p-2.5 rounded-xl text-center shadow-2xs`}
                        >
                          <span className="text-xs font-bold block leading-tight">
                            {job}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ❤️ Best Match (환상의 짝꿍) */}
                  <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-2xl p-3.5 mb-2 flex items-center justify-between text-left shadow-2xs">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 block">
                        환상의 짝꿍 MBTI ❤️
                      </span>
                      <span className="text-xs sm:text-sm font-black text-emerald-950">
                        {result.bestMatch.type} ({result.bestMatch.name})
                      </span>
                    </div>
                    <span className="text-3xl">🤝</span>
                  </div>

                  {/* Card Watermark for downloaded image */}
                  <div className="text-[11px] text-slate-400 font-medium pt-3">
                    MBTI성향 테스트 · 1030 취향저격 일상 테스트
                  </div>
                </div>
              </div>

              {/* Action Buttons: PNG Download, Text Share, Retake */}
              <div className="space-y-2.5 pt-1">
                {/* 📸 2. DOWNLOAD AS PNG IMAGE BUTTON */}
                <button
                  type="button"
                  onClick={handleDownloadImage}
                  disabled={isCapturing}
                  className="w-full py-4 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-sm rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <span className="text-base">{isCapturing ? '⏳' : '📸'}</span>
                  <span>{isCapturing ? '이미지 생성 중...' : '결과 카드 PNG 이미지 다운로드'}</span>
                </button>

                {/* 💬 "결과 텍스트 복사하기" 버튼 */}
                <button
                  type="button"
                  onClick={handleShare}
                  className={`w-full py-3.5 px-4 ${result.theme.shareBtnBg} font-black text-sm rounded-2xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span className="text-base">📋</span>
                  <span>{copiedToast ? '텍스트 복사 완료! 카톡에 붙여넣어 보세요 ✨' : '결과 텍스트 복사하기 (친구 공유)'}</span>
                </button>

                {/* 🔄 다시하기 */}
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🔄</span>
                  <span>다시하기</span>
                </button>
              </div>

              {/* Toast Pop-up Notification on PNG Download */}
              {downloadToast && (
                <div className="bg-indigo-900 text-white p-3.5 rounded-2xl shadow-xl border border-indigo-700 text-xs font-bold text-center flex items-center justify-center gap-2 animate-bounce">
                  <span>📸</span>
                  <span>결과 카드가 PNG 이미지로 저장되었습니다! 갤러리나 다운로드 폴더를 확인해 보세요.</span>
                </div>
              )}

              {/* Toast Pop-up Notification on text copy */}
              {copiedToast && (
                <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold text-center flex items-center justify-center gap-2 animate-bounce">
                  <span>✅</span>
                  <span>결과 텍스트가 클립보드에 복사되었습니다! 카톡/SNS에 바로 붙여넣어 보세요.</span>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 space-y-1">
        <div>© 2026 MBTI성향 테스트 · 1030 취향저격 일상 테스트</div>
        <div>
          <a
            href="/mbti-test-project.zip"
            download="mbti-test-project.zip"
            className="text-amber-800 hover:text-amber-950 font-semibold underline underline-offset-2"
          >
            📦 소스코드 ZIP 다운로드
          </a>
        </div>
      </footer>
    </div>
  );
}
