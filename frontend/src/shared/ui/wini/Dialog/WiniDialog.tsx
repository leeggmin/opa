import { DialogProps } from "@mui/material";

type WiniUiInput = string | string[];

interface WiniDialogProps extends DialogProps {
  ui?: WiniUiInput;
  layout?: WiniUiInput;
  draggable?: boolean;
  disableBackdropClose?: boolean;
  modeless?: boolean;
  btns?: React.ReactNode;
}

declare function WiniDialog(props: WiniDialogProps): JSX.Element;

export default WiniDialog;
