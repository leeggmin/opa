import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
} from 'react';
import Grid from '@mui/material/Grid2';
import { cn } from '@/shared/lib/cn';
import {
  getLastUiTokenValue,
  getUiTokens,
  mergeUiSxByTokens,
} from '@/shared/config/theme/uiTokens';
import { size } from '@/shared/config/theme';
const UI_SX = {
  form: {
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
};
const COLUMN_SPACING_PREFIX = 'columnSpacing_';
const ROW_SPACING_PREFIX = 'rowSpacing_';
const COLUMN_COUNT_PREFIX = 'col_';
const ROW_COUNT_PREFIX = 'row_';

const normalizePositiveNumber = (value) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return undefined;
  }
  return numericValue;
};

const parseSpacingTokenValue = (uiTokens, prefixes) => {
  const rawValue = getLastUiTokenValue(uiTokens, prefixes);
  if (!rawValue) {
    return undefined;
  }

  const numericValue = Number(rawValue);
  return Number.isFinite(numericValue) ? numericValue : rawValue;
};

const resolveGridSpacingFromUiTokens = (uiTokens) => ({
  columnSpacing: parseSpacingTokenValue(uiTokens, COLUMN_SPACING_PREFIX),
  rowSpacing: parseSpacingTokenValue(uiTokens, ROW_SPACING_PREFIX),
});

const resolveGridCountFromUiTokens = (uiTokens) => ({
  columnCount: normalizePositiveNumber(
    parseSpacingTokenValue(uiTokens, COLUMN_COUNT_PREFIX),
  ),
  rowCount: normalizePositiveNumber(
    parseSpacingTokenValue(uiTokens, ROW_COUNT_PREFIX),
  ),
});

const buildSizeProps = (sizeValue, xs, sm, md, lg, xl) => {
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
    return sizeValue;
  }

  if (sizeValue === undefined || sizeValue === null) {
    return breakpointSize;
  }

  if (typeof sizeValue === 'object' && !Array.isArray(sizeValue)) {
    return { ...breakpointSize, ...sizeValue };
  }

  return sizeValue;
};

const getReactComponentName = (type) => {
  if (!type) {
    return undefined;
  }
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function') {
    return type.displayName || type.name;
  }
  if (typeof type === 'object') {
    return (
      type.displayName ||
      type.render?.displayName ||
      type.render?.name ||
      type.type?.displayName ||
      type.type?.name
    );
  }
  return undefined;
};

const hasExplicitGridSize = (props) =>
  props?.size !== undefined && props?.size !== null;

const hasExplicitBreakpointSize = (props) =>
  props?.xs !== undefined && props?.xs !== null;

const hasAnyExplicitSize = (props) =>
  hasExplicitGridSize(props) ||
  hasExplicitBreakpointSize(props) ||
  (props?.sm !== undefined && props?.sm !== null) ||
  (props?.md !== undefined && props?.md !== null) ||
  (props?.lg !== undefined && props?.lg !== null) ||
  (props?.xl !== undefined && props?.xl !== null);

let scrollFixLockCount = 0;
let prevHtmlOverflow;
let prevBodyOverflow;

