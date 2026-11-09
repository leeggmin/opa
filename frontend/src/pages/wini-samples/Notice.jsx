import React from 'react';
import { useMemo, useState, Fragment } from 'react';
import {
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
  WiniFormControl,
  WiniPagination
} from '@/shared/ui/wini';

// import WiniTabContext from 'Co/atoms/TabContext/WiniTabContext'
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { SaveIcon } from '@/shared/lib';
import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Grid } from 'ag-grid-community';

import { NoticeList } from '@/features/notice/list/ui/List';
import { WiniFormProvider } from '@/shared/ui';

import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
export default function Component02() {
  const [tab, setTab] = useState(1);
  // const [openDepth1, setOpenDepth1] = useState('');
  // const [openDepth2, setOpenDepth2] = useState('');

  const handlerTab = (event, newValue) => {
    setTab(newValue);
  };

// <<<<<<< Updated upstream
  // const handleDepth1Toggle = (id) => {
  //   setOpenDepth1((prev) => (prev === id ? '' : id));
  //   setOpenDepth2('');
  // };

  // const handleDepth2Toggle = (id) => {
  //   setOpenDepth2((prev) => (prev === id ? '' : id));
  // };
// =======
  // 여러 개 depth1 메뉴를 동시에 열 수 있도록 상태를 "맵"으로 관리
  // openDepth1: { [depth1Id]: boolean }
  const [openDepth1, setOpenDepth1] = useState({});
  // openDepth2: { [parentDepth1Id]: openedDepth2Id | null }
  const [openDepth2, setOpenDepth2] = useState({});

  const handleDepth1Toggle = (id) => {
    setOpenDepth1((prev) => {
      const next = { ...prev, [id]: !prev?.[id] };
      return next;
    });

    // 부모 depth1을 닫을 때만 해당 depth2를 닫기
    setOpenDepth2((prev) => {
      if (!openDepth1?.[id]) return prev; // 지금 열려있는 상태였다면(=닫히는 경우) 아래에서 제거
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleDepth2Toggle = (parentId, id) => {
    // 부모 depth1이 열려있을 때만 하위 depth 토글
    if (!openDepth1?.[parentId]) return;
    setOpenDepth2((prev) => ({
      ...prev,
      [parentId]: prev?.[parentId] === id ? null : id,
    }));
  };


const data = [
  {
    id: '1',
    name: 'Chat Rooms',
    chk: false,
    children: [
      { id: 'a1', name: 'General', chk: false },
      { id: 'a2', name: 'Random', chk: false },
      { id: 'a3', name: 'Open Source Projects', chk: false },
    ],
  },
   {
    id: '2',
    name: 'Chat Rooms',
    chk: false,
    children: [
      { id: 'b1', name: 'General', chk: false },
      { id: 'b2', name: 'Random', chk: false },
      { id: 'b3', name: 'Open Source Projects', chk: false },
    ],
  },
  {
    id: '3',
    name: 'Chat Rooms',
    chk: false,
    children: [
      { id: 'c1', name: 'General', chk: false },
      { id: 'c2', name: 'Random', chk: false },
      { id: 'c3', name: 'Open Source Projects', chk: false },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    chk: false,
    children: [
      { id: 'd1', name: 'Alice', chk: false },
      { id: 'd2', name: 'Bob', chk: false },
      { id: 'd3', name: 'Charlie', chk: true },
    ],
  },
];


  const treeref = React.useRef();
  const treeref2 = React.useRef();
  const [list, setList] = React.useState(data);

  const fileInputRef = React.useRef(null);
  const [attachedFiles, setAttachedFiles] = React.useState([]);

  const addAttachedFiles = (filesLike) => {
    const files = Array.from(filesLike || []);
    if (files.length === 0) return;

    setAttachedFiles((prev) => {
      const existing = new Set(prev.map((v) => v.id));

      const next = files
        .map((file) => {
          const id = `${file.name}_${file.size}_${file.lastModified}`;
          return { id, name: file.name, file };
        })
        .filter((v) => !existing.has(v.id));

      return next.length ? [...prev, ...next] : prev;
    });
  };

  const removeAttachedFile = (id) => {
    setAttachedFiles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleDropAttachedFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addAttachedFiles(event.dataTransfer?.files);
  };

  const handleDragOverAttachedFiles = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  };

  const handleBrowseAttachedFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (event) => {
    addAttachedFiles(event.target?.files);
    if (event.target) event.target.value = '';
  };
  

  const selectNode = (node) => {
    console.log('Selected node:', node);
  };

  const toggleNodeCheck = (nodeId, checked) => {
    const toggle = (nodes) => {
      return nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, chk: checked };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });
    };
    setList((prev) => toggle(prev));
  };

  const [searchData, setSearchData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const allRows = useMemo(
    () =>
      Array.from({ length: 27 }).map((_, index) => {
        const no = index + 1;
        return {
          id: String(no),
          no,
          title: `공지사항 제목 ${no}`,
          content: `공지사항 내용 ${no}`,
          creatorName: `작성자${(no % 5) + 1}`,
          createAt: `2026-02-${String((no % 28) + 1).padStart(2, '0')}`,
          viewCount: (no * 3) % 100,
          fileList: no % 3 === 0 ? [{ id: 'f1' }] : [],
        };
      }),
    [],
  );

  const filteredRows = useMemo(() => {
    const title = (searchData.title ?? '').trim().toLowerCase();
    const content = (searchData.content ?? '').trim().toLowerCase();
    const author = (searchData.author ?? '').trim().toLowerCase();

    return allRows.filter((row) => {
      const rowTitle = (row.title ?? '').toLowerCase();
      const rowContent = (row.content ?? '').toLowerCase();
      const rowAuthor = (row.creatorName ?? '').toLowerCase();

      if (title && !rowTitle.includes(title)) return false;
      if (content && !rowContent.includes(content)) return false;
      if (author && !rowAuthor.includes(author)) return false;
      return true;
    });
  }, [allRows, searchData]);

  const totalPage = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPage);
  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, safePage]);

  const onSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const onEnter = (event) => {
    if (event.key !== 'Enter') return;
    setPage(1);
  };

  const onChangePage = (_event, nextPage) => {
    setPage(nextPage);
  };

  const onOpenDetail = (row) => {
    console.log('open notice detail:', row);
  };

  const formContextValue = useMemo(
    () => ({
      id: 'sample-notice',
      info: {},
      connector: null,
      winiAut: {
        select: 'DENY',
        insert: 'DENY',
        update: 'DENY',
        delete: 'DENY',
        print: 'DENY',
        down: 'DENY',
        manage: 'DENY',
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
    <Fragment>
      
      <WiniFormEmpty>
       
        <WiniGridLayout>

         <WiniBox className='flex items-center justify-between'>
          <WiniTypography variant="h1">공지사항</WiniTypography>
          <WiniBox className='flex items-center gap-1'>
            <WiniIcon icon="home" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
            <WiniTypography variant="span" className="text-[#666] text-sm">HOME</WiniTypography>
            <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
            <WiniTypography variant="span" className="text-[#666] text-sm">시스템관리</WiniTypography>
            <WiniIcon icon="right" sx={{ width: 20, height: 20, color:'#666' }}></WiniIcon>
            <WiniTypography variant="span" className="text-[#666] text-sm">공지사항</WiniTypography>
          </WiniBox>
        </WiniBox>


          <WiniGridLayout container columnSpacing={2} rowSpacing={3}>


            <WiniGridItem>
               <WiniList listType="menu" ui="">
                <WiniListSubheader ui="">공지사항 목록</WiniListSubheader>
              </WiniList>

              {/* 검색폼 */}
              <WiniBox ui="form">
                 <WiniGridLayout ui="form" container columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem ratio={'2'}>
                       <WiniFormControl sx={{  }}>
                        <WiniText
                          ui="column"
                          label="제목"
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                       </WiniFormControl>
                    </WiniGridItem>

                    <WiniGridItem ratio={'2'}>
                       <WiniFormControl sx={{  }}>
                        <WiniText
                          ui="column"
                          label="작성자"
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                       </WiniFormControl>
                    </WiniGridItem>
                    <WiniGridItem ratio={'2'}>
                       <WiniFormControl sx={{  }}>
                        <WiniText
                          ui="column"
                          label="내용"
                          slotProps={{ inputLabel: { shrink: true } }}
                        />
                       </WiniFormControl>
                    </WiniGridItem>

                    <WiniBox ui="btnitem">
                       <WiniButton
                        ui="line"
                      >
                        조회
                      </WiniButton>
                      <WiniButton
                      >
                        등록
                      </WiniButton> 
                  </WiniBox>
                    
                </WiniGridLayout>
                 
                    
              </WiniBox>

              {/* 공지사항 */}
              <WiniBox sx={{ mt: 1, width: '100%', height: 400 }}>
              

                <WiniAgGridReact
                     columnDefs={[
                      {
                        field: 'no',
                        headerName: 'No',
                        flex: 1,
                        cellStyle: { textAlign: 'center' },
                      },
                      {
                        field: 'title',
                        headerName: '제목',
                        flex: 6,
                        cellStyle: { textAlign: 'center' },
                      },
                      {
                        field: 'fileList',
                        headerName: '첨부',
                        flex: 1,
                        cellStyle: { textAlign: 'center' },
                        valueGetter: (params) =>
                          (params.data?.fileList?.length || 0) > 0 ? 'Y' : '',
                      },
                      {
                        field: 'creatorName',
                        headerName: '작성자',
                        flex: 2,
                        cellStyle: { textAlign: 'center' },
                      },
                      {
                        field: 'createAt',
                        headerName: '등록일',
                        flex: 3,
                        cellStyle: { textAlign: 'center' },
                      },
                      {
                        field: 'viewCount',
                        headerName: '조회수',
                        flex: 1,
                        cellStyle: { textAlign: 'center' },
                      },
                    ]}
                  rowData={rows}
                  onCellClicked={(e) => onOpenDetail?.(e.data)}
                />

              </WiniBox>


              <WiniBox
                margin="1%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <WiniPagination
                  count={totalPage}
                  page={safePage}
                  size="small"
                  onChange={onChangePage}
                />
              </WiniBox>

             
            </WiniGridItem>

          </WiniGridLayout>
         
        </WiniGridLayout>

      </WiniFormEmpty>
    </Fragment>
  );
}
