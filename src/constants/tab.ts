/**
 * 탭 시스템 관련 상수 정의
 */

// 탭 너비 설정
export const TAB_WIDTH = {
  MIN: 100, // 탭 최소 너비 (픽셀)
  MAX: 200, // 탭 최대 너비 (픽셀)
} as const;

// 스크롤 관련 설정
export const TAB_SCROLL = {
  AMOUNT: 100, // 마우스 휠 스크롤 시 이동 거리 (픽셀)
  DROP_ZONE_MARGIN: 60, // 드롭존과 여백을 고려한 마진 (픽셀)
} as const;

// 드롭존 크기 설정
export const DROP_ZONE_WIDTH = {
  INACTIVE: 40, // 비활성 상태 최소 너비 (픽셀)
  ACTIVE: 100, // 활성 상태 최소 너비 (픽셀)
} as const;

// 애니메이션 설정
export const ANIMATION = {
  FAST_TRANSITION: '0.05s ease', // 빠른 전환 애니메이션
  NORMAL_TRANSITION: '0.1s ease', // 일반 전환 애니메이션
} as const; 