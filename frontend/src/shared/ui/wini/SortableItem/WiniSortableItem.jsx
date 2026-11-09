import { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import WiniBox from '../Box/WiniBox';
import WiniIcon from '../Icon/WiniIcon';
import { WiniSortableContext } from '../Sortable/WiniSortable';

const UI_SX = {
  /* 라인박스 */
  line: {
    root: {
      borderRadius: size.radius.xsm,
      border: `1px solid ${color.border.default}`,
      backgroundColor: color.background.white,
      padding: `${size.margin.md} ${size.margin.lg}`,
    },
  },
};

/**
 * 드래그 정렬 항목 (WiniSortable 안에서 사용)
 * - handle: 핸들 아이콘 표시 여부
 * - handlePosition: 핸들 아이콘 위치 (left / right)
 * - dragArea="handle": 핸들 아이콘에서만 드래그 시작 (row 안에 입력창/버튼이 있을 때)
 * - dragArea="row": 아이콘은 그대로 두고 row 전체가 드래그 영역
 * - handle=false면 dragArea와 관계없이 row 전체가 드래그 영역
 */
const WiniSortableItem = ({
  id,
  ui,
  handle = true,
  dragArea = 'handle',
  handlePosition = 'left',
  handleIcon = 'drag',
  handleTitle = '드래그하여 순서 변경',
  handleClassName,
  disabled = false,
  className,
  style,
  sx: sxProp = {},
  children,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });
  const dragProps = disabled ? {} : { ...attributes, ...listeners };
  const { direction } = useContext(WiniSortableContext);
  const isHorizontal = direction === 'horizontal';
  const isRowDrag = !handle || dragArea === 'row';
  const uiTokens = getUiTokens(ui);
  const rootUiSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'root');
  const baseSx = {
    /* 항목 사이 간격 (가로 목록은 왼쪽, 세로 목록은 위쪽) */
    '&.winisortableitem:not(:first-child)': {
      [isHorizontal ? 'marginLeft' : 'marginTop']: size.margin.sm,
    },
  };
  const handleNode = handle ? (
    <WiniBox
      ref={isRowDrag ? undefined : setActivatorNodeRef}
      ui="noAutoGap"
      title={handleTitle}
      className={cn(
        'winisortableitem-handle flex shrink-0 touch-none items-center justify-center text-text-dark',
        disabled && 'cursor-not-allowed opacity-50',
        !disabled && !isRowDrag && 'cursor-grab active:cursor-grabbing',
        handleClassName,
      )}
      {...(isRowDrag ? {} : dragProps)}
    >
      {/* 가로 목록은 이동 방향(좌우)에 맞춰 아이콘을 90도 회전 */}
      <WiniIcon
        icon={handleIcon}
        className={cn('w-[20px] h-[20px]', isHorizontal && 'rotate-90')}
      />
    </WiniBox>
  ) : null;

  return (
    <WiniBox
      ref={setNodeRef}
      ui="noAutoGap"
      className={cn(
        'winisortableitem flex items-center gap-2',
        uiTokens.map((token) => `winisortableitem--${token}`),
        isRowDrag && !disabled && 'cursor-grab touch-none active:cursor-grabbing',
        isDragging && 'relative z-10 opacity-60',
        className,
      )}
      style={{
        ...style,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
      }}
      sx={(theme) => ({
        ...baseSx,
        ...(rootUiSx ?? {}),
        ...(typeof sxProp === 'function' ? sxProp(theme) : sxProp),
      })}
      {...props}
      {...(isRowDrag ? dragProps : {})}
    >
      {handlePosition !== 'right' && handleNode}
      {children}
      {handlePosition === 'right' && handleNode}
    </WiniBox>
  );
};

export default WiniSortableItem;
