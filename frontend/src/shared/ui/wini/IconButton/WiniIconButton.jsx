import { forwardRef } from 'react';

import IconButton from '@mui/material/IconButton';

import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';

import { WiniIcon } from '@/shared/ui/wini';

import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
  default: {
    backgroundColor: color.brand.main,
    color: color.text.white,
    border: `1px solid ${color.brand.main}`,
    '&:hover': {
      backgroundColor: color.brand.main,
    },
  },

  gray: {
    backgroundColor: color.gray.c_666,
    color: color.text.white,
    border: `1px solid ${color.gray.c_666}`,
    '&:hover': {
      backgroundColor: color.gray.c_666,
    },
  },

  line: {
    backgroundColor: color.background.white,
    color: color.brand.main,
    border: `1px solid ${color.brand.main}`,
    '&:hover': {
      backgroundColor: color.background.offwhite,
    },
  },

  lineGray: {
    backgroundColor: color.background.white,
    color: color.gray.c_666,
    border: `1px solid ${color.gray.c_666}`,
    '&:hover': {
      backgroundColor: color.background.offwhite,
    },
  },

  white: {
    backgroundColor: color.background.white,
    color: color.text.default,
    border: 'none',
    '&:hover': {
      backgroundColor: color.background.mainLight,
    },
  },

  delete: {
    backgroundColor: color.background.white,
    color: color.delete,
    border: `1px solid ${color.delete}`,
    '&:hover': {
      backgroundColor: color.background.offwhite,
    },
  },
};

const WiniIconButton = forwardRef((props, ref) => {
  const {
    children,
    ui,
    icon,
    iconSx = {},
    iconOnly = false,
    className,
    sx: sxProp = {},
    ...muiProps
  } = props;

  const uiTokens = getUiTokens(ui);
  const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);

  const mergedClassName = cn(
    'winicomponent winiiconbutton',
    uiTokens.map((token) => `winiiconbutton--${token}`),
    className,
  );

  const isTextChild =
    typeof children === 'string' || typeof children === 'number';

  const hasIconName = typeof icon === 'string' && icon.length > 0;

  const shouldHideText = iconOnly && hasIconName && isTextChild;

  const hiddenLabel = shouldHideText ? String(children) : null;

  const visibleLabel = !iconOnly && isTextChild ? String(children) : null;

  const ariaLabel =
    muiProps['aria-label'] ??
    hiddenLabel ??
    visibleLabel ??
    (hasIconName ? icon : undefined);

  const shouldRenderChildren = !hasIconName || !iconOnly;

  const baseSx = {
    minWidth: 'auto',
    minHeight: 'auto',
    padding: '3px 10px',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: size.text.md,
    textTransform: 'none',
    gap: size.margin.sm,

    ...(uiSx ?? {}),

    ...(uiTokens.length > 0 && {
      '&.Mui-disabled': {
        color: color.text.disabled,
        backgroundColor: color.background.disabled,
        borderColor: color.border.disabled,
        ...(uiSx?.['&.Mui-disabled'] ?? {}),
      },
    }),
  };

  return (
    <IconButton
      {...muiProps}
      ref={ref}
      className={mergedClassName}
      aria-label={ariaLabel}
      sx={(theme) => ({
        ...baseSx,
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {hasIconName && <WiniIcon icon={icon} sx={iconSx} />}
      {shouldRenderChildren ? children : null}

      {hiddenLabel && (
        <span
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          {hiddenLabel}
        </span>
      )}
    </IconButton>
  );
});

export default WiniIconButton;
