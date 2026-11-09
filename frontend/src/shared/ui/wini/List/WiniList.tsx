import type { ListProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniListProps extends ListProps {
  ui?: WiniUiInput;
  listType?: 'text' | 'menu' | 'file' | string;
}

export declare const WiniListTypeContext: import('react').Context<string | undefined>;
declare function WiniList(props: WiniListProps): JSX.Element;

export default WiniList;
