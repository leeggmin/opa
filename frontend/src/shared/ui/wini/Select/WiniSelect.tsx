
import { SelectProps } from "@mui/material";

interface CustomProps {
    /**필수값 */
    required?: boolean;
    ui?: string | string[];
    /**
     * 라벨관련 props는 여기 넣어주세요
     */
    labelProps?: any;
}

//SelectProps가 인터페이스가 아니라 유니온 타입 (| 연산자 사용)  유니온 타입을 인터섹션(`&`)으로 변환
type WiniSelectProps<T = unknown> = SelectProps<T> & CustomProps;

declare function WiniSelect<T = unknown>(props: WiniSelectProps<T>): JSX.Element;

export default WiniSelect;
