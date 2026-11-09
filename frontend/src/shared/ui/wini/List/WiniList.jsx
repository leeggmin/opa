import { forwardRef, createContext, useContext } from 'react';
import List from '@mui/material/List';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, hasUiToken, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';
import { color, size } from '@/shared/config/theme';

export const WiniListTypeContext = createContext(undefined);

const BASE_SX = {
  '&.MuiList-root .MuiListItem-root': {
    paddingLeft: 0,
  },
};

const MENU_SX = {
  '&.MuiList-root': {
    padding: 0,
  },
  '&.MuiList-root.menu-list.winilist--dep_02': {
    '--winilist-item-padding-left': 0,
    '--winilist-item-padding-right': 0,
  },
  '&.MuiList-root.menu-list.winilist--dep_03': {
    '--winilist-item-padding-left': 0,
    '--winilist-item-padding-right': 0,
    '--winilist-item-button-padding': 0,
  },
  '&.MuiList-root.menu-list.winilist--dep_02 > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-root > .MuiButton-root.activeMenu':{
	backgroundColor: color.background.sub1,
  },
  '&.MuiList-root.menu-list.winilist--dep_02 > .MuiListItem-root > .MuiListItemText-root > .MuiTypography-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner': {
    marginBottom: 0,
	backgroundColor: color.background.white,
  },
  '&.MuiList-root.menu-list.winilist--dep_02 > .MuiListItem-root > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner': {
    marginBottom: 0,
  },
  '&.MuiList-root .MuiListItem-root': {
    paddingTop: 'var(--winilist-item-padding-top, 0px)',
    paddingBottom: 'var(--winilist-item-padding-bottom, 0px)',
    paddingLeft: `var(--winilist-item-padding-left, ${size.margin.xl})`,
    paddingRight: `var(--winilist-item-padding-right, ${size.margin.xl})`,
  },
  '&.MuiList-root .MuiListItem-root > .MuiListItemText-root': {
    margin: 0,
  },
  '&.MuiList-root .MuiListItem-root + .MuiListItem-root': {
    marginTop: `var(--winilist-item-gap, ${size.margin.md})`,
  },
};

const TEXT_SX = {
  '&.MuiList-root': {
    /* padding: `${size.margin.xl} ${size.margin.xxxl}`, */
    counterReset: 'decimal-counter lower-alpha-counter',
    padding: 0,
  },
  '&.MuiList-root .MuiListItem-root': {
    '&:not(:first-of-type)': {
      marginTop: size.margin.md,
    },
  },
  '&.MuiList-root + .MuiList-root': {
    marginTop: size.margin.xl,
  },
  '&.MuiList-root .winibox': {
    /* padding: size.margin.xl, */
    marginTop: size.margin.md,
  },
  '&.MuiList-root .winibox .MuiListItem-root': {
    paddingLeft: '0 !important',
  },
};

const FILE_SX = {
  '&.MuiList-root .MuiListItem-root': {
    padding: `${size.margin.sm} ${size.margin.md}`,
    borderRadius: size.radius.xsm,
    backgroundColor: color.background.offwhite,
    border: `1px solid ${color.gray.c_eee}`,
    fontWeight: 500,
    '+ .MuiListItem-root': {
      marginTop: size.margin.sm,
    },
  },
  '&.MuiList-root .MuiTypography-root': {
    color: color.text.dark,
  },
  '&.MuiList-root.winilist--file .MuiListItem-root + .MuiListItem-root': {
    marginTop: size.margin.sm,
  },
  '&.MuiList-root.winilist--file .MuiTypography-root': {
    fontSize: size.text.sm,
    lineHeight: 1,
  }
};

const UI_SX = {
  dep_02: {
    root: {
      '&.winilist--dep_02': {
        paddingLeft: 3,
      },
    },
  },
  dep_03: {
    root: {
      '&.winilist--dep_03': {
        paddingLeft: 5,
      },
    },
  },
};

const WiniList = forwardRef(
  ({ ui, listType, children, className, sx: sxProp = {}, ...props }, ref) => {
    const inheritedListType = useContext(WiniListTypeContext);
    const resolvedListType = listType ?? inheritedListType ?? 'menu';
    const isTextType = resolvedListType === 'text';
    const uiTokens = getUiTokens(ui);
    // Backward compatibility: legacy `ui="file"` should behave like file list style.
    const isFileType = resolvedListType === 'file' || hasUiToken(uiTokens, 'file');
    const styleUiTokens = uiTokens.filter((token) => token !== 'file');

    const uiRootSx = mergeUiSlotSxByTokens(styleUiTokens, UI_SX, 'root');

    const mergedClassName = cn(
      'winicomponent winilist',
      resolvedListType === 'menu' && 'menu-list',
      isFileType && 'file-list',
      isFileType && 'winilist--file',
      styleUiTokens.map((token) => `winilist--${token}`),
      className,
    );

    const typeSx = isTextType ? TEXT_SX : isFileType ? { ...MENU_SX, ...FILE_SX } : MENU_SX;

    return (
      <WiniListTypeContext.Provider value={resolvedListType}>
        <List
          {...props}
          className={mergedClassName}
          sx={(theme) => ({
            ...BASE_SX,
            ...typeSx,
            ...(uiRootSx ?? {}),
            ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
          })}
          ref={ref}
        >
          {children}
        </List>
      </WiniListTypeContext.Provider>
    );
  },
);

export default WiniList;
