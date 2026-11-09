import { useCallback, useRef, useState } from 'react';

const DEFAULT_WIDTH = 320;
const MIN_WIDTH = 240;
const MAX_WIDTH = 480;
const COLLAPSED_WIDTH = 48;
const KEYBOARD_RESIZE_STEP = 16;

const clampWidth = (width) => Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, width));

export const usePalettePanel = () => {
  const [expandedWidth, setExpandedWidth] = useState(DEFAULT_WIDTH);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartRef = useRef(null);

  const startResize = useCallback(
    (clientX) => {
      resizeStartRef.current = {
        clientX,
        width: expandedWidth,
      };
      setIsResizing(true);
    },
    [expandedWidth],
  );

  const resize = useCallback((clientX) => {
    const resizeStart = resizeStartRef.current;
    if (!resizeStart) return;

    setExpandedWidth(
      clampWidth(resizeStart.width + clientX - resizeStart.clientX),
    );
  }, []);

  const finishResize = useCallback(() => {
    resizeStartRef.current = null;
    setIsResizing(false);
  }, []);

  const resizeBy = useCallback((delta) => {
    setExpandedWidth((currentWidth) => clampWidth(currentWidth + delta));
  }, []);

  const toggleCollapsed = useCallback(() => {
    finishResize();
    setIsCollapsed((currentValue) => !currentValue);
  }, [finishResize]);

  return {
    panelWidth: isCollapsed ? COLLAPSED_WIDTH : expandedWidth,
    expandedWidth,
    isCollapsed,
    isResizing,
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    keyboardResizeStep: KEYBOARD_RESIZE_STEP,
    startResize,
    resize,
    finishResize,
    resizeBy,
    toggleCollapsed,
  };
};
