import React from 'react';

export type NavTab = 'test' | 'encyclopedia' | 'compatibility' | 'history';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onStartTest: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onStartTest,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('test')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
            M
          </span>
          <span>MBTI 정밀 연구소</span>
        </button>

        {/* Zone 2: 4 Nav links (1-2 word single-line links) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('test')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'test'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            검사하기
          </button>
          <button
            onClick={() => onSelectTab('encyclopedia')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'encyclopedia'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            16가지 유형 사전
          </button>
          <button
            onClick={() => onSelectTab('compatibility')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'compatibility'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            MBTI 궁합기
          </button>
          <button
            onClick={() => onSelectTab('history')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'history'
                ? 'text-indigo-600 font-semibold border-b-2 border-indigo-600'
                : 'hover:text-slate-900'
            }`}
          >
            <span>검사 기록</span>
            {historyCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                {historyCount}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onStartTest}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            새 검사 시작
          </button>
        </div>
      </div>

      {/* Mobile Secondary Tab Strip for thumb-friendly navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50/90 px-2 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => onSelectTab('test')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'test' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : ''
          }`}
        >
          검사
        </button>
        <button
          onClick={() => onSelectTab('encyclopedia')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'encyclopedia' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : ''
          }`}
        >
          16유형 사전
        </button>
        <button
          onClick={() => onSelectTab('compatibility')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'compatibility' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : ''
          }`}
        >
          궁합기
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            currentTab === 'history' ? 'bg-white text-indigo-600 shadow-xs font-semibold' : ''
          }`}
        >
          기록 {historyCount > 0 ? `(${historyCount})` : ''}
        </button>
      </div>
    </header>
  );
};
