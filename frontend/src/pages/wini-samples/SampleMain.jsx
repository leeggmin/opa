import { useState, Fragment, useMemo, useCallback } from 'react';

import {
  WiniBox,
  WiniButton,
  WiniStack,
  WiniDivider,
  WiniTypography,
  WiniGridLayout,
  WiniGridItem,
  WiniList,
  WiniListItem,
  WiniListItemText,
  WiniIcon,
  WiniIconButton,
  WiniCollapse,
} from '@/shared/ui/wini';
import { Typography } from '@mui/material';
import logo from '@/shared/assets/img/logo.svg';
import { userStore } from '@/shared/model';
import { color } from '@/shared/config/theme';
import Component01 from './Component01';
import Component02 from './Component02';
import Component05 from './Component05';
import Notice from './Notice';
import Component06 from './Component06';
import TableTest from './TableTest';
import Treeview from './Treeview';
import Editor from './Editor';
import SamplePage from './SamplePage';
import ClassSample from './ClassSample';
import GridSample from './GridSample';
import Openlayers from './Openlayers';
import FileUploadSample from './FileUploadSample';
import AllAtoms from './AllAtoms';
import AllAtomsWork from './AllAtomsWork';
import GuideInput from './GuideInput';
import GuideLayout from './GuideLayout';
import GuideSelect from './GuideSelect';
import GuideDatePicker from './GuideDatePicker';
import MenuAdd from './MenuAdd';
import UserManage from './UserManage';
import UserPermission from './UserPermission';
import SnippetInput from './snippet/SnippetInput';
import SnippetSearch from './snippet/SnippetSearch';
import SearchGrid from './snippet/SearchGrid';
import SearchTable from './snippet/SearchTable';
import SearchTableGrid from './snippet/SearchTableGrid';
import SearchTableTab from './snippet/SearchTableTab';
import SearchTab from './snippet/SearchTab';
import SearchMultiGrid from './snippet/SearchMultiGrid';
import SnippetGridLayout from './snippet/SnippetGridLayout';
import TreeviewGrid from './snippet/TreeviewGrid';
import TreeviewButtonGrid from './snippet/TreeviewButtonGrid';
import GridTopButtons from './snippet/GridTopButtons';
import GridBottomButtons from './snippet/GridBottomButtons';
import GridPaging from './snippet/GridPaging';
import GridTopBottomButtons from './snippet/GridTopBottomButtons';
import GridTopBottomButtonsPaging from './snippet/GridTopBottomButtonsPaging';
import SnippetDialog from './snippet/SnippetDialog';
import SnippetBasic from './snippet/SnippetBasic';
import CompWiniBox from './component/CompWiniBox';
import CompWiniText from './component/CompWiniText';
import CompWiniGridLayout from './component/CompWiniGridLayout';
import CompWiniTab from './component/CompWiniTab';
import CompWiniButtonGroup from './component/CompWiniButtonGroup';
import CompWiniButton from './component/CompWiniButton';
import CompWiniIcon from './component/CompWiniIcon';
import CompWiniIconButton from './component/CompWiniIconButton';
import CompWiniToggleButton from './component/CompWiniToggleButton';
import CompWiniSortable from './component/CompWiniSortable';
import CompWiniList from './component/CompWiniList';
import CompWiniSelect from './component/CompWiniSelect';
import CompWiniRadio from './component/CompWiniRadio';
import CompWiniCheckbox from './component/CompWiniCheckbox';
import CompWiniInputLabel from './component/CompWiniInputLabel';
import CompWiniTreeView from './component/CompWiniTreeView';
import CompWiniValue from './component/CompWiniValue';
import CompWiniAgGrid from './component/CompWiniAgGrid';
import CompWiniTable from './component/CompWiniTable';
import WiniCom from './commFunc/WiniCom';
import WiniMsg from './commFunc/WiniMsg';
import WiniDate from './commFunc/WiniDate';
import EnvFunc from './commFunc/EnvFunc';
import GridFunc from './commFunc/GridFunc';
import UserStore from './commFunc/UserStore';
import FileUpload from './commFunc/FileUpload';
import WiniComLayout from './commFunc/WiniComLayout';
import WiniForm from './commLayout/WiniForm';
import WiniFormat from './commFunc/WiniFormat';
import WiniExcel from './commFunc/WiniExcel';

