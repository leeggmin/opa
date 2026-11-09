import { useEffect, useMemo, useRef, useState } from 'react';
import { winiMsg } from '@/shared/model';
import {
    buildComponentCodeText,
    buildComponentCodeSections,
    buildExportText,
    buildExportSections,
    canMoveItemByIdToBoundary,
    FEATURE_SECTION_TYPES,
    isFeatureSectionType,
    isInsetContainerType,
    scaleCanvasItems,
    createLayoutItem,
    duplicateItem,
    findItemById,
    findParentById,
    moveItemById,
    removeItemById,
    updateItemById,
} from './canvasUtils';

const NESTABLE_PARENT_TYPES = new Set([
    ...FEATURE_SECTION_TYPES,
    'WiniList',
    'WiniTreeView',
    'WiniAccordion',
    'WiniAgGridReact',
    'WiniValue',
    'WiniIcon',
    'WiniCodeEditor',
]);

const DEFAULT_CANVAS_RESOLUTION = {
    width: 120,
    height: 120,
};

const RESOLUTION_LIMITS = {
    min: 320,
    max: 4096,
};

const AUTO_RESOLUTION_LIMITS = {
    min: 120,
    max: 4096,
};

const NESTED_CONTAINER_SCALE = 0.72;
const DEFAULT_CHILD_LAYER_INSET = 6;
const CONTAINER_CHILD_LAYER_INSET = 10;
const TAB_CHILD_LAYER_TOP_OFFSET = 48;
const DEFAULT_FEATURE_PREFIX = 'feat-';

const normalizeResolutionValue = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(Math.max(parsed, RESOLUTION_LIMITS.min), RESOLUTION_LIMITS.max);
};

const normalizeAutoResolutionValue = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(Math.max(parsed, AUTO_RESOLUTION_LIMITS.min), AUTO_RESOLUTION_LIMITS.max);
};

const getNextRootFeatureName = (canvasItems = []) => {
    const usedIndexes = new Set(
        (canvasItems || [])
            .filter((item) => isFeatureSectionType(item.type))
            .map((item) => (item.features || '').trim())
            .map((featureName) => {
                const match = featureName.match(/^feat-(\d+)$/);
                return match ? Number.parseInt(match[1], 10) : null;
            })
            .filter((index) => Number.isInteger(index) && index > 0),
    );

    let nextIndex = 1;
    while (usedIndexes.has(nextIndex)) {
        nextIndex += 1;
    }

    return `${DEFAULT_FEATURE_PREFIX}${nextIndex}`;
};

