import { GridProps } from "@mui/material";

type GridUiInput = string | string[];

export interface WiniGridLayoutProps extends GridProps {
  ui?: GridUiInput;
  type?: GridUiInput;
}

declare function WiniGridLayout(props: WiniGridLayoutProps): JSX.Element;

export default WiniGridLayout;
