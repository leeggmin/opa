import { forwardRef } from 'react';
import Pagination from '@mui/material/Pagination';

const WiniPagination = forwardRef(({ children, ...props }, ref) => {
  let className = 'winicomponent winipagination ';
  if (props.className !== undefined && props.className !== null) {
    className += props.className;
  }

  const {
    totalRecords,
    pageSize,
    count: countProp,
    className: _className,
    ...rest
  } = props;

  let cnt = 0;
  if (countProp != null) {
    cnt = Number(countProp) || 0;
  } else {
    if (totalRecords != null && pageSize != null) {
      const totalNum = Number(totalRecords);
      const pageNum = Number(pageSize);

      const safeTotal = Number.isFinite(totalNum) ? totalNum : 0;
      const safePage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

      cnt = Math.ceil(safeTotal / safePage);
    }
  }

  return (
    <Pagination
      {...rest}
      className={className}
      ref={ref}
      count={cnt}
    >
      {children}
    </Pagination>
  );
});

export default WiniPagination;
