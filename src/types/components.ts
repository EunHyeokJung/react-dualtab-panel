import type { DragState, DragEvents } from './index';

/**
 * 컴포넌트별 Props 타입 정의
 */

export interface DropZoneProps {
  index: number;
  panelId: string;
  dragEvents?: DragEvents;
  dragState?: DragState;
}

export interface EmptyPanelDropZoneProps {
  panelId: string;
  dragState?: DragState;
  dragEvents?: DragEvents;
  allowTabSharing?: boolean;
}

export interface TabHeaderStyleProps {
  isActive: boolean;
  isDragging: boolean;
  isBeingDraggedOver: boolean;
  width?: number;
}

export interface FlexDropZoneStyleProps {
  isDragActive: boolean;
  isBeingDraggedOver: boolean;
} 