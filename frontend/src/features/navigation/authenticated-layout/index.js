/**
 * features/navigation/authenticated-layout Public API
 * domain: navigation, usecase: authenticated-layout
 */

// API
export { fetchMenuTree, fetchMenuPermission } from './api/api';

// Model
export { useMenuTree } from './model/useMenuTree';
export { useAuthenticatedLayout } from './model/useAuthenticatedLayout';
export { usePageTabs } from './model/usePageTabs';
export { useMainPageContext } from './model/useMainPageContext';
export { useMainPageParams } from './model/useMainPageParams';

// UI
export { NavigationDrawer } from './ui/NavigationDrawer';
export { PageHeader } from './ui/PageHeader';
export { PageTabs } from './ui/PageTabs';
