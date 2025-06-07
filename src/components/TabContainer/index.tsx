import React from 'react';
import type { TabContainerProps, Tab } from '../../types';

export function TabContainer({
  panel,
  onPanelChange,
  // orientation, // TODO: 향후 세로 모드에서 탭 레이아웃 구현 시 사용할수도..? YAGNI 위배인가?
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
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {panel.tabs.length > 0 && (
        <div className="tab-header">
          {panel.tabs.map((tab) => (
            <TabHeader
              key={tab.id}
              tab={tab}
              isActive={tab.id === panel.activeTabId}
              onSelect={() => handleTabSelect(tab.id)}
              onClose={tab.closable !== false ? () => handleTabClose(tab.id) : undefined}
            />
          ))}
        </div>
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
            탭이 없습니다
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