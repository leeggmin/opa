import { forwardRef } from 'react';
import Grid from '@mui/material/Grid2';
import { cn } from '@/shared/lib/cn';
import {
  getLastUiTokenValue,
  getUiTokens,
  mergeUiSxByTokens,
} from '@/shared/config/theme/uiTokens';

const UI_SX = {};
const RATIO_PREFIX = 'ratio_';

const buildSizeProps = (size, xs, sm, md, lg, xl) => {
  // 반응형 사이즈 설정
  const breakpointSize = {};
  if (xs !== undefined && xs !== null) {
    breakpointSize.xs = xs;
  }
  if (sm !== undefined && sm !== null) {
    breakpointSize.sm = sm;
  }
  if (md !== undefined && md !== null) {
    breakpointSize.md = md;
  }
  if (lg !== undefined && lg !== null) {
    breakpointSize.lg = lg;
  }
  if (xl !== undefined && xl !== null) {
    breakpointSize.xl = xl;
  }

  const hasBreakpointSize = Object.keys(breakpointSize).length > 0;
  if (!hasBreakpointSize) {
    return size;
  }

  if (size === undefined || size === null) {
    return breakpointSize;
  }

  if (typeof size === 'object' && !Array.isArray(size)) {
    return { ...breakpointSize, ...size };
  }

  return size;
};

const parseRatio = (ratio) => {
  if (ratio === undefined || ratio === null) {
    return undefined;
  }
  if (typeof ratio === 'string') {
    const trimmedRatio = ratio.trim();
    if (!trimmedRatio) {
      return undefined;
    }
    if (trimmedRatio.toLowerCase() === 'none') {
      return 'none';
    }
    const numericRatio = Number(trimmedRatio);
    if (Number.isFinite(numericRatio)) {
      return numericRatio;
    }
    if (trimmedRatio.includes(' ')) {
      return trimmedRatio;
    }
    return `0 0 ${trimmedRatio}`;
  }
  return Number.isFinite(ratio) ? ratio : undefined;
};

const WiniGridItem = forwardRef(
  (
    {
      children,
      type,
      ui,
      ratio,
      className,
      scrollHidden,
      sx: sxProp = {},
      size,
      xs,
      sm,
      md,
      lg,
      xl,
      item,
      isItem,
      ...props
    },
    ref,
  ) => {
    const uiTokens = getUiTokens(ui, type);
    const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
    const uiRatio = parseRatio(getLastUiTokenValue(uiTokens, RATIO_PREFIX));
    const mergedClassName = cn(
      'winicomponent winigriditem',
      uiTokens.map((variant) => `winigriditem--${variant}`),
      scrollHidden && 'flex flex-col overflow-hidden min-h-0',
      className,
    );
    const resolvedSize = buildSizeProps(size, xs, sm, md, lg, xl);
    const resolvedRatio =
      ratio === undefined || ratio === null ? uiRatio : parseRatio(ratio);
    const baseSx = {
      ...(uiSx ?? {}),
      ...(scrollHidden
        ? {
            '& .scrollArea': {
              overflowY: 'auto',
              minHeight: 0,
            },
          }
        : {}),
      ...(resolvedSize === undefined
        ? {
            flex: resolvedRatio ?? 1,
          }
        : {}),
    };

    return (
      <Grid
        {...props}
        ref={ref}
        className={mergedClassName}
        size={resolvedSize}
        sx={(theme) => ({
          ...baseSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </Grid>
    );
  },
);

WiniGridItem.displayName = 'WiniGridItem';

export default WiniGridItem;
