import { forwardRef, useId } from 'react';
import TextField from '@mui/material/TextField';
import { Box, FormControl, OutlinedInput, Typography } from '@mui/material';
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
  `transform ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms, color ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width ${durationMs}ms cubic-bezier(0, 0, 0.2, 1) 0ms`;

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

// 사이즈
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

const WiniText = forwardRef(
  (
    {
      children,
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
      titleFix,
      ...props
    },
    ref,
  ) => {
    const required = props.required === true;
    const isTextarea = props.multiline === true;
    const slotProps = slotPropsProp ?? {};
    const variantKey = variant ?? 'outlined';
    const sizeTokens = SIZE_TOKENS[sizeProp] ?? SIZE_TOKENS.small;
    const heightOverride = toCssSize(pickSxValue(sxProp, 'height'));
    const classHeight = getHeightFromClassName(className);
    const controlHeight = heightOverride ?? classHeight ?? sizeTokens.height;
    const labelConfig = LABEL_CONFIG[variantKey] ?? LABEL_CONFIG.outlined;
    const labelY = isTextarea
      ? 'var(--wini-label-y-multiline)'
      : 'var(--wini-label-y)';
    const hasShrinkConfig = labelConfig.shrinkY !== undefined;
    const uid = useId();
    const inputId = props.id ?? props.inputProps?.id ?? `wini-text-${uid}`;
    const uiTokens = getUiTokens(ui);
    const layoutUi = getLastUiToken(uiTokens, ['row', 'column']);
    const isUiMode = layoutUi !== undefined;

    if (isUiMode) {
      const layoutClassName =
        layoutUi === 'column' ? 'flex-col items-start' : 'items-center';
      const isReadOnly = props.readOnly ?? slotProps.input?.readOnly ?? false;
      const { inputProps: inputPropsProp, maxLength, ...restProps } = props;

      const inputSlotProps = slotProps?.input ?? {};
      const {
        startAdornment: startAdornmentFromSlot,
        endAdornment: endAdornmentFromSlot,
        inputProps: inputPropsFromInputSlot = {},
        ...outlinedInputPropsFromSlot
      } = inputSlotProps;
      const htmlInputSlotProps = {
        ...inputPropsFromInputSlot,
        ...slotProps?.htmlInput,
      };

      const resolvedStartAdornment = startAdornmentFromSlot || undefined;
      const resolvedEndAdornment = endAdornmentFromSlot || undefined;

      return (
        <FormControl
          disabled={props.disabled}
          sx={{
            '--wini-control-h': controlHeight,
            '--wini-font-size': sizeTokens.fontSize,
            '--wini-input-pad-x': '8px',
            '--wini-input-pad-y': '8px',
            display: 'flex',
            width: '100%',
          }}
        >
          <Box className={cn('winicomponent winitext flex', layoutClassName, className)}>
            {props.label !== undefined && props.label !== null ? (
              <Typography
                component="label"
                htmlFor={inputId}
                className={labelClassName}
                sx={[
                  {
                    minWidth: titleFix ? '130px' : undefined,
                    marginRight:  layoutUi === 'row' ? `${size.margin.md}` : undefined,
                    marginBottom:
                      layoutUi === 'column' ? `${size.margin.sm}` : undefined,
                    flexShrink: 0,
                    fontSize: 'var(--wini-font-size)',
                    fontWeight: 700,
                    color: props.disabled
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
                {props.label}
                {required && ' *'}
              </Typography>
            ) : null}

            <OutlinedInput
              {...restProps}
              {...outlinedInputPropsFromSlot}
              id={inputId}
              ref={ref}
              readOnly={isReadOnly}
              disabled={props.disabled}
              startAdornment={resolvedStartAdornment}
              endAdornment={resolvedEndAdornment}
              inputProps={{
                ...(maxLength !== undefined ? { maxLength } : {}),
                ...htmlInputSlotProps,
                ...inputPropsProp,
                className: cn(
                  htmlInputSlotProps?.className,
                  inputPropsProp?.className,
                  inputClassName,
                ),
              }}
              sx={[
                {
                  flex: 1,
                  fontSize: 'var(--wini-font-size)',
                  color: color.text.sub,
                  minHeight: 'var(--wini-control-h)',
                  lineHeight: 'var(--wini-control-h)',
                  width: '100%',
                  backgroundColor: color.background.white,
                  paddingRight: 0,
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

                  '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: color.border.default,
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
                    backgroundColor: color.background.white,
                    '&:read-only': {
                      backgroundColor: color.background.readonly,
                      color: color.text.disabledDark,
                      '&:disabled': {
                        backgroundColor: color.border.disabled,
                      },
                      '&:not(:disabled) + .MuiOutlinedInput-notchedOutline': {
                        borderColor: color.border.disabled,
                      },
                    },

                    '::placeholder': {
                      color: color.text.sub,
                      opacity: 1,
                    },

                    WebkitTextFillColor: props.disabled
                      ? color.text.disabled
                      : isReadOnly
                        ? color.text.sub
                        : 'inherit',
                  },

                  '& legend > span': {
                    display: 'none',
                  },

                  ...(isTextarea
                    ? {
                        '&.MuiInputBase-multiline': {
                          padding:
                            'var(--wini-input-pad-y) var(--wini-input-pad-x)',
                          lineHeight: 'var(--lh-normal)',
                          '::placeholder': {
                            color: color.text.sub,
                            opacity: 1,
                          },
                        },
                        '& .MuiInputBase-inputMultiline': {
                          padding: 0,
                          minHeight: `calc(${controlHeight} - var(--wini-input-pad-y) * 2)`,
                          boxSizing: 'border-box',
                          '&::placeholder': {
                            color: color.text.sub,
                            opacity: 1,
                          },
                        },
                      }
                    : {}),
                },
                inputSx,
                sxProp,
              ]}
            />
          </Box>
        </FormControl>
      );
    }

    return (
      <TextField
        {...(() => {
          const { maxLength, ...textFieldProps } = props;
          return textFieldProps;
        })()}
        ref={ref}
        variant={variant}
        className={cn('winicomponent winitext', className)}
        slotProps={{
          ...slotProps,
          input: {
            ...slotProps.input,
            className: cn(slotProps.input?.className, inputClassName),
          },

          htmlInput: {
            ...(props.maxLength !== undefined ? { maxLength: props.maxLength } : {}),
            ...slotProps.htmlInput,
            className: cn(slotProps.htmlInput?.className, inputClassName),
          },

          inputLabel: {
            ...slotProps.inputLabel,
            className: cn(slotProps.inputLabel?.className, labelClassName),
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
            '--wini-label-y-multiline':
              'min(var(--wini-label-y), calc(var(--wini-input-pad-y) + (var(--wini-font-size) / 2)))',
            '--wini-label-x': labelConfig.x,
            '--wini-label-transition': buildLabelTransition(
              labelConfig.duration,
            ),
            display: 'flex',
            backgroundColor: color.background.white,
            width: '100%',

            '& .MuiInputBase-input': {
              fontSize: 'var(--wini-font-size)',
              fontWeight: 500,
              height: isTextarea ? 'auto' : 'var(--wini-control-h)',
              padding: 'var(--wini-input-pad-y) var(--wini-input-pad-x)',
              boxSizing: 'border-box',
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
              transform: `translate(var(--wini-label-x), ${labelY})`,
              color: required ? color.text.point : color.text.sub,
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

            ...(isTextarea
              ? {
                  '& .MuiInputBase-multiline': {
                    padding: 'var(--wini-input-pad-y) var(--wini-input-pad-x)',
                    lineHeight: 'var(--lh-normal)',
                    '::placeholder': {
                      color: color.text.sub,
                      opacity: 1,
                    },
                  },

                  '& .MuiInputBase-inputMultiline': {
                    padding: 0,
                    minHeight: `calc(${controlHeight} - var(--wini-input-pad-y) * 2)`,
                    boxSizing: 'border-box',
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
      >
        {children}
      </TextField>
    );
  },
);

export default WiniText;
