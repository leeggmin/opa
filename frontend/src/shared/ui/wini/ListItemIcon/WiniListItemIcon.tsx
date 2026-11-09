import type { ListItemIconProps } from '@mui/material';

export interface WiniListItemIconProps extends ListItemIconProps {
  listType?: 'text' | 'menu' | 'file' | string;
}

declare function WiniListItemIcon(props: WiniListItemIconProps): JSX.Element;
export default WiniListItemIcon;
