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
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export default function Component02() {
  const [tab, setTab] = useState(1);

  const handlerTab = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Fragment>
      <WiniFormEmpty>
        <WiniTypography>
          컴포넌트 레이아웃 예제 페이지 입니다. 눈으로 확인하기 위해
          border스타일을 넣습니다. 원래는 색이 없습니다.
        </WiniTypography>
        <WiniBox
          sx={{
            border: 1,
            borderStyle: 'solid',
            borderColor: '#333',
            padding: 1,
          }}
        >
          <WiniTypography variant="h6">WiniBox</WiniTypography>
          <WiniBox
            sx={{ border: 1, borderStyle: 'solid', borderColor: '#333' }}
          >
            WiniBox 안 box2
          </WiniBox>

          <WiniBox
            sx={{ border: 1, borderStyle: 'solid', borderColor: '#333' }}
          >
            WiniBox 안 box3
          </WiniBox>
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniTypography variant="h6">WiniStack & WiniPaper </WiniTypography>
        stack속성 ▶ direction={'row'} / alignItems={'center'} / justifyContent=
        {'space-between'}
        <WiniStack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={{
            border: 1,
            borderStyle: 'solid',
            borderColor: '#333',
            padding: 1,
          }}
        >
          <WiniStack
            direction={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: '#333',
              width: 300,
            }}
          >
            <WiniTypography variant="h6">WiniStack </WiniTypography>
            속성 ▶ direction={'column'}
            <WiniPaper sx={{ padding: 1, width: '80%' }}>
              Paper 컨트롤 1
            </WiniPaper>
            <WiniPaper sx={{ padding: 1, width: '80%' }}>
              Paper 컨트롤 2
            </WiniPaper>
          </WiniStack>
          <WiniPaper sx={{ padding: 1, width: 300 }}>Paper 컨트롤 3 </WiniPaper>
          <WiniPaper sx={{ padding: 1, width: 300 }}>Paper 컨트롤 4 </WiniPaper>
        </WiniStack>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniTypography variant="h6" marginBottom={1}>
          WiniGridLayout{' '}
        </WiniTypography>
        Container - gray // 분할 속성 size 속성 안에서 "lg,md,xs"으로
        화면사이즈에따라 바꿀수있음. 화면을 줄여보세요 기본이 12칸입니다
        <WiniGridLayout
          container
          sx={{
            border: 1,
            borderStyle: 'solid',
            borderColor: 'gray',
            background: '#eaeaea',
            padding: 1,
          }}
        >
          <WiniGridLayout
            size={{ lg: 4, md: 4, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              background: '#c8e7f8',
              borderColor: 'blue',
              padding: 1,
            }}
          >
            Grid item 4 blue
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 6, md: 6, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              background: '#c8e7f8',
              borderColor: 'blue',
              padding: 1,
            }}
          >
            Grid item 6 blue
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 2, md: 2, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              background: '#c8e7f8',
              borderColor: 'blue',
              padding: 1,
            }}
          >
            Grid item 2 blue
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
          <WiniGridLayout
            size={{ lg: 1, md: 3, xs: 12 }}
            item
            sx={{
              border: 1,
              borderStyle: 'solid',
              borderColor: 'green',
              background: '#cff5c7',
              padding: 1,
            }}
          >
            Grid item 1 green
          </WiniGridLayout>
        </WiniGridLayout>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniTypography variant="h6">WiniTab </WiniTypography>
        {/* tab의 valu와 tabpanel의 index가 같아야함!!   */}
        <WiniBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <WiniTabs value={tab} onChange={handlerTab}>
            <WiniTab label="tab1" value={1} index={0}></WiniTab>
            <WiniTab label="tab2" value={2} index={1}></WiniTab>
            <WiniTab label="tab3" value={3} index={2}></WiniTab>
          </WiniTabs>
        </WiniBox>
        <WiniTabPanel value={tab} index={1}>
          tabPanel1
        </WiniTabPanel>
        <WiniTabPanel value={tab} index={2}>
          tabPanel2
        </WiniTabPanel>
        <WiniTabPanel value={tab} index={3}>
          tabPanel3
        </WiniTabPanel>
        {/* </WiniTabContext> */}
        <WiniDivider sx={{ marginTop: 1 }} />
        {/* </NormalForm>         */}
      </WiniFormEmpty>
    </Fragment>
  );
}
