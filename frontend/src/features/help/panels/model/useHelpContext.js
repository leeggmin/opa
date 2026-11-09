import { useContext } from 'react';
import { helpFormSelectedContext, useDialogSelection, useTreeSelection } from '@/shared/model';

/**
 * Help 패널용 Context 접근 hook
 * UI 컴포넌트에서 Context 직접 접근을 캡슐화
 */
export const useHelpContext = () => {
  const context = useContext(helpFormSelectedContext);

  if (!context) {
    throw new Error('useHelpContext must be used within ComHelpForm');
  }

  return context;
};

/**
 * Help 패널용 그리드 선택 hook
 * Context와 DialogSelection을 결합
 */
export const useHelpGridSelection = () => {
  const { setRow, helpClose } = useHelpContext();

  const { onRowSelected, onRowDoubleClicked } = useDialogSelection(
    (data) => setRow(data),
    () => helpClose('Y'),
  );

  return { onRowSelected, onRowDoubleClicked };
};

/**
 * Help 패널용 트리 선택 hook
 * Context와 TreeSelection을 결합
 */
export const useHelpTreeSelection = () => {
  const { setRow, helpClose } = useHelpContext();

  const { onTreeSelected, onTreeDoubleClicked } = useTreeSelection(
    (data) => setRow(data),
    () => helpClose('Y'),
  );

  return { onTreeSelected, onTreeDoubleClicked };
};
