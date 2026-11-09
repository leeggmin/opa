import { WiniCard, WiniCardContent, WiniTypography, WiniStack, WiniSelect, WiniMenuItem } from '@/shared/ui/wini';

export function SelectLanguage({ value, onChange }) {
    return (
        <WiniCard variant="outlined">
            <WiniCardContent>
                <WiniTypography variant="h6" className="my-3">언어 선택</WiniTypography>
                <WiniTypography variant="body2" color="text.secondary" className="mt-1">
                    현재는 UI만 제공됩니다. (기능 동작 X)
                </WiniTypography>

                <WiniStack spacing={1.5} className="mt-4">
                    <WiniSelect label="표시 언어" ui="column" size="small" value={value} onChange={onChange} className="max-w-[240px]">
                        <WiniMenuItem value="ko">한국어</WiniMenuItem>
                        <WiniMenuItem value="en">English</WiniMenuItem>
                        <WiniMenuItem value="ja">日本語</WiniMenuItem>
                    </WiniSelect>
                </WiniStack>
            </WiniCardContent>
        </WiniCard>
    );
}
