import type { Grid2Props } from '@mui/material/Grid2';

type GridUiInput = string | string[];

export interface WiniGridItemProps extends Grid2Props {
  ratio?: number | string;
  ui?: GridUiInput;
  type?: GridUiInput;
}

declare function WiniGridItem(props: WiniGridItemProps): JSX.Element;

export default WiniGridItem;
