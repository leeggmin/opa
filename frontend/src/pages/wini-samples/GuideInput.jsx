import { useState, useEffect } from 'react';
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
  WiniGridItem,
  WiniIcon,
  WiniRadioGroup,
  WiniRadio,
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

export default function Input() {
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
  const [age, setAge] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const [txtDefault, setTxtDefault] = useState('');
  const [txtDefault2, setTxtDefault2] = useState('');
  const [txtDefault3, setTxtDefault3] = useState('');
  const [txtSmall, setTxtSmall] = useState('');
  const [txtMedium, setTxtMedium] = useState('');
  const [txtLarge, setTxtLarge] = useState('');
  const [txtNumber, setTxtNumber] = useState('');

  const [radio, setRadio] = useState('1');
  useEffect(() => {}, [radio]);

  const [radio2, setRadio2] = useState('1');
  useEffect(() => {}, [radio2]);

  return (
    <WiniBox ui="form">

        <WiniBox>
            <WiniTypography variant='h2'>상단 label 구성 배치 예시</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="default"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"default"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="readonly"
                        sx={{}}
                        value="readonly"
                        slotProps={{ 
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                            },
                        }}
                        placeholder={"readonly"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText
                        disabled
                        label="disabled"
                        sx={{}}
                        value="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"disabled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                 <WiniGridItem>
                   <WiniText
                        required
                        label="required"
                        sx={{}}
                        value="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"required"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
                        <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="small"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"small"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="medium"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"medium"}
                        size="medium"
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="standard"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"standard"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        variant='standard'
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="filled"
                        sx={{}}
                        slotProps={{ 
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"filled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        variant='filled'
                    />
                </WiniGridItem>
                 <WiniGridItem></WiniGridItem>
                 <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniNumber
                        label="숫자 입력"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        label="readonly"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                     
                </WiniGridItem>
                
                <WiniGridItem>
                   <WiniNumber
                        disabled
                        label="disabled"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>

                <WiniGridItem>
                   <WiniNumber
                        required
                        label="required"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
              
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        label="숫자 필드"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        readOnly
                        label="readOnly"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        disabled
                        label="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        required
                        label="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        label="small"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="small"
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        readOnly
                        label="medium"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="medium"
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
             <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        // required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="readOnly"
                        type='password'
                        slotProps={{
                             input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        disabled
                        label="disabled"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                
                
            </WiniGridLayout>
        </WiniBox>

        <WiniBox>
            <WiniTypography variant='h2'>좌측 label 구성 배치 예시</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        label="default"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"default"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        label="readonly"
                        sx={{}}
                        value="readonly"
                        slotProps={{ 
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                            },
                        }}
                        placeholder={"readonly"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText
                        ui="row"
                        disabled
                        label="disabled"
                        sx={{}}
                        value="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"disabled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                 <WiniGridItem>
                   <WiniText
                        ui="row"
                        required
                        label="required"
                        sx={{}}
                        value="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"required"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniText ui="row" 
                    label="small"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"small"}
                    size="small"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText ui="row" 
                    label="medium"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"medium"}
                    size="medium"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniText ui="row" 
                    label="standard"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"standard"}
                    size="standard"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText ui="row" 
                    label="filled"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"filled"}
                    size="filled"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        label="숫자 입력"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        label="readonly"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                     
                </WiniGridItem>
                
                <WiniGridItem>
                   <WiniNumber
                        ui="row"
                        disabled
                        label="disabled"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>

                <WiniGridItem>
                   <WiniNumber
                        ui="row"
                        required
                        label="required"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
              
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        ui="row"
                        label="숫자 필드"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        readOnly
                        label="readOnly"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        disabled
                        label="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        required
                        label="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        ui="row"
                        label="small"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="small"
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="row"
                        readOnly
                        label="medium"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="medium"
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        // required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        label="readOnly"
                        type='password'
                        slotProps={{
                             input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        disabled
                        label="disabled"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="row"
                        required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                
                
            </WiniGridLayout>

        </WiniBox>

        <WiniBox>
            <WiniTypography variant='h2'>내부 label 구성 배치 예시</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="default"
                        sx={{}}
                        slotProps={{
                        }}
                        placeholder={"default"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="readonly"
                        sx={{}}
                        value="readonly"
                        slotProps={{ 
                            input: {
                                readOnly: true,
                            },
                        }}
                        placeholder={"readonly"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText
                        disabled
                        label="disabled"
                        sx={{}}
                        value="disabled"
                        slotProps={{
                        }}
                        placeholder={"disabled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                 <WiniGridItem>
                   <WiniText
                        required
                        label="required"
                        sx={{}}
                        value="required"
                        slotProps={{
                            
                        }}
                        placeholder={"required"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="small"
                        slotProps={{
                            
                        }}
                        placeholder={"small"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="medium"
                        sx={{}}
                        slotProps={{
                            
                        }}
                        placeholder={"medium"}
                        size="medium"
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        label="standard"
                        sx={{}}
                        slotProps={{
                            
                        }}
                        placeholder={"standard"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        variant='standard'
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="filled"
                        sx={{}}
                        slotProps={{ 
                            
                        }}
                        placeholder={"filled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        variant='filled'
                    />
                </WiniGridItem>
                 <WiniGridItem></WiniGridItem>
                 <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniNumber
                        label="숫자 입력"
                        sx={{}}
                        slotProps={{
                            
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        label="readonly"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            input:{
                                readOnly: true
                            },
                            
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                     
                </WiniGridItem>
                
                <WiniGridItem>
                   <WiniNumber
                        disabled
                        label="disabled"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>

                <WiniGridItem>
                   <WiniNumber
                        required
                        label="required"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
              
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        label="숫자 필드"
                        slotProps={{
                            
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        readOnly
                        label="readOnly"
                        slotProps={{
                            
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        disabled
                        label="disabled"
                        slotProps={{
                            
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        required
                        label="required"
                        slotProps={{
                            
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        label="small"
                        slotProps={{
                            
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="small"
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        readOnly
                        label="medium"
                        slotProps={{
                            
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="medium"
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
             <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        // required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        label="readOnly"
                        type='password'
                        slotProps={{
                             input:{
                                readOnly: true
                            },
                            
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        disabled
                        label="disabled"
                        type='password'
                        slotProps={{
                            
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                
                
            </WiniGridLayout>
        </WiniBox>

        <WiniBox>
            <WiniTypography variant='h2'>상단(2) label 구성 배치 예시</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        label="default"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"default"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        label="readonly"
                        sx={{}}
                        value="readonly"
                        slotProps={{ 
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                            },
                        }}
                        placeholder={"readonly"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText
                        ui="column"
                        disabled
                        label="disabled"
                        sx={{}}
                        value="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"disabled"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                 <WiniGridItem>
                   <WiniText
                        ui="column"
                        required
                        label="required"
                        sx={{}}
                        value="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"required"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniText ui="column" 
                    label="small"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"small"}
                    size="small"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText ui="column" 
                    label="medium"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"medium"}
                    size="medium"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniText ui="column" 
                    label="standard"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"standard"}
                    size="standard"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                <WiniGridItem>
                   <WiniText ui="column" 
                    label="filled"
                    sx={{}}
                    // id = ''
                    //name = {}
                    placeholder={"filled"}
                    size="filled"
                    className=''
                    labelClassName=''
                    inputClassName=''
                />
                </WiniGridItem>
                
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        label="숫자 입력"
                        sx={{}}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        label="readonly"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                     
                </WiniGridItem>
                
                <WiniGridItem>
                   <WiniNumber
                        ui="column"
                        disabled
                        label="disabled"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>

                <WiniGridItem>
                   <WiniNumber
                        ui="column"
                        required
                        label="required"
                        sx={{}}
                        value={'1'}
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
              
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        ui="column"
                        label="숫자 필드"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        readOnly
                        label="readOnly"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        disabled
                        label="disabled"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        value={'1'}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        required
                        label="required"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                   <WiniNumber
                        ui="column"
                        label="small"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="small"
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniNumber
                        ui="column"
                        readOnly
                        label="medium"
                        slotProps={{
                            inputLabel:{shrink: true},
                            input: {
                                readOnly: true,
                                endAdornment: <WiniInputAdornment position="end">kg</WiniInputAdornment>
                            }
                        }}
                        placeholder={"숫자만 입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                        size="medium"
                    />
                </WiniGridItem>
                <WiniGridItem></WiniGridItem>
                <WiniGridItem></WiniGridItem>
                
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={2}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        // required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        label="readOnly"
                        type='password'
                        slotProps={{
                             input:{
                                readOnly: true
                            },
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        disabled
                        label="disabled"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        value={'test'}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                <WiniGridItem>
                    <WiniText
                        ui="column"
                        required
                        label="패스워드"
                        type='password'
                        slotProps={{
                            inputLabel:{shrink: true},
                        }}
                        placeholder={"패스워드입력"}
                        className=''
                        labelClassName=''
                        inputClassName=''
                    />
                </WiniGridItem>
                
                 
            </WiniGridLayout>
        </WiniBox>

        <WiniBox>
            <WiniTypography variant='h2'>radio 형태</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>
                    <WiniRadioGroup value = {radio} onChange={(e)=>setRadio(e.target.value)}  row>
						<WiniRadio value="1" label="default"/>
						<WiniRadio value="2" label="readOnly" readOnly checked />		
						<WiniRadio value="3" label="disabled" disabled checked/>
						<WiniRadio value="3" label="required" required checked/>
					</WiniRadioGroup>		
                </WiniGridItem>
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                 <WiniGridItem>
                    <WiniRadioGroup value = {radio2} onChange={(e)=>setRadio2(e.target.value)}  row>
						<WiniRadio value="2" label="large" size="large" />
						<WiniRadio 
                            value="1" 
                            label="custom" 
                            className=''
                            radioClassName="text-red-500 border-red-500"
                            labelClassName="text-red-300"
                        />
					</WiniRadioGroup>		
                </WiniGridItem>
            </WiniGridLayout>
        </WiniBox>

        <WiniBox>
            <WiniTypography variant='h2'>checkbox 형태</WiniTypography>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniGridItem>

                    <WiniBox ui="checkbox">
                        <WiniCheckbox 
                            label="default" 
                        />
                        <WiniCheckbox 
                            readOnly
                            label="readOnly" 
                            checked
                        />
                        <WiniCheckbox 
                            disabled
                            label="disabled" 
                            checked
                        />
                        <WiniCheckbox 
                            required
                            label="required" 
                            checked
                        />
                    </WiniBox>
                    
                </WiniGridItem>
                 
               
            </WiniGridLayout>
            <WiniGridLayout
                container
                columnSpacing={1}
                rowSpacing={3}
            >
                <WiniBox ui="checkbox">
                    <WiniCheckbox 
						label="large"
                        size="large" 
					/>
                    <WiniCheckbox 
                        label="custom" 
                        className=''
                        labelClassName='text-red-300'
                        checkClassName="text-red-500 bg-red-200 border-red-500"
                        defaultChecked
					/>
                     <WiniCheckbox 
                        readOnly
                        label="custom" 
                        className=''
                        labelClassName='text-red-300'
                        checkClassName=""
                        checked
					/>
                    <WiniCheckbox
                        iconName="fav"          
                        checkedIconName="fav2" 
                        label="fav"
                        ui="yellow"
                    />
                </WiniBox>
            </WiniGridLayout>
        </WiniBox>
            
        </WiniBox>
    );
}
