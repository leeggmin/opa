import { useId } from 'react';
import { cn, ExpandLess, ExpandMore } from '@/shared/lib';
import {
  WiniBox,
  WiniButton,
  WiniIcon,
  WiniList,
  WiniListItem,
  WiniListItemText,
  WiniTypography,
} from '@/shared/ui/wini';

/**
 * 재귀 메뉴 아이템
 */
export function NavigationMenuItem({
  item,
  selectedMenu,
  menulist,
  onMenuClick,
  onMenuSelect,
  isDrawerOpen,
}) {
  const generatedId = useId().replace(/:/g, '');
  const buttonId = `navigation-menu-button-${generatedId}`;
  const submenuId = `navigation-submenu-${generatedId}`;

  // depth 계산 로직
  const depth =
    (menulist.info.find((menu) => menu._id === item.id)?.depth ?? 0) + 1;

  // 메뉴 타입 판별 로직
  const isMenu = item.menuType === 'MENU';
  const isProgram = item.menuType === 'PROGRAM';

  // 선택 상태 판별 로직
  const isActive = selectedMenu === item.id;

  const hasChildren = item.children?.length > 0;
  const hasSubmenu = isMenu && hasChildren;

  // 강조 상태 판별 로직: 현재 활성화된 페이지이거나, 메뉴이면서 펼쳐져 있는 경우
  const isHighlighted = isActive || (hasSubmenu && Boolean(item.isOpen));

  const handleClick = () => {
    if (isMenu) {
      // MENU 타입이면, 펼침·닫기 제어
      onMenuClick(item);
    } else if (isProgram) {
      // PROGRAM 타입이면, 즉시 페이지 이동
      onMenuSelect(item.programMapping, item.id);
    }
  };

  return (
    <WiniListItem
      className={`navigation-menu-item depth-${depth} flex w-full flex-col items-stretch p-0 mt-0.5 rounded-none`}
      data-menu-depth={depth}
    >
      <WiniButton
        id={buttonId}
        type="button"
        className={cn(
          'flex w-full cursor-pointer items-center border-0 py-1.25 text-left rounded-none',
          isProgram ,
          isProgram && isActive ? 'bg-[#00407f]' : 'bg-transparent',
          hasSubmenu && 'has-submenu',
          isHighlighted && 'active',
        )}
        style={{ paddingLeft: depth * (isMenu ? 16 : 20) }}
        onClick={handleClick}
        aria-label={isDrawerOpen ? undefined : item.name}
        aria-expanded={hasSubmenu ? Boolean(item.isOpen) : undefined}
        aria-controls={hasSubmenu ? submenuId : undefined}
        aria-current={isActive ? 'page' : undefined}
      >
        {isMenu && (
          <WiniIcon
            icon="util"
            aria-hidden="true"
            className="mr-0.75 h-[24px] w-[24px] shrink-0 fill-[#00407f] text-[#00407f]"
          />
        )}
        <WiniListItemText
          component="span"
          className="min-w-0 flex-1 my-1"
          disableTypography
          primary={
            <WiniTypography
              component="span"
              className={cn(
                'truncate text-[16px]',
                isMenu
                  ? 'font-bold text-[#00407f]'
                  : isActive
                    ? 'text-white'
                    : 'text-[#333]',
                isDrawerOpen ? 'block' : 'hidden',
              )}
            >
              {item.name}
            </WiniTypography>
          }
        />

        {/* 하위 메뉴가 있는 경우에만 확장 아이콘 표시 */}
        {hasSubmenu &&
          (item.isOpen ? (
            <ExpandLess
              aria-hidden="true"
              className={
                isDrawerOpen ? 'visible shrink-0' : 'invisible shrink-0'
              }
            />
          ) : (
            <ExpandMore
              aria-hidden="true"
              className={
                isDrawerOpen ? 'visible shrink-0' : 'invisible shrink-0'
              }
            />
          ))}
      </WiniButton>

      {/* 하위 메뉴가 있는 경우에만 하위 리스트 렌더링 */}
      {hasSubmenu && (
        <WiniBox
          id={submenuId}
          className={`grid w-full transition-[grid-template-rows] duration-400 ease-in-out ${item.isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
          aria-hidden={!item.isOpen}
          inert={item.isOpen ? undefined : ''}
        >
          <WiniBox className="min-h-0 overflow-hidden">
            <WiniList
              disablePadding
              className="w-full list-none p-0"
              aria-labelledby={buttonId}
            >
              {item.children.map((childItem) => (
                <NavigationMenuItem
                  key={childItem._id ?? childItem.id}
                  item={childItem}
                  selectedMenu={selectedMenu}
                  menulist={menulist}
                  onMenuClick={onMenuClick}
                  onMenuSelect={onMenuSelect}
                  isDrawerOpen={isDrawerOpen}
                />
              ))}
            </WiniList>
          </WiniBox>
        </WiniBox>
      )}
    </WiniListItem>
  );
}
