import React from 'react';
import type { TabContainerProps, Tab, DragState, DragEvents } from '../../types';

export function TabContainer({
  panel,
  onPanelChange,
  // orientation, // TODO: 향후 세로 모드에서 탭 레이아웃 구현 시 사용할수도..? YAGNI 위배인가?
  className = '',
  dragState,
  dragEvents,
}: TabContainerProps) {
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
      {panel.tabs.length > 0 ? (
        <div className="tab-header">
          {panel.tabs.map((tab, index) => (
            <TabHeaderWithDragDrop
              key={tab.id}
              tab={tab}
              index={index}
              panelId={panel.id}
              isActive={tab.id === panel.activeTabId}
              onSelect={() => handleTabSelect(tab.id)}
              onClose={tab.closable !== false ? () => handleTabClose(tab.id) : undefined}
              dragState={dragState}
              dragEvents={dragEvents}
            />
          ))}
          {/* 드롭 인디케이터는 탭 바로 뒤에, 드롭존은 남은 공간 전체 */}
          {dragState?.isDragging && 
           dragState.dragOverPanelId === panel.id && 
           dragState.dragOverTabIndex === panel.tabs.length && (
            <div className="tab-header__drop-indicator" />
          )}
          {dragState?.isDragging && (
            <FlexDropZone
              index={panel.tabs.length}
              panelId={panel.id}
              dragState={dragState}
              dragEvents={dragEvents}
            />
          )}
        </div>
      ) : (
        /* 빈 패널에도 드롭존 추가 */
        dragState?.isDragging && (
          <div className="tab-header tab-header--empty">
            {dragState.dragOverPanelId === panel.id && 
             dragState.dragOverTabIndex === 0 && (
              <div className="tab-header__drop-indicator" />
            )}
            <FlexDropZone
              index={0}
              panelId={panel.id}
              dragState={dragState}
              dragEvents={dragEvents}
            />
          </div>
        )
      )}
      
      <div className="tab-content">
        {activeTab ? activeTab.content : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#9ca3af',
            fontSize: '14px'
          }}>
            {dragState?.isDragging ? '여기에 탭을 드롭하세요' : '탭이 없습니다'}
          </div>
        )}
      </div>
    </div>
  );
}

interface TabHeaderProps {
  tab: Tab;
  isActive: boolean;
  onSelect: () => void;
  onClose?: () => void;
}

interface TabHeaderWithDragDropProps extends TabHeaderProps {
  index: number;
  panelId: string;
  dragState?: DragState;
  dragEvents?: DragEvents;
}

interface DropZoneProps {
  index: number;
  panelId: string;
  dragState?: DragState;
  dragEvents?: DragEvents;
}

function TabHeader({ tab, isActive, onSelect, onClose }: TabHeaderProps) {
  const headerClasses = [
    'tab-header__item',
    isActive ? 'tab-header__item--active' : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={headerClasses}
      onClick={onSelect}
      title={tab.title}
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
          title="탭 닫기"
          aria-label={`${tab.title} 탭 닫기`}
        >
          ✕
        </button>
      )}
    </button>
  );
}

function TabHeaderWithDragDrop({ 
  tab, 
  index, 
  panelId, 
  isActive, 
  onSelect, 
  onClose, 
  dragState,
  dragEvents 
}: TabHeaderWithDragDropProps) {
  const isDragging = dragState?.draggedTabId === tab.id;
  const isBeingDraggedOver = dragState?.dragOverPanelId === panelId && 
                             dragState?.dragOverTabIndex === index;
  
  const headerClasses = [
    'tab-header__item',
    isActive ? 'tab-header__item--active' : '',
    isDragging ? 'tab-header__item--dragging' : '',
    isBeingDraggedOver ? 'tab-header__item--drag-over' : ''
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* 드롭 인디케이터 - 탭 앞에 표시 */}
      {isBeingDraggedOver && dragState?.isDragging && (
        <div className="tab-header__drop-indicator" />
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
        style={{ touchAction: 'none' }} // 모바일 터치 최적화
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
            title="탭 닫기"
            aria-label={`${tab.title} 탭 닫기`}
          >
            ✕
          </button>
        )}
      </button>
    </>
  );
}

function DropZone({ index, panelId, dragState, dragEvents }: DropZoneProps) {
  const isTargeted = dragState?.dragOverPanelId === panelId && 
                     dragState?.dragOverTabIndex === index;

  return (
    <>
      {isTargeted && (
        <div className="tab-header__drop-indicator" />
      )}
      <div
        className="tab-header__drop-zone"
        onDragOver={dragEvents ? (e) => dragEvents.onDragOver(e, index, panelId) : undefined}
        onDragLeave={dragEvents?.onDragLeave}
        onDrop={dragEvents ? (e) => dragEvents.onDrop(e, index, panelId) : undefined}
      />
    </>
  );
}

function FlexDropZone({ index, panelId, dragState, dragEvents }: DropZoneProps) {
  return (
    <div 
      className="tab-header__flex-drop-zone"
      onDragOver={dragEvents ? (e) => dragEvents.onDragOver(e, index, panelId) : undefined}
      onDragLeave={dragEvents?.onDragLeave}
      onDrop={dragEvents ? (e) => dragEvents.onDrop(e, index, panelId) : undefined}
    />
  );
} 