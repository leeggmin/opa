import { WiniFormContextProvider } from '@/shared/ui';
import { useDynamicDevComponent } from '../model/useDynamicDevComponent';

/**
 * 개발 전용 페이지
 * localhost에서만 동작하며, URL 쿼리 파라미터로 지정된 컴포넌트를 동적으로 로드
 * @example localhost:5173/dev?path=menu-management/ui/MenuManagementPage
 */
export const DevPage = () => {
  const { DynamicComponent, contextValue } = useDynamicDevComponent();

  if (typeof DynamicComponent === 'string') {
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: '10rem',
          fontWeight: 'bold',
        }}
      >
        {DynamicComponent}
      </p>
    );
  }

  return (
    <WiniFormContextProvider value={contextValue}>
      <DynamicComponent />
    </WiniFormContextProvider>
  );
};
