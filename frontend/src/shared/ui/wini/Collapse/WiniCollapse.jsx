import { forwardRef } from 'react';
import { cn } from '@/shared/lib/cn';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import Collapse from '@mui/material/Collapse';

const DEFAULT_COLLAPSE_TIMEOUT = { enter: 260, exit: 200 };
const DEFAULT_COLLAPSE_EASING = {
  enter: 'cubic-bezier(0.22, 1, 0.36, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
};

const WiniCollapse = forwardRef(
  (
    {
      children,
      className,
      sx: sxProp = {},
      timeout = DEFAULT_COLLAPSE_TIMEOUT,
      easing = DEFAULT_COLLAPSE_EASING,
      ...props
    },
    ref,
  ) => {
    const mergedClassName = cn('winicomponent winicollapse', className);
    const baseSx = {
      '&.MuiCollapse-root': {
        width: '100%',
        minWidth: 0,
        '&.MuiCollapse-hidden': {
          display: 'none',
        },
        '& .MuiButton-root': {
          padding: `${size.margin.sm} ${size.margin.md}`,
          color: color.text.default,
          fontWeight: '500',
          fontSize: `${size.text.sm}`,
          '&.activeMenu': {
            backgroundColor: color.background.main,
            color: color.text.white,
            fontWeight: '600',
          },
        },
        '& .MuiList-root': {
          padding: 0,
        },
        '& .MuiListItem-root': {
          padding: 0,
        },
      },

      '& .MuiCollapse-wrapper': {
        width: '100%',
        minWidth: 0,
        willChange: 'height',
      },
      '& .MuiCollapse-wrapperInner': {
        width: '100%',
        minWidth: 0,
        backgroundColor: '#EFF2F4',
        borderRadius: `${size.margin.sm}`,
        marginBottom: size.margin.md,
        padding: size.margin.md,
        boxSizing: 'border-box',
      },
    };
    return (
      <Collapse
        {...props}
        timeout={timeout}
        easing={easing}
        className={mergedClassName}
        ref={ref}
        sx={(theme) => ({
          ...baseSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </Collapse>
    );
  },
);
export default WiniCollapse;