export const useCanvasEditor = () => {
    const [canvasItems, setCanvasItems] = useState([]);
    const [selectedRef, setSelectedRef] = useState(null);
    const [canvasResolution, setCanvasResolution] = useState(DEFAULT_CANVAS_RESOLUTION);
    const [measuredCanvasResolution, setMeasuredCanvasResolution] = useState(DEFAULT_CANVAS_RESOLUTION);
    const [isResolutionCustomized, setIsResolutionCustomized] = useState(false);
    const [isFsdMode, setIsFsdMode] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [layoutText, setLayoutText] = useState('');
    const [layoutSections, setLayoutSections] = useState([]);
    const [componentCodeText, setComponentCodeText] = useState('');
    const [componentCodeSections, setComponentCodeSections] = useState([]);
    const [copyFeedback, setCopyFeedback] = useState('');
    const [componentCodeCopyFeedback, setComponentCodeCopyFeedback] = useState('');
    const clipboardRef = useRef({ item: null, parentId: null, pasteCount: 0 });

    const selectedItem = useMemo(() => {
        if (!selectedRef?.itemId) return null;
        return findItemById(canvasItems, selectedRef.itemId);
    }, [canvasItems, selectedRef]);

    const selectedFeatureContainerAncestor = useMemo(() => {
        if (!selectedRef?.itemId) return null;

        let parentItem = findParentById(canvasItems, selectedRef.itemId);

        while (parentItem) {
            if (isFeatureSectionType(parentItem.type)) {
                return parentItem;
            }

            parentItem = findParentById(canvasItems, parentItem.instanceId);
        }

        return null;
    }, [canvasItems, selectedRef]);

    const updateCanvasItem = (itemId, patch) => {
        setCanvasItems((prev) => updateItemById(prev, itemId, (item) => ({ ...item, ...patch })));
    };

    const resizeCanvasItem = (itemId, patch) => {
        setCanvasItems((prev) => {
            const currentItem = findItemById(prev, itemId);
            if (!currentItem || (currentItem.children || []).length === 0) {
                return updateItemById(prev, itemId, (item) => ({ ...item, ...patch }));
            }
            const prevBounds = { width: currentItem.width, height: currentItem.height };
            const nextBounds = { width: patch.width, height: patch.height };
            return updateItemById(prev, itemId, (item) => ({
                ...item,
                ...patch,
                children: scaleCanvasItems(item.children || [], prevBounds, nextBounds, {
                    preserveHeightOnResize: true,
                }),
            }));
        });
    };

    const removeCanvasItem = (itemId) => {
        setCanvasItems((prev) => removeItemById(prev, itemId));
        setSelectedRef((prev) => (prev?.itemId === itemId ? null : prev));
    };

    const removeSelectedItem = () => {
        if (!selectedRef?.itemId) return;
        removeCanvasItem(selectedRef.itemId);
    };

    const clearCanvas = () => {
        setCanvasItems([]);
        setSelectedRef(null);
        setCanvasResolution(measuredCanvasResolution);
        setIsResolutionCustomized(false);
        setIsPreviewOpen(false);
        setLayoutText('');
        setLayoutSections([]);
        setComponentCodeText('');
        setComponentCodeSections([]);
        setCopyFeedback('');
        setComponentCodeCopyFeedback('');
    };

    const openPreview = () => setIsPreviewOpen(true);
    const closePreview = () => setIsPreviewOpen(false);

    const syncCanvasResolutionFromArea = ({ width, height }) => {
        const nextMeasuredResolution = {
            width: normalizeAutoResolutionValue(width, measuredCanvasResolution.width),
            height: normalizeAutoResolutionValue(height, measuredCanvasResolution.height),
        };

        setMeasuredCanvasResolution((prev) => {
            if (prev.width === nextMeasuredResolution.width && prev.height === nextMeasuredResolution.height) {
                return prev;
            }
            return nextMeasuredResolution;
        });

        if (isResolutionCustomized) return;

        setCanvasResolution((prev) => {
            const nextResolution = {
                width: nextMeasuredResolution.width,
                height: nextMeasuredResolution.height,
            };

            if (nextResolution.width === prev.width && nextResolution.height === prev.height) {
                return prev;
            }

            setCanvasItems((prevItems) => scaleCanvasItems(prevItems, prev, nextResolution));
            return nextResolution;
        });
    };

    const updateCanvasResolution = (field, value) => {
        setIsResolutionCustomized(true);
        setCanvasResolution((prev) => {
            const nextResolution = {
                width:
                    field === 'width'
                        ? normalizeResolutionValue(value, prev.width)
                        : prev.width,
                height:
                    field === 'height'
                        ? normalizeResolutionValue(value, prev.height)
                        : prev.height,
            };

            setCanvasItems((prevItems) => scaleCanvasItems(prevItems, prev, nextResolution));

            return nextResolution;
        });
    };

    const addComponentByTemplate = (template) => {
        if (!template) return;

        const isFeatureSectionTemplate = isFeatureSectionType(template.type);
        const canInsertIntoSelectedContainer = Boolean(
            selectedItem && NESTABLE_PARENT_TYPES.has(selectedItem.type),
        );

        if (isFsdMode && !isFeatureSectionTemplate && !canInsertIntoSelectedContainer) {
            winiMsg.showSnackbar('FSD 모드에서는 레이아웃 위에 개별 컴포넌트를 추가해야 합니다.');
            return;
        }

        setCanvasItems((prev) => {
            if (selectedRef?.itemId) {
                const parentItem = findItemById(prev, selectedRef.itemId);

                if (parentItem && NESTABLE_PARENT_TYPES.has(parentItem.type)) {
                    const firstTabValue = (parentItem.tabItems || [])[0]?.value || 'tab-1';
                    const activeTabValue = parentItem.activeTabValue || firstTabValue;
                    const siblings =
                        parentItem.type === 'WiniTab'
                            ? (parentItem.children || []).filter((child) => {
                                const childTabValue = child.tabValue || firstTabValue;
                                return childTabValue === activeTabValue;
                            })
                            : parentItem.children || [];
                    const offset = siblings.length * 18;
                    const needsNestedShrink =
                        isInsetContainerType(parentItem.type) && isInsetContainerType(template.type);
                    const childInset = needsNestedShrink
                        ? CONTAINER_CHILD_LAYER_INSET
                        : DEFAULT_CHILD_LAYER_INSET;
                    const childTopOffset = parentItem.type === 'WiniTab' ? TAB_CHILD_LAYER_TOP_OFFSET : 0;

                    const baseChild = createLayoutItem(template, 0, 0, canvasResolution.width);
                    const newChild = needsNestedShrink
                        ? {
                            ...baseChild,
                            width: Math.min(
                                Math.max(35, parentItem.width - childInset * 2 - 8),
                                Math.max(35, Math.floor(baseChild.width * NESTED_CONTAINER_SCALE)),
                            ),
                            height: Math.min(
                                Math.max(30, parentItem.height - childTopOffset - childInset * 2 - 8),
                                Math.max(30, Math.floor(baseChild.height * NESTED_CONTAINER_SCALE)),
                            ),
                        }
                        : baseChild;

                    const minX = childInset;
                    const minY = childTopOffset + childInset;
                    const maxX = Math.max(minX, parentItem.width - newChild.width - childInset);
                    const maxY = Math.max(minY, parentItem.height - newChild.height - childInset);
                    const x = Math.max(minX, Math.min(16 + offset, maxX));
                    const y = Math.max(minY, Math.min(16 + offset, maxY));
                    const positionedChild = { ...newChild, x, y };
                    const childWithTabValue =
                        parentItem.type === 'WiniTab'
                            ? { ...positionedChild, tabValue: activeTabValue }
                            : positionedChild;

                    return updateItemById(prev, selectedRef.itemId, (item) => ({
                        ...item,
                        children: [...(item.children || []), childWithTabValue],
                    }));
                }
            }

            const offset = prev.length * 24;
            const nextRootItem = createLayoutItem(template, 24 + offset, 24 + offset, canvasResolution.width);

            return [
                ...prev,
                isFeatureSectionTemplate
                    ? { ...nextRootItem, features: getNextRootFeatureName(prev) }
                    : nextRootItem,
            ];
        });
    };

    const duplicateSelectedItem = () => {
        if (!selectedRef?.itemId) return;

        const item = findItemById(canvasItems, selectedRef.itemId);
        if (!item) return;

        const duplicated = duplicateItem(item);
        const parent = findParentById(canvasItems, selectedRef.itemId);

        if (parent === null) {
            setCanvasItems((prev) => [...prev, duplicated]);
        } else if (parent) {
            setCanvasItems((prev) =>
                updateItemById(prev, parent.instanceId, (p) => ({
                    ...p,
                    children: [...(p.children || []), duplicated],
                }))
            );
        }

        setSelectedRef({ itemId: duplicated.instanceId });
    };

    const moveSelectedLayer = (direction) => {
        if (!selectedRef?.itemId) return;
        const delta = direction === 'forward' ? 1 : -1;
        setCanvasItems((prev) => moveItemById(prev, selectedRef.itemId, delta).list);
    };

    const canMoveSelectedForward = useMemo(() => {
        if (!selectedRef?.itemId) return false;
        return canMoveItemByIdToBoundary(canvasItems, selectedRef.itemId, true);
    }, [canvasItems, selectedRef]);

    const canMoveSelectedBackward = useMemo(() => {
        if (!selectedRef?.itemId) return false;
        return canMoveItemByIdToBoundary(canvasItems, selectedRef.itemId, false);
    }, [canvasItems, selectedRef]);

    const generateLayoutText = () => {
        setLayoutSections(buildExportSections(canvasItems));
        setLayoutText(buildExportText(canvasItems));
        setComponentCodeSections(isFsdMode ? buildComponentCodeSections(canvasItems) : []);
        setComponentCodeText(buildComponentCodeText(canvasItems, { splitByFeature: isFsdMode }));
    };

    const copyLayoutText = async () => {
        if (!layoutText) return;

        try {
            await navigator.clipboard.writeText(layoutText);
            setCopyFeedback('복사됨');
        } catch {
            setCopyFeedback('복사 실패');
        }

        setTimeout(() => setCopyFeedback(''), 1200);
    };

    const copyComponentCodeText = async () => {
        if (!componentCodeText) return;

        try {
            await navigator.clipboard.writeText(componentCodeText);
            setComponentCodeCopyFeedback('복사됨');
        } catch {
            setComponentCodeCopyFeedback('복사 실패');
        }

        setTimeout(() => setComponentCodeCopyFeedback(''), 1200);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const target = event.target;
            const tagName = target?.tagName?.toLowerCase?.() || '';
            const isTypingContext =
                tagName === 'input' ||
                tagName === 'textarea' ||
                tagName === 'select' ||
                target?.isContentEditable;

            if (isTypingContext) return;

            const key = event.key?.toLowerCase?.() || '';
            const isCommandKey = event.ctrlKey || event.metaKey;

            if (isCommandKey && key === 'c') {
                if (!selectedRef?.itemId) return;

                const copiedItem = findItemById(canvasItems, selectedRef.itemId);
                if (!copiedItem) return;

                const copiedParent = findParentById(canvasItems, selectedRef.itemId);
                const copiedSnapshot =
                    typeof structuredClone === 'function'
                        ? structuredClone(copiedItem)
                        : JSON.parse(JSON.stringify(copiedItem));

                clipboardRef.current = {
                    item: copiedSnapshot,
                    parentId: copiedParent?.instanceId || null,
                    pasteCount: 0,
                };
                event.preventDefault();
                return;
            }

            if (isCommandKey && key === 'v') {
                const clipboard = clipboardRef.current;
                if (!clipboard.item) return;

                const nextPasteCount = (clipboard.pasteCount || 0) + 1;
                const offset = 24 * nextPasteCount;
                const pastedItem = duplicateItem(clipboard.item, offset, offset);

                if (!clipboard.parentId) {
                    setCanvasItems((prev) => [...prev, pastedItem]);
                } else {
                    const parentItem = findItemById(canvasItems, clipboard.parentId);
                    if (parentItem) {
                        setCanvasItems((prev) =>
                            updateItemById(prev, clipboard.parentId, (p) => ({
                                ...p,
                                children: [...(p.children || []), pastedItem],
                            }))
                        );
                    } else {
                        setCanvasItems((prev) => [...prev, pastedItem]);
                    }
                }

                clipboardRef.current = {
                    ...clipboard,
                    pasteCount: nextPasteCount,
                };

                setSelectedRef({ itemId: pastedItem.instanceId });
                event.preventDefault();
                return;
            }

            if (!selectedRef?.itemId) return;
            if (event.key !== 'Delete' && event.key !== 'Backspace') return;

            event.preventDefault();
            removeCanvasItem(selectedRef.itemId);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canvasItems, selectedRef]);

    return {
        canvasItems,
        canvasResolution,
        isFsdMode,
        isPreviewOpen,
        selectedRef,
        selectedItem,
        selectedFeatureContainerAncestor,
        layoutText,
        layoutSections,
        componentCodeText,
        componentCodeSections,
        copyFeedback,
        componentCodeCopyFeedback,
        canMoveSelectedForward,
        canMoveSelectedBackward,
        setIsFsdMode,
        setSelectedRef,
        openPreview,
        closePreview,
        updateCanvasResolution,
        syncCanvasResolutionFromArea,
        addComponentByTemplate,
        updateCanvasItem,
        resizeCanvasItem,
        removeCanvasItem,
        removeSelectedItem,
        duplicateSelectedItem,
        clearCanvas,
        moveSelectedLayer,
        generateLayoutText,
        copyLayoutText,
        copyComponentCodeText,
    };
};