import React from 'react';
import type { TabContainerProps } from '../../types';
import { TabHeader } from './TabHeader';

export function TabContainer({
  panel,
  panelIndex,
  onPanelChange,
  dragState,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  allowCrossPanelDrop,
  className = '',
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
    dragState.isDragging && dragState.dropPanelId === panel.id ? 'tab-container--drop-zone' : '',
    className
  ].filter(Boolean).join(' ');

  const isDraggedTab = (tabIndex: number) => {
    return dragState.isDragging && 
           dragState.sourcePanelIndex === panelIndex && 
           dragState.sourceTabIndex === tabIndex;
  };

  const isDropTarget = (tabIndex: number) => {
    return dragState.isDragging && 
           dragState.dropPanelId === panel.id && 
           dragState.dropPosition === tabIndex;
  };

  const getDropPosition = (tabIndex: number): 'before' | 'after' | null => {
    if (!isDropTarget(tabIndex)) return null;
    
    const isSamePanel = dragState.sourcePanelIndex === panelIndex;
    const sourceIndex = dragState.sourceTabIndex;
    
    if (isSamePanel && sourceIndex !== null) {
      return sourceIndex < tabIndex ? 'after' : 'before';
    }
    
    return 'before';
  };



  return (
    <div className={containerClasses}>
      <div className={`tab-header ${panel.tabs.length === 0 ? 'tab-header--empty' : ''}`}
           onDragOver={(e) => {
             e.preventDefault();
             // 탭 헤더 영역 끝에 드롭할 수 있도록 허용
             if (allowCrossPanelDrop || dragState.sourcePanelIndex === panelIndex) {
               onDragOver(e, panelIndex, panel.tabs.length);
             }
           }}
           onDrop={(e) => {
             e.preventDefault();
             onDrop(e, panelIndex, panel.tabs.length);
           }}>
        {panel.tabs.length > 0 ? (
          panel.tabs.map((tab, tabIndex) => (
            <React.Fragment key={tab.id}>
              {/* 탭 앞에 삽입 인디케이터 */}
              {dragState.isDragging && 
               dragState.dropPanelId === panel.id && 
               dragState.insertionIndex === tabIndex && (
                <div className="tab-insertion-indicator" />
              )}
              
              <TabHeader
                tab={tab}
                tabIndex={tabIndex}
                panelIndex={panelIndex}
                isActive={tab.id === panel.activeTabId}
                onSelect={() => handleTabSelect(tab.id)}
                onClose={tab.closable !== false ? () => handleTabClose(tab.id) : undefined}
                isDragging={isDraggedTab(tabIndex)}
                isDropTarget={isDropTarget(tabIndex)}
                dropPosition={getDropPosition(tabIndex)}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
              />
              
              {/* 마지막 탭 뒤에 삽입 인디케이터 */}
              {dragState.isDragging && 
               dragState.dropPanelId === panel.id && 
               dragState.insertionIndex === panel.tabs.length &&
               tabIndex === panel.tabs.length - 1 && (
                <div className="tab-insertion-indicator" />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="tab-header__empty">
            {dragState.isDragging && (allowCrossPanelDrop || dragState.sourcePanelIndex === panelIndex) ? (
              <span className="tab-header__drop-hint">
                📁 여기에 탭을 드롭하세요
              </span>
            ) : (
              <span className="tab-header__empty-text">
                탭이 없습니다
              </span>
            )}
          </div>
        )}
      </div>
      
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
            탭이 없습니다
          </div>
        )}
      </div>
    </div>
  );
} 