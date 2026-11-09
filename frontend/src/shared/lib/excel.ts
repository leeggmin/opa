import { Communicator } from '@/shared/api';
import { winiMsg } from '../model';

export type ExcelCellValue = string | number | boolean | null | undefined;

export type ExcelRow = Record<string, ExcelCellValue>;

export type ExcelDownloadType = 'xlsx' | 'csv';

export interface ExcelColumn {
  key: string;
  header: string;
  width?: number;
  readOnly?: boolean;
}

export type ExcelCsvColumn = Omit<ExcelColumn, 'readOnly'>;

export interface ExcelBaseOptions {
  fileName?: string;
  useRowNumber?: boolean;
}

export interface ExcelCsvOptions extends ExcelBaseOptions {}

export interface ExcelXlsxOptions extends ExcelBaseOptions {
  excelTitle?: string;
  useSheetProtect?: boolean;
  sheetProtectPasswd?: string;
}

export interface ExcelCsvPayload {
  columns: ExcelCsvColumn[];
  dataList: ExcelRow[];
  options?: ExcelCsvOptions;
}

export interface ExcelXlsxPayload {
  columns: ExcelColumn[];
  dataList: ExcelRow[];
  options?: ExcelXlsxOptions;
}

export type ExcelDownloadPayload = ExcelXlsxPayload | ExcelCsvPayload;

export type ExcelDownloadOptions = ExcelXlsxOptions;

const DEFAULT_XLSX_FILE_NAME = 'download.xlsx';
const DEFAULT_CSV_FILE_NAME = 'download.csv';

const CONTENT_TYPE_BY_TYPE: Record<ExcelDownloadType, string> = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv; charset=utf-8',
};

function getDefaultFileName(type: ExcelDownloadType): string {
  return type === 'csv' ? DEFAULT_CSV_FILE_NAME : DEFAULT_XLSX_FILE_NAME;
}

function assertServiceName(serviceName: string): boolean {
  if (!serviceName.trim()) {
    winiMsg.showSnackbar('엑셀 다운로드 서비스명이 필요합니다.');
    return false;
  }
  return true;
}

function assertColumns(columns: Array<{ key?: string; header?: string }>): boolean {
  if (!Array.isArray(columns) || columns.length === 0) {
    winiMsg.showSnackbar('엑셀 컬럼(columns)이 필요합니다.');
    return false;
  }
  
  if (columns.some((column) => !column.key?.trim() || !column.header?.trim())) {
    winiMsg.showSnackbar('각 컬럼의 key와 header는 필수입니다.');
    return false;
  }
  return true;
}

function hasReadOnlyColumn(columns: ExcelColumn[]): boolean {
  return columns.some((column) => column.readOnly === true);
}

function assertXlsxProtectRule(payload: ExcelXlsxPayload): boolean {
  const needsPassword =
    hasReadOnlyColumn(payload.columns) ||
    payload.options?.useSheetProtect === true;
  const password = payload.options?.sheetProtectPasswd?.trim();

  if (needsPassword && !password) {
    winiMsg.showSnackbar(
      'readOnly 또는 useSheetProtect가 true이면 sheetProtectPasswd는 필수입니다.',
    );
    return false;
  }

  return true;
}

function assertCsvRestrictions(payload: ExcelCsvPayload): void {
  const columns = payload.columns as ExcelColumn[];
  if (hasReadOnlyColumn(columns)) {
    winiMsg.showSnackbar('CSV 다운로드는 readOnly를 사용할 수 없습니다.');
    
  }

  const options = payload.options as ExcelXlsxOptions | undefined;
  if (options?.excelTitle) {
    winiMsg.showSnackbar('CSV 다운로드는 excelTitle을 사용할 수 없습니다.');
    options.excelTitle='';
  }
  if (options?.useSheetProtect) {
    winiMsg.showSnackbar('CSV 다운로드는 useSheetProtect를 사용할 수 없습니다.');
    options.useSheetProtect=false;
  }
}

function toCsvRequestPayload(payload: ExcelCsvPayload): ExcelCsvPayload {
  return {
    columns: payload.columns.map(({ key, header, width }) => ({
      key,
      header,
      ...(width !== undefined ? { width } : {}),
    })),
    dataList: payload.dataList,
    options: {
      ...(payload.options?.fileName !== undefined
        ? { fileName: payload.options.fileName }
        : {}),
      ...(payload.options?.useRowNumber !== undefined
        ? { useRowNumber: payload.options.useRowNumber }
        : {}),
    },
  };
}

