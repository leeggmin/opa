import {
  WiniTypography,
  WiniDivider,
  WiniBox,
  WiniStack,
  WiniButton,
  WiniInputBase,
} from '@/shared/ui/wini';
// import WiniFormEmpty from '@/shared/ui/form-layout'
import { useState } from 'react';
import { winiCom, toEmpty, toNull } from '@/shared/lib';
import { winiDate } from '@/shared/lib';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { winiMsg } from '@/shared/model/dialogs';
import { InputLabel } from '@mui/material';
// import Mqtt from 'Communicator/Mqtt'

export default function Component05() {
  const un = undefined;
  const dt = winiDate.now();
  const dt1 = new Date();
  const [msg, setMsg] = useState('');
  const [msg2, setMsg2] = useState('');
  // const d3 = com.addDate(new Date(),8,"d");
  // const [mq ,setMq] = useState(null)
  // const refMq = React.useRef();
  // React.useEffect(()=>{
  //     refMq.current = mq;
  // })
  // React.useEffect(()=>{
  //     setMq(new Mqtt(`ws://192.168.110.230:9097/mqtt`,'winirnd','winitech@12345'));

  //     return ()=>{
  //         try{
  //         setMq(null)
  //         if(refMq.current==null)return;
  //             refMq.current.onDisConnect()
  //         }catch(e){
  //             console.log(e)
  //         }

  //     }
  // },[])
  // React.useEffect(()=>{
  //     //setMq(new Mqtt(`ws://192.168.110.230:9097/mqtt`,'winirnd','winitech@12345'));
  //     if(mq==null)return;
  //     console.log(mq)
  //     mq.conn()
  //     mq.setSub({topic:'/env/spu/dcu/utib',qos:0})
  //     mq.onMessage((topic,data)=>{
  //         mqdata(topic,data)
  //     })
  // },[mq])
  // const mqdata = (topic,data)=>{
  //     console.log(topic,JSON.parse(data))
  // }
  const openAlert = async (e) => {
    let msgdata = await winiMsg.showAlert('메세지 내용을 작성해주세요. ');
    setMsg(msgdata);
  };
  const openConfirm = async (e) => {
    let msgdata = await winiMsg.showConfirm(
      '메세지 내용을 작성해주세요. \n 줄바꿈도 가능합니다.',
    );
    setMsg2(msgdata);
  };
  const openSnackbar = () =>
    winiMsg.showSnackbar('잠깐띄우는 메세지에 사용하세요.');
  return (
    <WiniFormEmpty>
      <WiniTypography>공통함수쓰기</WiniTypography>
      <WiniTypography>
        페이지 상단 추가 import com from 'hocs/Library'
      </WiniTypography>
      <WiniTypography>
        페이지 상단 추가 import winiCom from '@/Library/winiCom'
      </WiniTypography>
      <WiniTypography>
        페이지 상단 추가 import winiDate from '@/Library/winiDate'
      </WiniTypography>
      <h3>로그인정보 com</h3>
      <WiniTypography>
        {/* com.getUserId(): 로그인 아이디 가져오기 ▷ {com.getUserId()} */}
      </WiniTypography>
      <WiniTypography>
        {/* com.getUserName(): 로그인 유저 이름 가져오기 ▷ {com.getUserName()} */}
      </WiniTypography>
      <WiniTypography>
        {/* com.getDept(): 로그인 유저 부서서 가져오기 ▷ {com.getDept()} */}
      </WiniTypography>
      <WiniDivider></WiniDivider>
      <h3> 공통함수 winiCom</h3>
      <WiniTypography>
        변수 un : undefined, dt = 날짜형식의 오늘날짜(ex new Date()),{' '}
      </WiniTypography>
      <WiniTypography>
        winiCom.toNull(un) : value값 undefined 값 null로 변경 ▷{' '}
        {String(winiCom.toNull(un))}
      </WiniTypography>
      <WiniTypography>
        winiCom.toEmpty(un) : value값 undefined 또는 null값을 ''(빈칸)으로 변경
        ▷ {String(winiCom.toEmpty(un))}
      </WiniTypography>
      <WiniTypography>
        winiCom.isNumber(un) : 숫자인지 아닌지 판단 ▷{' '}
        {String(winiCom.isNumber(un))}
      </WiniTypography>
      <WiniTypography>
        winiCom.isMobile() : 모바일인지 아닌지 판단 ▷{' '}
        {String(winiCom.isMobile())}
      </WiniTypography>
      {/* <InputLabel>dddsfd</InputLabel> */}
      <WiniTypography variant="h6">메세지박스</WiniTypography>
      <h3> 공통함수 winiMsg</h3>
      <WiniStack direction={'column'}>
        alert
        <WiniTypography>
          let msg = await winiMsg.showAlert('메세지 내용을 작성해주세요. ');{' '}
          <br />: 확인 버튼만 존재하는 alert 창 버튼 클릭후 변수에 값이 넘어옴
        </WiniTypography>
        <WiniButton
          onClick={openAlert}
          variant="contained"
          sx={{ width: '16rem' }}
        >
          {' '}
          메세지창 띄우기
        </WiniButton>
        <WiniTypography> msg 결과값 : {msg}</WiniTypography>
        confirm
        <WiniTypography>
          let b = await winiMsg.showConfirm('메세지 내용을 작성해주세요. \n
          줄바꿈도 가능합니다.');
          <br /> : 예/아니오 버튼이 존재하는 버튼 클릭후 변수에 값이 넘어옴
        </WiniTypography>
        <WiniButton
          onClick={openConfirm}
          variant="contained"
          sx={{ width: '16rem' }}
        >
          {' '}
          메세지창 띄우기
        </WiniButton>
        <WiniTypography> msg 결과값 : {msg2}</WiniTypography>
        snackbar
        <WiniTypography>
          winiMsg.showSnackbar('잠깐띄우는 메세지에 사용하세요.');
          <br /> :snackbar 를 커스텀 해야하는경우는 WiniSnackbar 로 개발!
        </WiniTypography>
        <WiniButton
          onClick={openSnackbar}
          variant="contained"
          sx={{ width: '16rem' }}
        >
          {' '}
          스낵바 띄우기
        </WiniButton>
      </WiniStack>
      <WiniDivider></WiniDivider>
      <h3>날짜 winiDate </h3>
      <WiniTypography>
        winiDate('2025-12-25') : 날짜변환 (WiniDatePicker 사용시 사용해야함 ! )
        ▷ {String(new Date(winiDate('2025-12-25')))}
      </WiniTypography>
      <WiniTypography>
        winiDate.now() : 오늘 날짜 ▷ {String(new Date(winiDate.now()))}
      </WiniTypography>
      <WiniTypography>
        winiDate.dateFormat(date,format) : 날짜 시간 형식 맞추기 (형식 예제
        YYYY년도 MM월 DD일 hh시간 mm분 ss초 )
      </WiniTypography>
      <WiniTypography>
        format 빈칸 ▷ {String(winiDate.dateFormat(dt))}
      </WiniTypography>
      <WiniTypography>
        format YYYY년도 MM월 DD일 hh시간 mm분 ss초 ▷{' '}
        {String(winiDate.dateFormat(dt, 'YYYY년도 MM월 DD일 hh시간 mm분 ss초'))}
      </WiniTypography>
      <WiniTypography>
        format YYYY-MM-DD HH:mm:ss ▷{' '}
        {String(winiDate.dateFormat(dt, 'YYYY-MM-DD HH:mm:ss'))}
      </WiniTypography>
      <WiniTypography>
        winiDate.addDate(date,day,opt) : 날짜계산 (opt형식 빈값은 "d" d:날짜,
        m:달, y:년)
      </WiniTypography>
      <WiniTypography>
        winiDate.addDate(dt,3,"d") ▷ {String(winiDate.addDate(dt, 3, 'd'))}
      </WiniTypography>
      <WiniTypography>
        winiDate.addDate(dt,-3,"y") ▷ {String(winiDate.addDate(dt, -3, 'y'))}
      </WiniTypography>
      <WiniTypography>
        winiDate.getBetweenDay(fromdate,toDate) : 사이 일자 계산하기{' '}
      </WiniTypography>
      <WiniTypography>
        winiDate.getBetweenDay(winiDate.now(),winiDate.addDate(winiDate.now(),3,"d"1))
        ▷{' '}
        {String(
          winiDate.getBetweenDay(
            winiDate.now(),
            winiDate.addDate(winiDate.now(), 3, 'd'),
          ),
        )}
      </WiniTypography>
      <WiniTypography>
        winiDate.getLastDateofMonth(winiDate.now()) : 해당월의 마지막날 가져오기
        ▷{' '}
        {winiDate.dateFormat(
          winiDate.getLastDateofMonth(winiDate.now()),
          'YYYY-MM-DD',
        )}
      </WiniTypography>
      <WiniTypography>
        winiDate.getFirstDateofMonth(winiDate.now()) : 해당월의 1일 가져오기 ▷{' '}
        {winiDate.dateFormat(
          winiDate.getFirstDateofMonth(winiDate.now()),
          'YYYY-MM-DD',
        )}
      </WiniTypography>
      <WiniTypography>
        winiDate.dateParseStartOf(winiDate.now()) : 해당일자의 0시0분0초로 세팅
        (파라메터에서 자주사용 )<br /> ▷{' '}
        {winiDate.dateFormat(
          winiDate.dateParseStartOf(winiDate.now()),
          'YYYY-MM-DD HH:mm:ss',
        )}
      </WiniTypography>
      <WiniTypography>
        winiDate.dateParseEndOf(winiDate.now()) : 해당일자의23시59분059로 세팅
        (파라메터에서 자주사용 ) <br /> ▷{' '}
        {winiDate.dateFormat(
          winiDate.dateParseEndOf(winiDate.now()),
          'YYYY-MM-DD HH:mm:ss',
        )}
      </WiniTypography>
      <WiniTypography fontWeight={'bold'} mt={1}>
        날짜 Format 정보 참고바랍니당{' '}
      </WiniTypography>
      <table style={{ border: '1px solid #eaeaea' }}>
        <thead style={{ background: '#eaeaea' }}>
          <tr>
            <td style={{ width: '7em' }}>Format</td>
            <td style={{ width: '7em' }}>설명</td>
            <td style={{ width: '7em' }}>Format</td>
            <td style={{ width: '7em' }}>설명</td>
            <td style={{ width: '7em' }}>Format</td>
            <td style={{ width: '7em' }}>설명</td>
            <td style={{ width: '7em' }}>Format</td>
            <td style={{ width: '7em' }}>설명</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Y</td>
            <td>01</td>
            <td>D</td>
            <td>1-31</td>
            <td>H</td>
            <td>0-23</td>
            <td>s</td>
            <td>0-59</td>
          </tr>
          <tr>
            <td>YYYY</td>
            <td>2001</td>
            <td>DD</td>
            <td>01-31</td>
            <td>HH</td>
            <td>00-23</td>
            <td>ss</td>
            <td>00-59</td>
          </tr>
          <tr>
            <td>M</td>
            <td>1-12</td>
            <td>Do</td>
            <td>1st... 31st</td>
            <td>h</td>
            <td>1-12</td>
            <td>S</td>
            <td>0-9</td>
          </tr>
          <tr>
            <td>MM</td>
            <td>01-12</td>
            <td>A</td>
            <td>AM PM</td>
            <td>hh</td>
            <td>01-12</td>
            <td>SS</td>
            <td>00-99</td>
          </tr>
          <tr>
            <td>MMM</td>
            <td>Jan-Dec</td>
            <td>a</td>
            <td>am pm</td>
            <td>m</td>
            <td>0-59</td>
            <td>SSS</td>
            <td>000-999</td>
          </tr>
          <tr>
            <td>MMMM</td>
            <td>January-December</td>
            <td></td>
            <td></td>
            <td>mm</td>
            <td>00-59</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      {/* <WiniDivider></WiniDivider> */}
      {/* <WiniTypography sx={{mt:2}} variant='h6'>
                해당소스코드에 Communicator/Mqtt.js 를 사용한 mqtt 모듈 예제 있음
            </WiniTypography> */}
    </WiniFormEmpty>
  );
}
