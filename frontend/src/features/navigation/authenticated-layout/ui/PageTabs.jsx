import { useEffect, useRef, useState } from 'react';
import {
  WiniBox,
  WiniIconButton,
  WiniMenuItem,
  WiniPopover,
} from '@/shared/ui/wini';

export function PageTabs({
  tabs,
  activeMenuId,
  isDrawerOpen,
  canMovePrevious,
  canMoveNext,
  canCloseAll,
  canCloseOthers,
  onSelect,
  onClose,
  onCloseAll,
  onCloseOthers,
  onMovePrevious,
  onMoveNext,
}) {
  const activeTabRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuAction = (action) => {
    setMenuAnchor(null);
    action();
  };

  useEffect(() => {
    activeTabRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  }, [activeMenuId]);

  if (tabs.length === 0) {
    return null;
  }

  return (
    <WiniBox
      ui="noAutoGap"
      className={`${isDrawerOpen ? 'ml-[280px] w-[calc(100%-280px)]' : 'ml-0 w-full sm:ml-[56px] sm:w-[calc(100%-56px)]'} sticky top-0 z-[1100] flex h-14 border-y border-[#d8dee9] bg-[#f3f5f8] box-border`}
    >
      <WiniBox className="flex min-w-0 flex-1 overflow-hidden">
        {tabs.map((tab) => {
          const isActive = tab.menuId === activeMenuId;

          return (
            <WiniBox
              ui='noAutoGap'
              key={tab.menuId}
              ref={isActive ? activeTabRef : null}
              className={`group flex h-full min-w-[140px] max-w-[220px] items-center border-r border-[#d8dee9] ${isActive ? 'border-t-2 border-t-[#00407F] bg-white text-[#1f2937]' : 'border-t-2 border-t-transparent bg-[#eef1f5] text-[#596273]'}`}
            >
              <button
                type="button"
                title={tab.title}
                className="h-full min-w-0 flex-1 truncate px-3 text-left text-[13px]"
                onClick={() => onSelect(tab)}
              >
                {tab.title}
              </button>
              {!tab.isPinned && (
                <WiniIconButton
                  icon="close"
                  iconOnly
                  aria-label={`${tab.title} 탭 닫기`}
                  className={`${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'} !mr-1 !p-1`}
                  iconSx={{ width: 15, height: 15 }}
                  onClick={() => onClose(tab.menuId)}
                >
                  탭 닫기
                </WiniIconButton>
              )}
            </WiniBox>
          );
        })}
      </WiniBox>

      <WiniBox className="ml-auto flex h-full shrink-0 items-center border-l border-[#d8dee9] bg-white pl-1" ui='noAutoGap'>
        <WiniIconButton
          icon="left"
          iconOnly
          aria-label="이전 탭"
          disabled={!canMovePrevious}
          className="!p-1.5"
          iconSx={{ width: 18, height: 18 }}
          onClick={onMovePrevious}
        >
          이전 탭
        </WiniIconButton>
        <WiniIconButton
          icon="right"
          iconOnly
          aria-label="다음 탭"
          disabled={!canMoveNext}
          className="!p-1.5"
          iconSx={{ width: 18, height: 18 }}
          onClick={onMoveNext}
        >
          다음 탭
        </WiniIconButton>
        <WiniIconButton
          icon="menu"
          iconOnly
          aria-label="탭 닫기 메뉴"
          className="!p-1.5 !text-[20px] !leading-none"
          onClick={(event) => setMenuAnchor(event.currentTarget)}
        />
        <WiniPopover
          open={Boolean(menuAnchor)}
          anchorEl={menuAnchor}
          onClose={() => setMenuAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <WiniMenuItem
            disabled={!canCloseOthers}
            onClick={() => handleMenuAction(onCloseOthers)}
          >
            현재 선택된 탭 제외 전체 닫기
          </WiniMenuItem>
          <WiniMenuItem
            disabled={!canCloseAll}
            onClick={() => handleMenuAction(onCloseAll)}
          >
            전체 닫기
          </WiniMenuItem>
        </WiniPopover>
      </WiniBox>
    </WiniBox>
  );
}