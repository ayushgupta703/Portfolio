import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="refresh-button"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details className="error-details">
              <summary>Error Details</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
              <p>Component Stack:</p>
              <pre>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
} 