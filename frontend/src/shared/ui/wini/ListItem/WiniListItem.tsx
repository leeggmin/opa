import type { ListItemProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniListItemProps extends ListItemProps {
  ui?: WiniUiInput;
  listType?: 'text' | 'menu' | 'file' | string;
}

declare function WiniListItem(props: WiniListItemProps): JSX.Element;
export default WiniListItem;
