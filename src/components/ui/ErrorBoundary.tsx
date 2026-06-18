'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-4">
              <span className="text-rose-500 text-2xl">!</span>
            </div>
            <h2 className="text-lg font-semibold text-surface-800 mb-1">Something went wrong</h2>
            <p className="text-sm text-surface-400 text-center max-w-md">
              {this.state.error?.message ?? 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="mt-4 px-4 py-2 rounded-xl bg-surface-100 text-surface-700 text-sm font-medium hover:bg-surface-200 transition-colors"
            >
              Try again
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
