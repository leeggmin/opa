import { useCallback } from 'react';
import { winiMsg } from '@/shared/model';

const CODE_EDITOR_MODE = {
  CREATE: '등록',
  UPDATE: '수정',
};

/**
 * 저장/수정/삭제 액션 핸들러
 */
export const useActions = ({ type, handleSave, handleUpdate, handleDelete }) => {
  const onSave = useCallback(() => {
    if (type === CODE_EDITOR_MODE.CREATE) {
      handleSave();
    } else {
      winiMsg.showAlert('수정된 내용이 없습니다.');
    }
  }, [type, handleSave]);

  const onUpdate = useCallback(() => {
    if (type === CODE_EDITOR_MODE.UPDATE) {
      handleUpdate();
    } else {
      winiMsg.showAlert('수정된 내용이 없습니다.');
    }
  }, [type, handleUpdate]);

  const onDelete = useCallback(() => {
    if (type === CODE_EDITOR_MODE.UPDATE) {
      handleDelete();
    } else {
      winiMsg.showAlert('삭제할 코드를 선택해주세요.');
    }
  }, [type, handleDelete]);

  return {
    onSave,
    onUpdate,
    onDelete,
  };
};
