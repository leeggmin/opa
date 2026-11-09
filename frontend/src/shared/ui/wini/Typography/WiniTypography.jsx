import { forwardRef } from 'react';
import Typography from '@mui/material/Typography';
import { icoTitle } from '@/shared/assets';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
  point_text: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 8px',
    borderRadius: size.radius.xsm,
    border: `1px solid ${color.border.default}`,
    backgroundColor: color.background.mainLight,
    color: color.text.main,
    fontWeight: 700,
    lineHeight: 1.2,
    marginTop: 0,
    marginBottom: 0,
  },
};

const TITLE_VARIANT_SX = {
  h1: {
    fontSize: size.text.xxl, // 24px
    paddingLeft: '0',
    beforeSize: '0',
    fontWeight: 'bold',
    marginBottom: size.margin.xxxl,
    color: color.text.dark,
  },
  h2: {
    fontSize: `calc(${size.text.lg} - 1px)`, // 17px
    paddingLeft: `calc(${size.icon.md} + ${size.margin.sm})`,
    beforeSize: size.icon.md,
    color: color.text.main,
    marginTop: 0,
  },
  h3: {
    fontSize: size.text.md, // 16px
    paddingLeft: `calc(${size.icon.md} + ${size.margin.sm})`,
    beforeSize: size.icon.md,
    color: color.text.main,
    marginTop: 0,
    marginBottom: size.margin.md,
  },
  h4: {
    fontSize: `calc(${size.text.md} - 1px)`, // 15px
    paddingLeft: `calc(${size.icon.md} + ${size.margin.sm})`,
    beforeSize: size.icon.md,
    color: color.text.main,
    marginTop: 0,
    marginBottom: size.margin.md,
  },
  h5: {
    fontSize: size.text.md, // 16px
  },
  h6: {
    fontSize: size.text.md, // 16px
  },
  span: {
    fontSize: size.text.sm, // 14px
    marginTop: 0,
    marginBottom: 0,
  },
  p: {
    fontSize: size.text.sm, // 14px
  },
};

const createTitleSx = (variant) => {
  const v = TITLE_VARIANT_SX[variant];
  if (!v) return {};

  const isHeadingVariant =
    typeof variant === 'string' && variant.startsWith('h');

  return {
    ...(isHeadingVariant
      ? {
          position: 'relative',
        }
      : {}),
    paddingLeft: v.paddingLeft,
    fontSize: v.fontSize,
    fontWeight: v.fontWeight ?? 600,
    marginTop: v.marginTop ?? size.margin.xxxl,
    marginBottom: v.marginBottom ?? size.margin.xl,
    color: v.color ?? color.text.dark,

    ...(variant === 'h2' && {
      color: color.text.main,
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        left: 0,
        //top: 'calc((1em * 1.4 - 1em) / 2)',
        top: 'calc(((1em * 1.2) / 2) - calc(' + v.beforeSize + ') / 2)',
        width: v.beforeSize,
        height: v.beforeSize,
        backgroundImage: `url(${icoTitle})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      },
    }),

    ...(variant === 'h3' && {
      color: color.text.main,
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        left: 0,
        //top: 'calc((1em * 1.4 - 1em) / 2)',
        top: 'calc(((1em * 1.2) / 2) - calc(' + v.beforeSize + ') / 2)',
        width: v.beforeSize,
        height: v.beforeSize,
        backgroundImage: `url(../src/shared/assets/img/ico_title02.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      },
    }),

    ...(variant === 'h4' && {
      color: color.text.main,
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        left: 0,
        //top: 'calc((1em * 1.4 - 1em) / 2)',
        top: 'calc(((1em * 1.2) / 2) - calc(' + v.beforeSize + ') / 2)',
        width: v.beforeSize,
        height: v.beforeSize,
        backgroundImage: `url(../src/shared/assets/img/ico_title03.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      },
    }),

    ...(isHeadingVariant
      ? {
          '@media (max-width:760px)': {
            fontSize:
              variant === 'h1'
                ? '2.4rem'
                : variant === 'h2'
                  ? '2.2rem'
                  : variant === 'h3'
                    ? '2rem'
                    : '1.6rem',
          },
        }
      : {}),
  };
};

const FONT_FAMILY =
  '"Pretendard GOV", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const WiniTypography = forwardRef(
  ({ children, variant, ui, className, sx: sxProp = {}, ...props }, ref) => {
    const uiTokens = getUiTokens(ui);
    const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
    const mergedClassName = cn(
      'winicomponent winitypography',
      ...uiTokens.map((token) => `winitypography--${token}`),
      className,
    );
    const shouldApplyVariantSx =
      typeof variant === 'string' &&
      (variant.startsWith('h') || variant === 'span');
    const resolvedComponent =
      variant === 'span' && props.component === undefined
        ? 'span'
        : props.component;
    const baseSx = {
      fontFamily: FONT_FAMILY,
      ...(shouldApplyVariantSx ? createTitleSx(variant) : {}),
      ...(uiSx ?? {}),
    };

    return (
      <Typography
        {...props}
        ref={ref}
        variant={variant}
        component={resolvedComponent}
        className={mergedClassName}
        sx={(theme) => ({
          ...baseSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </Typography>
    );
  },
);

export default WiniTypography;
