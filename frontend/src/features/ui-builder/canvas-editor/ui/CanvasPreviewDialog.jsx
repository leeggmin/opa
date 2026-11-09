import React from 'react';
import {
    WiniBox,
    WiniDialog,
    WiniDialogContent,
    WiniDialogTitle,
    WiniIconButton,
} from '@/shared/ui/wini';
import { CanvasItemNode } from './CanvasItemNode';

export const CanvasPreviewDialog = ({
    open,
    onClose,
    canvasItems,
    canvasResolution,
}) => {
    return (
        <WiniDialog open={open} onClose={onClose} fullScreen>
            <WiniDialogTitle className="!pr-14">캔버스 미리보기</WiniDialogTitle>

            <WiniIconButton
                icon="close"
                aria-label="미리보기 닫기"
                onClick={onClose}
                className="!absolute right-0.5 z-10"
            />

            <WiniDialogContent className="!p-0">
                <WiniBox className="w-full h-[calc(100vh-64px)] overflow-auto bg-[#edf3f9] p-4 box-border">
                    <WiniBox className="w-full h-full min-w-full min-h-full flex items-center justify-center">
                        <WiniBox
                            className="layout-canvas relative border border-dashed border-[#9aa4b2] rounded-[10px] bg-[#f8fbff] overflow-hidden box-border shrink-0"
                            style={{
                                width: `${canvasResolution.width}px`,
                                height: `${canvasResolution.height}px`,
                            }}
                        >
                            {canvasItems.length === 0 && (
                                <WiniBox className="absolute inset-0 flex items-center justify-center text-[#667085] pointer-events-none">
                                    미리볼 컴포넌트가 없습니다.
                                </WiniBox>
                            )}

                            {canvasItems.map((item, itemIndex) => (
                                <CanvasItemNode
                                    key={item.instanceId}
                                    item={item}
                                    itemIndex={itemIndex}
                                    selectedRef={null}
                                    onSelectItem={() => {}}
                                    onUpdateItem={() => {}}
                                    isPreview
                                    hideLayoutContainers
                                />
                            ))}
                        </WiniBox>
                    </WiniBox>
                </WiniBox>
            </WiniDialogContent>
        </WiniDialog>
    );
};
