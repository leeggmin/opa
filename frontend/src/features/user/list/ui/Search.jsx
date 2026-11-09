import {
  WiniBox,
  WiniButton,
  WiniText,
} from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 사용자 검색 컴포넌트
 */
export const Search = ({
  searchParam,
  onSearchChange,
  onKeyUp,
  onSearch,
}) => {
  return (
    <WiniBox ui="search">
      <WiniText
        ui="column"
        name="username"
        label="사용자 ID"
        value={searchParam.username || ''}
        slotProps={{
          inputLabel: { shrink: true },
          input: { autoComplete: 'off' },
        }}
        onChange={onSearchChange}
        onKeyUp={onKeyUp}
        placeholder={'사용자 ID'}
      />
      <WiniText
        ui="column"
        name="fullName"
        label="성명"
        value={searchParam.fullName || ''}
        slotProps={{
          inputLabel: { shrink: true },
          input: { autoComplete: 'off' },
        }}
        onChange={onSearchChange}
        onKeyUp={onKeyUp}
        placeholder={'성명'}
      />
      {winiCom.checkMenuAut(
        'select',
        <WiniButton
          className="w-[50px]"
          tabIndex={4}
          onClick={onSearch}
        >
          검색
        </WiniButton>
      )}
    </WiniBox>
  );
};
