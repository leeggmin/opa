import { WiniStack, WiniTypography } from '@/shared/ui/wini';

export default function AuthErrorPage() {
  return (
    <WiniStack className="min-h-[50vh] flex flex-col items-center justify-center gap-2">
      <WiniTypography variant="h5">로드할 화면이 없습니다. 😥</WiniTypography>
      <WiniTypography className="text-gray-600">
        권한 또는 경로를 확인해주세요.
      </WiniTypography>
  </WiniStack>
  );
}

