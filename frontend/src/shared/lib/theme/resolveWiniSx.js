import { getThemeValue } from "./getThemeValue";

const isPath = (v) => typeof v === "string" && v.includes(".");

const toPath = (group, v) =>
  isPath(v) ? v : `colors.${group}.${v}`;

export function resolveWiniSx(theme, wini) {
  if (!wini) return undefined;

  const sx = {};

  if (wini.bg) {
    sx.backgroundColor = getThemeValue(
      theme,
      toPath("background", wini.bg)
    );
  }

  if (wini.color) {
    sx.color = getThemeValue(
      theme,
      toPath("text", wini.color)
    );
  }

  if (wini.border) {
    sx.borderColor = getThemeValue(
      theme,
      toPath("border", wini.border)
    );
  }

  return sx;
}
