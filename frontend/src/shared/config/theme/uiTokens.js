const UI_TOKEN_SPLIT_REGEX = /[\s,]+/;
const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const mergeSxObject = (baseValue, nextValue) => {
  if (!isPlainObject(baseValue) || !isPlainObject(nextValue)) {
    return nextValue;
  }

  const merged = { ...baseValue };
  Object.keys(nextValue).forEach((key) => {
    merged[key] = mergeSxObject(baseValue[key], nextValue[key]);
  });
  return merged;
};

const toTokenArray = (value) => {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(toTokenArray);
  }

  if (typeof value !== 'string') {
    return [];
  }

  return value
    .split(UI_TOKEN_SPLIT_REGEX)
    .map((token) => token.trim())
    .filter(Boolean);
};

export const getUiTokens = (ui, fallback) => {
  const source = ui ?? fallback;
  if (source === undefined || source === null) {
    return [];
  }
  return Array.from(new Set(toTokenArray(source)));
};

export const hasUiToken = (uiTokens, token) =>
  Array.isArray(uiTokens) && uiTokens.includes(token);

export const getLastUiToken = (uiTokens, candidates) => {
  if (!Array.isArray(uiTokens) || uiTokens.length === 0) {
    return undefined;
  }

  const candidateSet = new Set(
    Array.isArray(candidates) ? candidates : [candidates],
  );
  for (let i = uiTokens.length - 1; i >= 0; i -= 1) {
    const token = uiTokens[i];
    if (candidateSet.has(token)) {
      return token;
    }
  }
  return undefined;
};

export const getLastUiTokenValue = (uiTokens, prefixes) => {
  if (!Array.isArray(uiTokens) || uiTokens.length === 0) {
    return undefined;
  }

  const prefixList = Array.isArray(prefixes) ? prefixes : [prefixes];
  for (let i = uiTokens.length - 1; i >= 0; i -= 1) {
    const token = uiTokens[i];
    const matchedPrefix = prefixList.find((prefix) => token.startsWith(prefix));
    if (!matchedPrefix) {
      continue;
    }
    const rawValue = token.slice(matchedPrefix.length).trim();
    return rawValue || undefined;
  }

  return undefined;
};

export const mergeUiSxByTokens = (uiTokens, uiSxMap) =>
  (Array.isArray(uiTokens) ? uiTokens : []).reduce((acc, token) => {
    const tokenSx = uiSxMap?.[token];
    if (!tokenSx) {
      return acc;
    }
    return mergeSxObject(acc ?? {}, tokenSx);
  }, undefined);

export const mergeUiSlotSxByTokens = (uiTokens, uiSxMap, slotKey = 'root') =>
  (Array.isArray(uiTokens) ? uiTokens : []).reduce((acc, token) => {
    const tokenSx = uiSxMap?.[token]?.[slotKey];
    if (!tokenSx) {
      return acc;
    }
    return mergeSxObject(acc ?? {}, tokenSx);
  }, undefined);
