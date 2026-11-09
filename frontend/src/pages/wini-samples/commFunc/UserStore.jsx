// userStore(=zustand store) 사용/활용법 샘플 페이지

import React, { useEffect, useRef, useState } from 'react';
import {
	WiniBox,
	WiniButton,
	WiniCode,
	WiniGridItem,
	WiniGridLayout,
	WiniText,
	WiniTypography,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import { userStore } from '@/shared/model';

const SAMPLE_FIELDS = [
	{ key: 'userId', label: 'userId', placeholder: 'ex) U-1000' },
	{ key: 'userName', label: 'userName', placeholder: 'ex) 홍길동' },
	{ key: 'organizationId', label: 'organizationId', placeholder: 'ex) ORG-01' },
	{ key: 'organizationCode', label: 'organizationCode', placeholder: 'ex) ORGCODE-01' },
	{ key: 'userGroupCode', label: 'userGroupCode', placeholder: 'ex) GRP-A' },
	{ key: 'userGroupId', label: 'userGroupId', placeholder: 'ex) G-10' },
	{ key: 'department', label: 'department', placeholder: 'ex) 개발팀' },
	{ key: 'duty', label: 'duty', placeholder: 'ex) 대리' },
];

const CODE_EXAMPLES = {
	subscribe: `const userId = userStore((s) => s.userId);
const userName = userStore((s) => s.userName);
const organizationId = userStore((s) => s.organizationId);
const organizationCode = userStore((s) => s.organizationCode);
const userGroupCode = userStore((s) => s.userGroupCode);
const userGroupId = userStore((s) => s.userGroupId);
const department = userStore((s) => s.department);
const duty = userStore((s) => s.duty);`,
	setUser: `// 1) 개별 setter로 부분 변경
userStore.getState().setUserId(form.userId);
userStore.getState().setUserName(form.userName);
userStore.getState().setOrganizationId(form.organizationId);
userStore.getState().setOrganizationCode(form.organizationCode);
userStore.getState().setGroupCode(form.userGroupCode);
userStore.getState().setGroupId(form.userGroupId);
userStore.getState().setDept(form.department);
userStore.getState().setDuty(form.duty);`,
	partial: `// 2) setUser로 일괄 변경 (편의 메서드)
setUser({
	userId: form.userId,
	userName: form.userName,
	organizationId: form.organizationId,
	organizationCode: form.organizationCode,
	userGroupCode: form.userGroupCode,
	userGroupId: form.userGroupId,
	department: form.department,
	duty: form.duty,
});`,
	getState: `const s = userStore.getState();

// getState()로 얻은 변수값 사용 예시
alert(\`userId: \${s.userId}\\nuserName: \${s.userName}\\norgId: \${s.organizationId}\`);`,
	utils: `const id = userStore.getUserId?.();
const name = userStore.getUserName?.();
const orgId = userStore.getOrganizationId?.();
const orgCode = userStore.getOrganizationCode?.();
const groupId = userStore.getGroupId?.();
const groupCode = userStore.getGroupCode?.();
const dept = userStore.getDept?.();
const duty = userStore.getDuty?.();`,
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

const StoreRow = ({ label, value }) => (
	<WiniBox className="flex w-full gap-4 items-center py-2 border-b border-gray-200 last:border-b-0">
		<WiniTypography variant="span" className="font-bold w-[180px]">
		{label}
		</WiniTypography>
		<WiniTypography variant="span" className="text-md">
		{value || '-'}
		</WiniTypography>
	</WiniBox>
);

export default function UserStore() {
	// primitive selector만 사용 (객체 구독 제거)
	const userId = userStore((s) => s.userId);
	const userName = userStore((s) => s.userName);
	const organizationId = userStore((s) => s.organizationId);
	const organizationCode = userStore((s) => s.organizationCode);
	const userGroupCode = userStore((s) => s.userGroupCode);
	const userGroupId = userStore((s) => s.userGroupId);
	const department = userStore((s) => s.department);
	const duty = userStore((s) => s.duty);

	// actions
	const setUser = userStore((s) => s.setUser);
	const reset = userStore((s) => s.reset);

	// local form state
	const [form, setForm] = useState(Object.fromEntries(SAMPLE_FIELDS.map((f) => [f.key, ''])));

	// copy UI state
	const allCopyKeys = ['subscribe', 'setUser', 'partial', 'getState', 'utils'];
	const [copyState, setCopyState] = useState(Object.fromEntries(allCopyKeys.map((k) => [k, 'copy'])));
	const timersRef = useRef({});

	useEffect(() => {
		return () => {
			Object.values(timersRef.current).forEach((t) => clearTimeout(t));
		};
	}, []);

	// user_init 샘플
	useEffect(() => {
		if (userStore.getState().userId) return;

		userStore.getState().setUser({
			userId: 'U-1000',
			userName: '홍길동',
			organizationId: 'ORG-01',
			organizationCode: 'ORGCODE-01',
			userGroupCode: 'GRP-A',
			userGroupId: 'G-10',
			department: '개발팀',
			duty: '대리',
		});
	}, []);

	const handleChange = (name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }));
	};

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

	const applyWithSetUser = () => {
		setUser({
			userId: form.userId,
			userName: form.userName,
			organizationId: form.organizationId,
			organizationCode: form.organizationCode,
			userGroupCode: form.userGroupCode,
			userGroupId: form.userGroupId,
			department: form.department,
			duty: form.duty,
		});
	};

	const applyPartial = (key) => {
		const s = userStore.getState();
		const v = form[key] ?? '';

		switch (key) {
			case 'userId':
				s.setUserId(v);
				break;
			case 'userName':
				s.setUserName(v);
				break;
			case 'organizationId':
				s.setOrganizationId(v);
				break;
			case 'organizationCode':
				s.setOrganizationCode(v);
				break;
			case 'userGroupCode':
				s.setGroupCode(v);
				break;
			case 'userGroupId':
				s.setGroupId(v);
				break;
			case 'department':
				s.setDept(v);
				break;
			case 'duty':
				s.setDuty(v);
				break;
			default:
				break;
		}
	};

	const fillFromStore = () => {
		const s = userStore.getState();
		setForm((prev) => ({
			...prev,
			userId: s.userId ?? '',
			userName: s.userName ?? '',
			organizationId: s.organizationId ?? '',
			organizationCode: s.organizationCode ?? '',
			userGroupCode: s.userGroupCode ?? '',
			userGroupId: s.userGroupId ?? '',
			department: s.department ?? '',
			duty: s.duty ?? '',
		}));
	};

	const clearForm = () => {
		setForm(Object.fromEntries(SAMPLE_FIELDS.map((f) => [f.key, ''])));
	};

	const readOnceWithGetState = () => {
		const s = userStore.getState();
		alert(['getState()로 읽기', `userId: ${s.userId}`, `userName: ${s.userName}`, `orgId: ${s.organizationId}`].join('\n'));
	};

	const readWithStaticUtils = () => {
		const id = userStore.getUserId?.();
		const name = userStore.getUserName?.();
		const orgId = userStore.getOrganizationId?.();
		alert(['store util로 읽기', `id: ${id ?? '-'}`, `name: ${name ?? '-'}`, `orgId: ${orgId ?? '-'}`].join('\n'));
	};

	return (
		<WiniFormEmpty>
		<WiniGridLayout className="pt-8">
			<WiniTypography variant="h1">userStore</WiniTypography>
			<WiniTypography variant="h2">Zustand userStore 사용 가이드</WiniTypography>

			<WiniBox ui="info">
			<WiniTypography variant="span" className="text-md">
				Zustand의 전역은 브라우저 전체가 아니라 <b>현재 탭(런타임)</b> 안에서만 전역입니다.
				<br />
				화면 렌더에 쓰는 값은 selector로 구독하고, “그 순간 값만 필요”하면 getState() 또는 읽기 유틸을 사용합니다.
			</WiniTypography>
			</WiniBox>

			{/* 1) userStore 속성 값 */}
			<WiniBox ui="line">
				<WiniBox className='mb-4'>
					<WiniTypography variant="h2">1) userStore 속성 값</WiniTypography>
					<WiniTypography variant="span" className="text-md">
						userStore는 사용자의 아이디, 이름, 조직 아이디, 조직 코드, 그룹 코드, 그룹 아이디, 부서, 직급 정보를 제공합니다.
					</WiniTypography>
				</WiniBox>

				<WiniTypography variant="h3">현재 Store 상태(구독 렌더, 기본값 세팅)</WiniTypography>
				<WiniBox ui="form" className="mt-4">
					<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="userId" value={userId} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="userName" value={userName} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="organizationId" value={organizationId} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="organizationCode" value={organizationCode} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="userGroupCode" value={userGroupCode} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="userGroupId" value={userGroupId} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="department" value={department} />
						</WiniGridItem>

						<WiniGridItem size={{ xs: 12, md: 6 }}>
						<StoreRow label="duty" value={duty} />
						</WiniGridItem>
					</WiniGridLayout>
				</WiniBox>
			</WiniBox>

			{/* 2) 현재 Store 상태 */}
			<WiniBox ui="line">
				<WiniBox className='mb-4'>
					<WiniTypography variant="h2">2) selector 구독</WiniTypography>
					<WiniTypography variant="span" className="text-md">
						현재 Store 상태를 구독할 수 있습니다.<br />
						구독된 값은 <b>변경 시 자동 리렌더</b>됩니다.
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.subscribe === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.subscribe}
					onCopy={() => handleCopy('subscribe', CODE_EXAMPLES.subscribe)}
				/>
			</WiniBox>

			{/* 3) getState / util */}
			<WiniBox ui="line">
				<WiniBox className='mb-4'>
					<WiniTypography variant="h2">3) getState와 읽기 유틸</WiniTypography>
					<WiniTypography variant="h3">3-1) getState</WiniTypography>
					<WiniTypography variant="span" className="text-md">
						getState()는 변경을 추적하지 않고 <b>그 순간 상태를 한 번만</b> 읽는 함수입니다.
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.getState === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.getState}
					onCopy={() => handleCopy('getState', CODE_EXAMPLES.getState)}
				/>

				<WiniBox className='mb-4'>
					<WiniTypography variant="h3">3-2) 읽기 유틸 (getState 응용 함수)</WiniTypography>
					<WiniTypography variant="span" className="text-md">
						getState()를 응용하여 <b>정적 헬퍼</b>를 미리 정의해 놓았습니다.<br />
						값을 읽을 때마다 getState()로 직접 접근하는 대신, 아래와 같이 간편하게 사용할 수 있습니다.
					</WiniTypography>
				</WiniBox>

				<CodeExample
					copyText={copyState.utils === 'copy' ? '복사하기' : '복사 완료'}
					code={CODE_EXAMPLES.utils}
					onCopy={() => handleCopy('utils', CODE_EXAMPLES.utils)}
				/>
			</WiniBox>

			{/* 4) 입력 폼 + 업데이트 */}
			<WiniBox ui="line">
				<WiniTypography variant="h2">4) userStore 값 변경</WiniTypography>
				<WiniTypography variant="span" className="text-md">
					값을 변경하는 방법에는 2가지가 있습니다.
					<WiniBox className='mt-2'>
						<WiniTypography variant="h3">1) 개별 setter로 부분 변경</WiniTypography>
						<WiniTypography variant="h3">2) setUser로 일괄 변경 (편의 메서드)</WiniTypography>
					</WiniBox>
					아래 입력폼으로 store를 업데이트해보세요. (1번의 구독 렌더가 자동으로 업데이트되는 것을 볼 수 있습니다.)
				</WiniTypography>

				<WiniBox ui="form" className="mt-4">
					<WiniGridLayout container columnSpacing={2} rowSpacing={2}>
						{SAMPLE_FIELDS.map((f) => (
							<WiniGridItem key={f.key} size={{ xs: 12, md: 6 }}>
							<WiniBox ui="inputButton">
								<WiniBox className="flex-1">
									<WiniText
										ui="column"
										label={f.label}
										placeholder={f.placeholder}
										value={form[f.key]}
										onChange={(e) => handleChange(f.key, e?.target?.value ?? e)}
									/>
								</WiniBox>
								<WiniButton ui="line" onClick={() => applyPartial(f.key)}>
								부분 변경
								</WiniButton>
							</WiniBox>
						</WiniGridItem>
						))}
					</WiniGridLayout>
				</WiniBox>

				<WiniBox className="mt-4 flex flex-wrap gap-2">
					<WiniButton ui="default" onClick={applyWithSetUser}>
					setUser(일괄 변경)
					</WiniButton>
					<WiniButton ui="gray" onClick={fillFromStore}>
					현재 store 값 채우기
					</WiniButton>
					<WiniButton ui="gray" onClick={clearForm}>
					입력 초기화
					</WiniButton>
					<WiniButton ui="lineGray" onClick={reset}>
					userStore 초기화(빈값)
					</WiniButton>
				</WiniBox>

				<WiniGridLayout container columnSpacing={2} rowSpacing={2} className="mt-6">
					<WiniGridItem size={{ xs: 12, md: 6 }}>
					<CodeExample
						copyText={copyState.setUser === 'copy' ? '복사하기' : '복사 완료'}
						code={CODE_EXAMPLES.setUser}
						onCopy={() => handleCopy('setUser', CODE_EXAMPLES.setUser)}
					/>
					</WiniGridItem>
					<WiniGridItem size={{ xs: 12, md: 6 }}>
					<CodeExample
						copyText={copyState.partial === 'copy' ? '복사하기' : '복사 완료'}
						code={CODE_EXAMPLES.partial}
						onCopy={() => handleCopy('partial', CODE_EXAMPLES.partial)}
					/>
					</WiniGridItem>
				</WiniGridLayout>
			</WiniBox>
		</WiniGridLayout>
		</WiniFormEmpty>
	);
}