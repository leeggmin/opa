export const PREVIEW_TREE_DATA = [
    {
        id: 'preview-root',
        name: '루트 노드',
        children: [{ id: 'preview-child', name: '하위 노드', children: [] }],
    },
];

export const createDefaultTreeData = () =>
    PREVIEW_TREE_DATA.map((node) => ({
        ...node,
        children: (node.children || []).map((child) => ({ ...child })),
    }));

export const PREVIEW_GRID_COLUMNS = [{ field: 'name', headerName: '컬럼', flex: 1 }];
export const PREVIEW_GRID_ROWS = [{ name: '샘플 데이터' }];

const createDefaultTableCell = (content, component = 'td') => ({
    id: createId('table-cell'),
    content,
    component,
    align: 'center',
    scope: component === 'th' ? 'col' : '',
    rowSpan: 1,
    colSpan: 1,
    ui: '',
});

export const createDefaultTableRows = () => [
    {
        id: createId('table-row'),
        section: 'head',
        cells: [createDefaultTableCell('헤더 1', 'th'), createDefaultTableCell('헤더 2', 'th')],
    },
    {
        id: createId('table-row'),
        section: 'body',
        cells: [createDefaultTableCell('항목 값 1'), createDefaultTableCell('항목 값 2')],
    },
];

export const createDefaultTabItems = () => {
    return [
        { id: createId('tab-item'), label: '탭 1', value: `tab-${Math.random().toString(36).slice(2, 7)}-1`, event: '' },
        { id: createId('tab-item'), label: '탭 2', value: `tab-${Math.random().toString(36).slice(2, 7)}-2`, event: '' },
    ];
};

export const createDefaultButtonGroupItems = () => [
    { id: createId('button-item'), ui: 'line', label: '취소' },
    { id: createId('button-item'), ui: 'default', label: '저장' },
];

export const createDefaultDialogActions = () => [
    { id: createId('dialog-action'), ui: 'line', label: '취소' },
    { id: createId('dialog-action'), ui: 'default', label: '확인' },
];

export const parseGridLayoutRatios = (ratioString = '12') => {
    const ratios = ratioString
        .split(':')
        .map((r) => parseInt(r, 10))
        .filter((r) => !isNaN(r) && r > 0);

    if (ratios.length === 0) return [12];

    const sum = ratios.reduce((acc, val) => acc + val, 0);
    const weighted = ratios.map((ratio) => (ratio / sum) * 12);
    const base = weighted.map((value) => Math.floor(value));
    let remaining = 12 - base.reduce((acc, value) => acc + value, 0);

    const orderByFractionDesc = weighted
        .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
        .sort((a, b) => b.fraction - a.fraction)
        .map((item) => item.index);

    for (let i = 0; i < orderByFractionDesc.length && remaining > 0; i += 1) {
        base[orderByFractionDesc[i]] += 1;
        remaining -= 1;
    }

    return base;
};

export const createDefaultGridLayoutItems = () => {
    const colRatios = parseGridLayoutRatios('12');
    return colRatios.map((xs) => ({
        id: createId('grid-item'),
        xs,
    }));
};

export const LABEL_EDITABLE_TYPES = [
    'WiniText',
    'WiniSelect',
    'WiniCheckbox',
    'WiniInputLabel',
    'WiniRadio',
    'WiniButton',
    'WiniIconButton',
    'WiniToggleButton',
    'WiniSwitch',
    'WiniDateTimePicker',
    'WiniTab',
    'WiniAccordion',
];

export const ICON_EDITABLE_TYPES = ['WiniIcon', 'WiniIconButton', 'WiniToggleButton'];
export const FEATURE_SECTION_TYPES = ['WiniBox', 'WiniGridLayout', 'WiniTab', 'WiniDialog'];

export const isFeatureSectionType = (type) => FEATURE_SECTION_TYPES.includes(type);

export const isInsetContainerType = (type) => type === 'WiniBox' || type === 'WiniGridLayout';

export const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const getDefaultItemSize = (template) => {
    if (isInsetContainerType(template.type) || template.type === 'WiniAgGridReact' || template.type === 'WiniTreeView' || template.type === 'WiniTable') {
        return { width: 320, height: 90 };
    }
    if (template.type === 'WiniDialog') {
        return { width: 600, height: 400 };
    }
    if (template.type === 'WiniCodeEditor') {
        return { width: 450, height: 220 };
    }
    if (template.type === 'WiniTab' || template.type === 'WiniList') {
        return { width: 260, height: 140 };
    }
    if (template.type === 'WiniAccordion') {
        return { width: 500, height: 65 };
    }
    if (template.type === 'WiniButton') {
        return { width: 120, height: 42 };
    }
    if (template.type === 'WiniButtonGroup' || template.type === 'WiniIconButton' || template.type === 'WiniSwitch') {
        return { width: 150, height: 42 };
    }
    if (template.type === 'WiniToggleButton') {
        return { width: 185, height: 42 };
    }
    if (template.type === 'WiniInputLabel') {
        return { width: 110, height: 30 };
    }
    if (template.type === 'WiniTypography') {
        return { width: 140, height: 30 };
    }
    if (template.type === 'WiniIcon') {
        return { width: 35, height: 35 };
    }
    if (template.type === 'WiniPagination') {
        return { width: 300, height: 40 };
    }
    return { width: 240, height: 42 };
};

