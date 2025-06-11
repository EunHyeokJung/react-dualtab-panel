import { TAB_WIDTH, TAB_SCROLL } from '../constants/tab';

/**
 * 탭 레이아웃 계산 관련 유틸리티
 */

export interface TabLayoutResult {
  tabWidths: Record<string, number>;
  needsScroll: boolean;
}

/**
 * 패널 너비와 탭 개수를 기반으로 탭 레이아웃을 계산
 * 
 * @param containerWidth 탭 헤더 컨테이너의 너비
 * @param tabIds 탭 ID 배열
 * @returns 계산된 탭 너비들과 스크롤 필요 여부
 */
export function calculateTabLayout(
  containerWidth: number,
  tabIds: string[]
): TabLayoutResult {
  const totalTabsCount = tabIds.length;
  
  if (totalTabsCount === 0) {
    return { tabWidths: {}, needsScroll: false };
  }

  // 드롭존과 여백을 고려한 사용 가능한 너비
  const availableWidth = containerWidth - TAB_SCROLL.DROP_ZONE_MARGIN;
  
  // 모든 탭이 최대 너비를 가질 수 있는지 확인
  const maxTotalWidth = totalTabsCount * TAB_WIDTH.MAX;
  
  let calculatedWidth: number = TAB_WIDTH.MAX;
  let shouldScroll = false;

  if (maxTotalWidth > availableWidth) {
    // 사용 가능한 너비에 맞춰 탭 너비 계산
    calculatedWidth = Math.max(TAB_WIDTH.MIN, availableWidth / totalTabsCount);
    
    // 최소 너비에 도달하면 스크롤 활성화
    if (calculatedWidth <= TAB_WIDTH.MIN) {
      calculatedWidth = TAB_WIDTH.MIN;
      shouldScroll = true;
    }
  }

  // 모든 탭에 동일한 너비 적용
  const tabWidths: Record<string, number> = {};
  tabIds.forEach(tabId => {
    tabWidths[tabId] = calculatedWidth;
  });

  return {
    tabWidths,
    needsScroll: shouldScroll
  };
} 