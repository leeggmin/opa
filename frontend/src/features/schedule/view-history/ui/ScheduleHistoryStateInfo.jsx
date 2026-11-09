import { WiniBox, WiniText } from '@/shared/ui/wini';
import { winiCom, winiDate } from '@/shared/lib';

export const ScheduleHistoryStateInfo = ({ jobName, jobState }) => {
  return (
    <WiniBox>
      <WiniText
        label={'작업명'}
        name={'name'}
        value={jobName}
        readOnly
      />

      <WiniBox className="grid grid-cols-2 gap-2 mt-2">
        <WiniText
          label="최종 시작시간"
          className="w-full"
          value={
            winiCom.toEmpty(jobState.lastStartedAt) === ''
              ? ''
              : winiDate.dateFormat(
                  winiDate(jobState.lastStartedAt),
                  'YYYY-MM-DD HH:mm:ss',
                )
          }
          readOnly
        />
        <WiniText
          label="최종 성공 일시"
          className="w-full"
          value={
            winiCom.toEmpty(jobState.lastSuccessAt) === ''
              ? ''
              : winiDate.dateFormat(
                  winiDate(jobState.lastSuccessAt),
                  'YYYY-MM-DD HH:mm:ss',
                )
          }
          readOnly
        />
        <WiniText
          label="최종 종료시간"
          className="w-full"
          value={
            winiCom.toEmpty(jobState.lastEndedAt) === ''
              ? ''
              : winiDate.dateFormat(
                  winiDate(jobState.lastEndedAt),
                  'YYYY-MM-DD HH:mm:ss',
                )
          }
          readOnly
        />
        <WiniText
          label="최종 실패 일시"
          className="w-full"
          value={
            winiCom.toEmpty(jobState.lastFailedAt) === ''
              ? ''
              : winiDate.dateFormat(
                  winiDate(jobState.lastFailedAt),
                  'YYYY-MM-DD HH:mm:ss',
                )
          }
          readOnly
        />
      </WiniBox>
      <WiniText
        readOnly
        multiline
        rows={2}
        label={'최종메세지'}
        value={jobState.lastMessage}
        className='mt-2'
      />
    </WiniBox>
  );
};
