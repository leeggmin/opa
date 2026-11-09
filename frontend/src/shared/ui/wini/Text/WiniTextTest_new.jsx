import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import { withWini } from '@/shared/lib/theme';
import { cn } from '@/shared/lib/cn';

const WiniText = forwardRef(
  (
    {
      size = 'small',
      sx: sxProp = {},
      className,
      inputClassName,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    const required = props.required === true;
    const isTextarea = props.multiline === true;

    // 루트 className 병합(공백 포함)
    const mergedRoot = cn(
      'winicomponent winitext Wini_default_TextField_Height',
      className,
    );

    // theme 값 + 동적 계산값을 CSS 변수로 주입(디자인은 className이 담당)
    const resolveVars = (theme) => {
      const c = theme.customTheme?.colors ?? {};
      const sizeStyle =
        theme.customTheme?.sizes?.input?.[size] ??
        theme.customTheme?.sizes?.input?.small;

      const resolvedHeight = sxProp?.height ?? sizeStyle?.height ?? 32;
      const fontSize = sizeStyle?.fontSize ?? 14;
      const labelFontSize = sizeStyle?.labelFontSize ?? 11;

      // 원본과 동일한 labelY 계산
      const labelLineHeight = 1.4375;
      const labelY = (resolvedHeight - fontSize * labelLineHeight) / 2;

      return {
        // 치수
        '--wini-input-h': `${resolvedHeight}px`,
        '--wini-font-size': `${fontSize}px`,
        '--wini-label-font-size': `${labelFontSize}px`,
        '--wini-label-y': `${labelY}px`,

        // 색(원본 sx의 theme 토큰을 그대로 변수로)
        '--wini-border-default': c.border?.default ?? '#e5e7eb',
        '--wini-border-main': c.border?.main ?? '#3b82f6',
        '--wini-text-default': c.text?.default ?? '#111827',
        '--wini-text-main': c.text?.main ?? '#3b82f6',
        '--wini-text-disabled': c.text?.disabled ?? '#9ca3af',
        '--wini-gray-eee': c.gray?.eee ?? '#eeeeee',

        // required일 때 라벨 기본색
        '--wini-label-base': required
          ? (c.text?.main ?? '#3b82f6')
          : (c.text?.default ?? '#111827'),
      };
    };

    const defaultTw = [
      // === 래퍼 높이/폰트(원본 slotProps.input.sx 역할) ===
      '[&_.MuiInputBase-root]:h-[var(--wini-input-h)]',
      '[&_.MuiOutlinedInput-root]:h-[var(--wini-input-h)]',
      '[&_.MuiInputBase-root]:text-[length:var(--wini-font-size)]',
      '[&_.MuiOutlinedInput-root]:text-[length:var(--wini-font-size)]',

      // === Outlined border ===
      '[&_.MuiOutlinedInput-notchedOutline]:[border-color:var(--wini-border-default)]',
      'hover:[&_.MuiOutlinedInput-notchedOutline]:[border-color:var(--wini-border-default)]',
      'hover:[&_.MuiOutlinedInput-notchedOutline]:border-2',
      '[&_.MuiOutlinedInput-root.Mui-focused_.MuiOutlinedInput-notchedOutline]:[border-color:var(--wini-border-main)]',
      '[&_.MuiOutlinedInput-root.Mui-focused_.MuiOutlinedInput-notchedOutline]:border-2',
      '[&_.MuiOutlinedInput-root.Mui-disabled_.MuiOutlinedInput-notchedOutline]:[border-color:var(--wini-border-default)]',
      // readOnly (원본 셀렉터 유지)
      '[&_.MuiOutlinedInput-root.MuiInputBase-readOnly:not(.Mui-focused)_.MuiOutlinedInput-notchedOutline]:[border-color:var(--wini-border-default)]',

      // === Input (원본 & .MuiInputBase-input) ===
      '[&_.MuiInputBase-input]:text-[length:var(--wini-font-size)]',
      '[&_.MuiInputBase-input]:font-medium',
      '[&_.MuiInputBase-input]:h-[var(--wini-input-h)]',
      '[&_.MuiInputBase-input]:p-2', // 8px
      '[&_.MuiInputBase-input]:box-border',
      '[&_.MuiInputBase-input]:[color:var(--wini-text-default)]',
      '[&_.MuiInputBase-input::placeholder]:[color:var(--wini-text-default)]',
      '[&_.MuiInputBase-input::placeholder]:opacity-100',

      // disabled input
      '[&_.MuiInputBase-input.Mui-disabled]:[background-color:var(--wini-gray-eee)]',
      '[&_.MuiInputBase-input.Mui-disabled]:[color:var(--wini-text-disabled)]',
      '[&_.MuiInputBase-input.Mui-disabled]:[-webkit-text-fill-color:var(--wini-text-disabled)]',

      // === Label (base) ===
      '[&_.MuiInputLabel-root]:text-[length:var(--wini-label-font-size)]',
      '[&_.MuiInputLabel-root]:[color:var(--wini-label-base)]',

      // focused/disabled
      '[&_.MuiInputLabel-root.Mui-focused]:[color:var(--wini-text-main)]',
      '[&_.MuiInputLabel-root.Mui-disabled]:[color:var(--wini-text-disabled)]',

      // shrink 위치
      '[&_.MuiInputLabel-root.MuiInputLabel-shrink]:[transform:translate(12px,-8px)_scale(1)]',

      // inside 라벨
      '[&_.MuiInputLabel-root.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)]:text-[length:var(--wini-font-size)]',
      '[&_.MuiInputLabel-root.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)]:font-medium',
      '[&_.MuiInputLabel-root.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)]:[color:var(--wini-text-default)]',
      isTextarea
        ? '[&_.MuiInputLabel-root.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)]:[transform:translate(12px,3px)]'
        : '[&_.MuiInputLabel-root.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)]:[transform:translate(12px,var(--wini-label-y))]',

      // === Textarea(multiline) ===
      isTextarea ? '[&_.MuiInputBase-multiline]:p-0' : null,
      isTextarea ? '[&_.MuiInputBase-multiline]:h-auto' : null,
      isTextarea ? '[&_.MuiInputBase-multiline_.MuiInputBase-input]:p-2' : null,
      isTextarea
        ? '[&_.MuiInputBase-multiline_.MuiInputBase-input]:min-h-[var(--wini-input-h)]'
        : null,
      isTextarea
        ? '[&_.MuiInputBase-multiline_.MuiInputBase-input]:box-border'
        : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <TextField
        {...props}
        ref={ref}
        className={cn(mergedRoot, defaultTw)}
        sx={(theme) => ({
          ...resolveVars(theme),
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
        slotProps={{
          ...props.slotProps,
          htmlInput: {
            ...props.slotProps?.htmlInput,
            className: cn(
              props.slotProps?.htmlInput?.className,
              inputClassName,
            ),
          },
          inputLabel: {
            ...props.slotProps?.inputLabel,
            className: cn(
              props.slotProps?.inputLabel?.className,
              labelClassName,
            ),
          },
        }}
      />
    );
  },
);

export default withWini(WiniText);
