import { useMemo } from 'react';
import { WiniList } from '@/shared/ui/wini';
import { Drawer } from '@/shared/ui';
import { UserInfoSection } from './UserInfoSection';
import { NavigationMenuItem } from './NavigationMenuItem';

const filterVisibleMenus = (menus, hiddenMenuIdSet) => {
  if (!menus?.length) {
    return [];
  }

  return menus.reduce((result, item) => {
    if (item.menuType === 'PROGRAM' && hiddenMenuIdSet.has(item.id)) {
      return result;
    }

    const nextItem = item.children?.length > 0
      ? { ...item, children: filterVisibleMenus(item.children, hiddenMenuIdSet) }
      : item;

    result.push(nextItem);
    return result;
  }, []);
};

/**
 * NavigationDrawer - 인증 레이아웃용 사이드 네비게이션
 */
export function NavigationDrawer({
  menulist,
  selectedMenu,
  hiddenMenuIds = [],
  onMenuClick,
  onMenuSelect,
  onLogout,
  onMainClick,
  onToggleDrawer,
  isOpen,
}) {
  const visibleMenus = useMemo(() => {
    const hiddenMenuIdSet = new Set(hiddenMenuIds);
    return filterVisibleMenus(menulist.origin, hiddenMenuIdSet);
  }, [hiddenMenuIds, menulist.origin]);

  return (
    <Drawer variant="permanent" open={isOpen} className="nav-wrapper">
      <UserInfoSection
        isOpen={isOpen}
        onLogout={onLogout}
        onMainClick={onMainClick}
        onToggleDrawer={onToggleDrawer}
      />

      <WiniList className="relative z-0 min-h-0 flex-1 overflow-y-auto overflow-x-hidden mt-[5px]">
        {visibleMenus.map((listItem, idx) => (
          <NavigationMenuItem
            key={listItem.id + '_' + idx}
            item={listItem}
            idx={idx}
            selectedMenu={selectedMenu}
            menulist={menulist}
            onMenuClick={onMenuClick}
            onMenuSelect={onMenuSelect}
            isDrawerOpen={isOpen}
          />
        ))}
      </WiniList>
    </Drawer>
  );
}
