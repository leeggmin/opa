import { forwardRef } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import { cn } from '@/shared/lib/cn';
import { ICONS } from '@/shared/assets';

const WiniIcon = forwardRef((props, ref) => {
  const { icon, className, sx: sxProp = {}, children, ...muiProps } = props;
  const IconComponent = icon ? ICONS[icon] : undefined;
  const mergedClassName = cn(
    'winicomponent winiicon',
    icon && `winiicon--${icon}`,
    className,
  );
  const baseSx = {};
  const mergedSx = (theme) => ({
    ...baseSx,
    ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
  });

  if (!IconComponent) {
    if (!children) {
      return null;
    }

    return (
      <SvgIcon
        {...muiProps}
        ref={ref}
        className={mergedClassName}
        sx={mergedSx}
      >
        {children}
      </SvgIcon>
    );
  }

  return (
    <SvgIcon
      {...muiProps}
      ref={ref}
      className={mergedClassName}
      component={IconComponent}
      inheritViewBox
      sx={mergedSx}
    />
  );
});

export default WiniIcon;
