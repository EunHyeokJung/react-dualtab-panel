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
  allowTabSharing?: boolean;
}

export interface TabContainerProps {
  panel: Panel;
  onPanelChange: (panel: Panel) => void;
  orientation: Orientation;
  className?: string;
  dragState?: DragState;
  dragEvents?: DragEvents;
  allowTabSharing?: boolean;
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
  index: number;
  panelId: string;
  dragState?: DragState;
  dragEvents?: DragEvents;
}

// 드래그앤드롭 관련 타입들
export interface DragState {
  isDragging: boolean;
  draggedTabId: string | null;
  draggedFromPanelId: string | null;
  dragOverTabIndex: number | null;
  dragOverPanelId: string | null;
}

export interface TabMoveOperation {
  tabId: string;
  fromPanelId: string;
  toPanelId: string;
  fromIndex: number;
  toIndex: number;
}

export interface DragEvents {
  onDragStart: (e: React.DragEvent, tabId: string, panelId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent, targetIndex: number, panelId: string) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetIndex: number, panelId: string) => void;
}