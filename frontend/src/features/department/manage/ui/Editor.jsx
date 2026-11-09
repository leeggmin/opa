import { WiniBox, WiniButton, WiniText, WiniNumber, WiniSelect, WiniMenuItem, WiniCheckbox } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import { DEPARTMENT_STATUS } from '../model/useEditor';

/**
 * 부서 관리 편집기
 */
export const Editor = ({
  formData,
  deptList,
  treeRef,
  onChange,
  onCheckboxChange,
  onReset,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  return (
    <WiniBox ui="form">
      <WiniBox
        className="flex-1 flex flex-col gap-2"
      >
        <WiniText
          ui="column"
          label="부서 CODE"
          name={'departmentCode'}
          required={true}
          value={formData.departmentCode || ''}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          className="w-full"
          onChange={onChange}
        />
        <WiniText
          ui="column"
          label="부서 명"
          required={true}
          name={'departmentName'}
          value={formData.departmentName || ''}
          className="w-full m-0"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          onChange={onChange}
        />
        <WiniSelect
          ui="column"
          label="상위부서"
          className="w-full"
          name="parentDepartmentId"
          value={formData.parentDepartmentId || ''}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          inputProps={{ tabIndex: 0 }}
          onChange={onChange}
          data-reset-value={''}
        >
          {deptList.map((item, idx) => {
            return (
              <WiniMenuItem key={idx} value={item.id}>
                {item.departmentName}
              </WiniMenuItem>
            );
          })}
        </WiniSelect>
        <WiniNumber
          ui="column"
          label="정렬순서"
          name={'sortSeq'}
          required={true}
          value={formData.sortSeq || ''}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          className="w-full mb-2"
          onChange={onChange}
          inputProps={{ allowNegative: false, decimalScale: 0, inputMode: 'numeric' }}
          inputSx={{ '& input': { textAlign: 'left' } }}
        />
        <WiniCheckbox
          size='large'
          label="사용여부"
          required={false}
          checked={formData.status === DEPARTMENT_STATUS.ENABLE}
          onChange={onCheckboxChange}
        />
      </WiniBox>
      <WiniBox ui="btnbox">
        <WiniBox ui="btnitem">
          {winiCom.checkMenuAut(
            'delete',
            <WiniButton
              ui="delete"
              className="w-20"
              onClick={onDelete}
              disabled={!formData.id}
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
              disabled={!formData.id}
            >
              수정
            </WiniButton>,
          )}
          {winiCom.checkMenuAut(
            'insert',
            <WiniButton
              ui="default"
              className="w-20"
              onClick={onAdd}
              disabled={!!formData.id}
            >
              등록
            </WiniButton>,
          )}
        </WiniBox>
      </WiniBox>
    </WiniBox>
  );
};
