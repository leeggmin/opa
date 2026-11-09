import { WiniText, WiniButton, WiniBox, WiniGridItem } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 공통 코드 검색 바
 */
export const SearchBar = ({
  keyword,
  onKeywordChange,
  onSearch,
  onAdd,
  canSearch = true,
  needUpdate = true,
}) => {
  return (
    <WiniGridItem size={{ lg: 12, md: 12, xs: 12 }}>
      <WiniBox ui="search">
        <WiniText
          ui="row"
          label="코드명"
          variant="outlined"
          slotProps={{ inputLabel: { shrink: true } }}
          value={keyword}
          onChange={onKeywordChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />

        {winiCom.checkMenuAut(
          'select',
          <WiniButton onClick={canSearch ? onSearch : () => {}}>
            검색
          </WiniButton>,
        )}

        {needUpdate &&
          winiCom.checkMenuAut(
            'insert',
            <WiniButton onClick={onAdd}>
              추가
            </WiniButton>,
          )}
      </WiniBox>
    </WiniGridItem>
  );
};
