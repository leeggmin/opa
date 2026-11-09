import React, { useState } from 'react';
import {
  WiniBox,
  WiniButton,
  WiniCollapse,
  WiniIcon,
  WiniIconButton,
  WiniList,
  WiniListItem,
  WiniListItemText,
  WiniTypography,
} from '@/shared/ui/wini';
import { CATEGORY_ORDER, GROUPED_COMPONENTS } from '../model/paletteData';
import { usePalettePanel } from '../model/usePalettePanel';

export const Palette = ({ onSelectTemplate }) => {
  const {
    panelWidth,
    expandedWidth,
    isCollapsed,
    isResizing,
    minWidth,
    maxWidth,
    keyboardResizeStep,
    startResize,
    resize,
    finishResize,
    resizeBy,
    toggleCollapsed,
  } = usePalettePanel();
  const [openSections, setOpenSections] = useState({
    layout: true,
    form: true,
    action: true,
    etc: true,
  });

  const handleResizePointerDown = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    startResize(event.clientX);
  };

  const handleResizePointerMove = (event) => {
    resize(event.clientX);
  };

  const handleResizePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    finishResize();
  };

  const handleResizeKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      resizeBy(-keyboardResizeStep);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      resizeBy(keyboardResizeStep);
    }
  };

  const renderPaletteItem = (item) => (
    <WiniBox key={item.templateId} className="mb-0.5">
      <WiniButton
        onClick={() => onSelectTemplate(item)}
        ui="white"
        className="w-full justify-start text-left min-h-0 cursor-pointer p-2"
      >
        <WiniBox className="w-full">
          <WiniTypography variant="span" className="font-semibold block">
            {item.label}
          </WiniTypography>
        </WiniBox>
      </WiniButton>
    </WiniBox>
  );

  const renderPaletteSection = (categoryKey) => {
    const group = GROUPED_COMPONENTS.find((item) => item.id === categoryKey);
    if (!group) return null;

    const items = group.items || [];
    const isOpen = openSections[categoryKey];

    return (
      <WiniListItem key={categoryKey}>
        <WiniListItemText>
          <WiniButton
            className="depth1"
            aria-expanded={isOpen}
            aria-controls={`palette-${categoryKey}`}
            onClick={() =>
              setOpenSections((prev) => ({
                ...prev,
                [categoryKey]: !prev[categoryKey],
              }))
            }
          >
            {group.title} ({items.length})
            <WiniIcon icon={isOpen ? 'up' : 'down'} />
          </WiniButton>

          <WiniCollapse in={isOpen} mountOnEnter unmountOnExit>
            <WiniList
              id={`palette-${categoryKey}`}
              ui="dep_02"
              className="mt-1"
            >
              {items.map((item) => renderPaletteItem(item))}
            </WiniList>
          </WiniCollapse>
        </WiniListItemText>
      </WiniListItem>
    );
  };

  return (
    <WiniBox
      className={`relative box-border flex h-full min-h-0 shrink-0 flex-col border border-[#e4e4e4] bg-[#fafafa] ${
        isResizing ? 'transition-none' : 'transition-[width] duration-150'
      } ${isCollapsed ? 'px-1 py-[14px]' : 'p-[14px]'}`}
      style={{ width: `${panelWidth}px` }}
    >
      <WiniBox
        ui="noAutoGap"
        className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}
      >
        {!isCollapsed && (
          <WiniTypography variant="h5" className="my-2 truncate">
            컴포넌트
          </WiniTypography>
        )}
        <WiniIconButton
          icon={isCollapsed ? 'right' : 'left'}
          iconOnly
          ui="white"
          className="h-8 w-8 shrink-0 p-1"
          aria-label={
            isCollapsed ? '컴포넌트 목록 펼치기' : '컴포넌트 목록 접기'
          }
          aria-expanded={!isCollapsed}
          onClick={toggleCollapsed}
        >
          {isCollapsed ? '펼치기' : '접기'}
        </WiniIconButton>
      </WiniBox>

      {!isCollapsed && (
        <WiniBox ui="noAutoGap" className="min-h-0 flex-1 overflow-y-auto pr-1">
          {CATEGORY_ORDER.map((categoryKey) =>
            renderPaletteSection(categoryKey),
          )}
        </WiniBox>
      )}

      {!isCollapsed && (
        <WiniBox
          ui="noAutoGap"
          role="separator"
          tabIndex={0}
          aria-label="컴포넌트 목록 너비 조절"
          aria-orientation="vertical"
          aria-valuemin={minWidth}
          aria-valuemax={maxWidth}
          aria-valuenow={expandedWidth}
          className="absolute -right-1 top-0 z-10 h-full w-2 touch-none cursor-col-resize bg-transparent outline-none"
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          onPointerCancel={finishResize}
          onLostPointerCapture={finishResize}
          onKeyDown={handleResizeKeyDown}
        />
      )}
    </WiniBox>
  );
};
