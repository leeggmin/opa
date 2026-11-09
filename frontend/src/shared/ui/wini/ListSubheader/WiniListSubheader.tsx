import type { ListSubheaderProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniListSubheaderProps extends ListSubheaderProps {
  ui?: WiniUiInput;
  listType?: 'text' | 'menu' | 'file' | string;
}

declare function WiniListSubheader(props: WiniListSubheaderProps): JSX.Element;
export default WiniListSubheader;
