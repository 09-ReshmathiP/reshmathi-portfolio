import { Component, type ErrorInfo, type PropsWithChildren } from "react";

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this is where an error-reporting service call would go.
    console.error("Uncaught error in app tree:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
          style={{ background: "var(--color-ink)", color: "var(--color-text-primary)" }}
        >
          <p className="font-mono-caps">Something went wrong</p>
          <h1 style={{ fontSize: "var(--text-display-md)", fontWeight: 700 }}>
            This page hit an unexpected error.
          </h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 rounded-full px-6 py-3 text-sm font-medium"
            style={{
              background: "linear-gradient(120deg, var(--color-synapse), var(--color-signal))",
              color: "var(--color-ink)",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
