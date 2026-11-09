/**
 * 라우트 페이지 로딩 실패 시 폴백 UI
 */
export function RouteErrorFallback({
  error,
  errorFallbackComponent: ErrorFallbackComponent,
}) {
  if (error?.message?.includes('Cannot find')) {
    return (
      <div style={{ paddingTop: 80, textAlign: 'center', height: '100%' }}>
        <span>
          <h2>화면 준비중입니다.</h2>
        </span>
        <span style={{ paddingTop: 50 }}>
          <h3>조금만 기다려주세요.</h3>
        </span>
      </div>
    );
  }

  if (ErrorFallbackComponent) {
    return <ErrorFallbackComponent />;
  }
  return null;
}
