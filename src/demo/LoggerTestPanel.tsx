/**
 * 로거 테스트 패널 컴포넌트
 * 로깅 시스템의 모든 기능을 테스트할 수 있는 UI 제공
 */

import React, { useState } from 'react';
import { 
  logger,
  logComponentError,
  logValidationFailure,
  logDragDropOperation,
  logPerformance,
  logUserInteraction
} from '../utils';
import type { LogLevel } from '../types';

export function LoggerTestPanel() {
  const [currentLevel, setCurrentLevel] = useState<LogLevel>('debug');
  const [enabled, setEnabled] = useState(true);
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [testMessage, setTestMessage] = useState('Test message');

  // 로거 설정 업데이트
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

  // 테스트 함수들
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

  const testPerformance = () => {
    const startTime = performance.now();
    
    // 가짜 무거운 작업 시뮬레이션
    const heavyOperation = () => {
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
        result += Math.random();
      }
      return result;
    };

    const result = heavyOperation();
    
    logPerformance(
      'LoggerTestPanel',
      'heavyOperation',
      startTime,
             { 
         iterationCount: 1000000,
         resultValue: parseFloat(result.toFixed(2)),
         memoryUsage: ((performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize) || 0
       }
    );
  };

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

  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    margin: '4px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>🔧 Logger Test Panel</h2>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        이 패널에서 로깅 시스템의 모든 기능을 테스트할 수 있습니다. 
        브라우저 개발자 도구의 콘솔을 열어서 로그를 확인하세요.
      </p>

      {/* 로거 설정 */}
      <div style={sectionStyle}>
        <h3>⚙️ Logger Configuration</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            Logging Enabled
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={includeTimestamp}
              onChange={(e) => setIncludeTimestamp(e.target.checked)}
            />
            Include Timestamp
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Log Level:
            <select
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value as LogLevel)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warn</option>
              <option value="error">Error</option>
            </select>
          </label>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
          현재 설정: Level={currentLevel}, Enabled={enabled.toString()}, Timestamp={includeTimestamp.toString()}
        </p>
      </div>

      {/* 기본 로깅 테스트 */}
      <div style={sectionStyle}>
        <h3>📝 Basic Logging Test</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          모든 로그 레벨(debug, info, warn, error)을 순서대로 테스트합니다.
        </p>
        <button style={buttonStyle} onClick={testBasicLogging}>
          Test All Log Levels
        </button>
      </div>

      {/* 헬퍼 함수 테스트 */}
      <div style={sectionStyle}>
        <h3>🚀 Helper Functions Test</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          전문화된 로깅 헬퍼 함수들을 테스트합니다.
        </p>
        <div>
          <button style={buttonStyle} onClick={testComponentError}>
            Test Component Error
          </button>
          <button style={buttonStyle} onClick={testValidationFailure}>
            Test Validation Failure
          </button>
          <button style={buttonStyle} onClick={testDragDropOperation}>
            Test Drag & Drop Operation
          </button>
          <button style={buttonStyle} onClick={testPerformance}>
            Test Performance Logging
          </button>
          <button style={buttonStyle} onClick={testUserInteraction}>
            Test User Interaction
          </button>
        </div>
      </div>

      {/* 커스텀 메시지 테스트 */}
      <div style={sectionStyle}>
        <h3>✏️ Custom Message Test</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          원하는 메시지를 입력하여 로깅을 테스트할 수 있습니다.
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Enter your test message..."
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px'
            }}
          />
          <button style={buttonStyle} onClick={testCustomMessage}>
            Log Custom Message
          </button>
        </div>
      </div>

      {/* 로그 레벨 체크 */}
      <div style={sectionStyle}>
        <h3>🔍 Log Level Check</h3>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
          현재 설정에서 각 로그 레벨이 활성화되어 있는지 확인합니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {(['debug', 'info', 'warn', 'error'] as LogLevel[]).map((level) => (
            <div
              key={level}
              style={{
                padding: '8px',
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '12px',
                backgroundColor: logger.isEnabled(level) ? '#dcfce7' : '#fef2f2',
                color: logger.isEnabled(level) ? '#166534' : '#991b1b',
                border: `1px solid ${logger.isEnabled(level) ? '#bbf7d0' : '#fecaca'}`
              }}
            >
              {level.toUpperCase()}: {logger.isEnabled(level) ? '✅ Enabled' : '❌ Disabled'}
            </div>
          ))}
        </div>
      </div>

      {/* 사용법 안내 */}
      <div style={sectionStyle}>
        <h3>💡 How to View Logs</h3>
        <ol style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>
          <li>브라우저에서 <kbd>F12</kbd> 또는 <kbd>Cmd/Ctrl + Shift + I</kbd>를 눌러 개발자 도구를 엽니다.</li>
          <li><strong>Console</strong> 탭을 클릭합니다.</li>
          <li>위의 버튼들을 클릭하여 다양한 로그를 생성합니다.</li>
          <li>로그 레벨을 변경하여 필터링 효과를 확인합니다.</li>
          <li>로깅을 비활성화하여 성능 최적화를 테스트합니다.</li>
        </ol>
      </div>
    </div>
  );
} 