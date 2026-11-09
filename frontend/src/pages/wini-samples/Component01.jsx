import { useState, useEffect, Fragment } from 'react';
import {
  WiniBox,
  WiniBreadcrumbs,
  WiniCard,
  WiniDivider,
  WiniSnackbar,
  WiniTypography,
  WiniInputAdornment,
  WiniFormControl,
  WiniInputLabel,
  WiniSelect,
  WiniMenuItem,
  WiniCheckbox,
  WiniListItemText,
  WiniListSubheader,
  WiniOutlinedInput,
  WiniButton,
  WiniIconButton,
  WiniLocalizationProvider,
  WiniDateTimePicker,
  WiniFormControlLabel,
  WiniSwitch,
  WiniStack,
  WiniNumber,
  WiniChip,
  WiniText,
  WiniHashTagInput,
  WiniRadioGroup,
  WiniRadio,
} from '@/shared/ui/wini';

import { AddIcon, NavigateNextIcon } from '@/shared/lib';
import { DeleteIcon } from '@/shared/lib';
import { BookmarkBorderIcon, BookmarkIcon } from '@/shared/lib';
import { Link } from '@mui/material';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
// import winiDate from '@/Library/winiDate'

import { TextField, Chip, Box } from '@mui/material';
import { winiDate } from '@/shared/lib';

