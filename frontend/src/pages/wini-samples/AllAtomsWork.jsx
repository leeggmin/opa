import { useMemo, useState } from 'react';
import {
  WiniAccordion,
  WiniAccordionDetails,
  WiniAccordionSummary,
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniButtonGroup,
  WiniCard,
  WiniCardActions,
  WiniCardContent,
  WiniCardMedia,
  WiniCheckbox,
  WiniCodeEditor,
  WiniCollapse,
  WiniDateTimePicker,
  WiniDialog,
  WiniDialogActions,
  WiniDialogContent,
  WiniDialogContentText,
  WiniDialogTitle,
  WiniDrawer,
  WiniFormControl,
  WiniFormControlLabel,
  WiniGridItem,
  WiniGridLayout,
  WiniIconButton,
  WiniInputLabel,
  WiniList,
  WiniListItem,
  WiniListItemIcon,
  WiniListItemText,
  WiniListSubheader,
  WiniMenuItem,
  WiniPaper,
  WiniPopover,
  WiniSelect,
  WiniSnackbar,
  WiniStack,
  WiniSwitch,
  WiniTab,
  WiniTabPanel,
  WiniTabs,
  WiniText,
  WiniToggleButton,
  WiniToggleButtonGroup,
  WiniToolbar,
  WiniTreeItem,
  WiniTreeView,
  WiniTypography,
} from '@/shared/ui/wini';
import { dayjs } from '@/shared/config';

const DemoCard = ({ title, children }) => (
  <WiniPaper
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }}
  >
    <WiniTypography
      variant="h6"
      sx={{ m: 0, px: 3, py: 2, borderBottom: '1px solid #bbb' }}
    >
      {title}
    </WiniTypography>
    <WiniBox sx={{ p: 3, flex: 1, minHeight: 0 }}>{children}</WiniBox>
  </WiniPaper>
);

const initialTreeData = [
  {
    id: '1',
    name: '애플리케이션',
    chk: false,
    children: [{ id: '2', name: '캘린더', menuType: 'MENU', chk: false }],
  },
  {
    id: '3',
    name: '문서',
    chk: false,
    children: [{ id: '4', name: '보고서.pdf', menuType: 'MENU', chk: false }],
  },
];

