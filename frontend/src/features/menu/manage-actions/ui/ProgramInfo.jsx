import { WiniStack, WiniText, WiniTypography, WiniDivider, WiniBox, WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';

/**
 * 선택된 프로그램 정보 표시
 */
export const ProgramInfo = ({ programCode, programName }) => {
  return (
    <>
      <WiniTypography variant="h2">
        프로그램 액션 목록
      </WiniTypography>
      <WiniBox ui="form">
        <WiniGridLayout container rowSpacing={1} columnSpacing={1} rowItem={2}>
          <WiniGridItem>
            <WiniText
              ui="column"
              label={'선택된 프로그램 Code'}
              value={programCode}
              readOnly
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniText
              ui="column"
              label={'선택된 프로그램 이름'}
              value={programName}
              readOnly
            />
          </WiniGridItem>
        </WiniGridLayout>


      </WiniBox>
    </>
  );
};
