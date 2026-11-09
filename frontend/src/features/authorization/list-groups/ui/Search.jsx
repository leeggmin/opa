import { WiniBox, WiniButton, WiniStack, WiniText } from '@/shared/ui';
import { winiCom } from '@/shared/lib';

/**
 * 권한 그룹 검색 컴포넌트
 */
export const Search = ({
  searchAuthNm,
  onSearchChange,
  onKeyUp,
  onSearch,
}) => {
  return (
      <WiniBox ui="search">
        <WiniText
          ui="column"
          label="권한명"
          slotProps={{ inputLabel: { shrink: true } }}
          name="searchAuthNm"
          className="w-full"
          value={searchAuthNm}
          onKeyUp={onKeyUp}
          onChange={onSearchChange}
        />
        {winiCom.checkMenuAut(
          'select',
          <WiniButton
            ui="default"
            tabIndex={4}
            onClick={onSearch}
          >
            검색
          </WiniButton>
        )}
      </WiniBox>
  );
};
