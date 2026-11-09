import { SaveIcon, LoopIcon, DeleteIcon, winiCom } from '@/shared/lib';
import { WiniBox, WiniButton } from '@/shared/ui/wini';

/**
 * 공통 코드 버튼 그룹
 */
export const Buttons = ({
  needUpdate = true,
  formDisabled,
  onSave,
  onUpdate,
  onDelete,
}) => {
  return (
    <WiniBox className="flex justify-end mb-2 mr-2">
      {needUpdate &&
        winiCom.checkMenuAut(
          'insert',
          <WiniButton
            className="min-w-[10px] ml-2"
            startIcon={<SaveIcon />}
            onClick={onSave}
            disabled={formDisabled.saveBtn}
          >
            등록
          </WiniButton>,
        )}
      {needUpdate &&
        winiCom.checkMenuAut(
          'update',
          <WiniButton
            variant="contained"
            color={'success'}
            className="min-w-[10px] ml-2"
            startIcon={<LoopIcon />}
            onClick={onUpdate}
            disabled={formDisabled.updateBtn}
          >
            수정
          </WiniButton>,
        )}
      {needUpdate &&
        winiCom.checkMenuAut(
          'delete',
          <WiniButton
            variant="contained"
            color={'error'}
            className="min-w-[10px] ml-2"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={formDisabled.deleteBtn}
          >
            삭제
          </WiniButton>,
        )}
    </WiniBox>
  );
};
