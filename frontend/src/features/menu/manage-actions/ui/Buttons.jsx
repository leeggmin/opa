import { WiniButton, WiniBox } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 액션 버튼 그룹
 */
export const Buttons = ({
  selectedProgramId,
  selectedProgramMapping,
  selectedActionId,
  actionAllList,
  onReset,
  onSave,
  onDelete,
  onLoadFromSource,
}) => {
  return (
    <WiniBox className="flex justify-between">
      <WiniBox ui="btnitem">
        <WiniButton
          ui="default"
          onClick={onLoadFromSource}
          disabled={!selectedProgramMapping || !actionAllList}
        >
          소스에서 가져오기
        </WiniButton>
      </WiniBox>
      <WiniBox ui="btnitem">
        {winiCom.checkMenuAut(
          'd',
          <WiniButton
            ui="delete"
            onClick={onDelete}
            disabled={!selectedProgramId || !selectedActionId}
          >
            삭제
          </WiniButton>,
        )}
        <WiniButton
          ui="lineGray"
          onClick={onReset}
          disabled={!selectedProgramId}
        >
          초기화
        </WiniButton>
        {winiCom.checkMenuAut(
          'u',
          <WiniButton
            ui="line"
            onClick={onSave}
            disabled={!selectedProgramId || !selectedActionId}
          >
            수정
          </WiniButton>,
        )}
        {winiCom.checkMenuAut(
          'i',
          <WiniButton
            ui="default"
            onClick={onSave}
            disabled={!selectedProgramId || !!selectedActionId}
          >
            등록
          </WiniButton>,
        )}
      </WiniBox>
    </WiniBox>
  );
};
