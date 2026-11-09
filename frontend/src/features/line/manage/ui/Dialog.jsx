import { WiniBox, WiniButton, WiniDialog, WiniDialogActions, WiniDialogContent, WiniDialogTitle, WiniText } from '@/shared/ui/wini';

export const Dialog = ({
    open,
    closeDialog,
    selectedLine,
    setSelectedLine,
    onSave,
    onDelete,
    onPickUser,
}) => {
    return (
        <WiniDialog
            open={open}
            onClose={closeDialog}
            className="min-w-[400px]"
        >
            <WiniDialogTitle>회선 상세 정보</WiniDialogTitle>

            <WiniDialogContent>
                <WiniBox
                    className="p-1 pb-0"
                    gap={1}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <WiniText
                        ui="row"
                        titleFix
                        label="회선명"
                        name="lineName"
                        value={selectedLine.lineName}
                        // className="w-[400px]"
                        onChange={(e) =>
                            setSelectedLine({
                                ...selectedLine,
                                lineName: e.target.value,
                            })
                        }
                        placeholder="회선명"
                    />

                    <WiniText
                        ui="row"
                        titleFix
                        label="회선정보"
                        name="lineInfo"
                        value={selectedLine.lineInfo}
                        // className="w-[400px]"
                        onChange={(e) =>
                            setSelectedLine({
                                ...selectedLine,
                                lineInfo: e.target.value,
                            })
                        }
                        placeholder="IP 또는 내선번호"
                    />

                    <WiniBox
                        display="flex"
                        flexDirection="row"
                        justifyContent="center"
                    >
                        <WiniText
                            ui="row"
                            titleFix
                            label="담당자"
                            required
                            name="fullName"
                            value={selectedLine.fullName}
                            // className="w-[310px]"
                            disabled
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <WiniButton ui="default" className="ml-1 w-[130px]" onClick={onPickUser}>
                            담당자 선택
                        </WiniButton>
                    </WiniBox>
                </WiniBox>
            </WiniDialogContent>

            <WiniDialogActions>
                <WiniButton onClick={onSave}>저장</WiniButton>
                {selectedLine.lineId && <WiniButton onClick={onDelete}>삭제</WiniButton>}
                <WiniButton onClick={closeDialog}>닫기</WiniButton>
            </WiniDialogActions>
        </WiniDialog>
    );
}
