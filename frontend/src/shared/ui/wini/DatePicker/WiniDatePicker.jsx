import { useRef, useMemo, forwardRef, useId } from 'react';
import { dayjs } from '@/shared/config';
import 'dayjs/locale/ko';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { koKR } from '@mui/x-date-pickers/locales';
import { Box, FormControl, Typography } from '@mui/material';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { WiniIcon } from '@/shared/ui/wini';
import { color, size } from '@/shared/config/theme';
const SIZE_TOKENS = {
  small: { height: size.objH.sm, fontSize: size.text.sm },
  medium: { height: size.objH.md, fontSize: size.text.md },
  large: { height: size.objH.lg, fontSize: size.text.lg },
};
const KOREAN_LOCALE_TEXT =
  koKR.components.MuiLocalizationProvider.defaultProps.localeText;

const buildLabelTransition = (durationMs) =>
  `transform ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms, color ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms`;

const LABEL_CONFIG = {
  outlined: { x: '12px', duration: 200 },
  filled: { x: '12px', duration: 150, shrinkY: '-7px', shrinkScale: 0.75 },
  standard: { x: '0px', duration: 150, shrinkY: '-7px', shrinkScale: 0.75 },
};

const WEEKDAY_LABELS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const pickSxValue = (sx, key) => {
  if (!sx || typeof sx === 'function') return undefined;
  if (Array.isArray(sx)) {
    for (let i = sx.length - 1; i >= 0; i -= 1) {
      const value = pickSxValue(sx[i], key);
      if (value !== undefined) return value;
    }
    return undefined;
  }
  return sx?.[key];
};

const toCssSize = (value) => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
    return `${value}px`;
  }
  return value;
};

const getHeightFromClassName = (className) => {
  if (!className || typeof className !== 'string') return undefined;
  const regex = /(?:^|\s)h-\[([^\]]+)\]/g;
  let match;
  let lastValue;
  while ((match = regex.exec(className)) !== null) {
    lastValue = match[1];
  }
  return toCssSize(lastValue);
};

const normalizePickerValue = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (dayjs.isDayjs(value)) {
    return value;
  }

  if (value?.isValid instanceof Function) {
    return value;
  }

  if (
    value instanceof Date ||
    typeof value === 'number' ||
    typeof value === 'string'
  ) {
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
  }

  return null;
};

