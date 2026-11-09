import { WiniStack, WiniTypography, WiniBox, WiniIcon } from '@/shared/ui/wini';
import { HomeIcon, LabelImportantIcon } from '@/shared/lib';
import { DrawerHeader } from '@/shared/ui';
import { isLocalhost } from '@/shared/config';

/**
 * PageHeader - 인증 레이아웃용 상단 헤더
 */
export function PageHeader({ title, isDrawerOpen }) {

  return (
    <DrawerHeader
      className={`${isDrawerOpen ? 'pl-[315px]' : 'pl-[88px]'} bg-white pr-6 z-10`}
    >
      <WiniBox
        className='flex justify-between items-center w-full'
      >
        <WiniTypography
          variant="h4"
        >
          pageheader{/* {title} */}
        </WiniTypography>
      </WiniBox>
    </DrawerHeader>
  );
}
