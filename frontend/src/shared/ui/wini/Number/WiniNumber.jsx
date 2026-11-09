import { forwardRef, useId } from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, OutlinedInput, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

TextField.defaultProps = {
  classes: { root: ['Wini_default_TextField_Height'] },
};

const SIZE_TOKENS = {
  small: { height: size.objH.sm, fontSize: size.text.sm },
  medium: { height: size.objH.md, fontSize: size.text.md },
  large: { height: size.objH.lg, fontSize: size.text.lg },
};

const buildLabelTransition = (durationMs) =>
  `transform ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms,
   color ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms,
   max-width ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms`;

const LABEL_CONFIG = {
  outlined: { x: '12px', duration: 200 },
  filled: { x: '12px', duration: 150, shrinkY: '-7px', shrinkScale: 0.75 },
  standard: { x: '0px', duration: 150, shrinkY: '-7px', shrinkScale: 0.75 },
};

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
  if (value == null) return undefined;
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

const NumericFormatInput = forwardRef(
  function NumericFormatInput(props, ref) {
    const { onChange, name, valueIsNumericString = true, ...other } = props;
    return (
      <NumericFormat
        {...other}
        name={name}
        valueIsNumericString={valueIsNumericString}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange?.({
            target: {
              name,
              value: values.value,
            },
          });
        }}
      />
    );
  },
);

