import { useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import { WiniDateTimePicker } from '@/shared/ui/wini';
import { Box, Fab, styled } from '@mui/material';

const Test = () => {
  const CustomBox = styled(Box)`
    position: fixed;
    z-index: 1000;

    // 데스크탑
    @media screen and (min-width: 480px) {
      right: 4%;
      bottom: 6%;
    }
  `;

  // 스크롤이 200px 이상 내려올경우 true값을 넣어줄 useState
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  const handleScroll = () => {
    // 스크롤이 Top에서 200px 이상 내려오면 true값을 useState에 넣어줌
    if (window.scrollY >= 200) {
      setScroll(true);
    } else {
      // 스크롤이 50px 미만일경우 false를 넣어줌
      setScroll(false);
    }
  };

  // 페이지 최상단 이동버튼
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 버튼 컴포넌트
  return (
    <CustomBox>
      <Fab
        color="primary"
        aria-label="top"
        onClick={moveTop}
        sx={{
          boxShadow: 'none',
          backgroundColor: 'rgba(0,152,238,0.8)',
          opacity: scroll ? '1' : '0',
          visibility: scroll ? '' : 'hidden',
          transition: scroll
            ? 'all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            : 'all 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        'a'
        {/* <ArrowUpwardIcon /> */}
      </Fab>
    </CustomBox>
  );
};

export default Test;
