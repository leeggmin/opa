import { forwardRef } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
const DEFAULT_BUTTON_PROPS = {
  size: 'small',
  classes: { root: ['Wini_default_Button_Height'] },
};
Button.defaultProps = DEFAULT_BUTTON_PROPS;
LoadingButton.defaultProps = DEFAULT_BUTTON_PROPS;

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

const WiniButton = forwardRef((props, ref) => {
  const { ui, loadingIndicatorColor, ...muiProps } = props;
  const hasMuiVariant =
    muiProps.variant !== undefined && muiProps.variant !== null;
  const uiTokens = hasMuiVariant ? [] : getUiTokens(ui, 'default');
  const hasUiInput = uiTokens.length > 0;
  const activeUiToken = getLastUiToken(uiTokens, Object.keys(UI_SX));
  const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
  const isLoading = muiProps.loading === true;
  const resolvedIndicatorColor =
    loadingIndicatorColor ??
    (uiSx
      ? activeUiToken === 'line' || activeUiToken === 'lineGray'
        ? '#333'
        : '#fff'
      : undefined);
  const resolvedLoadingIndicator =
    muiProps.loadingIndicator !== undefined ? (
      muiProps.loadingIndicator
    ) : resolvedIndicatorColor ? (
      <CircularProgress
        color="inherit"
        size={16}
        sx={{ color: resolvedIndicatorColor }}
      />
    ) : undefined;
  const mergedClassName = cn(
    'winicomponent winibutton',
    uiTokens.map((token) => `winibutton--${token}`),
    muiProps.className,
  );
  const ButtonComponent =
    muiProps.loading !== undefined ||
    muiProps.loadingPosition !== undefined ||
    muiProps.loadingIndicator !== undefined
      ? LoadingButton
      : Button;

  const sxProp = muiProps.sx ?? {};
  const baseSx = hasMuiVariant
    ? {}
    : {
        minWidth: '80px',
        minHeight: '32px',
        padding: '3px 10px',
        borderRadius: '4px',
        fontWeight: 500,
        fontSize: size.text.md,
        lineHeight: 1.5,
        textTransform: 'none',
        ...(hasUiInput ? { boxShadow: 'none' } : {}),
        ...(uiSx ?? {}),
        ...(hasUiInput
          ? {
              '&:hover': {
                boxShadow: 'none',
                ...(uiSx?.['&:hover'] ?? {}),
              },
              '&.Mui-disabled': {
                color: color.text.disabled,
                backgroundColor: color.background.disabled,
                borderColor: color.border.disabled,
                ...(uiSx?.['&.Mui-disabled'] ?? {}),
              },
              ...(isLoading && uiSx
                ? {
                    '&.Mui-disabled.MuiButton-loading, &.Mui-disabled.MuiLoadingButton-loading':
                      {
                        color: uiSx.color,
                        backgroundColor: uiSx.backgroundColor,
                        border: uiSx.border,
                      },
                      '& .MuiLoadingButton-loadingIndicator': {
                        position: 'relative',
                        left: 'auto',
                        marginRight: size.margin.md,
                      }
                  }
                : {}),
            }
          : {}),
      };

  return (
    <ButtonComponent
      {...muiProps}
      ref={ref}
      className={mergedClassName}
      loadingIndicator={resolvedLoadingIndicator}
      sx={(theme) => ({
        ...baseSx,
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
    >
      {muiProps.children}
    </ButtonComponent>
  );
});

export default WiniButton;
