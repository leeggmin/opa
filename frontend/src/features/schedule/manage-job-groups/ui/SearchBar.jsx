import {
  WiniText,
  WiniButton,
  WiniBox,
  WiniGridLayout,
  WiniGridItem,
} from '@/shared/ui/wini';
import { EnumSelect } from '@/shared/ui';
import { serviceNameEnums, statusEnums } from '@/shared/config';

export const SearchBar = ({
  serviceName,
  onServiceNameChange,
  searchParams,
  onFieldChange,
  onSearch,
}) => {
  return (
    <WiniBox ui="search">
      <WiniGridLayout container columnSpacing={1} rowSpacing={2}>
        <WiniGridItem size={{ xs: 12 }}>
          <EnumSelect
            ui="row"
            label="서비스명"
            name="serviceName"
            value={serviceName}
            onChange={onServiceNameChange}
            enums={serviceNameEnums}
          />
        </WiniGridItem>
        <WiniGridItem size={{ xs: 12 }}>
          <WiniBox className="flex items-end gap-2">
            <WiniText
              label="그룹명"
              ui="row"
              value={searchParams.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
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
            <WiniButton onClick={onSearch}>조회</WiniButton>
          </WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniBox>
  );
};
