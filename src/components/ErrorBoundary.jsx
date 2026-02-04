import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          margin: '2rem',
          background: '#fff0f7',
          border: '2px solid #d65a8c',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2 style={{color: '#d65a8c', marginTop: 0}}>Oops! Something went wrong</h2>
          <p style={{color: '#6d6d6d'}}>Please try refreshing the page.</p>
          {process.env.NODE_ENV === 'development' && (
            <details style={{marginTop: '1rem', textAlign: 'left'}}>
              <summary style={{cursor: 'pointer', color: '#d65a8c'}}>Error details</summary>
              <pre style={{background: '#f5f5f5', padding: '1rem', overflow: 'auto'}}>
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
