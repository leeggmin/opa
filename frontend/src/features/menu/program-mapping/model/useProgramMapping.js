import { useCallback } from 'react';
import { createMenu, deleteMenu } from '../api/api';
import { winiMsg } from '@/shared/model';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴-프로그램 매핑 Hook
 */
export const useProgramMapping = (onSuccess) => {
  const connector = winiCom.getConnector();

  const removeProgramsFromMenu = useCallback(
    async (checkedProgramIds, reloadCallback) => {
      if (checkedProgramIds.length === 0) {
        winiMsg.showAlert('삭제할 프로그램을 선택해주세요.');
        return;
      }

      const ans = await winiMsg.showConfirm('선택한 프로그램을 삭제하시겠습니까?');
      if (ans === 'N') return;

      try {
        for (const id of checkedProgramIds) {
          await deleteMenu(connector, id);
        }
        winiMsg.showSnackbar('프로그램이 메뉴에서 삭제되었습니다.');
        if (reloadCallback) await reloadCallback();
        if (onSuccess) onSuccess();
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [onSuccess, connector],
  );

  const addProgramsToMenu = useCallback(
    async (selectedMenu, checkedPrograms, reloadCallback, options = {}) => {
      const isRootTarget = options.isRootTarget === true;

      if (!isRootTarget && (!selectedMenu || !selectedMenu.id)) {
        winiMsg.showAlert('프로그램을 넣을 상위 메뉴를 선택해주세요.');
        return;
      }

      if (!isRootTarget && selectedMenu.menuType === 'PROGRAM') {
        winiMsg.showAlert(
          '선택된 노드는 프로그램입니다. \n 프로그램을 넣을 상위 "메뉴"를 선택해주세요.',
        );
        return;
      }

      if (
        !isRootTarget &&
        selectedMenu.menuType &&
        selectedMenu.menuType !== 'MENU'
      ) {
        winiMsg.showAlert('프로그램을 넣을 상위 메뉴를 선택해주세요.');
        return;
      }

      if (checkedPrograms.length === 0) {
        winiMsg.showAlert('추가할 프로그램을 선택해주세요.');
        return;
      }

      const ans = await winiMsg.showConfirm(
        `현재 선택된 위치는 "${isRootTarget ? '최상위' : selectedMenu.name}"입니다. \n 선택한 프로그램들을 추가하시겠습니까?`,
      );
      if (ans === 'N') return;

      try {
        for (let idx = 0; idx < checkedPrograms.length; idx++) {
          const item = checkedPrograms[idx];
          const params = {
            id: '',
            menuCode: null,
            menuMapping: item.programMapping,
            menuName: item.programName,
            menuStatus: item.menuStatus,
            menuType: 'PROGRAM',
            parentMenuId: isRootTarget ? null : selectedMenu.id,
            programId: item.programId,
            sortSeq: idx + 1,
            status: item.status,
          };
          await createMenu(connector, params);
        }

        winiMsg.showSnackbar('프로그램이 메뉴에 추가되었습니다.');
        if (reloadCallback) await reloadCallback();
        if (onSuccess) onSuccess();
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [onSuccess, connector],
  );

  return {
    removeProgramsFromMenu,
    addProgramsToMenu,
  };
};
