import React, { useMemo, useState } from 'react';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { 
    WiniFormProvider,
    WiniBox,
    WiniDivider,
    WiniSnackbar,
    WiniTypography,
    WiniStack,
    WiniPaper,
    WiniGridLayout,
    WiniTab,
    WiniTabPanel,
    WiniTabs,
    WiniText,
    WiniButtonGroup,
    WiniButton,
    WiniGridItem,
    WiniIcon,
    WiniIconButton,
    WiniToggleButton,
    WiniList,
    WiniListItem,
    WiniListItemIcon,
    WiniListItemText,
    WiniListSubheader,
    WiniCollapse,
    WiniSelect,
    WiniMenuItem,
    WiniTreeView,
    WiniTreeItem,
    WiniTreeCheckItem,
    WiniFormControlLabel,
    WiniRadio,
    WiniAgGridReact,
    WiniCheckbox,
    WiniInputLabel,
    WiniPagination
 } from '@/shared/ui';

import { UserListGrid, UserListSearch } from '@/features/user/list';

const splitKoreanName = (fullName) => {
  const name = String(fullName ?? '').trim();
  if (!name) return { lastName: '', firstName: '' };
  if (name.length === 1) return { lastName: name, firstName: '' };
  return { lastName: name.slice(0, 1), firstName: name.slice(1) };
};