export const createLayoutItem = (template, x, y, canvasWidth) => {
    const tabItems = template.type === 'WiniTab' ? createDefaultTabItems() : [];
    const buttonGroupItems = template.type === 'WiniButtonGroup' ? createDefaultButtonGroupItems() : [];
    const dialogActions = template.type === 'WiniDialog' ? createDefaultDialogActions() : [];
    
    let itemSize = getDefaultItemSize(template);
    if (isInsetContainerType(template.type) && canvasWidth) {
        itemSize = { width: Math.max(280, canvasWidth - 48), height: 220 };
    }

    return {
        instanceId: createId(template.templateId.replace(':', '-')),
        source: template.source,
        type: template.type,
        label: template.label,
        format: template.isGrid ? 'grid' : 'default',
        condition: '',
        icon: ICON_EDITABLE_TYPES.includes(template.type) ? 'blog' : '',
        options: '',
        code:
            template.type === 'WiniCodeEditor'
                ? [
                    'function handleSubmit(data) {',
                    '  if (!data) return;',
                    "  console.log('submit', data);",
                    '}',
                    '',
                    "handleSubmit({ id: 1, name: 'Wini' });",
                ].join('\n')
                : '',
        isGrid: template.isGrid,
        x,
        y,
        ...itemSize,
        buttonUi: template.type === 'WiniButton' ? 'default' : '',
        dialogTitle: template.type === 'WiniDialog' ? '다이얼로그 타이틀' : '',
        dialogContent: template.type === 'WiniDialog' ? '다이얼로그 내용입니다.' : '',
        dialogActions,
        typographyVariant: template.type === 'WiniTypography' ? 'h5' : '',
        typographyContent: template.type === 'WiniTypography' ? '텍스트 예시입니다.' : '',
        children: [],
        menuItems: template.type === 'WiniSelect' ? [{ id: createId('menu-item'), value: '' }] : [],
        buttonGroupItems,
        tabItems,
        activeTabValue: template.type === 'WiniTab' ? tabItems[0]?.value || 'tab-1' : '',
        treeData: template.type === 'WiniTreeView' ? createDefaultTreeData() : [],
        tableLabelColumnCount: '',
        tableLabelColumnWidth: '',
        tableColumnWidths: '',
        tableRows: template.type === 'WiniTable' ? createDefaultTableRows() : [],
        gridColumns: template.isGrid
            ? [{ id: createId('col'), name: '', value: '', format: '', condition: '' }]
            : [],
        gridLayoutColRatios: template.type === 'WiniGridLayout' ? '12' : '',
        gridLayoutItems: template.type === 'WiniGridLayout' ? createDefaultGridLayoutItems() : [],
        features: '',
    };
};

export const findItemById = (itemList, itemId) => {
    for (const item of itemList) {
        if (item.instanceId === itemId) return item;
        const found = findItemById(item.children || [], itemId);
        if (found) return found;
    }
    return null;
};

export const updateItemById = (itemList, itemId, updater) =>
    itemList.map((item) => {
        if (item.instanceId === itemId) {
            return updater(item);
        }

        return {
            ...item,
            children: updateItemById(item.children || [], itemId, updater),
        };
    });

export const removeItemById = (itemList, itemId) =>
    itemList
        .filter((item) => item.instanceId !== itemId)
        .map((item) => ({
            ...item,
            children: removeItemById(item.children || [], itemId),
        }));

export const moveArrayItemByIndex = (list, fromIndex, toIndex) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
        return list;
    }

    const next = [...list];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
};

export const moveItemById = (itemList, itemId, delta) => {
    const index = itemList.findIndex((item) => item.instanceId === itemId);

    if (index !== -1) {
        return {
            moved: index + delta >= 0 && index + delta < itemList.length,
            list: moveArrayItemByIndex(itemList, index, index + delta),
        };
    }

    let moved = false;
    const nextList = itemList.map((item) => {
        if (moved) return item;

        const result = moveItemById(item.children || [], itemId, delta);
        if (!result.moved) return item;

        moved = true;
        return {
            ...item,
            children: result.list,
        };
    });

    return { moved, list: nextList };
};

export const canMoveItemByIdToBoundary = (itemList, itemId, toFront) => {
    const index = itemList.findIndex((item) => item.instanceId === itemId);
    if (index !== -1) {
        return toFront ? index < itemList.length - 1 : index > 0;
    }

    for (const item of itemList) {
        if (canMoveItemByIdToBoundary(item.children || [], itemId, toFront)) return true;
    }

    return false;
};

export const getResizePatch = (ref, position) => ({
    width: ref.offsetWidth,
    height: ref.offsetHeight,
    x: position.x,
    y: position.y,
});

