import {
  WiniAgGridReact,
  WiniGridLayout,
  WiniBox,
  WiniButton,
  WiniTypography,
} from '@/shared/ui/wini';

/**
 * 사용자 그리드 컴포넌트
 */
export const Grid = ({ userList, onCellClick, onJoinApproval }) => {
  const columnDefs = [
    // {
    //   field: 'organizationName',
    //   headerName: '기관명',
    //   cellClass: 'text-center',
    //   flex: 1.5,
    // },
    {
      field: 'username',
      headerName: '사용자 ID',
      cellClass: 'text-center',
      flex: 1.5,
    },
    {
      field: 'fullName',
      headerName: '성명',
      cellClass: 'text-center',
      flex: 1.5,
    },
    {
      field: 'joinStatus',
      headerName: '가입승인여부',
      flex: 1,
      cellClass: 'text-center',
      onCellClicked: async (params) => {
        if (params.data.joinStatus !== 'REQUIRED') {
          return;
        }
        const userId = params.data.id;
        onJoinApproval?.(userId);
      },
      cellRenderer: (params) => {
        switch (params.value) {
          case 'REQUIRED':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniButton
                  className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-[#ff6b35] bg-[#fff3e0] px-4 text-[13px] font-semibold leading-none text-[#e65100] shadow-sm transition-all duration-150 ease-in-out hover:bg-[#ffe0b2] hover:shadow-md active:scale-95 active:bg-[#ffcc80]"
                >
                  가입대기
                </WiniButton>
              </WiniBox>
            );
          case 'ACCEPTED':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniTypography className="text-sm font-medium text-green-600">
                  승인
                </WiniTypography>
              </WiniBox>
            );
          case 'RESIGNED':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniTypography className="text-sm font-medium text-gray-500">
                  퇴사
                </WiniTypography>
              </WiniBox>
            );
          case 'ABSENCE':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniTypography className="text-sm font-medium text-gray-500">
                  휴직
                </WiniTypography>
              </WiniBox>
            );
        }

        return params.value;
      },
    },
    {
      field: 'departmentName',
      headerName: '부서명',
      cellClass: 'text-center',
      flex: 2,
    },
    {
      field: 'dutyName',
      headerName: '직위',
      cellClass: 'text-center',
      flex: 1,
    },
  ];

  return (
    <WiniGridLayout size={{ lg: 12 }} className="h-[450px] w-full mt-4">
      <WiniAgGridReact
        rowStyle={{ lineHeight: 20 }}
        className="h-full"
        rowData={userList}
        onCellClicked={onCellClick}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
      />
    </WiniGridLayout>
  );
};
