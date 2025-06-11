import { DROP_ZONE_WIDTH, ANIMATION } from '../constants/tab';
import type { TabHeaderStyleProps, FlexDropZoneStyleProps } from '../types/components';

/**
 * CSS 클래스명과 스타일 계산 유틸리티
 */

/**
 * 탭 헤더의 CSS 클래스명을 생성
 */
export function getTabHeaderClasses({ 
  isActive, 
  isDragging, 
  isBeingDraggedOver 
}: TabHeaderStyleProps): string {
  const classes = ['tab-header__item'];
  
  if (isActive) classes.push('tab-header__item--active');
  if (isDragging) classes.push('tab-header__item--dragging');
  if (isBeingDraggedOver) classes.push('tab-header__item--drag-over');
  
  return classes.join(' ');
}

/**
 * FlexDropZone의 CSS 클래스명을 생성
 */
export function getFlexDropZoneClasses({ isDragActive }: FlexDropZoneStyleProps): string {
  const classes = ['tab-header__flex-drop-zone'];
  
  if (isDragActive) {
    classes.push('tab-header__flex-drop-zone--active');
  }
  
  return classes.join(' ');
}

/**
 * FlexDropZone의 인라인 스타일을 계산
 */
export function getFlexDropZoneStyle({ 
  isDragActive 
}: Pick<FlexDropZoneStyleProps, 'isDragActive'>): React.CSSProperties {
  return {
    position: 'relative',
    minWidth: isDragActive ? `${DROP_ZONE_WIDTH.ACTIVE}px` : `${DROP_ZONE_WIDTH.INACTIVE}px`,
    opacity: isDragActive ? 1 : 0.01, // 거의 투명하지만 이벤트는 감지
    transition: isDragActive ? ANIMATION.FAST_TRANSITION : 'none', // 드래그 시작 시 즉시 확장
  };
}

/**
 * 빈 패널 드롭존의 CSS 클래스명을 생성
 */
export function getEmptyPanelDropZoneClasses(
  isDragActive: boolean,
  isBeingDraggedOver: boolean
): string {
  const classes = ['tab-content__empty'];
  
  if (isBeingDraggedOver) {
    classes.push('tab-content__empty--drag-over');
  } else if (isDragActive) {
    classes.push('tab-content__empty--drag-active');
  }
  
  return classes.join(' ');
} 