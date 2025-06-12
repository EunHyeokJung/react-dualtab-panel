/**
 * 로깅 시스템 상수 정의
 * Readability 원칙: 매직 넘버를 명명된 상수로 대체하여 의미를 명확히 함
 */

import type { LogLevel, LoggerConfig } from '../types/logger';

// 로그 레벨 우선순위 - 숫자가 높을수록 중요한 로그
export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const;

// 개발 환경 감지 - process.env 대신 안전한 방법 사용
const isDevelopment = (() => {
  try {
    return import.meta?.env?.DEV ?? false;
  } catch {
    return false;
  }
})();

// 기본 로깅 설정
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  enabled: true,
  level: isDevelopment ? 'debug' : 'warn',
  prefix: 'react-dualtab-panel',
  includeTimestamp: isDevelopment,
} as const;

// 로그 포맷 템플릿
export const LOG_FORMAT = {
  PREFIX_TEMPLATE: '[{prefix}]',
  LEVEL_TEMPLATE: '{level}',
  COMPONENT_TEMPLATE: '[{component}]',
  MESSAGE_TEMPLATE: '{message}',
  TIMESTAMP_TEMPLATE: '{timestamp}',
  DATA_TEMPLATE: '{data}',
} as const;

// 콘솔 메서드 매핑
export const CONSOLE_METHOD_MAP: Record<LogLevel, keyof Console> = {
  debug: 'debug',
  info: 'info', 
  warn: 'warn',
  error: 'error',
} as const; 