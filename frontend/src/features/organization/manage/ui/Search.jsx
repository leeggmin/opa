import { WiniBox, WiniButton, WiniText } from '@/shared/ui';

export const Search = ({ handleSearch, searchParam, setSearchParam, openCreate }) => {
  return (
    <WiniBox ui="search">
      <WiniText
        label="검색어"
        value={searchParam.name}
        onChange={(e) => setSearchParam({ ...searchParam, name: e.target.value })}
      />
      <WiniButton
        ui="default"
        onClick={handleSearch}
      >
        검색
      </WiniButton>
      <WiniButton ui="default" onClick={openCreate} className="w-[100px]">조직 등록</WiniButton>
    </WiniBox>
  )
}
