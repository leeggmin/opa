import { forwardRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import { WiniIcon } from '@/shared/ui/wini';

const SIZE_TOKENS = {
  small: { fontSize: size.text.sm, box: size.text.md ,gap: 4 },
  medium: { fontSize: size.text.sm, box: size.text.md, gap: 4 },
  large: { fontSize: size.text.sm, box: size.text.xl, gap: 4 },
};

const ICON_UI_COLORS = {
  default: { icon: color.gray.c_666, checkedIcon: color.brand.main },
  gray: { icon: color.gray.c_666, checkedIcon: color.gray.c_666 },
  line: { icon: color.brand.main, checkedIcon: color.brand.main },
  lineGray: { icon: color.gray.c_666, checkedIcon: color.gray.c_666 },
  white: { icon: color.text.default, checkedIcon: color.text.default },
  delete: { icon: color.delete, checkedIcon: color.delete },
  yellow: { icon: '#707070', checkedIcon: '#FEA900' },
};

const WiniCheckbox = forwardRef(
  (
    {
      className,
      size = 'small',
      label,
      labelProps,
      labelClassName,
      readOnly,
      ui,
      iconName, // 기본 체크 대신 사용할 아이콘 이름
      checkedIconName, // 체크 상태에서 사용할 아이콘 이름
      iconClassName,
      checkClassName,
      iconColor,
      checkedIconColor,
      checkedBoxColor,
      checkedBorderColor,
      sx: sxProp = {},
      ...props
    },
    ref,
  ) => {
    const sizeToken = SIZE_TOKENS[size] ?? SIZE_TOKENS.medium;
    const uiTokens = getUiTokens(ui);

    const disabled = props.disabled === true;
    const isReadOnly = readOnly === true;
    const required = props.required === true;

    const iconClass = `icon-checkbox-${size}`;
    const isCustomIcon = Boolean(iconName || checkedIconName);

  const useLabelClassColor = Boolean(labelClassName);
  const useCheckClassColor = Boolean(checkClassName);
  const useBoxClassColor = Boolean(iconClassName);

  const uiColorToken = getLastUiToken(uiTokens, Object.keys(ICON_UI_COLORS));
  const uiColors = uiColorToken ? ICON_UI_COLORS[uiColorToken] : undefined;

    // 기본 체크박스용 아이콘 색상 (파란 배경 위 흰색 체크)
    const baseCheckIconColor = disabled
      ? color.text.white
      : isReadOnly
        ? color.text.white
        : color.background.white;

    // 커스텀 아이콘용 색상 (배경 없이 아이콘만 표시)
    const baseCustomIconColor = uiColors?.icon
      ?? (disabled || isReadOnly ? color.text.sub : color.primary.main);

    const baseCustomCheckedIconColor = uiColors?.checkedIcon ?? baseCustomIconColor;

    // 커스텀 아이콘 색 (별/북마크 등)
    const customIconColor = iconColor ?? baseCustomIconColor;
    const customCheckedIconColor = checkedIconColor ?? baseCustomCheckedIconColor;

    // 기본 체크 아이콘 색 (사각 박스 + 체크)
    const defaultIconColor = iconColor ?? baseCheckIconColor;
    const defaultCheckedIconColor = checkedIconColor ?? defaultIconColor;

    // 체크 상태 박스 배경/테두리 색 (커스터마이징 가능, 기본은 primary.main)
    const resolvedCheckedBoxColor = checkedBoxColor ?? color.primary.main;
    const resolvedCheckedBorderColor = checkedBorderColor ?? resolvedCheckedBoxColor;

    const baseIcon = isCustomIcon ? (
      <span className={cn('icon-checkbox', iconClass, 'is-custom', iconClassName)}>
        {iconName && (
          <WiniIcon
            icon={iconName}
            sx={{
              fontSize: `${sizeToken.box}`,
              width: `${sizeToken.box}`,
              height: `${sizeToken.box}`,
              '& path': {
                fill: customIconColor,
              },
            }}
          />
        )}
      </span>
    ) : (
      <span className={cn('icon-checkbox', iconClass, iconClassName)} />
    );

    const checkedIcon = isCustomIcon ? (
      <span
        className={cn('icon-checkbox', iconClass, 'is-checked', 'is-custom')}
      >
        <WiniIcon
          icon={checkedIconName || iconName || 'check'}
          sx={{
            fontSize: `${sizeToken.box}px`,
            '& path': {
              fill: customCheckedIconColor,
            },
          }}
        />
      </span>
    ) : (
      <span className={cn('icon-checkbox', iconClass, 'is-checked', checkClassName)}>
        <WiniIcon
          icon="check"
          sx={{
            fontSize: `${sizeToken.box}px`,
            ...(useCheckClassColor
              ? {}
              : { color: defaultCheckedIconColor }),
          }}
        />
      </span>
    );

    const checkboxSx = {
      padding: `${sizeToken.gap}px`,
      margin: 0,

      '& .MuiTouchRipple-root': {
        display: 'none',
      },

      '& .icon-checkbox': {
        width: `${sizeToken.box}`,
        height: `${sizeToken.box}`,
        borderRadius: '2px',
        border: !isCustomIcon && !useBoxClassColor ? `1.3px solid ${color.border.dark}` : '',
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 120ms ease',
        overflow: 'hidden',
        backgroundColor: color.background.white,
        ...(useCheckClassColor
          ? {}
          : { color: isCustomIcon ? customCheckedIconColor : defaultCheckedIconColor }),

          '&.is-custom': {
            width: `calc(${sizeToken.box} + 4px)`,
            height: `calc(${sizeToken.box} + 4px)`,
          },
      },

      '& .icon-checkbox .winiicon': {
        width: `${sizeToken.box}`,
        height: `${sizeToken.box}`,
        fontSize: `${sizeToken.box}`,
      },

      '& .icon-checkbox.is-custom .winiicon': {
        width: `calc(${sizeToken.box} + 4px)`,
        height: `calc(${sizeToken.box} + 4px)`,
      },

      /* hover */
      '&:hover': {
        backgroundColor: '#E7F1FB',
      },

      /* checked */

      '&.Mui-checked .icon-checkbox': {
        ...(useBoxClassColor
          ? {}
          : {
              backgroundColor: resolvedCheckedBoxColor,
              borderColor: resolvedCheckedBorderColor,
            }),
      },

      '&.Mui-checked .icon-checkbox .winiicon': {
        // ...(useCheckClassColor
        //   ? {}
        //   : { color: isCustomIcon ? customCheckedIconColor : defaultCheckedIconColor }),
      },

      // 커스텀 아이콘(별/북마크 등)일 경우에는 배경 없이 아이콘만 보이도록 처리
      '&.Mui-checked .icon-checkbox.is-custom': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        // width: `${sizeToken.box}`,
      },

      /* readonly */
      '&.Mui-readOnly': {
        pointerEvents: 'none',
      },

      '&.Mui-readOnly .icon-checkbox': {
        ...(useBoxClassColor
          ? {}
          : {
              backgroundColor: color.gray.c_999,
              borderColor: color.gray.c_999,
            }),
      },

      '&.Mui-readOnly .icon-checkbox.is-custom': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },

      /* disabled */
      '&.Mui-disabled .icon-checkbox ': {
        ...(useBoxClassColor
          ? {}
          : {
              // backgroundColor: color.gray.c_bbb,
              borderColor: color.gray.c_bbb,
            }),
      },

      '&.Mui-disabled.Mui-checked .icon-checkbox .winiicon': {
            backgroundColor: color.gray.c_bbb,
            borderColor: color.gray.c_bbb,
        },

      '&.Mui-disabled .icon-checkbox.is-custom': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    };

    const checkbox = (
      <Checkbox
        {...props}
        ref={ref}
        className={cn(
          'winicomponent winicheckbox',
          uiTokens.map((token) => `winicheckbox--${token}`),
          isReadOnly && 'Mui-readOnly',
          className,
        )}
        disableRipple
        icon={baseIcon}
        checkedIcon={checkedIcon}
        sx={[checkboxSx, sxProp]}
      />
    );

    if (!label) return checkbox;

    const {
      sx: labelSx,
      className: labelPropsClassName,
      ...restLabelProps
    } = labelProps ?? {};

    return (
      <FormControlLabel
        {...restLabelProps}
        control={checkbox}
        label={
          <>
            {label}
            {required}
          </>
        }
        className={cn(labelClassName, labelPropsClassName)}
        sx={(theme) => ({
            margin: 0,
            marginRight: '24px',
            fontSize: sizeToken.fontSize,
            gap: `${sizeToken.gap}px`,
            ...(useLabelClassColor
              ? {}
              : {
                  color: disabled
                    ? color.text.sub
                    : isReadOnly
                    ? color.text.sub
                    : color.text.sub,
                }),
              '& .MuiFormControlLabel-label':{
                fontSize: sizeToken.fontSize,
              },
              '&.Mui-required': {
                color: color.text.point,
              },
              '& .Mui-disabled.MuiFormControlLabel-label': {
                color: color.text.sub,
              },


          ...(typeof labelSx === 'function' ? labelSx(theme) : labelSx),
        })}
      />
    );
  },
);

export default WiniCheckbox;
