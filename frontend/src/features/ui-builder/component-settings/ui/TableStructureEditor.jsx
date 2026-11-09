import React from 'react';
import {
    WiniBox,
    WiniButton,
    WiniGridItem,
    WiniGridLayout,
    WiniMenuItem,
    WiniNumber,
    WiniSelect,
    WiniText,
    WiniTypography,
} from '@/shared/ui/wini';

const SECTION_LABELS = {
    head: '헤더',
    body: '본문',
    footer: '푸터',
};

const SECTION_ORDER = ['head', 'body', 'footer'];

const sortRowsBySection = (tableRows = []) =>
    SECTION_ORDER.flatMap((section) =>
        tableRows.filter((row) => (row.section || 'body') === section),
    );

export const TableStructureEditor = ({
    tableRows,
    onAddRow,
    onUpdateRow,
    onRemoveRow,
    onAddCell,
    onUpdateCell,
    onRemoveCell,
    onCommit,
    isWide = false,
}) => (
    <WiniBox ui="noAutoGap">
        <WiniBox className="flex items-center justify-end gap-2">
            <WiniBox className="flex flex-wrap justify-end gap-1" ui="noAutoGap">
                {Object.entries(SECTION_LABELS).map(([section, label]) => (
                    <WiniButton
                        key={section}
                        ui="lineGray"
                        onClick={() => onAddRow(section)}
                        className="border rounded-md px-2 cursor-pointer"
                    >
                        {label} 행 추가
                    </WiniButton>
                ))}
            </WiniBox>
        </WiniBox>

        {sortRowsBySection(tableRows).map((row, rowIndex) => (
            <WiniBox key={row.id} className="border border-[#e1e1e1] rounded-md p-2 mt-2">
                <WiniBox className="flex items-center justify-between gap-2">
                    <WiniTypography variant="body2" className="font-semibold">
                        행 {rowIndex + 1}
                    </WiniTypography>
                    <WiniBox className="flex gap-1">
                        <WiniButton
                            ui="lineGray"
                            onClick={() => onAddCell(row.id)}
                            className="border rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            셀 추가
                        </WiniButton>
                        <WiniButton
                            ui="delete"
                            onClick={() => onRemoveRow(row.id)}
                            className="border border-[#ccc] rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            행 삭제
                        </WiniButton>
                    </WiniBox>
                </WiniBox>

                <WiniBox className="mt-2">
                    <WiniSelect
                        ui="column"
                        label="영역"
                        value={row.section || 'body'}
                        onChange={(event) => {
                            onUpdateRow(row.id, { section: event.target.value });
                            onCommit();
                        }}
                    >
                        <WiniMenuItem value="head">헤더 (WiniTableHead)</WiniMenuItem>
                        <WiniMenuItem value="body">본문 (WiniTableBody)</WiniMenuItem>
                        <WiniMenuItem value="footer">푸터 (WiniTableFooter)</WiniMenuItem>
                    </WiniSelect>
                </WiniBox>

                <WiniBox
                    className={isWide
                        ? 'grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3 mt-3'
                        : ''}
                >
                {(row.cells || []).map((cell, cellIndex) => (
                    <WiniBox
                        key={cell.id}
                        className={`border-l-2 border-[#c5cde0] pl-2 ${isWide ? '' : 'mt-3'}`}
                        ui="noAutoGap"
                    >
                        <WiniBox className="flex items-center justify-between gap-2 mb-2">
                            <WiniTypography variant="caption" className="font-semibold">
                                셀 {cellIndex + 1}
                            </WiniTypography>
                            <WiniButton
                                ui="delete"
                                onClick={() => onRemoveCell(row.id, cell.id)}
                                className="border border-[#ccc] rounded-md px-1.5 py-0.5 cursor-pointer"
                            >
                                셀 삭제
                            </WiniButton>
                        </WiniBox>

                        <WiniGridLayout container ui="form" rowItem={2} columnSpacing={1} rowSpacing={1}>
                            <WiniGridItem>
                                <WiniText
                                    ui="column"
                                    label="내용"
                                    value={cell.content || ''}
                                    onChange={(event) => onUpdateCell(row.id, cell.id, { content: event.target.value })}
                                />
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniSelect
                                    ui="column"
                                    label="셀 종류"
                                    value={cell.component || 'td'}
                                    onChange={(event) => {
                                        onUpdateCell(row.id, cell.id, {
                                            component: event.target.value,
                                            scope: event.target.value === 'th' ? cell.scope || 'col' : '',
                                        });
                                        onCommit();
                                    }}
                                >
                                    <WiniMenuItem value="td">데이터 셀 (td)</WiniMenuItem>
                                    <WiniMenuItem value="th">헤더 셀 (th)</WiniMenuItem>
                                </WiniSelect>
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniSelect
                                    ui="column"
                                    label="정렬"
                                    value={cell.align || 'inherit'}
                                    onChange={(event) => {
                                        onUpdateCell(row.id, cell.id, { align: event.target.value });
                                        onCommit();
                                    }}
                                >
                                    <WiniMenuItem value="inherit">기본</WiniMenuItem>
                                    <WiniMenuItem value="left">왼쪽</WiniMenuItem>
                                    <WiniMenuItem value="center">가운데</WiniMenuItem>
                                    <WiniMenuItem value="right">오른쪽</WiniMenuItem>
                                    <WiniMenuItem value="justify">양쪽</WiniMenuItem>
                                </WiniSelect>
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniSelect
                                    ui="column"
                                    label="scope"
                                    value={cell.scope || ''}
                                    disabled={cell.component !== 'th'}
                                    onChange={(event) => {
                                        onUpdateCell(row.id, cell.id, { scope: event.target.value });
                                        onCommit();
                                    }}
                                >
                                    <WiniMenuItem value="">없음</WiniMenuItem>
                                    <WiniMenuItem value="col">col</WiniMenuItem>
                                    <WiniMenuItem value="row">row</WiniMenuItem>
                                    <WiniMenuItem value="colgroup">colgroup</WiniMenuItem>
                                    <WiniMenuItem value="rowgroup">rowgroup</WiniMenuItem>
                                </WiniSelect>
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniNumber
                                    ui="column"
                                    label="rowSpan"
                                    value={cell.rowSpan || 1}
                                    onChange={(event) => onUpdateCell(row.id, cell.id, {
                                        rowSpan: Math.max(1, Number(event.target.value) || 1),
                                    })}
                                />
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniNumber
                                    ui="column"
                                    label="colSpan"
                                    value={cell.colSpan || 1}
                                    onChange={(event) => onUpdateCell(row.id, cell.id, {
                                        colSpan: Math.max(1, Number(event.target.value) || 1),
                                    })}
                                />
                            </WiniGridItem>
                            <WiniGridItem>
                                <WiniText
                                    ui="column"
                                    label="ui"
                                    value={cell.ui || ''}
                                    onChange={(event) => onUpdateCell(row.id, cell.id, { ui: event.target.value })}
                                    placeholder="예: gray"
                                />
                            </WiniGridItem>
                        </WiniGridLayout>
                    </WiniBox>
                ))}
                </WiniBox>

                {/* <WiniBox className="flex items-center justify-end" ui="noAutoGap">
                    <WiniButton
                        ui="lineGray"
                        onClick={() => onAddCell(row.id)}
                        className="border rounded-md px-2 mt-2 cursor-pointer"
                    >
                        셀 추가
                    </WiniButton>
                </WiniBox> */}
            </WiniBox>
        ))}
    </WiniBox>
);
