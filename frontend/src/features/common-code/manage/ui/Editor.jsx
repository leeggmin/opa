import { forwardRef } from 'react';
import { WiniBox, WiniGridLayout, WiniGridItem, WiniText, WiniNumber, WiniCheckbox } from '@/shared/ui/wini';

/**
 * 공통 코드 편집 폼
 */
export const Editor = forwardRef(
  ({ codeData, nowDepth, upperCode, upperCodeName, onChange, onCheckboxChange, formDisabled }, ref) => {
    return (
      <WiniBox ui="form">
        <WiniGridLayout container ref={ref} rowSpacing={2} columnSpacing={2}>
          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniText
              ui="column"
              label="상위코드"
              variant="outlined"
              className="w-full"
              disabled={true}
              slotProps={{ inputLabel: { shrink: true } }}
              value={nowDepth === '2' ? upperCode.depth1 : nowDepth === '3' ? upperCode.depth2 : ''}
              name="upperCode"
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniText
              ui="column"
              label="상위코드명"
              variant="outlined"
              className="w-full"
              disabled={true}
              slotProps={{ inputLabel: { shrink: true } }}
              value={nowDepth === '2' ? upperCodeName.depth1 : nowDepth === '3' ? upperCodeName.depth2 : ''}
              name="upperCodeName"
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniText
              ui="column"
              label="코드"
              variant="outlined"
              placeholder={'숫자만 입력'}
              className="w-full"
              required
              value={codeData.code}
              disabled={formDisabled.inputCode}
              name="code"
              onChange={onChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniText
              ui="column"
              label="코드명"
              variant="outlined"
              className="w-full"
              required
              value={codeData.codeName}
              name="codeName"
              onChange={onChange}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniNumber
              ui="column"
              label="정렬순서"
              variant="outlined"
              className="w-full"
              slotProps={{ inputLabel: { shrink: true } }}
              value={codeData.codeOrderNo}
              required
              name="codeOrderNo"
              onChange={onChange}
              thousandSeparator
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniText
              ui="column"
              label="코드설명"
              variant="outlined"
              className="w-full"
              slotProps={{ inputLabel: { shrink: true } }}
              value={codeData.codeDescription}
              name="codeDescription"
              onChange={onChange}
            />
          </WiniGridItem>

          <WiniGridItem size={{ lg: 6, md: 6, xs: 12 }}>
            <WiniCheckbox
              label="사용여부"
              className="text-gray-300"
              checked={codeData.codeUseStatus === 'USED'}
              name="codeUseStatus"
              onClick={onCheckboxChange}
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>
    );
  },
);
Editor.displayName = 'Editor';
