// Get button disabled states
export const getButtonDisabledStates = (groupId, selectedJob) => ({
  insert: groupId === '' || selectedJob.id !== '',
  update: groupId === '' || selectedJob.id === '',
  delete: groupId === '' || selectedJob.id === '',
});

// Transform grid selection data to Job
export const transformGridSelectionToJob = (rowData) => {
  if (!rowData || rowData.length === 0) return null;
  return {
    id: rowData[0].id || '',
    name: rowData[0].name || '',
    className: rowData[0].className || '',
    sql: rowData[0].sql || '',
    remark: rowData[0].remark || '',
    commonJobGroupId: rowData[0].commonJobGroupId || '',
    jobType: rowData[0].jobType || '',
    status: rowData[0].status || 'ENABLE',
  };
};
