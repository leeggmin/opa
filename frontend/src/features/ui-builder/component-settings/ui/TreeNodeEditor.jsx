import React from 'react';
import { WiniBox, WiniButton, WiniText } from '@/shared/ui/wini';

const TreeNodeField = ({
    node,
    depth,
    onAddChild,
    onRemove,
    onChange,
}) => {
    const children = node.children || [];

    return (
        <WiniBox className="border border-[#e1e1e1] rounded-lg p-2 mb-2" style={{ marginLeft: depth * 12 }}>
            <WiniBox className="flex justify-between items-center mb-1 gap-1">
                <WiniBox className="text-s font-semibold">노드</WiniBox>

                <WiniBox className="flex items-center gap-1">
                    <WiniButton
                        ui="lineGray"
                        onClick={() => onAddChild(node.id)}
                        className="border rounded-md px-2 cursor-pointer"
                    >
                        하위 추가
                    </WiniButton>
                    <WiniButton
                        ui="delete"
                        onClick={() => onRemove(node.id)}
                        className="border border-[#ccc] bg-white rounded-md px-1.5 py-0.5 cursor-pointer"
                    >
                        삭제
                    </WiniButton>
                </WiniBox>
            </WiniBox>

            <WiniText
                value={node.name || ''}
                onChange={(event) => onChange(node.id, { name: event.target.value })}
                placeholder="노드명"
            />

            {children.length > 0 && (
                <WiniBox className="mt-2">
                    {children.map((child) => (
                        <TreeNodeField
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            onAddChild={onAddChild}
                            onRemove={onRemove}
                            onChange={onChange}
                        />
                    ))}
                </WiniBox>
            )}
        </WiniBox>
    );
};

export const TreeNodeEditor = ({
    treeData,
    onAddRoot,
    onAddChild,
    onRemove,
    onChange,
}) => {
    return (
        <WiniBox className="border-t border-[#e3e3e3] mt-2 pt-3">
            <WiniBox className="flex justify-between items-center">
                <WiniBox className="font-semibold">Tree 노드 설정</WiniBox>
                <WiniButton
                    ui="lineGray"
                    onClick={onAddRoot}
                    className="border rounded-md px-2 cursor-pointer"
                >
                    루트 추가
                </WiniButton>
            </WiniBox>

            <WiniBox className="mt-2">
                {(treeData || []).map((node) => (
                    <TreeNodeField
                        key={node.id}
                        node={node}
                        depth={0}
                        onAddChild={onAddChild}
                        onRemove={onRemove}
                        onChange={onChange}
                    />
                ))}
            </WiniBox>
        </WiniBox>
    );
};
