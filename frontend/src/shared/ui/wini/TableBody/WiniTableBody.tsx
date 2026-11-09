import { TableBodyProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniTableBodyProps extends TableBodyProps {
  ui?: WiniUiInput;
}

declare function WiniTableBody(props: WiniTableBodyProps): JSX.Element;

export default WiniTableBody;