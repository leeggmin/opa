import { forwardRef } from 'react';
import {
  WiniStack,
  WiniText,
  WiniCheckbox,
  WiniButton,
} from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

export const Form = forwardRef(
  (
    {
      selectedJobGroup,
      onFieldChange,
      onInsert,
      onUpdate,
      onDelete,
      onReset,
      isInsertDisabled,
      isUpdateDisabled,
      isDeleteDisabled,
    },
    ref,
  ) => {
    return (
      <>
        <WiniStack gap={1} className="py-2" ref={ref}>
          <WiniText
            ui="column"
            label="작업 그룹 명"
            required
            name={'name'}
            value={selectedJobGroup.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
          <WiniText
            ui="column"
            multiline
            rows={3}
            label="작업 그룹 설명"
            name={'remark'}
            value={selectedJobGroup.remark}
            onChange={(e) => onFieldChange('remark', e.target.value)}
          />
          <WiniCheckbox
            checked={selectedJobGroup.status === 'ENABLE'}
            name={'status'}
            label={'사용여부'}
            onChange={(e) =>
              onFieldChange('status', e.target.checked ? 'ENABLE' : 'DISABLE')
            }
            data-reset-value={true}
          />
        </WiniStack>
        <WiniStack direction={'row'} justifyContent={'end'} gap={1} className="justify-end">
          <WiniButton onClick={onReset}>
            초기화
          </WiniButton>
          {winiCom.checkMenuAut(
            'i',
            <WiniButton
              onClick={onInsert}
              disabled={isInsertDisabled}
            >
              등록
            </WiniButton>,
          )}
          {winiCom.checkMenuAut(
            'u',
            <WiniButton
              onClick={onUpdate}
              disabled={isUpdateDisabled}
            >
              수정
            </WiniButton>,
          )}
          {winiCom.checkMenuAut(
            'd',
            <WiniButton
              onClick={onDelete}
              disabled={isDeleteDisabled}
            >
              삭제
            </WiniButton>,
          )}
        </WiniStack>
      </>
    );
  },
);