export const findParentById = (itemList, targetId, parentItem = null) => {
    for (const item of itemList) {
        if (item.instanceId === targetId) return parentItem;
        const result = findParentById(item.children || [], targetId, item);
        if (result !== undefined) return result;
    }
    return undefined;
};

const deepCloneTreeNodes = (nodes) =>
    (nodes || []).map((node) => ({
        ...node,
        id: createId('tree-node'),
        children: deepCloneTreeNodes(node.children || []),
    }));

const cloneItemWithNewIds = (item) => ({
    ...item,
    instanceId: createId(item.type),
    children: (item.children || []).map(cloneItemWithNewIds),
    menuItems: (item.menuItems || []).map((mi) => ({ ...mi, id: createId('menu-item') })),
    buttonGroupItems: (item.buttonGroupItems || []).map((buttonItem) => ({ ...buttonItem, id: createId('button-item') })),
    dialogActions: (item.dialogActions || []).map((actionItem) => ({ ...actionItem, id: createId('dialog-action') })),
    tabItems: (item.tabItems || []).map((tabItem) => ({ ...tabItem, id: createId('tab-item') })),
    gridColumns: (item.gridColumns || []).map((col) => ({ ...col, id: createId('col') })),
    tableRows: (item.tableRows || []).map((row) => ({
        ...row,
        id: createId('table-row'),
        cells: (row.cells || []).map((cell) => ({ ...cell, id: createId('table-cell') })),
    })),
    treeData: deepCloneTreeNodes(item.treeData || []),
});

export const duplicateItem = (item, offsetX = 24, offsetY = 24) => ({
    ...cloneItemWithNewIds(item),
    x: item.x + offsetX,
    y: item.y + offsetY,
});

export const scaleCanvasItems = (itemList, prevBounds, nextBounds, options = {}) => {
    const { preserveHeightOnResize = false } = options;
    const scaleX = prevBounds.width > 0 ? nextBounds.width / prevBounds.width : 1;
    const scaleY = prevBounds.height > 0 ? nextBounds.height / prevBounds.height : 1;
    const shouldPreserveVerticalScale = preserveHeightOnResize && nextBounds.height !== prevBounds.height;

    return (itemList || []).map((item) => {
        const newWidth = Math.max(35, Math.round(item.width * scaleX));
        const newHeight = shouldPreserveVerticalScale
            ? item.height
            : Math.max(35, Math.round(item.height * scaleY));
        const newX = Math.max(0, Math.round(item.x * scaleX));
        const newY = shouldPreserveVerticalScale
            ? item.y
            : Math.max(0, Math.round(item.y * scaleY));

        return {
            ...item,
            width: newWidth,
            height: newHeight,
            x: newX,
            y: newY,
            children: scaleCanvasItems(
                item.children || [],
                { width: item.width, height: item.height },
                { width: newWidth, height: newHeight },
                options,
            ),
        };
    });
};

const sortItemsForExport = (items) =>
    [...items]
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
            // 1순위: 레이어 순서 (array index ascending — back to front)
            // 2순위: Y 좌표 ascending (위에서 아래 순서)
            const yDiff = a.item.y - b.item.y;
            if (yDiff !== 0) return yDiff;
            return a.index - b.index;
        })
        .map(({ item }) => item);

const normalizeFeatureName = (value = '') => value.trim();

const getItemFeatureName = (item) => {
    if (!item || !isFeatureSectionType(item.type)) return '';
    return normalizeFeatureName(item.features || '');
};

const groupCanvasItemsByFeature = (canvasItems = []) => {
    const featureSections = [];

    const appendFeatureSection = (featureName, item) => {
        const normalizedFeatureName = normalizeFeatureName(featureName);
        if (!normalizedFeatureName) return;

        const existingSection = featureSections.find((section) => section.name === normalizedFeatureName);
        if (existingSection) {
            existingSection.items.push(item);
            return;
        }

        featureSections.push({ name: normalizedFeatureName, items: [item] });
    };

    const pruneNamedFeatureChildren = (item) => {
        const nextChildren = [];

        sortItemsForExport(item.children || []).forEach((child) => {
            const prunedChild = pruneNamedFeatureChildren(child);
            const childFeatureName = getItemFeatureName(prunedChild);

            if (childFeatureName) {
                appendFeatureSection(childFeatureName, prunedChild);
                return;
            }

            nextChildren.push(prunedChild);
        });

        return {
            ...item,
            children: nextChildren,
        };
    };

    const commonItems = [];

    sortItemsForExport(canvasItems).forEach((item) => {
        const prunedItem = pruneNamedFeatureChildren(item);
        const featureName = getItemFeatureName(prunedItem);

        if (featureName) {
            appendFeatureSection(featureName, prunedItem);
            return;
        }

        commonItems.push(prunedItem);
    });

    return { commonItems, featureSections };
};

