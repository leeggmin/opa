import { useState } from 'react';
import { WiniGridLayout, WiniBox, WiniBreadcrumbs, WiniCard, WiniDivider, WiniSnackbar, WiniTypography, WiniFormControl, WiniSelect, WiniMenuItem, WiniListSubheader, WiniGridItem } from '@/shared/ui/wini';

import { AddIcon, NavigateNextIcon } from '@/shared/lib';

export default function GuideSelect() {

	return (
		 <WiniBox ui="form">

			<WiniBox>
				<WiniTypography variant='h2'>select 상단 label 구성</WiniTypography>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="default"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ 
								shrink: true /* ,sx:{background:'green'}*/
							}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="readonly"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ 
								readOnly: true,
								shrink: true /* ,sx:{background:'green'}*/
							}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							disabled
							label="disabled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='default'
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>

				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="small"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="medium"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='medium'
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
						>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="large"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='large'
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>

				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="standard"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							variant="standard"
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>

						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="filled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							variant="filled"
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>

						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
			</WiniBox>

			<WiniBox>
				<WiniTypography variant='h2'>select 좌측 label 구성</WiniTypography>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="default"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="readonly"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ 
								readOnly: true,
								shrink: true /* ,sx:{background:'green'}*/
							}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							disabled
							ui="row"
							label="disabled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>

				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="small"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="medium"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='medium'
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
								ui="row"
								label="large"
								//name='state'
								//value={chkCombo.state}
								// sx={{ width: 300 }}
								inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
								defaultValue={"0"}
								size='large'
								sx={{}}
								className=''
								labClassName=''
								inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="standard"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							variant='standard'
							//onChange={}
							>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="row"
							label="filled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							variant='filled'
							//onChange={}
							>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
			</WiniBox>
            
			<WiniBox>
				<WiniTypography variant='h2'>select 내부 label 구성</WiniTypography>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="default"
							//name='state'
							//value={chkCombo.state}
							//onChange={}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="readonly"
							//name='state'
							//value={chkCombo.state}
							inputProps={{ 
								readOnly: true,
							}}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							disabled
							label="disabled"
							//name='state'
							//value={chkCombo.state}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>

				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="small"
							//name='state'
							//value={chkCombo.state}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						//onChange={}
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="medium"
							//name='state'
							//value={chkCombo.state}
							size='medium'
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						//onChange={}
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="large"
							//name='state'
							//value={chkCombo.state}
							size='large'
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
						//onChange={}
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							label="standard"
							//name='state'
							//value={chkCombo.state}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							variant='standard'
						//onChange={}
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							label="filled"
							//name='state'
							//value={chkCombo.state}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							variant='filled'
						//onChange={}
						>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
			</WiniBox>

			<WiniBox>
				<WiniTypography variant='h2'>select 상단(2) label 구성</WiniTypography>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="default"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="readonly"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ 
								shrink: true, readOnly: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							disabled
							ui="column"
							label="disabled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							//onChange={}
							>
							<WiniListSubheader>Category 1</WiniListSubheader>
							<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
							<WiniListSubheader>Category 2</WiniListSubheader>
							<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
							<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
							<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>

				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="small"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="medium"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='medium'
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="large"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							size='large'
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
				<WiniGridLayout
					container
					columnSpacing={1}
					rowSpacing={3}
				>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="standard"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							variant='standard'
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							label="filled"
							//name='state'
							//value={chkCombo.state}
							// sx={{ width: 300 }}
							inputProps={{ shrink: true /* ,sx:{background:'green'}*/}}
							defaultValue={"0"}
							sx={{}}
							className=''
							labClassName=''
							inputClassName=''
							variant='filled'
							//onChange={}
							>
								<WiniListSubheader>Category 1</WiniListSubheader>
								<WiniMenuItem value={'0'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'1'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'2'}>{"Item3"}</WiniMenuItem>
								<WiniListSubheader>Category 2</WiniListSubheader>
								<WiniMenuItem value={'3'}>{"Item1"}</WiniMenuItem>
								<WiniMenuItem value={'4'}>{"Item2"}</WiniMenuItem>
								<WiniMenuItem value={'5'}>{"Item3"}</WiniMenuItem>
						</WiniSelect>
					</WiniGridItem>
				</WiniGridLayout>
			</WiniBox>
			
		</WiniBox>
					
	)
}
