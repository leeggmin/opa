import { useMemo, useCallback, forwardRef } from 'react';
import Radio from '@mui/material/Radio';
import { Box, FormControl, FormControlLabel, Typography } from '@mui/material';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const SIZE_TOKENS = {
    small: { fontSize: size.text.sm },
    medium: { fontSize: size.text.sm, radioSize: size.text.md, dotSize: size.margin.md },
    large: { fontSize: size.text.sm, radioSize: size.text.xl, dotSize: size.margin.lg },
};

// WiniCheckbox와 동일한 컨셉의 색상 프리셋
const RADIO_UI_COLORS = {
    default: { border: color.border.dark, dot: color.primary.main },
    gray: { border: color.gray.c_666, dot: color.gray.c_666 },
    line: { border: color.primary.main, dot: color.primary.main },
    lineGray: { border: color.gray.c_666, dot: color.gray.c_666 },
    delete: { border: color.delete, dot: color.delete },
};

const WiniRadio = forwardRef(
    (
        {
            children,
            size: sizeProp = 'medium',
            className,
            labelClassName,
            radioClassName,
            labelColor,
            ui,
            iconColor,
            checkedIconColor,
            labelSx = {},
            sx: sxProp = {},
            label,
            labelProps,
            titleFix,
            inputProps: inputPropsProp,
            onChange,
            onClick,
            readOnly,
            ...restProps
        },
        ref,
    ) => {
        const sizeTokens = SIZE_TOKENS[sizeProp] ?? SIZE_TOKENS.small;
        const uiTokens = getUiTokens(ui);
        const layoutUi = getLastUiToken(uiTokens, ['row', 'column']);
        const isUiMode = layoutUi !== undefined;
        const required = restProps.required === true;
        const disabled = restProps.disabled === true;
        const isReadOnly = readOnly === true;

        const uiColorToken = getLastUiToken(uiTokens, Object.keys(RADIO_UI_COLORS));
        const uiColors = uiColorToken ? RADIO_UI_COLORS[uiColorToken] : undefined;
        const hasLabelClassName = !!labelClassName;

        const iconClassName = cn('wini-radio-icon', `wini-radio-icon-${sizeProp}`, radioClassName);
        const radioIcon = <span className={iconClassName} />;
        const radioCheckedIcon = <span className={cn(iconClassName, 'is-checked')} />;

        const baseRadioSx = {
            color: iconColor ?? uiColors?.dot ?? color.primary.main,
            padding: `${size.margin.sm}`,
            margin: 0,
            '& .MuiTouchRipple-root': {
                display: 'none',
            },
            '& .wini-radio-icon': {
                width:  `${sizeTokens.radioSize}`,
                height: `${sizeTokens.radioSize}`,
                borderRadius: '999px',
                border: `1.3px solid ${uiColors?.border ?? color.border.dark}`,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                transition: 'all 120ms cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: '#fff',
            },
            '& .wini-radio-icon::after': {
                content: '""',
                width: `${sizeTokens.dotSize}`,
                height: `${sizeTokens.dotSize}`,
                borderRadius: '50%',
                backgroundColor: checkedIconColor ?? uiColors?.dot ?? 'currentColor',
                transform: 'scale(0)',
                transition: 'transform 120ms ease, background-color 120ms ease',
            },
            '& .wini-radio-icon.is-checked::after': {
                transform: 'scale(1)',
            },
            '&:hover:not(.Mui-disabled):not(.Mui-readOnly)': {
                backgroundColor: '#E7F1FB',
            },
            '&.Mui-checked': {
                '& .wini-radio-icon': {
                    borderColor: uiColors?.dot ?? color.primary.main,
                },
                '& .wini-radio-icon::after': {
                    backgroundColor: checkedIconColor ?? uiColors?.dot ?? 'currentColor',
                },
            },
            '&.Mui-disabled': {
                '& .wini-radio-icon': {
                    borderColor: color.gray.c_999,
                    backgroundColor: color.gray.c_eee,
                    boxShadow: 'none',
                },
                '& .wini-radio-icon::after': {
                    backgroundColor: color.gray.c_999,
                },
            },
            '&.Mui-readOnly': {
                color: labelColor ?? color.text.sub,
                pointerEvents: 'none',
                '& .wini-radio-icon': {
                    borderColor: color.gray.c_999,
                    // backgroundColor: readonlyBackground,
                    boxShadow: 'none',
                },
                '& .wini-radio-icon::after': {
                    backgroundColor: color.gray.c_999,
                },
            },
        };

    const mergedInputProps = useMemo(
      () => ({
        ...inputPropsProp,
        readOnly: isReadOnly,
      }),
      [inputPropsProp, isReadOnly],
    );

    const handleChange = useCallback(
      (event, value) => {
        if (isReadOnly) {
          event.preventDefault();
          return;
        }
        onChange?.(event, value);
      },
      [isReadOnly, onChange],
    );

    const handleClick = useCallback(
      (event) => {
        if (isReadOnly) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      },
      [isReadOnly, onClick],
    );

        const radioRootClassName = cn(
            'winicomponent winiradio',
            uiTokens.map((token) => `winiradio--${token}`),
            !isUiMode && className,
            isReadOnly && 'Mui-readOnly',
        );

        const renderRadio = () => (
            <Radio
                {...restProps}
                ref={ref}
                className={radioRootClassName}
                disableRipple
                icon={radioIcon}
                checkedIcon={radioCheckedIcon}
                inputProps={mergedInputProps}
                onChange={handleChange}
                onClick={handleClick}
                sx={[baseRadioSx, sxProp]}
            >
                {children}
            </Radio>
        );

        if (isUiMode) {
            const layoutClassName =
                layoutUi === 'column' ? 'flex-col items-start' : 'items-center';

            return (
                <FormControl
                    disabled={disabled}
                    sx={{
                        '--wini-font-size': sizeTokens.fontSize,
                        display: 'flex',
                    }}
                >
                    <Box className={cn('winicompo winiradio flex', layoutClassName, className)}>
                        {label !== undefined && label !== null ? (
                            <Typography
                                component="label"
                                className={labelClassName}
                                sx={[
                                    {
                                        minWidth: titleFix ? '130px' : undefined,
                                        flexShrink: 0,
                                        fontSize: 'var(--wini-font-size)',
                                        color:
                                            labelColor ?? (!hasLabelClassName
                                                ? (disabled
                                                    ? color.text.sub
                                                    : isReadOnly
                                                    ? color.text.sub
                                                    : required
                                                    ? color.text.point
                                                    : color.text.sub)
                                                : undefined),
                                    },
                                    labelSx,
                                ]}
                            >
                                {label}
                                {required && ' *'}
                            </Typography>
                        ) : null}
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>{renderRadio()}</Box>
                    </Box>
                </FormControl>
            );
        }

    const labelText = label ?? '';
    const labelNode = (
      <>
        {labelText}
        {required}
      </>
    );
    const {
      sx: labelPropsSx,
      className: labelPropsClassName,
            slotProps: labelSlotProps,
      ...restLabelProps
    } = labelProps ?? {};
     const mergedLabelSlotProps = {
                ...(labelSlotProps ?? {}),
                typography: {
                    ...(labelSlotProps?.typography ?? {}),
                    className: cn(labelSlotProps?.typography?.className, labelClassName),
                },
            };

        if (labelText !== '') {
            return (
                <FormControlLabel
                    {...restLabelProps}
                    disabled={disabled}
                    control={renderRadio()}
                    label={labelNode}
                    className={cn('winicomponent winiradio-label', labelPropsClassName)}
                    slotProps={mergedLabelSlotProps}
                    sx={[
                        {
                            margin: 0,
                            gap: '4px',
                            marginRight: '24px',
                            '.MuiFormControlLabel-label': {
                                fontSize: sizeTokens.fontSize,
                                color:
                                    labelColor ?? (!hasLabelClassName
                                        ? (disabled
                                            ? color.text.sub
                                            : isReadOnly
                                            ? color.text.sub
                                            : required
                                            ? color.text.point
                                            : color.text.sub)
                                        : undefined),
                                    '&.Mui-disabled': {
                                        color: color.text.sub,
                                    }

                                    
                            },
                            '&.Mui-required': {
                                color: color.text.point,
                            },
                        },
                        labelPropsSx,
                    ]}
                />
            );
        }

    return renderRadio();
  },
);

export default WiniRadio;
