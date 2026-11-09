import { BoxProps } from "@mui/material";

export interface WiniBoxProps extends BoxProps {
  type?: string;
  variant?: string;
}

declare function WiniBox(props: WiniBoxProps): JSX.Element;

export default WiniBox;
