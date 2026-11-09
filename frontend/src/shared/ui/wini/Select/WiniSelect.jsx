import { useEffect, useMemo, useState, forwardRef, useId } from 'react';
import Select from '@mui/material/Select';
import { Box, FormControl, InputLabel, Typography } from '@mui/material';
import { cn } from '@/shared/lib/cn';
import { getLastUiToken, getUiTokens } from '@/shared/config/theme/uiTokens';
import { WiniIcon } from '@/shared/ui/wini';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
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

const normalizeSx = (value) => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

const escapeSelectorValue = (value) =>
  String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const WiniSelect = forwardRef(
  (
    {
      children,
      size: sizeProp = 'small',
      variant = 'outlined',
      className,
      labelClassName,
      labClassName,
      label,
      labelProps: labelPropsProp = {},
      formSx = {},
      labelSx = {},
      ui,
      containerClassName,
      sx: selectSxProp = {},
      fullWidth,
      margin,
      error,
      shrink,
      titleFix,
      inputClassName,
      ...selectProps
    },
    ref,
  ) => {
    const required = selectProps.required === true;
    const disabled = selectProps.disabled === true;
    const resolvedLabelClassName = labelClassName ?? labClassName;
    const variantKey = variant ?? 'outlined';
    const sizeTokens = SIZE_TOKENS[sizeProp] ?? SIZE_TOKENS.small;
    const heightOverride = toCssSize(pickSxValue(selectSxProp, 'height'));
    const classHeight = getHeightFromClassName(className);
    const controlHeight = heightOverride ?? classHeight ?? sizeTokens.height;
    const labelConfig = LABEL_CONFIG[variantKey] ?? LABEL_CONFIG.outlined;
    const uid = useId();
    const [externalLabelId, setExternalLabelId] = useState();
    const generatedLabelId = `wini-select-label-${uid}`;
    const generatedInputId = `wini-select-${uid}`;
    const rawSelectDisplayProps = selectProps.SelectDisplayProps ?? {};
    const {
      inputClassName: displayInputClassName,
      className: displayClassName,
      id: displayIdProp,
      ...restSelectDisplayProps
    } = rawSelectDisplayProps;
    const labelId = selectProps.labelId ?? generatedLabelId;
    const inputId = selectProps.id ?? generatedInputId;
    const displayId = displayIdProp ?? `${inputId}-display`;
    const uiTokens = getUiTokens(ui);
    const layoutUi = getLastUiToken(uiTokens, ['row', 'column']);
    const isUiMode = layoutUi !== undefined;
    const isReadOnly =
      selectProps.readOnly === true ||
      selectProps.inputProps?.readOnly === true;

    const commonFormSx = {
      width: '100%',
      '--wini-control-h': controlHeight,
      '--wini-font-size': sizeTokens.fontSize,
      '--wini-input-pad-x': '8px',
      '--wini-label-line-height': 'var(--lh-normal)',
      '--wini-label-y':
        'calc((var(--wini-control-h) - (var(--wini-font-size) * var(--wini-label-line-height))) / 2)',
      '--wini-label-x': labelConfig.x,
      '--wini-label-transition': buildLabelTransition(labelConfig.duration),
      display: 'flex',
      '& .MuiInputLabel-root': {
        fontSize: 'var(--wini-font-size)',
        color: required ? color.text.point : color.text.sub,
        transformOrigin: 'top left',
        transition: 'var(--wini-label-transition)',
        zIndex: 1,
        '&.Mui-focused': {
          color: required ? color.text.point : color.primary.main,
        },
        '&.Mui-disabled': {
          color: color.text.disabled,
        },
        '&:not(.MuiInputLabel-shrink)': {
          fontWeight: 500,
          transform: `translate(var(--wini-label-x), var(--wini-label-y))`,
          color: color.text.sub,
          '&.Mui-disabled': {
            color: color.text.disabled,
          },
        },
      },
      '& .winiicon ': {
        fontSize: 20,
        color: color.text.dark,
      },
      '& .Mui-disabled': {
        '& .winiicon ': {
          color: color.text.disabled,
        },
      },
      ...(labelConfig.shrinkY !== undefined
        ? {
            '& .MuiInputLabel-root.MuiInputLabel-shrink': {
              transform: `translate(var(--wini-label-x), ${labelConfig.shrinkY}) scale(${labelConfig.shrinkScale})`,
            },
          }
        : {}),
    };

    const variantFormSx =
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
                  ...(isReadOnly && {
                    borderColor: color.border.disabled,
                  }),
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
                  borderColor: color.border.disabled,
                  ...(isUiMode && {
                    borderColor: color.border.default,
                  }),
                },
              },
            };

    const formControlSx = [commonFormSx, variantFormSx, ...normalizeSx(formSx)];

    const DownIconComponent = useMemo(
      () =>
        forwardRef(function SelectDownIcon(props, ref) {
          const { className, sx, ...rest } = props;

          return (
            <WiniIcon
              {...rest}
              ref={ref}
              icon="down"
              className={cn(className)}
            />
          );
        }),
      [],
    );

    const baseSelectSx = {
      fontSize: 'var(--wini-font-size)',
      fontWeight: 500,
      minWidth: titleFix ? '130px' : undefined,
      marginRight: 0,
      minHeight: 'var(--wini-control-h)',
      color: color.text.sub,
      boxShadow: 'none',
      backgroundColor: color.background.white,
      '& .MuiSelect-select': {
        minHeight: 'var(--wini-control-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--wini-input-pad-x)',
        ...(isUiMode && {
          '&.Mui-disabled': {
            WebkitTextFillColor: color.text.disabledDark,
          },
        }),
      },
      '&.Mui-disabled .MuiSelect-select': {
        color: color.text.disabled,
      },
      ...(isUiMode && {
        ...(isReadOnly && {
          backgroundColor: color.background.readonly,
          color: color.text.disabledDark,
          '& .winiicon ': {
            color: color.text.default,
          },
        }),
        '&.Mui-disabled ': {
          backgroundColor: color.background.disabledDark,
          '& .MuiSelect-select': {
            backgroundColor: color.background.disabledDark,
          },
          '& .winiicon ': {
            color: color.text.default,
          },
        },
      }),
    };

    const selectSx = [baseSelectSx, ...normalizeSx(selectSxProp)];

    const menuProps = {
      PaperProps: {
        sx: {
          boxShadow: 'none',
          border: `1px solid ${color.gray.c_ddd}`,
          borderRadius: size.margin.sm,
          maxWidth: '100%',
          '& .MuiMenu-list': {
            padding: `${size.margin.sm} 0`,
          },
          '& .MuiMenuItem-root': {
            padding: `${size.margin.sm} ${size.margin.md}`,
            fontSize: 'var(--wini-font-size)',
            color: color.text.default,
            fontWeight: 500,
          },
          '& .winilistsubheader ': {
            lineHeight: 'var(--lh-normal)',
          },
        },
      },
    };

    useEffect(() => {
      if (label || selectProps.labelId || typeof document === 'undefined') {
        setExternalLabelId(undefined);
        return undefined;
      }

      const labelElements = Array.from(
        document.querySelectorAll(
          `label[for="${escapeSelectorValue(inputId)}"]`,
        ),
      );

      if (!labelElements.length) {
        setExternalLabelId(undefined);
        return undefined;
      }

      const nextLabelId = labelElements[0].id || `${inputId}-label`;

      labelElements.forEach((element, index) => {
        if (!element.id) {
          element.id =
            index === 0 ? nextLabelId : `${nextLabelId}-${index + 1}`;
        }
      });

      setExternalLabelId(nextLabelId);

      const handleFocusFromLabel = () => {
        document.getElementById(displayId)?.focus();
      };

      labelElements.forEach((element) => {
        element.addEventListener('click', handleFocusFromLabel);
      });

      return () => {
        labelElements.forEach((element) => {
          element.removeEventListener('click', handleFocusFromLabel);
        });
      };
    }, [displayId, inputId, label, selectProps.labelId]);

    const mergedSelectClass = cn('winicomponent winiselect', className);
    const selectSize = sizeProp === 'large' ? 'medium' : sizeProp;

    const { shrink: _labelShrink, ...safeLabelProps } = labelPropsProp;

    const { shrink: _slotShrink, ...slotInputRest } =
      selectProps.slotProps?.input ?? {};
    const { shrink: _inputShrink, ...inputPropsRest } =
      selectProps.inputProps ?? {};
    const hasNonEmptyValue = (value) => {
      if (value === undefined || value === null) return false;
      if (Array.isArray(value)) return value.length > 0;
      return value !== '';
    };

    const inferredShrink = hasNonEmptyValue(
      selectProps.value ?? selectProps.defaultValue,
    )
      ? true
      : undefined;

    const resolvedShrink =
      shrink ?? _labelShrink ?? _slotShrink ?? _inputShrink ?? inferredShrink;

    const mergedInputProps = {
      ...inputPropsRest,
      id: inputId,
      onFocus: (event) => {
        inputPropsRest?.onFocus?.(event);
        if (typeof document !== 'undefined') {
          document.getElementById(displayId)?.focus();
        }
      },
    };

    const mergedSelectDisplayProps = {
      ...restSelectDisplayProps,
      id: displayId,
      className: cn(displayClassName, displayInputClassName, inputClassName),
    };

    const safeSelectProps = {
      ...selectProps,
      ...(selectProps.slotProps != null && {
        slotProps: { ...selectProps.slotProps, input: slotInputRest },
      }),
      inputProps: mergedInputProps,
      SelectDisplayProps: mergedSelectDisplayProps,
    };

    if (isUiMode) {
      const layoutClassName =
        layoutUi === 'column' ? 'flex-col items-start' : 'items-center';
      const resolvedLabelId = label ? labelId : externalLabelId;

      return (
        <FormControl
          variant={variantKey}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          margin={margin}
          error={error}
          sx={formControlSx}
        >
          <Box className={cn('flex', layoutClassName, containerClassName)}>
            {label ? (
              <Typography
                component="label"
                id={labelId}
                htmlFor={inputId}
                className={resolvedLabelClassName}
                sx={[
                  {
                    minWidth: titleFix ? '130px' : undefined,
                    marginRight:
                      layoutUi === 'row' ? `${size.margin.md}` : undefined,
                    marginBottom:
                      layoutUi === 'column' ? `${size.margin.sm}` : undefined,
                    flexShrink: 0,
                    fontSize: 'var(--wini-font-size)',
                    fontWeight: 700,
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
            <Select
              {...safeSelectProps}
              id={displayId}
              labelId={resolvedLabelId}
              label={undefined}
              variant={variantKey}
              size={selectSize}
              className={mergedSelectClass}
              sx={[{ flex: 1, width: '100%', minWidth: 0 }, ...selectSx]}
              MenuProps={menuProps}
              ref={ref}
              IconComponent={DownIconComponent}
            >
              {children}
            </Select>
          </Box>
        </FormControl>
      );
    }

    return (
      <FormControl
        variant={variantKey}
        required={required}
        disabled={disabled}
        fullWidth={fullWidth}
        margin={margin}
        error={error}
        sx={formControlSx}
      >
        {label ? (
          <InputLabel
            id={labelId}
            htmlFor={inputId}
            className={resolvedLabelClassName}
            sx={labelSx}
            shrink={resolvedShrink}
            {...safeLabelProps}
          >
            {label}
          </InputLabel>
        ) : null}

        <Select
          {...safeSelectProps}
          id={displayId}
          labelId={label ? labelId : externalLabelId}
          label={label}
          variant={variantKey}
          size={selectSize}
          className={mergedSelectClass}
          sx={selectSx}
          MenuProps={menuProps}
          ref={ref}
          IconComponent={DownIconComponent}
        >
          {children}
        </Select>
      </FormControl>
    );
  },
);

export default WiniSelect;
