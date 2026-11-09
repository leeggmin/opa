export const statusEnums = {
  ENABLE: '사용',
  DISABLE: '미사용',
};

export const applyStatusEnums = {
  PENDING: { description: '대기', color: '#ffb74d' },
  SUCCESSFUL: { description: '적용됨', color: '#4caf50' },
  FAILED: { description: '실패', color: '#f44336' },
};

export const INITIAL_ROUTE = {
  routeId: '',
  name: '',
  uri: '',
  remark: '',
  sortSeq: 0,
  status: 'ENABLE',
};

export const INITIAL_SEARCH_ROUTE = {
  name: '',
  status: 'ENABLE',
};