const WiniNumber = forwardRef((props, ref) => {
  const {
    size: sizeProp = 'small',
    className,
    inputClassName,
    labelClassName,
    variant,
    ui,
    labelSx = {},
    inputSx = {},
    sx: sxProp = {},
    slotProps: slotPropsProp,
    InputProps: InputPropsProp,
    inputProps: inputPropsProp,
    label,
    startAdornment: propStartAdornment,
    endAdornment: propEndAdornment,
    titleFix,
    thousandSeparator,
    decimalSeparator,
    maxLength,
    ...restProps
  } = props;

  const numericFormatProps = {
    ...(thousandSeparator !== undefined && { thousandSeparator }),
    ...(decimalSeparator !== undefined && { decimalSeparator }),
  };

  const required = restProps.required === true;
  const slotProps = slotPropsProp ?? {};
  const slotInput = slotProps.input ?? {};
  const {
    startAdornment: slotInputStartAdornment,
    endAdornment: slotInputEndAdornment,
    ...slotInputRest
  } = slotInput;
  const slotHtmlInput = slotProps.htmlInput ?? {};
  const slotInputLabel = slotProps.inputLabel ?? {};
  const variantKey = variant ?? 'outlined';

  // slotProps에서 adornment 가져오기
  const derivedStartAdornment = slotInputStartAdornment ?? propStartAdornment;
  const derivedEndAdornment = slotInputEndAdornment ?? propEndAdornment;

  const normalizedSlotProps = {
    ...slotProps,
    input: slotInputRest,
    htmlInput: slotHtmlInput,
    inputLabel: slotInputLabel,
  };

  const sizeTokens = SIZE_TOKENS[sizeProp] ?? SIZE_TOKENS.small;
  const heightOverride = toCssSize(pickSxValue(sxProp, 'height'));
  const classHeight = getHeightFromClassName(className);
  const controlHeight = heightOverride ?? classHeight ?? sizeTokens.height;

  const labelConfig = LABEL_CONFIG[variantKey] ?? LABEL_CONFIG.outlined;
  const labelY = 'var(--wini-label-y)';
  const hasShrinkConfig = labelConfig.shrinkY !== undefined;

  const uid = useId();
  const inputId = restProps.id ?? inputPropsProp?.id ?? `wini-number-${uid}`;

  const uiTokens = getUiTokens(ui);
  const layoutUi = getLastUiToken(uiTokens, ['row', 'column']);
  const isUiMode = layoutUi !== undefined;

  /**
   * =====================================
   * 좌측 label (ui=row / column)
   * =====================================
   */
  if (isUiMode) {
    const layoutClass =
      layoutUi === 'column' ? 'flex-col items-start' : 'items-center';

    const isReadOnly = restProps.readOnly ?? slotInput.readOnly ?? false;

    return (
      <FormControl
        disabled={restProps.disabled}
        sx={{
          '--wini-control-h': controlHeight,
          '--wini-font-size': sizeTokens.fontSize,
          '--wini-input-pad-x': '8px',
          '--wini-input-pad-y': '8px',
          display: 'flex',
        }}
      >
        <Box className={cn('winicomponent wininumber flex', layoutClass, className)}>
          {label != null && (
            <Typography
              component="label"
              htmlFor={inputId}
              className={labelClassName}
              sx={[
                {
                  minWidth: titleFix ? '130px' : undefined,
                  marginRight: layoutUi === 'row' ? `${size.margin.md}` : undefined,
                  marginBottom:
                    layoutUi === 'column' ? `${size.margin.sm}` : undefined,
                  flexShrink: 0,
                  fontSize: 'var(--wini-font-size)',
                  fontWeight: 700,
                  color: restProps.disabled
                    ? color.text.sub
                    : isReadOnly
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
          )}

          <OutlinedInput
            {...restProps}
            id={inputId}
            ref={ref}
            readOnly={isReadOnly}
            inputComponent={NumericFormatInput}
            startAdornment={derivedStartAdornment}
            endAdornment={derivedEndAdornment}
            inputProps={{
              ...(maxLength !== undefined ? { maxLength } : {}),
              ...numericFormatProps,
              ...inputPropsProp,
              className: cn(inputPropsProp?.className, inputClassName),
            }}
            slotProps={normalizedSlotProps}
            sx={[
              {
                flex: 1,
                fontSize: 'var(--wini-font-size)',
                color: color.text.sub,
                height: 'var(--wini-control-h)',
                lineHeight: 'var(--wini-control-h)',
                width: '100%',
                backgroundColor: color.background.white,

                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.border.default,
                  '& legend': {
                    height: '11px',
                  },
                },

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.primary.hover,
                  borderWidth: 2,
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.primary.main,
                  borderWidth: 2,
                },

                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.border.default,
                },

                '&.Mui-disabled': {
                  backgroundColor: color.background.disabledDark,
                },

                '&.Mui-readOnly': {
                  backgroundColor: color.background.readonly,
                  color: color.text.disabledDark,
                },
                '&.MuiInputBase-readOnly:not(.Mui-focused) .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: color.border.disabled,
                },

                '& input': {
                  padding: 'var(--wini-input-pad-y) var(--wini-input-pad-x)',
                  fontWeight: 500,
                  boxSizing: 'border-box',
                  height: '100%',
                  borderRadius: 'inherit',
                  textAlign: 'right',

                  '::placeholder': {
                    color: color.text.sub,
                    opacity: 1,
                  },

                  WebkitTextFillColor: restProps.disabled
                    ? color.text.disabled
                    : isReadOnly
                      ? color.text.sub
                      : 'inherit',
                },

                '& legend > span': {
                  display: 'none',
                },

                '& .winiinputadornment': {
                  marginLeft: '0px',
                  color: color.text.dark,
                  ' p': {
                    color: 'inherit',
                    fontWeight: '600',
                    fontSize: 'var(--wini-font-size)',
                  },
                },
              },
              inputSx,
              sxProp,
            ]}
          />
        </Box>
      </FormControl>
    );
  }

  /**
   * =====================================
   * 상단 label (TextField)
   * =====================================
   */
  return (
    <TextField
      {...restProps}
      ref={ref}
      label={label}
      variant={variant}
      className={cn('winicomponent wininumber', className)}
      InputProps={{
        ...InputPropsProp,
        inputComponent: NumericFormatInput,
        startAdornment: derivedStartAdornment,
        endAdornment: derivedEndAdornment,
      }}
      inputProps={{
        ...(maxLength !== undefined ? { maxLength } : {}),
        ...numericFormatProps,
        ...inputPropsProp,
        className: cn(inputPropsProp?.className, inputClassName),
      }}
      slotProps={{
        ...normalizedSlotProps,
        input: {
          ...slotInputRest,
          className: cn(slotInputRest?.className, inputClassName),
        },
        htmlInput: {
          ...slotHtmlInput,
          className: cn(slotHtmlInput?.className, inputClassName),
        },
        inputLabel: {
          ...slotInputLabel,
          className: cn(slotInputLabel?.className, labelClassName),
        },
      }}
      sx={[
        {
          '--wini-control-h': controlHeight,
          '--wini-font-size': sizeTokens.fontSize,
          '--wini-input-pad-x': '8px',
          '--wini-input-pad-y': '8px',
          '--wini-label-line-height': 'var(--lh-normal)',
          '--wini-label-y':
            'calc((var(--wini-control-h) - (var(--wini-font-size) * var(--wini-label-line-height))) / 2)',
          '--wini-label-x': labelConfig.x,
          '--wini-label-transition': buildLabelTransition(labelConfig.duration),
          display: 'flex',

          '& .MuiInputBase-input': {
            fontSize: 'var(--wini-font-size)',
            fontWeight: 500,
            height: 'var(--wini-control-h)',
            padding: 'var(--wini-input-pad-y) var(--wini-input-pad-x)',
            boxSizing: 'border-box',
            color: color.text.dark,
            textAlign: 'right',
            backgroundColor: color.background.white,
            '::placeholder': {
              color: color.text.sub,
              opacity: 1,
            },

            '&.Mui-disabled': {
              color: color.text.disabled,
              WebkitTextFillColor: color.text.disabled,
            },
          },

          '& .Mui-disabled.MuiInputBase-root': {
            backgroundColor: color.background.disabled,
          },
          '& .MuiInputLabel-root': {
            fontSize: 'var(--wini-font-size)',
            color: required ? color.text.point : color.text.sub,
            transformOrigin: 'top left',
            transition: 'var(--wini-label-transition)',
          },

          '& .MuiInputLabel-root.Mui-focused': {
            color: required ? color.text.point : color.primary.main,
          },

          '& .MuiInputLabel-root.Mui-disabled': {
            color: color.text.disabled,
          },

          '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
            fontWeight: 500,
            transform: `translate(var(--wini-label-x), ${labelY})`,
            color: required ? color.text.point : color.text.sub,
          },

          '& .winiinputadornment': {
            marginLeft: '0px',
            color: color.text.dark,
            ' p': {
              color: 'inherit',
              fontWeight: '600',
              fontSize: 'var(--wini-font-size)',
            },
          },
          ...(hasShrinkConfig
            ? {
              '& .MuiInputLabel-root.MuiInputLabel-standard.MuiInputLabel-shrink':
              {
                transform: `translate(var(--wini-label-x), ${labelConfig.shrinkY}) scale(${labelConfig.shrinkScale})`,
              },

              '& .MuiInputLabel-root.MuiInputLabel-filled.MuiInputLabel-shrink':
              {
                transform: `translate(var(--wini-label-x), ${labelConfig.shrinkY}) scale(${labelConfig.shrinkScale})`,
              },
            }
            : {}),
        },

        variantKey === 'filled'
          ? {
            '& .MuiFilledInput-root': {
              backgroundColor: color.background.offwhite,
              '&:before': {
                borderBottom: `1px solid ${color.border.default}`,
              },

              '&:hover:before': {
                borderBottomColor: color.primary.hover,
                borderBottomWidth: 2,
              },

              '&.Mui-focused:after': {
                borderBottomColor: color.primary.main,
                borderBottomWidth: 2,
              },

              '&.MuiInputBase-readOnly:not(.Mui-focused):before': {
                borderBottomColor: color.border.disabled,
              },

              '&.Mui-disabled': {
                backgroundColor: color.background.disabled,
              },

              '&.Mui-disabled:before': {
                borderBottomColor: color.border.disabled,
              },
            },
          }
          : variantKey === 'standard'
            ? {
              '& .MuiInput-root': {
                margin: 0,
                '&:before': {
                  borderBottom: `1px solid ${color.border.default}`,
                },

                '&:hover:not(.Mui-disabled):before': {
                  borderBottomColor: color.primary.hover,
                  borderBottomWidth: 2,
                },

                '&.Mui-focused:after': {
                  borderBottomColor: color.primary.main,
                  borderBottomWidth: 2,
                },

                '&.MuiInputBase-readOnly:not(.Mui-focused):before': {
                  borderBottomColor: color.border.disabled,
                },

                '&.Mui-disabled:before': {
                  borderBottomStyle: 'solid',
                  borderBottomColor: color.border.disabled,
                },
              },
            }
            : {
              '& .MuiOutlinedInput-root': {
                height: 'var(--wini-control-h)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.border.default,
                },

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.primary.hover,
                  borderWidth: 2,
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.primary.main,
                  borderWidth: 2,
                },

                '&.MuiInputBase-readOnly:not(.Mui-focused) .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: color.border.disabled,
                },

                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: color.border.disabled,
                },
              },
            },
        sxProp,
      ]}
    />
  );
});

export default WiniNumber;
