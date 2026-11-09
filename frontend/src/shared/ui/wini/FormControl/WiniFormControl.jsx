import { forwardRef } from 'react';
import FormControl from '@mui/material/FormControl';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
};
const WiniFormControl = forwardRef(
  ({ children, type, ui, className, sx: sxProp = {}, ...props }, ref) => {
    const uiTokens = getUiTokens(ui, type);
    const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);

    const mergedClassName = cn(
      'winicomponent winiformcontrol',
      uiTokens.map((token) => `winiformcontrol--${token}`),
      className,
    );
        const baseSx = {
            ...(uiSx ?? {}),
            '&.MuiFormControl-root': {
                width: '100%',
            },
            '& .winiformcontrollabel ': {
                marginLeft: '0',
            },
            '& .winiformcontrollabel': {
                color: color.text.default,
            },
            '& .winiformcontrollabel .MuiFormControlLabel-label': {
                fontSize: '14px',
            },
            
        };

    return (
      <FormControl
        ref={ref}
        className={mergedClassName}
        sx={(theme) => ({
          ...baseSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
        {...props}
      >
        {children}
      </FormControl>
    );
  },
);

export default WiniFormControl;
