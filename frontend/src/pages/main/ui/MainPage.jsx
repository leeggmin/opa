import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { WiniTypography } from '@/shared/ui/wini';

const MainPage = () => {
  return (
    <WiniFormEmpty>
      <WiniTypography variant="h1">
        메인페이지 입니다.
      </WiniTypography>
    </WiniFormEmpty>
  );
};

export { MainPage };
export default MainPage;