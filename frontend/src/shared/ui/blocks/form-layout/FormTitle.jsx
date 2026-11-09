import { WiniStack, WiniTypography, WiniBox, WiniIcon } from '@/shared/ui/wini';
import { buildBreadcrumb } from '@/shared/lib';
import { isLocalhost } from '@/shared/config';
import { menuStore } from '@/shared/model';

/**
 * FormTitle - 인증 레이아웃용 상단 헤더
 */
export function FormTitle({ id }) {
  const showDevLink = isLocalhost();
  const menuInfo = menuStore((state) => state.menuInfo);
  const selectedMenu = menuInfo.find(
    (menu) => String(menu._id ?? menu.id) === String(id),
  );
  const { title, breadcrumb } = buildBreadcrumb(menuInfo, id);
  const menuUrl = selectedMenu?.id ?? '';

  const breadcrumbParts = (() => {
    if (breadcrumb === undefined || breadcrumb === null) {
      return [];
    }
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((v) => String(v).trim()).filter(Boolean);
    }
    const raw = String(breadcrumb).trim();
    if (!raw) {
      return [];
    }
    const separator = raw.includes('>') ? '>' : raw.includes('/') ? '/' : null;
    if (!separator) {
      return [raw];
    }
    return raw
      .split(separator)
      .map((v) => v.trim())
      .filter(Boolean);
  })();

  return (
    <WiniBox
      className="z-10 bg-white pr-6 pl-7.5"
    >
      <WiniBox
        className='flex justify-between items-center w-full'
      >
        <WiniTypography
          variant="h1"
        >
          {title}
        </WiniTypography>

        {!!menuUrl && showDevLink && (
          <WiniStack direction={'row'} alignItems={'center'}>
            <WiniTypography className="text-[#999]" component="div">
              {menuUrl}{' '}
              <a href={`/dev?path=${menuUrl}`} target="_blank" rel="noreferrer">
              <WiniTypography className="font-bold text-center">dev에서 열기🤗</WiniTypography>
              </a>
            </WiniTypography>
          </WiniStack>
        )}

        <WiniStack direction={'row'} alignItems={'center'} gap={1}>
          <WiniBox className='flex items-center'>
            <WiniIcon icon="home" className='text-text-default mr-1' sx={{ width: 20, height: 20 }} />
            <WiniTypography variant='span' className='text-text-default'>
              HOME
            </WiniTypography>
          </WiniBox>

          {breadcrumbParts.map((part, idx) => (
            <WiniStack key={`${part}-${idx}`} direction={'row'} alignItems={'center'}>
              <WiniIcon
                icon="right"
                className='text-text-default mr-2'
                sx={{ width: 20, height: 20 }}
              />
              <WiniTypography variant='span' className='text-text-default'>
                {part}
              </WiniTypography>
            </WiniStack>
          ))}
        </WiniStack>
      </WiniBox>
    </WiniBox>
  );
}
