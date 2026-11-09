import React from 'react';
import { Rnd } from 'react-rnd';
import { getResizePatch, isInsetContainerType } from '../model/canvasUtils';
import { ItemPreview } from './ItemPreview';

export const CanvasItemNode = ({
    item,
    itemIndex = 0,
    selectedRef,
    onSelectItem,
    onUpdateItem,
    onResizeItem,
    isPreview = false,
    hideLayoutContainers = false,
}) => {
    const isSelectedItem = selectedRef?.itemId === item.instanceId;
    const isInsetContainer = isInsetContainerType(item.type);
    const shouldHideContainerVisual = hideLayoutContainers && isInsetContainer;
    const childLayerTopOffset = item.type === 'WiniTab' ? 48 : 0;
    const childLayerInset = isInsetContainer ? 10 : 6;
    const firstTabValue = (item.tabItems || [])[0]?.value || 'tab-1';
    const activeTabValue = item.activeTabValue || firstTabValue;
    const visibleChildren =
        item.type === 'WiniTab'
            ? (item.children || []).filter((child) => {
                const childTabValue = child.tabValue || firstTabValue;
                return childTabValue === activeTabValue;
            })
            : item.children || [];

    const childrenNodes = visibleChildren.map((child, childIndex) => (
        <CanvasItemNode
            key={child.instanceId}
            item={child}
            itemIndex={childIndex}
            selectedRef={selectedRef}
            onSelectItem={onSelectItem}
            onUpdateItem={onUpdateItem}
            onResizeItem={onResizeItem}
            isPreview={isPreview}
            hideLayoutContainers={hideLayoutContainers}
        />
    ));

    return (
        <Rnd
            key={item.instanceId}
            size={{ width: item.width, height: item.height }}
            position={{ x: item.x, y: item.y }}
            bounds="parent"
            minWidth={35}
            minHeight={30}
            cancel=".canvas-item-interactive"
            disableDragging={isPreview}
            enableResizing={!isPreview}
            style={{ zIndex: itemIndex + 1, margin: 0, padding: 0 }}
            onDragStart={(e) => {
                if (isPreview) return;
                e.stopPropagation();
                onSelectItem({ itemId: item.instanceId });
            }}
            onResizeStart={(e) => {
                if (isPreview) return;
                e.stopPropagation();
                onSelectItem({ itemId: item.instanceId });
            }}
            onDragStop={(_, data) => {
                if (isPreview) return;
                onUpdateItem(item.instanceId, { x: data.x, y: data.y });
            }}
            onResizeStop={(_, __, ref, ___, position) => {
                if (isPreview) return;
                const patch = getResizePatch(ref, position);
                if (onResizeItem) {
                    onResizeItem(item.instanceId, patch);
                } else {
                    onUpdateItem(item.instanceId, patch);
                }
            }}
        >
            {/* WiniBox를 사용하면 내부에 마진이 생겨 Rnd의 크기와 실제 아이템의 크기가 달라지는 문제 발생, div로 대체 */}
            <div
                className={`w-full h-full box-border flex flex-col ${
                    shouldHideContainerVisual
                        ? 'bg-transparent border-0 rounded-none overflow-visible'
                        : 'bg-white rounded-lg overflow-hidden'
                } ${isSelectedItem && !isPreview ? 'ring-2 ring-[#2563eb]' : ''}`}
            >
                <div className="relative w-full h-full flex flex-col">
                    <div className="absolute inset-0 p-1.5 flex flex-col justify-start [&_*]:!mt-0 [&>*]:h-full [&>*]:min-h-0 pointer-events-none">
                        <ItemPreview
                            item={item}
                            hideLayoutContainers={hideLayoutContainers}
                            onUpdateItem={onUpdateItem}
                        />
                    </div>
                    {childrenNodes.length > 0 && (
                        <div
                            className="absolute z-10"
                            style={{
                                top: `${childLayerTopOffset + childLayerInset}px`,
                                left: `${childLayerInset}px`,
                                right: `${childLayerInset}px`,
                                bottom: `${childLayerInset}px`,
                            }}
                        >
                            {childrenNodes}
                        </div>
                    )}
                </div>
            </div>
        </Rnd>
    );
};