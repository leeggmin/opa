import { forwardRef } from 'react';
import { winiCom } from '@/shared/lib';
import { useUserProfileForm } from '../model/useUserProfileForm';
import {
    WiniBox,
    WiniButton,
    WiniDialog,
    WiniDialogActions,
    WiniDialogContent,
    WiniDialogTitle,
    WiniGridItem,
    WiniGridLayout,
    WiniMenuItem,
    WiniSelect,
    WiniText,
    WiniTypography,
} from '@/shared/ui/wini';

const HALF_FIELD_SIZE = { lg: 6, md: 6, xs: 12 };
const FULL_FIELD_SIZE = { lg: 12, md: 12, xs: 12 };
const JOIN_STATUS_OPTIONS = [
    { value: 'ACCEPTED', label: '승인' },
    { value: 'REQUIRED', label: '대기' },
    { value: 'RESIGNED', label: '퇴사' },
    { value: 'ABSENCE', label: '휴직' },
];

export const UserProfileForm = forwardRef(function UserProfileForm(
    {
        title,
        values = {},
        departmentOptions = [],
        onChange,
        showAdminOptions = false,
        showActionButtons = false,
        onReset,
        onCreate,
        onUpdate,
        onDelete,
        onAcceptJoin,
        onResetPassword,
        onUnlockLogin,
        children,
    },
    ref,
) {
    const hasSelectedUser = Boolean(values.id);
    const {
        passwordDialog,
        shouldShowPasswordChangeButton,
        handleOpenPasswordDialog,
        handleClosePasswordDialog,
        handlePasswordDialogChange,
        handleChangePassword,
    } = useUserProfileForm({ values, showAdminOptions });
    const shouldShowActionButtons =
        showActionButtons &&
        (!showAdminOptions ||
            onReset ||
            onCreate ||
            onUpdate ||
            onDelete ||
            onAcceptJoin ||
            onResetPassword ||
            onUnlockLogin);

    return (
        <WiniBox>
            <WiniBox ui="form" ref={ref}>
                {title ? (
                    <WiniTypography variant="h6" className='mt-1'>
                        {title}
                    </WiniTypography>
                ) : null}

                <WiniGridLayout container rowSpacing={1} columnSpacing={1}>
                    <WiniGridItem
                        item
                        size={showAdminOptions ? HALF_FIELD_SIZE : FULL_FIELD_SIZE}
                    >
                        <WiniText
                            ui="column"
                            label="사용자 ID"
                            className="w-full"
                            name="username"
                            value={values.username || ''}
                            required
                            disabled={hasSelectedUser}
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    {showAdminOptions ? (
                        <>
                            <WiniGridItem item size={HALF_FIELD_SIZE}>
                                <WiniSelect
                                    ui="column"
                                    label="가입승인여부"
                                    name="joinStatus"
                                    value={values.joinStatus || ''}
                                    inputProps={{ shrink: true }}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            height: 'var(--wini-control-h)',
                                            minHeight: 'var(--wini-control-h)',
                                        },
                                    }}
                                    disabled={!hasSelectedUser}
                                    onChange={onChange}
                                >
                                    {JOIN_STATUS_OPTIONS.map((option) => (
                                        <WiniMenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </WiniMenuItem>
                                    ))}
                                </WiniSelect>
                            </WiniGridItem>

                            <WiniGridItem item size={HALF_FIELD_SIZE}>
                                <WiniText
                                    ui="column"
                                    label="비밀번호"
                                    className="w-full"
                                    name="password"
                                    type="password"
                                    value={values.password || ''}
                                    required
                                    disabled={hasSelectedUser}
                                    onChange={onChange}
                                />
                            </WiniGridItem>

                            <WiniGridItem item size={HALF_FIELD_SIZE}>
                                <WiniText
                                    ui="column"
                                    label="비밀번호 확인"
                                    className="w-full"
                                    name="passwordConf"
                                    type="password"
                                    value={values.passwordConf || ''}
                                    required
                                    disabled={hasSelectedUser}
                                    onChange={onChange}
                                />
                            </WiniGridItem>
                        </>
                    ) : null}

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniText
                            ui="column"
                            label="성"
                            className="w-full"
                            name="lastName"
                            required={true}
                            value={values.lastName || ''}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'family-name' },
                            }}
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniText
                            ui="column"
                            label="이름"
                            className="w-full"
                            name="firstName"
                            required={true}
                            value={values.firstName || ''}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'given-name' },
                            }}
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniSelect
                            ui="column"
                            label="부서"
                            name="departmentId"
                            className="w-full"
                            value={values.departmentId || ''}
                            inputProps={{ shrink: true }}
                            onChange={onChange}
                        >
                            {departmentOptions.map((department) => (
                                <WiniMenuItem key={department.id} value={department.id}>
                                    {department.departmentName || department.name}
                                </WiniMenuItem>
                            ))}
                        </WiniSelect>
                    </WiniGridItem>

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniText
                            ui="column"
                            label="직위"
                            name="dutyName"
                            className="w-full"
                            value={values.dutyName || ''}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'off' },
                            }}
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniText
                            ui="column"
                            label="전화번호"
                            required={true}
                            name="phoneNumber"
                            type="text"
                            value={values.phoneNumber || ''}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'tel' },
                            }}
                            className="w-full"
                            placeholder="숫자만 입력"
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    <WiniGridItem item size={HALF_FIELD_SIZE}>
                        <WiniText
                            ui="column"
                            label="이메일"
                            className="w-full"
                            name="email"
                            required={true}
                            value={values.email || ''}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'email' },
                            }}
                            onChange={onChange}
                        />
                    </WiniGridItem>

                    {children}
                </WiniGridLayout>
            </WiniBox>

            {shouldShowActionButtons ? (
                <WiniBox className="flex flex-wrap items-center justify-between gap-2">
                    <WiniBox ui="btnbox" className="mt-0 items-center justify-start">
                        {showAdminOptions &&
                            onResetPassword &&
                            winiCom.checkMenuAut(
                                ['s', 'i', 'u', 'd'],
                                <WiniBox ui="btnitem">
                                    <WiniButton
                                        variant="outlined"
                                        className="w-[110px]"
                                        tabIndex={4}
                                        onClick={onResetPassword}
                                        disabled={!hasSelectedUser}
                                    >
                                        비밀번호 초기화
                                    </WiniButton>
                                </WiniBox>,
                            )}

                        {showAdminOptions &&
                            onUnlockLogin &&
                            winiCom.checkMenuAut(
                                ['s', 'i', 'u', 'd'],
                                <WiniBox ui="btnitem">
                                    <WiniButton
                                        variant="outlined"
                                        className="w-[160px]"
                                        tabIndex={4}
                                        onClick={onUnlockLogin}
                                        disabled={!hasSelectedUser}
                                    >
                                        비밀번호 오류 횟수 초기화
                                    </WiniButton>
                                </WiniBox>,
                            )}
                        
                        {shouldShowPasswordChangeButton ? (
                            <WiniBox ui="btnitem">
                                <WiniButton
                                    variant="outlined"
                                    className="w-[110px]"
                                    tabIndex={4}
                                    onClick={handleOpenPasswordDialog}
                                >
                                    비밀번호 변경
                                </WiniButton>
                            </WiniBox>
                        ) : null}

                        {showAdminOptions &&
                            values.joinStatus === 'REQUIRED' &&
                            onAcceptJoin &&
                            winiCom.checkMenuAut(
                                ['u'],
                                <WiniBox ui="btnitem">
                                    <WiniButton
                                        variant="outlined"
                                        tabIndex={4}
                                        onClick={onAcceptJoin}
                                    >
                                        가입승인
                                    </WiniButton>
                                </WiniBox>,
                            )}
                    </WiniBox>

                    {onReset || onUpdate || (showAdminOptions && (onDelete || onCreate)) ? (
                        <WiniBox ui="btnbox" className="mt-0 items-center justify-end">
                            {showAdminOptions && onDelete ? (
                                <WiniBox ui="btnitem">
                                    {winiCom.checkMenuAut(
                                        'd',
                                        <WiniButton
                                            ui="delete"
                                            className="w-20"
                                            tabIndex={4}
                                            onClick={onDelete}
                                            disabled={!hasSelectedUser}
                                        >
                                            삭제
                                        </WiniButton>,
                                    )}
                                </WiniBox>
                            ) : null}

                            <WiniBox ui="btnitem">
                                {onReset ? (
                                    <WiniButton ui="lineGray" className="w-20" onClick={onReset}>
                                        초기화
                                    </WiniButton>
                                ) : null}

                                {onUpdate
                                    ? showAdminOptions
                                        ? winiCom.checkMenuAut(
                                            'u',
                                            <WiniButton
                                                ui="line"
                                                className="w-20"
                                                tabIndex={4}
                                                onClick={onUpdate}
                                                disabled={!hasSelectedUser}
                                            >
                                                수정
                                            </WiniButton>,
                                        )
                                        : (
                                            <WiniButton
                                                ui="line"
                                                className="w-20"
                                                tabIndex={4}
                                                onClick={onUpdate}
                                            >
                                                수정
                                            </WiniButton>
                                        )
                                    : null}

                                {showAdminOptions && onCreate
                                    ? winiCom.checkMenuAut(
                                        'i',
                                        <WiniButton
                                            ui="default"
                                            className="w-20"
                                            tabIndex={4}
                                            onClick={onCreate}
                                            disabled={hasSelectedUser}
                                        >
                                            등록
                                        </WiniButton>,
                                    )
                                    : null}
                            </WiniBox>
                        </WiniBox>
                    ) : null}
                </WiniBox>
            ) : null}

            <WiniDialog
                open={passwordDialog.open}
                onClose={handleClosePasswordDialog}
                fullWidth={true}
                maxWidth="xs"
            >
                <WiniDialogTitle>비밀번호 변경</WiniDialogTitle>

                <WiniDialogContent>
                    <WiniBox className="flex flex-col gap-2 pt-2">
                        <WiniText
                            required
                            ui="column"
                            label="기존 비밀번호"
                            name="oldPassword"
                            type="password"
                            value={passwordDialog.oldPassword}
                            onChange={handlePasswordDialogChange}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'current-password' },
                            }}
                        />

                        <WiniText
                            required
                            ui="column"
                            label="새 비밀번호"
                            name="newPassword"
                            type="password"
                            value={passwordDialog.newPassword}
                            onChange={handlePasswordDialogChange}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: { autoComplete: 'new-password' },
                            }}
                        />
                    </WiniBox>
                </WiniDialogContent>

                <WiniDialogActions>
                    <WiniButton onClick={handleChangePassword}>확인</WiniButton>
                    <WiniButton onClick={handleClosePasswordDialog}>취소</WiniButton>
                </WiniDialogActions>
            </WiniDialog>
        </WiniBox>
    );
});