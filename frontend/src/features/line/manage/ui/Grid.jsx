import { useMemo } from 'react';

import { WiniAgGridReact, WiniBox, WiniButton, WiniGridItem, WiniGridLayout, WiniStack } from '@/shared/ui/wini';

export const Grid = ({ rowData, onRowDoubleClicked, onAddLine }) => {
    const columnDefs = useMemo(
        () => [
            { field: 'lineName', headerName: '회선명', width: 200, cellStyle: { textAlign: 'center' }, sortable: false },
            { field: 'lineInfo', headerName: '회선정보', width: 200, cellStyle: { textAlign: 'center' }, sortable: false },
            { field: 'fullName', headerName: '담당자', width: 180, cellStyle: { textAlign: 'center' }, sortable: false },
        ],
        [],
    );

    return (
        <WiniGridItem size={{ xs: 12, md: 8 }}>
            <WiniBox className="mt-1 w-[99%]">
                <WiniBox className="w-full h-[620px] mt-1">
                    <WiniAgGridReact rowData={rowData} columnDefs={columnDefs} onRowDoubleClicked={onRowDoubleClicked} />

                    <WiniStack alignItems="flex-end">
                        <WiniButton ui="default" className="m-1 ml-1" onClick={onAddLine}>
                            회선 등록
                        </WiniButton>
                    </WiniStack>
                </WiniBox>
            </WiniBox>
        </WiniGridItem>
    );
}
