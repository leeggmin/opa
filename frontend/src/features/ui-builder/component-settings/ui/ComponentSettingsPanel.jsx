import React, { useCallback } from 'react';
import { WiniBox, WiniButton, WiniText, WiniTypography } from '@/shared/ui/wini';
import { GridColumnEditor } from './GridColumnEditor';
import { SelectMenuEditor } from './SelectMenuEditor';
import { ButtonGroupEditor } from './ButtonGroupEditor';
import { TabItemEditor } from './TabItemEditor';
import { TreeNodeEditor } from './TreeNodeEditor';
import { TableStructureEditor } from './TableStructureEditor';

export const ComponentSettingsPanel = ({
    selectedItem,
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
    requestGridDraftCommit,
    displayMode = 'sidebar',
    onOpenTableStructure,
}) => {
    const selectedType = selectedItem?.type || '';
    const selectedLabel = selectedItem?.label || '';
    const selectedCode = selectedItem?.code || '';
    const selectedIcon = selectedItem?.icon || '';
    const selectedCondition = selectedItem?.condition || '';
    const selectedFeatures = selectedItem?.features || '';

    const handleAutoApply = useCallback(() => {
        if (!isApplyType) return;
        requestGridDraftCommit();
    }, [isApplyType, requestGridDraftCommit]);

    const restoreEmptyFeatureDraft = useCallback(
        (target) => {
            if (!isFeatureEditableType) return;
            if (target?.name !== 'features') return;
            if ((target.value || '').trim()) return;
            if (!selectedFeatures) return;

            updateGridDraftField('features', selectedFeatures);
        },
        [isFeatureEditableType, selectedFeatures, updateGridDraftField],
    );

    const handleFieldBlurCapture = useCallback(
        (event) => {
            const targetTagName = event.target?.tagName;
            if (targetTagName !== 'INPUT' && targetTagName !== 'TEXTAREA') return;
            if (event.target?.readOnly || event.target?.disabled) return;
            restoreEmptyFeatureDraft(event.target);
            handleAutoApply();
        },
        [handleAutoApply, restoreEmptyFeatureDraft],
    );

    const handleFieldKeyDownCapture = useCallback(
        (event) => {
            if (event.key !== 'Enter') return;
            if (event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.nativeEvent?.isComposing) return;
            if (event.target?.tagName !== 'INPUT') return;
            if (event.target?.readOnly || event.target?.disabled) return;

            event.preventDefault();
            restoreEmptyFeatureDraft(event.target);
            handleAutoApply();
        },
        [handleAutoApply, restoreEmptyFeatureDraft],
    );

    const handleAddGridDraftColumn = useCallback(() => {
        addGridDraftColumn();
        requestGridDraftCommit();
    }, [addGridDraftColumn, requestGridDraftCommit]);

    const handleRemoveGridDraftColumn = useCallback(
        (columnId) => {
            removeGridDraftColumn(columnId);
            requestGridDraftCommit();
        },
        [removeGridDraftColumn, requestGridDraftCommit],
    );

    const handleAddTableDraftRow = useCallback(
        (section) => {
            addTableDraftRow(section);
            requestGridDraftCommit();
        },
        [addTableDraftRow, requestGridDraftCommit],
    );

    const handleRemoveTableDraftRow = useCallback(
        (rowId) => {
            removeTableDraftRow(rowId);
            requestGridDraftCommit();
        },
        [removeTableDraftRow, requestGridDraftCommit],
    );

    const handleAddTableDraftCell = useCallback(
        (rowId) => {
            addTableDraftCell(rowId);
            requestGridDraftCommit();
        },
        [addTableDraftCell, requestGridDraftCommit],
    );

    const handleRemoveTableDraftCell = useCallback(
        (rowId, cellId) => {
            removeTableDraftCell(rowId, cellId);
            requestGridDraftCommit();
        },
        [removeTableDraftCell, requestGridDraftCommit],
    );

    const handleAddSelectDraftItem = useCallback(() => {
        addSelectDraftItem();
        requestGridDraftCommit();
    }, [addSelectDraftItem, requestGridDraftCommit]);

    const handleRemoveSelectDraftItem = useCallback(
        (itemId) => {
            removeSelectDraftItem(itemId);
            requestGridDraftCommit();
        },
        [removeSelectDraftItem, requestGridDraftCommit],
    );

    const handleAddButtonGroupDraftItem = useCallback(() => {
        addButtonGroupDraftItem();
        requestGridDraftCommit();
    }, [addButtonGroupDraftItem, requestGridDraftCommit]);

    const handleRemoveButtonGroupDraftItem = useCallback(
        (itemId) => {
            removeButtonGroupDraftItem(itemId);
            requestGridDraftCommit();
        },
        [removeButtonGroupDraftItem, requestGridDraftCommit],
    );

    const handleAddDialogActionDraftItem = useCallback(() => {
        addDialogActionDraftItem();
        requestGridDraftCommit();
    }, [addDialogActionDraftItem, requestGridDraftCommit]);

    const handleRemoveDialogActionDraftItem = useCallback(
        (itemId) => {
            removeDialogActionDraftItem(itemId);
            requestGridDraftCommit();
        },
        [removeDialogActionDraftItem, requestGridDraftCommit],
    );

    const handleAddTabDraftItem = useCallback(() => {
        addTabDraftItem();
        requestGridDraftCommit();
    }, [addTabDraftItem, requestGridDraftCommit]);

    const handleRemoveTabDraftItem = useCallback(
        (itemId) => {
            removeTabDraftItem(itemId);
            requestGridDraftCommit();
        },
        [removeTabDraftItem, requestGridDraftCommit],
    );

    const handleAddTreeDraftRootNode = useCallback(() => {
        addTreeDraftRootNode();
        requestGridDraftCommit();
    }, [addTreeDraftRootNode, requestGridDraftCommit]);

    const handleAddTreeDraftChildNode = useCallback(
        (nodeId) => {
            addTreeDraftChildNode(nodeId);
            requestGridDraftCommit();
        },
        [addTreeDraftChildNode, requestGridDraftCommit],
    );

    const handleRemoveTreeDraftNode = useCallback(
        (nodeId) => {
            removeTreeDraftNode(nodeId);
            requestGridDraftCommit();
        },
        [removeTreeDraftNode, requestGridDraftCommit],
    );

    if (displayMode === 'table-structure') {
        return (
            <WiniBox
                className="h-full min-h-0 overflow-y-auto pr-1"
                onBlurCapture={handleFieldBlurCapture}
                onKeyDownCapture={handleFieldKeyDownCapture}
            >
                <TableStructureEditor
                    tableRows={gridDraft?.tableRows || []}
                    onAddRow={handleAddTableDraftRow}
                    onUpdateRow={updateTableDraftRow}
                    onRemoveRow={handleRemoveTableDraftRow}
                    onAddCell={handleAddTableDraftCell}
                    onUpdateCell={updateTableDraftCell}
                    onRemoveCell={handleRemoveTableDraftCell}
                    onCommit={requestGridDraftCommit}
                    isWide
                />
            </WiniBox>
        );
    }

    return (
        <WiniBox
            className="h-full min-h-0 flex flex-col gap-2"
            onBlurCapture={handleFieldBlurCapture}
            onKeyDownCapture={handleFieldKeyDownCapture}
        >
            <WiniBox className="flex items-center">
                <WiniTypography variant="h5" className="my-0">
                    컴포넌트 설정
                </WiniTypography>
            </WiniBox>

            <WiniText
                ui="column"
                label="컴포넌트명"
                value={selectedType}
                readOnly
            />

            <WiniTypography variant="h5" className="mb-0 mt-4">
                기본 설정
            </WiniTypography>

            <WiniBox className="grid gap-2" ui='noAutoGap'>
                {isLabelEditableType && selectedType !== 'WiniCodeEditor' && selectedType !== 'WiniTypography' && selectedType !== 'WiniButton' && (
                    <WiniBox>
                        <WiniText
                            ui="column"
                            value={isApplyType ? gridDraft?.label ?? '' : selectedLabel}
                            onChange={(event) =>
                                isApplyType
                                    ? updateGridDraftField('label', event.target.value)
                                    : null
                            }
                            label="라벨명"
                            placeholder="라벨명"
                        />
                    </WiniBox>
                )}

                {selectedType === 'WiniButton' && (
                    <>
                        <WiniBox>
                            <WiniText
                                ui="column"
                                value={isApplyType ? gridDraft?.buttonUi ?? 'default' : 'default'}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('buttonUi', event.target.value)
                                        : null
                                }
                                label="ui"
                                placeholder="default"
                            />
                        </WiniBox>

                        <WiniBox ui="noAutoGap">
                            <WiniText
                                ui="column"
                                value={isApplyType ? gridDraft?.label ?? '' : selectedLabel}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('label', event.target.value)
                                        : null
                                }
                                label="버튼명"
                                placeholder="버튼명"
                            />
                        </WiniBox>
                    </>
                )}

                {selectedType === 'WiniTypography' && (
                    <>
                        <WiniBox>
                            <WiniText
                                ui="column"
                                value={isApplyType ? gridDraft?.typographyVariant ?? 'h5' : 'h5'}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('typographyVariant', event.target.value)
                                        : null
                                }
                                label="variant"
                                placeholder="h5"
                            />
                        </WiniBox>

                        <WiniBox>
                            <WiniTypography variant="body2" className="mb-1 text-[#344054] font-bold">
                                내용
                            </WiniTypography>
                            <textarea
                                value={isApplyType ? gridDraft?.typographyContent ?? '' : ''}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('typographyContent', event.target.value)
                                        : null
                                }
                                className="w-full min-h-[100px] resize-y rounded-md border border-[#d0d5dd] bg-white p-2 text-[13px] leading-5 outline-none"
                            />
                        </WiniBox>
                    </>
                )}

                {selectedType === 'WiniCodeEditor' && (
                    <WiniBox>
                        <WiniTypography variant="body2" className="mb-1 text-[#344054] font-bold">
                            코드 예시
                        </WiniTypography>
                        <textarea
                            value={isApplyType ? gridDraft?.code ?? '' : selectedCode}
                            onChange={(event) =>
                                isApplyType
                                    ? updateGridDraftField('code', event.target.value)
                                    : null
                            }
                            className="w-full min-h-[140px] resize-y rounded-md border border-[#d0d5dd] bg-white p-2 font-mono text-[12px] leading-5 outline-none"
                        />
                        </WiniBox>
                )}

                {selectedType === 'WiniDialog' && (
                    <>
                        <WiniBox>
                            <WiniText
                                ui="column"
                                value={isApplyType ? gridDraft?.dialogTitle ?? '' : ''}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('dialogTitle', event.target.value)
                                        : null
                                }
                                label="다이얼로그 타이틀"
                                placeholder="다이얼로그 타이틀"
                            />
                        </WiniBox>

                        <WiniBox>
                            <WiniTypography variant="body2" className="mb-1 text-[#344054] font-bold">
                                다이얼로그 내용
                            </WiniTypography>
                            <textarea
                                value={isApplyType ? gridDraft?.dialogContent ?? '' : ''}
                                onChange={(event) =>
                                    isApplyType
                                        ? updateGridDraftField('dialogContent', event.target.value)
                                        : null
                                }
                                className="w-full min-h-[100px] resize-y rounded-md border border-[#d0d5dd] bg-white p-2 text-[13px] leading-5 outline-none"
                            />
                        </WiniBox>
                    </>
                )}

                {selectedType === 'WiniTable' && (
                    <>
                        {onOpenTableStructure && (
                            <WiniButton
                                ui="lineGray"
                                onClick={onOpenTableStructure}
                                className="w-full border rounded-md cursor-pointer"
                            >
                                Table 행/셀 설정
                            </WiniButton>
                        )}
                        <WiniText
                            ui="column"
                            value={gridDraft?.tableLabelColumnCount ?? ''}
                            onChange={(event) => updateGridDraftField('tableLabelColumnCount', event.target.value)}
                            label="labelColumnCount"
                            placeholder="예: 3"
                        />
                        <WiniText
                            ui="column"
                            value={gridDraft?.tableLabelColumnWidth ?? ''}
                            onChange={(event) => updateGridDraftField('tableLabelColumnWidth', event.target.value)}
                            label="labelColumnWidth"
                            placeholder="예: 150px"
                        />
                        <WiniText
                            ui="column"
                            value={gridDraft?.tableColumnWidths ?? ''}
                            onChange={(event) => updateGridDraftField('tableColumnWidths', event.target.value)}
                            label="columnWidths"
                            placeholder="예: 150px, auto, 150px, auto"
                        />
                        <WiniTypography color="textSecondary" variant="caption" className="text-xs block">
                            columnWidths는 쉼표로 구분합니다. 직접 지정하면 labelColumnCount 설정보다 우선합니다.
                        </WiniTypography>
                    </>
                )}

                {isIconEditableType && (
                    <WiniBox ui="noAutoGap">
                        <WiniText
                            ui="column"
                            value={isApplyType ? gridDraft?.icon ?? '' : selectedIcon}
                            onChange={(event) =>
                                isApplyType
                                    ? updateGridDraftField('icon', event.target.value)
                                    : null
                            }
                            label="아이콘"
                            placeholder="아이콘"
                        />
                    </WiniBox>
                )}

                {selectedType === 'WiniGridLayout' && (
                    <WiniBox>
                        <WiniText
                            ui="column"
                            value={gridDraft?.gridLayoutColRatios ?? '12'}
                            onChange={(event) => updateGridDraftField('gridLayoutColRatios', event.target.value)}
                            label="컬럼 비율 (예: 6:3:3)"
                            placeholder="6:3:3"
                        />
                        <WiniTypography color="textSecondary" variant="caption" className="text-xs mt-1 block">
                            비율의 합으로 12 columns 배분합니다.<br/>구분자는 : 를 사용합니다. (예: 6:3:3)
                        </WiniTypography>
                    </WiniBox>
                )}

                {isFeatureEditableType && (
                    <WiniBox>
                        <WiniText
                            ui="column"
                            value={isApplyType ? gridDraft?.features ?? selectedFeatures : selectedFeatures}
                            name="features"
                            onChange={(event) =>
                                isApplyType
                                    ? updateGridDraftField('features', event.target.value)
                                    : null
                            }
                            label="FSD features"
                            placeholder="예: user/list"
                            required
                        />
                        <WiniTypography color="textSecondary" variant="caption" className="text-xs mt-1 block">
                            필수 입력 항목입니다. 비워두면 현재 기본값을 유지합니다.
                        </WiniTypography>
                    </WiniBox>
                )}

                <WiniText
                    ui="column"
                    value={isApplyType ? gridDraft?.condition ?? '' : selectedCondition}
                    onChange={(event) =>
                        isApplyType
                            ? updateGridDraftField('condition', event.target.value)
                            : null
                    }
                    label="속성"
                    placeholder="속성"
                />
            </WiniBox>

            <WiniBox className="min-h-0 flex-1 overflow-y-auto pr-1 grid gap-2">

                {selectedType === 'WiniAgGridReact' && (
                    <GridColumnEditor
                        gridColumns={gridDraft?.gridColumns || []}
                        onAdd={handleAddGridDraftColumn}
                        onRemove={handleRemoveGridDraftColumn}
                        onChange={updateGridDraftColumn}
                    />
                )}

                {selectedType === 'WiniTable' && !onOpenTableStructure && (
                    <TableStructureEditor
                        tableRows={gridDraft?.tableRows || []}
                        onAddRow={handleAddTableDraftRow}
                        onUpdateRow={updateTableDraftRow}
                        onRemoveRow={handleRemoveTableDraftRow}
                        onAddCell={handleAddTableDraftCell}
                        onUpdateCell={updateTableDraftCell}
                        onRemoveCell={handleRemoveTableDraftCell}
                        onCommit={requestGridDraftCommit}
                    />
                )}

                {selectedType === 'WiniSelect' && (
                    <SelectMenuEditor
                        menuItems={gridDraft?.menuItems || []}
                        onAdd={handleAddSelectDraftItem}
                        onRemove={handleRemoveSelectDraftItem}
                        onChange={updateSelectDraftItem}
                    />
                )}

                {selectedType === 'WiniButtonGroup' && (
                    <ButtonGroupEditor
                        buttonItems={gridDraft?.buttonGroupItems || []}
                        onAdd={handleAddButtonGroupDraftItem}
                        onRemove={handleRemoveButtonGroupDraftItem}
                        onChange={updateButtonGroupDraftItem}
                    />
                )}

                {selectedType === 'WiniDialog' && (
                    <ButtonGroupEditor
                        buttonItems={gridDraft?.dialogActions || []}
                        onAdd={handleAddDialogActionDraftItem}
                        onRemove={handleRemoveDialogActionDraftItem}
                        onChange={updateDialogActionDraftItem}
                    />
                )}

                {selectedType === 'WiniTab' && (
                    <TabItemEditor
                        tabItems={gridDraft?.tabItems || []}
                        onAdd={handleAddTabDraftItem}
                        onRemove={handleRemoveTabDraftItem}
                        onChange={updateTabDraftItem}
                    />
                )}

                {selectedType === 'WiniTreeView' && (
                    <TreeNodeEditor
                        treeData={gridDraft?.treeData || []}
                        onAddRoot={handleAddTreeDraftRootNode}
                        onAddChild={handleAddTreeDraftChildNode}
                        onRemove={handleRemoveTreeDraftNode}
                        onChange={updateTreeDraftNode}
                    />
                )}
            </WiniBox>
        </WiniBox>
    );
};
