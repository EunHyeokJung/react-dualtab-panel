/**
 * 로거 설정 섹션 컴포넌트
 * @toss-frontend-fundamentals: "Separating Code Paths for Conditional Rendering" 원칙 적용
 */

import React from 'react';
import type { LogLevel } from '../../../types';
import { SECTION_STYLE, SPACING, COLORS } from '../constants/styles';

interface LoggerConfigSectionProps {
  currentLevel: LogLevel;
  enabled: boolean;
  includeTimestamp: boolean;
  onLevelChange: (level: LogLevel) => void;
  onEnabledChange: (enabled: boolean) => void;
  onTimestampChange: (includeTimestamp: boolean) => void;
}

export function LoggerConfigSection({
  currentLevel,
  enabled,
  includeTimestamp,
  onLevelChange,
  onEnabledChange,
  onTimestampChange,
}: LoggerConfigSectionProps) {
  return (
    <div style={SECTION_STYLE}>
      <h3>⚙️ Logger Configuration</h3>
      <div style={{ 
        display: 'flex', 
        gap: SPACING.MD, 
        flexWrap: 'wrap', 
        alignItems: 'center' 
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: SPACING.SM }}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onEnabledChange(e.target.checked)}
          />
          Logging Enabled
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: SPACING.SM }}>
          <input
            type="checkbox"
            checked={includeTimestamp}
            onChange={(e) => onTimestampChange(e.target.checked)}
          />
          Include Timestamp
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: SPACING.SM }}>
          Log Level:
          <select
            value={currentLevel}
            onChange={(e) => onLevelChange(e.target.value as LogLevel)}
            style={{ 
              padding: `${SPACING.XS} ${SPACING.SM}`, 
              borderRadius: '4px', 
              border: `1px solid ${COLORS.BORDER}` 
            }}
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </label>
      </div>
      <p style={{ 
        fontSize: '12px', 
        color: COLORS.TEXT_SECONDARY, 
        marginTop: SPACING.SM 
      }}>
        현재 설정: Level={currentLevel}, Enabled={enabled.toString()}, Timestamp={includeTimestamp.toString()}
      </p>
    </div>
  );
} 