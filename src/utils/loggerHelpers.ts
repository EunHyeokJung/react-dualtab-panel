/**
 * 로깅 헬퍼 함수들
 * Abstraction 원칙: 자주 사용되는 로깅 패턴을 재사용 가능한 함수로 추상화
 * Cohesion 원칙: 로깅 관련 유틸리티들을 함께 구성
 */

import { logger } from './logger';

/**
 * 컴포넌트 에러 로깅을 위한 헬퍼
 * Named Complex Logic: 복잡한 에러 컨텍스트 생성 로직을 명명된 함수로 분리
 */
export function logComponentError(
  component: string,
  action: string,
  error: unknown,
  additionalData?: Record<string, unknown>
): void {
  logger.error('Component error occurred', {
    component,
    action,
    data: {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      ...additionalData
    }
  });
}

/**
 * 검증 실패 로깅을 위한 헬퍼
 * Single Responsibility: 유효성 검사 실패만을 담당하는 순수 함수
 */
export function logValidationFailure(
  component: string,
  action: string,
  validationData: Record<string, unknown>,
  failureReason: string
): void {
  logger.warn(`Validation failed: ${failureReason}`, {
    component,
    action,
    data: validationData
  });
}

/**
 * 드래그앤드롭 작업 로깅을 위한 헬퍼
 * Domain-Specific Helper: 드래그앤드롭 관련 로깅을 전문화
 */
export function logDragDropOperation(
  action: string,
  operationData: Record<string, unknown>,
  success: boolean = true
): void {
  const level = success ? 'debug' : 'warn';
  const message = success 
    ? `Drag and drop operation completed: ${action}`
    : `Drag and drop operation failed: ${action}`;
    
  logger[level](message, {
    component: 'DragDropSystem',
    action,
    data: operationData
  });
}

/**
 * 퍼포먼스 관련 로깅을 위한 헬퍼
 * Performance Monitoring: 성능 측정과 로깅을 결합
 */
export function logPerformance(
  component: string,
  action: string,
  startTime: number,
  additionalMetrics?: Record<string, number>
): void {
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  logger.debug('Performance measurement', {
    component,
    action,
    data: {
      duration: `${duration.toFixed(2)}ms`,
      startTime,
      endTime,
      ...additionalMetrics
    }
  });
}

/**
 * 사용자 인터랙션 로깅을 위한 헬퍼
 * User Interaction Tracking: 사용자 행동 추적을 위한 전문화된 로거
 */
export function logUserInteraction(
  component: string,
  interactionType: string,
  interactionData?: Record<string, unknown>
): void {
  logger.info(`User interaction: ${interactionType}`, {
    component,
    action: 'userInteraction',
    data: {
      interactionType,
      timestamp: new Date().toISOString(),
      ...interactionData
    }
  });
} 