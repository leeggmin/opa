import {
  WiniBox,
  WiniButton,
  WiniCheckbox,
  WiniMenuItem,
  WiniSelect,
  WiniStack,
  WiniText,
} from '@/shared/ui';
import { winiCom } from '@/shared/lib';

/**
 * 권한 그룹 편집기 컴포넌트
 */
export const Editor = ({
  authInfo,
  authList,
  onChange,
  onCheckboxChange,
  onReset,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  return (
    <WiniBox ui="form">
      <WiniBox sx={{ mt: 1 }}>
        <WiniText
          ui="column"
          label="권한ID"
          required
          className="w-full"
          name="groupCode"
          value={authInfo.groupCode || ''}

          onChange={onChange}
          placeholder={''}
        />
      </WiniBox>
      <WiniBox sx={{ mt: 1 }}>
        <WiniText
          ui="column"
          label="권한명"
          required
          className="w-full"
          name="groupName"
          value={authInfo.groupName || ''}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          onChange={onChange}
          placeholder={''}
        />
      </WiniBox>

      <WiniBox sx={{ mt: 1 }}>
        <WiniText
          ui="column"
          label="권한 설명"
          className="w-full"
          name="remark"
          value={authInfo.remark || ''}
          slotProps={{
            inputLabel: { shrink: true },
          }}
          onChange={onChange}
          placeholder={''}
        />
      </WiniBox>
      <WiniBox sx={{ mt: 1 }}>
        <WiniSelect
          ui="column"
          label="상위권한ID"
          name="parentAuthorizationGroupId"
          value={authInfo.parentAuthorizationGroupId || ''}
          inputProps={{ shrink: true }}
          className="w-full"
          onChange={onChange}
        >
          {authList.map((item) => (
            <WiniMenuItem key={item.id} value={item.id}>
              {item.groupName}
            </WiniMenuItem>
          ))}
        </WiniSelect>
      </WiniBox>
      <WiniStack direction={'column'} justifyContent={'space-between'}>
        <WiniBox
          className="mt-1 flex justify-start flex-1"
        >
          <WiniCheckbox
            label="관리자 권한 여부"
            value={authInfo.adminStatus || 'DISABLE'}
            onClick={() => onCheckboxChange('adminStatus')}
            checked={authInfo.adminStatus === 'ENABLE'}
          />
          <WiniCheckbox
            label="사용여부"
            value={authInfo.status || 'DISABLE'}
            onClick={() => onCheckboxChange('status')}
            checked={authInfo.status === 'ENABLE'}
          />
        </WiniBox>
        <WiniBox
          ui="btnbox"
        >
          <WiniBox ui="btnitem">
            {winiCom.checkMenuAut(
              'd',
              <WiniButton
                ui="delete"
                className="w-20 ml-1"
                tabIndex={4}
                onClick={onDelete}
                disabled={authInfo.id ? false : true}
              >
                삭제
              </WiniButton>
            )}
          </WiniBox>
          <WiniBox ui="btnitem">
            <WiniButton
              ui="lineGray"
              className="mr-1"
              onClick={onReset}
            >
              초기화
            </WiniButton>
            {winiCom.checkMenuAut(
              'u',
              <WiniButton
                ui="line"
                className="w-20 ml-1"
                tabIndex={4}
                onClick={onUpdate}
                disabled={authInfo.id ? false : true}
              >
                수정
              </WiniButton>
            )}
            {winiCom.checkMenuAut(
              'i',
              <WiniButton
                ui="default"
                className="w-20 ml-1"
                tabIndex={4}
                onClick={onCreate}
                disabled={authInfo.id ? true : false}
              >
                등록
              </WiniButton>
            )}
          </WiniBox>
        </WiniBox>
      </WiniStack>
    </WiniBox>
  );
};
