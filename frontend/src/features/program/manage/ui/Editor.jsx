import { AddIcon, CloseIcon } from '@/shared/lib';
import {
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniGridItem,
  WiniGridLayout,
  WiniIconButton,
  WiniStack,
  WiniText,
  WiniTypography,
} from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 프로그램 편집 폼
 */
export const Editor = ({
  programData,
  onChange,
  onInsert,
  onUpdate,
  onDelete,
  onReset,
  onOpenRelDialog,
  onRemoveRelProgram,
  formRef,
  listStyle,
}) => {
  const isNewProgram = programData.programId === '';

  const renderRelProgramList = (item, idx) => {
    return (
      <WiniStack
        direction={'row'}
        className={listStyle + " w-full pl-2 pr-5 cursor-pointer mt-0.5"}
        key={`${item.programId}_${idx}`}
      >
        <WiniTypography className="w-80%">
          {item.programName}
        </WiniTypography>
        {winiCom.checkMenuAut(
          ['u', 'd'],
          <WiniIconButton
            className="h-15"
            data-value={item.programId}
            onClick={() => onRemoveRelProgram(item.programId)}
          >
            <CloseIcon fontSize="small" className="mt-1" />
          </WiniIconButton>,
        )}
      </WiniStack>
    );
  };

	return (
		<>
		<WiniBox ui="form">
			<WiniGridLayout container rowSpacing={1} columnSpacing={1} ref={formRef}>
				<WiniGridItem size={{ md: 6, xs: 12 }}>
					<WiniText
					ui='row'
					titleFix
					label="화면Code"
					required
					name={'programCode'}
					value={programData.programCode}
					onChange={onChange}
					className="w-full"
					/>
				</WiniGridItem>
				<WiniGridItem size={{ md: 6, xs: 12 }}>
					<WiniText
					ui='row'
					titleFix
					label="화면명"
					name={'programName'}
					value={programData.programName}
					onChange={onChange}
					className="w-full"
					/>
				</WiniGridItem>
				<WiniGridItem size={{ md: 6, xs: 12 }}>
					<WiniText
					ui='row'
					titleFix
					label="화면경로"
					required
					name={'programMapping'}
					value={programData.programMapping}
					onChange={onChange}
					className="w-full"
					/>
				</WiniGridItem>
				<WiniGridItem size={{ md: 6, xs: 12 }}>
					<WiniCheckbox
					size={'small'}
					name={'programMappingStatus'}
					checked={programData.programMappingStatus}
					label="화면경로 고정여부"
					onChange={onChange}
					/>
				</WiniGridItem>
				<WiniGridItem size={{ xs: 12 }}>
					<WiniText
					ui='row'
					titleFix
					label="비고"
					name={'remark'}
					value={programData.remark}
					onChange={onChange}
					className="w-full"
					/>
				</WiniGridItem>
				<WiniGridItem size={{ md: 6, xs: 12 }} >
					<WiniCheckbox
					name={'menuStatus'}
					size={'small'}
					checked={programData.menuStatus}
					label="메뉴여부"
					onChange={onChange}
					data-reset-value={true}
					/>
				</WiniGridItem>
				<WiniGridItem size={{ md: 6, xs: 12 }}>
					<WiniCheckbox
						name={'status'}
						size={'small'}
						checked={programData.status}
						label="사용여부"
						onChange={onChange}
						data-reset-value={true}
					/>
				</WiniGridItem>
				<WiniGridItem size={{ xs: 12 }} >
					<WiniStack direction={'row'} flexGrow={1} justifyContent={'space-between'}>
					<WiniTypography
						className="text-sm text-gray-600 m-1 font-bold"
					>
						화면 관련 경로
					</WiniTypography>
					{winiCom.checkMenuAut(
						'update',
						<WiniButton
							ui="lineGray"
							onClick={onOpenRelDialog}
						>
							<AddIcon fontSize="small" />
							추가
						</WiniButton>,
					)}
					</WiniStack>
					<WiniBox
						className="bg-white border border-gray-300 rounded-md p-1 overflow-y-scroll overflow-x-hidden h-21"
					>
						{programData.relProgramList?.map((item, idx) =>
							renderRelProgramList(item, idx),
						)}
					</WiniBox>
				</WiniGridItem>
			</WiniGridLayout>
			<WiniBox ui="btnbox">
				<WiniBox ui="btnitem">

					{winiCom.checkMenuAut(
						'delete',
						<WiniButton
							ui="delete"
							className="w-20"
							onClick={onDelete}
							disabled={isNewProgram}
						>
							삭제
						</WiniButton>,
					)}
				</WiniBox>
				<WiniBox ui="btnitem">
					<WiniButton ui="lineGray" className="w-20" onClick={onReset}>
					초기화
					</WiniButton>
					{winiCom.checkMenuAut(
						'update',
						<WiniButton
							ui="line"
							className="w-20"
							onClick={onUpdate}
							disabled={isNewProgram}
						>
							수정
						</WiniButton>
					)}
					{winiCom.checkMenuAut(
						'insert',
						<WiniButton
							ui="default"
							className="w-20"
							onClick={onInsert}
							disabled={!isNewProgram}
						>
							등록
						</WiniButton>,
					)}
				</WiniBox>
			</WiniBox>
		</WiniBox>
		</>
	);
};
