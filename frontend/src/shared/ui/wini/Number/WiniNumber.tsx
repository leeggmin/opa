import { TextFieldProps } from "@mui/material";
interface CustomProps {
    /**필수값 */
    required?: boolean;
    ui?: string | string[];
    /** 천단위 콤마 추가 */
    thousandSeparator?: boolean;
}

type WiniNumberProps = TextFieldProps & CustomProps;

declare function WiniNumber(props: WiniNumberProps): JSX.Element;;

export default WiniNumber;