const lockDocumentScroll = () => {
  if (typeof document === 'undefined') {
    return;
  }

  if (scrollFixLockCount === 0) {
    prevHtmlOverflow = document.documentElement.style.overflow;
    prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  scrollFixLockCount += 1;
};

const unlockDocumentScroll = () => {
  if (typeof document === 'undefined') {
    return;
  }

  scrollFixLockCount = Math.max(0, scrollFixLockCount - 1);
  if (scrollFixLockCount === 0) {
    document.documentElement.style.overflow = prevHtmlOverflow ?? '';
    document.body.style.overflow = prevBodyOverflow ?? '';
    prevHtmlOverflow = undefined;
    prevBodyOverflow = undefined;
  }
};

const resolveScrollFixOffsetPx = (scrollFix) => {
  if (scrollFix === true) {
    // 기본 헤더 높이(AuthenticatedLayout DrawerHeader 기준)
    return 45;
  }
  const value = Number(scrollFix);
  return Number.isFinite(value) ? value : 0;
};

const buildViewportHeightCss = (offsetPx) =>
  offsetPx > 0 ? `calc(100dvh - 60px - ${offsetPx}px)` : '100dvh';

const applyDefaultFlexToChildren = (children) =>
  Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === Fragment) {
      return (
        <Fragment key={child.key}>
          {applyDefaultFlexToChildren(child.props.children)}
        </Fragment>
      );
    }

    const componentName = getReactComponentName(child.type);
    const isWiniGridItemLike =
      componentName === 'WiniGridItem' || componentName === 'WiniGridLayout';

    if (!isWiniGridItemLike) {
      return child;
    }

    if (hasAnyExplicitSize(child.props)) {
      return child;
    }

    const existingSx = child.props?.sx;

    if (existingSx === undefined || existingSx === null) {
      // return cloneElement(child, { sx: { flex: 1 } });
    }

    if (typeof existingSx === 'function') {
      return cloneElement(child, {
        sx: (theme) => {
          const evaluated = existingSx(theme);
          if (evaluated && typeof evaluated === 'object' && evaluated.flex != null) {
            return evaluated;
          }
          return { ...(evaluated ?? {}), flex: 1 };
        },
      });
    }

    if (typeof existingSx === 'object' && !Array.isArray(existingSx)) {
      if (existingSx.flex != null) {
        return child;
      }
      return cloneElement(child, { sx: { ...existingSx, flex: 1 } });
    }

    return child;
  });

const applyScrollFixToChildren = (children, maxHeightCss) =>
  Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === Fragment) {
      return (
        <Fragment key={child.key}>
          {applyScrollFixToChildren(child.props.children, maxHeightCss)}
        </Fragment>
      );
    }

    const componentName = getReactComponentName(child.type);
    const isWiniGridItemLike =
      componentName === 'WiniGridItem' || componentName === 'WiniGridLayout';

    if (!isWiniGridItemLike) {
      return child;
    }

    const existingSx = child.props?.sx;
    const scrollFixSx = {
      minHeight: 0,
      maxHeight: maxHeightCss,
      overflowY: 'auto',
      paddingRight: '4px',
    };

    return cloneElement(child, {
      sx: (theme) => ({
        ...(typeof existingSx === 'function' ? existingSx(theme) : existingSx),
        ...scrollFixSx,
      }),
    });
  });

const applyRowItemToChildren = (children, rowItem) => {
  const normalizedRowItem = Number(rowItem);
  if (!Number.isFinite(normalizedRowItem) || normalizedRowItem <= 0) {
    return children;
  }

  const unit = 12 / normalizedRowItem;
  const canUseGridColumns = Number.isInteger(unit);

  return Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    if (child.type === Fragment) {
      return (
        <Fragment key={child.key}>
          {applyRowItemToChildren(child.props.children, normalizedRowItem)}
        </Fragment>
      );
    }

    const componentName = getReactComponentName(child.type);
    const isWiniGridItemLike =
      componentName === 'WiniGridItem' || componentName === 'WiniGridLayout';

    if (!isWiniGridItemLike) {
      return child;
    }

    if (hasAnyExplicitSize(child.props)) {
      return child;
    }

    if (canUseGridColumns) {
      return cloneElement(child, { xs: unit });
    }

    const rowItemSx = {
      flex: `0 0 calc(100% / ${normalizedRowItem})`,
      maxWidth: `calc(100% / ${normalizedRowItem})`,
    };
    const existingSx = child.props?.sx;

    return cloneElement(child, {
      sx: (theme) => ({
        ...(typeof existingSx === 'function' ? existingSx(theme) : existingSx),
        ...rowItemSx,
      }),
    });
  });
};

