import {
    download,
    type ExcelCellValue,
    type ExcelColumn,
    type ExcelDownloadType,
    type ExcelDownloadPayload,
    type ExcelRow,
    type ExcelXlsxOptions,
} from './excel';

/**
 * ag-grid 컴포넌트 ref 형태.
 * current.api 접근이 가능한 최소 구조만 정의한다.
 */
type GridRefLike = {
    current?: {
        api?: any;
    };
};

/**
 * 단건 행 선택 옵션.
 * - idField: rowData에서 비교할 키 이름
 * - moveToPage: pagination 그리드에서 해당 행의 페이지로 먼저 이동할지 여부
 * - selectDelayMs: 페이지 이동 후 선택 타이밍 지연(ms)
 */
type SelectGridRowOptions = {
    idField?: string;
    moveToPage?: boolean;
    selectDelayMs?: number;
};

/**
 * 단일 선택 행 조회 옵션.
 * 선택 개수가 1개가 아닐 때 경고를 띄우고 싶으면 warn/warnMessage를 함께 전달한다.
 */
type GetSelectedSingleRowOptions = {
    warnMessage?: string;
    warn?: (message: string) => void;
};

/**
 * 첫 행 자동 선택 옵션.
 * ifNoneSelected=true 이면 이미 선택된 행이 있을 때는 아무 동작도 하지 않는다.
 */
type SelectFirstRowOptions = {
    ifNoneSelected?: boolean;
};

type GridExcelDownloadOptions = {
    options?: ExcelXlsxOptions;
    selectedOnly?: boolean;
    includeHiddenColumns?: boolean;
    type?: ExcelDownloadType;
    readOnlyKeys?: string[];
};

