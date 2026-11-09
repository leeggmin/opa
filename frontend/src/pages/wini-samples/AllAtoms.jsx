import { useState } from 'react';
import {
  WiniGridLayout,
  WiniAccordion,
  WiniAccordionSummary,
  WiniAccordionDetails,
  WiniAgGridReact,
  WiniAppBar,
  WiniAvatar,
  WiniBadge,
  WiniButton,
  WiniCard,
  WiniCardActions,
  WiniCardContent,
  WiniCardHeader,
  WiniCheckbox,
  WiniChip,
  WiniCodeEditor,
  WiniCollapse,
  WiniDateTimePicker,
  WiniDialog,
  WiniDialogActions,
  WiniDialogContent,
  WiniDialogContentText,
  WiniDialogTitle,
  WiniDivider,
  WiniFab,
  WiniFormControlLabel,
  WiniPaper,
  WiniStack,
  WiniSwitch,
  WiniTab,
  WiniTabs,
  WiniTooltip,
  WiniTypography,
  WiniBox,
  WiniBottomNavigation,
  WiniBottomNavigationAction,
  WiniBreadcrumbs,
  WiniCardActionArea,
  WiniCardMedia,
  WiniCode,
  WiniDrawer,
  WiniEditor,
  WiniFade,
  WiniFormControl,
  WiniHashTagInput,
  WiniIconButton,
  WiniImageList,
  WiniImageListItem,
  WiniInputAdornment,
  WiniInputBase,
  WiniInputLabel,
  WiniList,
  WiniListItem,
  WiniListItemIcon,
  WiniListItemText,
  WiniListSubheader,
  WiniMasonry,
  WiniMenuItem,
  WiniNumber,
  WiniOutlinedInput,
  WiniPagination,
  WiniPopover,
  WiniPopper,
  WiniSelect,
  WiniSnackbar,
  WiniTabPanel,
  WiniText,
  WiniToggleButton,
  WiniToggleButtonGroup,
  WiniToolbar,
  WiniTreeCheckItem,
  WiniTreeItem,
  WiniTreeView,
  WiniUploadButton,
} from '@/shared/ui/wini';
import { dayjs } from '@/shared/config';

/* ---------- 공통 데모 카드 ---------- */
const DemoCard = ({ title, description, children }) => (
  <WiniPaper sx={{ p: 2 }}>
    <WiniStack spacing={1.5}>
      <WiniTypography variant="h6">{title}</WiniTypography>
      <WiniTypography variant="body2" color="text.secondary">
        {description}
      </WiniTypography>
      <WiniDivider />
      <WiniBox>{children}</WiniBox>
    </WiniStack>
  </WiniPaper>
);

const initialMenuData = [
  {
    id: '1',
    name: 'Applications',
    chk: false,
    children: [{ id: '2', name: 'Calendar', menuType: 'MENU', chk: false }],
  },
  {
    id: '5',
    name: 'Documents',
    chk: false,
    children: [
      { id: '10', name: 'OSS', menuType: 'MENU', chk: false },
      {
        id: '6',
        name: 'MUI',
        chk: false,
        children: [{ id: '8', name: 'index.js', menuType: 'MENU', chk: false }],
      },
    ],
  },
];

