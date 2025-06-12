/**
 * 로거 테스트 패널 - 리팩토링된 버전
 * @toss-frontend-fundamentals 원칙 적용:
 * - Abstracting Implementation Details: 복잡한 로직을 커스텀 훅으로 분리
 * - Separating Code Paths: 각 섹션을 별도 컴포넌트로 분리
 * - Organizing Code by Feature: 관련 기능들을 함께 구조화
 * - Scoping State Management: 상태를 책임별로 분리
 */

import React from 'react';
import { LoggerConfigSection } from './components/LoggerConfigSection';
import { useLoggerConfig } from './hooks/useLoggerConfig';
import { useLoggerTests } from './hooks/useLoggerTests';
import { SECTION_STYLE, BUTTON_STYLE, SPACING, COLORS } from './constants/styles';
import { logger } from '../../utils';
import type { LogLevel } from '../../types';

// 기본 테스트 섹션 컴포넌트 (단일 책임)
function BasicTestSection({ onTest }: { onTest: () => void }) {
  return (
    <div style={SECTION_STYLE}>
      <h3>📝 Basic Logging Test</h3>
      <p style={{ fontSize: '14px', color: COLORS.TEXT_SECONDARY, marginBottom: '12px' }}>
        모든 로그 레벨(debug, info, warn, error)을 순서대로 테스트합니다.
      </p>
      <button style={BUTTON_STYLE} onClick={onTest}>
        Test All Log Levels
      </button>
    </div>
  );
}

// 헬퍼 함수 테스트 섹션 컴포넌트 (단일 책임)
function HelperTestSection({ 
  onComponentError,
  onValidationFailure, 
  onDragDrop,
  onPerformance,
  onUserInteraction
}: {
  onComponentError: () => void;
  onValidationFailure: () => void;
  onDragDrop: () => void;
  onPerformance: () => void;
  onUserInteraction: () => void;
}) {
  return (
    <div style={SECTION_STYLE}>
      <h3>🚀 Helper Functions Test</h3>
      <p style={{ fontSize: '14px', color: COLORS.TEXT_SECONDARY, marginBottom: '12px' }}>
        전문화된 로깅 헬퍼 함수들을 테스트합니다.
      </p>
      <div>
        <button style={BUTTON_STYLE} onClick={onComponentError}>
          Test Component Error
        </button>
        <button style={BUTTON_STYLE} onClick={onValidationFailure}>
          Test Validation Failure
        </button>
        <button style={BUTTON_STYLE} onClick={onDragDrop}>
          Test Drag & Drop Operation
        </button>
        <button style={BUTTON_STYLE} onClick={onPerformance}>
          Test Performance Logging
        </button>
        <button style={BUTTON_STYLE} onClick={onUserInteraction}>
          Test User Interaction
        </button>
      </div>
    </div>
  );
}