export default function AllAtomsWork() {
  const [tabValue, setTabValue] = useState('overview');
  const [status, setStatus] = useState('ALL');
  const [showExtra, setShowExtra] = useState(true);
  const [toggleValue, setToggleValue] = useState('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [dateValue, setDateValue] = useState('');
  const [treeData, setTreeData] = useState(initialTreeData);
  const [code, setCode] = useState('// 여기에 코드를 입력하세요.');

  const gridColumns = useMemo(
    () => [
      { headerName: '제조사', field: 'make' },
      { headerName: '모델', field: 'model' },
      { headerName: '연식', field: 'year' },
      { headerName: '가격', field: 'price' },
    ],
    [],
  );

  const gridRows = useMemo(
    () => [
      { make: 'Toyota', model: 'Corolla', year: 2023, price: 22000 },
      { make: 'Tesla', model: 'Model 3', year: 2024, price: 39990 },
      { make: 'BMW', model: 'X5', year: 2022, price: 61000 },
    ],
    [],
  );

  const handleTreeCheck = (nodeId, checked) => {
    const toggle = (nodes) =>
      nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, chk: checked };
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) };
        }
        return node;
      });

    setTreeData((prev) => toggle(prev));
  };

  const handleDateChange = (event) => {
    const nextValue = event?.target?.value;
    if (nextValue?.format instanceof Function) {
      setDateValue(nextValue.format('YYYY-MM-DD HH:mm'));
      return;
    }
    setDateValue('');
  };

  return (
    <WiniBox className="pt-8">
      <WiniTypography variant="h1">AllAtomsWork</WiniTypography>
      <WiniTypography variant="h2">
        실제 구현 결과를 2열로 빠르게 확인하는 페이지
      </WiniTypography>

      <WiniGridLayout
        container
        columnSpacing={2}
        rowSpacing={2}
        className="mt-4"
        sx={{ alignItems: 'stretch' }}
      >
        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniGridLayout / WiniGridItem">
            <WiniGridLayout container columnSpacing={1} rowSpacing={1}>
              <WiniGridItem ratio={1}>
                <WiniBox ui="line" className="p-3 text-center">
                  <WiniTypography variant='span'>비율 1</WiniTypography>
                </WiniBox>
              </WiniGridItem>
              <WiniGridItem ratio={1}>
                <WiniBox ui="line" className="p-3 text-center">
                  <WiniTypography variant='span'>비율 1</WiniTypography>
                </WiniBox>
              </WiniGridItem>
            </WiniGridLayout>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniAccordion">
            <WiniAccordion>
              <WiniAccordionSummary>조직 정보</WiniAccordionSummary>
              <WiniAccordionDetails>
                <WiniTypography>아코디언 상세 내용 영역</WiniTypography>
              </WiniAccordionDetails>
            </WiniAccordion>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniButton / WiniButtonGroup / WiniIconButton">
            <WiniStack spacing={1}>
              <WiniBox ui="btnitem">
                <WiniButton ui="default">저장</WiniButton>
                <WiniButton ui="line">취소</WiniButton>
              </WiniBox>
              <WiniButtonGroup ui="list">
                <WiniButton ui="line">이전</WiniButton>
                <WiniButton ui="default">다음</WiniButton>
              </WiniButtonGroup>
              <WiniIconButton icon="search" aria-label="검색" />
            </WiniStack>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniText / WiniSelect / WiniInputLabel / WiniCheckbox">
            <WiniStack spacing={2}>
              <WiniText ui="column" label="이름" placeholder="이름 입력" />
              <WiniFormControl fullWidth>
                {/* <WiniInputLabel id="status-label" shrink>
                  상태
                </WiniInputLabel> */}
                <WiniSelect
                  id="status-select"
                  value={status}
                  label="상태"
                  onChange={(event) => setStatus(event.target.value)}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <WiniMenuItem value="ALL">전체</WiniMenuItem>
                  <WiniMenuItem value="Y">사용</WiniMenuItem>
                  <WiniMenuItem value="N">미사용</WiniMenuItem>
                </WiniSelect>
              </WiniFormControl>
              <WiniFormControlLabel
                control={<WiniCheckbox defaultChecked />}
                label="활성"
              />
            </WiniStack>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniTabs / WiniTab / WiniTabPanel">
            <WiniTabs
              value={tabValue}
              onChange={(_, next) => setTabValue(next)}
            >
              <WiniTab value="overview" label="개요" />
              <WiniTab value="history" label="이력" />
            </WiniTabs>
            <WiniTabPanel value={tabValue} index="overview" className="px-2 py-3">
              <WiniTypography>개요 탭 내용</WiniTypography>
            </WiniTabPanel>
            <WiniTabPanel value={tabValue} index="history" className="px-2 py-3">
              <WiniTypography>이력 탭 내용</WiniTypography>
            </WiniTabPanel>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniList / WiniListItem 계열">
            <WiniList listType="text">
              <WiniListSubheader>1차 목록</WiniListSubheader>
              <WiniListItem ui="dot">
                <WiniListItemText primary="도트 마크 항목" />
              </WiniListItem>
              <WiniListItem ui="bar">
                <WiniListItemIcon />
                <WiniListItemText primary="바 마크 + 아이콘 조합" />
              </WiniListItem>
            </WiniList>

            <WiniList listType="text" ui="dep_02">
              <WiniListSubheader ui="dep_02">2차 목록</WiniListSubheader>
              <WiniListItem ui="demical" listType="text">
                <WiniListItemText primary="숫자 마크(demical)" />
              </WiniListItem>
              <WiniListItem ui="lower_alpha" listType="text">
                <WiniListItemText primary="영문 소문자 마크" />
              </WiniListItem>
            </WiniList>

            <WiniList listType="text" ui="dep_03">
              <WiniListSubheader ui="dep_03">3차 목록</WiniListSubheader>
              <WiniListItem ui="dot" listType="text">
                <WiniListItemText primary="dep_03 + dot 예시" />
              </WiniListItem>
            </WiniList>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniSwitch / WiniCollapse / WiniToggleButton">
            <WiniFormControlLabel
              control={
                <WiniSwitch
                  checked={showExtra}
                  onChange={() => setShowExtra((prev) => !prev)}
                />
              }
              label="추가 영역 표시"
            />
            <WiniCollapse in={showExtra}>
              <WiniBox ui="info">
                <WiniTypography variant="span">
                  토글 영역이 현재 표시됩니다.
                </WiniTypography>
              </WiniBox>
            </WiniCollapse>
            <WiniToggleButtonGroup
              value={toggleValue}
              exclusive
              onChange={(_, value) => value && setToggleValue(value)}
            >
              <WiniToggleButton value="grid">그리드</WiniToggleButton>
              <WiniToggleButton value="list">목록</WiniToggleButton>
            </WiniToggleButtonGroup>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniDateTimePicker">
            <WiniDateTimePicker
              label="날짜 + 시간"
              views={['year', 'month', 'day', 'hours', 'minutes']}
              format="YYYY-MM-DD HH:mm"
              ampm={false}
              minDateTime={dayjs().startOf('day')}
              maxDateTime={dayjs().endOf('month')}
              onChange={handleDateChange}
            />
            <WiniTypography variant="span" className='block mt-2'>
              선택값: {dateValue || '-'}
            </WiniTypography>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniDialog / WiniSnackbar / WiniPopover">
            <WiniBox ui="btnitem">
              <WiniButton ui="line" onClick={() => setDialogOpen(true)}>
                Dialog 열기
              </WiniButton>
              <WiniButton ui="line" onClick={() => setSnackbarOpen(true)}>
                Snackbar 열기
              </WiniButton>
              <WiniButton
                ui="line"
                aria-describedby="all-atoms-popover"
                onClick={(event) => setPopoverAnchor(event.currentTarget)}
              >
                Popover 열기
              </WiniButton>
            </WiniBox>

            <WiniDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <WiniDialogTitle>확인</WiniDialogTitle>
              <WiniDialogContent>
                <WiniDialogContentText>
                  AllAtomsWork에서 Dialog 동작을 확인하는 예시입니다.
                </WiniDialogContentText>
              </WiniDialogContent>
              <WiniDialogActions>
                <WiniButton ui="line" onClick={() => setDialogOpen(false)}>
                  취소
                </WiniButton>
                <WiniButton ui="default" onClick={() => setDialogOpen(false)}>
                  확인
                </WiniButton>
              </WiniDialogActions>
            </WiniDialog>

            <WiniSnackbar
              open={snackbarOpen}
              autoHideDuration={2000}
              onClose={() => setSnackbarOpen(false)}
              message="저장되었습니다."
            />

            <WiniPopover
              id="all-atoms-popover"
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={() => setPopoverAnchor(null)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <WiniBox className="p-3">
                <WiniTypography variant="span">Popover 내용</WiniTypography>
              </WiniBox>
            </WiniPopover>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniCard">
            <WiniCard>
              <WiniCardMedia
                component="img"
                height="120"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                alt="card sample"
              />
              <WiniCardContent>
                <WiniTypography gutterBottom variant="h5" component="div">
                  카드 미리보기
                </WiniTypography>
                <WiniTypography variant="body2" color="text.secondary">
                  카드 본문 텍스트 예시입니다.
                </WiniTypography>
              </WiniCardContent>
              <WiniCardActions>
                <WiniButton size="small" ui="line">
                  공유
                </WiniButton>
              </WiniCardActions>
            </WiniCard>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniTreeView">
            <WiniTreeView
              winiData={treeData}
              height={240}
              width="100%"
              disableDrag
              onChange={(newData) => setTreeData(newData)}
            >
              {(props) => (
                <WiniTreeItem
                  {...props}
                  leaf={{ column: 'menuType', value: 'MENU' }}
                  field="chk"
                  toggleCheck={handleTreeCheck}
                />
              )}
            </WiniTreeView>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniDrawer / WiniToolbar">
            <WiniButton
              ui="line"
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              {drawerOpen ? 'Drawer 닫기' : 'Drawer 열기'}
            </WiniButton>
            <WiniDrawer
              open={drawerOpen}
              variant="persistent"
              onClose={() => setDrawerOpen(false)}
            >
              <WiniToolbar />
              <WiniBox className="p-4">
                <WiniTypography>Drawer 내용</WiniTypography>
              </WiniBox>
            </WiniDrawer>
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniCodeEditor">
            <WiniCodeEditor
              label="코드 에디터"
              height="200px"
              language="javascript"
              value={code}
              onChange={setCode}
              className='text-sm text-amber-500'
              
            />
          </DemoCard>
        </WiniGridItem>

        <WiniGridItem size={{ xs: 12 }} sx={{ display: 'flex' }}>
          <DemoCard title="WiniAgGridReact">
            <div className="ag-theme-alpine" style={{ height: 280 }}>
              <WiniAgGridReact columnDefs={gridColumns} rowData={gridRows} />
            </div>
          </DemoCard>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniBox>
  );
}
