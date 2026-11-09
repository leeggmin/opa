/**
 * menuUrl → 페이지 컴포넌트 lazy 로드.
 * React.lazy(() => getLazyPageComponent(menuUrl)) 형태로 사용.
 */

const pageModules = import.meta.glob(
  '/src/pages/**/*.jsx',
  { eager: false }
);

const moduleKeys = Object.keys(pageModules);

function resolveModulePath(menuUrl) {
  if (!menuUrl || typeof menuUrl !== 'string') return null;
  const uriString = menuUrl.trim().replace(/\\/g, '/');
  const normalizedUri = uriString.replace(/^\.\.\/pages\//, '');

  const pagesAbsolutePath = `/src/pages/${normalizedUri}.jsx`;
  if (pageModules[pagesAbsolutePath]) return pagesAbsolutePath;

  const searchPath = `pages/${normalizedUri}.jsx`;
  for (const key of moduleKeys) {
    if (
      key.includes(searchPath) &&
      !key.includes('/ui/') &&
      !key.includes('/model/') &&
      !key.includes('/api/')
    ) {
      return key;
    }
  }
  return null;
}

function normalizePageExport(mod, modulePath) {
  if (mod?.default) return { default: mod.default };
  const basename = modulePath.split('/').pop()?.replace(/\.jsx$/, '') ?? '';
  if (basename && mod?.[basename]) return { default: mod[basename] };
  return null;
}

/**
 * @param {string} menuUrl - 메뉴 URL (예: 'user-management')
 * @returns {Promise<{ default: React.ComponentType }>}
 */
export function getLazyPageComponent(menuUrl) {
  const modulePath = resolveModulePath(menuUrl);
  if (!modulePath || !pageModules[modulePath]) {
    return Promise.reject(new Error(`No module path found for: ${menuUrl}`));
  }
  return pageModules[modulePath]().then((mod) => {
    const normalized = normalizePageExport(mod, modulePath);
    if (normalized) return normalized;
    return Promise.reject(new Error(`Invalid export in: ${modulePath}`));
  });
}