const WiniGridLayout = forwardRef(
  (
    {
      children,
      type,
      ui,
      className,
      sx: sxProp = {},
      size: sizeProp,
      xs,
      sm,
      md,
      lg,
      xl,
      rowItem,
      scrollFix,
      columnSpacing: columnSpacingProp,
      rowSpacing: rowSpacingProp,
      container,
      item,
      isItem,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (container && scrollFix) {
        lockDocumentScroll();
        return () => unlockDocumentScroll();
      }
      return undefined;
    }, [container, scrollFix]);

    const uiTokens = getUiTokens(ui, type);
    const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
    const {
      columnSpacing: uiColumnSpacing,
      rowSpacing: uiRowSpacing,
    } = resolveGridSpacingFromUiTokens(uiTokens);
    const { columnCount: uiColumnCount, rowCount: uiRowCount } =
      resolveGridCountFromUiTokens(uiTokens);
    const resolvedColumnSpacing = columnSpacingProp ?? uiColumnSpacing;
    const resolvedRowSpacing = rowSpacingProp ?? uiRowSpacing;
    const resolvedColumnCount = normalizePositiveNumber(uiColumnCount ?? rowItem);
    const resolvedRowCount = normalizePositiveNumber(uiRowCount);
    const useColumnRowCountLayout =
      Boolean(container) && resolvedRowCount !== undefined;
    const resolvedRowItem = normalizePositiveNumber(rowItem ?? uiColumnCount);
    const mergedClassName = cn(
      'winicomponent winigridlayout',
      uiTokens.map((variant) => `winigridlayout--${variant}`),
      uiTokens.includes('searchBar') && 'wini-Search-bar',
      className,
    );
    const resolvedSize = buildSizeProps(sizeProp, xs, sm, md, lg, xl);

    const scrollFixOffsetPx = resolveScrollFixOffsetPx(scrollFix);
    const scrollFixHeight = buildViewportHeightCss(scrollFixOffsetPx);

    let resolvedChildren = children;
    if (container) {
      if (!useColumnRowCountLayout) {
        resolvedChildren = resolvedRowItem
          ? applyRowItemToChildren(resolvedChildren, resolvedRowItem)
          : applyDefaultFlexToChildren(resolvedChildren);
      }
      if (scrollFix) {
        resolvedChildren = applyScrollFixToChildren(resolvedChildren, scrollFixHeight);
      }
    }

    const baseSx = {
      '&:not(:first-of-type)': {
        marginTop: size.margin.xl,
      },
     ...(container && {
        ...(typeof window !== 'undefined' && {
          flex: 1,
        }),
      }),
      ...(container && scrollFix
        ? {
            height: scrollFixHeight,
            maxHeight: scrollFixHeight,
            overflow: 'hidden',
            minHeight: 0,
            alignItems: 'stretch',
          }
        : {}),
      ...(useColumnRowCountLayout
        ? {
            display: 'grid',
            ...(resolvedColumnCount
              ? {
                  gridTemplateColumns: `repeat(${resolvedColumnCount}, minmax(0, 1fr))`,
                }
              : {}),
            ...(resolvedRowCount
              ? {
                  gridTemplateRows: `repeat(${resolvedRowCount}, minmax(0, auto))`,
                }
              : {}),
            ...(!resolvedColumnCount && resolvedRowCount
              ? {
                  gridAutoFlow: 'column',
                }
              : {}),
            ...(resolvedColumnSpacing !== undefined
              ? {
                  columnGap: resolvedColumnSpacing,
                }
              : {}),
            ...(resolvedRowSpacing !== undefined
              ? {
                  rowGap: resolvedRowSpacing,
                }
              : {}),
          }
        : {}),
      ...(uiSx ?? {}),
    };

    return (
      <Grid
        {...props}
        ref={ref}
        container={container}
        columnSpacing={useColumnRowCountLayout ? undefined : resolvedColumnSpacing}
        rowSpacing={useColumnRowCountLayout ? undefined : resolvedRowSpacing}
        className={mergedClassName}
        size={resolvedSize}
        sx={(theme) => ({
          ...baseSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {resolvedChildren}
      </Grid>
    );
  },
);

WiniGridLayout.displayName = 'WiniGridLayout';

export default WiniGridLayout;
