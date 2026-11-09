import { Suspense } from 'react';
import { ErrorBoundary } from '@/shared/ui';
import { useDynamicComponent } from '../model/useDynamicComponent';
import { getLazyPageComponent } from '../model/pageRegistry';
import { RouteErrorFallback } from './RouteErrorFallback';

/**
 * 동적 라우트 콘텐츠.
 * getLazyComponent 미전달 시 feature 내부 레지스트리 사용. app은 getLazyFallback·errorFallback만 주입.
 */
export function DynamicRouteContent({
  menuUrl,
  selectedMenu,
  isMenuLoaded,
  menuAuthInfo,
  navigateToProgram,
  parentParams,
  handleParams,
  errorFallbackComponent,
  getLazyComponent = getLazyPageComponent,
  getLazyFallback,
}) {
  const { DynamicComponent } = useDynamicComponent(
    menuUrl,
    selectedMenu,
    menuAuthInfo,
    getLazyComponent,
    getLazyFallback
  );

  const handleParamsChange = (obj) => {
    handleParams?.(obj ?? {});
  };

  return (
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: 100 }}>loading..</div>
      }
    >
      <ErrorBoundary
        key={menuUrl}
        FallbackComponent={(props) => (
          <RouteErrorFallback
            {...props}
            errorFallbackComponent={errorFallbackComponent}
          />
        )}
      >
        {DynamicComponent && (
          <DynamicComponent
            setChangePage={navigateToProgram}
            setChangeParams={handleParamsChange}
            getParams={parentParams}
          />
        )}
      </ErrorBoundary>
    </Suspense>
  );
}
