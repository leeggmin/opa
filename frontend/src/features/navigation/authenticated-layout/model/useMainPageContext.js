import { useMemo, useRef } from 'react';
import { Communicator } from '@/shared/api';

/**
 * MainPage의 Context 값 설정 훅
 */
export const useMainPageContext = (selectedMenu, menuAuthInfo) => {
  const winiEventRef = useRef({
    noop: () => {},
    select: () => {},
    insert: () => {},
    update: () => {},
    delete: () => {},
    print: () => {},
    reset: () => {},
  });

  const connector = useMemo(() => {
    const connector = new Communicator();
    connector.client.defaults.headers.common['X-Menu-Id'] = selectedMenu;
    return connector;
  }, [selectedMenu]);

  const contextValueState = useMemo(() => (
    {
      id: selectedMenu,
      winiEvent: winiEventRef.current,
      info: menuAuthInfo,
      connector,
      winiAut: {
        select: menuAuthInfo ? menuAuthInfo.selectStatus : 'NONE',
        insert: menuAuthInfo ? menuAuthInfo.insertStatus : 'NONE',
        update: menuAuthInfo ? menuAuthInfo.updateStatus : 'NONE',
        delete: menuAuthInfo ? menuAuthInfo.deleteStatus : 'NONE',
        print: menuAuthInfo ? menuAuthInfo.printStatus : 'NONE',
        down: menuAuthInfo ? menuAuthInfo.downStatus : 'NONE',
        manage: menuAuthInfo ? menuAuthInfo.manageStatus : 'NONE',
      },
    }
  ), [connector, menuAuthInfo, selectedMenu]);

  return { contextValueState };
};
