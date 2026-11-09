export function getTenantUrl() {
  let url = import.meta.env.VITE_INTERNAL_URL;

  const orgId = localStorage.getItem('OrgId');
  const orgCode = localStorage.getItem('OrgCode');

  if (!orgId || !orgCode || orgCode === 'default' || orgCode === 'DEFAULT') {
    return url;
  }

  if (!url.endsWith('/')) {
    url += '/';
  }

  url += orgCode;

  return url;
}