const WiniDatePicker = forwardRef((props, ref) => {
  const {
    children,
    size: sizeProp = 'small',
    className,
    inputClassName,
    labelClassName,
    label,
    labelSx = {},
    inputSx = {},
    ui,
    variant = 'outlined',
    sx: sxProp = {},
    slotProps: slotPropsProp = {},
    format = 'YYYY-MM-DD',
    views = ['year', 'month', 'day'],
    onChange,
    name,
    value: rawValue,
    defaultValue: rawDefaultValue,
    titleFix,
    adapterLocale = 'ko', localeText = KOREAN_LOCALE_TEXT,
    ...pickerProps
  } = props;

  const required =
    pickerProps.required === true ||
    slotPropsProp?.textField?.required === true;
  const disabled = pickerProps.disabled === true;
  const uiTokens = getUiTokens(ui);
  const layoutUi = getLastUiToken(uiTokens, ['row', 'column']);
  const isUiMode = layoutUi !== undefined;
  const sizeTokens = SIZE_TOKENS[sizeProp] ?? SIZE_TOKENS.small;
  const heightOverride = toCssSize(pickSxValue(sxProp, 'height'));
  const classHeight = getHeightFromClassName(
    isUiMode ? slotPropsProp?.textField?.className : className,
  );
  const controlHeight = heightOverride ?? classHeight ?? sizeTokens.height;
  const variantKey = variant ?? 'outlined';
  const labelConfig = LABEL_CONFIG[variantKey] ?? LABEL_CONFIG.outlined;
  const labelY =
    'calc((var(--wini-control-h) - (var(--wini-font-size) * var(--wini-label-line-height))) / 2)';
  const hasShrinkConfig = labelConfig.shrinkY !== undefined;
  const layoutClassName =
    layoutUi === 'column' ? 'flex-col items-stretch' : 'items-center';
  const refdate = useRef(null);
  const inputId = useId();

  const slotPropsAll = slotPropsProp ?? {};
  const { inputLabel: inlineInputLabelProps, ...slotPropsWithoutAliases } =
    slotPropsAll;
  const {
    textField: textFieldSlotProp = {},
    popper: popperSlotProp,
    calendarHeader: calendarHeaderSlotProp,
    openPickerIcon: openPickerIconSlotProp,
    ...passthroughSlotProps
  } = slotPropsWithoutAliases;

  const DateIconComponent = useMemo(
    () =>
      forwardRef(function PickerDownIcon(iconProps, iconRef) {
        const { className: iconClassName, ...rest } = iconProps;

        return (
          <WiniIcon
            {...rest}
            ref={iconRef}
            icon="cal"
            className={cn(iconClassName, 'winiicon')}
            sx={{ fontSize: 20 }}
          />
        );
      }),
    [],
  );
  const SwitchViewIconComponent = useMemo(
    () =>
      forwardRef(function SwitchViewIcon(iconProps, iconRef) {
        const { className: iconClassName, ...rest } = iconProps;
        return (
          <WiniIcon
            {...rest}
            ref={iconRef}
            icon="down"
            className={cn(iconClassName, 'winiicon')}
            sx={{ fontSize: 20, color: color.text.black }}
          />
        );
      }),
    [],
  );

  const PrevMonthIconComponent = useMemo(
    () =>
      forwardRef(function PrevMonthIcon(iconProps, iconRef) {
        const { className: iconClassName, ...rest } = iconProps;
        return (
          <WiniIcon
            {...rest}
            ref={iconRef}
            icon="left" // ← 사용하시는 아이콘 키
            className={cn(iconClassName, 'winiicon')}
            sx={{ fontSize: 20, color: color.text.black }}
          />
        );
      }),
    [],
  );

  const NextMonthIconComponent = useMemo(
    () =>
      forwardRef(function NextMonthIcon(iconProps, iconRef) {
        const { className: iconClassName, ...rest } = iconProps;
        return (
          <WiniIcon
            {...rest}
            ref={iconRef}
            icon="right" // → 사용하시는 아이콘 키
            className={cn(iconClassName, 'winiicon')}
            sx={{ fontSize: 20, color: color.text.black }}
          />
        );
      }),
    [],
  );

    const basePopperSx = {
        '& .MuiPaper-root.MuiPickersPopper-paper': {
            boxShadow: '0 0 10px rgba(0,0,0,0.16)',
            border: `1px solid ${color.border.disabled}`,
        },
        '& .MuiDayCalendar-weekDayLabel': {
            fontWeight: 500,
            color: color.text.sub,
            fontSize: size.text.sm,
        },
        '& .MuiDayCalendar-weekDayLabel:first-of-type': {
            color: color.calendar.sun,
        },
        '& .MuiDayCalendar-weekDayLabel:last-of-type': {
            color: color.calendar.sat,
        },
        '& .MuiPickersDay-root': {
            fontSize: 14,
        },
        '& .MuiPickersDay-root:nth-of-type(7n+1):not(.MuiPickersDay-dayOutsideMonth)': {
            color: color.calendar.sun,
            '&.Mui-selected': {
                color: color.text.white,
            },
        },
        '& .MuiPickersDay-root:nth-of-type(7n):not(.MuiPickersDay-dayOutsideMonth)': {
            color: color.calendar.sat,
            '&.Mui-selected': {
                color: color.text.white,
            },
        },
        '& .MuiPickersDay-root.MuiPickersDay-dayOutsideMonth': {
            color: color.text.light,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            color: color.background.white,
        },
        '& .MuiPickersDay-root.Mui-selected:hover': {
            color: color.background.white,
        },
        '& .MuiPickersCalendarHeader-label': {
            fontSize: 17,
            fontWeight: 600,
            color: color.text.dark,
        },
    };

    const baseTextFieldSx = {
        '--wini-control-h': controlHeight,
        '--wini-font-size': sizeTokens.fontSize,
        '--wini-input-pad-x': '8px',
        '--wini-input-pad-y': '8px',
        '--wini-label-line-height': 'var(--lh-normal)',
        '--wini-label-y': labelY,
        '--wini-label-x': labelConfig.x,
        '--wini-label-transition': buildLabelTransition(labelConfig.duration),
        display: 'flex',
        flex: isUiMode ? 1 : undefined,
        width: isUiMode ? '100%' : undefined,
        '& .MuiInputBase-input': {
            fontSize: 'var(--wini-font-size)',
            fontWeight: 500,
            height: 'var(--wini-control-h)',
            padding: 'var(--wini-input-pad-y) var(--wini-input-pad-x)',
            boxSizing: 'border-box',
            color: disabled ? color.text.disabled : color.text.dark,
            marginTop: variantKey === 'standard' ? 0 : undefined,
            backgroundColor: variantKey === 'filled' ? color.background.inputFilled : color.background.white,
            '::placeholder': {
                color: color.text.sub,
                opacity: 1,
            },
            '&.Mui-disabled': {
                backgroundColor: color.background.disabled,
                color: color.text.disabled,
                WebkitTextFillColor: color.text.disabled,
            },
        },
        '& .MuiInputLabel-root': {
            fontSize: 'var(--wini-font-size)',
            color: required ? color.text.point : color.text.sub,
            transformOrigin: 'top left',
            transition: 'var(--wini-label-transition)',
            zIndex: 1,
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: required ? color.text.point : color.primary.main,
        },
        '& .MuiInputLabel-root.Mui-disabled': {
            color: color.text.disabled,
        },
        '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
            fontWeight: 500,
            transform: `translate(var(--wini-label-x), var(--wini-label-y))`,
            color: required ? color.text.point : color.text.sub,
        },
        '& label + .MuiInputBase-root.MuiInput-root': {
            marginTop: 0,
        },
        ...(hasShrinkConfig
            ? {
                  '& .MuiInputLabel-root.MuiInputLabel-standard.MuiInputLabel-shrink': {
                      transform: `translate(var(--wini-label-x), ${labelConfig.shrinkY}) scale(${labelConfig.shrinkScale})`,
                  },
                  '& .MuiInputLabel-root.MuiInputLabel-filled.MuiInputLabel-shrink': {
                      transform: `translate(var(--wini-label-x), ${labelConfig.shrinkY}) scale(${labelConfig.shrinkScale})`,
                  },
              }
            : {}),
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: color.border.default,
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: color.primary.hover,
            borderWidth: 2,
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: color.primary.main,
            borderWidth: 2,
        },
        '& .MuiOutlinedInput-root.MuiInputBase-readOnly:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
            borderColor: color.border.disabled,
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: color.border.disabled,
        },
        '& .winiicon': {
            color: color.text.dark,
        },
        '& .Mui-disabled .winiicon': {
            color: color.text.disabled,
        },
        '& .MuiInputAdornment-positionEnd': {
            position: 'absolute',
            right: size.margin.sm,
            margin: 0,
            '& .MuiButtonBase-root':{
                padding: size.margin.sm,
                margin: 0,
                '&:hover': {
                    backgroundColor: color.calendar.hover,
                },
            }
        },
        '& .MuiInputBase-root' :{
            // backgroundColor: color.background.white,
            padding: 0,
        },
        '& .Mui-focused' :{
            '& .winiicon': {
                color: color.primary.main,
            },
        },
        
    };

  const textFieldClass = cn(
    'winicomponent winitext',
    textFieldSlotProp?.className,
    isUiMode ? undefined : className,
  );

  const { slots: pickerSlots, ...restPickerProps } = pickerProps;

  const mergedSlotProps = {
    ...slotPropsProp,
    textField: {
      ...slotPropsProp?.textField,
      variant: variantKey,
      size: sizeProp,
      required,
      label: isUiMode ? undefined : (slotPropsProp?.textField?.label ?? label),
      className: textFieldClass,
      inputRef: slotPropsProp?.textField?.inputRef ?? refdate,
      fullWidth: true,
      inputProps: {
        ...slotPropsProp?.textField?.inputProps,
        id: slotPropsProp?.textField?.inputProps?.id ?? inputId,
        className: cn(
          slotPropsProp?.textField?.inputProps?.className,
          inputClassName,
        ),
        'data-reset-value':
          slotPropsProp?.textField?.inputProps?.['data-reset-value'] ??
          restPickerProps['data-reset-value'] ??
          null,
        'data-date-format': format,
      },
      InputLabelProps: {
        ...slotPropsProp?.textField?.InputLabelProps,
        htmlFor: slotPropsProp?.textField?.InputLabelProps?.htmlFor ?? inputId,
        className: cn(
          slotPropsProp?.textField?.InputLabelProps?.className,
          labelClassName,
        ),
      },
      sx: [
        baseTextFieldSx,
        inputSx,
        sxProp,
        slotPropsProp?.textField?.sx,
      ].filter(Boolean),
    },
    popper: {
      ...slotPropsProp?.popper,
      sx: [basePopperSx, slotPropsProp?.popper?.sx].filter(Boolean),
    },
    calendarHeader: {
      format: 'YYYY년 M월',
      slotProps: {
        switchViewIcon: {
          sx: {
            fontSize: 18,
            color: color.text.dark,
          },
        },
        previousIconButton: {
          sx: {
            color: color.text.dark,
          },
        },
        nextIconButton: {
          sx: {
            color: color.text.dark,
          },
        },
      },
    },
    openPickerIcon: {
      ...slotPropsProp?.openPickerIcon,
      sx: [{ fontSize: 20 }, slotPropsProp?.openPickerIcon?.sx].filter(Boolean),
    },
  };

  const mergedSlots = {
    ...pickerSlots,
    openPickerIcon: pickerSlots?.openPickerIcon ?? DateIconComponent,
    switchViewIcon: pickerSlots?.switchViewIcon ?? SwitchViewIconComponent,
    leftArrowIcon: pickerSlots?.leftArrowIcon ?? PrevMonthIconComponent,
    rightArrowIcon: pickerSlots?.rightArrowIcon ?? NextMonthIconComponent,
  };

  const handleChange = (value, context) => {
    if (typeof onChange === 'function') {
      onChange({
        target: {
          el: refdate.current ?? null,
          value,
          name,
          format,
        },
        value,
        context,
      });
    }
  };

  const normalizedValue = normalizePickerValue(rawValue);
  const normalizedDefaultValue = normalizePickerValue(rawDefaultValue);

    const pickerContent = (
        <DatePicker
            {...restPickerProps}
            value={normalizedValue}
            defaultValue={normalizedDefaultValue}
            ref={ref}
            format={format}
            views={views}
            slotProps={mergedSlotProps}
            slots={mergedSlots}
            onChange={handleChange}
            showDaysOutsideCurrentMonth={true}
            dayOfWeekFormatter={pickerProps.dayOfWeekFormatter ?? ((day) => {
                if (typeof day?.day === 'function') {
                    return WEEKDAY_LABELS_KR[day.day()] ?? '';
                }
                const fallbackIndex = dayjs(day).day();
                return WEEKDAY_LABELS_KR[fallbackIndex] ?? '';
            })}
        >
            {children}
        </DatePicker>
    );

  if (!isUiMode) {
    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={adapterLocale}
        localeText={localeText}
      >
        {pickerContent}
      </LocalizationProvider>
    );
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={adapterLocale}
      localeText={localeText}
    >
      <FormControl
        className={className}
        disabled={disabled}
        sx={{
          ...(typeof sxProp === 'object' ? sxProp : {}),
          '--wini-control-h': controlHeight,
          '--wini-font-size': sizeTokens.fontSize,
          '--wini-input-pad-x': '8px',
          '--wini-input-pad-y': '8px',
        }}
      >
        <Box className={cn('flex', layoutClassName, className)}>
          {label ? (
            <Typography
              component="label"
              className={labelClassName}
              sx={[
                {
                  minWidth: '130px',
                  flexShrink: 0,
                  fontSize: 'var(--wini-font-size)',
                  color: disabled
                    ? color.text.sub
                    : required
                      ? color.text.point
                      : color.text.dark,
                },
                labelSx,
              ]}
            >
              {label}
              {required && ' *'}
            </Typography>
          ) : null}
          <Box sx={{ flex: 1 }}>{pickerContent}</Box>
        </Box>
      </FormControl>
    </LocalizationProvider>
  );
});

export default WiniDatePicker;
