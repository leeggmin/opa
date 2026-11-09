import React, { useCallback, useEffect, useRef, useState } from 'react';
import { WiniBox, WiniDragDialog, WiniGridItem, WiniGridLayout } from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { UiBuilderPalette } from '@/features/ui-builder/palette';
import {
    ComponentCodePanel,
    LayoutOutputPanel,
    UiBuilderCanvasArea,
    UiBuilderCanvasPreviewDialog,
    UiBuilderCanvasToolbar,
    useUiBuilderCanvasEditor,
} from '@/features/ui-builder/canvas-editor';
import {
    UiBuilderComponentSettingsPanel,
    useUiBuilderComponentSettings,
} from '@/features/ui-builder/component-settings';

export const UiBuilderPage = () => {
    const canvas = useUiBuilderCanvasEditor();
    const leftContentRef = useRef(null);
    const [leftContentHeight, setLeftContentHeight] = useState(null);
    const [isTableSettingsOpen, setIsTableSettingsOpen] = useState(false);
    const settingsPanelTopOffset = 8;

    const basePanelHeight = leftContentHeight || canvas.canvasResolution.height;
    const settingsPanelHeight = Math.max(320, basePanelHeight - settingsPanelTopOffset);

    const settings = useUiBuilderComponentSettings({
        isFsdMode: canvas.isFsdMode,
        selectedItem: canvas.selectedItem,
        selectedRef: canvas.selectedRef,
        selectedFeatureContainerAncestor: canvas.selectedFeatureContainerAncestor,
        updateCanvasItem: canvas.updateCanvasItem,
    });
    const selectedTableId = canvas.selectedItem?.type === 'WiniTable'
        ? canvas.selectedItem.instanceId
        : null;
    const tableSettingsDialogWidth = Math.max(300, Math.min(960, window.innerWidth - 32));
    const tableSettingsDialogHeight = Math.max(240, Math.min(760, window.innerHeight - 32));
    const tableSettingsContentHeight = Math.max(188, tableSettingsDialogHeight - 52);
    const tableSettingsDialogPosition = {
        x: Math.max(16, window.innerWidth - tableSettingsDialogWidth - 32),
        y: Math.max(16, Math.min(80, window.innerHeight - tableSettingsDialogHeight - 16)),
    };

    const handleSelectCanvasItem = useCallback(
        (nextSelectedRef) => {
            settings.commitGridDraftBeforeSelectionChange();
            canvas.setSelectedRef(nextSelectedRef);
        },
        [canvas, settings],
    );

    useEffect(() => {
        const element = leftContentRef.current;
        if (!element) return undefined;

        const updateHeight = () => {
            setLeftContentHeight(Math.max(320, Math.floor(element.clientHeight)));
        };

        updateHeight();

        const observer = new ResizeObserver(() => updateHeight());
        observer.observe(element);
        window.addEventListener('resize', updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    useEffect(() => {
        setIsTableSettingsOpen(false);
    }, [selectedTableId]);

    return (
        <WiniFormEmpty>
            <WiniBox className="flex items-start gap-4">
                <WiniBox className="sticky top-0 h-screen shrink-0 self-start">
                    <UiBuilderPalette onSelectTemplate={canvas.addComponentByTemplate} />
                </WiniBox>

                <WiniBox ui="noAutoGap" className="min-w-0 flex-1">
                    <UiBuilderCanvasToolbar
                        canvasResolution={canvas.canvasResolution}
                        hasCanvasItems={canvas.canvasItems.length > 0}
                        isFsdMode={canvas.isFsdMode}
                        onCommitResolutionWidth={(value) => canvas.updateCanvasResolution('width', value)}
                        onCommitResolutionHeight={(value) => canvas.updateCanvasResolution('height', value)}
                        selectedRef={canvas.selectedRef}
                        canMoveSelectedForward={canvas.canMoveSelectedForward}
                        canMoveSelectedBackward={canvas.canMoveSelectedBackward}
                        onClear={canvas.clearCanvas}
                        onDuplicate={canvas.duplicateSelectedItem}
                        onOpenPreview={canvas.openPreview}
                        onRemoveSelected={canvas.removeSelectedItem}
                        onMoveForward={() => canvas.moveSelectedLayer('forward')}
                        onMoveBackward={() => canvas.moveSelectedLayer('backward')}
                        onBuildLayoutText={canvas.generateLayoutText}
                        onToggleFsdMode={canvas.setIsFsdMode}
                    />

                    <UiBuilderCanvasPreviewDialog
                        open={canvas.isPreviewOpen}
                        onClose={canvas.closePreview}
                        canvasItems={canvas.canvasItems}
                        canvasResolution={canvas.canvasResolution}
                    />

                    <WiniDragDialog
                        title="WiniTable 행/셀 설정"
                        open={Boolean(selectedTableId) && isTableSettingsOpen}
                        setOpen={setIsTableSettingsOpen}
                        position={tableSettingsDialogPosition}
                    >
                        <WiniBox
                            className="min-h-0 overflow-hidden bg-[#fafafa] p-4"
                            style={{
                                width: `${tableSettingsDialogWidth}px`,
                                height: `${tableSettingsContentHeight}px`,
                            }}
                        >
                            <UiBuilderComponentSettingsPanel
                                selectedItem={canvas.selectedItem}
                                displayMode="table-structure"
                                {...settings}
                            />
                        </WiniBox>
                    </WiniDragDialog>

                    <WiniBox className="grid grid-cols-[1fr_320px] gap-3 items-start mt-2">
                        <WiniBox ref={leftContentRef} className="min-w-0">
                            <UiBuilderCanvasArea
                                canvasItems={canvas.canvasItems}
                                canvasResolution={canvas.canvasResolution}
                                isFsdMode={canvas.isFsdMode}
                                onMeasureArea={canvas.syncCanvasResolutionFromArea}
                                selectedRef={canvas.selectedRef}
                                onSelectItem={handleSelectCanvasItem}
                                onUpdateItem={canvas.updateCanvasItem}
                                onResizeItem={canvas.resizeCanvasItem}
                            />

                            <WiniGridLayout container rowItem={2} columnSpacing={1} rowSpacing={1}>
                                <WiniGridItem size={{ md: 6 }} className="relative min-w-0">
                                    <LayoutOutputPanel
                                        layoutText={canvas.layoutText}
                                        layoutSections={canvas.layoutSections}
                                        copyFeedback={canvas.copyFeedback}
                                        onCopy={canvas.copyLayoutText}
                                    />
                                </WiniGridItem>

                                <WiniGridItem size={{ md: 6 }} className="relative min-w-0">
                                    <ComponentCodePanel
                                        componentCodeText={canvas.componentCodeText}
                                        componentCodeSections={canvas.componentCodeSections}
                                        copyFeedback={canvas.componentCodeCopyFeedback}
                                        onCopy={canvas.copyComponentCodeText}
                                    />
                                </WiniGridItem>
                            </WiniGridLayout>
                        </WiniBox>

                        <WiniBox
                            className="border border-[#e4e4e4] rounded-[10px] p-3 bg-[#fafafa] min-w-0 min-h-0 sticky top-2 overflow-hidden mt-2"
                            style={{
                                height: `${settingsPanelHeight}px`,
                                minHeight: `${settingsPanelHeight}px`,
                            }}
                        >
                            <WiniBox className="h-full min-h-0">
                                <UiBuilderComponentSettingsPanel
                                    selectedItem={canvas.selectedItem}
                                    onOpenTableStructure={() => setIsTableSettingsOpen(true)}
                                    {...settings}
                                />
                            </WiniBox>
                        </WiniBox>
                    </WiniBox>
                </WiniBox>
            </WiniBox>
        </WiniFormEmpty>
    );
};