function getFileName(contentDisposition?: string, fallback = DEFAULT_XLSX_FILE_NAME): string {
  if (!contentDisposition) return fallback;

  const encodedFileName = contentDisposition.match(
    /filename\*\s*=\s*UTF-8''([^;]+)/i,
  )?.[1];

  if (encodedFileName) {
    try {
      return decodeURIComponent(encodedFileName.replace(/["']/g, ''));
    } catch {
      return encodedFileName.replace(/["']/g, '');
    }
  }

  const fileName = contentDisposition.match(/filename\s*=\s*"?([^";]+)"?/i)?.[1];
  return fileName?.trim() || fallback;
}

function saveResponseAsFile(
  data: BlobPart,
  fileName: string,
  contentType = CONTENT_TYPE_BY_TYPE.xlsx,
): void {
  const objectUrl = window.URL.createObjectURL(
    new Blob([data], { type: contentType }),
  );
  const link = document.createElement('a');

  link.href = objectUrl;
  link.download = fileName;
  link.style.display = 'none';

  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    window.URL.revokeObjectURL(objectUrl);
  }
}

function toText(body: unknown): string | null {
  if (typeof body === 'string') return body;
  if (body instanceof ArrayBuffer) {
    return new TextDecoder().decode(new Uint8Array(body));
  }
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(
      new Uint8Array(body.buffer, body.byteOffset, body.byteLength),
    );
  }
  return null;
}

function pickMessage(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

/**
 * responseType이 arraybuffer라 에러 본문도 JSON이 아닌 ArrayBuffer로 도착한다.
 */
function readErrorBody(body: unknown): string | null {
  if (!body) return null;

  const text = toText(body);

  if (text === null) {
    if (typeof body !== 'object') return null;
    const payload = body as { message?: unknown; data?: unknown };
    return pickMessage(payload.message) ?? readErrorBody(payload.data);
  }

  if (!text.trim()) return null;

  try {
    const parsed = JSON.parse(text);
    return (
      pickMessage(parsed?.message) ??
      pickMessage(parsed?.data?.message) ??
      pickMessage(parsed?.error) ??
      null
    );
  } catch {
    return text.trim();
  }
}

/**
 * http 인터셉터가 axios 에러를 normalizeHttpError 형태로 감싸 reject하므로
 * error.response 대신 data.data / originalError 쪽 본문까지 확인한다.
 */
function getDownloadErrorMessage(error: unknown): string {
  const handled = error as {
    message?: unknown;
    data?: unknown;
    response?: { data?: unknown };
    originalError?: { response?: { data?: unknown }; message?: unknown };
  };

  const candidates = [
    handled?.response?.data,
    handled?.originalError?.response?.data,
    handled?.data,
    pickMessage(handled?.message),
    pickMessage(handled?.originalError?.message),
  ];

  for (const candidate of candidates) {
    const message = readErrorBody(candidate);
    if (message) return message;
  }

  return '엑셀 다운로드 오류';
}

async function requestDownload(
  serviceName: string,
  type: ExcelDownloadType,
  payload: ExcelDownloadPayload,
): Promise<void> {
  const connector = new Communicator();
  connector.client.defaults.headers.common['X-Menu-Id'] = null;
  const response = await connector.client.post(
    `/api/v1/${serviceName}/commonExcel/${type}`,
    payload,
    {
      responseType: 'arraybuffer',
    },
  );

  const responseData = response.data?.data ?? response.data;
  const contentDisposition = response.headers?.['content-disposition'];
  const contentType =
    response.headers?.['content-type'] ?? CONTENT_TYPE_BY_TYPE[type];
  const fileName = getFileName(
    contentDisposition,
    payload.options?.fileName ?? getDefaultFileName(type),
  );

  saveResponseAsFile(responseData, fileName, contentType);
}

export async function downloadXlsx(
  serviceName: string,
  payload: ExcelXlsxPayload,
): Promise<void> {
  if (!assertServiceName(serviceName)) {
    return;
  }
  if (!assertColumns(payload.columns)) {
    return;
  }
  if (!assertXlsxProtectRule(payload)) {
    return ;
  }
  try {
    await requestDownload(serviceName, 'xlsx', payload);
  } catch (error) {
    winiMsg.showSnackbar(getDownloadErrorMessage(error));
  }
}

export async function downloadCsv(
  serviceName: string,
  payload: ExcelCsvPayload,
): Promise<void> {
  if (!assertServiceName(serviceName)) {
    return;
  }
  if (!assertColumns(payload.columns)) {
    return;
  }
  assertCsvRestrictions(payload);
  try {
    await requestDownload(serviceName, 'csv', toCsvRequestPayload(payload));
  } catch (error) {
    winiMsg.showSnackbar(getDownloadErrorMessage(error));
  }
}

export async function download(
  serviceName: string,
  payload: ExcelXlsxPayload,
  type?: 'xlsx',
): Promise<void>;
export async function download(
  serviceName: string,
  payload: ExcelCsvPayload,
  type: 'csv',
): Promise<void>;
export async function download(
  serviceName: string,
  payload: ExcelDownloadPayload,
  type?: ExcelDownloadType,
): Promise<void>;
export async function download(
  serviceName: string,
  payload: ExcelDownloadPayload,
  type: ExcelDownloadType = 'xlsx',
): Promise<void> {
  if (type === 'csv') {
    await downloadCsv(serviceName, payload as ExcelCsvPayload);
    return;
  }

  await downloadXlsx(serviceName, payload as ExcelXlsxPayload);
}

export const downloadExcel = download;

class winiExcel {
  static download = download;
  static downloadXlsx = downloadXlsx;
  static downloadCsv = downloadCsv;
}
export default winiExcel;
