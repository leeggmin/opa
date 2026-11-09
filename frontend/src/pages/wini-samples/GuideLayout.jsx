import React from 'react';
import { useState, Fragment } from 'react';
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
  WiniInputLabel
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


// >>>>>>> Stashed changes
  return (
    <Fragment>
      <WiniTypography variant="h1" className="fontSize-xxs">
        Grid
      </WiniTypography>

      <WiniIcon className="text-brand-main" icon="fav2"></WiniIcon>

      <WiniBox ui="btnbox">
        <WiniBox ui="btnitem">
          <WiniIconButton ui="default" icon="blog">
            아이콘버튼
          </WiniIconButton>
          <WiniIconButton ui="default" icon="down">
            아이콘버튼
          </WiniIconButton>
        </WiniBox>
        <WiniBox ui="btnitem"></WiniBox>
      </WiniBox>

      <WiniBox ui="btnbox">
        <WiniBox ui="btnitem">
          <WiniToggleButton 
            ui="default" icon="blog">
            토글버튼
          </WiniToggleButton>
        </WiniBox>
        <WiniBox ui="btnitem"></WiniBox>
      </WiniBox>

      <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
        <WiniGridItem>
          <WiniBox ui="info">
            <WiniTypography variant="h2">WiniBox default</WiniTypography>
          </WiniBox>
        </WiniGridItem>
        <WiniGridItem ratio={'none'} className="flex items-center">
          <WiniBox
            ui="btnbox"
            sx={{
              flexDirection: 'column',
            }}
          >
            <WiniIconButton
              iconOnly
              ui="line"
              icon="arrowRight"
              sx={{
                color: color.brand.sub1,
                width: '24px',
                height: '64px',
              }}
            >
              넣기
            </WiniIconButton>
            <WiniIconButton
              iconOnly
              ui="line"
              icon="arrowLeft"
              sx={{
                color: color.brand.sub1,
                width: '24px',
                height: '64px',
              }}
            >
              빼기
            </WiniIconButton>
          </WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox ui="info">
            <WiniTypography variant="h2">WiniBox default</WiniTypography>
          </WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
      <WiniFormEmpty>
        <WiniBox>
          <WiniTypography variant="h2">WiniBox default</WiniTypography>
          <WiniButtonGroup ui="full">
            <WiniButton ui="default">test</WiniButton>
            <WiniButton ui="gray">test</WiniButton>
          </WiniButtonGroup>
          <WiniButtonGroup ui="list">
            <WiniButton ui="default">test</WiniButton>
            <WiniButton ui="gray">test</WiniButton>
            <WiniButton ui="line">test</WiniButton>
            <WiniButton ui="lineGray">test</WiniButton>
            <WiniButton ui="delete">test</WiniButton>
            <WiniButton
              ui="gray"
              loading
              loadingPosition="start"
              loadingIndicatorColor="#fff"
              startIcon={<SaveIcon />}
            >
              test
            </WiniButton>
          </WiniButtonGroup>
          <WiniBox ui="btnbox">
            <WiniBox ui="btnitem">
              <WiniButton ui="default">test</WiniButton>
              <WiniButton ui="gray">test</WiniButton>
              <WiniButton ui="line">test</WiniButton>
              <WiniButton ui="lineGray">test</WiniButton>
              <WiniButton ui="delete">test</WiniButton>
              <WiniButton
                ui="gray"
                loading
                loadingPosition="start"
                loadingIndicatorColor="#fff"
                startIcon={<SaveIcon />}
              >
                test
              </WiniButton>
            </WiniBox>
            <WiniBox ui="btnitem"></WiniBox>
          </WiniBox>
          <WiniBox ui="btnbox">
            <WiniBox ui="btnitem">
              <WiniButton ui="default">좌측 버튼</WiniButton>
            </WiniBox>
            <WiniBox ui="btnitem">
              <WiniButton ui="default">우측 버튼</WiniButton>
            </WiniBox>
          </WiniBox>
        </WiniBox>
        <WiniBox ui="info" sx={{ mt: 3 }}>
          <WiniTypography variant="h2">WiniBox info</WiniTypography>
        </WiniBox>
        <WiniBox ui="line" sx={{ mt: 2 }}>
          <WiniTypography variant="h2">WiniBox line</WiniTypography>
        </WiniBox>

        <WiniBox ui="form">
          <WiniGridLayout container columnSpacing={2} rowSpacing={3} ui="form">
            <WiniGridItem>
              <WiniText
                ui="column"
                label="default"
                sx={{}} //스타일
                placeholder={'default'}
                className=""
              />
            </WiniGridItem>
            <WiniGridItem>
              <WiniText
                ui="column"
                label="default"
                sx={{}} //스타일
                placeholder={'default'}
                className=""
                inputClassName=""
              />
            </WiniGridItem>
          </WiniGridLayout>
          <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
            <WiniGridItem ratio={'2'}>
              <WiniText
                ui="column"
                label="default"
                sx={{}} //스타일
                placeholder={'default'}
                className=""
              />
            </WiniGridItem>
            <WiniGridItem>
              <WiniText
                ui="column"
                label="default"
                sx={{}} //스타일
                placeholder={'default'}
                className=""
              />
            </WiniGridItem>
          </WiniGridLayout>
		  
        </WiniBox>
        <WiniGridLayout isItem size={{ xs: 6 }} className="mt-20" id="menuTest">
          <WiniList className="max-w-100">
            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  aria-expanded={!!openDepth1?.['menu-1']}
                  aria-controls="menu-1"
                  onClick={() => handleDepth1Toggle('menu-1')}
                  className='depth1'
                >
                  Menu 1
                <WiniIcon icon={openDepth1?.['menu-1'] ? "up" : "down"} sx={{ width: 20, height: 20}}></WiniIcon>
                </WiniButton>
                <WiniCollapse
                  in={!!openDepth1?.['menu-1']}
                  timeout="auto"
                  unmountOnExit
                >
                  <WiniList id="menu-1">
                    <WiniListItem>
                      <WiniListItemText>
                        <WiniButton
                          aria-expanded={!!openDepth1?.['menu-1'] && openDepth2?.['menu-1'] === 'menu-1-1'}
                          aria-controls="menu-1-1"
                          onClick={() => handleDepth2Toggle('menu-1', 'menu-1-1')}
                          className='activeMenu'
                        >
                          Menu 1-1
                          <WiniIcon icon={!!openDepth1?.['menu-1'] && openDepth2?.['menu-1'] === 'menu-1-1' ? "up" : "down"} sx={{ width: 20, height: 20}} />
                        </WiniButton>
                        <WiniCollapse
                          in={!!openDepth1?.['menu-1'] && openDepth2?.['menu-1'] === 'menu-1-1'}
                          timeout="auto"
                          unmountOnExit
                        >
                          <WiniList id="menu-1-1">
                            <WiniListItem>
                              <WiniButton >Menu 1-1-1</WiniButton>
                            </WiniListItem>
                            <WiniListItem>
                              <WiniButton >Menu 1-1-2</WiniButton>
                            </WiniListItem>
                          </WiniList>
                        </WiniCollapse>
                      </WiniListItemText>
                    </WiniListItem>

                    <WiniListItem>
                      <WiniButton >Menu 1-2</WiniButton>
                    </WiniListItem>

                    <WiniListItem>
                      <WiniButton >Menu 1-3</WiniButton>
                    </WiniListItem>
                  </WiniList>
                </WiniCollapse>
              </WiniListItemText>

            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  aria-expanded={!!openDepth1?.['menu-2']}
                  aria-controls="menu-2"
                  onClick={() => handleDepth1Toggle('menu-2')}
                >
                  Menu 2
                  <WiniIcon icon={openDepth1?.['menu-2'] ? "up" : "down"} sx={{ width: 20, height: 20}}></WiniIcon>
                </WiniButton>
                <WiniCollapse
                  in={!!openDepth1?.['menu-2']}
                  timeout="auto"
                  unmountOnExit
                >
                  <WiniList id="menu-2">
                    <WiniListItem>
                      <WiniListItemText>
                        <WiniButton
                          aria-expanded={!!openDepth1?.['menu-2'] && openDepth2?.['menu-2'] === 'menu-2-1'}
                          aria-controls="menu-2-1"
                          onClick={() => handleDepth2Toggle('menu-2', 'menu-2-1')}
                          className='activeMenu'
                        >
                          Menu 2-1
                          <WiniIcon icon={!!openDepth1?.['menu-2'] && openDepth2?.['menu-2'] === 'menu-2-1' ? "up" : "down"} sx={{ width: 20, height: 20}} />
                        </WiniButton>
                        <WiniCollapse
                          in={!!openDepth1?.['menu-2'] && openDepth2?.['menu-2'] === 'menu-2-1'}
                          timeout="auto"
                          unmountOnExit
                        >
                          <WiniList id="menu-2-1">
                            <WiniListItem>
                              <WiniButton >Menu 2-1-1</WiniButton>
                            </WiniListItem>
                            <WiniListItem>
                              <WiniButton >Menu 2-1-2</WiniButton>
                            </WiniListItem>
                          </WiniList>
                        </WiniCollapse>
                      </WiniListItemText>
                    </WiniListItem>

                    <WiniListItem>
                      <WiniButton >Menu 2-2</WiniButton>
                    </WiniListItem>

                    <WiniListItem>
                      <WiniButton >Menu 2-3</WiniButton>
                    </WiniListItem>
                  </WiniList>
                </WiniCollapse>
              </WiniListItemText>
            
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  aria-expanded={!!openDepth1?.['menu-3']}
                  aria-controls="menu-3"
                  onClick={() => handleDepth1Toggle('menu-3')}
                >
                  Menu 3
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>
          </WiniList>
        </WiniGridLayout>


        <WiniGridLayout isItem size={{ xs: 6 }} className="mt-20">


            <WiniTypography variant="h1" className="mb-10">페이지 타이틀 24px Bold</WiniTypography>

            <WiniList listType="text" ui=""
				/*
					ui
					"" : 1차 메뉴
					dep_02 : 2차 메뉴 들여쓰기
					dep_03 : 3차 메뉴 들여쓰기
				*/
				>
				<WiniListSubheader ui=""
					/*
					ui
						"" : 1차 타이틀
						dep_02 : 2차 타이틀
						dep_03 : 3차 타이틀
					*/
				>1차 타이틀</WiniListSubheader>
				<WiniListItem ui="dot"
					/*
					ui
						"" : 마커없음
						dot : ·
						bar   : -
						demical : 1. 2. 3.
						lower_alpha : a) b) c)
					*/
				>
					<WiniListItemText primary="마커 : dot" />
				</WiniListItem>
				<WiniListItem ui="dot">
					<WiniListItemIcon></WiniListItemIcon>
					<WiniListItemText primary="마커 : dot" />
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="dep_02">
				<WiniListSubheader ui="dep_02">2차 타이틀</WiniListSubheader>
				<WiniListItem>
					<WiniBox ui="info" className="w-full">
						<WiniList listType="text" ui="dep_01">
							<WiniListItem ui="bar">
							<WiniListItemText primary="WiniBox info" />
							</WiniListItem>
							<WiniListItem ui="bar">
							<WiniListItemIcon></WiniListItemIcon>
							<WiniListItemText primary="WiniBox info" />
							</WiniListItem>
						</WiniList>
					</WiniBox>
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="">
				<WiniListItem ui="bar">
					<WiniListItemText primary="1차 항목 마커 : bar" />
				</WiniListItem>
				<WiniListItem ui="bar">
					<WiniListItemIcon></WiniListItemIcon>
					<WiniListItemText primary="1차 항목 마커 : bar" />
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="dep_02">
				<WiniListItem ui="bar">
					<WiniListItemText primary="2차 항목 마커 : bar" />
				</WiniListItem>
				<WiniListItem ui="bar">
					<WiniListItemIcon></WiniListItemIcon>
					<WiniListItemText primary="2차 항목 마커 : bar" />
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="dep_03">
				<WiniListSubheader ui="dep_03">3차 타이틀</WiniListSubheader>
				<WiniListItem ui="demical">
					<WiniListItemText primary="3차 항목 마커 : demical" />
				</WiniListItem>
				<WiniListItem ui="demical">
					<WiniListItemIcon></WiniListItemIcon>
					<WiniListItemText primary="3차 항목 마커 : demical" />
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="dep_02">
				<WiniListSubheader ui="dep_02">2차 타이틀</WiniListSubheader>
				<WiniListItem ui="lower_alpha">
					<WiniListItemText primary="2차 항목 마커 : lower_alpha" />
				</WiniListItem>
				<WiniListItem ui="lower_alpha">
					<WiniListItemIcon></WiniListItemIcon>
					<WiniListItemText primary="2차 항목 마커 : lower_alpha" />
				</WiniListItem>
			</WiniList>
			<WiniList listType="text" ui="dep_02">
				<WiniListSubheader ui="dep_02">2차 타이틀</WiniListSubheader>
				<WiniListItem>
					<WiniBox ui="line" className="w-full">
						<WiniListItem>
							<WiniListItemText primary="WiniBox line" />
						</WiniListItem>
						<WiniListItem>
						<WiniListItemIcon></WiniListItemIcon>
							<WiniListItemText primary="WiniBox line" />
						</WiniListItem>
					</WiniBox>
				</WiniListItem>
			</WiniList>
        </WiniGridLayout>


        <WiniGridLayout>

          <WiniTypography variant="h1">메뉴등록</WiniTypography>
          <WiniGridLayout container columnSpacing={2} rowSpacing={3}>


            {/* 왼쪽: 메뉴 관리 섹션 */}
            <WiniGridItem>
               <WiniList listType="menu" ui="">
                <WiniListSubheader ui="">메뉴 목록</WiniListSubheader>
              </WiniList>

              {/* 검색폼 */}
              <WiniBox ui="form">
                 <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem >
                      <WiniSelect
                        ui= "column"
                        tabIndex={1}
                        label="메뉴목록검색"
                        sx={{ width: '100%' }}
                        // value={searchValue}
                        inputProps={{ tabIndex: 0 }}
                        defaultValue={''}
                        autoFocus={true}
                        displayEmpty
                        labelProps={{ shrink: true }}
                        // onChange={onSearchChange}
                      >
                        <WiniMenuItem value={''}>
                          {'전체'}
                        </WiniMenuItem>
                        {/* {menuOnly.map((item) => {
                          if (item.depth === 0) {
                            return (
                              <WiniMenuItem key={item.id} value={item.id}>
                                {item.name}
                              </WiniMenuItem>
                            );
                          }
                          return null;
                        })} */}
                      </WiniSelect>
                    </WiniGridItem>
                    <WiniBox ui="btnitem">
                       <WiniButton
                        ui="line"
                      >
                        순서수정
                      </WiniButton>
                      <WiniButton
                      >
                        검색
                      </WiniButton> 
                    </WiniBox>
                </WiniGridLayout>
              </WiniBox>

              {/* 트리 */}
              <WiniBox>
                <WiniTreeView
                  ref={treeref2}
                  winiData={list}
                  height={400}
                
                  disableDrag={false} //적지 않으면 기본이 true라 움직일수 없음
                  onChange={(newData) => setList(newData)} // 값이 변경되는경우떄문에 업데이트 되로록 ! 조회일떈 필요없음이거 안해주면 바꿔도 안됌!
                >
                  {(props) => (
                  
                    <WiniTreeCheckItem
                      {...props}
                      name={'name'}
                      field={'chk'}
                      toggleCheck={toggleNodeCheck}
                    />
                  )}
                </WiniTreeView>
              </WiniBox>

              {/* 상세 */}
              <WiniBox>
                <WiniList listType="menu" ui="">
                  <WiniListSubheader ui="">메뉴목록상세</WiniListSubheader>
                </WiniList>
                <WiniBox ui="form">
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem >
                        <WiniText
                          ui="column"
                          label="메뉴 Code"
                          sx={{}} //스타일
                          placeholder={'메뉴 Code'}
                          className=""
                        />
                      </WiniGridItem>
                      <WiniGridItem >
                        <WiniText
                          required
                          ui="column"
                          label="메뉴 명"
                          sx={{}} //스타일
                          placeholder={'메뉴 명'}
                          className=""
                        />
                      </WiniGridItem>
                  </WiniGridLayout>
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem >
                        <WiniText
                          ui="column"
                          label="상위메뉴 ID"
                          sx={{}} //스타일
                          placeholder={'상위메뉴 ID'}
                          className=""
                        />
                      </WiniGridItem>
                      <WiniGridItem >
                        <WiniText
                          ui="column"
                          label="메뉴 경로"
                          sx={{}} //스타일
                          placeholder={'메뉴 경로'}
                          className=""
                        />
                      </WiniGridItem>
                  </WiniGridLayout>
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem>

                        <WiniInputLabel>파일 업로드</WiniInputLabel>
                        <WiniBox
                          onDrop={handleDropAttachedFiles}
                          onDragOver={handleDragOverAttachedFiles}
                          sx={{
                            border: 1,
                            borderStyle: 'solid',
                            borderColor: color.border.default,
                            borderRadius: 1,
                            mt: 1,
                            p: 1,
                            backgroundColor: color.background.white,
                          }}
                        >
                          <WiniBox 
                            sx={{ 
                              overflowY: attachedFiles.length ? 'auto' : 'visible', 
                              maxHeight: attachedFiles.length ? 88 : 'none',
                              minHeight: 88,
                            }}
                            >
                          {attachedFiles.length ? (
                            <WiniList listType="file">
                              {attachedFiles.map((v) => (
                                <WiniListItem key={v.id} className="">
                                  <WiniListItemText>{v.name}</WiniListItemText>

                                  <WiniIconButton
                                    iconOnly
                                    ui=""
                                    icon="del"
                                    onClick={() => removeAttachedFile(v.id)}
                                    iconSx={{
                                      width: size.icon.sm,
                                      height: size.icon.sm,
                                      fontSize: size.icon.sm,
                                    }}
                                    sx={{
                                      color: color.text.point,
                                      width: '20px',
                                      height: '20px',
                                    }}
                                  /> 
                                </WiniListItem>
                              ))}
                            </WiniList>
                          ) : (
                            <>
                            <WiniBox
                              sx={{}}
                            >

                              <WiniTypography variant='span'>
                                {/* 첨부파일을 이곳에 드래그 해주세요. */}
                              </WiniTypography>
                              
                                
                            </WiniBox>
                          </>
                          )}
                          </WiniBox>
                        </WiniBox>

                        <WiniButton className='w-full mt-2' ui="line" onClick={handleBrowseAttachedFiles}>
                            파일 업로드
                          </WiniButton>
                          <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                          />

                      </WiniGridItem>
                  </WiniGridLayout>
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
              </WiniBox>
              

            </WiniGridItem>

             {/* 중앙: 매핑 버튼 */}
            <WiniGridItem ratio={'none'} className="flex items-center">
              <WiniBox
                ui="btnbox"
                sx={{
                  flexDirection: 'column',
                }}
              >
                <WiniIconButton
                  iconOnly
                  ui="line"
                  icon="arrowRight"
                  sx={{
                    color: color.brand.sub1,
                    width: '24px',
                    height: '64px',
                  }}
                >
                  넣기
                </WiniIconButton>
                <WiniIconButton
                  iconOnly
                  ui="line"
                  icon="arrowLeft"
                  sx={{
                    color: color.brand.sub1,
                    width: '24px',
                    height: '64px',
                  }}
                >
                  빼기
                </WiniIconButton>
              </WiniBox>
            </WiniGridItem>

            {/* 오른쪽: 프로그램 관리 섹션 */}
            <WiniGridItem>
              <WiniList listType="menu" ui="">
                <WiniListSubheader ui="">화면 목록</WiniListSubheader>
              </WiniList>

              {/* 검색폼 */}
              <WiniBox ui="form">
                 <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                    <WiniGridItem >
                      <WiniText
                        ui="column"
                        label="화면목록검색"
                        sx={{}} //스타일
                        placeholder={'화면목록검색'}
                      >

                      </WiniText>
                    </WiniGridItem>
                    <WiniBox ui="btnitem">
                      <WiniButton
                      >
                        검색
                      </WiniButton> 
                    </WiniBox>
                </WiniGridLayout>
              </WiniBox>

              <WiniBox sx={{ mt: 1, width: '100%', height: 400 }}>
                <WiniAgGridReact
                  // ref={gridRef}
                  // rowData={programs}
                  columnDefs={[
                    {
                      field: 'chk',
                      width: 100,
                      headerName: '선택',
                      cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
                      cellRenderer: (params) => (
                        <input
                          type="checkbox"
                          checked={params.value || false}
                          readOnly
                          style={{ cursor: 'pointer' }}
                        />
                      ),
                      onCellClicked: (params) => {
                        const newValue = !params.data.chk;
                        params.node.setDataValue('chk', newValue);
                      },
                    },
                    {
                      field: 'num',
                      headerName: 'No',
                      flex: 1,
                      cellStyle: { textAlign: 'center' },
                      sortable: false,
                    },
                    {
                      field: 'programCode',
                      headerName: '화면 Code',
                      flex: 1,
                      cellStyle: { textAlign: 'center' },
                      sortable: false,
                    },
                    {
                      field: 'programName',
                      headerName: '화면 명',
                      width: 250,
                      cellStyle: { textAlign: 'center' },
                      sortable: false,
                    },
                    {
                      field: 'status',
                      headerName: '사용여부',
                      flex: 1,
                      cellStyle: { textAlign: 'center' },
                      sortable: false,
                      // valueFormatter: gridstatusEnums,
                    },
                  ]}
                  pagination={true}
                  paginationPageSize={10}
                  paginationPageSizeSelector={[10, 20]}
                  // onSelectionChanged={onSelectionChanged}
                />
              </WiniBox>

               <WiniBox>
                <WiniList listType="menu" ui="">
                  <WiniListSubheader ui="">화면목록상세</WiniListSubheader>
                </WiniList>
                <WiniBox ui="form">
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem >
                        <WiniText
                          required
                          ui="column"
                          label="화면Code "
                          sx={{}} //스타일
                          placeholder={'화면Code '}
                          className=""
                        />
                      </WiniGridItem>
                      <WiniGridItem >
                        <WiniText
                          required
                          ui="column"
                          label="화면명"
                          sx={{}} //스타일
                          placeholder={'화면명'}
                          className=""
                        />
                      </WiniGridItem>
                  </WiniGridLayout>
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem >
                        <WiniText
                          required
                          ui="column"
                          label="화면경로 "
                          sx={{}} //스타일
                          placeholder={'화면경로 '}
                          className=""
                        />
                      </WiniGridItem>
                      <WiniGridItem >
                        <WiniCheckbox
                            name={'programMappingStatus'}
                            size={'small'}
                            // checked={programData.menuStatus}
                            label="화면경로 고정여부"
                            // onChange={onChange}
                            data-reset-value={true}
                          />
                      </WiniGridItem>
                  </WiniGridLayout>
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                      <WiniGridItem>
                        <WiniText
                          ui="column"
                          label="비고 "
                          sx={{}} //스타일
                          placeholder={'비고'}
                          className=""
                        />
                      </WiniGridItem>
                      <WiniGridItem >
                         <WiniCheckbox
                            name={'menuStatus'}
                            size={'small'}
                            // checked={programData.menuStatus}
                            label="메뉴여부"
                            // onChange={onChange}
                            data-reset-value={true}
                          />
                          <WiniCheckbox
                            name={'status'}
                            size={'small'}
                            // checked={programData.status}
                            label="사용여부"
                            // onChange={onChange}
                            data-reset-value={true}
                          />
                      </WiniGridItem>
                  </WiniGridLayout>
                  <WiniGridLayout container ui="form" columnSpacing={2} rowSpacing={3}>
                  <WiniGridItem >
                      <WiniBox ui="inputButton">
                        <WiniText
                          ui="column"
                          label="화면 관련 경로 "
                          sx={{}} //스타일
                          placeholder={'화면 관련 경로 '}
                          className=""
                        />
                        <WiniButton ui="line">추가</WiniButton>
                        </WiniBox>
                      </WiniGridItem>


                  </WiniGridLayout>
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
              </WiniBox>
                

            </WiniGridItem>
          </WiniGridLayout>
         
        </WiniGridLayout>

      </WiniFormEmpty>
    </Fragment>
  );
}
