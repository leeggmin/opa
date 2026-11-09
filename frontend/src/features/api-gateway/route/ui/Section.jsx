import { WiniAgGridReact, WiniBox, WiniButton, WiniCheckbox, WiniGridLayout, WiniGridItem, WiniMenuItem, WiniNumber, WiniSelect, WiniStack, WiniText, WiniTypography } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import { statusEnums } from '../model/constants';

/**
 * Route 관리 섹션 UI
 */
export const Section = ({
  refRoute,
  refRouteGrid,
  route,
  searchRoute,
  setSearchRoute,
  selectedRoute,
  onRouteSearch,
  onRouteInsert,
  onRouteUpdate,
  onRouteDelete,
  onResetRoute,
  onTextchangefield,
  onGridSelectedRouteEvent,
}) => {
  return (
    <WiniGridLayout>
      {/* 검색바 */}
      <WiniBox ui="search">
        <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={2}>
          <WiniGridItem>
            <WiniText
              ui="column"
              label="검색어"
              value={searchRoute.name}
              onChange={(e) =>
                setSearchRoute({ ...searchRoute, name: e.target.value })
              }
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniSelect
              ui="column"
              label="상태"
              name="status"
              value={searchRoute.status}
              className="w-full"
              labelProps={{ shrink: true }}
              displayEmpty
              defaultValue={''}
              onChange={(e) =>
                setSearchRoute({ ...searchRoute, status: e.target.value })
              }
            >
              <WiniMenuItem value={''}>ALL</WiniMenuItem>
              {Object.keys(statusEnums).map((item, idx) => (
                <WiniMenuItem value={item} key={item + '_' + idx}>
                  {statusEnums[item]}
                </WiniMenuItem>
              ))}
            </WiniSelect>
          </WiniGridItem>
        </WiniGridLayout>
        <WiniBox ui="btnbox">
          <WiniBox ui="btnitem">
            <WiniButton onClick={onRouteSearch}>
              조회
            </WiniButton>
          </WiniBox>
        </WiniBox>
        
      </WiniBox>

      {/* 그리드 */}
      <WiniBox height={480}>
        <WiniAgGridReact
          ref={refRouteGrid}
          rowData={route}
          columnDefs={[
            {
              field: 'sortSeq',
              headerName: '정렬 순서',
              width: 90,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'name',
              headerName: '경로명',
              flex: 1,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
            {
              field: 'uri',
              headerName: 'URI',
              flex: 1,
              cellStyle: { textAlign: 'center' },
              sortable: false,
            },
          ]}
          onSelectionChanged={onGridSelectedRouteEvent}
        />
      </WiniBox>

      {/* 편집 폼 */}

      <WiniBox ui="form" ref={refRoute}>
        <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={2}>
          <WiniGridItem>
            <WiniText
              ui="column"
              label="경로명"
              required
              className="w-full"
              name={'name'}
              value={selectedRoute.name}
              onChange={onTextchangefield}
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniText
              ui="column"
              label="URI"
              required
              className="w-full"
              name={'uri'}
              value={selectedRoute.uri}
              onChange={onTextchangefield}
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniNumber
              ui="column"
              label="정렬 순서"
              className="w-full"
              name={'sortSeq'}
              value={selectedRoute.sortSeq}
              onChange={onTextchangefield}
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniCheckbox
              ui="column"
              checked={selectedRoute.status === 'ENABLE'}
              name={'status'}
              label={'사용여부'}
              onChange={onTextchangefield}
              data-reset-value={true}
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniTypography variant='span' className='font-medium'>※ 정렬 순서는 낮을 수록 우선합니다.</WiniTypography>
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      {/* 버튼 */}
      <WiniBox ui="btnbox">
        <WiniBox ui="btnitem">
          {winiCom.checkMenuAut(
            'd',
            <WiniButton
              ui="delete"
              onClick={onRouteDelete}
              disabled={selectedRoute.routeId === ''}
            >
              삭제
            </WiniButton>,
          )}
        </WiniBox>

        <WiniBox ui="btnitem">
          <WiniButton ui="lineGray" onClick={onResetRoute}>
            초기화
          </WiniButton>
          {winiCom.checkMenuAut(
            'u',
            <WiniButton
              ui="line"
              onClick={() => onRouteUpdate(refRoute)}
              disabled={selectedRoute.routeId === ''}
            >
              수정
            </WiniButton>,
          )}
          {winiCom.checkMenuAut(
            'i',
            <WiniButton
              ui="default"
              onClick={() => onRouteInsert(refRoute)}
              disabled={selectedRoute.routeId !== ''}
            >
              등록
            </WiniButton>,
          )}
        </WiniBox>
      </WiniBox>
    </WiniGridLayout>
  );
};
