import { WiniBox } from '@/shared/ui/wini';
import { useFormContext } from '@/shared/model';

import { FormTitle } from './FormTitle.jsx';

/**
 * 공통 타이틀, 브레드크럼 및 기본 콘텐츠 여백을 제공하는 표준 화면 레이아웃.
 */
export function WiniFormNormal({ children }) {
  const { id: currentTabId } = useFormContext();

  return (
    <>
      <FormTitle id={currentTabId} />
      <WiniBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        className="normalForm"
        sx={{ overflowY: 'auto' }}
      >
        <WiniBox sx={{ minHeight: 500, pb: 4, pl: 4, pr: 3, flexGrow: 1 }}>
          {children}
        </WiniBox>
      </WiniBox>
    </>
  );
}