const getGridRegionChildren = (gridLayoutItem) => {
    const regionDefs = (gridLayoutItem.gridLayoutItems || []).length > 0
        ? gridLayoutItem.gridLayoutItems
        : [{ xs: 12 }];

    const totalXs = regionDefs.reduce((acc, region) => acc + (region.xs || 12), 0) || 12;
    const parentWidth = Math.max(1, gridLayoutItem.width || 1);
    const children = sortItemsForExport(gridLayoutItem.children || []);

    const regionBounds = [];
    let accPx = 0;
    regionDefs.forEach((region, index) => {
        const ratio = (region.xs || 12) / totalXs;
        const widthPx = index === regionDefs.length - 1
            ? parentWidth - accPx
            : Math.round(parentWidth * ratio);

        const start = accPx;
        const end = index === regionDefs.length - 1 ? parentWidth : accPx + widthPx;
        regionBounds.push({ index, start, end, region });
        accPx += widthPx;
    });

    const grouped = regionBounds.map((bound) => ({ ...bound, children: [] }));

    children.forEach((child) => {
        const childCenterX = (child.x || 0) + (child.width || 0) / 2;
        const target = grouped.find((bound) => childCenterX >= bound.start && childCenterX < bound.end)
            || grouped[grouped.length - 1];

        if (target) {
            target.children.push(child);
        }
    });

    return grouped;
};

