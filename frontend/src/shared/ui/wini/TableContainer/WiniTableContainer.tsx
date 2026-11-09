import { TableContainerProps } from '@mui/material';

type WiniUiInput = string | string[];

export interface WiniTableContainerProps extends TableContainerProps {
  ui?: WiniUiInput;
}

declare function WiniTableContainer(props: WiniTableContainerProps): JSX.Element;

export default WiniTableContainer;