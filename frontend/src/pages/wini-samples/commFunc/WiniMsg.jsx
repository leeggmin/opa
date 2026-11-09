// winiMsg 사용/활용법 샘플 페이지

import React, { useEffect, useRef, useState } from 'react';
import {
	WiniBox,
	WiniButton,
	WiniCode,
	WiniGridLayout,
	WiniText,
	WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { winiMsg } from '@/shared/model/dialogs';

const CODE_EXAMPLES = {
	import: `import { winiMsg } from '@/shared/model/dialogs';`,
	alert: `const result = await winiMsg.showAlert('메세지 내용을 작성해주세요.');
// result: 'Y'`,
	confirm: `const result = await winiMsg.showConfirm('메세지 내용을 작성해주세요.\\n줄바꿈도 가능합니다.');
// result: ; 'Y' (예), 'N' (아니오)`,
	snackbar: `winiMsg.showSnackbar('잠깐띄우는 메세지에 사용하세요.');`,
};

const CodeExample = ({ copyText, code, onCopy }) => (
	<WiniBox className="bg-[#1A1A1A] p-6 rounded-sm relative">
		<WiniBox className="flex items-center justify-between">
		<WiniTypography variant="span" className="text-white text-lg">
			코드 예시
		</WiniTypography>
		<WiniBox ui="btnbox">
			<WiniButton ui="gray" onClick={onCopy} className="transition-all duration-300">
			{copyText}
			</WiniButton>
		</WiniBox>
		</WiniBox>
		<WiniCode code={code} language="jsx" />
	</WiniBox>
);

const ResultRow = ({ label, value }) => (
	<WiniBox className="flex w-full gap-4 items-center py-2 border-b border-gray-200 last:border-b-0">
		<WiniTypography variant="span" className="font-bold w-[180px]">
		{label}
		</WiniTypography>
		<WiniTypography variant="span" className="text-md">
		{String(value ?? '-')}
		</WiniTypography>
	</WiniBox>
);

export default function WiniMsg() {
	// demo state
	const [alertMsg, setAlertMsg] = useState('');
	const [confirmMsg, setConfirmMsg] = useState('');
	const [snackbarMsg, setSnackbarMsg] = useState('');

	const [alertResult, setAlertResult] = useState(null);
	const [confirmResult, setConfirmResult] = useState(null);

	// copy UI state
	const allCopyKeys = ['import', 'alert', 'confirm', 'snackbar'];
	const [copyState, setCopyState] = useState(Object.fromEntries(allCopyKeys.map((k) => [k, 'copy'])));
	const timersRef = useRef({});

	useEffect(() => {
		return () => {
		Object.values(timersRef.current).forEach((t) => clearTimeout(t));
		};
	}, []);

	const handleCopy = async (key, code) => {
		try {
		await navigator.clipboard.writeText(code);
		setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

		if (timersRef.current[key]) clearTimeout(timersRef.current[key]);
		timersRef.current[key] = setTimeout(() => {
			setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
		}, 2000);

		window?.pubUI?.toast?.({ text: '복사가 완료되었습니다.', time: 2000, type: 'success' });
		} catch (e) {}
	};

	// actions
	const openAlert = async () => {
		const message = alertMsg || '메세지 내용을 작성해주세요.';
		const result = await winiMsg.showAlert(message);
		setAlertResult(result);
	};

	const openConfirm = async () => {
		const message = confirmMsg || '메세지 내용을 작성해주세요. \n줄바꿈도 가능합니다.';
		const result = await winiMsg.showConfirm(message);
		setConfirmResult(result);
	};

	const openSnackbar = () => {
		const message = snackbarMsg || '잠깐띄우는 메세지에 사용하세요.';
		winiMsg.showSnackbar(message);
	};

	return (
		<WiniFormEmpty>
			<WiniGridLayout className="pt-8">
				<WiniTypography variant="h1">winiMsg</WiniTypography>
				<WiniTypography variant="h2">winiMsg 가이드</WiniTypography>

				<WiniBox ui="info">
				<WiniTypography variant="span" className="text-md">
					winiMsg는 공통 메시지 유틸입니다.
					<br />
					<b>alert</b>(확인), <b>confirm</b>(예/아니오), <b>snackbar</b>(짧은 알림)을 제공합니다.
				</WiniTypography>
				</WiniBox>

				{/* 1) Alert */}
				<WiniBox ui="line">
				<WiniBox className="mb-4">
					<WiniTypography variant="h2">1) showAlert</WiniTypography>
					<WiniTypography variant="span" className="text-md">
					확인 버튼만 있는 알림창입니다. (리턴값 반환 있음)
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.alert === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.alert}
					onCopy={() => handleCopy('alert', CODE_EXAMPLES.alert)}
				/>

				<WiniBox ui="form" className="mt-4">
					<WiniBox className="flex items-end gap-2">
					<WiniBox className="flex-1">
						<WiniText
						ui="column"
						label="Alert 형태 확인"
						placeholder="ex) 메세지 내용을 작성해주세요."
						value={alertMsg}
						onChange={(e) => setAlertMsg(e?.target?.value ?? e)}
						/>
					</WiniBox>
					<WiniButton ui="line" onClick={openAlert} className="shrink-0">
						Alert 띄우기
					</WiniButton>
					</WiniBox>

					<WiniBox className="mt-2">
					<ResultRow label="return 값" value={alertResult} />
					</WiniBox>
				</WiniBox>
				</WiniBox>

				{/* 2) Confirm */}
				<WiniBox ui="line">
				<WiniBox className="mb-4">
					<WiniTypography variant="h2">2) showConfirm</WiniTypography>
					<WiniTypography variant="span" className="text-md">
					예/아니오 버튼이 있는 확인창입니다. (리턴값 반환 있음)
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.confirm === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.confirm}
					onCopy={() => handleCopy('confirm', CODE_EXAMPLES.confirm)}
				/>

				<WiniBox ui="form" className="mt-4">
					<WiniBox className="flex items-end gap-2">
					<WiniBox className="flex-1">
						<WiniText
						ui="column"
						label="Confirm 형태 확인"
						placeholder={'ex) 메세지 내용을 작성해주세요.\n줄바꿈도 가능합니다.'}
						value={confirmMsg}
						onChange={(e) => setConfirmMsg(e?.target?.value ?? e)}
						/>
					</WiniBox>
					<WiniButton ui="line" onClick={openConfirm} className="shrink-0">
						Confirm 띄우기
					</WiniButton>
					</WiniBox>

					<WiniBox className="mt-2">
					<ResultRow label="return 값" value={confirmResult} />
					</WiniBox>
				</WiniBox>
				</WiniBox>

				{/* 3) Snackbar */}
				<WiniBox ui="line">
				<WiniBox className="mb-4">
					<WiniTypography variant="h2">3) showSnackbar</WiniTypography>
					<WiniTypography variant="span" className="text-md">
					짧게 노출되는 메시지에 사용합니다. (리턴값 반환 없음)
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.snackbar === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.snackbar}
					onCopy={() => handleCopy('snackbar', CODE_EXAMPLES.snackbar)}
				/>

				<WiniBox ui="form" className="mt-4">
					<WiniBox className="flex items-end gap-2">
					<WiniBox className="flex-1">
						<WiniText
						ui="column"
						label="Snackbar 형태 확인"
						placeholder="ex) 잠깐띄우는 메세지에 사용하세요."
						value={snackbarMsg}
						onChange={(e) => setSnackbarMsg(e?.target?.value ?? e)}
						/>
					</WiniBox>
					<WiniButton ui="line" onClick={openSnackbar} className="shrink-0">
						Snackbar 띄우기
					</WiniButton>
					</WiniBox>
				</WiniBox>
				</WiniBox>
			</WiniGridLayout>
		</WiniFormEmpty>
	);
}