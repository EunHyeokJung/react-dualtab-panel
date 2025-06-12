/**
 * 성능 측정 관련 유틸리티 함수들
 * @toss-frontend-fundamentals: "Abstracting Implementation Details" 원칙 적용
 */

interface PerformanceMemory {
  memory?: {
    usedJSHeapSize?: number;
  };
}

/**
 * 메모리 사용량을 안전하게 가져오는 함수
 * 복잡한 타입 캐스팅을 추상화하여 타입 안전성 향상
 */
export function getMemoryUsage(): number {
  try {
    const performanceWithMemory = performance as unknown as PerformanceMemory;
    return performanceWithMemory.memory?.usedJSHeapSize || 0;
  } catch {
    // 메모리 정보가 없는 환경에서는 0 반환
    return 0;
  }
} 