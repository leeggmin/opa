import { Fragment } from 'react';
import { NotFoundPage } from '@/pages/not-found';
import { WiniBox, Main } from '@/shared/ui';
import {
  NavigationDrawer,
  PageHeader,
  PageTabs,
} from '@/features/navigation/authenticated-layout';
import {
  CurrentMenuPanel,
  EmptyMenuShell,
  MainPagePanel,
  PersistentMenuTabPanel,
  useAuthenticatedShellModel,
} from './authenticated-shell';

const MAIN_PROGRAM_MAPPING = 'main/ui/MainPage';

/**
 * AuthenticatedLayout
 * - Drawer + Header + Main 영역. 동적 라우트 콘텐츠 렌더링
 * - errorFallbackComponent, getLazyFallback는 app에서 주입
 */
export function AuthenticatedLayout({
  errorFallbackComponent,
  getLazyFallback,
}) {
  const {
    tabModeEnabled,
    headerEnabled,
    mainTabEnabled,
    menulist,
    selectedMenu,
    menuUrl,
    breadcrumb,
    title,
    isMenuLoaded,
    handleMenuSelect,
    navigateToProgram,
    logout,
    reloadMenu,
    menuAuthInfo,
    tabs,
    activeMenuId,
    activeTab,
    canCloseAll,
    canCloseOthers,
    canMovePrevious,
    canMoveNext,
    handleSelectTab,
    handleSelectMainTab,
    handleCloseTab,
    handleCloseAllTabs,
    handleCloseOtherTabs,
    handleMovePrevious,
    handleMoveNext,
    isDrawerOpen,
    handleToggleDrawer,
    handleMenuClickWithDrawer,
    deniedMenuIds,
    isStandaloneMain,
    shouldShowEmptyShell,
    shouldShowNotFound,
  } = useAuthenticatedShellModel();

  const isMainProgramSelected =
    menuUrl?.toLowerCase() === MAIN_PROGRAM_MAPPING.toLowerCase();

  if (shouldShowNotFound) {
    return <NotFoundPage mode="404" />;
  }

  return (
    <Fragment>
      <NavigationDrawer
        menulist={menulist}
        selectedMenu={
          isStandaloneMain && !isMainProgramSelected
            ? ''
            : selectedMenu
        }
        hiddenMenuIds={deniedMenuIds}
        onMenuClick={handleMenuClickWithDrawer}
        onMenuSelect={handleMenuSelect}
        onLogout={logout}
        onMainClick={mainTabEnabled ? handleSelectMainTab : undefined}
        onToggleDrawer={handleToggleDrawer}
        isOpen={isDrawerOpen}
      />

      <WiniBox ui="noAutoGap" className="flex h-dvh min-h-0 w-full flex-col overflow-hidden">
        {headerEnabled && (
          <PageHeader
            title={tabModeEnabled ? activeTab?.title ?? '' : title}
            isDrawerOpen={isDrawerOpen}
          />
        )}
        {tabModeEnabled && (
          <PageTabs
            tabs={tabs}
            activeMenuId={activeMenuId}
            isDrawerOpen={isDrawerOpen}
            canMovePrevious={canMovePrevious}
            canMoveNext={canMoveNext}
            canCloseAll={canCloseAll}
            canCloseOthers={canCloseOthers}
            onSelect={handleSelectTab}
            onClose={handleCloseTab}
            onCloseAll={handleCloseAllTabs}
            onCloseOthers={handleCloseOtherTabs}
            onMovePrevious={handleMovePrevious}
            onMoveNext={handleMoveNext}
          />
        )}
        <Main open={isDrawerOpen} className="min-h-0 flex-1 overflow-auto">
          {tabModeEnabled ? (
            shouldShowEmptyShell ? (
              <EmptyMenuShell />
            ) : (
              tabs.map((tab) =>
                tab.isMain ? (
                  <MainPagePanel
                    key={tab.menuId}
                    isActive={tab.menuId === activeMenuId}
                  />
                ) : (
                  <PersistentMenuTabPanel
                    key={tab.menuId}
                    tab={tab}
                    isActive={tab.menuId === activeMenuId}
                    isMenuLoaded={isMenuLoaded}
                    menulist={menulist}
                    reloadMenu={reloadMenu}
                    navigateToProgram={navigateToProgram}
                    errorFallbackComponent={errorFallbackComponent}
                    getLazyFallback={getLazyFallback}
                  />
                ),
              )
            )
          ) : isStandaloneMain ? (
            <MainPagePanel />
          ) : (
            <CurrentMenuPanel
              key={selectedMenu || menuUrl || 'empty-menu'}
              menuId={selectedMenu}
              menuUrl={menuUrl}
              menuAuthInfo={menuAuthInfo}
              isMenuLoaded={isMenuLoaded}
              menulist={menulist}
              reloadMenu={reloadMenu}
              navigateToProgram={navigateToProgram}
              shouldShowEmptyShell={shouldShowEmptyShell}
              errorFallbackComponent={errorFallbackComponent}
              getLazyFallback={getLazyFallback}
            />
          )}
        </Main>
      </WiniBox>
    </Fragment>
  );
}