export default function Component01() {
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [chkCombo, setChkcombo] = useState([]);
  // const [date,setDate] = useState(winiDate('2023-11-12'));
  // const [date2,setDate2] = useState(winiDate.now());
  // const [date3,setDate3] = useState(winiDate('2024-12-26 13:45:14'));//YYYY-MM-DD HH:m:ss
  // const [time, setTime] = useState(winiDate.now());
  const [date, setDate] = useState(winiDate('2023-11-12'));
  const [date2, setDate2] = useState(winiDate.now());
  const [date3, setDate3] = useState(winiDate('2024-12-26 13:45:14')); //YYYY-MM-DD HH:m:ss
  const [time, setTime] = useState(winiDate.now());
  const [check, setCheck] = useState(true);
  const [locale, setLocale] = useState('en-kr');
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const onSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setsnackbarOpen(true);
  };
  const onSnackbarClose = () => setsnackbarOpen(false);

  const handleDeleteChips = (chipToDelete) => () => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };
  const renderChips = (chip, idx) => {
    return (
      <WiniChip
        key={chip.toString() + '_' + idx.toString()}
        label={chip}
        onDelete={handleDeleteChips(chip)}
        size="small"
        sx={{ mr: 0.5 }}
      />
    );
  };
  //체크콤보 체인지이벤트
  // const handleChange = (event) => {
  //   const {
  //     target: { value }
  //   } = event;
  //   setChkcombo(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  const [txt, setTxt] = useState('');
  const [radio, setRadio] = useState('1');
  return (
    <Fragment>
      <WiniSnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={onSnackbarClose}
        message={snackbarMessage}
      />
      {/* <NormalForm title={"컨트롤예제1"} path={['컴포넌트','컨트롤예제1']}> */}
      <WiniFormEmpty>
        <WiniTypography>
          Meterial UI 사용법. 컴포넌트 예제 페이지 입니다. 이벤트가 없어서 값이
          변경되지 않을 수 있습니다.{' '}
        </WiniTypography>
        <WiniBox sx={{ padding: 1, mt: 1 }}>
          <WiniTypography variant="h6">TextBox</WiniTypography>
          <WiniText
            required //필수일때사용
            label="텍스트박스"
            sx={{}} //스타일
            value={txt}
            slotProps={{
              inputLabel: { shrink: true, sx: { color: 'purple' } },
              // input:{sx:{backgroundColor:'red'}}
            }}
            //name = {}
            onChange={(e) => setTxt(e.target.value)}
            placeholder={'모든문자입력'}
          />
          <WiniText
            label="text field"
            sx={{}} //스타일
            value={txt}
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: {
                  color: 'purple',
                },
              },
              // input:{sx:{backgroundColor:'red'}}
            }}
            //name = {}
            onChange={(e) => setTxt(e.target.value)}
            placeholder={'모든문자입력'}
            InputLabelProps={{ shrink: true }}
          />
          <WiniNumber
            required
            label="숫자 필드"
            placeholder={'숫자만 입력'}
            thousandSeparator
          />
          <WiniNumber
            label="숫자 필드"
            slotProps={{
              input: {
                endAdornment: (
                  <WiniInputAdornment position="end">kg</WiniInputAdornment>
                ),
              },
            }}
            placeholder={'숫자만 입력'}
          />
          <WiniText
            // required
            label="패스워드"
            type="password"
            placeholder={'패스워드입력'}
          />
          <WiniText
            required
            label="textarea"
            sx={{ height: 80 }} //스타일
            multiline
            //rows={2}
            placeholder={'모든문자입력'}
          />
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">
            Select(ComboBox, Dropdown, list)
          </WiniTypography>

          {/* <WiniFormControl sx={{ width: 200, margin: 1 }}>
						<WiniInputLabel id="simple-label" >Item선택</WiniInputLabel> */}
          <div className="wrap-input">
            <WiniSelect
              label="Item선택"
              //name='state'
              //value={chkCombo.state}
              // sx={{width:500}}
              inputProps={{ shrink: true }}
              labelProps={{
                //라벨에 적용하는 속성!
                sx: { color: 'blue' },
              }}
              defaultValue={'0'}
              //onChange={}
            >
              <WiniMenuItem value={'0'}>{'Item1'}</WiniMenuItem>
              <WiniMenuItem value={'1'}>{'Item2'}</WiniMenuItem>
              <WiniMenuItem value={'2'}>{'Item3'}</WiniMenuItem>
            </WiniSelect>
            <WiniSelect
              label="Item선택"
              //name='state'
              //value={chkCombo.state}
              // sx={{width:500}}
              inputProps={{ shrink: true }}
              labelProps={{
                //라벨에 적용하는 속성!
                sx: { color: 'blue' },
              }}
              defaultValue={'0'}
              //onChange={}
            >
              <WiniMenuItem value={'0'}>{'Item1'}</WiniMenuItem>
              <WiniMenuItem value={'1'}>{'Item2'}</WiniMenuItem>
              <WiniMenuItem value={'2'}>{'Item3'}</WiniMenuItem>
            </WiniSelect>
          </div>
          {/* </WiniFormControl> */}

          {/* <WiniFormControl sx={{ width: 200, margin: 1 }}>
						<WiniInputLabel id="simple-label" >Item선택</WiniInputLabel> */}
          <div className="wrap-input">
            <WiniSelect
              required
              label="Item선택"
              //name='state'
              //value={chkCombo.state}
              // sx={{ width: 300 }}
              inputProps={{ shrink: true /* ,sx:{background:'green'}*/ }}
              defaultValue={'0'}
              //onChange={}
            >
              <WiniListSubheader>Category 1</WiniListSubheader>
              <WiniMenuItem value={'0'}>{'Item1'}</WiniMenuItem>
              <WiniMenuItem value={'1'}>{'Item2'}</WiniMenuItem>
              <WiniMenuItem value={'2'}>{'Item3'}</WiniMenuItem>
              <WiniListSubheader>Category 2</WiniListSubheader>
              <WiniMenuItem value={'3'}>{'Item1'}</WiniMenuItem>
              <WiniMenuItem value={'4'}>{'Item2'}</WiniMenuItem>
              <WiniMenuItem value={'5'}>{'Item3'}</WiniMenuItem>
            </WiniSelect>
          </div>
          {/* </WiniFormControl> */}
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">Button</WiniTypography>
          <WiniButton sx={{ margin: 1 }}>버튼</WiniButton>
          <WiniButton sx={{ margin: 1 }} variant={'outlined'}>
            버튼
          </WiniButton>
          <WiniButton sx={{ margin: 1 }} variant={'contained'}>
            버튼
          </WiniButton>
          <WiniButton sx={{ margin: 1 }} variant={'outlined'} size="small">
            small 버튼
          </WiniButton>
          <WiniButton sx={{ margin: 1 }} variant={'outlined'} size="medium">
            medium 버튼
          </WiniButton>
          <WiniButton sx={{ margin: 1 }} variant={'outlined'} size="large">
            large 버튼
          </WiniButton>
          <WiniButton sx={{ margin: 1, height: 60 }} variant={'outlined'}>
            높이60 버튼
          </WiniButton>
          <WiniButton
            sx={{ margin: 1 }}
            variant="contained"
            color="error"
            onClick={() => {
              onSnackbarOpen('snackbar Test');
            }}
          >
            error snackbar
          </WiniButton>
          <WiniButton
            sx={{ margin: 1 }}
            variant="outlined"
            startIcon={<DeleteIcon />}
          >
            Delete
          </WiniButton>
          <WiniIconButton sx={{ margin: 1, background: 'orange' }}>
            <DeleteIcon sx={{ color: 'white' }} />
          </WiniIconButton>
          ◀아이콘버튼
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">Datepicker</WiniTypography>
          {/* <WiniTypography>포멧을 해주지않으면 포멧이 미국식으로 들어감 포멧 : YYYY-MM-DD HH:m:ss a </WiniTypography> */}
          <WiniDateTimePicker
            sx={{ margin: 1 }}
            format="YYYY-MM"
            // views={[ 'year','month']}
            views={['day', 'hours', 'minutes', 'month', 'year']}
            label="날짜시간"
            // name ={"fromdt"}
            value={date3}
            onChange={(value) => {
              setDate3(value);
            }}
            // slotProps={{
            // 	textField: {
            // 		InputLabelProps: { style: { color: '#00f' } }
            // 	}
            // }}
          />
          <WiniDateTimePicker
            required
            sx={{ margin: 1 }}
            label="날짜시간"
            // name ={"fromdt"}
            slotProps={
              {
                // textField: {
                // 	InputLabelProps: {
                // 		sx: { color: 'red' }, // 라벨 색상 변경
                // 	},
                // },
              }
            }
            value={date2}
            onChange={(value) => {
              setDate2(value);
            }}
          />
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">Typography</WiniTypography>
          <WiniStack
            direction={'row'}
            sx={{ padding: 1 }}
            alignItems={'flex-end'}
          >
            <WiniTypography variant="h6">h6</WiniTypography>
            <WiniTypography variant="h5" sx={{ marginLeft: 1 }}>
              h5
            </WiniTypography>
            <WiniTypography variant="h4" sx={{ marginLeft: 1 }}>
              h4
            </WiniTypography>
            <WiniTypography variant="h3" sx={{ marginLeft: 1 }}>
              h3
            </WiniTypography>
            <WiniTypography variant="h2" sx={{ marginLeft: 1 }}>
              h2
            </WiniTypography>
            <WiniTypography variant="h1" sx={{ marginLeft: 1 }}>
              h1
            </WiniTypography>
            <WiniTypography fontWeight={'bold'} sx={{ marginLeft: 1 }}>
              {' '}
              fontWeight"bold"{' '}
            </WiniTypography>
            <WiniTypography
              sx={{ backgroundColor: 'yellow', fontSize: 22, marginLeft: 1 }}
            >
              {' '}
              backColor"yellow" fontsize"22"{' '}
            </WiniTypography>
          </WiniStack>
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">Checkbox & Switch</WiniTypography>
          Checkbox ▷{/* <WiniFormControlLabel control={}  /> */}
          <WiniCheckbox
            defaultChecked
            label="체크박스"
            labelProps={{
              sx: { color: 'red', fontSize: '4.8rem' },
              labelPlacement: 'bottom',
            }} // 라벨에 값줄때사용!
          />
          <WiniCheckbox disabled label="Disabled 체크" />
          <WiniCheckbox //defaultChecked
            color="success"
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
            checked={check}
            onChange={(value) => {
              setCheck(value.target.checked);
            }}
            label="아이콘 체크"
          />
          | Switch ▷{/* <WiniFormControlLabel control={} label="스위치" /> */}
          <WiniSwitch defaultChecked label="스위치" />
          {/* <WiniFormControlLabel control={<}  /> */}
          <WiniSwitch defaultChecked disabled label="스위치 disabled" />
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1, mt: 1 }}>
          <WiniTypography variant="h6">Radio</WiniTypography>
          <WiniRadioGroup
            value={radio}
            onChange={(e) => setRadio(e.target.value)}
            row
          >
            <WiniRadio
              value="1"
              label="Option 1"
              labelProps={{ sx: { color: 'red' } }}
            />
            <WiniRadio value="2" label="Option 2" />
            <WiniRadio value="3" label="Option 3" />
          </WiniRadioGroup>
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox>
          <WiniTypography variant="h6">Hash Tag 예제</WiniTypography>
          <WiniHashTagInput
            onChange={(e) => setChips([...chips, e])}
            chips={chips}
          />
          {/* <WiniBox sx={{ minHeight: 25 }}>
						{chips.map((item, idx) => renderChips(item, idx))}
					</WiniBox>
					<WiniText
						value={inputValue}
						fullWidth
						sx={{ mt: 1 }}
						placeholder='#입력후 Enter '
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.keyCode == 13) {
								setChips([...chips, '#' + inputValue.trim()])
								setInputValue('')
							}
						}}
					/> */}
        </WiniBox>
        <WiniDivider sx={{ marginTop: 1 }} />
        <WiniBox sx={{ padding: 1 }}>
          <WiniTypography variant="h6">Meterial icon</WiniTypography>
          <Link
            target="_blank"
            href="https://mui.com/material-ui/material-icons/"
          >
            {' '}
            클릭!{' '}
          </Link>{' '}
          ◀ 이곳에서 아이콘을 찾아 import 할수 있음.
        </WiniBox>
      </WiniFormEmpty>
      {/* </NormalForm> */}
    </Fragment>
  );
}
