import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in MBTI app:', error, errorInfo);
  }

  public handleReset = () => {
    try {
      window.location.search = '';
    } catch {
      // ignore
    }
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              화면을 불러오는 중 오류가 발생했습니다
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              일시적인 데이터 로딩 문제일 수 있습니다. 아래 버튼을 눌러 초기 화면으로 돌아가 보세요.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              처음 화면으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
