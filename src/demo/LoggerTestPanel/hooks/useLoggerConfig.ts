/**
 * 로거 설정 관리 훅
 * @toss-frontend-fundamentals: "Scoping State Management" 원칙 적용
 */

import React, { useState } from 'react';
import { logger } from '../../../utils';
import type { LogLevel } from '../../../types';

interface LoggerConfigState {
  currentLevel: LogLevel;
  enabled: boolean;
  includeTimestamp: boolean;
}

interface LoggerConfigActions {
  setCurrentLevel: (level: LogLevel) => void;
  setEnabled: (enabled: boolean) => void;
  setIncludeTimestamp: (includeTimestamp: boolean) => void;
}

type UseLoggerConfigReturn = LoggerConfigState & LoggerConfigActions;

export function useLoggerConfig(): UseLoggerConfigReturn {
  const [currentLevel, setCurrentLevel] = useState<LogLevel>('debug');
  const [enabled, setEnabled] = useState(true);
  const [includeTimestamp, setIncludeTimestamp] = useState(true);

  // 로거 설정 업데이트 (단일 책임)
  const updateLoggerConfig = React.useCallback(() => {
    logger.configure({
      level: currentLevel,
      enabled,
      includeTimestamp,
      prefix: 'react-dualtab-panel'
    });
  }, [currentLevel, enabled, includeTimestamp]);

  React.useEffect(() => {
    updateLoggerConfig();
  }, [updateLoggerConfig]);

  return {
    currentLevel,
    enabled,
    includeTimestamp,
    setCurrentLevel,
    setEnabled,
    setIncludeTimestamp,
  };
} 