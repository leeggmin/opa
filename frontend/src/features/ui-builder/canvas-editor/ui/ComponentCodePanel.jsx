import React, { useCallback, useState } from 'react';
import { WiniBox, WiniIconButton, WiniTypography } from '@/shared/ui/wini';

export const ComponentCodePanel = ({ componentCodeText, componentCodeSections, copyFeedback, onCopy }) => {
    const [copiedSectionId, setCopiedSectionId] = useState('');

    const handleCopySection = useCallback(async (sectionId, sectionContent) => {
        if (!sectionContent) return;

        try {
            await navigator.clipboard.writeText(sectionContent);
            setCopiedSectionId(sectionId);
            setTimeout(() => setCopiedSectionId(''), 1200);
        } catch {
            setCopiedSectionId('');
        }
    }, []);

    return (
        <>
            <WiniBox className="flex items-center justify-between gap-2">
                <WiniTypography variant="h3" className="mb-0">컴포넌트 코드 예시</WiniTypography>

                <WiniIconButton
                    icon="copy"
                    aria-label="컴포넌트 코드 복사"
                    onClick={onCopy}
                    disabled={!componentCodeText}
                    className="!border-0 !shadow-none !bg-transparent disabled:opacity-50 disabled:cursor-not-allowed pr-1"
                />
            </WiniBox>

            {copyFeedback && (
                <WiniBox className="absolute top-2 right-12 z-10 text-[12px] text-[#475467] bg-white border border-[#e4e7ec] rounded px-2 py-0.5">
                    {copyFeedback}
                </WiniBox>
            )}

            <WiniBox
                className="border border-[#ddd] rounded-[10px] bg-[#fafafa] p-3 h-[400px] m-0 min-w-0 overflow-auto flex flex-col [scrollbar-color:#b8b8b8_#f4f4f4] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-track]:bg-[#f4f4f4] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#b8b8b8]"
                style={{ scrollbarWidth: 'thin' }}
            >
                {(componentCodeSections || []).length > 0 ? (
                    componentCodeSections.map((section) => (
                        <WiniBox key={section.id} className="border border-[#e4e7ec] bg-white rounded-[8px] overflow-hidden shrink-0">
                            <WiniBox className="pl-3 pr-0 border-b border-[#eaecf0] bg-[#f8f9fc] flex items-center justify-between">
                                <WiniTypography variant="body2" className="font-semibold mb-0">
                                    {section.title}
                                </WiniTypography>

                                <WiniBox className="flex items-center gap-1">
                                    {copiedSectionId === section.id && (
                                        <WiniTypography variant="caption" className="text-[#475467] mb-0">
                                            복사됨
                                        </WiniTypography>
                                    )}
                                    <WiniIconButton
                                        icon="copy"
                                        aria-label={`${section.title} 복사`}
                                        onClick={() => handleCopySection(section.id, section.content)}
                                        disabled={!section.content}
                                        className="!border-0 !shadow-none !bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </WiniBox>
                            </WiniBox>
                            <WiniBox ui='noAutoGap' className="p-3 whitespace-pre-wrap font-mono text-[12px] leading-5">
                                {section.content}
                            </WiniBox>
                        </WiniBox>
                    ))
                ) : (
                    <WiniBox className="whitespace-pre-wrap font-mono text-[12px] leading-5">
                        {componentCodeText || '이곳에 컴포넌트 코드가 표시됩니다.'}
                    </WiniBox>
                )}
            </WiniBox>
        </>
    );
};
