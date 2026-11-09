import type { ListItemTextProps } from '@mui/material';

export interface WiniListItemTextProps extends ListItemTextProps {
  listType?: 'text' | 'menu' | 'file' | string;
}

declare function WiniListItemText(props: WiniListItemTextProps): JSX.Element;
export default WiniListItemText;
