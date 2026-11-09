import { forwardRef } from 'react';
import {
  WiniBox,
  WiniStack,
  WiniText,
  WiniSelect,
  WiniMenuItem,
  WiniCheckbox,
  WiniButton,
  WiniTypography,
} from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import { jobTypeEnums } from '@/shared/config';

export const Form = forwardRef(
  (
    {
      selectedJob,
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
      <WiniBox className="h-[320px]" ref={ref}>
        <WiniBox className="flex gap-2">
          <WiniText
            required
            label={'작업명'}
            name={'name'}
            value={selectedJob.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
          <WiniSelect
            required
            label={'작업유형'}
            name="jobType"
            value={selectedJob.jobType}
            onChange={(e) => onFieldChange('jobType', e.target.value)}
            className="w-full"
          >
            {Object.keys(jobTypeEnums).map((item, idx) => (
              <WiniMenuItem value={item} key={item + '-' + idx}>
                {jobTypeEnums[item]}
              </WiniMenuItem>
            ))}
          </WiniSelect>
        </WiniBox>

        <WiniBox className="h-[150px]">
          {selectedJob.jobType == 'JAVA' ? (
            <WiniText
              label={'클래스명'}
              name={'className'}
              value={selectedJob.className}
              onChange={(e) => onFieldChange('className', e.target.value)}
              className="w-full"
            />
          ) : selectedJob.jobType == 'SQL' ? (
            <WiniText
              multiline
              rows={5}
              label={'SQL'}
              name={'sql'}
              value={selectedJob.sql}
              onChange={(e) => onFieldChange('sql', e.target.value)}
              className="w-full"
            />
          ) : (
            <WiniTypography className="m-2"> 작업유형을 선택하세요. </WiniTypography>
          )}
        </WiniBox>

        <WiniText
          multiline
          rows={2}
          label={'비고'}
          name={'remark'}
          value={selectedJob.remark}
          onChange={(e) => onFieldChange('remark', e.target.value)}
          className="w-full my-2"
        />

        <WiniCheckbox
          checked={selectedJob.status === 'ENABLE'}
          name={'status'}
          label={'사용여부'}
          onChange={(e) =>
            onFieldChange('status', e.target.checked ? 'ENABLE' : 'DISABLE')
          }
          data-reset-value={true}
        />

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
      </WiniBox>
    );
  },
);
