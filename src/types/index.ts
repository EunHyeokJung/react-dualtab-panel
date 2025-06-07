import React from 'react';

export interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
  closable?: boolean;
}

export interface Panel {
  id: string;
  tabs: Tab[];
  activeTabId: string;
}

export type Orientation = 'horizontal' | 'vertical';

export interface DualTabPanelProps {
  panels: [Panel, Panel];
  onPanelsChange: (panels: [Panel, Panel]) => void;
  orientation?: Orientation;
  defaultSplitRatio?: number;
  onSplitRatioChange?: (ratio: number) => void;
  className?: string;
  style?: React.CSSProperties;
  minPanelSize?: number;
}

export interface TabContainerProps {
  panel: Panel;
  onPanelChange: (panel: Panel) => void;
  orientation: Orientation;
  className?: string;
}

export interface PanelSplitterProps {
  orientation: Orientation;
  onSplitRatioChange: (ratio: number) => void;
  minSize?: number;
  className?: string;
}

export interface TabHeaderProps {
  tab: Tab;
  isActive: boolean;
  onSelect: () => void;
  onClose?: () => void;
  className?: string;
} 