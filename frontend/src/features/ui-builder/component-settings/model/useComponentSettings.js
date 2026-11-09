import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isFeatureSectionType, parseGridLayoutRatios } from '@/features/ui-builder/canvas-editor';

const LABEL_EDITABLE_TYPES = [
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
    'WiniCodeEditor',
    'WiniAccordion',
];

const ICON_EDITABLE_TYPES = ['WiniIcon', 'WiniIconButton', 'WiniToggleButton'];

const createDefaultButtonGroupItems = () => [
    { id: createId('button-item'), ui: 'line', label: '취소' },
    { id: createId('button-item'), ui: 'default', label: '저장' },
];

const createDefaultDialogActions = () => [
    { id: createId('dialog-action'), ui: 'line', label: '취소' },
    { id: createId('dialog-action'), ui: 'default', label: '확인' },
];

const resolveRequiredFeatureValue = (draftValue, targetItem) => {
    const trimmedDraftValue = (draftValue || '').trim();
    if (trimmedDraftValue) return trimmedDraftValue;
    return (targetItem?.features || '').trim();
};

const normalizeButtonGroupItems = (buttonGroupItems = []) =>
    (buttonGroupItems || []).map((buttonItem, index) => ({
        ...buttonItem,
        ui: (buttonItem.ui || '').trim() || 'default',
        label: (buttonItem.label || '').trim() || `버튼 ${index + 1}`,
    }));

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const cloneTreeNodes = (nodes = []) =>
    nodes.map((node) => ({
        ...node,
        children: cloneTreeNodes(node.children || []),
    }));

const cloneTableRows = (rows = []) =>
    rows.map((row) => ({
        ...row,
        cells: (row.cells || []).map((cell) => ({ ...cell })),
    }));

const createTableCell = (section) => ({
    id: createId('table-cell'),
    content: '',
    component: section === 'head' ? 'th' : 'td',
    align: 'center',
    scope: section === 'head' ? 'col' : '',
    rowSpan: 1,
    colSpan: 1,
    ui: '',
});

const updateTreeNodeById = (nodes, nodeId, updater) =>
    nodes.map((node) => {
        if (node.id === nodeId) {
            return updater(node);
        }

        return {
            ...node,
            children: updateTreeNodeById(node.children || [], nodeId, updater),
        };
    });

const removeTreeNodeById = (nodes, nodeId) =>
    nodes
        .filter((node) => node.id !== nodeId)
        .map((node) => ({
            ...node,
            children: removeTreeNodeById(node.children || [], nodeId),
        }));

const createGridDraft = (selectedItem) => ({
    itemId: selectedItem.instanceId,
    label: selectedItem.label,
    buttonUi: selectedItem.buttonUi || 'default',
    condition: selectedItem.condition,
    icon: selectedItem.icon || '',
    code: selectedItem.code || '',
    dialogTitle: selectedItem.dialogTitle || '',
    dialogContent: selectedItem.dialogContent || '',
    dialogActions:
        (selectedItem.dialogActions || []).length > 0
            ? (selectedItem.dialogActions || []).map((action) => ({ ...action }))
            : createDefaultDialogActions(),
    typographyVariant: selectedItem.typographyVariant || 'h5',
    typographyContent: selectedItem.typographyContent || '',
    menuItems: (selectedItem.menuItems || []).map((item) => ({ ...item })),
    buttonGroupItems:
        (selectedItem.buttonGroupItems || []).length > 0
            ? (selectedItem.buttonGroupItems || []).map((item) => ({ ...item }))
            : createDefaultButtonGroupItems(),
    tabItems: (selectedItem.tabItems || []).map((tabItem) => ({ ...tabItem })),
    gridColumns: (selectedItem.gridColumns || []).map((column) => ({ ...column })),
    tableLabelColumnCount: selectedItem.tableLabelColumnCount || '',
    tableLabelColumnWidth: selectedItem.tableLabelColumnWidth || '',
    tableColumnWidths: selectedItem.tableColumnWidths || '',
    tableRows: cloneTableRows(selectedItem.tableRows || []),
    treeData: cloneTreeNodes(selectedItem.treeData || []),
    gridLayoutColRatios: selectedItem.gridLayoutColRatios || '12',
    features: selectedItem.features || '',
});

