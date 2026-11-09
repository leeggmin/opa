import { TableCellProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniTableCellProps extends TableCellProps {
  ui?: WiniUiInput;
}

declare function WiniTableCell(props: WiniTableCellProps): JSX.Element;

export default WiniTableCell;