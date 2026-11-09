import React, { useEffect, useMemo, useState } from 'react';
import {
    WiniAccordion,
    WiniAccordionDetails,
    WiniAccordionSummary,
    WiniAgGridReact,
    WiniCodeEditor,
    WiniDateTimePicker,
    WiniDialogTitle,
    WiniDialogContent,
    WiniDialogContentText,
    WiniDialogActions,
    WiniBox,
    WiniButton,
    WiniButtonGroup,
    WiniCheckbox,
    WiniIcon,
    WiniIconButton,
    WiniList,
    WiniListItem,
    WiniListItemText,
    WiniMenuItem,
    WiniPagination,
    WiniRadio,
    WiniSelect,
    WiniTab,
    WiniTabs,
    WiniText,
    WiniSwitch,
    WiniTable,
    WiniTableBody,
    WiniTableCell,
    WiniTableContainer,
    WiniTableFooter,
    WiniTableHead,
    WiniTableRow,
    WiniToggleButton,
    WiniTreeItem,
    WiniTreeView,
    WiniTypography,
    WiniGridLayout,
    WiniGridItem,
} from '@/shared/ui/wini';
import { PREVIEW_GRID_COLUMNS, PREVIEW_GRID_ROWS, PREVIEW_TREE_DATA } from '../model/canvasUtils';

const renderTableRows = (rows) =>
    rows.map((row, rowIndex) => (
        <WiniTableRow key={row.id || `table-row-${rowIndex}`}>
            {(row.cells || []).map((cell, cellIndex) => (
                <WiniTableCell
                    key={cell.id || `table-cell-${rowIndex}-${cellIndex}`}
                    component={cell.component === 'th' ? 'th' : 'td'}
                    align={cell.align || 'inherit'}
                    scope={cell.component === 'th' && cell.scope ? cell.scope : undefined}
                    rowSpan={Math.max(1, Number(cell.rowSpan) || 1)}
                    colSpan={Math.max(1, Number(cell.colSpan) || 1)}
                    ui={cell.ui || undefined}
                >
                    {cell.content || ''}
                </WiniTableCell>
            ))}
        </WiniTableRow>
    ));

