import { useEffect, useRef, useState } from 'react';

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

const seedRows = Array.from({ length: 30 }, (_, index) => {
  const num = index + 1;
  return {
    no: num,
    programCode: `PRG-${String(num).padStart(3, '0')}`,
    programName: `샘플 ${num}`,
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

export default function SnippetGridLayout() {
  const [copyState, setCopyState] = useState({
    leftRightImport: 'copy',
    leftRight: 'copy',
    topBottom: 'copy',
    threeSplit: 'copy',
  });

  const copyTimerRefs = useRef({
    leftRight: null,
    topBottom: null,
    threeSplit: null,
  });

  useEffect(() => {
    return () => {
      Object.values(copyTimerRefs.current).forEach((timerId) => {
        if (timerId) clearTimeout(timerId);
      });
    };
  }, []);

  const columnDefs = [
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
  ];

  // 좌우 분할 예시 1: TreeView + Grid
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNodeName, setSelectedNodeName] = useState('전체');

  const filteredRows =
    selectedCategory === 'all'
      ? seedRows
      : seedRows.filter((row) => row.category === selectedCategory);

  const [rowData, setRowData] = useState(filteredRows);

  useEffect(() => {
    setRowData(filteredRows);
  }, [selectedCategory]);

  const onSelectTreeviewGrid = (_event, node) => {
    const nextCategory = node?.category;
    if (!nextCategory) return;
    setSelectedCategory(String(nextCategory));
    setSelectedNodeName(String(node?.groupName ?? ''));
  };

const codeLeftRightImport = 
`import {
	WiniBox,
	WiniGridItem,
	WiniGridLayout,
	WiniTypography,
} from '@/shared/ui/wini';`;

const codeLeftRight = 
`<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
	<WiniGridItem>
		<WiniTypography variant="h3">좌측</WiniTypography>
		<WiniBox ui="line">
			ratio = 1 (기본값)
		</WiniBox>
	</WiniGridItem>
	<WiniGridItem>
		<WiniTypography variant="h3">우측</WiniTypography>
		<WiniBox ui="line">
			ratio = 1 (기본값)
		</WiniBox>
	</WiniGridItem>
	</WiniGridLayout>

	<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
	<WiniGridItem ratio={2}>
		<WiniTypography variant="h3">좌측</WiniTypography>
		<WiniBox ui="line">
			ratio = 2
		</WiniBox>
	</WiniGridItem>
	<WiniGridItem ratio={1}>
		<WiniTypography variant="h3">우측</WiniTypography>
		<WiniBox ui="line">
			ratio = 1
		</WiniBox>
	</WiniGridItem>
	</WiniGridLayout>

	<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
	<WiniGridItem ratio={0.5}>
		<WiniTypography variant="h3">좌측</WiniTypography>
		<WiniBox ui="line">
			ratio = 0.5
		</WiniBox>
	</WiniGridItem>
	<WiniGridItem ratio={1}>
		<WiniTypography variant="h3">우측</WiniTypography>
		<WiniBox ui="line">
			ratio = 1
		</WiniBox>
	</WiniGridItem>
</WiniGridLayout>`;

  // 좌우 분할 예시 2: TreeView + 좌우버튼 + Grid
  const [btnSelectedCategory, setBtnSelectedCategory] = useState('all');
  const [btnSelectedNodeName, setBtnSelectedNodeName] = useState('전체');
  const [btnAssignedRows, setBtnAssignedRows] = useState([]);

  const btnAvailableRows =
    btnSelectedCategory === 'all'
      ? seedRows
      : seedRows.filter((row) => row.category === btnSelectedCategory);

  const onSelectTreeviewButtonGrid = (_event, node) => {
    const nextCategory = node?.category;
    if (!nextCategory) return;
    setBtnSelectedCategory(String(nextCategory));
    setBtnSelectedNodeName(String(node?.groupName ?? ''));
  };

  const handleMoveRight = () => {
    const nextToAdd = btnAvailableRows.filter(
      (row) => !btnAssignedRows.some((r) => r.programCode === row.programCode),
    );

    if (nextToAdd.length === 0) {
      window?.pubUI?.toast?.({
        text: '추가할 데이터가 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setBtnAssignedRows((prev) => [...nextToAdd, ...prev]);
    window?.pubUI?.toast?.({
      text: `추가: ${btnSelectedNodeName} (${nextToAdd.length}건)`,
      time: 1200,
      type: 'success',
    });
  };

  const handleMoveLeft = () => {
    const beforeCount = btnAssignedRows.length;

    const nextRows =
      btnSelectedCategory === 'all'
        ? []
        : btnAssignedRows.filter((row) => row.category !== btnSelectedCategory);

    const removedCount = beforeCount - nextRows.length;

    if (removedCount <= 0) {
      window?.pubUI?.toast?.({
        text: '제거할 데이터가 없습니다.',
        time: 1200,
        type: 'info',
      });
      return;
    }

    setBtnAssignedRows(nextRows);
    window?.pubUI?.toast?.({
      text:
        btnSelectedCategory === 'all'
          ? '전체 제거'
          : `제거: ${btnSelectedNodeName} (${removedCount}건)`,
      time: 1200,
      type: 'success',
    });
  };

  const codeTopBottom = `
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem size={{ xs: 12 }}>
    <WiniTypography variant="h3">상단</WiniTypography>
    <WiniBox ui="line">
      size = 12 (전체 너비)
    </WiniBox>
  </WiniGridItem>
  <WiniGridItem size={{ xs: 12 }}>
    <WiniTypography variant="h3">하단</WiniTypography>
    <WiniBox ui="line">
      size = 12 (전체 너비)
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>`;

  const codeThreeSplit = `
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem>
    <WiniTypography variant="h3">좌측</WiniTypography>
    <WiniBox ui="line">
      ratio = 1 (기본값)
    </WiniBox>
  </WiniGridItem>
  <WiniGridItem>
    <WiniTypography variant="h3">중앙</WiniTypography>
    <WiniBox ui="line">
      ratio = 1 (기본값)
    </WiniBox>
  </WiniGridItem>
  <WiniGridItem>
    <WiniTypography variant="h3">우측</WiniTypography>
    <WiniBox ui="line">
      ratio = 1 (기본값)
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>

<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
  <WiniGridItem ratio={1}>
    <WiniTypography variant="h3">좌측</WiniTypography>
    <WiniBox ui="line">
      ratio = 1
    </WiniBox>
  </WiniGridItem>
  <WiniGridItem ratio={2}>
    <WiniTypography variant="h3">중앙</WiniTypography>
    <WiniBox ui="line">
      ratio = 2
    </WiniBox>
  </WiniGridItem>
  <WiniGridItem ratio={1}>
    <WiniTypography variant="h3">우측</WiniTypography>
    <WiniBox ui="line">
      ratio = 1
    </WiniBox>
  </WiniGridItem>
</WiniGridLayout>
`;


  const handleCopy = async (key) => {
    const codeByKey = {
      leftRightImport: codeLeftRightImport,
      leftRight: codeLeftRight,
      topBottom: codeTopBottom,
      threeSplit: codeThreeSplit,
    };

    const code = codeByKey[key];
    if (!code) return;

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
        <WiniTypography variant="h1">SnippetGridLayout</WiniTypography>
        <WiniTypography variant="h2">화면분할</WiniTypography>

        


        <WiniBox ui="line">
            <WiniTypography variant="h2">1) 좌우 분할</WiniTypography>
            <WiniBox ui="info">
                <WiniTypography variant="span" className="text-md">
                    좌측/우측을 비율(ratio)로 나누는 기본 레이아웃 패턴입니다. <br />
                    기본 1:1 비율 이며, ratio 속성으로 비율 조정이 가능합니다.
                </WiniTypography>
            </WiniBox>
            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem>
                    <WiniTypography variant="h3">좌측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1 (기본값)
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem>
                    <WiniTypography variant="h3">우측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1 (기본값)
                    </WiniBox>
                </WiniGridItem>
            </WiniGridLayout>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem ratio={2}>
                    <WiniTypography variant="h3">좌측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 2
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem ratio={1}>
                    <WiniTypography variant="h3">우측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1
                    </WiniBox>
                </WiniGridItem>
            </WiniGridLayout>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem ratio={0.5}>
                    <WiniTypography variant="h3">좌측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 0.5
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem ratio={1}>
                    <WiniTypography variant="h3">우측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1
                    </WiniBox>
                </WiniGridItem>
            </WiniGridLayout>

            <WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
                <WiniBox className="flex items-center justify-between">
                    <WiniTypography variant="span" className="text-white text-lg">
                    필수 연결파일
                    </WiniTypography>
                    <WiniBox ui="btnbox">
                        <WiniButton
                            ui="gray"
                            onClick={() => handleCopy('leftRightImport')}
                            className="transition-all duration-300"
                        >
                            {copyState.leftRightImport === 'copy' ? '복사하기' : '복사 완료'}
                        </WiniButton>
                    </WiniBox>
                </WiniBox>
                <WiniCode code={codeLeftRightImport} language="jsx" />
            </WiniBox>

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

        <WiniBox ui="line">
            <WiniTypography variant="h2">2) 상하 분할</WiniTypography>
            <WiniBox ui="info">
                <WiniTypography variant="span" className="text-md">
                    상단/하단을 나누는 기본 레이아웃 패턴입니다.
                </WiniTypography>
            </WiniBox>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem size={{ xs: 12 }}>
                    <WiniTypography variant="h3">상단</WiniTypography>
                    <WiniBox ui="line">
                      size = 12 (전체 너비)
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem size={{ xs: 12 }}>
                    <WiniTypography variant="h3">하단</WiniTypography>
                    <WiniBox ui="line">
                      size = 12 (전체 너비)
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

         <WiniBox ui="line">
            <WiniTypography variant="h2">3) 3분할</WiniTypography>
            <WiniBox ui="info">
                <WiniTypography variant="span" className="text-md">
                    3분할 레이아웃 (좌/중/우) 패턴입니다.
                </WiniTypography>
            </WiniBox>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem>
                    <WiniTypography variant="h3">좌측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1 (기본값)
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem>
                    <WiniTypography variant="h3">중앙</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1 (기본값)
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem>
                    <WiniTypography variant="h3">우측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1 (기본값)
                    </WiniBox>
                </WiniGridItem>
            </WiniGridLayout>

            <WiniGridLayout container columnSpacing={2} rowSpacing={2}>
                <WiniGridItem ratio={1}>
                    <WiniTypography variant="h3">좌측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem ratio={2}>
                    <WiniTypography variant="h3">중앙</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 2
                    </WiniBox>
                </WiniGridItem>
                <WiniGridItem ratio={1}>
                    <WiniTypography variant="h3">우측</WiniTypography>
                    <WiniBox ui="line">
                      ratio = 1
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
                          onClick={() => handleCopy('threeSplit')}
                            className="transition-all duration-300"
                        >
                          {copyState.threeSplit === 'copy' ? '복사하기' : '복사 완료'}
                        </WiniButton>
                    </WiniBox>
                </WiniBox>
                <WiniCode code={codeThreeSplit} language="jsx" />
            </WiniBox>
        </WiniBox>
      </WiniGridLayout>
    </WiniFormEmpty>
  );
}