// 커스텀 메시지 테스트 섹션 컴포넌트 (단일 책임)
function CustomTestSection({ 
  message, 
  onMessageChange, 
  onTest 
}: { 
  message: string; 
  onMessageChange: (message: string) => void;
  onTest: () => void;
}) {
  return (
    <div style={SECTION_STYLE}>
      <h3>✏️ Custom Message Test</h3>
      <p style={{ fontSize: '14px', color: COLORS.TEXT_SECONDARY, marginBottom: '12px' }}>
        원하는 메시지를 입력하여 로깅을 테스트할 수 있습니다.
      </p>
      <div style={{ display: 'flex', gap: SPACING.SM, alignItems: 'center' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Enter your test message..."
          style={{
            flex: 1,
            padding: `${SPACING.SM} ${SPACING.MD}`,
            borderRadius: '6px',
            border: `1px solid ${COLORS.BORDER}`,
            fontSize: '14px'
          }}
        />
        <button style={BUTTON_STYLE} onClick={onTest}>
          Log Custom Message
        </button>
      </div>
    </div>
  );
}

// 로그 레벨 상태 표시 컴포넌트 (단일 책임)
function LogLevelIndicator() {
  const logLevels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
  
  return (
    <div style={SECTION_STYLE}>
      <h3>🔍 Log Level Check</h3>
      <p style={{ fontSize: '14px', color: COLORS.TEXT_SECONDARY, marginBottom: '12px' }}>
        현재 설정에서 각 로그 레벨이 활성화되어 있는지 확인합니다.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: SPACING.SM }}>
        {logLevels.map((level) => {
          const isEnabled = logger.isEnabled(level);
          return (
            <div
              key={level}
              style={{
                padding: SPACING.SM,
                borderRadius: '4px',
                textAlign: 'center',
                fontSize: '12px',
                backgroundColor: isEnabled ? COLORS.SUCCESS_BG : COLORS.ERROR_BG,
                color: isEnabled ? COLORS.SUCCESS_TEXT : COLORS.ERROR_TEXT,
                border: `1px solid ${isEnabled ? COLORS.SUCCESS_BORDER : COLORS.ERROR_BORDER}`
              }}
            >
              {level.toUpperCase()}: {isEnabled ? '✅ Enabled' : '❌ Disabled'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 사용법 안내 컴포넌트 (단일 책임)
function UsageGuideSection() {
  return (
    <div style={SECTION_STYLE}>
      <h3>💡 How to View Logs</h3>
      <ol style={{ fontSize: '14px', color: COLORS.TEXT_PRIMARY, lineHeight: '1.6' }}>
        <li>브라우저에서 <kbd>F12</kbd> 또는 <kbd>Cmd/Ctrl + Shift + I</kbd>를 눌러 개발자 도구를 엽니다.</li>
        <li><strong>Console</strong> 탭을 클릭합니다.</li>
        <li>위의 버튼들을 클릭하여 다양한 로그를 생성합니다.</li>
        <li>로그 레벨을 변경하여 필터링 효과를 확인합니다.</li>
        <li>로깅을 비활성화하여 성능 최적화를 테스트합니다.</li>
      </ol>
    </div>
  );
}

// 메인 컴포넌트 - 컴포넌트 조합 패턴 사용
export function LoggerTestPanel() {
  // 상태 관리를 별도 훅으로 분리 (Low Coupling)
  const loggerConfig = useLoggerConfig();
  const loggerTests = useLoggerTests();

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>🔧 Logger Test Panel</h2>
      <p style={{ color: COLORS.TEXT_SECONDARY, marginBottom: SPACING.LG }}>
        이 패널에서 로깅 시스템의 모든 기능을 테스트할 수 있습니다. 
        브라우저 개발자 도구의 콘솔을 열어서 로그를 확인하세요.
      </p>

      {/* 각 섹션을 별도 컴포넌트로 분리 (High Cohesion) */}
      <LoggerConfigSection
        currentLevel={loggerConfig.currentLevel}
        enabled={loggerConfig.enabled}
        includeTimestamp={loggerConfig.includeTimestamp}
        onLevelChange={loggerConfig.setCurrentLevel}
        onEnabledChange={loggerConfig.setEnabled}
        onTimestampChange={loggerConfig.setIncludeTimestamp}
      />

      <BasicTestSection onTest={loggerTests.testBasicLogging} />

      <HelperTestSection
        onComponentError={loggerTests.testComponentError}
        onValidationFailure={loggerTests.testValidationFailure}
        onDragDrop={loggerTests.testDragDropOperation}
        onPerformance={loggerTests.testPerformance}
        onUserInteraction={loggerTests.testUserInteraction}
      />

      <CustomTestSection
        message={loggerTests.testMessage}
        onMessageChange={loggerTests.setTestMessage}
        onTest={loggerTests.testCustomMessage}
      />

      <LogLevelIndicator />

      <UsageGuideSection />
    </div>
  );
} 