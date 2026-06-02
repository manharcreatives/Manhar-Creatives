import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#0B0F0E', color: '#fff',
          padding: '40px', textAlign: 'center', fontFamily: 'var(--font-body)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px', color: '#22C55E' }}>◆</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 600, marginBottom: '12px' }}>
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '440px', lineHeight: 1.7, marginBottom: '32px' }}>
            We encountered an unexpected issue. Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '14px 36px', borderRadius: '40px', border: '1px solid #22C55E',
              background: 'transparent', color: '#22C55E', fontSize: '1rem',
              cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
