import { PaginationProps } from "@mui/material";
interface CustomProps {
    /**전체 레코드수 입력 
     * totalRecords를 쓰면 pageSize도 함께 써야합니다.
    */
    totalRecords?: number;
    /**
     * 한페이지에 보여줄 레코드 수
     * pageSize를 쓰면 totalRecords도 함께 써야합니다.
     */
    pageSize?: number;
}

interface WiniPaginationProps extends PaginationProps,CustomProps{};

declare function WiniPagination(props: WiniPaginationProps): JSX.Element;;

export default WiniPagination;