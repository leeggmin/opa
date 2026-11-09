// Get button disabled states for JobTriggerForm
export const getButtonDisabledStates = (
  groupId,
  jobId,
  selectedTriggerId,
) => ({
  scheduleAdd: groupId === '' || jobId === '',
  insert: groupId === '' || jobId === '' || selectedTriggerId !== '',
  update: groupId === '' || jobId === '' || selectedTriggerId === '',
  delete: groupId === '' || jobId === '' || selectedTriggerId === '',
});

// CRON syntax help content
export const CRON_SYNTAX_HELP = {
  title: 'CRON 문법',
  pattern: '1 2 3 4 * ?',
  description: [
    '┬ ┬ ┬ ┬ ┬ ┬',
    '│ │ │ │ │ └ 요일 (1:월 - 7:일, 1L - 7L)',
    '│ │ │ │ └── 월 (1 - 12)',
    '│ │ │ └──── 일 (1 - 31, L)',
    '│ │ └────── 시 (0 - 23)',
    '│ └──────── 분 (0 - 59)',
    '└────────── 초 (0 - 59)',
  ],
  examples: [
    '0 0 9 * * 1,2,3,4,5 : 월~금요일 09시 정각',
    '*/6 * * * * ? : 매 6초마다 실행',
    '1 2 3 * 5 6 : 5월 매 토요일 3시 2분 1초',
    '10 21 23 * * 7 : 매 일요일 23시 21분 10초',
  ],
};

// Transform grid selection data to JobTrigger
export const transformGridSelectionToTrigger = (rowData) => {
  if (!rowData || rowData.length === 0) return null;
  return {
    commonJobId: rowData[0].commonJobId || '',
    commonJobTriggerId: rowData[0].commonJobTriggerId || '',
    name: rowData[0].name || '',
    status: rowData[0].status || 'ENABLE',
    triggerCron: rowData[0].triggerCron || '',
    triggerSeconds: rowData[0].triggerSeconds || null,
    triggerType: rowData[0].triggerType || '',
  };
};