export const useComponentSettings = ({
    isFsdMode,
    selectedItem,
    selectedRef,
    selectedFeatureContainerAncestor,
    updateCanvasItem,
}) => {
    const [gridDraft, setGridDraft] = useState(null);
    const [commitRequestCount, setCommitRequestCount] = useState(0);
    const pendingCommitRef = useRef(null);
    const skipNextDeferredCommitRef = useRef(false);

    const isLabelEditableType = useMemo(
        () => Boolean(selectedItem && LABEL_EDITABLE_TYPES.includes(selectedItem.type)),
        [selectedItem],
    );

    const isIconEditableType = useMemo(
        () => Boolean(selectedItem && ICON_EDITABLE_TYPES.includes(selectedItem.type)),
        [selectedItem],
    );

    const isApplyType = useMemo(() => Boolean(selectedItem), [selectedItem]);

    const isFeatureEditableType = useMemo(
        () => Boolean(
            isFsdMode
            && selectedItem
            && isFeatureSectionType(selectedItem.type)
            && !selectedFeatureContainerAncestor,
        ),
        [isFsdMode, selectedFeatureContainerAncestor, selectedItem],
    );

    const commitGridDraftToItem = useCallback(
        (targetItem, draft, itemId) => {
            if (!targetItem || !draft || !itemId) return;

            if (targetItem.type === 'WiniAgGridReact') {
                updateCanvasItem(itemId, {
                    label: draft.label,
                    condition: draft.condition,
                    gridColumns: draft.gridColumns,
                });
                return;
            }

            if (targetItem.type === 'WiniTable') {
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    tableLabelColumnCount: draft.tableLabelColumnCount,
                    tableLabelColumnWidth: draft.tableLabelColumnWidth,
                    tableColumnWidths: draft.tableColumnWidths,
                    tableRows: draft.tableRows,
                });
                return;
            }

            if (targetItem.type === 'WiniTreeView') {
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    treeData: draft.treeData,
                });
                return;
            }

            if (targetItem.type === 'WiniTab') {
                const prevTabItems = targetItem.tabItems || [];
                const nextTabItems = draft.tabItems || [];
                const prevFirstTabValue = prevTabItems[0]?.value || 'tab-1';
                const nextFirstTabValue = nextTabItems[0]?.value || 'tab-1';
                const nextTabValueSet = new Set(nextTabItems.map((tabItem) => tabItem.value));

                const previousValueById = new Map(prevTabItems.map((tabItem) => [tabItem.id, tabItem.value]));
                const currentValueById = new Map(nextTabItems.map((tabItem) => [tabItem.id, tabItem.value]));
                const renamedValueMap = new Map();

                previousValueById.forEach((prevValue, tabId) => {
                    const nextValue = currentValueById.get(tabId);
                    if (nextValue && prevValue !== nextValue) {
                        renamedValueMap.set(prevValue, nextValue);
                    }
                });

                const nextChildren = (targetItem.children || []).map((child) => {
                    const previousTabValue = child.tabValue || prevFirstTabValue;
                    const renamedTabValue = renamedValueMap.get(previousTabValue) || previousTabValue;
                    const safeTabValue = nextTabValueSet.has(renamedTabValue) ? renamedTabValue : nextFirstTabValue;
                    return { ...child, tabValue: safeTabValue };
                });

                const previousActiveTabValue = targetItem.activeTabValue || prevFirstTabValue;
                const renamedActiveTabValue = renamedValueMap.get(previousActiveTabValue) || previousActiveTabValue;
                const nextActiveTabValue = nextTabValueSet.has(renamedActiveTabValue)
                    ? renamedActiveTabValue
                    : nextFirstTabValue;

                updateCanvasItem(itemId, {
                    label: draft.label,
                    condition: draft.condition,
                    features: resolveRequiredFeatureValue(draft.features, targetItem),
                    icon: draft.icon,
                    code: draft.code,
                    menuItems: draft.menuItems,
                    tabItems: nextTabItems,
                    children: nextChildren,
                    activeTabValue: nextActiveTabValue,
                });
                return;
            }

            if (targetItem.type === 'WiniDialog') {
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    features: resolveRequiredFeatureValue(draft.features, targetItem),
                    dialogTitle: draft.dialogTitle,
                    dialogContent: draft.dialogContent,
                    dialogActions: normalizeButtonGroupItems(draft.dialogActions),
                });
                return;
            }

            if (targetItem.type === 'WiniTypography') {
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    typographyVariant: draft.typographyVariant,
                    typographyContent: draft.typographyContent,
                });
                return;
            }

            if (targetItem.type === 'WiniButton') {
                updateCanvasItem(itemId, {
                    label: draft.label,
                    condition: draft.condition,
                    buttonUi: draft.buttonUi || 'default',
                });
                return;
            }

            if (targetItem.type === 'WiniButtonGroup') {
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    buttonGroupItems: normalizeButtonGroupItems(draft.buttonGroupItems),
                });
                return;
            }

            if (targetItem.type === 'WiniGridLayout') {
                const newRatios = draft.gridLayoutColRatios || '12';
                const colRatios = parseGridLayoutRatios(newRatios);
                const gridLayoutItems = colRatios.map((xs) => ({
                    id: createId('grid-item'),
                    xs,
                }));
                updateCanvasItem(itemId, {
                    condition: draft.condition,
                    features: resolveRequiredFeatureValue(draft.features, targetItem),
                    gridLayoutColRatios: newRatios,
                    gridLayoutItems,
                });
                return;
            }

            const fallbackPatch = {
                condition: draft.condition,
            };

            if (LABEL_EDITABLE_TYPES.includes(targetItem.type)) {
                fallbackPatch.label = draft.label;
            }

            if (ICON_EDITABLE_TYPES.includes(targetItem.type)) {
                fallbackPatch.icon = draft.icon;
            }

            if (isFeatureSectionType(targetItem.type)) {
                fallbackPatch.features = resolveRequiredFeatureValue(draft.features, targetItem);
            }

            if (targetItem.type === 'WiniCodeEditor') {
                fallbackPatch.code = draft.code;
            }

            if (targetItem.type === 'WiniSelect') {
                fallbackPatch.menuItems = draft.menuItems;
            }

            updateCanvasItem(itemId, fallbackPatch);
        },
        [updateCanvasItem],
    );

    useEffect(() => {
        if (!selectedItem) {
            setGridDraft(null);
            return;
        }

        setGridDraft((prev) => (
            prev?.itemId === selectedItem.instanceId
                ? prev
                : createGridDraft(selectedItem)
        ));
    }, [selectedItem, isApplyType]);

    const updateGridDraftField = (field, value) => {
        setGridDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const queueDraftCommit = useCallback(
        (nextDraft) => {
            pendingCommitRef.current = {
                item: selectedItem,
                draft: nextDraft,
                itemId: selectedRef?.itemId || null,
            };
            setCommitRequestCount((prev) => prev + 1);
        },
        [selectedItem, selectedRef],
    );

    const addGridDraftColumn = useCallback(() => {
        if (!gridDraft) return;

        const nextDraft = {
            ...gridDraft,
            gridColumns: [...gridDraft.gridColumns, { id: createId('col'), name: '', value: '', format: '', condition: '' }],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const updateGridDraftColumn = (columnId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                gridColumns: prev.gridColumns.map((column) =>
                    column.id === columnId ? { ...column, ...patch } : column,
                ),
            };
        });
    };

    const removeGridDraftColumn = useCallback(
        (columnId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                gridColumns: gridDraft.gridColumns.filter((column) => column.id !== columnId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addTableDraftRow = useCallback(
        (section) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                tableRows: [
                    ...(gridDraft.tableRows || []),
                    {
                        id: createId('table-row'),
                        section,
                        cells: [createTableCell(section)],
                    },
                ],
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const updateTableDraftRow = (rowId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                tableRows: (prev.tableRows || []).map((row) =>
                    row.id === rowId ? { ...row, ...patch } : row,
                ),
            };
        });
    };

    const removeTableDraftRow = useCallback(
        (rowId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                tableRows: (gridDraft.tableRows || []).filter((row) => row.id !== rowId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addTableDraftCell = useCallback(
        (rowId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                tableRows: (gridDraft.tableRows || []).map((row) =>
                    row.id === rowId
                        ? { ...row, cells: [...(row.cells || []), createTableCell(row.section)] }
                        : row,
                ),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const updateTableDraftCell = (rowId, cellId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                tableRows: (prev.tableRows || []).map((row) =>
                    row.id === rowId
                        ? {
                            ...row,
                            cells: (row.cells || []).map((cell) =>
                                cell.id === cellId ? { ...cell, ...patch } : cell,
                            ),
                        }
                        : row,
                ),
            };
        });
    };

    const removeTableDraftCell = useCallback(
        (rowId, cellId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                tableRows: (gridDraft.tableRows || []).map((row) =>
                    row.id === rowId
                        ? { ...row, cells: (row.cells || []).filter((cell) => cell.id !== cellId) }
                        : row,
                ),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addSelectDraftItem = useCallback(() => {
        if (!gridDraft) return;

        const nextDraft = {
            ...gridDraft,
            menuItems: [...(gridDraft.menuItems || []), { id: createId('menu-item'), value: '' }],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const updateSelectDraftItem = (itemId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                menuItems: (prev.menuItems || []).map((item) =>
                    item.id === itemId ? { ...item, ...patch } : item,
                ),
            };
        });
    };

    const removeSelectDraftItem = useCallback(
        (itemId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                menuItems: (gridDraft.menuItems || []).filter((item) => item.id !== itemId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addButtonGroupDraftItem = useCallback(() => {
        if (!gridDraft) return;

        const nextDraft = {
            ...gridDraft,
            buttonGroupItems: [
                ...(gridDraft.buttonGroupItems || []),
                { id: createId('button-item'), ui: '', label: '' },
            ],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const updateButtonGroupDraftItem = (itemId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                buttonGroupItems: (prev.buttonGroupItems || []).map((item) =>
                    item.id === itemId ? { ...item, ...patch } : item,
                ),
            };
        });
    };

    const removeButtonGroupDraftItem = useCallback(
        (itemId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                buttonGroupItems: (gridDraft.buttonGroupItems || []).filter((item) => item.id !== itemId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addDialogActionDraftItem = useCallback(() => {
        if (!gridDraft) return;

        const nextDraft = {
            ...gridDraft,
            dialogActions: [
                ...(gridDraft.dialogActions || []),
                { id: createId('dialog-action'), ui: '', label: '' },
            ],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const updateDialogActionDraftItem = (itemId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                dialogActions: (prev.dialogActions || []).map((item) =>
                    item.id === itemId ? { ...item, ...patch } : item,
                ),
            };
        });
    };

    const removeDialogActionDraftItem = useCallback(
        (itemId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                dialogActions: (gridDraft.dialogActions || []).filter((item) => item.id !== itemId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addTabDraftItem = useCallback(() => {
        if (!gridDraft) return;

        const nextIndex = (gridDraft.tabItems || []).length + 1;
        const uid = Math.random().toString(36).slice(2, 7);
        const nextDraft = {
            ...gridDraft,
            tabItems: [
                ...(gridDraft.tabItems || []),
                { id: createId('tab-item'), label: `탭 ${nextIndex}`, value: `tab-${uid}-${nextIndex}`, event: '' },
            ],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const updateTabDraftItem = (tabItemId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                tabItems: (prev.tabItems || []).map((tabItem) =>
                    tabItem.id === tabItemId ? { ...tabItem, ...patch } : tabItem,
                ),
            };
        });
    };

    const removeTabDraftItem = useCallback(
        (tabItemId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                tabItems: (gridDraft.tabItems || []).filter((tabItem) => tabItem.id !== tabItemId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const addTreeDraftRootNode = useCallback(() => {
        if (!gridDraft) return;

        const nextDraft = {
            ...gridDraft,
            treeData: [...(gridDraft.treeData || []), { id: createId('tree-node'), name: '', children: [] }],
        };

        setGridDraft(nextDraft);
        queueDraftCommit(nextDraft);
    }, [gridDraft, queueDraftCommit]);

    const addTreeDraftChildNode = useCallback(
        (parentNodeId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                treeData: updateTreeNodeById(gridDraft.treeData || [], parentNodeId, (node) => ({
                    ...node,
                    children: [...(node.children || []), { id: createId('tree-node'), name: '', children: [] }],
                })),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const updateTreeDraftNode = (nodeId, patch) => {
        setGridDraft((prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                treeData: updateTreeNodeById(prev.treeData || [], nodeId, (node) => ({ ...node, ...patch })),
            };
        });
    };

    const removeTreeDraftNode = useCallback(
        (nodeId) => {
            if (!gridDraft) return;

            const nextDraft = {
                ...gridDraft,
                treeData: removeTreeNodeById(gridDraft.treeData || [], nodeId),
            };

            setGridDraft(nextDraft);
            queueDraftCommit(nextDraft);
        },
        [gridDraft, queueDraftCommit],
    );

    const commitGridDraft = useCallback(() => {
        if (!selectedRef?.itemId || !gridDraft || !selectedItem) return;
        commitGridDraftToItem(selectedItem, gridDraft, selectedRef.itemId);
    }, [commitGridDraftToItem, gridDraft, selectedItem, selectedRef]);

    const commitGridDraftBeforeSelectionChange = useCallback(() => {
        skipNextDeferredCommitRef.current = true;
        commitGridDraft();
    }, [commitGridDraft]);

    const requestGridDraftCommit = useCallback(() => {
        if (skipNextDeferredCommitRef.current) {
            skipNextDeferredCommitRef.current = false;
            return;
        }

        setCommitRequestCount((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (commitRequestCount === 0) return;
        const pendingCommit = pendingCommitRef.current;

        if (pendingCommit?.item && pendingCommit?.draft && pendingCommit?.itemId) {
            commitGridDraftToItem(
                pendingCommit.item,
                pendingCommit.draft,
                pendingCommit.itemId,
            );
        } else {
            commitGridDraft();
        }

        pendingCommitRef.current = null;
        setCommitRequestCount(0);
    }, [commitGridDraft, commitGridDraftToItem, commitRequestCount]);

    return {
        gridDraft,
        isLabelEditableType,
        isIconEditableType,
        isFeatureEditableType,
        isApplyType,
        updateGridDraftField,
        addGridDraftColumn,
        updateGridDraftColumn,
        removeGridDraftColumn,
        addTableDraftRow,
        updateTableDraftRow,
        removeTableDraftRow,
        addTableDraftCell,
        updateTableDraftCell,
        removeTableDraftCell,
        addSelectDraftItem,
        updateSelectDraftItem,
        removeSelectDraftItem,
        addButtonGroupDraftItem,
        updateButtonGroupDraftItem,
        removeButtonGroupDraftItem,
        addDialogActionDraftItem,
        updateDialogActionDraftItem,
        removeDialogActionDraftItem,
        addTabDraftItem,
        updateTabDraftItem,
        removeTabDraftItem,
        addTreeDraftRootNode,
        addTreeDraftChildNode,
        updateTreeDraftNode,
        removeTreeDraftNode,
        commitGridDraft,
        commitGridDraftBeforeSelectionChange,
        requestGridDraftCommit,
    };
};
