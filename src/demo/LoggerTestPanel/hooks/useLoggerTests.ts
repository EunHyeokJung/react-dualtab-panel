/**
 * 로거 테스트 함수들을 관리하는 훅
 * @toss-frontend-fundamentals: "Abstracting Implementation Details" 원칙 적용
 */

import { useState } from 'react';
import { 
  logger,
  logComponentError,
  logValidationFailure,
  logDragDropOperation,
  logPerformance,
  logUserInteraction
} from '../../../utils';
import { getMemoryUsage } from '../utils/performanceUtils';

export function useLoggerTests() {
  const [testMessage, setTestMessage] = useState('Test message');

  // 기본 로깅 테스트 (단일 책임)
  const testBasicLogging = () => {
    logger.debug('디버그 메시지입니다', {
      component: 'LoggerTestPanel',
      action: 'testBasicLogging',
      data: { testData: 'debug info' }
    });

    logger.info('정보 메시지입니다', {
      component: 'LoggerTestPanel',
      action: 'testBasicLogging'
    });

    logger.warn('경고 메시지입니다', {
      component: 'LoggerTestPanel',
      action: 'testBasicLogging',
      data: { warning: 'something might be wrong' }
    });

    logger.error('에러 메시지입니다', {
      component: 'LoggerTestPanel',
      action: 'testBasicLogging',
      data: { error: 'something went wrong' }
    });
  };

  // 컴포넌트 에러 테스트 (단일 책임)
  const testComponentError = () => {
    const mockError = new Error('Mock error for testing');
    mockError.stack = 'MockError: at testComponentError (LoggerTestPanel.tsx:65:25)';
    
    logComponentError(
      'LoggerTestPanel',
      'testComponentError',
      mockError,
      { context: 'Error testing', userId: 'demo-user' }
    );
  };

  // 검증 실패 테스트 (단일 책임)
  const testValidationFailure = () => {
    logValidationFailure(
      'LoggerTestPanel',
      'testValidation',
      {
        input: 'invalid-data',
        expectedFormat: 'email',
        actualValue: testMessage
      },
      'Invalid email format provided'
    );
  };

  // 드래그앤드롭 테스트 (단일 책임)
  const testDragDropOperation = () => {
    // 성공 케이스
    logDragDropOperation('tabMove', {
      fromPanel: 'panel-1',
      toPanel: 'panel-2',
      tabId: 'test-tab-123',
      fromIndex: 0,
      toIndex: 2
    }, true);

    // 실패 케이스
    setTimeout(() => {
      logDragDropOperation('tabMove', {
        fromPanel: 'panel-1',
        toPanel: 'invalid-panel',
        tabId: 'test-tab-123',
        reason: 'Target panel not found'
      }, false);
    }, 100);
  };

  // 성능 테스트 (복잡한 로직을 추상화)
  const testPerformance = () => {
    const startTime = performance.now();
    
    // 무거운 작업 시뮬레이션을 별도 함수로 추상화
    const performHeavyOperation = () => {
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      return result;
    };

    const result = performHeavyOperation();
    
    logPerformance(
      'LoggerTestPanel',
      'heavyOperation',
      startTime,
      { 
        iterationCount: 1000000,
        resultValue: parseFloat(result.toFixed(2)),
        memoryUsage: getMemoryUsage() // 복잡한 타입 캐스팅을 유틸리티로 추상화
      }
    );
  };

  // 사용자 상호작용 테스트 (단일 책임)
  const testUserInteraction = () => {
    logUserInteraction(
      'LoggerTestPanel',
      'buttonClick',
      {
        buttonType: 'test-user-interaction',
        sessionId: 'demo-session-123',
        timestamp: Date.now()
      }
    );
  };

  // 커스텀 메시지 테스트 (입력 검증 포함)
  const testCustomMessage = () => {
    if (!testMessage.trim()) {
      logger.warn('Empty message provided');
      return;
    }

    logger.info(testMessage, {
      component: 'LoggerTestPanel',
      action: 'testCustomMessage',
      data: { customInput: true, messageLength: testMessage.length }
    });
  };

  return {
    testMessage,
    setTestMessage,
    testBasicLogging,
    testComponentError,
    testValidationFailure,
    testDragDropOperation,
    testPerformance,
    testUserInteraction,
    testCustomMessage,
  };
} 