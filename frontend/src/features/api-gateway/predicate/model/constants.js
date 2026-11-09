export const statusEnums = {
  ENABLE: '사용',
  DISABLE: '미사용',
};

export const predicateTypeEnum = {
  PATH: '경로 (Path)',
  HOST: '호스트명 (Host)',
  METHOD: 'HTTP Method',
  COOKIE: '쿠키 (Cookie)',
  HEADER: '헤더 (Header)',
  QUERY: '쿼리 (Query)',
  WEIGHT: '가중치 (Weight)',
};

export const INITIAL_PREDICATE = {
  predicateId: '',
  predicateType: '',
  key: '',
  definition: '',
  hostnames: '',
  methods: {},
  paths: '',
  weight: 1,
  status: 'ENABLE',
};

export const INITIAL_SEARCH_PREDICATE = {
  predicateType: '',
  searchKeyword: '',
  status: 'ENABLE',
};

export const PREDICATE_GRID_COLUMNS = [
  {
    field: 'predicateType',
    headerName: '조건절 유형',
    width: 100,
    cellStyle: { textAlign: 'center' },
    sortable: false,
  },
  {
    field: 'key',
    headerName: '키',
    flex: 1,
    cellStyle: { textAlign: 'center' },
    sortable: false,
  },
  {
    field: 'definition',
    headerName: '값',
    width: 90,
    cellStyle: { textAlign: 'center' },
    sortable: false,
  },
];
