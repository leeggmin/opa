import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { WiniMasonry } from '@/shared/ui/wini';

export default function SamplePage() {
  //4
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(null);
  // const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(0.5),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   ...theme.applyStyles('dark', {
  //     backgroundColor: '#1A2027',
  //   }),
  // }));
  //6
  useEffect(() => {
    timeset();
  }, [count]);
  //7
  const clikcHandler = (e) => {
    setCount(count + 1);
  };
  const timeset = () => {
    setTime(new Date().toString());
  };
  //5
  return (
    <div>
      <div>화면영역</div>
      <p>State 예제 입니다.</p>
      <div>클릭수 {count}</div>
      <div>마지막 변경 시간 {time}</div>
      <button onClick={clikcHandler}> 클릭 </button>

      <div
        style={{ width: 500, borderTop: '1px solid #eaeaea', marginTop: 20 }}
      >
        화면 컴포넌트 예제
        <Sample2 count={count} />
      </div>
      {/* <WiniMasonry columns={4} spacing={2}>
                {heights.map((height, index) => (
                <Item key={index} sx={{ height }}>
                    {index + 1}
                </Item>
                ))}
            </WiniMasonry> */}
    </div>
  );
}
/**컴포넌트 화와 pros 사용하기 */
const Sample2 = (props) => {
  const [datalist, setDataList] = useState([]);
  const [show, setShow] = useState(false);
  const handlershow = () => {
    setShow(!show);
  };
  const dataPlus = () => {
    setDataList([...datalist, new Date().getMilliseconds()]);
  };
  const makeImg = (item, index) => {
    return (
      <div style={{ border: '1px solid green', flex: 1, margin: 10 }}>
        <p>
          {index}datalist state의 값값{item}
        </p>
      </div>
    );
  };
  useEffect(() => {
  }, [datalist]);

  return (
    <div>
      <p>안녕하세요 이곳은 완전히 다른 컴포넌트 입니다.</p>
      <p>이 값은 부모화면에서 받아온 클릭수 입니다 : {props.count}</p>
      <button onClick={dataPlus}>
        {' '}
        이곳을 누르면배열의 값을 넣을수 있습니다
      </button>
      <p>현재 배열의 값: {datalist.length > 0 ? datalist.join(',') : ''}</p>
      <button onClick={handlershow}>보이기 숨기기</button>
      {/* react의 화면은 삼항연산자를 사용하여 제어할수 있습니다 */}
      {show == true ? (
        <div style={{ display: 'flex' }}>
          {datalist.map((item, index) => makeImg(item, index))}
        </div>
      ) : null}
    </div>
  );
};
