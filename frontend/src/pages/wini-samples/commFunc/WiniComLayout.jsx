import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniGridItem,
  WiniText,
  WiniTypography,
  WiniSelect,
  WiniMenuItem,
  WiniNumber,
  WiniDateTimePicker,
  WiniListItem,
  WiniIcon,
  WiniCollapse,
  WiniList,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { winiCom, winiDate } from '@/shared/lib';


let initialState = {
  test1: '텍스트1의 값',
  test2: '텍스트2의 값',
  test3: '텍스트3의 값',
  test4: '텍스트4의 값  ',
  test5: '텍스트5의 값',
  test6: 's1',
  num: 12324567890,
};
// for (let i = 0; i < 50; i++) {
//   initialState[`testx${i}`] = i;
// }
const sampleCode = `
//선언
const formRef = useRef(null);
const [tbitem, setTbItem] = useState({
  test1: '텍스트1의 값',
  test2: '텍스트2의 값',
  test3: '텍스트3의 값',
  test4: '텍스트4의 값  ',
  test5: '텍스트5의 값',
  test6: 's1',
  num: 12324567890,
});
//함수영역
const onTextFieldChange = (e) => {
    setTbItem((tbitem) => {
      return {
        ...tbitem,
        [e.target.name]: e.target.value,
      };
    });
  };

//리턴영역
return(
  <WiniBox ref={formRef} ui="form" >
    <WiniGridLayout container columnSpacing={2} rowSpacing={1}>
      <WiniGridItem>
        <WiniText
          ui="column"
          label="텍스트[name = test1] [data-reset-value='테스트1의 초기값']"
          name="test1"
          value={tbitem.test1}
          onChange={onTextFieldChange}
          data-reset-value="테스트1의 초기값"
          className="m-1"
        />
        <WiniText
          ui="column"
          label="텍스트[name = test2]"
          name="test2"
          value={tbitem.test2}
          onChange={onTextFieldChange}
          required
          minLength={3}
          className="m-1"
        />
        <WiniText
          ui="column"
          label="텍스트[name = test3]"
          name="test3"
          value={tbitem.test3}
          onChange={onTextFieldChange}
          className="m-1"
        />
        <WiniText
          ui="column"
          label="텍스트[name = 없음] [data-reset-value='test4는 name없습니다.']"
          value={tbitem.test4}
          onChange={onTextFieldChange}
          required
          data-reset-value="test4는 name없습니다"
          className="m-1"
        />
      </WiniGridItem>
      <WiniGridItem>
        <WiniText
          ui="column"
          label="텍스트[name = test5]"
          name="test5"
          value={tbitem.test5}
          onChange={onTextFieldChange}
          className="m-1"
        />
        <WiniSelect
          ui="column"
          label="셀렉트[name = test6] [data-reset-value='s4']"
          name="test6"
          value={tbitem.test6}
          onChange={onTextFieldChange}
          data-reset-value="s4"
          className="m-1"
        >
          <WiniMenuItem value="s1">{'셀렉트1번 값'}</WiniMenuItem>
          <WiniMenuItem value="s2">{'셀렉트2번 값'}</WiniMenuItem>
          <WiniMenuItem value="s3">{'셀렉트3번 값'}</WiniMenuItem>
          <WiniMenuItem value="s4">{'셀렉트4번 값'}</WiniMenuItem>
          <WiniMenuItem value="s5">{'셀렉트5번 값'}</WiniMenuItem>
        </WiniSelect>

        <WiniNumber
          ui="column"
          label="넘버박스[name = num] [data-reset-value={0}]"
          name="num"
          required
          value={tbitem.num}
          onChange={onTextFieldChange}
          thousandSeparator
          data-reset-value={0}
          className="m-1"
        />
        <WiniDateTimePicker
          ui="column"
          label="데이터타임피커[name = date] [data-reset-value={winiDate.now()}]"
          name="date"
          value={tbitem.date}
          onChange={onTextFieldChange}
          data-reset-value={winiDate.now()}
          className="m-1"
        />
      </WiniGridItem>
    </WiniGridLayout>
  </WiniBox>
)
        `;
