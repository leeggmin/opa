import { WiniBox, WiniSelect, WiniMenuItem } from '@/shared/ui/wini';
import { actionTypeEnums } from '../model/consts';

/**
 * 액션 타입 필터
 */
export const TypeFilter = ({ value, onChange }) => {
  return (
    <WiniBox ui="search">
      <WiniSelect
        ui="column"
        label="ActionType"
        displayEmpty
        defaultValue={''}
        value={value}
        onChange={onChange}
      >
        <WiniMenuItem value={''}>전체</WiniMenuItem>
        {Object.keys(actionTypeEnums).map((item, idx) => (
          <WiniMenuItem key={idx} value={item}>
            {item}
          </WiniMenuItem>
        ))}
      </WiniSelect>
    </WiniBox>
  );
};
