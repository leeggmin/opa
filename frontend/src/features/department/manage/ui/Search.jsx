import { WiniGridLayout, WiniText, WiniButton, WiniBox } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 부서 관리 검색
 */
export const Search = ({
  searchTerm,
  onChange,
  onKeyUp,
  onSearch,
  onSaveOrder,
}) => {
  return (
    <WiniBox ui="search">
      <WiniText
        ui="column"
        label="부서명"
        name={'departmentName'}
        value={searchTerm || ''}
        slotProps={{
          inputLabel: { shrink: true },
        }}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      <WiniButton onClick={onSearch}>
        조회
      </WiniButton>
      {winiCom.checkMenuAut(
        'update',
        <WiniButton onClick={onSaveOrder}>
          순서수정
        </WiniButton>,
      )}
    </WiniBox>
  );
};
