import React from 'react';
import { WiniBox, WiniIconButton, WiniTypography } from '@/shared/ui/wini';

export const LayoutOutputPanel = ({ layoutText, copyFeedback, onCopy }) => {
    return (
        <>
            <WiniBox className="flex items-center justify-between gap-2">
                <WiniTypography variant="h3" className="mb-0">컴포넌트 리스트</WiniTypography>

                <WiniIconButton
                    icon="copy"
                    aria-label="컴포넌트 리스트 복사"
                    onClick={onCopy}
                    disabled={!layoutText}
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
                <WiniBox className="whitespace-pre-wrap font-mono text-[12px] leading-5">
                    {layoutText || '이곳에 컴포넌트 리스트가 표시됩니다.'}
                </WiniBox>
            </WiniBox>
        </>
    );
};