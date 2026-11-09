import { useState, useEffect, useRef, lazy } from 'react';
import { winiCom } from '@/shared/lib';

function toLazyExport(p) {
  return p.then((m) => ({ default: m?.default ?? (() => null) }));
}

/**
 * 동적 라우트 컴포넌트 로딩 훅.
 * - getLazyComponent(menuUrl): Promise<{ default }> 또는 reject. (기본값: feature 내 pageRegistry)
 * - getLazyFallback(): 에러/권한 없음 시 로드 (Promise<Module> 또는 Promise<{ default }>)
 * - getLazyComponent/getLazyFallback는 ref로 참조해 의존성 배열에서 제외(인라인 함수 시 불필요 리로드 방지).
 */
export const useDynamicComponent = (
  menuUrl,
  selectedMenu,
  menuAuthInfo,
  getLazyComponent,
  getLazyFallback
) => {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const lastMenuUrlRef = useRef('');
  const getLazyComponentRef = useRef(getLazyComponent);
  const getLazyFallbackRef = useRef(getLazyFallback);
  getLazyComponentRef.current = getLazyComponent;
  getLazyFallbackRef.current = getLazyFallback;

  const resolveFallback = () => {
    const fn = getLazyFallbackRef.current;
    return fn ? lazy(() => toLazyExport(fn())) : () => null;
  };

  useEffect(() => {
    if (winiCom.toEmpty(menuUrl) === '') {
      setDynamicComponent(null);
      lastMenuUrlRef.current = '';
      return;
    }

    if (!selectedMenu) {
      setDynamicComponent(resolveFallback());
      lastMenuUrlRef.current = menuUrl;
      return;
    }

  }, [menuUrl, selectedMenu]);

  useEffect(() => {
    if (!menuAuthInfo || !menuUrl) return;
    if (lastMenuUrlRef.current === menuUrl) return;

    const getLazy = getLazyComponentRef.current;
    if (!getLazy) {
      setDynamicComponent(resolveFallback());
      lastMenuUrlRef.current = menuUrl;
      return;
    }

    const load = () =>
      getLazy(menuUrl).catch(() => {
        const fallback = getLazyFallbackRef.current?.();
        return fallback ? toLazyExport(fallback) : Promise.resolve({ default: () => null });
      });

    setDynamicComponent(lazy(load));
    lastMenuUrlRef.current = menuUrl;
  }, [menuUrl, menuAuthInfo]);

  return { DynamicComponent };
};
