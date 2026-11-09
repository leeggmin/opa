import { WiniBox, WiniButton, WiniText, WiniTypography } from '@/shared/ui/wini';

/**
 * 사용량 모니터링 검색 컴포넌트
 */
export const CallMonitoringSearch = ({
  orgName,
  queryTime,
  onSearchChange,
  onSearch,
}) => {
  return (
    <WiniBox
      ui="search"
      gap={1}
      className="flex flex-row gap-1"
    >
      <WiniText
        ui="column"
        label="기관명"
        titleFix
        value={orgName}
        onChange={onSearchChange}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
      />
      <WiniButton ui="default" onClick={onSearch}>
        조회
      </WiniButton>

      {queryTime && (
        <WiniTypography
          variant="body2"
          className="ml-1 text-gray-500"
        >
          조회 시간: {queryTime}
        </WiniTypography>
      )}
    </WiniBox>
  );
};
