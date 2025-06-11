import type { DragState } from '../types';

/**
 * 드래그 상태 관련 유틸리티 함수들
 * 복잡한 조건문을 명명된 함수로 추상화하여 가독성 향상
 */

/**
 * 현재 탭이 드래그 중인지 확인
 */
export function isTabBeingDragged(dragState: DragState | undefined, tabId: string): boolean {
  return dragState?.draggedTabId === tabId;
}

/**
 * 특정 위치에 드래그 오버 중인지 확인
 */
export function isPositionBeingDraggedOver(
  dragState: DragState | undefined,
  panelId: string,
  index: number
): boolean {
  return Boolean(
    dragState?.dragOverPanelId === panelId && 
    dragState?.dragOverTabIndex === index
  );
}

/**
 * 드래그가 활성 상태인지 확인
 */
export function isDragActive(dragState: DragState | undefined): boolean {
  return Boolean(dragState?.isDragging);
}

/**
 * 크로스 패널 드래그인지 확인
 */
export function isCrossPanelDrag(
  dragState: DragState | undefined,
  currentPanelId: string
): boolean {
  return Boolean(
    dragState?.draggedFromPanelId && 
    dragState.draggedFromPanelId !== currentPanelId
  );
}

/**
 * 드롭 표시기가 보여져야 하는지 확인
 */
export function shouldShowDropIndicator(
  dragState: DragState | undefined,
  panelId: string,
  index: number
): boolean {
  return isPositionBeingDraggedOver(dragState, panelId, index) && isDragActive(dragState);
} 