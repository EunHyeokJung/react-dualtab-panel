export { DualTabPanel } from './components/DualTabPanel';
export { TabContainer } from './components/TabContainer';
export { PanelSplitter } from './components/PanelSplitter';

export { usePanelResize } from './hooks/usePanelResize';

// 로깅 시스템 export
export { logger } from './utils/logger';

export type {
  Tab,
  Panel,
  Orientation,
  DualTabPanelProps,
  TabContainerProps,
  PanelSplitterProps,
  TabHeaderProps,
  LogLevel,
  LogContext,
  LoggerConfig,
  Logger,
  LogEntry,
} from './types';

import './styles/index.css'; 