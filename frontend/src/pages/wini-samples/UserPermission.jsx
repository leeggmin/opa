import React, { useEffect, useMemo, useRef, useState } from 'react';

import { color, size } from '@/shared/config/theme';

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
  const treeRef = useRef(null);

  // 스크린샷과 유사한 형태의 트리 데이터 (react-arborist: id + children)
  // 라벨 필드는 WiniTreeItem에서 name={'groupName'} 으로 읽음
  const authTreeDataList = useMemo(
    () => [
      {
        id: 'auth-org-admin',
        groupName: '기관관리자',
        children: [
          { id: 'auth-org-user', groupName: '기관사용자' },
          { id: 'auth-top-admin', groupName: '최상위관리자' },
        ],
      },
    ],
    [],
  );

  const [selectedAuthNodes, setSelectedAuthNodes] = useState([]);
  const onSelect = (nodes) => {
    setSelectedAuthNodes(Array.isArray(nodes) ? nodes : []);
  };

  useEffect(() => {
    // 스크린샷처럼 기본 확장 상태를 맞추기 위해 로드 후 전체 열기
    treeRef.current?.openAll?.();
  }, [authTreeDataList]);

  // 첨부파일(샘플) - JSX에서 사용 중인 변수/핸들러를 최소 구현
  const fileInputRef = useRef(null);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const appendAttachedFiles = (fileList) => {
    const files = Array.from(fileList ?? []);
    if (!files.length) return;
    setAttachedFiles((prev) => {
      const next = [...prev];
      for (const file of files) {
        const id =
          (globalThis.crypto?.randomUUID && globalThis.crypto.randomUUID()) ||
          `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        next.push({ id, name: file?.name ?? 'file', file });
      }
      return next;
    });
  };

  const handleDragOverAttachedFiles = (event) => {
    event?.preventDefault?.();
  };

  const handleDropAttachedFiles = (event) => {
    event?.preventDefault?.();
    appendAttachedFiles(event?.dataTransfer?.files);
  };

  const handleBrowseAttachedFiles = () => {
    fileInputRef.current?.click?.();
  }; 

  const handleFileInputChange = (event) => {
    appendAttachedFiles(event?.target?.files);
    if (event?.target) event.target.value = '';
  };

  const removeAttachedFile = (id) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

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

  // 메뉴 접근 권한 그리드(샘플) 데이터
  const [menuGridDataList, setMenuGridDataList] = useState(() => [
    {
      menuId: 'm-1',
      parentMenuId: '',
      depth: 1,
      name: '통화 관리',
      chkAll: 'ALLOW',
      selectStatus: 'ALLOW',
      insertStatus: 'ALLOW',
      updateStatus: 'ALLOW',
      deleteStatus: 'ALLOW',
      printStatus: 'ALLOW',
      downStatus: 'ALLOW',
      manageStatus: 'ALLOW',
      custom1Status: 'ALLOW',
      custom2Status: 'ALLOW',
      custom3Status: 'ALLOW',
    },
    {
      menuId: 'm-1-1',
      parentMenuId: 'm-1',
      depth: 2,
      name: '정지 관리',
      chkAll: 'NONE',
      selectStatus: 'NONE',
      insertStatus: 'NONE',
      updateStatus: 'NONE',
      deleteStatus: 'NONE',
      printStatus: 'NONE',
      downStatus: 'NONE',
      manageStatus: 'NONE',
      custom1Status: 'NONE',
      custom2Status: 'NONE',
      custom3Status: 'NONE',
    },
    {
      menuId: 'm-1-2',
      parentMenuId: 'm-1',
      depth: 2,
      name: '통화내역 조회',
      chkAll: 'NONE',
      selectStatus: 'NONE',
      insertStatus: 'NONE',
      updateStatus: 'NONE',
      deleteStatus: 'NONE',
      printStatus: 'NONE',
      downStatus: 'NONE',
      manageStatus: 'NONE',
      custom1Status: 'NONE',
      custom2Status: 'NONE',
      custom3Status: 'NONE',
    },
    {
      menuId: 'm-1-3',
      parentMenuId: 'm-1',
      depth: 2,
      name: '대시보드',
      chkAll: 'NONE',
      selectStatus: 'NONE',
      insertStatus: 'NONE',
      updateStatus: 'NONE',
      deleteStatus: 'NONE',
      printStatus: 'NONE',
      downStatus: 'NONE',
      manageStatus: 'NONE',
      custom1Status: 'NONE',
      custom2Status: 'NONE',
      custom3Status: 'NONE',
    },
    {
      menuId: 'm-2',
      parentMenuId: '',
      depth: 1,
      name: '정보 관리',
      chkAll: 'ALLOW',
      selectStatus: 'ALLOW',
      insertStatus: 'ALLOW',
      updateStatus: 'ALLOW',
      deleteStatus: 'ALLOW',
      printStatus: 'ALLOW',
      downStatus: 'ALLOW',
      manageStatus: 'ALLOW',
      custom1Status: 'ALLOW',
      custom2Status: 'ALLOW',
      custom3Status: 'ALLOW',
    },
    {
      menuId: 'm-2-1',
      parentMenuId: 'm-2',
      depth: 2,
      name: '구독 관리',
      chkAll: 'NONE',
      selectStatus: 'NONE',
      insertStatus: 'NONE',
      updateStatus: 'NONE',
      deleteStatus: 'NONE',
      printStatus: 'NONE',
      downStatus: 'NONE',
      manageStatus: 'NONE',
      custom1Status: 'NONE',
      custom2Status: 'NONE',
      custom3Status: 'NONE',
    },
  ]);

  const MENU_STATUS_FIELDS = useMemo(
    () => [
      'selectStatus',
      'insertStatus',
      'updateStatus',
      'deleteStatus',
      'printStatus',
      'downStatus',
      'manageStatus',
      'custom1Status',
      'custom2Status',
      'custom3Status',
    ],
    [],
  );

  const calcChkAll = (row) => {
    const ok = MENU_STATUS_FIELDS.every((k) => row?.[k] === 'ALLOW');
    return ok ? 'ALLOW' : 'NONE';
  };

  const handleMenuCheckboxChange = (params) => {
    const field = params?.colDef?.field;
    const rowIndex = params?.node?.rowIndex;
    const nextValue = !!params?.newValue;
    if (!field || rowIndex == null) return;

    setMenuGridDataList((prev) => {
      const next = [...prev];
      const row = { ...next[rowIndex] };

      // 해당 셀 값 반영
      row[field] = nextValue ? 'ALLOW' : 'NONE';

      if (field === 'chkAll') {
        for (const k of MENU_STATUS_FIELDS) {
          row[k] = nextValue ? 'ALLOW' : 'NONE';
        }
        row.chkAll = nextValue ? 'ALLOW' : 'NONE';
      } else {
        row.chkAll = calcChkAll(row);
      }

      next[rowIndex] = row;
      return next;
    });
  };

  const userColumnDefs = [
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
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <button
                  style={{
                    padding: '6px 16px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    border: '1px solid #ff6b35',
                    backgroundColor: '#fff3e0',
                    color: '#e65100',
                    fontSize: '13px',
                    fontWeight: '600',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.15s ease',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#ffe0b2';
                    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#fff3e0';
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'scale(0.97)';
                    e.target.style.backgroundColor = '#ffcc80';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#fff3e0';
                  }}
                >
                  가입대기
                </button>
              </div>
            );
          case 'ACCEPTED':
            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    color: 'green',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  승인
                </span>
              </div>
            );
          case 'RESIGNED':
            return (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    color: '#666',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  퇴사
                </span>
              </div>
            );
          case 'ABSENCE':
            return (
              <span style={{ color: 'gray', fontWeight: 'bold' }}>휴직</span>
            );
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

  // Grid.jsx (메뉴 접근 권한) columnDefs 추가
  const createCheckboxColumn = (field, headerName) => ({
    field,
    headerName,
    cellRenderer: 'agCheckboxCellRenderer',
    cellEditor: 'agCheckboxCellEditor',
    editable: true,
    minWidth: 90,
    flex: 1,
    cellStyle: { textAlign: 'center' },
    valueGetter: (params) => params.data[field] === 'ALLOW',
    valueSetter: (params) => {
      handleMenuCheckboxChange(params);
    },
    onCellClicked: (params) => {
      params.newValue = !params.value;
      handleMenuCheckboxChange(params);
    },
  });

  const columnDefs = [
    {
      field: 'name',
      headerName: '메뉴명',
      minWidth: 300,
      flex: 4,
      cellRenderer: (params) => {
        const numSpaces = params.data.depth || 0;
        const space = 'ㅤ'.repeat(numSpaces);
        let returnV = '';
        if (numSpaces > 1) {
          returnV = space + params.value;
        } else {
          returnV = params.value;
        }
        return returnV.replaceAll('&nbsp;', '');
      },
      cellStyle: { textAlign: 'left' },
    },
    createCheckboxColumn('chkAll', '전체'),
    createCheckboxColumn('selectStatus', '조회'),
    createCheckboxColumn('insertStatus', '등록'),
    createCheckboxColumn('updateStatus', '수정'),
    createCheckboxColumn('deleteStatus', '삭제'),
    createCheckboxColumn('printStatus', '출력'),
    createCheckboxColumn('downStatus', '다운'),
    createCheckboxColumn('manageStatus', '관리'),
    createCheckboxColumn('custom1Status', '기타1'),
    createCheckboxColumn('custom2Status', '기타2'),
    createCheckboxColumn('custom3Status', '기타3'),
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
            <WiniTypography variant="h1">메뉴 접근 권한</WiniTypography>
            <WiniBox className='flex items-center gap-1'>
              <WiniIcon icon="home" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">HOME</WiniTypography>
              <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">보안/접근</WiniTypography>
              <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
              <WiniTypography variant="span" className="text-[#666] text-sm">메뉴 접근 권한</WiniTypography>
            </WiniBox>
          </WiniBox>
        </WiniGridLayout>


       




        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
           {/* 왼쪽: 메뉴 관리 섹션 */}
            <WiniGridItem>
               <WiniList listType="menu" ui="">
                  <WiniListSubheader ui="">권한 목록</WiniListSubheader>
              </WiniList>

              <WiniBox ui="form">
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                  <WiniGridItem >
                    <WiniText
                      ui="column"
                      id="outlined-basic"
                      label="권한명"
                      variant="outlined"
                      slotProps={{ inputLabel: { shrink: true } }}
                      name="searchAuthNm"
                      sx={{ }}
                      // value={searchAuthNm}
                      // onKeyUp={onKeyUp}
                      // onChange={onSearchChange}
                    />
                  </WiniGridItem>

                  


                  <WiniBox ui="btnitem">
                      <WiniButton
                        onClick={handleSearch}
                      >
                      검색
                      </WiniButton> 
                  </WiniBox>
              </WiniGridLayout>
              </WiniBox>

              {/* 트리 */}
              <WiniBox>
                <WiniTreeView
                  winiData={authTreeDataList}
                  openByDefault={false}
                  padding={25}
                  onSelect={onSelect}
                  ref={treeRef}
                  width={515}
                  height={500}
                >
                  {(props) => <WiniTreeItem {...props} name={'groupName'} />}
                </WiniTreeView>
              </WiniBox>


                <WiniBox ui="btnbox">
                  <WiniBox ui="btnitem">
                    <WiniButton ui="delete">삭제</WiniButton>
                  </WiniBox>
                  <WiniBox ui="btnitem">
                    <WiniButton ui="lineGray">초기화</WiniButton>
                    <WiniButton ui="line">수정</WiniButton>
                    <WiniButton ui="default">추가</WiniButton>
                  </WiniBox>
                </WiniBox>
              
              

            </WiniGridItem>

            <WiniGridItem ratio={2}>
              {/* 상세 */}

              <WiniBox ui="btnbox" className='justify-end'>
                <WiniBox ui="btnitem">
                  <WiniButton ui="default">등록</WiniButton>
                </WiniBox>
              </WiniBox>
            
             <WiniBox sx={{ width: '100%', height: 750 }}>
              <WiniAgGridReact
                rowStyle={{ lineHeight: 20 }}
                rowData={menuGridDataList}
                columnDefs={columnDefs}
              />
            </WiniBox>
              
            </WiniGridItem>

        </WiniGridLayout>


        
      </WiniFormEmpty>
    </WiniFormProvider>
  );
}
