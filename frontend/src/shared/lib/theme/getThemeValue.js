export function getThemeValue(theme, path) {
  const keys = path.split(".");
  let cur = theme.customTheme;

  for (const k of keys) {
    if (cur == null) return undefined;
    cur = cur[k];
  }
  return cur;
}
