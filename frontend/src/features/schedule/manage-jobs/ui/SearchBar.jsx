import { WiniGridLayout, WiniBox, WiniText, WiniButton } from '@/shared/ui/wini';
import { EnumSelect } from '@/shared/ui';
import { statusEnums, jobTypeEnums } from '@/shared/config';

export const SearchBar = ({
  searchParams,
  onFieldChange,
  onSearch,
  onSync,
  disabled,
  showSync = true,
}) => {
  return (
    <WiniBox ui='search'>
        <WiniText
          ui="row"
          label="작업명"
          value={searchParams.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
        />

        <EnumSelect
          ui="row"
          label="유형"
          name="jobType"
          value={searchParams.jobType}
          onChange={(e) => onFieldChange('jobType', e.target.value)}
          enums={jobTypeEnums}
          showAll
        />

        <EnumSelect
          ui="row"
          label="상태"
          name="status"
          value={searchParams.status}
          onChange={(e) => onFieldChange('status', e.target.value)}
          enums={statusEnums}
          showAll
        />

        <WiniButton
          onClick={onSearch}
          disabled={disabled}
        >
            조회
          </WiniButton>

        {showSync && (
          <WiniButton
            onClick={onSync}
            className="whitespace-nowrap w-auto flex-none"
          >
            작업목록 동기화
          </WiniButton>
        )}
    </WiniBox>
  );
};