const buildExportLines = (canvasItems) => {
    const lines = [];

    const appendTreeNodeLines = (treeNodes, indent, depth = 0) => {
        (treeNodes || []).forEach((treeNode) => {
            const nodeIndent = `${indent}${'  '.repeat(depth)}`;
            lines.push(
                `${nodeIndent}WiniTreeItem (노드명: ${treeNode.name || ''})`,
            );

            if ((treeNode.children || []).length > 0) {
                appendTreeNodeLines(treeNode.children, indent, depth + 1);
            }
        });
    };

    const appendItemLines = (item, indent = '') => {
        const hasLabel = LABEL_EDITABLE_TYPES.includes(item.type);
        const hasIcon = ICON_EDITABLE_TYPES.includes(item.type);

        if (item.type === 'WiniTypography') {
            lines.push(
                `${indent}${item.type} [x:${Math.round(item.x)}, y:${Math.round(item.y)}, w:${Math.round(item.width)}, h:${Math.round(item.height)}] (variant: ${item.typographyVariant || 'h5'}, 내용: ${item.typographyContent || ''}, 속성: ${item.condition || ''})`,
            );
            return;
        }

        if (item.type === 'WiniButton') {
            lines.push(
                `${indent}${item.type} [x:${Math.round(item.x)}, y:${Math.round(item.y)}, w:${Math.round(item.width)}, h:${Math.round(item.height)}] (버튼명: ${item.label || ''}, ui: ${item.buttonUi || 'default'}, 속성: ${item.condition || ''})`,
            );
            return;
        }

        const settingText = hasLabel
            ? hasIcon
                ? `(라벨명: ${item.label || ''}, 아이콘: ${item.icon || ''}, 속성: ${item.condition || ''})`
                : `(라벨명: ${item.label || ''}, 속성: ${item.condition || ''})`
            : `(속성: ${item.condition || ''})`;

        const lineSuffix =
            item.type === 'WiniGridLayout'
                ? ` (컬럼 비율: ${item.gridLayoutColRatios || '12'})`
                : '';

        lines.push(
            `${indent}${item.type} [x:${Math.round(item.x)}, y:${Math.round(item.y)}, w:${Math.round(item.width)}, h:${Math.round(item.height)}] ${settingText}${lineSuffix}`,
        );

        if (item.type === 'WiniAgGridReact') {
            if ((item.gridColumns || []).length === 0) {
                lines.push(`${indent}  그리드 컬럼1 (컬럼명: , 컬럼 값 예시: , 컬럼 속성:)`);
            } else {
                item.gridColumns.forEach((column, columnIndex) => {
                    lines.push(
                        `${indent}  그리드 컬럼${columnIndex + 1} (컬럼명: ${column.name || ''}, 컬럼 값 예시: ${column.value || ''}, 컬럼 속성: ${column.condition || ''})`,
                    );
                });
            }
        }

        if (item.type === 'WiniTable') {
            const sectionOrder = ['head', 'body', 'footer'];
            const sortedTableRows = sectionOrder.flatMap((section) =>
                (item.tableRows || []).filter((row) => (row.section || 'body') === section),
            );

            sortedTableRows.forEach((row, rowIndex) => {
                lines.push(`${indent}  ${row.section || 'body'} 행${rowIndex + 1}`);
                (row.cells || []).forEach((cell, cellIndex) => {
                    lines.push(
                        `${indent}    셀${cellIndex + 1} (종류: ${cell.component || 'td'}, 내용: ${cell.content || ''}, 정렬: ${cell.align || 'inherit'}, rowSpan: ${cell.rowSpan || 1}, colSpan: ${cell.colSpan || 1}, ui: ${cell.ui || ''})`,
                    );
                });
            });
        }

        if (item.type === 'WiniSelect') {
            const menuItems = item.menuItems || [];
            if (menuItems.length === 0) {
                lines.push(`${indent}  WiniMenuItem1 (값: )`);
            } else {
                menuItems.forEach((menuItem, menuIndex) => {
                    lines.push(`${indent}  WiniMenuItem${menuIndex + 1} (값: ${menuItem.value || ''})`);
                });
            }
        }

        if (item.type === 'WiniButtonGroup') {
            const buttonItems = item.buttonGroupItems || [];
            if (buttonItems.length === 0) {
                lines.push(`${indent}  WiniButton1 (ui: line, 라벨: 취소)`);
                lines.push(`${indent}  WiniButton2 (ui: default, 라벨: 저장)`);
            } else {
                buttonItems.forEach((buttonItem, buttonIndex) => {
                    lines.push(
                        `${indent}  WiniButton${buttonIndex + 1} (ui: ${buttonItem.ui || 'default'}, 라벨: ${buttonItem.label || ''})`,
                    );
                });
            }
        }

        if (item.type === 'WiniDialog') {
            const dialogActions = (item.dialogActions || []).length > 0
                ? item.dialogActions
                : [
                    { ui: 'line', label: '취소' },
                    { ui: 'default', label: '확인' },
                ];
            const hasDialogContentText = typeof item.dialogContent === 'string'
                ? item.dialogContent.trim().length > 0
                : item.dialogContent !== null && item.dialogContent !== undefined;

            lines.push(`${indent}  WiniDialogTitle (제목: ${item.dialogTitle || ''})`);
            lines.push(`${indent}  WiniDialogContent`);

            if (hasDialogContentText) {
                lines.push(`${indent}    WiniDialogContentText (내용: ${item.dialogContent})`);
            }

            if ((item.children || []).length > 0) {
                sortItemsForExport(item.children).forEach((child) => {
                    appendItemLines(child, `${indent}    `);
                });
            }

            lines.push(`${indent}  WiniDialogActions`);
            dialogActions.forEach((actionItem, actionIndex) => {
                lines.push(
                    `${indent}    WiniButton${actionIndex + 1} (ui: ${actionItem.ui || 'default'}, 라벨: ${actionItem.label || ''})`,
                );
            });

            return;
        }

        if (item.type === 'WiniGridLayout') {
            const gridItems = (item.gridLayoutItems || []).length > 0
                ? item.gridLayoutItems
                : [{ xs: 12 }];
            const groupedRegions = getGridRegionChildren(item);

            gridItems.forEach((gridItem, gridIndex) => {
                lines.push(`${indent}  WiniGridItem${gridIndex + 1} (xs: ${gridItem.xs || 12})`);

                const region = groupedRegions[gridIndex];
                if (!region || region.children.length === 0) {
                    lines.push(`${indent}    (배치된 컴포넌트 없음)`);
                    return;
                }

                region.children.forEach((child) => {
                    appendItemLines(child, `${indent}    `);
                });
            });

        }

        if (item.type === 'WiniTreeView') {
            const treeNodes = item.treeData || [];

            if (treeNodes.length === 0) {
                lines.push(`${indent}  WiniTreeItem (노드명: )`);
            } else {
                appendTreeNodeLines(treeNodes, `${indent}  `);
            }
        }

        if (item.type === 'WiniTab') {
            const tabItemsList = item.tabItems || [];
            const firstTabVal = tabItemsList[0]?.value || 'tab-1';

            if (tabItemsList.length === 0) {
                lines.push(`${indent}  WiniTab1 (라벨명: 탭 1, 값: tab-1, 이벤트: )`);
            } else {
                tabItemsList.forEach((tabItem, tabIndex) => {
                    lines.push(
                        `${indent}  WiniTab${tabIndex + 1} (라벨명: ${tabItem.label || ''}, 값: ${tabItem.value || ''}, 이벤트: ${tabItem.event || ''})`,
                    );
                });
            }

            if ((item.children || []).length > 0) {
                tabItemsList.forEach((tabItem, idx) => {
                    const tVal = tabItem.value || `tab-${idx + 1}`;
                    const tLabel = tabItem.label || `탭 ${idx + 1}`;
                    const tabChildren = (item.children || []).filter(
                        (child) => (child.tabValue || firstTabVal) === tVal,
                    );
                    if (tabChildren.length > 0) {
                        lines.push(`${indent}  [${tLabel} 탭 패널]`);
                        sortItemsForExport(tabChildren).forEach((child) => appendItemLines(child, `${indent}    `));
                    }
                });
            }
        } else if (item.type !== 'WiniGridLayout' && (item.children || []).length > 0) {
            sortItemsForExport(item.children).forEach((child) => {
                appendItemLines(child, `${indent}  `);
            });
        }
    };

    sortItemsForExport(canvasItems).forEach((item) => appendItemLines(item));

    return lines;
};

