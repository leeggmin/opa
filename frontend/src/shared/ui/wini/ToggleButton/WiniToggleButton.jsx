import { useState, forwardRef } from 'react';
import ToggleButton from '@mui/material/ToggleButton';

import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { WiniIcon } from '@/shared/ui/wini';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
  default: {
    backgroundColor: color.background.white,
    color: color.brand.main,
    border: `1px solid ${color.brand.main}`,
    // 선택됨
    '&.Mui-selected': {
      backgroundColor: color.brand.main,
      color: color.text.white,
    },
  },

  gray: {
    backgroundColor: color.background.white,
    color: color.gray.c_666,
    border: `1px solid ${color.gray.c_666}`,
    '&.Mui-selected': {
      backgroundColor: color.gray.c_666,
      color: color.text.white,
    },
  },

  line: {
    backgroundColor: color.background.white,
    color: color.brand.main,
    border: `1px solid ${color.brand.main}`,
    '&.Mui-selected': {
      backgroundColor: color.background.offwhite,
      color: color.brand.main,
    },
  },

  lineGray: {
    backgroundColor: color.background.white,
    color: color.gray.c_666,
    border: `1px solid ${color.gray.c_666}`,
    '&.Mui-selected': {
      backgroundColor: color.background.offwhite,
      color: color.gray.c_666,
    },
  },

  white: {
    backgroundColor: color.background.white,
    color: color.text.default,
    border: 'none',
    '&.Mui-selected': {
      backgroundColor: color.background.mainLight,
      color: color.text.default,
    },
  },

  delete: {
    backgroundColor: color.background.white,
    color: color.delete,
    border: `1px solid ${color.delete}`,
    '&.Mui-selected': {
      backgroundColor: color.delete,
      color: color.text.white,
    },
  },
};

const WiniToggleButton = forwardRef((props, ref) => {
  const {
    children,
    icon,
    iconOnly = false,
    className,
    ui,
    sx: sxProp = {},
    selectedColor,
    selectedBgColor,
    selectedBorderColor,
    selected: selectedProp,
    onClick,
    defaultSelected,
    ...muiProps
  } = props;

  const uiTokens = getUiTokens(ui);
  const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);

  const uiSelectedSx = uiSx?.['&.Mui-selected'];
  const uiBaseSx = uiSx ? { ...uiSx } : undefined;
  if (uiBaseSx && uiSelectedSx) {
    delete uiBaseSx['&.Mui-selected'];
  }

  const mergedClassName = cn(
    'winicomponent winitogglebutton',
    uiTokens.map((token) => `winitogglebutton--${token}`),
    className,
  );

  const isControlled = selectedProp !== undefined;
  const [internalSelected, setInternalSelected] = useState(
    defaultSelected ?? false,
  );
  const selected = isControlled ? selectedProp : internalSelected;

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
    padding: '3px 10px 3px 6px',
    borderRadius: '4px',
    fontWeight: 500,
    fontSize: size.text.md,
    textTransform: 'none',
    gap: size.margin.sm,

    ...(uiBaseSx ?? {}),

    '&.Mui-selected': {
      ...(uiSelectedSx ?? {}),
      ...(selectedBgColor ? { backgroundColor: selectedBgColor } : {}),
      ...(selectedColor ? { color: selectedColor } : {}),
      ...(selectedBorderColor ? { borderColor: selectedBorderColor } : {}),
    },

    ...(uiTokens.length > 0 && {
      '&.Mui-disabled': {
        color: color.text.disabled,
        backgroundColor: color.background.disabled,
        borderColor: color.border.disabled,
        ...(uiSx?.['&.Mui-disabled'] ?? {}),
      },
    }),
  };

  const handleClick = (event) => {
    if (!isControlled && !onClick) {
      setInternalSelected((prev) => !prev);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <ToggleButton
      {...muiProps}
      ref={ref}
      className={mergedClassName}
      aria-label={ariaLabel}
      selected={selected}
      onClick={handleClick}
      sx={(theme) => ({
        ...baseSx,
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {hasIconName && <WiniIcon icon={icon} />}
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
    </ToggleButton>
  );
});


export default WiniToggleButton;
