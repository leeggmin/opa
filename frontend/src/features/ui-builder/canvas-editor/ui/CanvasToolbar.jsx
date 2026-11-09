import React from 'react';
import { WiniBox, WiniButton, WiniIconButton, WiniInputLabel, WiniSwitch, WiniText, WiniTooltip } from '@/shared/ui/wini';

export const CanvasToolbar = ({
    canvasResolution,
    hasCanvasItems,
    isFsdMode,
    onCommitResolutionWidth,
    onCommitResolutionHeight,
    selectedRef,
    canMoveSelectedForward,
    canMoveSelectedBackward,
    onClear,
    onDuplicate,
    onOpenPreview,
    onRemoveSelected,
    onMoveForward,
    onMoveBackward,
    onBuildLayoutText,
    onToggleFsdMode,
}) => {
    const isFsdSwitchDisabled = hasCanvasItems;

    return (
        <WiniBox className="flex justify-between items-center">
            <WiniBox className="flex items-center gap-2 flex-nowrap">
                <WiniInputLabel ui="default" className="shrink-0">
                    캔버스 크기(px)
                </WiniInputLabel>

                <WiniBox className="flex items-center gap-2 h-[32px]">
                    <WiniText
                        key={`canvas-width-${canvasResolution.width}`}
                        ui="default"
                        defaultValue={canvasResolution.width}
                        onBlur={(event) => onCommitResolutionWidth(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key !== 'Enter') return;
                            event.preventDefault();
                            onCommitResolutionWidth(event.target.value);
                            event.currentTarget.blur();
                        }}
                        className="w-[60px] h-[32px] shrink-0"
                    />

                    <WiniInputLabel ui="default" className="shrink-0">
                        x
                    </WiniInputLabel>

                    <WiniText
                        key={`canvas-height-${canvasResolution.height}`}
                        ui="default"
                        defaultValue={canvasResolution.height}
                        onBlur={(event) => onCommitResolutionHeight(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key !== 'Enter') return;
                            event.preventDefault();
                            onCommitResolutionHeight(event.target.value);
                            event.currentTarget.blur();
                        }}
                        className="w-[60px] h-[32px] shrink-0"
                    />
                </WiniBox>
            </WiniBox>

            <WiniBox className="flex gap-2 items-center flex-wrap m-0">
                <WiniTooltip title={isFsdSwitchDisabled ? '모드를 변경하려면 초기화 해주세요.' : ''}>
                    <WiniBox className="inline-flex">
                        <WiniSwitch
                            checked={isFsdMode}
                            disabled={isFsdSwitchDisabled}
                            onChange={(event) => onToggleFsdMode(event.target.checked)}
                            label="FSD 모드"
                        />
                    </WiniBox>
                </WiniTooltip>

                <WiniButton
                    ui="lineGray"
                    onClick={onClear}
                    className="border rounded-lg px-3 py-1 cursor-pointer"
                >
                    초기화
                </WiniButton>

                <WiniButton
                    ui="lineGray"
                    onClick={onDuplicate}
                    disabled={!selectedRef?.itemId}
                    className="border rounded-lg px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    복제
                </WiniButton>

                <WiniButton
                    ui="delete"
                    onClick={onRemoveSelected}
                    disabled={!selectedRef?.itemId}
                    className="border rounded-lg px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    삭제
                </WiniButton>

                <WiniButton
                    ui="lineGray"
                    onClick={onMoveForward}
                    disabled={!canMoveSelectedForward}
                    className="border rounded-lg px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    앞으로 가져오기
                </WiniButton>

                <WiniButton
                    ui="lineGray"
                    onClick={onMoveBackward}
                    disabled={!canMoveSelectedBackward}
                    className="border rounded-lg px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    뒤로 보내기
                </WiniButton>

                <WiniIconButton
                    icon="link"
                    ui="lineGray"
                    aria-label="전체화면 미리보기"
                    onClick={onOpenPreview}
                    className="border rounded-lg px-2 py-1 cursor-pointer"
                >
                    전체 화면
                </WiniIconButton>

                <WiniButton
                    onClick={onBuildLayoutText}
                    className="border rounded-lg px-3 py-1 cursor-pointer"
                >
                    레이아웃 생성
                </WiniButton>
            </WiniBox>
        </WiniBox>
    );
};