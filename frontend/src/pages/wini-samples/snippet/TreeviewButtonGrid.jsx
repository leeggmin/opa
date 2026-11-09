import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  WiniAgGridReact,
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridItem,
  WiniGridLayout,
  WiniIconButton,
  WiniTreeItem,
  WiniTreeView,
  WiniTypography,
} from '@/shared/ui/wini';

import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

import { cn } from '@/shared/lib/cn';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import { transform } from 'ol/proj';

const seedRows = Array.from({ length: 30 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `TreeviewButtonGrid 샘플 ${num}`,
    category: num % 3 === 0 ? '공통' : num % 3 === 1 ? '관리' : '통계',
    status: num % 4 === 0 ? '미사용' : '사용',
  };
});

const treeData = [
  {
    id: 'root',
    groupName: '프로그램',
    children: [
      { id: 'cat-all', groupName: '전체', category: 'all' },
      { id: 'cat-common', groupName: '공통', category: '공통' },
      { id: 'cat-manage', groupName: '관리', category: '관리' },
      { id: 'cat-stat', groupName: '통계', category: '통계' },
    ],
  },
];

export default function TreeviewButtonGrid() {
  const treeRef = useRef(null);

  const [copyState, setCopyState] = useState({
    leftRight: 'copy',
    topBottom: 'copy',
  });
  const copyTimerRefs = useRef({ leftRight: null, topBottom: null });

  useEffect(() => {
    return () => {
      Object.values(copyTimerRefs.current).forEach((timerId) => {
        if (timerId) clearTimeout(timerId);
      });
    };
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: 'no',
        headerName: 'No',
        width: 80,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'programCode',
        headerName: '코드',
        width: 160,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'programName',
        headerName: '프로그램 명',
        flex: 1,
        minWidth: 240,
        sortable: false,
      },
      {
        field: 'category',
        headerName: '구분',
        width: 120,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
      {
        field: 'status',
        headerName: '사용여부',
        width: 120,
        cellStyle: { textAlign: 'center' },
        sortable: false,
      },
    ],
    [],
  );

  // 1) 좌우버튼 + 그리드
  const [lrSelectedCategory, setLrSelectedCategory] = useState('all');
  const [lrSelectedNodeName, setLrSelectedNodeName] = useState('전체');
  const [lrAssignedRows, setLrAssignedRows] = useState([]);

  const lrAvailableRows = useMemo(() => {
    if (lrSelectedCategory === 'all') return seedRows;
    return seedRows.filter((row) => row.category === lrSelectedCategory);
  }, [lrSelectedCategory]);

  const onSelectLeftRight = useCallback((_event, node) => {
    const nextCategory = node?.category;
    if (!nextCategory) return;

    setLrSelectedCategory(String(nextCategory));
    setLrSelectedNodeName(String(node?.groupName ?? ''));
  }, []);

  const handleMoveRight = () => {
    const nextToAdd = lrAvailableRows.filter(
      (row) => !lrAssignedRows.some((r) => r.programCode === row.programCode),
    );

    if (nextToAdd.length === 0) {
      window?.pubUI?.toast?.({
        text: '추가할 데이터가 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setLrAssignedRows((prev) => [...nextToAdd, ...prev]);
    window?.pubUI?.toast?.({
      text: `추가: ${lrSelectedNodeName} (${nextToAdd.length}건)`,
      time: 1200,
      type: 'success',
    });
  };

  const handleMoveLeft = () => {
    const beforeCount = lrAssignedRows.length;

    const nextRows =
      lrSelectedCategory === 'all'
        ? []
        : lrAssignedRows.filter((row) => row.category !== lrSelectedCategory);

    const removedCount = beforeCount - nextRows.length;

    if (removedCount <= 0) {
      window?.pubUI?.toast?.({
        text: '제거할 데이터가 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setLrAssignedRows(nextRows);
    window?.pubUI?.toast?.({
      text:
        lrSelectedCategory === 'all'
          ? '전체 제거'
          : `제거: ${lrSelectedNodeName} (${removedCount}건)`,
      time: 1200,
      type: 'success',
    });
  };

  const codeLeftRight = `
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem ratio={1}>
    <WiniTreeView
    winiData={treeData}
    openByDefault
    onSelect={onSelectLeftRight}
    ref={treeRef}
    height={520}
    paddingTop={10}
    >
    {(props) => <WiniTreeItem {...props} name={'groupName'} />}
    </WiniTreeView>
  </WiniGridItem>

  <WiniGridItem ratio={'none'}>
    <WiniBox className="h-full flex flex-col justify-center gap-2">
      <WiniIconButton
        ui="line"
        icon="arrowRight"
        iconOnly
        onClick={handleMoveRight}
        iconSx={{
            width: size.icon.sm,
            height: size.icon.sm,
            fontSize: size.icon.sm,
        }}
        className='w-6 h-24'
      >
        추가
      </WiniIconButton>
      <WiniIconButton
        ui="line"
        icon="arrowLeft"
        iconOnly
        onClick={handleMoveLeft}
        iconSx={{
            width: size.icon.sm,
            height: size.icon.sm,
        }}
        className='w-6 h-24'
      >
        제거
      </WiniIconButton>
    </WiniBox>
  </WiniGridItem>

  <WiniGridItem ratio={2}>
    <WiniBox className="h-full">
      <WiniAgGridReact
        rowData={lrAssignedRows}
        columnDefs={columnDefs}
        pagination
        paginationUi="number"
        paginationPageSize={10}
      />
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>
`;

  // 2) 상하버튼 + 그리드 (순서 변경)
  const [tbSelectedCategory, setTbSelectedCategory] = useState('all');
  const [tbSelectedNodeName, setTbSelectedNodeName] = useState('전체');

  const tbBaseRows = useMemo(() => {
    if (tbSelectedCategory === 'all') return seedRows.slice(0, 12);
    return seedRows.filter((row) => row.category === tbSelectedCategory);
  }, [tbSelectedCategory]);

  const [tbRowData, setTbRowData] = useState(tbBaseRows);
  const [tbSelectedCode, setTbSelectedCode] = useState('');

  useEffect(() => {
    setTbRowData(tbBaseRows);
    setTbSelectedCode('');
  }, [tbBaseRows]);

  const onSelectTopBottom = useCallback((_event, node) => {
    const nextCategory = node?.category;
    if (!nextCategory) return;

    setTbSelectedCategory(String(nextCategory));
    setTbSelectedNodeName(String(node?.groupName ?? ''));
  }, []);

  const handleMoveUp = () => {
    const index = tbRowData.findIndex((r) => r.programCode === tbSelectedCode);
    if (index <= 0) {
      window?.pubUI?.toast?.({
        text: '위로 이동할 항목이 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setTbRowData((prev) => {
      const next = [...prev];
      const tmp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = tmp;
      return next;
    });
  };

  const handleMoveDown = () => {
    const index = tbRowData.findIndex((r) => r.programCode === tbSelectedCode);
    if (index < 0 || index >= tbRowData.length - 1) {
      window?.pubUI?.toast?.({
        text: '아래로 이동할 항목이 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setTbRowData((prev) => {
      const next = [...prev];
      const tmp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = tmp;
      return next;
    });
  };

  const codeTopBottom = `
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem size={{ xs: 12 }}>
    <WiniTreeView
      winiData={treeData}
      openByDefault
      onSelect={onSelectTopBottom}
      height={520}
      paddingTop={10}
    >
    {(props) => <WiniTreeItem {...props} name={'groupName'} />}
    </WiniTreeView>
  </WiniGridItem>

  <WiniGridItem size={{ xs: 12 }}>
    <WiniBox className="flex items-center justify-center gap-2">
      <WiniIconButton
        ui="line"
        icon="arrowRight"
        iconOnly
        onClick={handleMoveUp}
        iconSx={{
          width: size.icon.sm,
          height: size.icon.sm,
          transform: 'rotate(90deg)',
        }}
        className='w-24 h-6'
      >
        위로
      </WiniIconButton>
      <WiniIconButton
        ui="line"
        icon="arrowLeft"
        iconOnly
        onClick={handleMoveDown}
        iconSx={{
          width: size.icon.sm,
          height: size.icon.sm,
          transform: 'rotate(90deg)',
        }}
        className='w-24 h-6'
      >
        아래로
      </WiniIconButton>
    </WiniBox>
  </WiniGridItem>

  <WiniGridItem size={{ xs: 12 }}>
    <WiniBox className="h-full">
      <WiniAgGridReact
        rowData={tbRowData}
        columnDefs={columnDefs}
        rowSelection="single"
        onRowClicked={(event) => {
        setTbSelectedCode(String(event?.data?.programCode ?? ''));
        }}
      />
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>`;

  const handleCopy = async (key) => {
    const code = key === 'leftRight' ? codeLeftRight : codeTopBottom;

    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });

      if (copyTimerRefs.current[key]) clearTimeout(copyTimerRefs.current[key]);
      copyTimerRefs.current[key] = setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);
    } catch (error) {
      console.error('복사 실패:', error);
      window?.pubUI?.toast?.({
        text: '복사에 실패했습니다.',
        time: 2000,
        type: 'error',
      });
    }
  };

  return (
    <WiniFormEmpty>
      <WiniGridLayout className="pt-8" rowSpacing={2}>
        <WiniTypography variant="h1">TreeviewButtonGrid</WiniTypography>
        <WiniTypography variant="h2">트리뷰 + 버튼 + 그리드</WiniTypography>


        <WiniBox>
            <WiniTypography variant="h3">1) 좌우버튼 + 그리드</WiniTypography>
            <WiniBox ui="info">
                <WiniTypography variant="span" className="text-md">
                    트리뷰와 그리드 사이에 좌우 액션 버튼을 배치하는 패턴입니다.
                    <br />
                </WiniTypography>
              </WiniBox>

              <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem ratio={1}>
                    <WiniTreeView
                    winiData={treeData}
                    openByDefault
                    onSelect={onSelectLeftRight}
                    ref={treeRef}
                    height={520}
                    paddingTop={10}
                    >
                    {(props) => <WiniTreeItem {...props} name={'groupName'} />}
                    </WiniTreeView>
                </WiniGridItem>

                <WiniGridItem ratio={'none'}>
                    <WiniBox className="h-full flex flex-col justify-center gap-2">
                    <WiniIconButton
                        ui="line"
                        icon="arrowRight"
                        iconOnly
                        onClick={handleMoveRight}
                        iconSx={{
                            width: size.icon.sm,
                            height: size.icon.sm,
                            fontSize: size.icon.sm,
                        }}
                        className='w-6 h-24'
                    >
                        추가
                    </WiniIconButton>
                    <WiniIconButton
                        ui="line"
                        icon="arrowLeft"
                        iconOnly
                        onClick={handleMoveLeft}
                        iconSx={{
                            width: size.icon.sm,
                            height: size.icon.sm,
                        }}
                        className='w-6 h-24'
                    >
                        제거
                    </WiniIconButton>
                    </WiniBox>
                </WiniGridItem>

                <WiniGridItem ratio={2}>
                    <WiniBox className="h-full">
                    <WiniAgGridReact
                        rowData={lrAssignedRows}
                        columnDefs={columnDefs}
                        pagination
                        paginationUi="number"
                        paginationPageSize={10}
                    />
                    </WiniBox>
                </WiniGridItem>
              </WiniGridLayout>

              <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
                <WiniBox className="flex items-center justify-between">
                    <WiniTypography variant="span" className="text-white text-lg">
                      코드 예시
                    </WiniTypography>
                    <WiniBox ui="btnbox">
                      <WiniButton
                          ui="gray"
                          onClick={() => handleCopy('leftRight')}
                          className="transition-all duration-300"
                      >
                          {copyState.leftRight === 'copy' ? '복사하기' : '복사 완료'}
                      </WiniButton>
                    </WiniBox>
                </WiniBox>
              <WiniCode code={codeLeftRight} language="jsx" />
          </WiniBox>

        </WiniBox>

        <WiniBox>
            <WiniTypography variant="h3">2) 상하버튼 + 그리드</WiniTypography>
            <WiniBox ui="info">
                <WiniTypography variant="span" className="text-md">
                    트리뷰와 그리드 사이에 상/하 버튼을 두고, 선택된 행을 위/아래로 이동시키는 패턴입니다.
                </WiniTypography>
            </WiniBox>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem size={{ xs: 12 }}>
                    <WiniTreeView
                    winiData={treeData}
                    openByDefault
                    onSelect={onSelectTopBottom}
                    height={520}
                    paddingTop={10}
                    >
                    {(props) => <WiniTreeItem {...props} name={'groupName'} />}
                    </WiniTreeView>
                </WiniGridItem>

                <WiniGridItem size={{ xs: 12 }}>
                    <WiniBox className="flex items-center justify-center gap-2">
                        <WiniIconButton
                            ui="line"
                            icon="arrowRight"
                            iconOnly
                            onClick={handleMoveUp}
                            iconSx={{
                                width: size.icon.sm,
                                height: size.icon.sm,
                                transform: 'rotate(90deg)',
                            }}
                            className='w-24 h-6'
                        >
                            위로
                        </WiniIconButton>
                        <WiniIconButton
                            ui="line"
                            icon="arrowLeft"
                            iconOnly
                            onClick={handleMoveDown}
                            iconSx={{
                                width: size.icon.sm,
                                height: size.icon.sm,
                                transform: 'rotate(90deg)',
                            }}
                            className='w-24 h-6'
                        >
                            아래로
                        </WiniIconButton>
                    </WiniBox>
                </WiniGridItem>

                <WiniGridItem size={{ xs: 12 }}>
                    <WiniBox className="h-full">
                    <WiniAgGridReact
                        rowData={tbRowData}
                        columnDefs={columnDefs}
                        rowSelection="single"
                        onRowClicked={(event) => {
                        setTbSelectedCode(String(event?.data?.programCode ?? ''));
                        }}
                    />
                    </WiniBox>
                </WiniGridItem>
            </WiniGridLayout>

            <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
                <WiniBox className="flex items-center justify-between">
                    <WiniTypography variant="span" className="text-white text-lg">
                    코드 예시
                    </WiniTypography>
                    <WiniBox ui="btnbox">
                        <WiniButton
                            ui="gray"
                            onClick={() => handleCopy('topBottom')}
                            className="transition-all duration-300"
                        >
                            {copyState.topBottom === 'copy' ? '복사하기' : '복사 완료'}
                        </WiniButton>
                    </WiniBox>
                </WiniBox>
                <WiniCode code={codeTopBottom} language="jsx" />
            </WiniBox>                
        </WiniBox>
        
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
