import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthenticatedLayout } from '@/app/layouts';
import { AuthErrorPage } from '@/pages/auth-error';
import { LoginPage } from '@/pages/login';
import { NotFoundPage } from '@/pages/not-found';
import { DevPage } from '@/pages/dev';

import { AuthGuard, GuestGuard } from '@/features/auth/guard';
import { SampleMain } from '@/pages/wini-samples';
import { UiBuilderPage } from '@/pages/ui-builder';
import { ENV } from '@/shared/config';

/** 동적 라우트 에러 시 폴백용. 참조 안정적으로 app에서 한 번만 정의 */
const getLazyFallback = () => import('@/pages/auth-error');

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 고정 라우트 (인증 불필요) */}
        <Route path="/login" element={<GuestGuard><LoginPage /></GuestGuard>} />
        {
          // 개발 환경이고 로컬 환경이면 개발 페이지 라우트
          ENV.IS_DEV && ENV.IS_LOCALHOST && <Route path="/dev" element={<DevPage />} />
        }
        <Route path="/sample" element={<SampleMain />} />
        <Route path="/ui-builder" element={<UiBuilderPage />} />

        {/* 인증 필요 라우트 - 동적 메뉴 */}
        <Route element={<AuthGuard />}>
          <Route
            path="/"
            element={
              <AuthenticatedLayout
                errorFallbackComponent={AuthErrorPage}
                getLazyFallback={getLazyFallback}
              />
            }
          >
            <Route index element={<Fragment />} />
            <Route path=":menuPath" element={<Fragment />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFoundPage mode="404" />} />
      </Routes>
    </BrowserRouter>
  );
}
