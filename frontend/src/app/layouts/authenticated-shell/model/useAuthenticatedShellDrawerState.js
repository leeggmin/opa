import { useCallback, useState } from 'react';

/**
 * - AuthenticatedShell 전용 UI 상태(Drawer open/close)와 핸들러
 */
export function useAuthenticatedShellDrawerState({
  openMenu,
  closeAllMenu,
  handleMenuClick,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => {
      const next = !prev;

      if (next) openMenu();
      else closeAllMenu();

      return next;
    });
  }, [openMenu, closeAllMenu]);

  const handleMenuClickWithDrawer = useCallback(
    (item) => {
      handleMenuClick(item, isDrawerOpen);
      if (!isDrawerOpen) setIsDrawerOpen(true);
    },
    [handleMenuClick, isDrawerOpen],
  );

  return { isDrawerOpen, handleToggleDrawer, handleMenuClickWithDrawer };
}
