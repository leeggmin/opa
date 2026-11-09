import { WiniBox, WiniButton } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴-프로그램 매핑 버튼 (삭제/추가)
 */
export const Mapper = ({
  isSmallScreen,
  onRemovePrograms,
  onAddPrograms,
}) => {
  if (isSmallScreen) {
    return (
      <WiniBox className="flex flex-row items-center justify-center p-2">
        {winiCom.checkMenuAut(
          ['u', 'd'],
          <WiniButton
            ui="default"
            className="w-50% m-1"
            onClick={onRemovePrograms}
          >
            ▼
          </WiniButton>,
        )}
        {winiCom.checkMenuAut(
          ['u', 'd'],
          <WiniButton
            ui="default"
            className="w-50% m-1"
            onClick={onAddPrograms}
          >
            ▲
          </WiniButton>,
        )}
      </WiniBox>
    );
  }

  return (
    <WiniBox className="flex flex-col items-center justify-center p-2">
      {winiCom.checkMenuAut(
        ['u', 'd'],
        <WiniButton
          ui="default"
          className="w-100% m-1"
          onClick={onRemovePrograms}
        >
          ▶
        </WiniButton>,
      )}
      {winiCom.checkMenuAut(
        ['u', 'd'],
        <WiniButton
          ui="default"
          className="w-100% m-1"
          onClick={onAddPrograms}
        >
          ◀
        </WiniButton>,
      )}
    </WiniBox>
  );
};
