import { Fragment, createContext } from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@/shared/lib/cn';
import WiniBox from '../Box/WiniBox';

const DIRECTION_CONFIG = {
  vertical: {
    strategy: verticalListSortingStrategy,
    modifiers: [restrictToVerticalAxis, restrictToParentElement],
  },
  horizontal: {
    strategy: horizontalListSortingStrategy,
    modifiers: [restrictToHorizontalAxis, restrictToParentElement],
  },
};

/** WiniSortableItem이 목록 방향을 알 수 있도록 전달 */
export const WiniSortableContext = createContext({ direction: 'vertical' });

const defaultGetItemId = (item) => item?.id;

/**
 * 드래그 정렬 목록
 * - children은 (item, index) => <WiniSortableItem id={...} /> 형태의 함수
 * - direction="horizontal"이면 항목을 가로로 배치하고 좌우로 이동
 * - WiniSortable 하나가 하나의 정렬 영역이며, 서로 다른 WiniSortable 사이로는 이동하지 않음
 */
const WiniSortable = ({
  items = [],
  getItemId = defaultGetItemId,
  onMove,
  onChange,
  direction = 'vertical',
  modifiers,
  disabled = false,
  className,
  children,
}) => {
  const isHorizontal = direction === 'horizontal';
  const directionConfig = isHorizontal ? DIRECTION_CONFIG.horizontal : DIRECTION_CONFIG.vertical;
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );
  const itemIds = items.map(getItemId);

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = itemIds.indexOf(active.id);
    const newIndex = itemIds.indexOf(over.id);

    if (oldIndex < 0 || newIndex < 0) return;

    onMove?.(active.id, over.id, { oldIndex, newIndex });
    onChange?.(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={modifiers ?? directionConfig.modifiers}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={itemIds} strategy={directionConfig.strategy} disabled={disabled}>
        <WiniSortableContext.Provider value={{ direction: isHorizontal ? 'horizontal' : 'vertical' }}>
          <WiniBox
            ui="noAutoGap"
            className={cn(
              'winisortable',
              isHorizontal && 'winisortable--horizontal flex items-stretch',
              className,
            )}
          >
            {items.map((item, index) => (
              <Fragment key={itemIds[index]}>{children?.(item, index)}</Fragment>
            ))}
          </WiniBox>
        </WiniSortableContext.Provider>
      </SortableContext>
    </DndContext>
  );
};

export default WiniSortable;
