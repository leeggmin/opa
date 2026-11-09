import { forwardRef } from 'react';
import { WiniAgGridReact, WiniBox, WiniPagination } from '@/shared/ui/wini';
import { winiDate } from '@/shared/lib';
import { jobStatusEnums } from '../model/constants';

export const ScheduleHistoryGrid = forwardRef(
  ({ runList, pagesInfo, onPageChange }, ref) => {
    return (
      <>
        <WiniBox className="h-[472px]">
          <WiniAgGridReact
            ref={ref}
            rowData={runList}
            columnDefs={[
              {
                field: 'startedAt',
                headerName: '시작일시',
                width: 200,
                cellStyle: { textAlign: 'center' },
                sortable: false,
                valueFormatter: (data) =>
                  data.value
                    ? winiDate.dateFormat(
                        winiDate(data.value),
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    : '',
              },
              {
                field: 'endedAt',
                headerName: '종료일시',
                width: 200,
                cellStyle: { textAlign: 'center' },
                sortable: false,
                valueFormatter: (data) =>
                  data.value
                    ? winiDate.dateFormat(
                        winiDate(data.value),
                        'YYYY-MM-DD HH:mm:ss',
                      )
                    : '',
              },
              {
                field: 'jobStatus',
                headerName: '작업결과',
                width: 120,
                cellStyle: { textAlign: 'center' },
                sortable: false,
                valueFormatter: (data) =>
                  data.value ? jobStatusEnums[data.value] : '',
              },
              {
                field: 'message',
                headerName: '메세지',
                width: 500,
                sortable: false,
              },
            ]}
          />
        </WiniBox>
        <WiniBox className="flex items-center justify-center">
          <WiniPagination
            totalRecords={pagesInfo.totalCnt}
            pageSize={pagesInfo.pageSize}
            size="small"
            onChange={onPageChange}
          />
        </WiniBox>
      </>
    );
  },
);

ScheduleHistoryGrid.displayName = 'ScheduleHistoryGrid';
