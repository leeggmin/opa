import { WiniStack, WiniText, WiniButton, WiniBox } from '@/shared/ui/wini';

/**
 * 프로그램 검색 바
 */
export const SearchBar = ({ searchValue, onSearchChange, onSearch }) => {
  return (
    <WiniBox ui="search">
      <WiniText
        label={'검색어'}
        name="searchPg"
        value={searchValue}
        onChange={onSearchChange}
      />
      <WiniButton
        ui="default"
        tabIndex={4}
        onClick={onSearch}
      >
        검색
      </WiniButton>
    </WiniBox>
  );
};
