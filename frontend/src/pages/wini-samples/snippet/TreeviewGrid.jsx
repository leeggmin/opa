
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
	WiniAgGridReact,
	WiniBox,
	WiniButton,
	WiniCode,
	WiniGridItem,
	WiniGridLayout,
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
		programName: `TreeviewGrid 샘플 ${num}`,
		category: num % 3 === 0 ? '공통' : num % 3 === 1 ? '관리' : '통계',
		status: num % 4 === 0 ? '미사용' : '사용',
		owner: num % 2 === 0 ? '홍길동' : '김담당',
		createdAt: new Date(Date.now() - num * 24 * 60 * 60 * 1000),
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

export default function TreeviewGrid() {
	const treeRef = useRef(null);

	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedNodeName, setSelectedNodeName] = useState('전체');

	const filteredRows = useMemo(() => {
		if (selectedCategory === 'all') return seedRows;
		return seedRows.filter((row) => row.category === selectedCategory);
	}, [selectedCategory]);

	const [rowData, setRowData] = useState(filteredRows);

	useEffect(() => {
		setRowData(filteredRows);
	}, [filteredRows]);

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
				headerName: '프로그램 코드',
				width: 160,
				cellStyle: { textAlign: 'center' },
				sortable: false,
			},
			{
				field: 'programName',
				headerName: '프로그램 명',
				flex: 1,
				minWidth: 220,
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
				field: 'owner',
				headerName: '담당자',
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
			{
				field: 'createdAt',
				headerName: '등록일',
				width: 140,
				cellStyle: { textAlign: 'center' },
				valueFormatter: (params) => {
					const v = params.value;
					if (!v) return '';
					const d = v instanceof Date ? v : new Date(v);
					if (Number.isNaN(d.getTime())) return '';
					const yyyy = d.getFullYear();
					const mm = String(d.getMonth() + 1).padStart(2, '0');
					const dd = String(d.getDate()).padStart(2, '0');
					return `${yyyy}-${mm}-${dd}`;
				},
				sortable: false,
			},
		],
		[],
	);

	const onSelect = useCallback((_event, node) => {
		const nextCategory = node?.category;
		if (!nextCategory) return;

		setSelectedCategory(String(nextCategory));
		setSelectedNodeName(String(node?.groupName ?? ''));

		window?.pubUI?.toast?.({
			text: `선택: ${node?.groupName ?? ''}`,
			time: 1000,
			type: 'success',
		});
	}, []);

	const codeToCopy = `
<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
	<WiniGridItem ratio={1}>
		<WiniTreeView
			winiData={treeData}
			openByDefault={true}
			onSelect={onSelect}
			ref={treeRef}
			height={520}
			paddingTop={10}
		>
			{(props) => <WiniTreeItem {...props} name={'groupName'} />}
		</WiniTreeView>
	</WiniGridItem>

	<WiniGridItem ratio={2}>
		<WiniBox className="h-full">
			<WiniAgGridReact 
				rowData={rowData} 
				columnDefs={columnDefs} 
				rowSelection="multiple"
				pagination
				paginationUi="number"
				paginationPageSize={10}
			/>
		</WiniBox>
	</WiniGridItem>
</WiniGridLayout>`;

	const [copyState, setCopyState] = useState('copy');
	const copyTimerRef = useRef(null);

	useEffect(() => {
		return () => {
			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
		};
	}, []);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(codeToCopy);
			setCopyState('complete');

			window?.pubUI?.toast?.({
				text: '복사가 완료되었습니다.',
				time: 2000,
				type: 'success',
			});

			if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
			copyTimerRef.current = setTimeout(() => {
				setCopyState('copy');
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
				<WiniTypography variant="h1">TreeviewGrid</WiniTypography>
				<WiniTypography variant="h2">트리뷰 + 그리드</WiniTypography>

				<WiniBox ui="info">
					<WiniTypography variant="span" className="text-md">
						좌측 트리에서 항목을 선택하면, 우측 그리드가 선택 조건에 맞게 갱신되는 패턴입니다.
						<br />
						선택된 카테고리: <b>{selectedNodeName}</b> (총 {rowData.length}건)
					</WiniTypography>
				</WiniBox>

				<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
					<WiniGridItem ratio={1}>
						<WiniTreeView
							winiData={treeData}
							openByDefault={true}
							onSelect={onSelect}
							ref={treeRef}
							height={520}
							paddingTop={10}
						>
							{(props) => <WiniTreeItem {...props} name={'groupName'} />}
						</WiniTreeView>
					</WiniGridItem>

					<WiniGridItem ratio={2}>
						<WiniBox className="h-full">
							<WiniAgGridReact 
                                rowData={rowData} 
                                columnDefs={columnDefs} 
                                rowSelection="multiple"
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
								onClick={handleCopy}
								className="transition-all duration-300"
							>
								{copyState === 'copy' ? '복사하기' : '복사 완료'}
							</WiniButton>
						</WiniBox>
					</WiniBox>
					<WiniCode code={codeToCopy} language="jsx" />
				</WiniBox>
			</WiniGridLayout>
		</WiniFormEmpty>
	);
}

