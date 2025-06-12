import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { TabContainerProps, TabHeaderProps } from '../../types';
import type { DropZoneProps, EmptyPanelDropZoneProps } from '../../types/components';
import { CloseIcon } from '@common/icons/CloseIcon';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

// 유틸리티 임포트
import { 
  calculateTabLayout,
  isTabBeingDragged, 
  isPositionBeingDraggedOver, 
  isDragActive,
  shouldShowDropIndicator,
  getTabHeaderClasses, 
  getFlexDropZoneClasses, 
  getFlexDropZoneStyle,
  getEmptyPanelDropZoneClasses,
  getEmptyPanelDropMessage,
  getScrollbarClasses
} from '../../utils';

export function TabContainer({
  panel,
  onPanelChange,
  // orientation, // TODO: 향후 세로 모드에서 탭 레이아웃 구현 시 사용할수도..? YAGNI 위배인가?
  className = '',
  dragState,
  dragEvents,
  allowTabSharing = true,
}: TabContainerProps) {
  const tabHeaderRef = useRef<HTMLDivElement>(null);
  const [tabWidths, setTabWidths] = useState<Record<string, number>>({});
  const [needsScroll, setNeedsScroll] = useState(false);

  // 부드러운 스크롤 훅 사용
  const { setupScrollListener, cleanup } = useSmoothScroll();

  // 탭 레이아웃 재계산 함수
  const recalculateTabLayout = useCallback(() => {
    if (!tabHeaderRef.current || panel.tabs.length === 0) return;
    
    // 드래그 중일 때는 스크롤 상태 계산을 건너뛰기
    if (isDragActive(dragState)) return;

    const headerElement = tabHeaderRef.current;
    const containerWidth = headerElement.clientWidth;
    const tabIds = panel.tabs.map(tab => tab.id);
    
    const { tabWidths, needsScroll } = calculateTabLayout(containerWidth, tabIds);
    
    setTabWidths(tabWidths);
    setNeedsScroll(needsScroll);
  }, [panel.tabs, dragState]);

  // 탭 변경시 레이아웃 재계산
  useEffect(() => {
    recalculateTabLayout();
  }, [recalculateTabLayout]);

  // 패널 크기 변경 감지를 위한 ResizeObserver (debounced)
  useEffect(() => {
    if (!tabHeaderRef.current) return;

    let timeoutId: number;

    const resizeObserver = new ResizeObserver(() => {
      // 이전 타이머 취소
      clearTimeout(timeoutId);
      
      // 300ms 후에 레이아웃 재계산 (splitter 드래그 완료 후)
      // 단, forceRecalculate가 있으면 이미 즉시 계산되었으므로 생략
      timeoutId = setTimeout(() => {
        recalculateTabLayout();
      }, 300);
    });

    resizeObserver.observe(tabHeaderRef.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      // 스크롤 애니메이션 정리
      cleanup();
    };
  }, [recalculateTabLayout, cleanup]);

  // 스크롤 이벤트 리스너 설정
  useEffect(() => {
    const removeScrollListener = setupScrollListener(tabHeaderRef, needsScroll);
    return removeScrollListener;
  }, [setupScrollListener, needsScroll]);

  const handleTabSelect = (tabId: string) => {
    onPanelChange({
      ...panel,
      activeTabId: tabId,
    });
  };

  const handleTabClose = (tabId: string) => {
    const newTabs = panel.tabs.filter(tab => tab.id !== tabId);
    
    if (newTabs.length === 0) {
      // 모든 탭이 닫혔을 때 빈탭으로 유지하는 로직
      onPanelChange({
        ...panel,
        tabs: [],
        activeTabId: '',
      });
      return;
    }

    let newActiveTabId = panel.activeTabId;
    if (tabId === panel.activeTabId) {
      // 활성 탭이 닫혔을 때 첫 번째 탭을 활성화하는 로직
      // TODO: 가장 마지막에 본 탭을 활성화하는 로직으로 변경할지 검토 필요할 듯.
      newActiveTabId = newTabs[0].id;
    }

    onPanelChange({
      ...panel,
      tabs: newTabs,
      activeTabId: newActiveTabId,
    });
  };

  const activeTab = panel.tabs.find(tab => tab.id === panel.activeTabId);

  const containerClasses = [
    'tab-container',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {panel.tabs.length > 0 && (
        <div 
          ref={tabHeaderRef}
          className={`${getScrollbarClasses().join(' ')} ${needsScroll ? 'tab-header--scrollable' : ''}`}
        >
          {panel.tabs.map((tab, index) => (
            <TabHeader
              key={tab.id}
              tab={tab}
              index={index}
              panelId={panel.id}
              isActive={tab.id === panel.activeTabId}
              onSelect={() => handleTabSelect(tab.id)}
              onClose={tab.closable !== false ? () => handleTabClose(tab.id) : undefined}
              dragState={dragState}
              dragEvents={dragEvents}
              width={tabWidths[tab.id]}
            />
          ))}
          {/* 항상 렌더링하되 드래그 중이 아닐 때는 숨김 */}
          <FlexDropZone
            index={panel.tabs.length}
            panelId={panel.id}
            dragEvents={dragEvents}
            dragState={dragState}
          />
        </div>
      )}
      
      <div className="tab-content">
        {activeTab ? activeTab.content : (
          <EmptyPanelDropZone
            panelId={panel.id}
            dragState={dragState}
            dragEvents={dragEvents}
            allowTabSharing={allowTabSharing}
          />
        )}
      </div>
    </div>
  );
}



