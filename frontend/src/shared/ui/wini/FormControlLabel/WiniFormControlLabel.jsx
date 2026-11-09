import { forwardRef } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { cn } from '@/shared/lib/cn';

const WiniFormControlLabel = forwardRef(
  (
    { children, className, labelClassName, slotProps: slotPropsProp, ...props },
    ref,
  ) => {
    const mergedClassName = cn('winicomponent winiformcontrollabel', className);

    const mergedSlotProps = {
      ...(slotPropsProp ?? {}),
      typography: {
        ...(slotPropsProp?.typography ?? {}),
        className: cn(slotPropsProp?.typography?.className, labelClassName),
      },
    };

    return (
      <FormControlLabel
        {...props}
        className={mergedClassName}
        slotProps={mergedSlotProps}
        ref={ref}
      >
        {children}
      </FormControlLabel>
    );
  },
);

export default WiniFormControlLabel;
