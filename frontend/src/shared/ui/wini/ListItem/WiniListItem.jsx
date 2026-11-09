import { forwardRef, useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import { cn } from '@/shared/lib/cn';
import { color, size } from '@/shared/config/theme';
import { WiniListTypeContext } from '@/shared/ui/wini/List/WiniList';
import { getUiTokens, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';

const BASE_SX = {
  '&.winilistitem': {
    padding: 0,
    '& .MuiListItemText-root': {
      margin: 0,
    },
  },
};

const MENU_SX = {
  '&.winilistitem .MuiButton-root': {
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left',
    fontSize: '17px',
    fontWeight: '700',
    color: color.text.main,
    padding: `var(--winilist-item-button-padding, ${size.margin.md})`,
    lineHeight: 1,
  },
  '&.winilistitem .MuiButton-root.activeMenu': {
    backgroundColor: color.background.main,
    color: color.text.white,
    fontWeight: '600',
  },
  '&.winilistitem .MuiCollapse-root .MuiButton-root': {
    color: color.text.default,
    fontWeight: '500',
    fontSize: `${size.text.sm}`,
  },
  '&.winilistitem .MuiCollapse-root .MuiButton-root.activeMenu': {
    backgroundColor: color.background.main,
    color: color.text.white,
    fontWeight: '600',
  },
};

const TEXT_SX = {};

const TEXT_UI_SX = {
  dot: {
    root: {
      '&.winilistitem--dot > .MuiListItemIcon-root': {
        position: 'relative',
        display: 'block',
        alignSelf: 'flex-start',
        minWidth: 'unset',
        width: size.icon.md,
        height: size.icon.md,
        marginRight: size.margin.sm,
        backgroundImage: `url(../src/shared/assets/img/dot_gray.svg)`,
        backgroundSize: 'contain',
      },
      '&.winilistitem--dot > .MuiListItemText-root:first-of-type': {
        position: 'relative',
        paddingLeft: 3,
        backgroundImage: `url(../src/shared/assets/img/dot_gray.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `left top`,
        backgroundSize: '20px',
      },
    },
  },
  bar: {
    root: {
      '&.winilistitem--bar > .MuiListItemIcon-root': {
        position: 'relative',
        display: 'block',
        alignSelf: 'flex-start',
        minWidth: 'unset',
        width: size.icon.md,
        height: size.icon.md,
        marginRight: size.margin.sm,
        backgroundImage: `url(../src/shared/assets/img/bar_gray.svg)`,
        backgroundSize: 'contain',
      },
      '&.winilistitem--bar > .MuiListItemText-root:first-of-type': {
        position: 'relative',
        paddingLeft: 3,
        backgroundImage: `url(../src/shared/assets/img/bar_gray.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `left top`,
        backgroundSize: '20px',
      },
    },
  },
  demical: {
    root: {
      '&.winilistitem--demical': {
        display: 'flex',
        alignItems: 'flex-start',
        counterIncrement: 'decimal-counter',
        gap: size.margin.xs,
        paddingLeft: 0,
        listStyle: 'none',
        fontSize: 'var(--size-sm)',
      },
      '&.winilistitem--demical::before': {
        content: 'counter(decimal-counter) "."',
        minWidth: '20px',
        color: color.text.default,
        textAlign: 'center',
      },
    },
  },
  lower_alpha: {
    root: {
      '&.winilistitem--lower_alpha': {
        display: 'flex',
        alignItems: 'flex-start',
        counterIncrement: 'lower-alpha-counter',
        gap: size.margin.xs,
        paddingLeft: 0,
        listStyle: 'none',
        fontSize: 'var(--size-sm)',
      },
      '&.winilistitem--lower_alpha::before': {
        content: 'counter(lower-alpha-counter, lower-alpha) ")"',
        minWidth: '20px',
        color: color.text.default,
        textAlign: 'center',
      },
    },
  },
};

const WiniListItem = forwardRef(
  ({ ui, listType, children, className, sx: sxProp = {}, ...props }, ref) => {
    const inheritedListType = useContext(WiniListTypeContext);
    const resolvedListType = listType ?? inheritedListType ?? 'menu';
    const isTextType = resolvedListType === 'text';
    const uiTokens = isTextType ? getUiTokens(ui) : [];

    const uiRootSx = mergeUiSlotSxByTokens(uiTokens, TEXT_UI_SX, 'root');

    const mergedClassName = cn(
      'winicomponent winilistitem',
      uiTokens.map((token) => `winilistitem--${token}`),
      className,
    );

    const typeSx = isTextType ? TEXT_SX : MENU_SX;

    return (
      <ListItem
        ref={ref}
        {...props}
        className={mergedClassName}
        sx={(theme) => ({
          ...BASE_SX,
          ...typeSx,
          ...(uiRootSx ?? {}),
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </ListItem>
    );
  },
);

export default WiniListItem;
