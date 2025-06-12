/**
 * 로거 테스트 패널 스타일 상수
 * @toss-frontend-fundamentals: "Naming Magic Numbers" 원칙 적용
 */

export const SPACING = {
  XS: '4px',
  SM: '8px',
  MD: '16px',
  LG: '24px',
} as const;

export const BORDER_RADIUS = {
  SM: '4px',
  MD: '6px',
  LG: '8px',
} as const;

export const COLORS = {
  BORDER: '#d1d5db',
  BACKGROUND_LIGHT: '#f9fafb',
  BACKGROUND_WHITE: '#ffffff',
  TEXT_SECONDARY: '#6b7280',
  TEXT_PRIMARY: '#374151',
  SUCCESS_BG: '#dcfce7',
  SUCCESS_TEXT: '#166534',
  SUCCESS_BORDER: '#bbf7d0',
  ERROR_BG: '#fef2f2',
  ERROR_TEXT: '#991b1b',
  ERROR_BORDER: '#fecaca',
} as const;

export const BUTTON_STYLE: React.CSSProperties = {
  padding: `${SPACING.SM} ${SPACING.MD}`,
  margin: SPACING.XS,
  borderRadius: BORDER_RADIUS.MD,
  border: `1px solid ${COLORS.BORDER}`,
  backgroundColor: COLORS.BACKGROUND_WHITE,
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s ease',
};

export const SECTION_STYLE: React.CSSProperties = {
  marginBottom: SPACING.LG,
  padding: SPACING.MD,
  backgroundColor: COLORS.BACKGROUND_LIGHT,
  borderRadius: BORDER_RADIUS.LG,
  border: `1px solid ${COLORS.BORDER}`,
}; 