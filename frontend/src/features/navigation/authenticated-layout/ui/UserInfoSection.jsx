import { WiniBox, WiniButton, WiniIcon, WiniTypography } from '@/shared/ui/wini';
import { ChevronRightIcon } from '@/shared/lib';
import logo from '@/shared/assets/logos/winitech_logo1.png';
import { userStore } from '@/shared/model';
import { ICONS } from '@/shared/assets';

/**
 * UserInfoSection - 드로어 상단 사용자/로고 영역
 */
export function UserInfoSection({ isOpen, onLogout, onMainClick, onToggleDrawer }) {
  const userName = userStore((s) => s.userName);
  return (
    <WiniBox
      className={`area-top relative z-1 flex shrink-0 flex-col overflow-hidden border-b border-[#ddd] ${isOpen ? 'min-h-0' : 'h-[55px] justify-center'
        }`}
    >
      <WiniBox className={`logo ${isOpen ? 'flex' : 'hidden'} shrink-0 justify-center items-center mt-[10px]`}>
          <button
            type="button"
            className="cursor-pointer border-0 bg-transparent p-0"
            onClick={onMainClick}
            aria-label="메인 화면으로 이동"
            disabled={!onMainClick}
          >
            <img
              src={logo}
              className="mt-[10px] w-[180px]"
              alt="Winitech Logo"
            />
          </button>
      </WiniBox>

      <WiniBox className={`area-user ${isOpen ? 'block shrink-0' : 'hidden'}`}>
        <WiniTypography className="welcome text-center text-[#3c3c3c]">
          {userName}님 환영합니다.
        </WiniTypography>
      </WiniBox>

      <WiniBox
        className={`shrink-0 ${
          isOpen
            ? 'flex border-t border-[#ddd] [&>*+*]:border-l [&>*+*]:border-[#ddd] '
            : 'flex h-[43px] items-center justify-center ml-1 mt-0'
        }`}
      >
        <WiniButton
          className={`${isOpen ? 'inline-flex' : 'hidden'} appearance-none flex-1 border-0 p-2 cursor-pointer bg-white text-[#595858] text-[15px]`}
          onClick={onLogout}
        >
          <WiniIcon icon="logout" className="mr-[5px] mb-px text-[18px]" /> 로그아웃
        </WiniButton>
        <WiniButton
          onClick={onToggleDrawer}
          className={`inline-flex border-0 border-r-0 p-2 cursor-pointer bg-white rounded-none text-[#595858] text-[15px] ${isOpen ? 'flex-1' : 'items-center justify-center'}`}
        >
          {!isOpen ? <><WiniIcon icon="right" className="mr-[5px] mb-px" /></> : (<><WiniIcon icon="left" className="mr-[5px] mb-px text-[18px]" />접기</>)}
        </WiniButton>
      </WiniBox>
    </WiniBox>
  );
}