export const buildExportSections = (canvasItems) => {
    if (!canvasItems || canvasItems.length === 0) {
        return [];
    }

    const { commonItems, featureSections } = groupCanvasItemsByFeature(canvasItems);

    if (featureSections.length === 0) {
        return [
            {
                id: 'all',
                title: '전체',
                content: buildExportLines(canvasItems).join('\n'),
            },
        ];
    }

    const sections = [];

    if (commonItems.length > 0) {
        sections.push({
            id: 'common',
            title: 'common',
            content: buildExportLines(commonItems).join('\n'),
        });
    }

    featureSections.forEach((section) => {
        sections.push({
            id: `feature-${section.name}`,
            title: `features/${section.name}`,
            content: buildExportLines(section.items).join('\n'),
        });
    });

    return sections;
};

export const buildExportText = (canvasItems) => {
    if (!canvasItems || canvasItems.length === 0) {
        return '';
    }

    return buildExportLines(canvasItems).join('\n');
};

const toJsString = (value = '') => JSON.stringify(value);

const renderMenuItemsCode = (menuItems = [], indent) => {
    if (menuItems.length === 0) {
        return [`${indent}<WiniMenuItem value="">값</WiniMenuItem>`];
    }

    return menuItems.map(
        (menuItem) =>
            `${indent}<WiniMenuItem value={${toJsString(menuItem.value || '')}}>${menuItem.value || '값'}</WiniMenuItem>`,
    );
};

const renderGridColumnsCode = (gridColumns = []) => {
    if (gridColumns.length === 0) {
        return '[]';
    }

    return JSON.stringify(
        gridColumns.map((column, index) => ({
            field: `col_${index + 1}`,
            headerName: column.name || `컬럼 ${index + 1}`,
            sampleValue: column.value || '',
        })),
        null,
        2,
    );
};

const renderTableCellCode = (cell, indent) => {
    const component = cell.component === 'th' ? ' component="th"' : '';
    const align = cell.align && cell.align !== 'inherit' ? ` align=${toJsString(cell.align)}` : '';
    const scope = cell.component === 'th' && cell.scope ? ` scope=${toJsString(cell.scope)}` : '';
    const rowSpan = Number(cell.rowSpan) > 1 ? ` rowSpan={${Number(cell.rowSpan)}}` : '';
    const colSpan = Number(cell.colSpan) > 1 ? ` colSpan={${Number(cell.colSpan)}}` : '';
    const ui = cell.ui ? ` ui=${toJsString(cell.ui)}` : '';

    return `${indent}<WiniTableCell${component}${align}${scope}${rowSpan}${colSpan}${ui}>{${toJsString(cell.content || '')}}</WiniTableCell>`;
};

const renderTableSectionCode = (tableRows, section, componentName, indent, rowIndent, cellIndent) => {
    const rows = (tableRows || []).filter((row) => (row.section || 'body') === section);
    if (rows.length === 0) return [];

    return [
        `${indent}<${componentName}>`,
        ...rows.flatMap((row) => [
            `${rowIndent}<WiniTableRow>`,
            ...(row.cells || []).map((cell) => renderTableCellCode(cell, cellIndent)),
            `${rowIndent}</WiniTableRow>`,
        ]),
        `${indent}</${componentName}>`,
    ];
};

const renderTabItemsCode = (tabItems = [], indent) => {
    if (tabItems.length === 0) {
        return [
            `${indent}<WiniTab label="탭 1" value="tab-1" />`,
            `${indent}<WiniTab label="탭 2" value="tab-2" />`,
        ];
    }

    return tabItems.map((tabItem, index) => {
        const label = tabItem.label || `탭 ${index + 1}`;
        const value = tabItem.value || `tab-${index + 1}`;
        const eventCode = tabItem.event ? ` onClick={${tabItem.event}}` : '';
        return `${indent}<WiniTab label={${toJsString(label)}} value={${toJsString(value)}}${eventCode} />`;
    });
};

const getCodeTabItems = (tabItems = []) => {
    if (tabItems.length > 0) {
        return tabItems;
    }

    return [
        { label: '탭 1', value: 'tab-1', event: '' },
        { label: '탭 2', value: 'tab-2', event: '' },
    ];
};

