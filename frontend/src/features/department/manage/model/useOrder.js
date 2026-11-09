import { useCallback } from 'react';
import { winiCom, handleApiError } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { updateDepartmentOrder } from '../api/api';

/**
 * 부서 순서 변경
 */
export const useOrder = (onSuccess) => {
  const { connector } = winiCom.getFormInfo();

  /**
   * 트리를 순서 배열로 변환
   */
  const convertTreeToOrderList = (data) => {
    const array = [];
    let beforeId = [];
    let parentId = '';

    const traverse = (nodes) => {
      return nodes.map((node, index) => {
        if (node.id === parentId) parentId = '';

        array.push({
          id: node.id,
          parentDepartmentId: winiCom.toEmpty(parentId),
          sortOrder: index + 1,
        });

        if (node.children) {
          beforeId.push(parentId);
          parentId = node.id;
          traverse(node.children);
          parentId = beforeId.pop();
        }
      });
    };

    traverse(data);
    return array;
  };

  /**
   * 부서 순서 저장
   */
  const saveDepartmentOrder = useCallback(
    async (deptTree) => {
      const answer = await winiMsg.showConfirm('부서 목록을 변경하시겠습니까?');

      if (answer === 'N') return;

      try {
        const params = convertTreeToOrderList(deptTree);
        const response = await updateDepartmentOrder(connector, params);

        if (response.result === 'SUCCESS') {
          winiMsg.showSnackbar('순서가 변경 되었습니다.');
          if (onSuccess) {
            onSuccess();
          }
        }
      } catch (error) {
        await handleApiError(error);
      }
    },
    [connector, onSuccess]
  );

  return {
    saveDepartmentOrder,
  };
};
