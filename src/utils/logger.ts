/**
 * 로깅 시스템 핵심 구현체
 * Single Responsibility 원칙: 로깅에만 집중하는 순수한 유틸리티
 * Abstraction 원칙: 복잡한 로깅 로직을 간단한 API로 추상화
 */

import type { LogLevel, LogContext, LoggerConfig, Logger, LogEntry } from '../types/logger';
import { 
  LOG_LEVEL_PRIORITY, 
  DEFAULT_LOGGER_CONFIG, 
  LOG_FORMAT,
  CONSOLE_METHOD_MAP 
} from '../constants/logger';

class DualTabPanelLogger implements Logger {
  private config: LoggerConfig = { ...DEFAULT_LOGGER_CONFIG };

  /**
   * 로거 설정 변경
   * Predictability 원칙: 설정 변경은 명시적으로만 수행
   */
  configure(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 특정 레벨의 로그가 활성화되어 있는지 확인
   * Named Complex Condition: 복잡한 조건을 명명된 함수로 추상화
   */
  isEnabled(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    
    const currentLevelPriority = LOG_LEVEL_PRIORITY[this.config.level];
    const targetLevelPriority = LOG_LEVEL_PRIORITY[level];
    
    return targetLevelPriority >= currentLevelPriority;
  }

  /**
   * 디버그 레벨 로그 출력
   */
  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  /**
   * 정보 레벨 로그 출력
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * 경고 레벨 로그 출력
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * 에러 레벨 로그 출력
   */
  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  /**
   * 로그 출력 핵심 로직
   * Implementation Detail Abstraction: 복잡한 포맷팅 로직을 내부로 추상화
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.isEnabled(level)) return;

    const logEntry = this.createLogEntry(level, message, context);
    const formattedMessage = this.formatLogMessage(logEntry);
    
    this.outputToConsole(level, formattedMessage, context?.data);
  }

  /**
   * 로그 엔트리 생성
   * Cohesion 원칙: 관련된 데이터를 하나의 구조체로 구성
   */
  private createLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      level,
      message,
      context,
      timestamp: this.config.includeTimestamp ? new Date().toISOString() : '',
    };
  }

  /**
   * 로그 메시지 포맷팅
   * Named Complex Logic: 복잡한 문자열 조합 로직을 명명된 함수로 분리
   */
  private formatLogMessage(entry: LogEntry): string {
    const parts: string[] = [];

    // 프리픽스 추가
    if (this.config.prefix) {
      parts.push(LOG_FORMAT.PREFIX_TEMPLATE.replace('{prefix}', this.config.prefix));
    }

    // 레벨 추가
    parts.push(LOG_FORMAT.LEVEL_TEMPLATE.replace('{level}', entry.level.toUpperCase()));

    // 컴포넌트 정보 추가
    if (entry.context?.component) {
      parts.push(LOG_FORMAT.COMPONENT_TEMPLATE.replace('{component}', entry.context.component));
    }

    // 액션 정보 추가
    if (entry.context?.action) {
      parts.push(`(${entry.context.action})`);
    }

    // 메시지 추가
    parts.push(entry.message);

    // 타임스탬프 추가
    if (entry.timestamp) {
      parts.push(`- ${entry.timestamp}`);
    }

    return parts.join(' ');
  }

  /**
   * 콘솔에 실제 출력
   * Single Responsibility: 콘솔 출력만을 담당하는 순수 함수
   */
  private outputToConsole(level: LogLevel, message: string, data?: unknown): void {
    const consoleMethod = CONSOLE_METHOD_MAP[level];
    const consoleFunction = console[consoleMethod] as (message?: unknown, ...optionalParams: unknown[]) => void;
    
    if (data !== undefined) {
      consoleFunction(message, data);
    } else {
      consoleFunction(message);
    }
  }
}

// 싱글톤 인스턴스 생성 및 export
// Coupling 원칙: 전역 상태를 최소화하되, 로깅의 일관성을 위해 싱글톤 사용
export const logger = new DualTabPanelLogger();

// 타입 안전성을 위한 기본 export
export default logger; 