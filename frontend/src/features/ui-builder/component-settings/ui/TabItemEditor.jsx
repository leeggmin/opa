import React from 'react';
import { WiniBox, WiniButton, WiniGridItem, WiniGridLayout, WiniText } from '@/shared/ui/wini';

export const TabItemEditor = ({
    tabItems,
    onAdd,
    onRemove,
    onChange,
}) => {
    return (
        <WiniBox className="border-t border-[#e3e3e3] mt-2 pt-3">
            <WiniBox className="flex justify-between items-center">
                <WiniBox className="font-semibold">Tab 항목 설정</WiniBox>
                <WiniButton
                    ui="lineGray"
                    onClick={onAdd}
                    className="border rounded-md px-2 cursor-pointer"
                >
                    Tab 추가
                </WiniButton>
            </WiniBox>

            {(tabItems || []).map((tabItem, index) => (
                <WiniBox key={tabItem.id} className="border border-[#e1e1e1] rounded-lg p-2 mb-1 mt-2">
                    <WiniBox className="flex justify-between">
                        <WiniBox className="text-s font-semibold">탭 {index + 1}</WiniBox>
                        <WiniButton
                            ui="delete"
                            onClick={() => onRemove(tabItem.id)}
                            className="border border-[#ccc] bg-white rounded-md px-1.5 py-0.5 cursor-pointer"
                        >
                            삭제
                        </WiniButton>
                    </WiniBox>

                    <WiniGridLayout container ui="form" rowItem={1} rowSpacing={1}>
                        <WiniGridItem>
                            <WiniText
                                value={tabItem.label || ''}
                                onChange={(event) => onChange(tabItem.id, { label: event.target.value })}
                                placeholder="탭 라벨"
                            />
                        </WiniGridItem>
                        <WiniGridItem>
                            <WiniText
                                value={tabItem.value || ''}
                                onChange={(event) => onChange(tabItem.id, { value: event.target.value })}
                                placeholder="탭 값"
                            />
                        </WiniGridItem>
                        <WiniGridItem>
                            <WiniText
                                value={tabItem.event || ''}
                                onChange={(event) => onChange(tabItem.id, { event: event.target.value })}
                                placeholder="클릭 이벤트 함수명"
                            />
                        </WiniGridItem>
                    </WiniGridLayout>
                </WiniBox>
            ))}
        </WiniBox>
    );
};
