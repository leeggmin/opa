// Job Group utility functions

export const createStatusChangeHandler = (onChange) => (field, value) => {
  onChange({
    [field]: value,
  });
};

export const getButtonDisabledState = (selectedJobGroup) => ({
  insert: selectedJobGroup.commonJobGroupId !== '',
  update: selectedJobGroup.commonJobGroupId === '',
  delete: selectedJobGroup.commonJobGroupId === '',
});

export const transformGridSelectionToJobGroup = (rowData) => {
  if (!rowData || rowData.length === 0) return null;
  return {
    commonJobGroupId: rowData[0].commonJobGroupId || '',
    name: rowData[0].name || '',
    remark: rowData[0].remark || '',
    status: rowData[0].status || 'ENABLE',
  };
};
