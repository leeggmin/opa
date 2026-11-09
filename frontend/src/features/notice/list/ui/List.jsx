import * as React from 'react';
import { WiniFormCommon } from '@/shared/ui/blocks/form-layout';
import {
	WiniGridLayout,
	WiniBox,
	WiniText,
	WiniAgGridReact,
	WiniPagination,
	WiniButton,
} from '@/shared/ui/wini';
import { winiDate } from '@/shared/lib';

export const NoticeList = (props) => {
	return (
		<WiniBox>
			<WiniBox ui="search">
				<WiniText
					ui="column"
					label="제목"
					variant="outlined"
					slotProps={{ inputLabel: { shrink: true } }}
					name="title"
					value={props.searchData.title}
					onKeyUp={props.onEnter}
					onChange={props.onSearchChange}
				/>

				<WiniText
					ui="column"
					label="내용"
					variant="outlined"
					slotProps={{ inputLabel: { shrink: true } }}
					name="content"
					value={props.searchData.content}
					onKeyUp={props.onEnter}
					onChange={props.onSearchChange}
				/>

				<WiniText
					ui="column"
					label="작성자"
					variant="outlined"
					slotProps={{ inputLabel: { shrink: true } }}
					name="author"
					value={props.searchData.author}
					onKeyUp={props.onEnter}
					onChange={props.onSearchChange}
				/>
				<WiniButton
					ui="default"
					onClick={props.onSearch}
				>
					조회
				</WiniButton>
			</WiniBox>

			<WiniGridLayout
				size={{ lg: 12, md: 12, xs: 12 }}
			>
				<WiniGridLayout container className="h-[403px]">
					<WiniAgGridReact
						rowData={props.rows}
						onCellClicked={(e) => props.onOpenDetail(e.data)}
						columnDefs={[
							{
								field: 'no',
								headerName: 'No',
								flex: 1,
								cellStyle: { textAlign: 'center' },
							},
							{
								field: 'title',
								headerName: '제목',
								flex: 6,
								cellStyle: { textAlign: 'center' },
							},
							{
								field: 'fileList',
								headerName: '첨부',
								flex: 1,
								cellStyle: { textAlign: 'center' },
								valueGetter: (params) =>
								(params.data?.fileList?.length || 0) > 0 ? 'Y' : '',
							},
							{
								field: 'creatorName',
								headerName: '작성자',
								flex: 2,
								cellStyle: { textAlign: 'center' },
							},
							{
								field: 'createAt',
								headerName: '등록일',
								flex: 3,
								cellStyle: { textAlign: 'center' },
								valueGetter: (params) =>
								(params.data?.createAt ? winiDate.dateFormat(winiDate(params.data?.createAt), 'YYYY-MM-DD HH:mm:ss') : ''),
							},
							{
								field: 'viewCount',
								headerName: '조회수',
								flex: 1,
								cellStyle: { textAlign: 'center' },
							},
						]}
					/>
				</WiniGridLayout>

				<WiniBox
				className="m-[1%] flex justify-center items-center"
				>
					<WiniPagination
						count={props.totalPage}
						page={props.page}
						size="small"
						onChange={props.onChangePage}
					/>
				</WiniBox>
			</WiniGridLayout>
		</WiniBox>
	);
};
