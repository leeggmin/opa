// import { DrawerProps } from "@mui/material";
interface CustomProps {
    /**필수값 */
    title?: string;
    position?:any;
    width?:number|string;
    height?:number|string;
    resize?:boolean;
    open:boolean;
    setOpen: (open: boolean) => void; // 함수 타입
}

//SelectProps가 인터페이스가 아니라 유니온 타입 (| 연산자 사용)  유니온 타입을 인터섹션(`&`)으로 변환
// type WiniDragDialogProps<T = unknown> = CustomProps;

declare function WiniDragDialog(props: CustomProps): JSX.Element;

export default WiniDragDialog;