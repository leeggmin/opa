import { WiniBox, WiniButton, WiniCheckbox, WiniGridItem, WiniGridLayout, WiniMenuItem, WiniNumber, WiniSelect, WiniText } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴 편집 폼
 */
export const Editor = ({
  menuData,
  menuOnly = [],
  onChange,
  onInsert,
  onUpdate,
  onDelete,
  onReset,
  formRef,
}) => {
  const isNewMenu = menuData.id === '';
  const isMenuType = menuData.menuType === 'MENU';

  return (
    <WiniBox
      ui="form"
      ref={formRef}
    >
      <WiniGridLayout container rowSpacing={1} columnSpacing={1} rowItem={1}>
        <WiniGridItem>
          <WiniText
            ui="row"
            titleFix
            required
            label="메뉴 Code"
            name={'menuCode'}
            value={menuData.menuCode}
            className="w-full"
            disabled={!isMenuType}
            onChange={onChange}
          />
        </WiniGridItem>
        <WiniGridItem>
          <WiniText
            ui="row"
            titleFix
            label="메뉴 명"
            required
            name={'name'}
            value={menuData.name}
            className="w-full"
            onChange={onChange}
          />
        </WiniGridItem>
        <WiniGridItem>
          <WiniSelect
            ui="row"
            titleFix
            label="상위메뉴 ID"
            className="w-full"
            name="parentMenuId"
            value={menuData.parentMenuId}
            displayEmpty
            inputProps={{ tabIndex: 0 }}
            onChange={onChange}
            data-reset-value={''}
            disabled={!isMenuType}
          >
            <WiniMenuItem value="">최상위</WiniMenuItem>
            {menuOnly.map((item) => (
              <WiniMenuItem key={item.id} value={item.id}>
                {item.title}
              </WiniMenuItem>
            ))}
          </WiniSelect>
        </WiniGridItem>
        <WiniGridItem>
          <WiniText
            ui="row"
            titleFix
            label="메뉴경로"
            name={'menuMapping'}
            value={menuData.menuMapping}
            disabled
            className="w-full"
            onChange={onChange}
          />
        </WiniGridItem>
        <WiniGridItem>
          <WiniNumber
            ui="row"
            titleFix
            label="정렬순서"
            name={'sortSeq'}
            value={menuData.sortSeq}
            className="w-full"
            inputProps={{ allowNegative: false, decimalScale: 0, inputMode: 'numeric' }}
            inputSx={{ '& input': { textAlign: 'left' } }}
            onChange={onChange}
          />
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox>
            <WiniCheckbox
              size={'small'}
              checked={menuData.status}
              name={'status'}
              label="사용여부"
              disabled={!isMenuType}
              data-reset-value={true}
              onChange={onChange}
            />
          </WiniBox>
        </WiniGridItem>
        <WiniGridItem>
          <WiniBox
            ui="btnbox"
          >
            <WiniBox ui="btnitem">
              {winiCom.checkMenuAut(
                'delete',
                <WiniButton
                  ui="delete"
                  className="w-20"
                  disabled={!isMenuType || isNewMenu}
                  onClick={onDelete}
                >
                  삭제
                </WiniButton>,
              )}
            </WiniBox>
            <WiniBox ui="btnitem">
              <WiniButton ui="lineGray" className="w-20" onClick={onReset} disabled={!isMenuType}>
                초기화
              </WiniButton>
              {winiCom.checkMenuAut(
                'update',
                <WiniButton
                  ui="line"
                  className="w-20"
                  onClick={onUpdate}
                  disabled={isNewMenu}
                >
                  수정
                </WiniButton>
              )}
              {winiCom.checkMenuAut(
                'insert',
                <WiniButton
                  ui="default"
                  className="w-20"
                  disabled={!isMenuType || !isNewMenu}
                  onClick={onInsert}
                >
                  등록
                </WiniButton>,
              )}
            </WiniBox>
          </WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniBox>
  );
};
