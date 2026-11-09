import React from 'react';
import { WiniBox, WiniButton, WiniGridItem, WiniGridLayout, WiniText } from '@/shared/ui/wini';

export const GridColumnEditor = ({
    gridColumns,
    onAdd,
    onRemove,
    onChange,
}) => {
    return (
        <WiniBox className="border-t border-[#e3e3e3] mt-2 pt-3">
            <WiniBox className="flex justify-between items-center">
                <WiniBox className="font-semibold">Grid 컬럼 설정</WiniBox>
                <WiniButton
                    ui="lineGray"
                    onClick={onAdd}
                    className="border rounded-md px-2 cursor-pointer"
                >
                    컬럼 추가
                </WiniButton>
            </WiniBox>

            {(gridColumns || []).map((column, index) => (
                <WiniBox key={column.id} className="border border-[#e1e1e1] rounded-lg p-2 mb-1 mt-2">
                    <WiniBox className="flex justify-between">
                        <WiniBox className="text-s font-semibold">컬럼 {index + 1}</WiniBox>
                        <WiniButton
                            ui="delete"
                            onClick={() => onRemove(column.id)}
                            className="border border-[#ccc] bg-white rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            삭제
                        </WiniButton>
                    </WiniBox>

                    <WiniGridLayout container ui="form" rowItem={1} rowSpacing={1}>
                        <WiniGridItem>
                            <WiniText
                                value={column.name}
                                onChange={(event) => onChange(column.id, { name: event.target.value })}
                                placeholder="컬럼명"
                            />
                        </WiniGridItem>
                        <WiniGridItem>
                            <WiniText
                                value={column.value || ''}
                                onChange={(event) => onChange(column.id, { value: event.target.value })}
                                placeholder="컬럼 값 예시"
                            />
                        </WiniGridItem>
                        <WiniGridItem>
                            <WiniText
                                value={column.condition || ''}
                                onChange={(event) => onChange(column.id, { condition: event.target.value })}
                                placeholder="컬럼 속성"
                            />
                        </WiniGridItem>
                    </WiniGridLayout>
                </WiniBox>
            ))}
        </WiniBox>
    );
};