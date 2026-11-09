import { BoxProps } from '@mui/material';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface WiniSortableItemProps extends Omit<BoxProps, 'id'> {
  id: UniqueIdentifier;
  ui?: string | string[];
  handle?: boolean;
  dragArea?: 'handle' | 'row';
  handlePosition?: 'left' | 'right';
  handleIcon?: string;
  handleTitle?: string;
  handleClassName?: string;
  disabled?: boolean;
}

declare function WiniSortableItem(props: WiniSortableItemProps): JSX.Element;

export default WiniSortableItem;
