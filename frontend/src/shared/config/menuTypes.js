// 메뉴 관리 관련 상수 정의

export const MENU_TYPE = {
  MENU: 'MENU',
  PROGRAM: 'PROGRAM',
};

export const MENU_STATUS = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
};

export const ACTION_TYPE = {
  RESTAPI: 'RESTAPI',
  QUERYID: 'QUERYID',
};

export const AUTH_TYPE = {
  SELECT: 'SELECT',
  INSERT: 'INSERT',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  PRINT: 'PRINT',
  DOWN: 'DOWN',
  MANAGE: 'MANAGE',
};

// UI 표시용 Enum 맵핑
export const ACTION_TYPE_LABELS = {
  RESTAPI: 'REST API',
  QUERYID: 'QUERY ID',
};

export const AUTH_TYPE_LABELS = {
  SELECT: 'SELECT (get)',
  INSERT: 'INSERT (post)',
  UPDATE: 'UPDATE (patch)',
  DELETE: 'DELETE (delete)',
  PRINT: 'PRINT',
  DOWN: 'DOWN',
  MANAGE: 'MANAGE',
};

export const STATUS_LABELS = {
  DISABLE: '미사용',
  ENABLE: '사용',
};

// 프로그램 매핑 상태
export const PROGRAM_MAPPING_STATUS = {
  FIXED: 'FIXED',
  DEFAULT: 'DEFAULT',
};
