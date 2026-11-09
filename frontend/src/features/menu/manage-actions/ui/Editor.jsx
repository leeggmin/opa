import { forwardRef } from 'react';
import {
	WiniBox,
	WiniSelect,
	WiniMenuItem,
	WiniText,
	WiniTypography,
	WiniInputAdornment,
	WiniGridLayout,
	WiniGridItem,
	WiniList,
	WiniListItem,
	WiniListItemIcon,
	WiniListItemText,
	WiniListSubheader

} from '@/shared/ui/wini';
import { actionTypeEnums, authTypeEnums } from '../model/consts';
import { Buttons } from './Buttons';

/**
 * 액션 편집 폼
 */
export const Editor = forwardRef(
	(
		{
		actionData,
		selectedProgramId,
		selectedProgramMapping,
		selectedActionId,
		actionAllList,
		onChange,
		onReset,
		onSave,
		onDelete,
		onLoadFromSource,
		},
		ref,
	) => {
		return (
		<WiniBox>
			<WiniBox ui="form" ref={ref}>
				<WiniGridLayout container ui="form" rowSpacing={1} columnSpacing={1}>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							required
							label={'액션 유형'}
							name={'actionType'}
							value={actionData.actionType}
							onChange={onChange}
						>
							{Object.keys(actionTypeEnums).map((item, idx) => (
							<WiniMenuItem key={idx} value={item}>
								{item}
							</WiniMenuItem>
							))}
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem>
						<WiniSelect
							ui="column"
							required
							label={'권한 유형'}
							name={'authType'}
							value={actionData.authType}
							onChange={onChange}
						>
							{Object.keys(authTypeEnums).map((item, idx) => (
							<WiniMenuItem key={idx} value={item}>
								{item}
							</WiniMenuItem>
							))}
						</WiniSelect>
					</WiniGridItem>
					<WiniGridItem xs={12}>
						<WiniText
							ui="column"
							required
							value={actionData.uri}
							name={'uri'}
							label={'URI'}
							slotProps={{
							input: {
								startAdornment: actionData.actionType === 'RESTAPI' && (
								<WiniInputAdornment position="start">
									<WiniTypography className="text-[1.2rem] text-gray-500">
									api/v1/
									</WiniTypography>
								</WiniInputAdornment>
								),
							},
							}}
							onChange={onChange}
						/>
					</WiniGridItem>
				</WiniGridLayout>
				<Buttons
					selectedProgramId={selectedProgramId}
					selectedProgramMapping={selectedProgramMapping}
					selectedActionId={selectedActionId}
					actionAllList={actionAllList}
					onReset={onReset}
					onSave={onSave}
					onDelete={onDelete}
					onLoadFromSource={onLoadFromSource}
				/>
			</WiniBox>

			<WiniBox>
				<WiniList listType="text" ui="dep_02" className="pl-0">
					<WiniListSubheader ui="dep_02">URI 작성법</WiniListSubheader>
					<WiniBox ui="line">
						<WiniListItem ui="dot">
							<WiniListItemText >
							api/v1/은 자동입력이므로 생략하면됩니다.
							</WiniListItemText>
						</WiniListItem>
						<WiniListItem ui="dot">
							<WiniListItemIcon></WiniListItemIcon>
							<WiniListItemText>
							URI에 파라메터가 있는경우 파라메터 자리는{' '}  <span className='text-brand-point'>*</span> 로 표시합니다. 이 외 다른 특수문자는 파라메터로 인식하지 않습니다. ex) system/user/*
							</WiniListItemText>
						</WiniListItem>
						<WiniListItem ui="dot">
							<WiniListItemIcon></WiniListItemIcon>
							<WiniListItemText>
							api폴더에 있는 js 파일만 참고해서 자동 등록됩니다. 다른 폴더에 있는 js 파일은 참고하지 않습니다.
							</WiniListItemText>
						</WiniListItem>
						<WiniListItem ui="dot">
							<WiniListItemIcon></WiniListItemIcon>
							<WiniListItemText>
							조건부 암호화(requestWithEncryption)는 옵션 객체에 method와 url을 바르게 작성한 경우 등록됩니다.
							</WiniListItemText>
						</WiniListItem>
					</WiniBox>
				</WiniList>
			</WiniBox>

			<WiniBox className="mt-2">
				<WiniList listType="text" ui="dep_02" className="pl-0">
					<WiniBox ui="line">
						<WiniListItem>
							<WiniListItemText>
							※ 소스의 URL 형식{' '} <br />
							가능한 `${'{'}'변수명'{'}'}` 형태의 문자열 보간 기능을 사용하고, URL 구문 내에서 <span className='text-brand-point'>함수 사용은 비추천</span>합니다. <br />
							ex) 추천 형태 : await connector.client.get(`/api/v1/system/user/${'{'}'id' {'}'}`) <br />
							비 추천 형태 : await connector.client.get('/api/v1/system/user/' + user.getId()) <span className="text-text-light">- URL 구문 내에서 함수호출</span> <br />
							비 추천 형태 : await connector.client.get(`/api/v1/system/user/${'{'}'
							user.getId(){'}'}`) <span className="text-text-light">- URL 구문 내에서 함수호출</span>
							</WiniListItemText>
						</WiniListItem>
					</WiniBox>
				</WiniList>
			</WiniBox>
		</WiniBox>
		);
	},
);
