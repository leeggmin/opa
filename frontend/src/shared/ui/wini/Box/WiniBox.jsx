import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { cn } from '@/shared/lib/cn';
import {
	getUiTokens,
	hasUiToken,
	mergeUiSxByTokens,
} from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const UI_SX = {
	inner: {
		padding: `0 24px 32px 32px`,
		fontSize: size.text.sm,
		flex: '1 1 auto',
	},
	/* 정보 */
	info: {
		borderRadius: size.radius.xsm,
		border: `2px solid ${color.border.main}`,
		backgroundColor: color.background.mainLight,
		padding: `${size.margin.lg} ${size.margin.xl}`,
	},
	/* 입력폼 양식 */
	form: {
		borderRadius: size.radius.xsm,
		backgroundColor: color.background.offwhite,
		padding: `${size.margin.xl}`,
		alignItems: 'flex-end',
	},
	/* 검색폼 양식 */
	search: {
		borderRadius: size.radius.xsm,
		backgroundColor: color.background.offwhite,
		padding: `${size.margin.xl}`,
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
		gap: size.margin.xl,

	},
	/* 라인박스 */
	line: {
		borderRadius: size.radius.xsm,
		border: `1px solid ${color.border.default}`,
		backgroundColor: color.background.white,
		padding: `${size.margin.lg} ${size.margin.xl}`,
	},
	/* 버튼그룹 */
	btnbox: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: size.margin.md,
		'&:not(:first-of-type)': {
		marginTop: size.margin.xxl,
		},
	},
	/* 버튼아이템박스 */
	btnitem: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: size.margin.md,
	},

	inputButton: {
		display: 'flex',
		gap: size.margin.md,
		alignItems: 'flex-end',
	},
	/* 파일박스 */
	fileBox: {
		border: `1px solid ${color.border.default}`,
		borderRadius: size.radius.xsm,
		mt: size.margin.md,
		p: size.margin.md,
		backgroundColor: color.background.white,
	},
	/* 드래그앤드랍박스 */
	fileBoxWrap: {
		border: `1px dashed ${color.border.default}`,
		borderRadius: size.radius.xsm,
		overflowX: 'hidden',
		backgroundColor: '#FBFBFB',
	}
	};

const WiniBox = forwardRef(
	({ children, type, ui, className, sx: sxProp = {}, ...props }, ref) => {
		const uiTokens = getUiTokens(ui, type);
		const disableAutoGap = hasUiToken(uiTokens, 'noAutoGap');
		const uiSx = mergeUiSxByTokens(uiTokens, UI_SX);
		const mergedClassName = cn(
		'winicomponent winibox',
		uiTokens.map((token) => `winibox--${token}`),
		className,
		);
		const baseSx = {
			fontSize: size.text.sm,
			...(!disableAutoGap
				? {
					'&:not(:first-of-type)': {
						marginTop: size.margin.xl,
						'&.winibox--btnitem': {
						marginTop: 0,
						}
					},
				}
				: {}),
			...(uiSx ?? {}),
		};

		return (
		<Box
			ref={ref}
			className={mergedClassName}
			sx={(theme) => ({
				...baseSx,
				...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
			})}
			{...props}
		>
			{children}
		</Box>
		);
	},
);

export default WiniBox;