export default function SampleMain() {
  const [pararms, setParams] = useState({});
  const [title, setTitle] = useState('');

  const viewEnums = useMemo(
    () => ({
      notice: (
        <Notice type={'notice'} pararms={pararms} setParams={setParams} />
      ),
      allAtoms: (
        <AllAtoms type={'allAtoms'} pararms={pararms} setParams={setParams} />
      ),
      allAtomsWork: (
        <AllAtomsWork
          type={'allAtomsWork'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GuideInput: (
        <GuideInput type={'input'} pararms={pararms} setParams={setParams} />
      ),
      GuideLayout: (
        <GuideLayout
          type={'guideLayout'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GuideSelect: (
        <GuideSelect type={'select'} pararms={pararms} setParams={setParams} />
      ),
      GuideDatePicker: (
        <GuideDatePicker
          type={'guideDatePicker'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      MenuAdd: (
        <MenuAdd type={'menuAdd'} pararms={pararms} setParams={setParams} />
      ),
      UserManage: (
        <UserManage
          type={'userManage'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      UserPermission: (
        <UserPermission
          type={'userPermission'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SnippetInput: (
        <SnippetInput
          type={'SnippetInput'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SnippetSearch: (
        <SnippetSearch
          type={'SnippetSearch'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SearchGrid: (
        <SearchGrid
          type={'SearchGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),

      SearchTable: (
        <SearchTable
          type={'SearchTable'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SearchTableGrid: (
        <SearchTableGrid
          type={'SearchTableGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SearchTableTab: (
        <SearchTableTab
          type={'SearchTableTab'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SearchTab: (
        <SearchTab type={'SearchTab'} pararms={pararms} setParams={setParams} />
      ),

      SearchMultiGrid: (
        <SearchMultiGrid
          type={'SearchMultiGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SnippetGridLayout: (
        <SnippetGridLayout
          type={'SnippetGridLayout'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      TreeviewGrid: (
        <TreeviewGrid
          type={'TreeviewGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      TreeviewButtonGrid: (
        <TreeviewButtonGrid
          type={'TreeviewButtonGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GridTopButtons: (
        <GridTopButtons
          type={'GridTopButtons'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GridBottomButtons: (
        <GridBottomButtons
          type={'GridBottomButtons'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GridPaging: (
        <GridPaging
          type={'GridPaging'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GridTopBottomButtons: (
        <GridTopBottomButtons
          type={'GridTopBottomButtons'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      GridTopBottomButtonsPaging: (
        <GridTopBottomButtonsPaging
          type={'GridTopBottomButtonsPaging'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SnippetDialog: (
        <SnippetDialog
          type={'SnippetDialog'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      SnippetBasic: (
        <SnippetBasic
          type={'SnippetBasic'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniBox: (
        <CompWiniBox
          type={'CompWiniBox'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniText: (
        <CompWiniText
          type={'CompWiniText'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniGridLayout: (
        <CompWiniGridLayout
          type={'CompWiniGridLayout'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniTab: (
        <CompWiniTab
          type={'CompWiniTab'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniButtonGroup: (
        <CompWiniButtonGroup
          type={'CompWiniButtonGroup'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniButton: (
        <CompWiniButton
          type={'CompWiniButton'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniIcon: (
        <CompWiniIcon
          type={'CompWiniIcon'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniIconButton: (
        <CompWiniIconButton
          type={'CompWiniIconButton'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniToggleButton: (
        <CompWiniToggleButton
          type={'CompWiniToggleButton'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniSortable: (
        <CompWiniSortable
          type={'CompWiniSortable'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniList: (
        <CompWiniList
          type={'CompWiniList'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniSelect: (
        <CompWiniSelect
          type={'CompWiniSelect'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniRadio: (
        <CompWiniRadio
          type={'CompWiniRadio'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniCheckbox: (
        <CompWiniCheckbox
          type={'CompWiniCheckbox'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniInputLabel: (
        <CompWiniInputLabel
          type={'CompWiniInputLabel'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniTreeView: (
        <CompWiniTreeView
          type={'CompWiniTreeView'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniValue: (
        <CompWiniValue
          type={'CompWiniValue'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniAgGrid: (
        <CompWiniAgGrid
          type={'CompWiniAgGrid'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      CompWiniTable: (
        <CompWiniTable
          type={'CompWiniTable'}
          pararms={pararms}
          setParams={setParams}
        />
      ),
      WiniCom: <WiniCom />,
      WiniMsg: <WiniMsg />,
      WiniDate: <WiniDate />,
      EnvFunc: <EnvFunc />,
      GridFunc: <GridFunc />,
      UserStore: <UserStore />,
      file: <FileUpload />,
      WiniComLayout: <WiniComLayout />,
      WiniForm: <WiniForm />,
      WiniFormat: <WiniFormat />,
      WiniExcel: <WiniExcel />,
    }),
    [pararms],
  );

  const [activeMenuKey, setActiveMenuKey] = useState('allAtomsWork');
  const view = viewEnums[activeMenuKey];

  const changeView = useCallback((e, key) => {
    setTitle(e?.currentTarget?.textContent ?? '');
    setActiveMenuKey(key);
  }, []);

  const userName = userStore((s) => s.userName);

  const [openDepth1, setOpenDepth1] = useState({});
  const [openDepth2, setOpenDepth2] = useState({});

  const handleDepth1Toggle = useCallback((id) => {
    setOpenDepth1((prev) => ({ ...prev, [id]: !prev?.[id] }));
    setOpenDepth2((prev) => {
      if (!Object.prototype.hasOwnProperty.call(prev, id)) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleDepth2Toggle = useCallback((parentId, id) => {
    setOpenDepth2((prev) => {
      const parentState = prev?.[parentId] ?? {};
      return {
        ...prev,
        [parentId]: {
          ...parentState,
          [id]: !parentState?.[id],
        },
      };
    });
  }, []);

  const compMenuGroups = [
    {
      id: 'layout',
      title: '레이아웃/구조',
      items: [
        { key: 'CompWiniBox', label: 'WiniBox' },
        { key: 'CompWiniGridLayout', label: 'WiniGridLayout' },
        { key: 'CompWiniTab', label: 'WiniTabs' },
        { key: 'CompWiniList', label: 'WiniList' },
        { key: 'CompWiniTreeView', label: 'WiniTreeView' },
      ],
    },
    {
      id: 'form',
      title: '입력폼',
      items: [
        { key: 'CompWiniText', label: 'WiniText' },
        { key: 'CompWiniSelect', label: 'WiniSelect' },
        { key: 'CompWiniRadio', label: 'WiniRadio' },
        { key: 'CompWiniCheckbox', label: 'WiniCheckbox' },
        { key: 'CompWiniInputLabel', label: 'WiniInputLabel' },
      ],
    },
    {
      id: 'action',
      title: '액션/버튼',
      items: [
        { key: 'CompWiniButton', label: 'WiniButton' },
        { key: 'CompWiniButtonGroup', label: 'WiniButtonGroup' },
        { key: 'CompWiniIconButton', label: 'WiniIconButton' },
        { key: 'CompWiniToggleButton', label: 'WiniToggleButton' },
      ],
    },
    {
      id: 'etc',
      title: '기타',
      items: [
        { key: 'CompWiniAgGrid', label: 'WiniAgGridReact' },
        { key: 'CompWiniTable', label: 'WiniTable' },
        { key: 'CompWiniValue', label: 'WiniValue' },
        { key: 'CompWiniIcon', label: 'WiniIcon' },
        { key: 'CompWiniSortable', label: 'WiniSortable' },
      ],
    },
  ];

  const snippetMenuGroups = [
    {
      id: 'basic',
      title: '기본구성',
      items: [
        { key: 'SnippetBasic', label: '기본구성' },
      ],
    },
    {
      id: 'input',
      title: '입력폼',
      items: [{ key: 'SnippetInput', label: '입력폼' }],
    },
    {
      id: 'search',
      title: '검색폼',
      items: [
        { key: 'SnippetSearch', label: '검색폼' },
        { key: 'SearchGrid', label: '검색폼 + 그리드' },
        { key: 'SearchTable', label: '검색폼 + 입력폼' },
        { key: 'SearchTableGrid', label: '검색폼 + 그리드 + 입력폼' },
        { key: 'SearchTab', label: '검색폼 + 탭' },
        { key: 'SearchMultiGrid', label: '검색폼 + 멀티그리드' },
        { key: 'SearchTableTab', label: '검색폼 + 테이블 + 탭' },
      ],
    },
    {
      id: 'grid',
      title: '그리드',
      items: [
        { key: 'GridTopButtons', label: '그리드 + 상단버튼' },
        { key: 'GridBottomButtons', label: '그리드 + 하단버튼' },
        { key: 'GridPaging', label: '그리드 + 페이징' },
        {
          key: 'GridTopBottomButtons',
          label: '그리드 + 상단버튼 + 하단버튼',
        },
        {
          key: 'GridTopBottomButtonsPaging',
          label: '그리드 + 상단버튼 + 하단버튼 + 페이징',
        },
      ],
    },
    {
      id: 'layout',
      title: '화면분할',
      items: [
        { key: 'SnippetGridLayout', label: '화면분할' },
        { key: 'TreeviewGrid', label: '트리뷰 + 그리드' },
        { key: 'TreeviewButtonGrid', label: '트리뷰 + 버튼 + 그리드' },
      ],
    },
    {
      id: 'dialog',
      title: '팝업',
      items: [{ key: 'SnippetDialog', label: '팝업' }],
    },
  ];

  const commonFuncItems = [
    { key: 'UserStore', label: 'userStore' },
    { key: 'WiniCom', label: 'winiCom (유틸리티 함수)' },
    { key: 'WiniComLayout', label: 'winiCom (레이아웃 함수)' },
    { key: 'WiniFormat', label: 'winiFormat' },
    { key: 'WiniMsg', label: 'winiMsg' },
    { key: 'WiniDate', label: 'winiDate' },
    { key: 'GridFunc', label: 'winiGrid' },
    { key: 'WiniExcel', label: 'winiExcel' },
    { key: 'EnvFunc', label: 'ENV(환경변수)' },
    // { key: 'file', label: 'fileUpDown' }
  ];

  const commonLayoutItems = [
    { key: 'WiniForm', label: 'WiniForm' },
  ];

  const renderDepthItemMenu = useCallback(
    (parentId, items) => (
      <WiniList id={parentId} ui="dep_02">
        {items.map((item) => (
          <WiniListItem key={item.key}>
            <WiniListItemText>
              <WiniButton
                className={activeMenuKey === item.key ? 'activeMenu' : ''}
                onClick={(e) => changeView(e, item.key)}
              >
                {item.label}
              </WiniButton>
            </WiniListItemText>
          </WiniListItem>
        ))}
      </WiniList>
    ),
    [activeMenuKey, changeView],
  );

  const renderDepthGroupMenu = useCallback(
    (parentId, groups) => (
      <WiniList id={parentId} ui="dep_02">
        {groups.map((group) => {
          const depth2Id = `${parentId}-${group.id}`;
          const isDepth2Open =
            !!openDepth1?.[parentId] && !!openDepth2?.[parentId]?.[depth2Id];
          const isDepth2Active = group.items.some(
            (item) => item.key === activeMenuKey,
          );

          return (
            <WiniListItem key={depth2Id}>
              <WiniListItemText>
                <WiniButton
                  aria-expanded={isDepth2Open}
                  aria-controls={depth2Id}
                  onClick={() => handleDepth2Toggle(parentId, depth2Id)}
                  className={isDepth2Open || isDepth2Active ? 'activeMenu' : ''}
                >
                  {group.title}
                  <WiniIcon icon={isDepth2Open ? 'up' : 'down'} />
                </WiniButton>
                <WiniCollapse in={isDepth2Open} mountOnEnter unmountOnExit>
                  <WiniList id={depth2Id} ui="dep_03">
                    {group.items.map((item) => (
                      <WiniListItem key={item.key}>
                        <WiniButton
                          className={
                            activeMenuKey === item.key ? 'activeMenu' : ''
                          }
                          onClick={(e) => changeView(e, item.key)}
                        >
                          {item.label}
                        </WiniButton>
                      </WiniListItem>
                    ))}
                  </WiniList>
                </WiniCollapse>
              </WiniListItemText>
            </WiniListItem>
          );
        })}
      </WiniList>
    ),
    [activeMenuKey, changeView, handleDepth2Toggle, openDepth1, openDepth2],
  );

  const collapsibleMenuSections = [
    { id: 'menu-1', label: '스니펫', groups: snippetMenuGroups },
    { id: 'menu-2', label: '개별 컴포넌트', groups: compMenuGroups },
    { id: 'menu-3', label: '공통함수', items: commonFuncItems },
    { id: 'menu-4', label: '공통 레이아웃', items: commonLayoutItems },
  ];

  return (
    <Fragment>
      <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
        <WiniGridItem
          ratio={1}
          className="border-r border-r-[#ddd] h-[100vh] fixed z-10 w-[280px] flex flex-col bg-white"
        >
          <WiniBox className="logo py-[20px] border-b border-b-[#ddd]">
            <img
              src={logo}
              style={{ width: 153, margin: '0 auto' }}
              alt="Winitech Logo"
            />
          </WiniBox>

          <WiniBox className="text-center text-sm flex items-center justify-center gap-1 py-3 border-b border-b-[#ddd] mt-0">
            <WiniIcon icon="user" sx={{ width: 20, height: 20 }} />
            <WiniTypography className="text-[#666]" variant="span">
              <WiniTypography
                className="text-[17px] text-[#333] font-semibold"
                variant="span"
              >
                {userName}
              </WiniTypography>{' '}
              님 환영합니다.
            </WiniTypography>
          </WiniBox>

          <WiniBox className="text-center py-1 mt-0 border-b border-b-[#ddd]">
            <WiniIconButton
              ui="transparent"
              icon="logout"
              className="text-sm text-[#666] font-semibold"
            >
              로그아웃
            </WiniIconButton>
          </WiniBox>

          <WiniList className="h-full overflow-y-auto py-6 px-1">
            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={
                    activeMenuKey === 'allAtomsWork' ? 'activeMenu' : ''
                  }
                  onClick={(e) => changeView(e, 'allAtomsWork')}
                >
                  allAtomsWork
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={activeMenuKey === 'GuideInput' ? 'activeMenu' : ''}
                  onClick={(e) => changeView(e, 'GuideInput')}
                >
                  guideInput
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={
                    activeMenuKey === 'GuideLayout' ? 'activeMenu' : ''
                  }
                  onClick={(e) => changeView(e, 'GuideLayout')}
                >
                  guideLayout
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={
                    activeMenuKey === 'GuideSelect' ? 'activeMenu' : ''
                  }
                  onClick={(e) => changeView(e, 'GuideSelect')}
                >
                  guideSelect
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={
                    activeMenuKey === 'GuideDatePicker' ? 'activeMenu' : ''
                  }
                  onClick={(e) => changeView(e, 'GuideDatePicker')}
                >
                  guideDatePicker
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={activeMenuKey === 'notice' ? 'activeMenu' : ''}
                  onClick={(e) => changeView(e, 'notice')}
                >
                  공지사항 예시
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={activeMenuKey === 'MenuAdd' ? 'activeMenu' : ''}
                  onClick={(e) => changeView(e, 'MenuAdd')}
                >
                  메뉴등록 예시
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={activeMenuKey === 'UserManage' ? 'activeMenu' : ''}
                  onClick={(e) => changeView(e, 'UserManage')}
                >
                  사용자관리 예시
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            <WiniListItem>
              <WiniListItemText>
                <WiniButton
                  className={
                    activeMenuKey === 'UserPermission' ? 'activeMenu' : ''
                  }
                  onClick={(e) => changeView(e, 'UserPermission')}
                >
                  메뉴접근권한 예시
                </WiniButton>
              </WiniListItemText>
            </WiniListItem>

            {collapsibleMenuSections.map((section) => {
              const isDepth1Open = !!openDepth1?.[section.id];

              return (
                <WiniListItem key={section.id}>
                  <WiniListItemText>
                    <WiniButton
                      aria-expanded={isDepth1Open}
                      aria-controls={section.id}
                      onClick={() => handleDepth1Toggle(section.id)}
                      className="depth1"
                    >
                      {section.label}
                      <WiniIcon icon={isDepth1Open ? 'up' : 'down'} />
                    </WiniButton>
                    <WiniCollapse in={isDepth1Open} mountOnEnter unmountOnExit>
                      {section.items
                        ? renderDepthItemMenu(section.id, section.items)
                        : renderDepthGroupMenu(section.id, section.groups)}
                    </WiniCollapse>
                  </WiniListItemText>
                </WiniListItem>
              );
            })}
          </WiniList>
        </WiniGridItem>

        <WiniGridItem ratio={5} className="pl-[280px]">
          <WiniBox className="px-6 pb-6">{view}</WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    </Fragment>
  );
}
