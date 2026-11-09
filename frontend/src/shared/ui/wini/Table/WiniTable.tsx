import { TableProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniTableProps extends TableProps {
  ui?: WiniUiInput;
}

declare function WiniTable(props: WiniTableProps): JSX.Element;

export default WiniTable;