const renderComponentCodeLines = (item, depth = 0) => {
    const indent = '  '.repeat(depth);
    const childIndent = '  '.repeat(depth + 1);
    const children = sortItemsForExport(item.children || []);

    switch (item.type) {
        case 'WiniText':
            return [`${indent}<WiniText label={${toJsString(item.label || '')}} placeholder="텍스트 입력" />`];
        case 'WiniSelect':
            return [
                `${indent}<WiniSelect label={${toJsString(item.label || '')}} value="">`,
                ...renderMenuItemsCode(item.menuItems || [], childIndent),
                `${indent}</WiniSelect>`,
            ];
        case 'WiniRadio':
            return [`${indent}<WiniRadio checked />`];
        case 'WiniCheckbox':
            return [`${indent}<WiniCheckbox checked />`];
        case 'WiniInputLabel':
            return [`${indent}<WiniInputLabel>${item.label || '라벨'}</WiniInputLabel>`];
        case 'WiniButton':
            return [`${indent}<WiniButton ui={${toJsString(item.buttonUi || 'default')}}>${item.label || '버튼'}</WiniButton>`];
        case 'WiniButtonGroup': {
            const buttonItems = (item.buttonGroupItems || []).length > 0
                ? item.buttonGroupItems
                : [
                    { ui: 'line', label: '취소' },
                    { ui: 'default', label: '저장' },
                ];

            return [
                `${indent}<WiniButtonGroup ui="list">`,
                ...buttonItems.map(
                    (buttonItem) =>
                        `${childIndent}<WiniButton ui={${toJsString(buttonItem.ui || 'default')}}>${buttonItem.label || '버튼'}</WiniButton>`,
                ),
                `${indent}</WiniButtonGroup>`,
            ];
        }
        case 'WiniIconButton':
            return [`${indent}<WiniIconButton icon={${toJsString(item.icon || 'blog')}}>${item.label || '아이콘 버튼'}</WiniIconButton>`];
        case 'WiniToggleButton':
            return [`${indent}<WiniToggleButton icon={${toJsString(item.icon || 'blog')}}>${item.label || '토글'}</WiniToggleButton>`];
        case 'WiniSwitch':
            return [`${indent}<WiniSwitch />`];
        case 'WiniDateTimePicker':
            return [`${indent}<WiniDateTimePicker label={${toJsString(item.label || '날짜 + 시간')}} value="" onChange={() => {}} />`];
        case 'WiniTab': {
            const tabItemsList = getCodeTabItems(item.tabItems || []);
            const firstTabVal = tabItemsList[0]?.value || 'tab-1';

            const codeLines = [
                `${indent}<WiniTabs value={tabValue} onChange={(_, v) => setTabValue(v)}>`,
                ...renderTabItemsCode(tabItemsList, childIndent),
                `${indent}</WiniTabs>`,
            ];

            tabItemsList.forEach((tabItem, idx) => {
                const tVal = tabItem.value || `tab-${idx + 1}`;
                const tabChildren = (item.children || []).filter(
                    (child) => (child.tabValue || firstTabVal) === tVal,
                );

                codeLines.push(`${indent}<WiniTabPanel value={tabValue} index={${toJsString(tVal)}}>`);
                sortItemsForExport(tabChildren).forEach((child) => {
                    codeLines.push(...renderComponentCodeLines(child, depth + 1));
                });
                codeLines.push(`${indent}</WiniTabPanel>`);
            });

            return codeLines;
        }
        case 'WiniGridLayout': {
            const gridItems = (item.gridLayoutItems || []).length > 0
                ? item.gridLayoutItems
                : [{ xs: 12 }];
            const groupedRegions = getGridRegionChildren(item);
            
            const codeLines = [
                `${indent}<WiniGridLayout container spacing={0.5}>`,
                ...gridItems.flatMap((gridItem, index) => {
                    const region = groupedRegions[index];
                    if (!region || region.children.length === 0) {
                        return [`${childIndent}<WiniGridItem xs={${gridItem.xs || 12}} />`];
                    }

                    return [
                        `${childIndent}<WiniGridItem xs={${gridItem.xs || 12}}>`,
                        ...region.children.flatMap((child) => renderComponentCodeLines(child, depth + 2)),
                        `${childIndent}</WiniGridItem>`,
                    ];
                }),
                `${indent}</WiniGridLayout>`,
            ];
            
            return codeLines;
        }
        case 'WiniList':
            return [`${indent}<WiniList />`];
        case 'WiniTreeView':
            return [
                `${indent}<WiniTreeView winiData={${JSON.stringify(item.treeData || [], null, 2)}} />`,
            ];
        case 'WiniAgGridReact':
            return [`${indent}<WiniAgGridReact columnDefs={${renderGridColumnsCode(item.gridColumns || [])}} rowData={[]} />`];
        case 'WiniTable': {
            const tableProps = [];
            const labelColumnCount = Number(item.tableLabelColumnCount);
            if (labelColumnCount > 0) tableProps.push(`labelColumnCount={${labelColumnCount}}`);
            if (item.tableLabelColumnWidth) tableProps.push(`labelColumnWidth=${toJsString(item.tableLabelColumnWidth)}`);
            const columnWidths = (item.tableColumnWidths || '')
                .split(',')
                .map((width) => width.trim())
                .filter(Boolean);
            if (columnWidths.length > 0) tableProps.push(`columnWidths={${JSON.stringify(columnWidths)}}`);

            const tableOpen = tableProps.length > 0
                ? `${childIndent}<WiniTable ${tableProps.join(' ')}>`
                : `${childIndent}<WiniTable>`;
            const sectionIndent = '  '.repeat(depth + 2);
            const rowIndent = '  '.repeat(depth + 3);
            const cellIndent = '  '.repeat(depth + 4);

            return [
                `${indent}<WiniTableContainer>`,
                tableOpen,
                ...renderTableSectionCode(item.tableRows, 'head', 'WiniTableHead', sectionIndent, rowIndent, cellIndent),
                ...renderTableSectionCode(item.tableRows, 'body', 'WiniTableBody', sectionIndent, rowIndent, cellIndent),
                ...renderTableSectionCode(item.tableRows, 'footer', 'WiniTableFooter', sectionIndent, rowIndent, cellIndent),
                `${childIndent}</WiniTable>`,
                `${indent}</WiniTableContainer>`,
            ];
        }
        case 'WiniPagination':
            return [
                `${indent}<WiniPagination count={10} page={1} size="small" onChange={() => {}} />`,
            ];
        case 'WiniCodeEditor':
            return [`${indent}<WiniCodeEditor value={${toJsString(item.code || '')}} language="javascript" />`];
        case 'WiniAccordion':
            return [`${indent}<WiniAccordion />`];
        case 'WiniIcon':
            return [`${indent}<WiniIcon icon={${toJsString(item.icon || 'setting')}} />`];
        case 'WiniTypography':
            return [
                `${indent}<WiniTypography variant={${toJsString(item.typographyVariant || 'h5')}} color="text.secondary">`,
                `${childIndent}${item.typographyContent || '텍스트 예시입니다.'}`,
                `${indent}</WiniTypography>`,
            ];
        case 'WiniDialog': {
            const dialogActions = (item.dialogActions || []).length > 0
                ? item.dialogActions
                : [
                    { ui: 'line', label: '취소' },
                    { ui: 'default', label: '확인' },
                ];
            const hasDialogContentText = typeof item.dialogContent === 'string'
                ? item.dialogContent.trim().length > 0
                : item.dialogContent !== null && item.dialogContent !== undefined;

            const codeLines = [
                `${indent}<WiniDialog open={true} onClose={() => {}}>`,
                `${childIndent}<WiniDialogTitle>${item.dialogTitle || '다이얼로그 타이틀'}</WiniDialogTitle>`,
                `${childIndent}<WiniDialogContent>`,
            ];

            if (hasDialogContentText) {
                codeLines.push(
                    `${childIndent}  <WiniDialogContentText>`,
                    `${childIndent}    ${item.dialogContent}`,
                    `${childIndent}  </WiniDialogContentText>`,
                );
            }

            children.forEach((child) => {
                codeLines.push(...renderComponentCodeLines(child, depth + 2));
            });

            codeLines.push(
                `${childIndent}</WiniDialogContent>`,
                `${childIndent}<WiniDialogActions>`,
                ...dialogActions.map(
                    (actionItem) =>
                        `${childIndent}  <WiniButton ui={${toJsString(actionItem.ui || 'default')}}>${actionItem.label || '버튼'}</WiniButton>`,
                ),
                `${childIndent}</WiniDialogActions>`,
                `${indent}</WiniDialog>`,
            );

            return codeLines;
        }
        default:
            break;
    }

    if (children.length === 0) {
        return [`${indent}<${item.type} />`];
    }

    const lines = [`${indent}<${item.type}>`];
    children.forEach((child) => {
        lines.push(...renderComponentCodeLines(child, depth + 1));
    });
    lines.push(`${indent}</${item.type}>`);
    return lines;
};

