import { useState, useRef, useEffect } from 'react';

import { WiniBox, WiniButton, WiniText, WiniMenuItem, WiniSelect, WiniNumber, WiniGridLayout, WiniDivider, WiniAgGridReact, WiniDateTimePicker, WiniTypography, WiniStack } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import { Box } from '@mui/material';
import { winiMsg } from '@/shared/model';
import { winiHelp } from '@/shared/model';
import { UserHelp, CustomerHelp, DepartmentHelp } from '@/features/help/panels';
import { SearchIcon } from '@/shared/lib';
import { winiDate } from '@/shared/lib';

let initialState = {
  test1: '가',
  test2: '나',
  test3: '다다',
  test4: '4',
  test5: '5',
  test6: 'TEST',
  num: 12364345234,
};
for (let i = 0; i < 50; i++) {
  initialState[`testx${i}`] = i;
}

export default function TableTest() {
  const service = 'system';
  const [tbitem, setTbItem] = useState(initialState);
  const [help, setHelp] = useState('');
  const [getDate, setGetData] = useState('');
  const [msgAnswer, setMsgAnswer] = useState('');
  const [user, setUser] = useState({ id: '', name: '' });
  const formRef = useRef();
  const formRef1 = useRef();
  const formRef2 = useRef();
  const dateref = useRef();

  const onTextFieldChange = (e) => {
    setTbItem((tbitem) => {
      return {
        ...tbitem,
        [e.target.name]: e.target.value,
      };
    });
  };
  const fn_clear = () => {
    window.dateref = dateref.current;

    let a = winiCom.reset(formRef1.current);

    fn_get();
  };
  const fn_get = async () => {
    let get = winiCom.get(formRef1.current);
    setGetData(get);
  };
  const fn_initData = () => {
    setTbItem(initialState);
    fn_get();
  };
  const fn_showalert = async () => {
    let b = await winiMsg.showAlert('vldkskkskdkf ');
    setMsgAnswer(b);
  };
  const fn_showconfirm = async () => {
    let b = await winiMsg.showConfirm(
      'confirm 창\n <br/>tag는 먹히지않습니다요',
    );
    setMsgAnswer(b);
  };
  const fn_showtoast = async () => {
    winiMsg.showSnackbar('이것은 toast 입니다1');
  };
  const fn_help = async (e) => {
    let b = await winiHelp.show(
      { title: '거래처', el: <CustomerHelp /> },
      service,
      {
        a: 'ddd',
        keyword: 'a',
      },
    );
    setHelp(b);
  };
  const fn_helpdept = async () => {
    let b = await winiHelp.show(
      { title: '부서', el: <DepartmentHelp /> },
      service 
    );
    setHelp(b);
  };

  const fn_vaildCheck = async () => {
    await winiCom.isValidCheck(formRef1.current);
  };
  const openUserHelpHandler = async () => {
    let data = await winiHelp.show(
      { title: '사용자', el: <UserHelp /> },
      service,
      { keyword: '홍' },
    );
    setUser((prev) => {
      return {
        ...prev,
        id: data.id,
        name: data.fullName,
      };
    });
  };
  useEffect(() => {}, []);
  useEffect(() => {
  }, [tbitem.test4]);
  const [rowdata, setRowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ]);

  return (
    <WiniBox 
    >
      <WiniBox type="searchBar">
        <WiniText disabled />
        <WiniNumber disabled />
        <WiniDateTimePicker disabled />
        <WiniSelect disabled />
      </WiniBox>
      <WiniButton sx={{ mb: 1, mr: 1, border: 1 }} onClick={fn_clear}>
        reset (box값 reset-value로 세팅)
      </WiniButton>

      <WiniButton sx={{ mb: 1, mr: 1, border: 1 }} onClick={fn_get}>
        get(box값 한번에가져오기)
      </WiniButton>

      <WiniButton sx={{ mb: 1, mr: 1, border: 1 }} onClick={fn_initData}>
        맨처음값 재설정
      </WiniButton>

      <WiniButton sx={{ mb: 1, mr: 1, border: 1 }} onClick={fn_vaildCheck}>
        필수값 체크
      </WiniButton>
      <div className="tbitem" component="div" ref={formRef2}>
        <WiniBox ref={formRef1}>
          <WiniText
            label="test1"
            name="test1"
            value={tbitem.test1}
            onChange={onTextFieldChange}
            data-reset-value="AAA"
          />
          <WiniText
            label="test2"
            name="test2"
            value={tbitem.test2}
            onChange={onTextFieldChange}
            required
            minLength={3}
            regex="vvvv"
          />
          <WiniText
            label="test3"
            name="test3"
            value={tbitem.test3}
            onChange={onTextFieldChange}
          />
          <WiniText
            label="test4"
            value={tbitem.test4}
            onChange={onTextFieldChange}
            required
            data-reset-value="test4는 name없어"
          />
          <WiniText
            label="test5"
            name="test5"
            value={tbitem.test5}
            onChange={onTextFieldChange}
          />
          <WiniSelect
            label="test6"
            name="test6"
            value={tbitem.test6}
            onChange={onTextFieldChange}
            data-reset-value="1"
          >
            <WiniMenuItem aria-label="All" value="">
              {'All'}
            </WiniMenuItem>
            <WiniMenuItem aria-label="TEST" value="TEST">
              {'TEST'}
            </WiniMenuItem>
            <WiniMenuItem aria-label="1" value="1">
              {'1'}
            </WiniMenuItem>
            <WiniMenuItem aria-label="2" value="2">
              {'2'}
            </WiniMenuItem>
            <WiniMenuItem aria-label="RESET" value="RESET">
              {'RESET'}
            </WiniMenuItem>
          </WiniSelect>
          <WiniNumber
            label="num"
            name="num"
            required
            value={tbitem.num}
            onChange={onTextFieldChange}
            thousandSeparator
            data-reset-value={0}
          />
          <WiniDateTimePicker
            ref={dateref}
            label="date"
            name="date"
            value={tbitem.date}
            onChange={onTextFieldChange}
            data-reset-value={winiDate.now()}
          />
        </WiniBox>
        <WiniText
          multiline
          sx={{ width: 500, mt: 1 }}
          rows={4}
          label="getDate"
          value={getDate ? JSON.stringify(getDate) : ''}
        />
        <WiniBox sx={{ p: 1, height: 400 }}>
          <WiniAgGridReact
            rowData={rowdata}
            columnDefs={[
              { field: 'make', flex: 2 },
              { field: 'model', flex: 1 },
              { field: 'price', flex: 1 },
              { field: 'electric', flex: 1 },
            ]}
          />
        </WiniBox>
        <WiniDivider style={{ margin: '10px 0px' }} />
        <WiniBox sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <WiniButton variant="contained" onClick={fn_showalert}>
            show alert{' '}
          </WiniButton>
          <WiniButton variant="contained" onClick={fn_showconfirm}>
            show confirm{' '}
          </WiniButton>
          <WiniButton variant="contained" onClick={fn_showtoast}>
            show toast{' '}
          </WiniButton>
          <WiniTypography>{msgAnswer}</WiniTypography>
        </WiniBox>
        <WiniDivider style={{ margin: '10px 0px' }} />
        <WiniBox sx={{ mb: 1 }}>
          <WiniText
            label="담당자(PM)"
            sx={{ width: 250, mt: 1 }}
            name={'name'}
            value={user.name}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            disabled
          />
          <WiniButton
            variant="contained"
            sx={{ width: 30, height: 32, m: 1, mb: 0, mr: 0 }}
            onClick={openUserHelpHandler}
          >
            <SearchIcon />
          </WiniButton>
        </WiniBox>
        <WiniButton variant="contained" onClick={fn_help} sx={{ mr: 1, mb: 1 }}>
          Grid형 help Button
        </WiniButton>
        <WiniButton
          variant="contained"
          onClick={fn_helpdept}
          sx={{ mr: 1, mb: 1 }}
        >
          Tree형 help Button
        </WiniButton>

        <WiniBox>
          <WiniText
            multiline
            sx={{ width: 500 }}
            rows={4}
            label="helpdata"
            value={help ? JSON.stringify(help) : ''}
          />
        </WiniBox>
      </div>
    </WiniBox>
  );
}
