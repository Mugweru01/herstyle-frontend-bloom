import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // You can also log error messages to an error reporting service here
    // logErrorToService(error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      if (process.env.NODE_ENV === 'development') {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-center mb-8">An unexpected error occurred during development.</p>
            <details className="whitespace-pre-wrap text-sm text-red-600 bg-red-100 p-4 rounded-md overflow-auto max-h-64 w-full max-w-2xl">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <button
              className="mt-8 px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-center mb-8">We're sorry, but there was an unexpected error. Please try refreshing the page or contact support if the issue persists.</p>
            <button
              className="px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors duration-300"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;