export default function Component02({
}) {
  const base = useMemo(
    () => [
      {
        id: 'u-1',
        organizationId: 'org-1',
        organizationName: '한국지능정보사회진흥원_대구본원',
        username: 'niaAdmin',
        fullName: '임정민',
        joinStatus: 'ACCEPTED',
        departmentName: 'AI-클라우드기술혁신팀',
        dutyName: '선임',
        phoneNumber: '010-1234-5678',
        email: 'niaadmin@example.com',
      },
      {
        id: 'u-2',
        organizationId: 'org-2',
        organizationName: 'tqw',
        username: 'qqqq',
        fullName: 'qw',
        joinStatus: 'ACCEPTED',
        departmentName: 'r',
        dutyName: 'e',
        phoneNumber: '010-0000-0000',
        email: 'qqqq@example.com',
      },
      {
        id: 'u-3',
        organizationId: 'org-3',
        organizationName: '한국지능정보사회진흥원',
        username: 'kptUser001',
        fullName: '이승국',
        joinStatus: 'ACCEPTED',
        departmentName: 'CLOUD팀',
        dutyName: '과장',
        phoneNumber: '010-2345-6789',
        email: 'kptuser001@example.com',
      },
      {
        id: 'u-4',
        organizationId: 'org-4',
        organizationName: '한국클라우드산업협회',
        username: 'kaciUser001',
        fullName: '홍길동',
        joinStatus: 'ACCEPTED',
        departmentName: '클라우드인증팀',
        dutyName: '과장',
        phoneNumber: '010-3456-7890',
        email: 'kaciuser001@example.com',
      },
      {
        id: 'u-5',
        organizationId: 'org-5',
        organizationName: 'Default',
        username: 'dev',
        fullName: '관리자',
        joinStatus: 'ACCEPTED',
        departmentName: '',
        dutyName: '',
        phoneNumber: '010-1111-2222',
        email: 'dev@example.com',
      },
      {
        id: 'u-6',
        organizationId: 'org-6',
        organizationName: '(주)위니텍',
        username: 'niaTestUser',
        fullName: '이승국',
        joinStatus: 'ACCEPTED',
        departmentName: 'AI-클라우드기술혁신팀',
        dutyName: '선임연구원',
        phoneNumber: '010-2222-3333',
        email: 'niatestuser@example.com',
      },
      {
        id: 'u-7',
        organizationId: 'org-7',
        organizationName: '프런트테스트용',
        username: 'front',
        fullName: '차현진',
        joinStatus: 'ACCEPTED',
        departmentName: '사장',
        dutyName: '사장',
        phoneNumber: '010-3333-4444',
        email: 'front@example.com',
      },
      {
        id: 'u-8',
        organizationId: 'org-8',
        organizationName: '(주)WINITECH',
        username: 'winiTest001',
        fullName: '이승국',
        joinStatus: 'ACCEPTED',
        departmentName: 'CLOUD팀',
        dutyName: '과장',
        phoneNumber: '010-4444-5555',
        email: 'winitest001@example.com',
      },
    ],
    [],
  );

  const columnDefs = [
    {
      field: 'organizationName',
      headerName: '기관명',
      cellStyle: { textAlign: 'center' },
      flex: 1.5,
    },
    {
      field: 'username',
      headerName: '사용자 ID',
      cellStyle: { textAlign: 'center' },
      flex: 1.5,
    },
    {
      field: 'fullName',
      headerName: '성명',
      cellStyle: { textAlign: 'center' },
      flex: 1.5,
    },
    {
      field: 'joinStatus',
      headerName: '가입승인여부',
      flex: 1,
      cellStyle: { textAlign: 'center' },
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
                  className="w-full whitespace-nowrap border border-[#ff6b35] bg-[#fff3e0] px-4 py-1.5 text-[13px] font-semibold text-[#e65100] shadow-sm transition-all hover:bg-[#ffe0b2] hover:shadow-md active:scale-[0.97] active:bg-[#ffcc80]"
                >
                  가입대기
                </WiniButton>
              </WiniBox>
            );
          case 'ACCEPTED':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniTypography className="text-[14px] font-medium text-green-600">
                  승인
                </WiniTypography>
              </WiniBox>
            );
          case 'RESIGNED':
            return (
              <WiniBox className="flex h-full w-full items-center justify-center">
                <WiniTypography className="text-[14px] font-medium text-[#666]">
                  퇴사
                </WiniTypography>
              </WiniBox>
            );
          case 'ABSENCE':
            return <WiniTypography className="font-bold text-gray-500">휴직</WiniTypography>;
        }

        return params.value;
      },
    },
    {
      field: 'departmentName',
      headerName: '부서명',
      cellStyle: { textAlign: 'center' },
      flex: 2,
    },
    {
      field: 'dutyName',
      headerName: '직위',
      cellStyle: { textAlign: 'center' },
      flex: 1,
    },
  ];

  const mockUsers = useMemo(() => {
    return base.map((user) => {
      const { lastName, firstName } = splitKoreanName(user.fullName);
      return {
        ...user,
        lastName,
        firstName,
      };
    });
  }, [base]);

  const orgList = useMemo(() => {
    const map = new Map();
    for (const user of mockUsers) {
      if (!map.has(user.organizationId)) {
        map.set(user.organizationId, {
          organizationId: user.organizationId,
          organizationName: user.organizationName,
        });
      }
    }
    return Array.from(map.values());
  }, [mockUsers]);

  const [searchParam, setSearchParam] = useState({
    organizationId: '',
    username: '',
    fullName: '',
  });

  const [selectedUser, setSelectedUser] = useState({});

  const filteredUserList = useMemo(() => {
    const orgId = String(searchParam.organizationId ?? '').trim();
    const username = String(searchParam.username ?? '').trim().toLowerCase();
    const fullName = String(searchParam.fullName ?? '').trim().toLowerCase();

    return mockUsers.filter((user) => {
      if (orgId && user.organizationId !== orgId) return false;
      if (username && !String(user.username ?? '').toLowerCase().includes(username)) {
        return false;
      }
      if (fullName && !String(user.fullName ?? '').toLowerCase().includes(fullName)) {
        return false;
      }
      return true;
    });
  }, [mockUsers, searchParam]);

  const handleSearchChange = (event) => {
    const { name, value } = event?.target ?? {};
    if (!name) return;
    setSearchParam((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyUpSearch = (event) => {
    if (event?.key !== 'Enter') return;
    // 필터가 searchParam 기반이라 Enter는 no-op
  };

  const handleSearch = () => {
    // 필터가 searchParam 기반이라 검색 버튼은 no-op
  };

  const handleRowClick = (params) => {
    const userId = params?.data?.id;
    const next = mockUsers.find((u) => u.id === userId) ?? params?.data ?? {};
    setSelectedUser(next);
  };

  // Grid.jsx 와 동일하게 ag-grid onCellClicked 시그니처를 그대로 받도록 연결
  const onCellClick = (params) => {
    handleRowClick(params);
  };

  const handleChange = (event) => {
    const { name, value } = event?.target ?? {};
    if (!name) return;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setSelectedUser({});
  };

  const handleGridJoinApproval = (userId) => {
    setSelectedUser((prev) => {
      if (!prev?.id || prev.id !== userId) return prev;
      return { ...prev, joinStatus: 'ACCEPTED' };
    });
  };

  // columnDefs 내부에서 사용
  const onJoinApproval = (userId) => {
    handleGridJoinApproval(userId);
  };

  const handleAcceptJoin = () => {
    setSelectedUser((prev) => ({ ...prev, joinStatus: 'ACCEPTED' }));
  };

  const handleCreate = () => {
    console.log('create (mock):', selectedUser);
  };
  const handleUpdate = () => {
    console.log('update (mock):', selectedUser);
  };
  const handleDelete = () => {
    console.log('delete (mock):', selectedUser);
  };
  const handleResetPassword = () => {
    console.log('reset password (mock):', selectedUser?.id);
  };
  const handleUnlockLogin = () => {
    console.log('unlock login (mock):', selectedUser?.id);
  };

  const formContextValue = useMemo(
    () => ({
      id: 'sample-user-management',
      info: {},
      connector: null,
      winiAut: {
        select: 'ALLOW',
        insert: 'ALLOW',
        update: 'ALLOW',
        delete: 'ALLOW',
        print: 'ALLOW',
        down: 'ALLOW',
        manage: 'ALLOW',
      },
      winiEvent: {
        noop: () => {},
        select: () => {},
        insert: () => {},
        update: () => {},
        delete: () => {},
        print: () => {},
        down: () => {},
        manage: () => {},
      },
    }),
    [],
  );

  return (
    
    <WiniFormProvider value={formContextValue}>
      <WiniFormEmpty>

        <WiniGridLayout>

          <WiniBox className='flex items-center justify-between'>
            <WiniTypography variant="h1">사용자 관리</WiniTypography>
            <WiniBox className='flex items-center gap-1'>
              <WiniIcon icon="home" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">HOME</WiniTypography>
              <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">시스템관리</WiniTypography>
              <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">사용자 관리</WiniTypography>
            </WiniBox>
          </WiniBox>
        </WiniGridLayout>


        <WiniList listType="menu" ui="">
            <WiniListSubheader ui="">사용자 목록</WiniListSubheader>
        </WiniList>

        <WiniBox ui="form">
            <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
            <WiniGridItem >
               <WiniSelect
                ui="column"
                name="organizationId"
                label="기관"
                sx={{ width: '100%' }}
                value={searchParam.organizationId || ''}
                onChange={handleSearchChange}
                onKeyUp={handleKeyUpSearch}
                displayEmpty
                labelProps={{ shrink: true }}
              >
                <WiniMenuItem value={''}>전체</WiniMenuItem>
                {orgList.map((item) => (
                  <WiniMenuItem key={item.organizationId} value={item.organizationId}>
                    {item.organizationName}
                  </WiniMenuItem>
                ))}
              </WiniSelect>
            </WiniGridItem>

            <WiniGridItem >
                <WiniText
                    ui="column"
                    name="username"
                    label="사용자 ID"
                    sx={{  }}
                    value={searchParam.username || ''}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { autoComplete: 'off' },
                    }}
                    //   onChange={onSearchChange}
                    //   onKeyUp={onKeyUp}
                    placeholder={'사용자 ID'}
                />
            </WiniGridItem>

            <WiniGridItem >
                 <WiniText
                    ui="column"
                    name="fullName"
                    label="성명"
                    sx={{}}
                    value={searchParam.fullName || ''}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: { autoComplete: 'off' },
                    }}
                    // onChange={onSearchChange}
                    // onKeyUp={onKeyUp}
                    placeholder={'성명'}
                />

            </WiniGridItem>


            <WiniBox ui="btnitem">
                <WiniButton
                ui="line"
                >
                순서수정
                </WiniButton>
                <WiniButton
                  onClick={handleSearch}
                >
                검색
                </WiniButton> 
            </WiniBox>
        </WiniGridLayout>
        </WiniBox>


        {/* <UserListGrid
          userList={filteredUserList}
          onCellClick={handleRowClick}
          onJoinApproval={handleGridJoinApproval}
        /> */}

        <WiniGridLayout size={{ lg: 12 }} sx={{ height: 450, width: '100%', mt: 2 }}>
            <WiniAgGridReact
                rowStyle={{ lineHeight: 20 }}
                sx={{ height: '100%' }}
                rowData={base}
                onCellClicked={onCellClick}
                columnDefs={columnDefs}
                pagination={true}
            />
        </WiniGridLayout>

        <WiniBox>
            <WiniList listType="menu" ui="">
                <WiniListSubheader ui="">사용자 상세정보</WiniListSubheader>
            </WiniList>
            <WiniBox ui="form">
                <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem >
                        <WiniText
                            ui="column"
                            label="사용자 ID"
                            sx={{ width: '100%' }}
                            name="username"
                            value={selectedUser.username || ''}
                            required={selectedUser.id ? false : true}
                            slotProps={{
                            inputLabel: { shrink: true },
                            input: {
                                readOnly: selectedUser.id ? true : false,
                                autoComplete: 'username',
                            },
                            }}
                            // onChange={onChange}
                            placeholder={''}
                        />
                    </WiniGridItem>
                    <WiniGridItem >
                        <WiniSelect
                            ui="column"
                            label="가입승인여부"
                            name="joinStatus"
                            value={selectedUser.joinStatus || ''}
                            sx={{ width: '100%' }}
                            // onChange={onChange}
                        >
                    <WiniMenuItem value="ACCEPTED">승인</WiniMenuItem>
                    <WiniMenuItem value="REQUIRED">대기</WiniMenuItem>
                    <WiniMenuItem value="RESIGNED">퇴사</WiniMenuItem>
                    <WiniMenuItem value="ABSENCE">휴직</WiniMenuItem>
                  </WiniSelect>
                    </WiniGridItem>
                </WiniGridLayout>
                <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem >
                    <WiniText
                        ui="column"
                        label="성"
                        sx={{ width: '100%' }}
                        name="lastName"
                        required={true}
                        value={selectedUser.lastName || ''}
                        slotProps={{
                        inputLabel: { shrink: true },
                        input: { autoComplete: 'family-name' },
                        }}
                        // onChange={onChange}
                        placeholder={''}
                    />
                    </WiniGridItem>
                    <WiniGridItem >
                    <WiniText
                        ui="column"
                    label="이름"
                    sx={{ width: '100%' }}
                    name="firstName"
                    required={true}
                    value={selectedUser.firstName || ''}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { autoComplete: 'given-name' },
                    }}
                    // onChange={onChange}
                    placeholder={''}
                  />
                    </WiniGridItem>
                </WiniGridLayout>
                <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem>
                    <WiniText
                    ui="column"
                    label="부서명"
                    name="departmentName"
                    sx={{ width: '100%' }}
                    value={selectedUser.departmentName || ''}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { autoComplete: 'off' },
                    }}
                    // onChange={onChange}
                    placeholder={''}
                  />
                    </WiniGridItem>
                    <WiniGridItem >
                       <WiniText
                        ui="column"
                        label="직위"
                        name="dutyName"
                        sx={{ width: '100%' }}
                        value={selectedUser.dutyName || ''}
                        slotProps={{
                        inputLabel: { shrink: true },
                        input: { autoComplete: 'off' },
                        }}
                        // onChange={onChange}
                        placeholder={''}
                    />
                    </WiniGridItem>
                </WiniGridLayout>
                <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                <WiniGridItem >
                    <WiniText
                    ui="column"
                    label="비밀번호"
                    sx={{ width: '100%' }}
                    name="password"
                    value={selectedUser.password || ''}
                    type="password"
                    required={selectedUser.id ? false : true}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: {
                        readOnly: selectedUser.id ? true : false,
                        autoComplete: 'new-password',
                      },
                    }}
                    // onChange={onChange}
                    placeholder={''}
                  />
                    </WiniGridItem>
                    <WiniGridItem >
                        <WiniText
                        ui="column"
                        label="비밀번호 확인"
                        sx={{ width: '100%' }}
                        name="passwordConf"
                        value={selectedUser.passwordConf || ''}
                        type="password"
                        required={selectedUser.id ? false : true}
                        slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                            readOnly: selectedUser.id ? true : false,
                            autoComplete: 'new-password',
                        },
                        }}
                        // onChange={onChange}
                        placeholder={''}
                    />
                    </WiniGridItem>
                    
                </WiniGridLayout>
                <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem >
                        <WiniText
                            ui="column"
                            label="전화번호"
                            required={true}
                            name="phoneNumber"
                            type="text"
                            value={selectedUser.phoneNumber || ''}
                            slotProps={{
                            inputLabel: { shrink: true },
                            input: { autoComplete: 'tel' },
                            }}
                            sx={{ width: '100%' }}
                            placeholder={'숫자만 입력'}
                            // onChange={onChange}
                        />
                    </WiniGridItem>

                    <WiniGridItem >
                        <WiniText
                            ui="column"
                            label="이메일"
                            sx={{ width: '100%' }}
                            name="email"
                            required={true}
                            value={selectedUser.email || ''}
                            slotProps={{
                            inputLabel: { shrink: true },
                            input: { autoComplete: 'email' },
                            }}
                            // onChange={onChange}
                            placeholder={''}
                        />
                    </WiniGridItem>
                </WiniGridLayout>
                    <WiniBox ui="btnbox">
                        <WiniBox ui="btnitem"></WiniBox>
                        <WiniBox ui="btnitem">
                        <WiniButton
                          sx={{ }}
                          tabIndex={4}
                        //   onClick={onResetPassword}
                          disabled={selectedUser.id ? false : true}
                        >
                          비밀번호 초기화
                        </WiniButton>
                        <WiniButton
                          sx={{}}
                          tabIndex={4}
                        //   onClick={onUnlockLogin}
                          disabled={selectedUser.id ? false : true}
                        >
                          비밀번호오류 횟수 초기화
                        </WiniButton>
                        </WiniBox>
                    </WiniBox>
            </WiniBox>
        </WiniBox>

        
         <WiniBox ui="btnbox">
            <WiniBox ui="btnitem">
            <WiniButton ui="delete">삭제</WiniButton>
            </WiniBox>
            <WiniBox ui="btnitem">
            <WiniButton ui="lineGray">초기화</WiniButton>
            <WiniButton ui="line">수정</WiniButton>
            <WiniButton ui="default">등록</WiniButton>
            </WiniBox>
        </WiniBox>
      </WiniFormEmpty>
    </WiniFormProvider>
  );
}
