/**
 * 로깅 시스템 타입 정의
 * Predictability 원칙: 일관된 반환 타입과 명확한 인터페이스 제공
 */

// 로그 레벨 - 명시적인 문자열 리터럴 타입
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 로그 컨텍스트 - 구조화된 메타데이터
export interface LogContext {
  component?: string;
  action?: string;
  data?: unknown;
  timestamp?: string;
}

// 로깅 설정 - 사용자가 제어할 수 있는 옵션들
export interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  prefix: string;
  includeTimestamp: boolean;
}

// 로그 엔트리 - 내부적으로 사용되는 로그 데이터 구조
export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: LogContext;
  timestamp: string;
}

// 로거 인터페이스 - 일관된 API 제공
export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  configure(config: Partial<LoggerConfig>): void;
  isEnabled(level: LogLevel): boolean;
} 