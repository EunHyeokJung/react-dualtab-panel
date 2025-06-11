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

export interface DragState {
  isDragging: boolean;
  draggedTab: Tab | null;
  sourcePanel: string | null;
  sourcePanelIndex: number | null;
  sourceTabIndex: number | null;
  dropPosition: number | null;
  dropPanelId: string | null;
  insertionIndex: number | null; // 삽입될 위치 인덱스
}

export interface TabDragProps {
  allowCrossPanelDrop?: boolean; // 패널 간 이동 허용 여부
  keepMinimumTab?: boolean; // 각 패널에 최소 1개 탭 유지 여부 (기본값: true)
  onTabMove?: (tab: Tab, fromPanelIndex: number, toPanelIndex: number, position: number) => void;
  onTabReorder?: (panelIndex: number, fromIndex: number, toIndex: number) => void;
}

export interface DualTabPanelProps extends TabDragProps {
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
  panelIndex: number;
  onPanelChange: (panel: Panel) => void;
  orientation: Orientation;
  className?: string;
  dragState: DragState;
  onDragStart: (tab: Tab, panelIndex: number, tabIndex: number) => boolean;
  onDragOver: (e: React.DragEvent, panelIndex: number, position: number) => void;
  onDrop: (e: React.DragEvent, panelIndex: number, position: number) => void;
  onDragEnd: () => void;
  allowCrossPanelDrop?: boolean;
}

export interface PanelSplitterProps {
  orientation: Orientation;
  onSplitRatioChange: (ratio: number) => void;
  minSize?: number;
  className?: string;
}

export interface TabHeaderProps {
  tab: Tab;
  tabIndex: number;
  panelIndex: number;
  isActive: boolean;
  onSelect: () => void;
  onClose?: () => void;
  className?: string;
  isDragging: boolean;
  isDropTarget: boolean;
  dropPosition: 'before' | 'after' | null;
  onDragStart: (tab: Tab, panelIndex: number, tabIndex: number) => boolean;
  onDragOver: (e: React.DragEvent, panelIndex: number, position: number) => void;
  onDrop: (e: React.DragEvent, panelIndex: number, position: number) => void;
  onDragEnd: () => void;
} 