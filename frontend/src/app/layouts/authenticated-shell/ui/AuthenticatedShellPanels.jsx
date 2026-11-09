import {
  WiniBox,
  WiniFormContextProvider,
  WiniTypography,
} from '@/shared/ui';
import {
  useMainPageContext,
  useMainPageParams,
} from '@/features/navigation/authenticated-layout';
import { DynamicRouteContent } from '@/features/route';
import { NotFoundPage } from '@/pages/not-found';
import { MainPage } from '@/pages/main';
import { isNoMenuPermission } from '../model/useAuthenticatedShellModel';

export function EmptyMenuShell() {
  return (
    <WiniBox className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-2">
      <WiniTypography variant="h5">
        접근 가능한 메뉴가 없습니다.
      </WiniTypography>
      <WiniTypography className="text-gray-600">
        권한을 다시 확인해주세요.
      </WiniTypography>
    </WiniBox>
  );
}

export function PersistentMenuTabPanel({
  tab,
  isActive,
  isMenuLoaded,
  menulist,
  reloadMenu,
  navigateToProgram,
  errorFallbackComponent,
  getLazyFallback,
}) {
  const { contextValueState } = useMainPageContext(
    tab.menuId,
    tab.menuAuthInfo,
  );
  const { parentParams, handleParams } = useMainPageParams(
    tab.programMapping,
    tab.menuId,
    menulist,
    reloadMenu,
  );

  return (
    <div className="h-full" hidden={!isActive}>
      <WiniFormContextProvider value={contextValueState}>
        {isNoMenuPermission(tab.menuAuthInfo) ? (
          <NotFoundPage mode="menu" />
        ) : (
          <DynamicRouteContent
            menuUrl={tab.programMapping}
            selectedMenu={tab.menuId}
            isMenuLoaded={isMenuLoaded}
            menuAuthInfo={tab.menuAuthInfo}
            navigateToProgram={navigateToProgram}
            parentParams={parentParams}
            handleParams={handleParams}
            errorFallbackComponent={errorFallbackComponent}
            getLazyFallback={getLazyFallback}
          />
        )}
      </WiniFormContextProvider>
    </div>
  );
}

export function CurrentMenuPanel({
  menuId,
  menuUrl,
  menuAuthInfo,
  isMenuLoaded,
  menulist,
  reloadMenu,
  navigateToProgram,
  shouldShowEmptyShell,
  errorFallbackComponent,
  getLazyFallback,
}) {
  const { contextValueState } = useMainPageContext(menuId, menuAuthInfo);
  const { parentParams, handleParams } = useMainPageParams(
    menuUrl,
    menuId,
    menulist,
    reloadMenu,
  );

  return (
    <WiniFormContextProvider value={contextValueState}>
      {isNoMenuPermission(menuAuthInfo) ? (
        <NotFoundPage mode="menu" />
      ) : shouldShowEmptyShell ? (
        <EmptyMenuShell />
      ) : (
        <DynamicRouteContent
          menuUrl={menuUrl}
          selectedMenu={menuId}
          isMenuLoaded={isMenuLoaded}
          menuAuthInfo={menuAuthInfo}
          navigateToProgram={navigateToProgram}
          parentParams={parentParams}
          handleParams={handleParams}
          errorFallbackComponent={errorFallbackComponent}
          getLazyFallback={getLazyFallback}
        />
      )}
    </WiniFormContextProvider>
  );
}

export function MainPagePanel({ isActive = true }) {
  const { contextValueState } = useMainPageContext('Main');

  return (
    <div className="h-full" hidden={!isActive}>
      <WiniFormContextProvider value={contextValueState}>
        <MainPage />
      </WiniFormContextProvider>
    </div>
  );
}
