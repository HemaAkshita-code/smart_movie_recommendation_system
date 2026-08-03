import React from "react";
import Button from "../ui/button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 text-center bg-background text-foreground">
          <div className="max-w-md w-full space-y-6">
            <div className="font-heading font-bold text-6xl text-destructive/30 select-none">
              !
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-bold">Something went wrong</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An unexpected system error occurred. We apologize for the inconvenience.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
export { ErrorBoundary };