export default function samples_winiCom_layout() {
  const formRef = useRef(null);
  const [tbitem, setTbItem] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [getDate, setGetData] = useState('');
  const [copyState, setCopyState] = useState();

  const timersRef = useRef({});
  const onTextFieldChange = (e) => {
    setTbItem((tbitem) => {
      return {
        ...tbitem,
        [e.target.name]: e.target.value,
      };
    });
  };
  const fn_clear = () => {
    winiCom.reset(formRef.current);
  };
  const fn_get = async () => {
    let get = winiCom.get(formRef.current);
    setGetData(get);
  };
  const fn_vaildCheck = async () => {
    fn_clear()
      await winiCom.isValidCheck(formRef.current);
  };

  const WINI_COM_LAYOUT_GUIDES = [
    {
      key: 'get',
      name: '데이터 가져오기',
      description: `레이아웃의 ref에 get 함수를 사용하여 데이터를 읽을 수 있습니다. 가져온 함수는 Object 형식이며 state에 적용할 수 있습니다. `,
      fn: fn_get,
      return: () => {
        return (<WiniText ui="row" label="getDate(JSON)"
          value={getDate ? JSON.stringify(getDate) : ''}
        />
        )
      },
      code: `import { winiCom } from '@/shared/lib';
  
const get = winiCom.get(formRef.current);`
      ,
    }, {
      key: 'clear',
      name: '초기화하기',
      description: `해당 레이아웃에 있는 모든 컴포넌트를 초기화합니다.
      이때 'data-reset-value' 속성이 있는경우 해당 값으로 초기화합니다.`,
      fn: fn_clear,
      code: `import { winiCom } from '@/shared/lib';
  
winiCom.reset(formRef.current);`,
    }, {
      key: 'isValidCheck',
      name: '유효성 체크',
      description: `해당 레이아웃에 있는 컴포넌트를 유효성 체크합니다.
      이때 required 속성이 있는경우 해당 값으로 유효성 체크합니다.
      빈값이 있는 경우 경고 메세지박스를 자동으로 띄웁니다.`,
      fn: fn_vaildCheck,
      code: `import { winiCom } from '@/shared/lib';
  
const chk = winiCom.isValidCheck(formRef.current);
console.log(chk); // true or false
`,
    }
  ];


  useEffect(() => {
    setCopyState(Object.fromEntries(WINI_COM_LAYOUT_GUIDES.map((item) => [item.key, 'copy'])));
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = async (key, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      if (timersRef.current[key]) {
        clearTimeout(timersRef.current[key]);
      }

      timersRef.current[key] = setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };
  const handleDepthToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderUiPreview = () => {
    return (
      <>
        <WiniBox ref={formRef} ui="form" >
          <WiniGridLayout container columnSpacing={2} rowSpacing={1}>
            <WiniGridItem>
              <WiniText
                ui="column"
                label="텍스트[name = test1] [data-reset-value='테스트1의 초기값']"
                name="test1"
                value={tbitem.test1}
                onChange={onTextFieldChange}
                data-reset-value="테스트1의 초기값"
                className="m-1"
              />
              <WiniText
                ui="column"
                label="텍스트[name = test2]"
                name="test2"
                value={tbitem.test2}
                onChange={onTextFieldChange}
                required
                minLength={3}
                className="m-1"
              />
              <WiniText
                ui="column"
                label="텍스트[name = test3]"
                name="test3"
                value={tbitem.test3}
                onChange={onTextFieldChange}
                className="m-1"
              />
              <WiniText
                ui="column"
                label="텍스트[name = 없음] [data-reset-value='test4는 name없습니다.']"
                value={tbitem.test4}
                onChange={onTextFieldChange}
                required
                data-reset-value="test4는 name없습니다"
                className="m-1"
              />
            </WiniGridItem>
            <WiniGridItem>
              <WiniText
                ui="column"
                label="텍스트[name = test5]"
                name="test5"
                value={tbitem.test5}
                onChange={onTextFieldChange}
                className="m-1"
              />
              <WiniSelect
                ui="column"
                label="셀렉트[name = test6] [data-reset-value='s4']"
                name="test6"
                value={tbitem.test6}
                onChange={onTextFieldChange}
                data-reset-value="s4"
                className="m-1"
              >
                <WiniMenuItem value="s1">{'셀렉트1번 값'}</WiniMenuItem>
                <WiniMenuItem value="s2">{'셀렉트2번 값'}</WiniMenuItem>
                <WiniMenuItem value="s3">{'셀렉트3번 값'}</WiniMenuItem>
                <WiniMenuItem value="s4">{'셀렉트4번 값'}</WiniMenuItem>
                <WiniMenuItem value="s5">{'셀렉트5번 값'}</WiniMenuItem>
              </WiniSelect>

              <WiniNumber
                ui="column"
                label="넘버박스[name = num] [data-reset-value={0}]"
                name="num"
                required
                value={tbitem.num}
                onChange={onTextFieldChange}
                thousandSeparator
                data-reset-value={0}
                className="m-1"
              />
              <WiniDateTimePicker
                ui="column"
                label="데이터타임피커[name = date] [data-reset-value={winiDate.now()}]"
                name="date"
                value={tbitem.date}
                onChange={onTextFieldChange}
                data-reset-value={winiDate.now()}
                className="m-1"
              />
            </WiniGridItem>
          </WiniGridLayout>
          <WiniButton ui = 'line'className="mt-4" onClick={() => { setTbItem(initialState); }}>기본값으로 초기화</WiniButton>
        </WiniBox>
      </>
    );
  };

  const CodeExample = ({ copyText, code, onCopy }) => (
    <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
      <WiniBox className="flex items-center justify-between">
        <WiniTypography variant="span" className="text-white text-lg">
          코드 예시
        </WiniTypography>
        <WiniBox ui="btnbox">
          <WiniButton
            ui="gray"
            onClick={onCopy}
            className="transition-all duration-300"
          >
            {copyText}
          </WiniButton>
        </WiniBox>
      </WiniBox>
      <WiniCode code={code} language="jsx" />
    </WiniBox>
  );

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8">
        <WiniTypography variant="h1">winiCom(레이아웃 함수)</WiniTypography>
        <WiniTypography variant="h2"> 레이아웃 함수 가이드</WiniTypography>

        <WiniBox ui="info">
          <WiniTypography variant="span" className="text-md">
            `winiCom`에 포함된 레이아웃관련 함수 입니다.
            <br />
            사용할 수 있는 레이아웃의 종류는 다음과 같습니다:
            <b>`WiniBox`,`WiniGridLayout`,`WiniPaper`,`WiniTabpanel`,`WiniStack`,`WiniCard`</b>
            <br />
            `useRef`과 각 컴포넌트의 `name` 속성을 사용 하여 레이아웃 안에 컴포넌트의 `값 체크`,`초기화`등의 기능을 편리하게 사용할 수 있습니다.
            <br />
            `name`속성이 정의되지 않은 경우 데이터를 가져오거나 초기화하지 않습니다.
          </WiniTypography>
        </WiniBox>
        <WiniBox ui="line">
          <WiniBox className="mt-4">
            <WiniTypography variant="h2">레이아웃 예시</WiniTypography>
            <WiniTypography variant="span" className="text-md mb-4">
              이 WiniBox는  ref=formRef 속성을가지고 있습니다. 따라서 winiCom 의 레이아웃 함수를 사용할수 있습니다. <br />
              아래 설명하는 함수들은 아래 폼에에 있는 컨트롤에 적용됩니다.
            </WiniTypography>
            {renderUiPreview()}
            <WiniList className="w-full overflow-y-auto flex flex-col mt-4">
              <WiniListItem className="w-full flex flex-col">
                <WiniButton
                  aria-expanded={open}
                  onClick={() => handleDepthToggle()}
                  className={`w-full border-1 ${open ? 'activeMenu' : ''}`}
                >
                  레이아웃 예시 코드보기
                  <WiniIcon icon={open ? 'up' : 'down'} />
                </WiniButton>
                <WiniCollapse in={open} mountOnEnter unmountOnExit className="w-full">
                  <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative w-full">
                    <WiniBox className="flex items-center justify-between">
                    </WiniBox>
                    <WiniCode code={sampleCode} language="jsx" />
                  </WiniBox>
                </WiniCollapse>
              </WiniListItem>
            </WiniList>

          </WiniBox>
        </WiniBox>

        {WINI_COM_LAYOUT_GUIDES.map((item) => (
          <WiniBox key={item.key} ui="line">
            <WiniTypography variant="h2">{item.key}</WiniTypography>
            <WiniBox className="mb-4">
              <WiniTypography variant="span" className="text-md">
                {item.description}
              </WiniTypography>
            </WiniBox>
            <WiniBox className="mt-4" gap={1}>
              <WiniButton onClick={item.fn} className="mb-1">{item.name}</WiniButton>
              {item.return && item.return()}
            </WiniBox>
            <CodeExample
              copyText={copyState ? copyState[item.key] === 'copy' ? '복사하기' : '복사 완료':''}
              code={item.code}
              onCopy={() => handleCopy(item.key, item.code)}
            />
          </WiniBox>
        ))}
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
