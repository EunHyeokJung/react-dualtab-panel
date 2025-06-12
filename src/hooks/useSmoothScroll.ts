import { useRef, useCallback } from 'react';
import { TAB_SCROLL } from '../constants/tab';

/**
 * 부드러운 스크롤 애니메이션을 위한 커스텀 훅
 * requestAnimationFrame을 활용하여 성능 최적화된 스크롤 제공
 */

interface SmoothScrollConfig {
  /** 애니메이션 속도 (0.1-0.3, 기본값: 0.15) */
  animationSpeed?: number;
  /** 애니메이션 완료 임계값 (픽셀, 기본값: 1) */
  completionThreshold?: number;
}

interface SmoothScrollReturn {
  /** 부드러운 스크롤을 실행하는 함수 */
  smoothScrollTo: (targetScroll: number, containerRef: React.RefObject<HTMLElement | null>) => void;
  /** 스크롤 이벤트 리스너 설정 함수 */
  setupScrollListener: (containerRef: React.RefObject<HTMLElement | null>, needsScroll: boolean) => () => void;
  /** 훅 정리 함수 (컴포넌트 언마운트 시 호출) */
  cleanup: () => void;
}

export function useSmoothScroll(config: SmoothScrollConfig = {}): SmoothScrollReturn {
  const {
    animationSpeed = SMOOTH_SCROLL_CONFIG.ANIMATION_SPEED,
    completionThreshold = SMOOTH_SCROLL_CONFIG.COMPLETION_THRESHOLD
  } = config;

  // 애니메이션 상태 관리
  const animationFrameRef = useRef<number | null>(null);
  const targetScrollRef = useRef<number>(0);38588
  
  const currentScrollRef = useRef<number>(0);

  /**
   * 부드러운 스크롤 애니메이션 실행
   */
  const smoothScrollTo = useCallback((targetScroll: number, containerRef: React.RefObject<HTMLElement | null>) => {
    if (!containerRef.current) return;
    
    const scrollContainer = containerRef.current;
    
    // 스크롤 범위 제한
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    targetScrollRef.current = Math.max(0, Math.min(targetScroll, maxScroll));
    
    // 이전 애니메이션 취소
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    const animate = () => {
      if (!containerRef.current) return;
      
      const current = currentScrollRef.current;
      const target = targetScrollRef.current;
      const difference = target - current;
      
      // 애니메이션 완료 조건
      if (Math.abs(difference) < completionThreshold) {
        scrollContainer.scrollLeft = target;
        currentScrollRef.current = target;
        animationFrameRef.current = null;
        return;
      }
      
      // Exponential decay easing
      const step = difference * animationSpeed;
      const newScroll = current + step;
      
      scrollContainer.scrollLeft = newScroll;
      currentScrollRef.current = newScroll;
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // 현재 스크롤 위치로 애니메이션 시작
    currentScrollRef.current = scrollContainer.scrollLeft;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animationSpeed, completionThreshold]);

  /**
   * 스크롤 이벤트 리스너 설정 함수
   */
  const setupScrollListener = useCallback((
    containerRef: React.RefObject<HTMLElement | null>, 
    needsScroll: boolean
  ) => {
    if (!containerRef.current || !needsScroll) return () => {};
    
    const element = containerRef.current;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollAmount = e.deltaY > 0 ? TAB_SCROLL.AMOUNT : -TAB_SCROLL.AMOUNT;
      
      // 목표 스크롤 위치 계산 (연속 스크롤 지원)
      const currentTarget = targetScrollRef.current || element.scrollLeft;
      const newTarget = currentTarget + scrollAmount;
      
      smoothScrollTo(newTarget, containerRef);
    };
    
    // passive: false로 preventDefault 허용
    element.addEventListener('wheel', handleWheel, { passive: false });
    
    // cleanup 함수 반환
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [smoothScrollTo]);

  /**
   * 리소스 정리 함수
   */
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    smoothScrollTo,
    setupScrollListener,
    cleanup
  };
}

// 설정 상수 (매직 넘버 제거)
const SMOOTH_SCROLL_CONFIG = {
  /** 애니메이션 속도 (15%씩 이동) */
  ANIMATION_SPEED: 0.15,
  /** 애니메이션 완료 임계값 (1px 이하 차이) */
  COMPLETION_THRESHOLD: 1,
} as const; 