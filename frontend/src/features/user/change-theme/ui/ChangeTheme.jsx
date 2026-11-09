import { WiniCard, WiniCardContent, WiniTypography, WiniFormControl, WiniRadioGroup, WiniRadio } from '@/shared/ui/wini';

export function ChangeTheme({ value, onChange }) {
    return (
        <WiniCard variant="outlined">
            <WiniCardContent>
                <WiniTypography variant="h6" className="my-3">테마 변경</WiniTypography>
                <WiniTypography variant="body2" color="text.secondary" className="mt-1">
                    현재는 UI만 제공됩니다. (기능 동작 X)
                </WiniTypography>

                <WiniFormControl className="mt-4">
                    <WiniRadioGroup value={value} onChange={onChange}>
                        <WiniRadio value="system" label="시스템 설정"/>
                        <WiniRadio value="light" label="라이트"/>
                        <WiniRadio value="dark" label="다크"/>
                    </WiniRadioGroup>
                </WiniFormControl>
            </WiniCardContent>
        </WiniCard>
    );
}