function toExcelCellValue(value: unknown): ExcelCellValue {
    if (
        value === null
        || value === undefined
        || typeof value === 'string'
        || typeof value === 'number'
        || typeof value === 'boolean'
    ) {
        return value;
    }

    if (value instanceof Date) {
        return value.toISOString();
    }

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

class winiGrid {
    /**
     * gridRef에서 ag-grid api를 안전하게 꺼낸다.
     * api가 없으면 null을 반환한다.
     */
    static getApi(gridRef: GridRefLike): any | null {
        return gridRef?.current?.api ?? null;
    }

    /**
     * api가 있을 때만 콜백을 실행하는 래퍼.
     * 화면 코드에서 null 체크 중복을 줄일 때 사용한다.
     */
    static withGridApi<T>(gridRef: GridRefLike, fn: (api: any) => T): T | null {
        const api = winiGrid.getApi(gridRef);
        if (!api) return null;
        return fn(api);
    }

    /**
     * idField 기준으로 일치하는 첫 번째 row node를 반환한다.
     * 찾지 못하면 null.
     */
    static findRowNodeById(gridRef: GridRefLike, id: any, idField = 'id'): any | null {
        const api = winiGrid.getApi(gridRef);
        if (!api || id === undefined || id === null) return null;

        let targetNode: any = null;
        api.forEachNode((node: any) => {
            if (targetNode) return;
            if (node?.data?.[idField] == id) {
                targetNode = node;
            }
        });
        return targetNode;
    }

    /**
     * ag-grid ref 에서 특정 id 행을 찾아 선택한다.
     * 옵션으로 pagination 페이지 이동/선택 지연을 제어할 수 있다.
     * 성공 시 true, 대상이 없거나 api가 없으면 false.
     */
    static selectRowById(gridRef: GridRefLike, id: any, options: SelectGridRowOptions = {}): boolean {
        const api = winiGrid.getApi(gridRef);
        if (!api || id === undefined || id === null) {
            return false;
        }

        const {
            idField = 'id',
            moveToPage = false,
            selectDelayMs = options?.selectDelayMs ?? 0
        } = options;

        const targetNode = winiGrid.findRowNodeById(gridRef, id, idField);

        if (!targetNode) {
            return false;
        }

        if (moveToPage && typeof api.paginationGetPageSize === 'function' && typeof api.paginationGoToPage === 'function') {
            const pageSize = api.paginationGetPageSize();
            if (pageSize > 0 && Number.isFinite(targetNode.rowIndex)) {
                const pageNumber = Math.floor(targetNode.rowIndex / pageSize);
                api.paginationGoToPage(pageNumber);
            }
        }

        const selectFn = () => {
            targetNode.setSelected(true);
        }
        if (selectDelayMs > 0) {
            setTimeout(selectFn, selectDelayMs);
        } else {
            selectFn();
        }

        return true;
    }

    /**
     * ids 목록과 일치하는 모든 행을 선택한다.
     * 반환값은 실제 선택된 행 개수.
     */
    static selectRowsByIds(gridRef: GridRefLike, ids: any[], idField = 'id'): number {
        const api = winiGrid.getApi(gridRef);
        if (!api || !Array.isArray(ids) || ids.length === 0) return 0;

        const idSet = new Set(ids);
        let count = 0;
        api.forEachNode((node: any) => {
            if (idSet.has(node?.data?.[idField])) {
                node.setSelected(true);
                count++;
            }
        });
        return count;
    }

    /**
     * 현재 그리드 선택을 전체 해제한다.
     */
    static clearSelection(gridRef: GridRefLike): boolean {
        const api = winiGrid.getApi(gridRef);
        if (!api) return false;
        api.deselectAll();
        return true;
    }

    /**
     * 현재 선택된 rowData 배열을 반환한다.
     * api 미존재 또는 메서드 미지원이면 빈 배열.
     */
    static getSelectedRows(gridRef: GridRefLike): any[] {
        const api = winiGrid.getApi(gridRef);
        if (!api || typeof api.getSelectedRows !== 'function') return [];
        return api.getSelectedRows() || [];
    }

    /**
     * 선택된 행이 정확히 1건일 때 그 rowData를 반환한다.
     * 0건/다건인 경우 null 반환.
     * 옵션으로 경고 메시지 콜백을 함께 사용할 수 있다.
     */
    static getSelectedSingleRow(gridRef: GridRefLike, options: GetSelectedSingleRowOptions = {}): any | null {
        const rows = winiGrid.getSelectedRows(gridRef);
        if (rows.length === 1) return rows[0];

        const { warnMessage, warn } = options;
        if (warnMessage && typeof warn === 'function') {
            warn(warnMessage);
        }
        return null;
    }

    /**
     * 그리드의 첫 행을 선택한다.
     * ifNoneSelected=true 이고 이미 선택이 있으면 기존 선택을 유지한다.
     */
    static selectFirstRow(gridRef: GridRefLike, options: SelectFirstRowOptions = {}): boolean {
        const api = winiGrid.getApi(gridRef);
        if (!api) return false;

        const { ifNoneSelected = false } = options;
        if (ifNoneSelected && winiGrid.getSelectedRows(gridRef).length > 0) {
            return true;
        }

        let firstNode: any = null;
        api.forEachNode((node: any) => {
            if (!firstNode) firstNode = node;
        });

        if (!firstNode) return false;
        firstNode.setSelected(true);
        return true;
    }

    /**
     * 현재 선택된 첫 행 위치로 스크롤 이동한다.
     * position은 top/middle/bottom 중 선택.
     */
    static scrollToSelected(gridRef: GridRefLike, position: 'top' | 'middle' | 'bottom' = 'middle'): boolean {
        const api = winiGrid.getApi(gridRef);
        if (!api || typeof api.ensureIndexVisible !== 'function') return false;

        const selectedRows = api.getSelectedNodes ? api.getSelectedNodes() : [];
        if (!selectedRows || selectedRows.length === 0) return false;

        const rowIndex = selectedRows[0]?.rowIndex;
        if (!Number.isFinite(rowIndex)) return false;
        api.ensureIndexVisible(rowIndex, position);
        return true;
    }

    /**
     * 특정 id 행의 rowData를 patch로 부분 업데이트한다.
     * (기존 data + patch 병합 후 setData)
     */
    static updateRowById(gridRef: GridRefLike, id: any, patch: Record<string, any>, idField = 'id'): boolean {
        const api = winiGrid.getApi(gridRef);
        if (!api || !patch) return false;

        const targetNode = winiGrid.findRowNodeById(gridRef, id, idField);
        if (!targetNode || !targetNode.data) return false;

        const nextData = { ...targetNode.data, ...patch };
        targetNode.setData(nextData);
        return true;
    }

    /**
     * 데이터 재조회 후 이전 선택 id를 복원할 때 사용하는 별칭 함수.
     * 내부적으로 selectRowById를 그대로 호출한다.
     */
    static reselectAfterDataLoad(gridRef: GridRefLike, id: any, options: SelectGridRowOptions = {}): boolean {
        return winiGrid.selectRowById(gridRef, id, options);
    }

    /**
     * 현재 그리드의 컬럼과 행을 공통 엑셀 다운로드 요청 형식으로 변환한다.
     * 기본값은 화면에 표시된 컬럼과 필터/정렬이 적용된 전체 행이다.
     */
    static createExcelPayload(
        gridRef: GridRefLike,
        config: GridExcelDownloadOptions = {},
    ): ExcelDownloadPayload | null {
        const api = winiGrid.getApi(gridRef);
        if (!api) return null;

        const {
            options = {},
            selectedOnly = false,
            includeHiddenColumns = false,
            type = 'xlsx',
            readOnlyKeys = [],
        } = config;
        const gridColumns = includeHiddenColumns
            ? api.getAllGridColumns?.()
            : api.getAllDisplayedColumns?.();
        const exportColumns = (gridColumns ?? []).filter((column: any) => {
            const columnDef = column.getColDef?.();
            return Boolean(columnDef?.field);
        });
        const readOnlyKeySet = new Set(readOnlyKeys);
        const columns: ExcelColumn[] = exportColumns.map((column: any) => {
            const columnDef = column.getColDef();
            const actualWidth = column.getActualWidth?.() ?? 100;
            const key = columnDef.field as string;
            const nextColumn: ExcelColumn = {
                key,
                header: columnDef.headerName ?? columnDef.field,
                width: Math.max(1, Math.round(actualWidth / 7)),
            };

            if (type !== 'csv') {
                nextColumn.readOnly = readOnlyKeySet.has(key);
            }

            return nextColumn;
        });
        const dataList: ExcelRow[] = [];

        api.forEachNodeAfterFilterAndSort((node: any) => {
            if (!node?.data || (selectedOnly && !node.isSelected?.())) return;

            const row = exportColumns.reduce((result: ExcelRow, column: any) => {
                const field = column.getColDef().field as string;
                const value = typeof api.getValue === 'function'
                    ? api.getValue(column, node)
                    : node.data[field];

                result[field] = toExcelCellValue(value);
                return result;
            }, {});

            dataList.push(row);
        });

        const nextOptions = type === 'csv'
            ? {
                ...(options.fileName !== undefined ? { fileName: options.fileName } : {}),
                ...(options.useRowNumber !== undefined
                    ? { useRowNumber: options.useRowNumber }
                    : {}),
            }
            : options;

        return {
            columns,
            dataList,
            options: nextOptions,
        };
    }

    /**
     * 현재 그리드를 공통 엑셀 형식으로 변환한 뒤 다운로드 API를 호출한다.
     * API가 없거나 내보낼 컬럼이 없으면 false를 반환한다.
     */
    static async downloadExcel(
        gridRef: GridRefLike,
        serviceName: string,
        config: GridExcelDownloadOptions = {},
    ): Promise<boolean> {
        const payload = winiGrid.createExcelPayload(gridRef, config);
        if (!payload || payload.columns.length === 0) return false;

        await download(serviceName, payload, config.type ?? 'xlsx');
        return true;
    }
}

export default winiGrid;
