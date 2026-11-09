import { ReactNode } from 'react';
import { Modifiers, UniqueIdentifier } from '@dnd-kit/core';

export interface WiniSortableProps<T = unknown> {
  items: T[];
  getItemId?: (item: T) => UniqueIdentifier;
  onMove?: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    info: { oldIndex: number; newIndex: number },
  ) => void;
  onChange?: (nextItems: T[]) => void;
  direction?: 'vertical' | 'horizontal';
  modifiers?: Modifiers;
  className?: string;
  disabled?: boolean;
  children: (item: T, index: number) => ReactNode;
}

declare function WiniSortable<T = unknown>(props: WiniSortableProps<T>): JSX.Element;

export default WiniSortable;
