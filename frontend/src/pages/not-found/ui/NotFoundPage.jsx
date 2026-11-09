import { useNavigate } from 'react-router-dom';
import { WiniBox, WiniButton, WiniTypography } from '@/shared/ui/wini';

export default function NotFoundPage({ mode = '404' }) {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const message =
    mode === 'menu'
      ? '등록되지 않은 메뉴 경로입니다.'
      : '요청하신 페이지를 찾을 수 없습니다.';

  return (
    <WiniBox className="flex flex-col justify-center items-center h-[80vh]">
      <WiniTypography variant="h5">{message}</WiniTypography>
      <WiniButton onClick={goToMain}>돌아가기</WiniButton>
    </WiniBox>
  );
}
