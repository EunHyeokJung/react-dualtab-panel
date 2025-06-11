/**
 * 사용자 메시지 생성 관련 유틸리티
 */

/**
 * 빈 패널의 드롭 메시지를 생성
 */
export function getEmptyPanelDropMessage(
  isDragActive: boolean,
  allowTabSharing: boolean
): string {
  if (!isDragActive) {
    return 'This panel is empty';
  }
  
  if (!allowTabSharing) {
    return 'You can\'t move tabs between panels';
  }
  
  return 'Drop here to add the tab';
} 