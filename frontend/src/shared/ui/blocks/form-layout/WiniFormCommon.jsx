import { useContext, useEffect, useState, Fragment } from 'react';

import { WiniBox, WiniCard, WiniBreadcrumbs, WiniDivider, WiniTypography, WiniStack, WiniButton } from '@/shared/ui/wini';
import { NavigateNextIcon } from '@/shared/lib';
import { winiCom } from '@/shared/lib';
import { getFormContext } from '@/shared/model';
/**
 * WiniFormCommon 화면에 기본적으로 버튼 추가
 * @param {*}
 * @returns dom
 */
export default function WiniFormCommon({ children, ...props }) {
  const { winiEvent, winiAut } = winiCom.getFormInfo('Y');

  return (
    <Fragment>
      <WiniStack
        direction={'row'}
        gap={1}
        sx={{ pl: 4, pr: 3, pt: 1 }}
      >
        {winiAut.select == 'ALLOW' && winiEvent.select !== winiEvent.noop ? (
          <WiniButton onClick={winiEvent.select}>
            조회
          </WiniButton>
        ) : null}
        {winiAut.insert == 'ALLOW' && winiEvent.insert !== winiEvent.noop ? (
          <WiniButton onClick={winiEvent.insert}>
            등록
          </WiniButton>
        ) : null}
        {winiAut.update == 'ALLOW' && winiEvent.update !== winiEvent.noop ? (
          <WiniButton onClick={winiEvent.update}>
            수정
          </WiniButton>
        ) : null}
        {winiAut.delete == 'ALLOW' && winiEvent.delete !== winiEvent.noop ? (
          <WiniButton onClick={winiEvent.delete}>
            삭제
          </WiniButton>
        ) : null}
      </WiniStack>

      <WiniBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="10vh"
        className="normalForm"
        sx={{ overflowY: 'auto' }}
      >
        <WiniBox sx={{ minHeight: 500, pb: 4, pl: 4, pr: 3, flexGrow: 1 }}>
          {children}
        </WiniBox>
      </WiniBox>
    </Fragment>
  );
}