export default function AllAtoms() {
  const [code, setCode] = useState('// 여기에 코드를 입력하세요');
  const [tabValue, setTabValue] = useState(0);
  const [checked, setChecked] = useState(true);
  const [toggleValue, setToggleValue] = useState('left');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [menu, setMenu] = useState(initialMenuData);
  const [dtBasic, setDtBasic] = useState('');
  const [dtHM, setDtHM] = useState('');
  const [dtHMS, setDtHMS] = useState('');
  const [dtAmpm, setDtAmpm] = useState('');
  const [dtRequired, setDtRequired] = useState('');
  const [dtRange, setDtRange] = useState('');
  const [age, setAge] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectNode = () => {};

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
    setMenu(toggle(menu));
  };

  return (
    <WiniGridLayout container columnSpacing={2} rowSpacing={4} sx={{ p: 2 }}>
      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniAccordion, WiniAccordionSummary, WiniAccordionDetails, WiniTypography (아코디언)"
          description="콘텐츠를 접고 펼치는 UI"
        >
          <WiniAccordion>
            <WiniAccordionSummary>조직 정보</WiniAccordionSummary>
            <WiniAccordionDetails>
              <WiniTypography>조직 설명</WiniTypography>
            </WiniAccordionDetails>
          </WiniAccordion>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniAppBar, WiniTypography (앱바)"
          description="상단 네비게이션"
        >
          <WiniAppBar position="static">
            <WiniTypography sx={{ p: 1 }}>관리자 콘솔</WiniTypography>
          </WiniAppBar>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniAvatar, WiniBadge, WiniButton (아바타/배지)"
          description="사용자 정보"
        >
          <WiniStack direction="row" spacing={2}>
            <WiniAvatar>H</WiniAvatar>
            <WiniBadge badgeContent={3} color="primary">
              <WiniButton>알림</WiniButton>
            </WiniBadge>
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniButton (버튼)" description="주요 액션">
          <WiniStack direction="row" spacing={1}>
            <WiniButton variant="contained">저장</WiniButton>
            <WiniButton variant="outlined">취소</WiniButton>
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniCheckbox, WiniChip" description="선택/태그">
          <WiniStack direction="row" spacing={2}>
            <WiniCheckbox defaultChecked />
            <WiniChip label="태그" />
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniInputBase, WiniInputAdornment, WiniIconButton"
          description="입력 필드"
        >
          <WiniInputBase
            placeholder="검색"
            startAdornment={
              <WiniInputAdornment position="start">
                <WiniIconButton>🔍</WiniIconButton>
              </WiniInputAdornment>
            }
          />
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniUploadButton" description="파일 업로드">
          <WiniUploadButton>파일 선택</WiniUploadButton>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniFade, WiniPopper" description="트랜지션">
          <WiniPopper open>
            <WiniFade in>
              <WiniPaper sx={{ p: 1 }}>Fade Popper</WiniPaper>
            </WiniFade>
          </WiniPopper>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniTabs, WiniTab (탭)" description="카테고리 전환">
          <WiniTabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
            <WiniTab label="기본 정보" />
            <WiniTab label="권한 설정" />
          </WiniTabs>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniCodeEditor (코드 편집기)" description="코드 편집">
          <WiniCodeEditor
            height="180px"
            language="javascript"
            value={code}
            onChange={setCode}
          />
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniBottomNavigation, WiniBottomNavigationAction (내비게이션)"
          description="하단 네비게이션"
        >
          <WiniBottomNavigation showLabels>
            <WiniBottomNavigationAction label="최근" />
            <WiniBottomNavigationAction label="즐겨찾기" />
            <WiniBottomNavigationAction label="주변" />
          </WiniBottomNavigation>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniBreadcrumbs, WiniTypography"
          description="페이지 경로 표시"
        >
          <WiniBreadcrumbs aria-label="breadcrumb">
            <WiniTypography color="text.primary">홈</WiniTypography>
            <WiniTypography color="text.primary">컴포넌트</WiniTypography>
            <WiniTypography color="text.primary">브레드크럼</WiniTypography>
          </WiniBreadcrumbs>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniCard, WiniCardMedia, WiniCardContent, WiniTypography, WiniCardActionArea, WiniCardActions, WiniButton"
          description="콘텐츠 컨테이너"
        >
          <WiniCard>
            <WiniCardMedia
              component="img"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <WiniCardContent>
              <WiniTypography gutterBottom variant="h5" component="div">
                도마뱀
              </WiniTypography>
              <WiniTypography variant="body2" color="text.secondary">
                도마뱀은 전 세계에 널리 분포한 파충류로, 6,000종이 넘으며 남극을
                제외한 모든 대륙에 서식합니다.
              </WiniTypography>
            </WiniCardContent>
            <WiniCardActionArea>
              <WiniCardActions>
                <WiniButton size="small">공유</WiniButton>
              </WiniCardActions>
            </WiniCardActionArea>
          </WiniCard>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniImageList, WiniImageListItem"
          description="이미지 리스트"
        >
          <WiniImageList cols={3}>
            {[1, 2, 3].map((i) => (
              <WiniImageListItem key={i}>
                <img src={`https://picsum.photos/200?random=${i}`} />
              </WiniImageListItem>
            ))}
          </WiniImageList>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniNumber, WiniOutlinedInput, WiniText"
          description="입력 타입"
        >
          <WiniStack spacing={1}>
            <WiniNumber value={10} />
            <WiniOutlinedInput placeholder="Outlined" />
            <WiniText value="읽기 전용 텍스트" />
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniDialog, WiniDialogTitle, WiniDialogContent, WiniDialogContentText, WiniDialogActions, WiniButton"
          description="상호작용 창"
        >
          <WiniButton variant="outlined" onClick={() => setDialogOpen(true)}>
            대화상자 열기
          </WiniButton>
          <WiniDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <WiniDialogTitle>대화상자 제목</WiniDialogTitle>
            <WiniDialogContent>
              <WiniDialogContentText>
                확인 요청이나 정보를 표시할 때 사용할 수 있는 대화상자입니다.
              </WiniDialogContentText>
            </WiniDialogContent>
            <WiniDialogActions>
              <WiniButton onClick={() => setDialogOpen(false)}>취소</WiniButton>
              <WiniButton onClick={() => setDialogOpen(false)} autoFocus>
                확인
              </WiniButton>
            </WiniDialogActions>
          </WiniDialog>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniSnackbar, WiniButton (스낵바)"
          description="간단한 메시지 표시"
        >
          <WiniButton onClick={() => setSnackbarOpen(true)}>
            스낵바 열기
          </WiniButton>
          <WiniSnackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
            message="메모가 보관되었습니다"
          />
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniList, WiniListSubheader, WiniListItem, WiniListItemIcon, WiniListItemText (목록)"
          description="목록 표시"
        >
          <WiniList>
            <WiniListSubheader>목록 헤더</WiniListSubheader>
            <WiniListItem>
              <WiniListItemIcon>{/* Icon */}</WiniListItemIcon>
              <WiniListItemText primary="항목 1" />
            </WiniListItem>
            <WiniListItem>
              <WiniListItemIcon>{/* Icon */}</WiniListItemIcon>
              <WiniListItemText primary="항목 2" />
            </WiniListItem>
          </WiniList>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniTooltip, WiniButton (툴팁)"
          description="추가 정보 제공"
        >
          <WiniTooltip title="툴팁입니다">
            <WiniButton>마우스를 올려보세요</WiniButton>
          </WiniTooltip>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniFormControl, WiniInputLabel, WiniSelect, WiniMenuItem (셀렉트)"
          description="드롭다운 선택"
        >
          <WiniFormControl fullWidth>
            <WiniInputLabel id="age-label" shrink={Boolean(age)}>
              Age
            </WiniInputLabel>
            <WiniSelect
              labelId="age-label"
              id="age"
              value={age}
              label="Age"
              onChange={(e) => setAge(e.target.value)}
              MenuProps={{ disableScrollLock: true }}
            >
              <WiniMenuItem value={10}>10</WiniMenuItem>
              <WiniMenuItem value={20}>20</WiniMenuItem>
              <WiniMenuItem value={30}>30</WiniMenuItem>
            </WiniSelect>
          </WiniFormControl>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniDateTimePicker, WiniStack, WiniTypography (날짜/시간 선택)"
          description="옵션별 사용 예시"
        >
          <WiniStack spacing={2}>
            <WiniBox>
              <WiniDateTimePicker
                label="기본(날짜만)"
                onChange={(e) =>
                  setDtBasic(e.target.value.format('YYYY-MM-DD'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtBasic || '—'}
              </WiniTypography>
            </WiniBox>
            <WiniBox>
              <WiniDateTimePicker
                label="날짜+시간(시:분)"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="YYYY-MM-DD HH:mm"
                ampm={false}
                onChange={(e) =>
                  setDtHM(e.target.value.format('YYYY-MM-DD HH:mm'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtHM || '—'}
              </WiniTypography>
            </WiniBox>
            <WiniBox>
              <WiniDateTimePicker
                label="초까지(시:분:초)"
                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                format="YYYY-MM-DD HH:mm:ss"
                ampm={false}
                onChange={(e) =>
                  setDtHMS(e.target.value.format('YYYY-MM-DD HH:mm:ss'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtHMS || '—'}
              </WiniTypography>
            </WiniBox>
            <WiniBox>
              <WiniDateTimePicker
                label="12시간 표기(오전/오후)"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="YYYY-MM-DD hh:mm A"
                ampm
                onChange={(e) =>
                  setDtAmpm(e.target.value.format('YYYY-MM-DD hh:mm A'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtAmpm || '—'}
              </WiniTypography>
            </WiniBox>
            <WiniBox>
              <WiniDateTimePicker
                label="필수 입력"
                required
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="YYYY-MM-DD HH:mm"
                onChange={(e) =>
                  setDtRequired(e.target.value.format('YYYY-MM-DD HH:mm'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtRequired || '—'}
              </WiniTypography>
            </WiniBox>
            <WiniBox>
              <WiniDateTimePicker
                label="범위 제한(이번 달)"
                views={['year', 'month', 'day', 'hours', 'minutes']}
                format="YYYY-MM-DD HH:mm"
                ampm={false}
                minDateTime={dayjs().startOf('month')}
                maxDateTime={dayjs().endOf('month')}
                onChange={(e) =>
                  setDtRange(e.target.value.format('YYYY-MM-DD HH:mm'))
                }
              />
              <WiniTypography variant="caption">
                선택값: {dtRange || '—'}
              </WiniTypography>
            </WiniBox>
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniSwitch, WiniFormControlLabel, WiniCollapse, WiniPaper, WiniTypography (스위치/접기)"
          description="콘텐츠 표시/숨기기"
        >
          <WiniFormControlLabel
            control={
              <WiniSwitch
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label="표시"
          />
          <WiniCollapse in={checked}>
            <WiniPaper sx={{ p: 2 }}>
              <WiniTypography>접힌 콘텐츠</WiniTypography>
            </WiniPaper>
          </WiniCollapse>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniToggleButtonGroup, WiniToggleButton (토글 버튼 그룹)"
          description="옵션 그룹"
        >
          <WiniToggleButtonGroup
            value={toggleValue}
            exclusive
            onChange={(e, v) => setToggleValue(v)}
          >
            <WiniToggleButton value="web">웹</WiniToggleButton>
            <WiniToggleButton value="android">안드로이드</WiniToggleButton>
            <WiniToggleButton value="ios">iOS</WiniToggleButton>
          </WiniToggleButtonGroup>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard title="WiniDrawer, WiniToolbar" description="사이드 메뉴">
          <WiniStack spacing={1}>
            <WiniButton
              variant="outlined"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              {drawerOpen ? '메뉴 닫기' : '메뉴 열기'}
            </WiniButton>
            <WiniDrawer
              open={drawerOpen}
              variant="persistent"
              onClose={() => setDrawerOpen(false)}
            >
              <WiniToolbar />
              <WiniTypography sx={{ p: 2 }}>메뉴 내용</WiniTypography>
            </WiniDrawer>
          </WiniStack>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniPagination (페이지네이션)"
          description="페이지네이션"
        >
          <WiniPagination count={10} />
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 6 }}>
        <DemoCard
          title="WiniPopover, WiniButton, WiniTypography (팝오버)"
          description="팝오버"
        >
          <WiniButton
            aria-describedby={'popover-id'}
            variant="contained"
            onClick={(e) => setPopoverAnchor(e.currentTarget)}
          >
            팝오버 열기
          </WiniButton>
          <WiniPopover
            id={'popover-id'}
            open={Boolean(popoverAnchor)}
            anchorEl={popoverAnchor}
            onClose={() => setPopoverAnchor(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <WiniTypography sx={{ p: 2 }}>팝오버 내용입니다</WiniTypography>
          </WiniPopover>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 12 }}>
        <DemoCard
          title="WiniTreeView, WiniTreeCheckItem (트리뷰)"
          description="계층 구조 데이터"
        >
          <WiniTreeView
            winiData={menu}
            height={300}
            width={'100%'}
            disableDrag={false}
            onSelect={selectNode}
            onChange={(newData) => setMenu(newData)}
          >
            {(props) => (
              <WiniTreeCheckItem
                {...props}
                leaf={{ column: 'menuType', value: 'MENU' }}
                field={'chk'}
                toggleCheck={toggleNodeCheck}
              />
            )}
          </WiniTreeView>
        </DemoCard>
      </WiniGridLayout>

      <WiniGridLayout isItem size={{ xs: 12 }}>
        <DemoCard
          title="WiniAgGridReact (데이터 그리드)"
          description="데이터 테이블"
        >
          <div className="ag-theme-alpine" style={{ height: 360 }}>
            <WiniAgGridReact
              columnDefs={[
                { headerName: '회사', field: 'make' },
                { headerName: '모델', field: 'model' },
                { headerName: '연식', field: 'year' },
                { headerName: '차종', field: 'segment' },
                { headerName: '연료', field: 'fuel' },
                { headerName: '색상', field: 'color' },
                { headerName: '주행거리(km)', field: 'mileage' },
                { headerName: '재고', field: 'inStock' },
                { headerName: '가격', field: 'price' },
                { headerName: '할인(%)', field: 'discountPct' },
                { headerName: '최종가격', field: 'priceFinal' },
                { headerName: '평점', field: 'rating' },
                { headerName: '변속기', field: 'transmission' },
                { headerName: '구동방식', field: 'drivetrain' },
              ]}
              rowData={[
                {
                  make: 'Toyota',
                  model: 'Corolla',
                  year: 2022,
                  segment: '세단',
                  fuel: '가솔린',
                  color: '블루',
                  mileage: 15000,
                  inStock: true,
                  price: 22000,
                  discountPct: 5,
                  priceFinal: 20900,
                  rating: 4.2,
                  transmission: 'AT',
                  drivetrain: 'FWD',
                },
                {
                  make: 'Ford',
                  model: 'Mustang',
                  year: 2021,
                  segment: '쿠페',
                  fuel: '가솔린',
                  color: '레드',
                  mileage: 8000,
                  inStock: false,
                  price: 38000,
                  discountPct: 3,
                  priceFinal: 36860,
                  rating: 4.5,
                  transmission: 'MT',
                  drivetrain: 'RWD',
                },
                {
                  make: 'BMW',
                  model: 'X5',
                  year: 2023,
                  segment: 'SUV',
                  fuel: '디젤',
                  color: '블랙',
                  mileage: 12000,
                  inStock: true,
                  price: 61000,
                  discountPct: 7,
                  priceFinal: 56730,
                  rating: 4.6,
                  transmission: 'AT',
                  drivetrain: 'AWD',
                },
                {
                  make: 'Tesla',
                  model: 'Model 3',
                  year: 2024,
                  segment: '세단',
                  fuel: '전기',
                  color: '화이트',
                  mileage: 5000,
                  inStock: true,
                  price: 39990,
                  discountPct: 0,
                  priceFinal: 39990,
                  rating: 4.8,
                  transmission: 'Single Speed',
                  drivetrain: 'RWD',
                },
                {
                  make: 'Hyundai',
                  model: 'Elantra',
                  year: 2022,
                  segment: '세단',
                  fuel: '가솔린',
                  color: '실버',
                  mileage: 20000,
                  inStock: true,
                  price: 21000,
                  discountPct: 10,
                  priceFinal: 18900,
                  rating: 4.0,
                  transmission: 'AT',
                  drivetrain: 'FWD',
                },
                {
                  make: 'Honda',
                  model: 'Accord',
                  year: 2023,
                  segment: '세단',
                  fuel: '하이브리드',
                  color: '그레이',
                  mileage: 10000,
                  inStock: false,
                  price: 30000,
                  discountPct: 6,
                  priceFinal: 28200,
                  rating: 4.3,
                  transmission: 'e-CVT',
                  drivetrain: 'FWD',
                },
              ]}
            />
          </div>
        </DemoCard>
      </WiniGridLayout>
    </WiniGridLayout>
  );
}
