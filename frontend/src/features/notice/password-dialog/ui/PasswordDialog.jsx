import * as React from 'react';
import {
    WiniDialog,
    WiniDialogActions,
    WiniDialogContent,
    WiniDialogTitle,
    WiniButton,
    WiniText,
} from '@/shared/ui/wini';

export const NoticePasswordDialog = (props) => {
    return (
        <WiniDialog open={props.open} onClose={props.onClose} fullWidth={true} maxWidth={'xs'}>
            <WiniDialogTitle>비밀번호 입력</WiniDialogTitle>

            <WiniDialogContent className="p-2 pb-0">
                <WiniText
                    label="비밀번호"
                    variant="outlined"
                    type="password"
                    name="pw"
                    value={props.pw}
                    onChange={(e) => props.onChangePw(e.target.value)}
                />
            </WiniDialogContent>

            <WiniDialogActions>
                <WiniButton onClick={props.onConfirm}>
                    확인
                </WiniButton>
                <WiniButton onClick={props.onClose}>
                    취소
                </WiniButton>
            </WiniDialogActions>
        </WiniDialog>
    );
};
