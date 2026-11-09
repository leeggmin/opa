import React from 'react';
import { WiniBox, WiniButton, WiniText } from '@/shared/ui/wini';

export const SelectMenuEditor = ({
    menuItems,
    onAdd,
    onRemove,
    onChange,
}) => {
    return (
        <WiniBox className="border-t border-[#e3e3e3] mt-2 pt-3">
            <WiniBox className="flex justify-between items-center">
                <WiniBox className="font-semibold">MenuItem 설정</WiniBox>
                <WiniButton
                    ui="lineGray"
                    onClick={onAdd}
                    className="border rounded-md px-2 cursor-pointer"
                >
                    추가
                </WiniButton>
            </WiniBox>

            {(menuItems || []).map((menuItem, index) => (
                <WiniBox key={menuItem.id} className="border border-[#e1e1e1] rounded-lg p-2 mb-1 mt-2">
                    <WiniBox className="flex justify-between items-center mb-1">
                        <WiniBox className="text-s font-semibold">Item {index + 1}</WiniBox>
                        <WiniButton
                            ui="delete"
                            onClick={() => onRemove(menuItem.id)}
                            className="border border-[#ccc] bg-white rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            삭제
                        </WiniButton>
                    </WiniBox>

                    <WiniText
                        value={menuItem.value}
                        onChange={(event) => onChange(menuItem.id, { value: event.target.value })}
                        placeholder="값"
                    />
                </WiniBox>
            ))}
        </WiniBox>
    );
};