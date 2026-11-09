import { forwardRef } from 'react';
import { WiniBox, WiniStack, WiniText, WiniSelect, WiniMenuItem, WiniNumber, WiniCheckbox, WiniButton, WiniTypography, WiniInputAdornment } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import { triggerTypeEnums } from '../model/constants';
import { CronSyntaxHelp } from './CronSyntaxHelp';
import { CronExampleDisplay } from './CronExampleDisplay';

export const Form = forwardRef(
  (
    {
      selectedTrigger,
      cronExampleData,
      onFieldChange,
      onInsert,
      onUpdate,
      onDelete,
      onReset,
      isScheduleAddDisabled,
      isInsertDisabled,
      isUpdateDisabled,
      isDeleteDisabled,
    },
    ref,
  ) => {
    return (
      <WiniBox ref={ref}>
        <WiniText
          required
          label={'스케줄 명'}
          name={'name'}
          value={selectedTrigger.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          className='mb-2'
        />
        <WiniSelect
          required
          className='w-full'
          label={'스케줄 유형'}
          name="triggerType"
          value={selectedTrigger.triggerType}
          onChange={(e) => onFieldChange('triggerType', e.target.value)}
        >
          {Object.keys(triggerTypeEnums).map((item, idx) => (
            <WiniMenuItem value={item} key={item + '-' + idx}>
              {triggerTypeEnums[item]}
            </WiniMenuItem>
          ))}
        </WiniSelect>
        <WiniBox className="h-[35px] w-full my-2">
          {selectedTrigger.triggerType == 'CRON' ? (
            <WiniText
              label={'CRON 문자열'}
              name={'triggerCron'}
              value={selectedTrigger.triggerCron}
              onChange={(e) => onFieldChange('triggerCron', e.target.value)}
            />
          ) : selectedTrigger.triggerType === 'SECONDS' ? (
            <WiniNumber
              label={'실행주기'}
              name={'triggerSeconds'}
              value={selectedTrigger.triggerSeconds}
              onChange={(e) => onFieldChange('triggerSeconds', e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <WiniInputAdornment position="end">
                      <WiniTypography
                        className="text-sm text-gray-400"
                      >
                        초
                      </WiniTypography>
                    </WiniInputAdornment>
                  ),
                },
              }}
            />
          ) : (
            <WiniTypography m={1}> 스케줄 유형을 선택하세요. </WiniTypography>
          )}
        </WiniBox>
        <WiniCheckbox
          checked={selectedTrigger.status === 'ENABLE'}
          name={'status'}
          label={'사용여부'}
          onChange={(e) =>
            onFieldChange('status', e.target.checked ? 'ENABLE' : 'DISABLE')
          }
          data-reset-value={true}
        />

        <WiniStack direction={'row'} className="justify-end" gap={1}>
          {winiCom.checkMenuAut(
            'i',
            <WiniButton
              onClick={onReset}
              disabled={isScheduleAddDisabled}
            >
              초기화
            </WiniButton>,
          )}
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
        {selectedTrigger.triggerType === 'CRON' && cronExampleData && (
          <CronExampleDisplay
            errorMessage={cronExampleData.errorMessage}
            exampleList={cronExampleData.exampleList}
          />
        )}
        {selectedTrigger.triggerType === 'CRON' && <CronSyntaxHelp />}
      </WiniBox>
    );
  },
);
