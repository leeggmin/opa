import { Component } from 'react';

/**
 * 에러 바운더리 컴포넌트
 * 자식 컴포넌트에서 발생한 에러를 캐치하여 FallbackComponent를 렌더링
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <this.props.FallbackComponent error={error} />;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
