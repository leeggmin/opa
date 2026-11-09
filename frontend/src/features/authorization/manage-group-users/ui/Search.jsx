import { winiCom } from '@/shared/lib';
import {
  WiniBox,
  WiniButton,
  WiniFormControl,
  WiniGridLayout,
  WiniMenuItem,
  WiniSelect,
  WiniText,
} from '@/shared/ui/wini';

/**
 * 사용자 권한 검색 컴포넌트
 */
export const Search = ({
  searchParam,
  useStatusOptions,
  onSearchChange,
  onKeyUp,
  userAuthSection,
}) => {
  const { winiAut } = winiCom.getFormInfo('Y');
  
  return (
    <WiniBox ui="search">
      <WiniSelect
        ui="column"
        label="사용여부"
        name="status"
        className="w-full"
        defaultValue={'ENABLE'}
        onChange={onSearchChange}
      >
        <WiniMenuItem value={'defaultValue'}>{'전체'}</WiniMenuItem>
        {useStatusOptions.map((item) => (
          <WiniMenuItem key={item.codeId} value={item.codeId}>
            {item.codeName}
          </WiniMenuItem>
        ))}
      </WiniSelect>

      <WiniText
        label="사용자명/ID/부서명"
        ui="column"
        name="searchKeyword"
        value={searchParam.searchKeyword}
        onChange={onSearchChange}
        onKeyUp={onKeyUp}
      />

      {winiAut.select === 'ALLOW' && (
        <WiniButton
          ui="default"
          onClick={() => userAuthSection.handleSearch()}
        >
          조회
        </WiniButton>
      )}
      {winiAut.update === 'ALLOW' && (
        <WiniButton
          ui="default"
          onClick={() => userAuthSection.handleSave()}
        >
          수정
        </WiniButton>
      )}
    </WiniBox>
  );
};
