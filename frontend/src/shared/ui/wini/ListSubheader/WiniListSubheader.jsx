import { forwardRef } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { cn } from '@/shared/lib/cn';
import { color, size } from '@/shared/config/theme';
import { getUiTokens, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';

const BASE_SX = {
  '&': {
    position: 'relative',
    display: 'block',
    padding: 0,
    paddingLeft: size.margin.xxxl,
    marginBottom: size.margin.md,
    color: color.text.main,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 1.2,
    backgroundColor: 'transparent',
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    width: size.icon.md,
    height: size.icon.md,
    backgroundImage: `url(../src/shared/assets/img/title_dep_01.svg)`,
    backgroundSize: 'contain',
  },
};

const UI_SX = {
  dep_02: {
    root: {
      '&.winilistsubheader--dep_02': {
        fontSize: size.text.md,
        fontWeight: '600',
      },
      '&.winilistsubheader--dep_02:before': {
        top: -1,
        backgroundImage: `url(../src/shared/assets/img/title_dep_02.svg)`,
      },
    },
  },
  dep_03: {
    root: {
      '&.winilistsubheader--dep_03': {
        //marginLeft: size.margin.sm,
        fontSize: 15,
        fontWeight: '600',
      },
      '&.winilistsubheader--dep_03:before': {
        top: -1,
        backgroundImage: `url(../src/shared/assets/img/title_dep_03.svg)`,
      },
    },
  },
};

const WiniListSubheader = forwardRef(
  ({ ui, className, children, sx: sxProp = {}, ...props }, ref) => {
    const uiTokens = getUiTokens(ui);
    const uiRootSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'root');

    const mergedClassName = cn(
      'winicomponent winilistsubheader',
      uiTokens.map((token) => `winilistsubheader--${token}`),
      className,
    );

    return (
      <ListSubheader
        className={mergedClassName}
        ref={ref}
        {...props}
        sx={(theme) => ({
          ...BASE_SX,
          ...(uiRootSx ?? {}),
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </ListSubheader>
    );
  },
);

export default WiniListSubheader;
