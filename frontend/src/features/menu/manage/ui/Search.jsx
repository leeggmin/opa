import { WiniBox, WiniButton, WiniMenuItem, WiniSelect, WiniStack } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴 검색 바
 */
export const Search = ({
  searchValue,
  menuOnly = [],
  onSearchChange,
  onSearch,
  onSaveOrder,
}) => {
  return (
    <WiniBox ui="search">
      <WiniSelect
        ui="column"
        tabIndex={1}
        label="메뉴목록"
        value={searchValue}
        inputProps={{ tabIndex: 0 }}
        defaultValue={''}
        autoFocus={true}
        displayEmpty
        labelProps={{ shrink: true }}
        onChange={onSearchChange}
      >
        <WiniMenuItem value={''}>
          {'전체'}
        </WiniMenuItem>
        {menuOnly.map((item) => {
          if (item.depth === 0) {
            return (
              <WiniMenuItem key={item.id} value={item.id}>
                {item.name}
              </WiniMenuItem>
            );
          }
          return null;
        })}
      </WiniSelect>
      {winiCom.checkMenuAut(
        'select',
        <WiniButton
          ui="default"
          tabIndex={4}
          onClick={onSearch}
        >
          검색
        </WiniButton>,
      )}
      {winiCom.checkMenuAut(
        'update',
        <WiniButton
          ui="default"
          tabIndex={5}
          onClick={onSaveOrder}
        >
          순서수정
        </WiniButton>,
      )}
    </WiniBox>
  );
};
