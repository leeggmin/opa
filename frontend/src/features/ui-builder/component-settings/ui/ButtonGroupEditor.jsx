import React from 'react';
import { WiniBox, WiniButton, WiniText } from '@/shared/ui/wini';

export const ButtonGroupEditor = ({
    buttonItems,
    onAdd,
    onRemove,
    onChange,
}) => {
    return (
        <WiniBox className="border-t border-[#e3e3e3] mt-2 pt-3">
            <WiniBox className="flex justify-between items-center">
                <WiniBox className="font-semibold">Button 항목 설정</WiniBox>
                <WiniButton
                    ui="lineGray"
                    onClick={onAdd}
                    className="border rounded-md px-2 cursor-pointer"
                >
                    버튼 추가
                </WiniButton>
            </WiniBox>

            {(buttonItems || []).map((buttonItem, index) => (
                <WiniBox key={buttonItem.id} className="border border-[#e1e1e1] rounded-lg p-2 mb-1 mt-2">
                    <WiniBox className="flex justify-between items-center mb-1">
                        <WiniBox className="text-s font-semibold">버튼 {index + 1}</WiniBox>
                        <WiniButton
                            ui="delete"
                            onClick={() => onRemove(buttonItem.id)}
                            className="border border-[#ccc] bg-white rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            삭제
                        </WiniButton>
                    </WiniBox>

                    <WiniBox className="grid gap-2">
                        <WiniText
                            value={buttonItem.ui || ''}
                            onChange={(event) => onChange(buttonItem.id, { ui: event.target.value })}
                            placeholder="ui (예: default, line)"
                        />
                        <WiniText
                            value={buttonItem.label || ''}
                            onChange={(event) => onChange(buttonItem.id, { label: event.target.value })}
                            placeholder="버튼명"
                        />
                    </WiniBox>
                </WiniBox>
            ))}
        </WiniBox>
    );
};