const buildComponentCodeBody = (canvasItems = []) =>
    sortItemsForExport(canvasItems)
        .flatMap((item) => renderComponentCodeLines(item, 0))
        .join('\n');

const buildWiniImportStatement = (componentCode) => {
    const winiComponentRegex = /<(Wini[A-Za-z]+)/g;
    const usedComponents = new Set();
    let match;

    while ((match = winiComponentRegex.exec(componentCode)) !== null) {
        usedComponents.add(match[1]);
    }

    const sortedComponents = Array.from(usedComponents).sort();
    return sortedComponents.length > 0
        ? `import { ${sortedComponents.join(', ')} } from '@shared/ui/wini';\n\n`
        : '';
};

export const buildComponentCodeSections = (canvasItems) => {
    if (!canvasItems || canvasItems.length === 0) {
        return [];
    }

    const { commonItems, featureSections } = groupCanvasItemsByFeature(canvasItems);

    const createSection = (id, title, items) => {
        const body = buildComponentCodeBody(items);
        return {
            id,
            title,
            content: buildWiniImportStatement(body) + body,
        };
    };

    if (featureSections.length === 0) {
        return [createSection('all', '전체', canvasItems)];
    }

    const sections = [];

    if (commonItems.length > 0) {
        sections.push(createSection('common', 'common', commonItems));
    }

    featureSections.forEach((section) => {
        sections.push(createSection(`feature-${section.name}`, `features/${section.name}`, section.items));
    });

    return sections;
};

export const buildComponentCodeText = (canvasItems, options = {}) => {
    const { splitByFeature = true } = options;

    if (!canvasItems || canvasItems.length === 0) {
        return '';
    }

    if (!splitByFeature) {
        const body = buildComponentCodeBody(canvasItems);
        return buildWiniImportStatement(body) + body;
    }

    return buildComponentCodeSections(canvasItems)
        .flatMap((section, index, sections) => {
            const lines = [`// ${section.title}`, section.content];
            if (index < sections.length - 1) {
                lines.push('');
            }
            return lines;
        })
        .join('\n');
};
