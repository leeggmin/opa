import { forwardRef, useContext } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import { cn } from '@/shared/lib/cn';
import { WiniListTypeContext } from '@/shared/ui/wini/List/WiniList';

const TEXT_SX = {
  '&.MuiListItemIcon-root': {
    minWidth: 'unset',
  },
};

const WiniListItemIcon = forwardRef(
  ({ children, className, listType, sx: sxProp = {}, ...props }, ref) => {
    const inheritedListType = useContext(WiniListTypeContext);
    const resolvedListType = listType ?? inheritedListType ?? 'menu';
    const isTextType = resolvedListType === 'text';

    const mergedClassName = cn('winicomponent winilistitemIcon', className);
    const typeSx = isTextType ? TEXT_SX : {};

    return (
      <ListItemIcon
        {...props}
        className={mergedClassName}
        ref={ref}
        sx={(theme) => ({
          ...typeSx,
          ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
        })}
      >
        {children}
      </ListItemIcon>
    );
  },
);

export default WiniListItemIcon;
