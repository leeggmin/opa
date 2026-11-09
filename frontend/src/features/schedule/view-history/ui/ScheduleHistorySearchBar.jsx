import { PlayIcon, PauseIcon } from '@/shared/lib';
import {
  WiniBox,
  WiniDateTimePicker,
  WiniSelect,
  WiniMenuItem,
  WiniButton,
  WiniToggleButton,
} from '@/shared/ui/wini';
import { jobStatusEnums } from '../model/constants';

export const ScheduleHistorySearchBar = ({
  searchParams,
  onFieldChange,
  onSearch,
  onFire,
  onCancel,
  onToggleLiveUpdate,
  isLiveUpdate,
  disabled,
}) => {
  return (
    <WiniBox ui="search" className="mt-1 mb-0">
      <WiniBox className="flex w-full flex-col gap-0">
      <WiniBox className="flex w-full flex-nowrap items-end gap-2 pt-0">
        <WiniDateTimePicker
          ui="row"
          label="조회기간"
          value={searchParams.from}
          onChange={(data) => onFieldChange('from', data.target.value)}
        />
        <WiniDateTimePicker
          ui="row"
          label="~"
          value={searchParams.to}
          onChange={(data) => onFieldChange('to', data.target.value)}
        />
        <WiniSelect
          ui="row"
          label="작업결과"
          value={searchParams.status}
          labelProps={{ shrink: true }}
          displayEmpty
          defaultValue={''}
          className="w-[140px]"
          onChange={(e) => onFieldChange('status', e.target.value)}
        >
          <WiniMenuItem value={''}>ALL</WiniMenuItem>
          {Object.keys(jobStatusEnums).map((item, idx) => (
            <WiniMenuItem value={item} key={item + '_' + idx}>
              {jobStatusEnums[item]}
            </WiniMenuItem>
          ))}
        </WiniSelect>
        <WiniButton onClick={onSearch} disabled={disabled}>
          조회
        </WiniButton>
      </WiniBox>

      <WiniBox ui="btnbox" className="w-full justify-start mt-2 ">
        <WiniBox ui="btnitem">
          <WiniButton ui="line" disabled={disabled} onClick={onFire}>
            즉시 실행 요청
          </WiniButton>
          <WiniButton ui="lineGray" disabled={disabled} onClick={onCancel}>
            실행 중지 요청
          </WiniButton>
          <WiniToggleButton
            value="check"
            selected={isLiveUpdate}
            onClick={onToggleLiveUpdate}
            disabled={disabled}
            className="py-[4px]"
          >
            {isLiveUpdate ? (
              <PauseIcon className="text-[16px] mr-1" />
            ) : (
              <PlayIcon className="text-[16px] mr-1" />
            )}
            LIVE
          </WiniToggleButton>
        </WiniBox>
      </WiniBox>
      </WiniBox>
    </WiniBox>
  );
};