export const ItemPreview = ({ item, hideLayoutContainers = false, onUpdateItem }) => {
    const treeHeight = Math.max(60, Math.floor(item.height) - 12);
    const tabItems = useMemo(() => {
        if (item.type !== 'WiniTab') return [];
        if ((item.tabItems || []).length > 0) return item.tabItems;
        return [
            { id: 'preview-tab-1', label: '탭 1', value: 'tab-1', event: '' },
            { id: 'preview-tab-2', label: '탭 2', value: 'tab-2', event: '' },
        ];
    }, [item.type, item.tabItems]);

    const [activeTabValue, setActiveTabValue] = useState(() => item.activeTabValue || tabItems[0]?.value || 'tab-1');

    useEffect(() => {
        const fromItem = item.activeTabValue || tabItems[0]?.value || 'tab-1';
        setActiveTabValue(fromItem);
    }, [item.activeTabValue, tabItems]);

    useEffect(() => {
        const hasActiveTab = tabItems.some((tabItem) => tabItem.value === activeTabValue);
        if (!hasActiveTab) setActiveTabValue(tabItems[0]?.value || 'tab-1');
    }, [activeTabValue, tabItems]);

    const invokeNamedEvent = (eventName, value) => {
        if (!eventName) return;

        const handler = window?.[eventName];
        if (typeof handler === 'function') {
            handler(value, item);
        }
    };

    switch (item.type) {
        case 'WiniText':
            return (
                <WiniText
                    value={item.label}
                    placeholder="텍스트 입력"
                    size="small"
                    fullWidth
                    className="h-full [&_.MuiInputBase-root]:h-full [&_.MuiInputBase-input]:h-full [&_.MuiInputBase-input]:box-border"
                />
            );

        case 'WiniSelect': {
            const menuItems = (item.menuItems || []).filter((menuItem) => menuItem.value);
            const labelValue = '__label__';

            return (
                <WiniSelect value={labelValue} size="small" fullWidth displayEmpty className="h-full">
                    <WiniMenuItem value={labelValue}>{item.label || '선택값'}</WiniMenuItem>
                    {menuItems.map((menuItem) => (
                        <WiniMenuItem key={menuItem.id} value={menuItem.id}>
                            {menuItem.value}
                        </WiniMenuItem>
                    ))}
                </WiniSelect>
            );
        }

        case 'WiniRadio':
            return (
                <WiniBox className="flex items-center gap-2 h-full">
                    <WiniRadio checked readOnly />
                    <WiniTypography variant="body2">{item.label}</WiniTypography>
                </WiniBox>
            );

        case 'WiniCheckbox':
            return (
                <WiniBox className="flex items-center gap-2 h-full">
                    <WiniCheckbox checked readOnly />
                    <WiniTypography variant="body2">{item.label}</WiniTypography>
                </WiniBox>
            );

        case 'WiniInputLabel':
            return (
                <WiniTypography variant="body2" className="font-semibold text-[#344054]">
                    {item.label}
                </WiniTypography>
            );

        case 'WiniTypography':
            return (
                <WiniTypography variant={item.typographyVariant || 'h5'} color="text.secondary">
                    {item.typographyContent || '텍스트 예시입니다.'}
                </WiniTypography>
            );

        case 'WiniSwitch':
            return (
                <WiniBox className="h-full flex items-center">
                    <WiniSwitch checked readOnly label={item.label} />
                </WiniBox>
            );

        case 'WiniDateTimePicker':
            return (
                <WiniDateTimePicker
                    label={item.label || '날짜 + 시간'}
                    views={['year', 'month', 'day', 'hours', 'minutes']}
                    format="YYYY-MM-DD HH:mm"
                    ampm={false}
                    sx={{ height: '100%' }}
                />
            );

        case 'WiniButton':
            return <WiniButton ui={item.buttonUi || 'default'}>{item.label}</WiniButton>;

        case 'WiniButtonGroup':
            const previewButtonItems = (item.buttonGroupItems || []).length > 0
                ? item.buttonGroupItems
                : [
                    { ui: 'line', label: '취소' },
                    { ui: 'default', label: '저장' },
                ];

            return (
                <WiniButtonGroup fullWidth className="h-full">
                    {previewButtonItems.map((buttonItem, index) => (
                        <WiniButton key={buttonItem.id || `button-item-${index}`} ui={buttonItem.ui || 'default'}>
                            {buttonItem.label || '버튼'}
                        </WiniButton>
                    ))}
                </WiniButtonGroup>
            );

        case 'WiniIconButton':
            return (
                <WiniBox className="h-full flex items-center justify-center">
                    <WiniIconButton icon={item.icon || 'blog'}>{item.label}</WiniIconButton>
                </WiniBox>
            );

        case 'WiniToggleButton':
            return (
                <WiniBox className="h-full flex items-center">
                    <WiniToggleButton icon={item.icon || 'blog'} selected>
                        {item.label}
                    </WiniToggleButton>
                </WiniBox>
            );

        case 'WiniTab': {
            const handleTabChange = (_, value) => {
                setActiveTabValue(value);
                if (typeof onUpdateItem === 'function' && item.instanceId) {
                    onUpdateItem(item.instanceId, { activeTabValue: value });
                }
            };

            return (
                <WiniBox className="h-full flex flex-col">
                    <div className="pointer-events-auto shrink-0">
                        <WiniTabs
                            className="canvas-item-interactive"
                            value={activeTabValue}
                            onChange={handleTabChange}
                        >
                            {tabItems.map((tabItem, index) => (
                                <WiniTab
                                    key={tabItem.id || `tab-preview-${index}`}
                                    value={tabItem.value || `tab-${index + 1}`}
                                    label={tabItem.label || `탭 ${index + 1}`}
                                    onClick={() => invokeNamedEvent(tabItem.event, tabItem.value || `tab-${index + 1}`)}
                                />
                            ))}
                        </WiniTabs>
                    </div>
                    <WiniBox className="flex-1 min-h-0 border border-[#e4e7ec] border-t-0 rounded-b-md bg-[#f8fafc] pointer-events-none" />
                </WiniBox>
            );
        }

        case 'WiniAccordion':
            return (
                <WiniAccordion>
                    <WiniAccordionSummary>{item.label || '아코디언 제목'}</WiniAccordionSummary>
                    <WiniAccordionDetails>
                        <WiniTypography variant="body2">아코디언 상세 내용</WiniTypography>
                    </WiniAccordionDetails>
                </WiniAccordion>
            );

        case 'WiniList':
            return (
                <WiniList dense className="h-full overflow-hidden">
                    <WiniListItem>
                        <WiniListItemText>리스트 아이템</WiniListItemText>
                    </WiniListItem>
                    <WiniListItem>
                        <WiniListItemText>리스트 아이템</WiniListItemText>
                    </WiniListItem>
                </WiniList>
            );

        case 'WiniTreeView':
            return (
                <WiniTreeView winiData={item.treeData || PREVIEW_TREE_DATA} disableDrag height={treeHeight} className="min-h-0">
                    {(props) => <WiniTreeItem {...props} name="name" />}
                </WiniTreeView>
            );

        case 'WiniBox':
            if (hideLayoutContainers) return null;
            return <WiniBox className="h-full w-full rounded-md border border-[#d0d5dd] bg-[#f9fafb]" />;

        case 'WiniGridLayout':
            if (hideLayoutContainers) return null;
            const gridItems = (item.gridLayoutItems || []).length > 0
                ? item.gridLayoutItems
                : [{ xs: 12 }];
            return (
                <WiniGridLayout container spacing={0.5} className="h-full w-full rounded-md border border-[#d0d5dd] bg-[#f9fafb] p-1">
                    {gridItems.map((gridItem, index) => (
                        <WiniGridItem key={gridItem.id || `grid-item-${index}`} xs={gridItem.xs || 12}>
                            <WiniBox className="h-full w-full rounded bg-[#e3e7f1] border border-[#c5cde0] flex items-center justify-center text-xs text-[#666]">
                                구역 {index + 1}
                            </WiniBox>
                        </WiniGridItem>
                    ))}
                </WiniGridLayout>
            );

        case 'WiniAgGridReact': {
            const hasColumns = (item.gridColumns || []).length > 0;

            const columnDefs = hasColumns
                ? item.gridColumns.map((column, index) => ({
                    field: `col_${index + 1}`,
                    headerName: column.name || `컬럼 ${index + 1}`,
                    flex: 1,
                }))
                : PREVIEW_GRID_COLUMNS;

            const rowData = hasColumns
                ? [
                    Object.fromEntries(
                        item.gridColumns.map((column, index) => [
                            `col_${index + 1}`,
                            column.value || `값 ${index + 1}`,
                        ]),
                    ),
                ]
                : PREVIEW_GRID_ROWS;

            return (
                <WiniBox className="h-full w-full min-h-0">
                    <WiniAgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        pagination={false}
                        style={{ height: '100%' }}
                    />
                </WiniBox>
            );
        }

        case 'WiniTable': {
            const tableRows = item.tableRows || [];
            const headRows = tableRows.filter((row) => row.section === 'head');
            const bodyRows = tableRows.filter((row) => !row.section || row.section === 'body');
            const footerRows = tableRows.filter((row) => row.section === 'footer');
            const labelColumnCount = Number(item.tableLabelColumnCount) || undefined;
            const columnWidths = (item.tableColumnWidths || '')
                .split(',')
                .map((width) => width.trim())
                .filter(Boolean);

            return (
                <WiniTableContainer className="h-full w-full overflow-auto">
                    <WiniTable
                        labelColumnCount={labelColumnCount}
                        labelColumnWidth={item.tableLabelColumnWidth || undefined}
                        columnWidths={columnWidths.length > 0 ? columnWidths : undefined}
                    >
                        {headRows.length > 0 && <WiniTableHead>{renderTableRows(headRows)}</WiniTableHead>}
                        {bodyRows.length > 0 && <WiniTableBody>{renderTableRows(bodyRows)}</WiniTableBody>}
                        {footerRows.length > 0 && <WiniTableFooter>{renderTableRows(footerRows)}</WiniTableFooter>}
                    </WiniTable>
                </WiniTableContainer>
            );
        }

        case 'WiniPagination':
            return (
                <WiniBox className="h-full w-full flex items-center justify-center">
                    <WiniPagination count={10} page={1} size="small" onChange={() => {}} />
                </WiniBox>
            );

        case 'WiniIcon':
            return <WiniIcon icon={item.icon || 'setting'} />;

        case 'WiniCodeEditor':
            return (
                <WiniCodeEditor
                    language="javascript"
                    value={
                        item.code ||
                        [
                            'function handleSubmit(data) {',
                            '  if (!data) return;',
                            "  console.log('submit', data);",
                            '}',
                            '',
                            "handleSubmit({ id: 1, name: 'Wini' });",
                        ].join('\n')
                    }
                    height="100%"
                />
            );

        case 'WiniDialog':
            const previewDialogActions = (item.dialogActions || []).length > 0
                ? item.dialogActions
                : [
                    { ui: 'line', label: '취소' },
                    { ui: 'default', label: '확인' },
                ];
            const hasDialogContentText = typeof item.dialogContent === 'string'
                ? item.dialogContent.trim().length > 0
                : item.dialogContent !== null && item.dialogContent !== undefined;

            return (
                <WiniBox className="h-full w-full overflow-hidden rounded-b-[10px] border border-[#cfd4dc] border-t-[2px] border-t-[#0f4a8a] bg-white flex flex-col">
                    <WiniDialogTitle className="px-4 py-3 text-[16px] font-semibold text-[#0f4a8a] border-b border-[#d8dde5]">
                        {item.dialogTitle || '다이얼로그 타이틀'}
                    </WiniDialogTitle>
                    <WiniDialogContent className="flex-1 min-h-0 px-4 py-3">
                        {hasDialogContentText && (
                            <WiniDialogContentText>
                                {item.dialogContent}
                            </WiniDialogContentText>
                        )}
                    </WiniDialogContent>
                    <WiniDialogActions className="justify-end px-4 py-3 bg-white">
                        {previewDialogActions.map((actionItem, index) => (
                            <WiniButton key={actionItem.id || `dialog-action-${index}`} ui={actionItem.ui || 'default'}>
                                {actionItem.label || '버튼'}
                            </WiniButton>
                        ))}
                    </WiniDialogActions>
                </WiniBox>
            );

        default:
            return <WiniTypography variant="body2">{item.label}</WiniTypography>;
    }
};