function TabHeader({ 
  tab, 
  index, 
  panelId, 
  isActive, 
  onSelect, 
  onClose, 
  dragState,
  dragEvents,
  width
}: TabHeaderProps) {
  const isDragging = isTabBeingDragged(dragState, tab.id);
  const isBeingDraggedOver = isPositionBeingDraggedOver(dragState, panelId, index);
  
  const headerClasses = getTabHeaderClasses({ 
    isActive, 
    isDragging, 
    isBeingDraggedOver,
    width 
  });

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {/* 드롭 인디케이터 - 탭 앞에 absolute positioning으로 표시 */}
      {shouldShowDropIndicator(dragState, panelId, index) && (
        <div 
          className="tab-header__drop-indicator"
          style={{ 
            left: '-1px' // 탭 왼쪽에 표시
          }}
        />
      )}
      
      <button
        className={headerClasses}
        onClick={onSelect}
        title={tab.title}
        draggable={!!dragEvents}
        onDragStart={dragEvents ? (e) => dragEvents.onDragStart(e, tab.id, panelId) : undefined}
        onDragEnd={dragEvents?.onDragEnd}
        onDragOver={dragEvents ? (e) => dragEvents.onDragOver(e, index, panelId) : undefined}
        onDragLeave={dragEvents?.onDragLeave}
        onDrop={dragEvents ? (e) => dragEvents.onDrop(e, index, panelId) : undefined}
        style={{ touchAction: 'none', width }}
      >
        <span className="tab-header__title">
          {tab.title}
        </span>
        
        {onClose && (
          <button
            className="tab-header__close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title="Close tab"
            aria-label={`Close ${tab.title} tab`}
          >
            <CloseIcon className="tab-header__close-icon" />
          </button>
        )}
      </button>
    </div>
  );
}

function FlexDropZone({ index, panelId, dragEvents, dragState }: DropZoneProps) {
  const isBeingDraggedOver = isPositionBeingDraggedOver(dragState, panelId, index);
  const dragActiveState = isDragActive(dragState);

  const styleProps = { isDragActive: dragActiveState, isBeingDraggedOver };
  
  const className = getFlexDropZoneClasses(styleProps);
  const style = getFlexDropZoneStyle(styleProps);

  return (
    <div 
      className={className}
      style={style}
      onDragOver={dragEvents ? (e) => dragEvents.onDragOver(e, index, panelId) : undefined}
      onDragLeave={dragEvents?.onDragLeave}
      onDrop={dragEvents ? (e) => dragEvents.onDrop(e, index, panelId) : undefined}
    >
      {/* 맨 마지막 위치의 드롭 인디케이터 */}
      {shouldShowDropIndicator(dragState, panelId, index) && (
        <div 
          className="tab-header__drop-indicator"
          style={{ 
            left: '0px' // FlexDropZone 시작 부분에 표시
          }}
        />
      )}
    </div>
  );
}

function EmptyPanelDropZone({ panelId, dragState, dragEvents, allowTabSharing = true }: EmptyPanelDropZoneProps) {
  const dragActiveState = isDragActive(dragState);
  const isBeingDraggedOver = isPositionBeingDraggedOver(dragState, panelId, 0);
  
  const dropZoneClasses = getEmptyPanelDropZoneClasses(dragActiveState, isBeingDraggedOver);
  const dropMessage = getEmptyPanelDropMessage(dragActiveState, allowTabSharing);
  
  return (
    <div 
      className={dropZoneClasses}
      onDragOver={dragActiveState && dragEvents ? (e) => dragEvents.onDragOver(e, 0, panelId) : undefined}
      onDragLeave={dragActiveState && dragEvents ? dragEvents.onDragLeave : undefined}
      onDrop={dragActiveState && dragEvents ? (e) => dragEvents.onDrop(e, 0, panelId) : undefined}
    >
      {dropMessage}
    </div>
  );
} 