/**
 * 유틸리티 함수들의 중앙 집중식 export
 */

export * from './dragState';
export * from './tabLayout';
export * from './styles';
export * from './messages';

import type { ScrollbarBehavior } from '../types';

/**
 * 브라우저/OS 환경에 따른 스크롤바 스타일링 감지
 */
export function getScrollbarBehavior(): ScrollbarBehavior {
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const isWebKit = 'WebkitAppearance' in document.documentElement.style;
  const isFirefox = navigator.userAgent.includes('Firefox');
  
  return {
    isMac,
    isWebKit,
    isFirefox,
    // 맥에서 스크롤바가 오버레이될 가능성이 높음
    needsScrollbarGutter: isMac && isWebKit,
    // Firefox는 자체 스크롤바 스타일링 사용
    supportsScrollbarWidth: isFirefox || CSS.supports('scrollbar-width', 'thin'),
    // 웹킷 스크롤바 스타일링 지원
    supportsWebkitScrollbar: isWebKit
  };
}

/**
 * 스크롤바 호환성을 위한 클래스명 생성
 */
export function getScrollbarClasses(): string[] {
  const behavior = getScrollbarBehavior();
  const classes = ['tab-header'];
  
  if (behavior.needsScrollbarGutter) {
    classes.push('tab-header--mac-scrollbar');
  }
  
  if (behavior.isFirefox) {
    classes.push('tab-header--firefox');
  }
  
  return classes;
} 