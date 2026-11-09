import { TextFieldProps } from "@mui/material";
interface CustomProps {
    /**필수값 */
    required?: boolean;
    ui?: string | string[];
}

type WiniTextProps = TextFieldProps & CustomProps;

declare function WiniText(props: WiniTextProps): JSX.Element;;

export default WiniText;
