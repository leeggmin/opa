import React, { useEffect, useRef, useState } from 'react';
import { WiniBox } from '@/shared/ui/wini';
import { CanvasItemNode } from './CanvasItemNode';

const FIXED_CANVAS_FRAME_HEIGHT = 1020;
const CANVAS_AREA_PADDING = 24;
const AUTO_CANVAS_MIN_SIZE = 120;

export const CanvasArea = ({
    canvasItems,
    canvasResolution,
    isFsdMode,
    onMeasureArea,
    selectedRef,
    onSelectItem,
    onUpdateItem,
    onResizeItem,
}) => {
    const areaRef = useRef(null);
    const onMeasureAreaRef = useRef(onMeasureArea);
    const lastMeasuredRef = useRef({ width: -1, height: -1, panelHeight: -1 });
    const [isMeasured, setIsMeasured] = useState(false);
    const [frameContentSize, setFrameContentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        onMeasureAreaRef.current = onMeasureArea;
    }, [onMeasureArea]);

    useEffect(() => {
        if (!onMeasureAreaRef.current) return undefined;

        const emitAreaSize = () => {
            const element = areaRef.current;
            if (!element) return;

            const nextWidth = Math.max(AUTO_CANVAS_MIN_SIZE, Math.floor(element.clientWidth - CANVAS_AREA_PADDING));
            const nextHeight = Math.max(AUTO_CANVAS_MIN_SIZE, Math.floor(element.clientHeight - CANVAS_AREA_PADDING));
            const panelHeight = Math.max(AUTO_CANVAS_MIN_SIZE, Math.floor(element.clientHeight));

            const last = lastMeasuredRef.current;
            if (
                last.width === nextWidth &&
                last.height === nextHeight &&
                last.panelHeight === panelHeight
            ) {
                return;
            }

            lastMeasuredRef.current = {
                width: nextWidth,
                height: nextHeight,
                panelHeight,
            };

            setFrameContentSize({ width: nextWidth, height: nextHeight });
            setIsMeasured(true);
            onMeasureAreaRef.current?.({ width: nextWidth, height: nextHeight, panelHeight });
        };

        emitAreaSize();

        const observer = new ResizeObserver(() => emitAreaSize());
        const observeTarget = areaRef.current?.parentElement;
        if (observeTarget) observer.observe(observeTarget);

        window.addEventListener('resize', emitAreaSize);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', emitAreaSize);
        };
    }, []);

    const isOverflowX = canvasResolution.width > frameContentSize.width;
    const isOverflowY = canvasResolution.height > frameContentSize.height;

    return (
        <WiniBox
            ref={areaRef}
            className="mt-2 w-full rounded-[10px] border border-[#e4e7ec] bg-[#edf3f9] p-3"
            style={{
                height: `${FIXED_CANVAS_FRAME_HEIGHT}px`,
                overflow: isMeasured ? 'auto' : 'hidden',
            }}
        >
            <WiniBox
                className={`w-full h-full flex ${isOverflowY ? 'items-start' : 'items-center'} ${isOverflowX ? 'justify-start' : 'justify-center'}`}
            >
                <WiniBox
                    className="layout-canvas relative border border-dashed border-[#9aa4b2] rounded-[10px] bg-[#f8fbff] overflow-hidden box-border shrink-0"
                    style={{
                        width: `${canvasResolution.width}px`,
                        height: `${canvasResolution.height}px`,
                    }}
                    onMouseDown={() => onSelectItem(null)}
                >
                    {canvasItems.length === 0 && (
                        <WiniBox className="absolute inset-0 flex flex-col items-center justify-center text-[#667085] pointer-events-none text-center gap-1 px-4">
                            <WiniBox>
                                빈 캔버스입니다. 좌측 팔레트를 클릭해 추가하세요.
                            </WiniBox>

                            {isFsdMode && (
                                <WiniBox ui='noAutoGap'>
                                    레이아웃 위에 개별 컴포넌트를 추가해야 합니다.
                                </WiniBox>
                            )}
                        </WiniBox>
                    )}

                    {canvasItems.map((item, itemIndex) => (
                        <CanvasItemNode
                            key={item.instanceId}
                            item={item}
                            itemIndex={itemIndex}
                            selectedRef={selectedRef}
                            onSelectItem={onSelectItem}
                            onUpdateItem={onUpdateItem}
                            onResizeItem={onResizeItem}
                        />
                    ))}
                </WiniBox>
            </WiniBox>
        </WiniBox>
    );
};