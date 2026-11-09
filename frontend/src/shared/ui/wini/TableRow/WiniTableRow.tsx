import { TableRowProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniTableRowProps extends TableRowProps {
  ui?: WiniUiInput;
}

declare function WiniTableRow(props: WiniTableRowProps): JSX.Element;

export default WiniTableRow;