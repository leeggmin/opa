import { DialogTitleProps } from "@mui/material";

declare function WiniDialogTitle(props: DialogTitleProps & { onClose?: () => void; closeLabel?: string }): JSX.Element;

export default WiniDialogTitle;
