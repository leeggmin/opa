import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';
import { useState, useRef, useCallback } from 'react';
import {
  RouteSection,
  useRouteList,
  useRouteForm,
  useRouteActions,
} from '@/features/api-gateway/route';
import {
  PredicateSection,
  usePredicateList,
  usePredicateForm,
  usePredicateActions,
} from '@/features/api-gateway/predicate';

/**
 * API Gateway Route 관리 페이지
 */
export const ApiIngressPolicyPage = () => {
  const refRoute = useRef();
  const refPredicate = useRef();
  const [serviceName] = useState('api-gateway');

  // Route Form
  const {
    selected: selectedRoute,
    onReset: onResetRoute,
    onChangeField: onTextchangefield,
    onGridSelect: onGridSelectedRouteEvent,
  } = useRouteForm();

  // Route List
  const {
    refGrid: refRouteGrid,
    list: route,
    search: searchRoute,
    setSearch: setSearchRoute,
    onSearch: onRouteSearch,
    setFindId: setRouteFindId,
  } = useRouteList(serviceName);

  // Route Actions
  const {
    onInsert: onRouteInsert,
    onUpdate: onRouteUpdate,
    onDelete: onRouteDelete,
  } = useRouteActions(
    serviceName,
    selectedRoute,
    onRouteSearch,
    onResetRoute,
    setRouteFindId,
  );

  // Predicate Form
  const {
    selected: selectedPredicate,
    onReset: onPredicateReset,
    onChangeTextField: onChangeTextPredicateFields,
    onChangeMethodField: onChangeMethodPredicateFields,
    onGridSelect: onGridSelectedPredicateEvent,
  } = usePredicateForm();

  // Predicate List
  const {
    refGrid: refPredicateGrid,
    list: predicateList,
    search: searchPredicate,
    setSearch: setSearchPredicate,
    onSearch: onPredicateSearch,
    resetAll: resetPredicateAll,
    setFindId: setPredicateFindId,
  } = usePredicateList(serviceName, selectedRoute.routeId, onPredicateReset);

  // Predicate Actions
  const {
    onInsert: onPredicateInsert,
    onUpdate: onPredicateUpdate,
    onDelete: onPredicateDelete,
  } = usePredicateActions(
    serviceName,
    selectedRoute.routeId,
    selectedPredicate,
    onPredicateSearch,
    onPredicateReset,
    setPredicateFindId,
  );

  // Route 선택 시 Predicate 초기화
  const handleRouteSelection = useCallback(
    (e) => {
      onGridSelectedRouteEvent(e);
      resetPredicateAll();
    },
    [onGridSelectedRouteEvent, resetPredicateAll],
  );

  // Route 삭제 시 Predicate도 초기화
  const handleRouteDelete = useCallback(async () => {
    await onRouteDelete();
    resetPredicateAll();
  }, [onRouteDelete, resetPredicateAll]);

  return (
    <WiniFormNormal>
      <WiniGridLayout container columnSpacing={3} className='p-0'>

        <WiniGridItem ratio={1}>
          {/* Route 관리 섹션 */}
          <RouteSection
            refRoute={refRoute}
            refRouteGrid={refRouteGrid}
            route={route}
            searchRoute={searchRoute}
            setSearchRoute={setSearchRoute}
            selectedRoute={selectedRoute}
            onRouteSearch={onRouteSearch}
            onRouteInsert={onRouteInsert}
            onRouteUpdate={onRouteUpdate}
            onRouteDelete={handleRouteDelete}
            onResetRoute={onResetRoute}
            onTextchangefield={onTextchangefield}
            onGridSelectedRouteEvent={handleRouteSelection}
          />
        </WiniGridItem>

        <WiniGridItem ratio={2}>
          {/* Predicate 관리 섹션 */}
          <PredicateSection
            refPredicate={refPredicate}
            refPredicateGrid={refPredicateGrid}
            predicateList={predicateList}
            searchPredicate={searchPredicate}
            setSearchPredicate={setSearchPredicate}
            selectedPredicate={selectedPredicate}
            selectedRouteId={selectedRoute.routeId}
            onPredicateSearch={onPredicateSearch}
            onPredicateInsert={onPredicateInsert}
            onPredicateUpdate={onPredicateUpdate}
            onPredicateDelete={onPredicateDelete}
            onPredicateReset={onPredicateReset}
            onChangeTextPredicateFields={onChangeTextPredicateFields}
            onChangeMethodPredicateFields={onChangeMethodPredicateFields}
            onGridSelectedPredicateEvent={onGridSelectedPredicateEvent}
          />
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
};

export default ApiIngressPolicyPage;
