import { WiniAgGridReact, WiniBox, WiniButton, WiniCheckbox, WiniGridLayout, WiniGridItem, WiniMenuItem, WiniNumber, WiniSelect, WiniStack, WiniText, WiniTypography } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';
import {
  statusEnums,
  predicateTypeEnum,
  PREDICATE_GRID_COLUMNS,
} from '../model/constants';

/**
 * Predicate 관리 섹션 UI
 */
export const Section = ({
  refPredicate,
  refPredicateGrid,
  predicateList,
  searchPredicate,
  setSearchPredicate,
  selectedPredicate,
  selectedRouteId,
  onPredicateSearch,
  onPredicateInsert,
  onPredicateUpdate,
  onPredicateDelete,
  onPredicateReset,
  onChangeTextPredicateFields,
  onChangeMethodPredicateFields,
  onGridSelectedPredicateEvent,
}) => {
  return (
    <WiniGridLayout>
      {/* 검색바 */}
      <WiniBox ui="search">
        <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={3}>
          <WiniGridItem>
            <WiniText
              ui="column"
              label="검색어"
              value={searchPredicate.searchKeyword}
              onChange={(e) =>
                setSearchPredicate({
                  ...searchPredicate,
                  searchKeyword: e.target.value,
                })
              }
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniSelect
              ui="column"
              label="조건절 유형"
              name="predicateType"
              value={searchPredicate.predicateType}
              labelProps={{ shrink: true }}
              displayEmpty
              defaultValue={''}
              onChange={(e) =>
                setSearchPredicate({
                  ...searchPredicate,
                  predicateType: e.target.value,
                })
              }
            >
              <WiniMenuItem value={''}>ALL</WiniMenuItem>
              {Object.keys(predicateTypeEnum).map((item, idx) => (
                <WiniMenuItem value={item} key={item + '_' + idx}>
                  {predicateTypeEnum[item]}
                </WiniMenuItem>
              ))}
            </WiniSelect>
          </WiniGridItem>
          <WiniGridItem>
            <WiniSelect
              ui="column"
              label="상태"
              name="status"
              value={searchPredicate.status}
              labelProps={{ shrink: true }}
              displayEmpty
              defaultValue={''}
              onChange={(e) =>
                setSearchPredicate({
                  ...searchPredicate,
                  status: e.target.value,
                })
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
        <WiniButton
          ui="default"
          onClick={onPredicateSearch}
          disabled={selectedRouteId === ''}
        >
          조회
        </WiniButton>
      </WiniBox>

      {/* 그리드 및 편집 폼 */}
      <WiniGridLayout container columnSpacing={2}>
        {/* 그리드 */}
        <WiniGridItem >
          <WiniBox height={730}>
            <WiniAgGridReact
              ref={refPredicateGrid}
              rowData={predicateList}
              columnDefs={PREDICATE_GRID_COLUMNS}
              onSelectionChanged={onGridSelectedPredicateEvent}
            />
          </WiniBox>
        </WiniGridItem>

        {/* 편집 폼 */}
        <WiniGridItem>
          <WiniBox ref={refPredicate} ui="form">
            <WiniGridLayout container ui="form" columnSpacing={1} rowSpacing={1} rowItem={1}>
              <WiniGridItem>
                <WiniSelect
                  ui="column"
                  required
                  label={'조건절 유형'}
                  name="predicateType"
                  value={selectedPredicate.predicateType}
                  onChange={onChangeTextPredicateFields}
                >
                  {Object.keys(predicateTypeEnum).map((item, idx) => (
                    <WiniMenuItem value={item} key={item + '-' + idx}>
                      {predicateTypeEnum[item]}
                    </WiniMenuItem>
                  ))}
                </WiniSelect>
              </WiniGridItem>

              {selectedPredicate.predicateType === 'METHOD' && (
                <WiniGridItem>
                  {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((method) => (
                    <WiniCheckbox
                      ui="column"
                      key={method}
                      checked={selectedPredicate.methods?.[method] || false}
                      value={method}
                      label={method}
                      onChange={onChangeMethodPredicateFields}
                    />
                  ))}
                </WiniGridItem>
              )}
              {(selectedPredicate.predicateType === 'COOKIE' ||
                selectedPredicate.predicateType === 'HEADER' ||
                selectedPredicate.predicateType === 'QUERY') && (
                  <>
                    <WiniGridItem>
                      <WiniText
                        ui="column"
                        required
                        label={'키값'}
                        name={'key'}
                        value={selectedPredicate.key}
                        onChange={onChangeTextPredicateFields}
                        sx={{}}
                      />
                    </WiniGridItem>
                    <WiniGridItem>
                      <WiniText
                        ui="column"
                        label={'정규표현식'}
                        name={'definition'}
                        value={selectedPredicate.definition}
                        onChange={onChangeTextPredicateFields}
                        sx={{}}
                      />
                    </WiniGridItem>
                  </>
                )}
              {selectedPredicate.predicateType === 'HOST' && (
                <>
                  <WiniGridItem>
                    <WiniText
                      ui="column"
                      required
                      label={'호스트명'}
                      name={'hostnames'}
                      multiline
                      value={selectedPredicate.hostnames}
                      onChange={onChangeTextPredicateFields}
                      sx={{}}
                    />
                  </WiniGridItem>
                  <WiniGridItem>
                    <WiniTypography component='p' className='text-sm'>
                      호스트명을 한 줄에 하나씩 입력해주세요.
                      <br />
                      * 또는 **를 사용하여 와일드카드를 지정할 수 있습니다.
                      <br />
                      (예) *.example.com, **.example.com) 기본 포트가 아닌 경우
                      포트명도 입력해주세요.
                      <br />
                      (예) localhost:8092)
                    </WiniTypography>
                  </WiniGridItem>
                </>
              )}
              {selectedPredicate.predicateType === 'PATH' && (
                <>
                  <WiniGridItem>
                    <WiniText
                      ui="column"
                      required
                      label={'경로'}
                      name={'paths'}
                      multiline
                      value={selectedPredicate.paths}
                      onChange={onChangeTextPredicateFields}
                      sx={{}}
                    />
                  </WiniGridItem>
                  <WiniGridItem>
                    <WiniTypography component='p' className='text-sm'>
                      경로를 한 줄에 하나씩 입력해주세요.
                      <br />
                      * 또는 **를 사용하여 와일드카드를 지정할 수 있습니다.
                      <br />
                      (예) /api/v1/**, /api/v1/test/*/abc)
                    </WiniTypography>
                  </WiniGridItem>
                </>
              )}
              {selectedPredicate.predicateType === 'WEIGHT' && (
                <>
                  <WiniGridItem>
                    <WiniText
                      ui="column"
                      required
                      label={'그룹'}
                      name={'key'}
                      value={selectedPredicate.key}
                      onChange={onChangeTextPredicateFields}
                      sx={{}}
                    />
                  </WiniGridItem>
                  <WiniGridItem>
                    <WiniNumber
                      ui="column"
                      required
                      label={'가중치'}
                      name={'weight'}
                      value={selectedPredicate.weight}
                      onChange={onChangeTextPredicateFields}
                      sx={{}}
                    />
                  </WiniGridItem>
                </>
              )}
              {!selectedPredicate.predicateType && (
                <WiniGridItem>
                  <WiniTypography component='p' className='text-sm'>
                    {' '}
                    조건절 유형을 선택하세요.{' '}
                  </WiniTypography>
                </WiniGridItem>
              )}
              <WiniGridItem>
                <WiniCheckbox
                  checked={selectedPredicate.status === 'ENABLE'}
                  name={'status'}
                  label={'사용여부'}
                  onChange={onChangeTextPredicateFields}
                  data-reset-value={true}
                />
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
                  onClick={onPredicateDelete}
                  disabled={
                    selectedRouteId === '' ||
                    selectedPredicate.predicateId === ''
                  }
                >
                  삭제
                </WiniButton>,
              )}
            </WiniBox>

            <WiniBox ui="btnitem">
              <WiniButton ui="lineGray" onClick={onPredicateReset}>
                초기화
              </WiniButton>

              {winiCom.checkMenuAut(
                'u',
                <WiniButton
                  ui="line"
                  onClick={() => onPredicateUpdate(refPredicate)}
                  disabled={
                    selectedRouteId === '' ||
                    selectedPredicate.predicateId === ''
                  }
                >
                  수정
                </WiniButton>,
              )}

              {winiCom.checkMenuAut(
                'i',
                <WiniButton
                  ui="default"
                  onClick={() => onPredicateInsert(refPredicate)}
                  disabled={
                    selectedRouteId === '' ||
                    selectedPredicate.predicateId !== ''
                  }
                >
                  등록
                </WiniButton>,
              )}
            </WiniBox>
          </WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    </WiniGridLayout>
  );
};
