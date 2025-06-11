import { useState, useCallback } from 'react';
import type { Panel, DragState, TabMoveOperation, DragEvents } from '../types';

interface UseTabDragDropProps {
  panels: [Panel, Panel];
  onPanelsChange: (panels: [Panel, Panel]) => void;
}

export function useTabDragDrop({ panels, onPanelsChange }: UseTabDragDropProps) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedTabId: null,
    draggedFromPanelId: null,
    dragOverTabIndex: null,
    dragOverPanelId: null,
  });

  const resetDragState = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedTabId: null,
      draggedFromPanelId: null,
      dragOverTabIndex: null,
      dragOverPanelId: null,
    });
  }, []);

  const moveTab = useCallback((operation: TabMoveOperation) => {
    const { tabId, fromPanelId, toPanelId, fromIndex, toIndex } = operation;
    
    // 원본 패널에서 탭 찾기
    const fromPanelIndex = panels.findIndex(panel => panel.id === fromPanelId);
    const toPanelIndex = panels.findIndex(panel => panel.id === toPanelId);
    
    if (fromPanelIndex === -1 || toPanelIndex === -1) return;
    
    const fromPanel = panels[fromPanelIndex];
    const toPanel = panels[toPanelIndex];
    
    const draggedTab = fromPanel.tabs.find(tab => tab.id === tabId);
    if (!draggedTab) return;
    
    const newPanels: [Panel, Panel] = [...panels];
    
    // 같은 패널 내에서 이동
    if (fromPanelId === toPanelId) {
      const newTabs = [...fromPanel.tabs];
      newTabs.splice(fromIndex, 1);
      newTabs.splice(toIndex, 0, draggedTab);
      
      newPanels[fromPanelIndex] = {
        ...fromPanel,
        tabs: newTabs,
      };
    } else {
      // 다른 패널로 이동
      // 원본 패널에서 제거
      const fromTabs = fromPanel.tabs.filter(tab => tab.id !== tabId);
      newPanels[fromPanelIndex] = {
        ...fromPanel,
        tabs: fromTabs,
        activeTabId: fromTabs.length > 0 ? 
          (fromPanel.activeTabId === tabId ? fromTabs[0].id : fromPanel.activeTabId) : 
          '',
      };
      
      // 대상 패널에 추가
      const toTabs = [...toPanel.tabs];
      toTabs.splice(toIndex, 0, draggedTab);
      newPanels[toPanelIndex] = {
        ...toPanel,
        tabs: toTabs,
        activeTabId: draggedTab.id, // 이동된 탭을 활성화
      };
    }
    
    onPanelsChange(newPanels);
  }, [panels, onPanelsChange]);

  const dragEvents: DragEvents = {
    onDragStart: useCallback((e: React.DragEvent, tabId: string, panelId: string) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', ''); // Firefox 호환성을 위해
      
      setDragState({
        isDragging: true,
        draggedTabId: tabId,
        draggedFromPanelId: panelId,
        dragOverTabIndex: null,
        dragOverPanelId: null,
      });
    }, []),

    onDragEnd: useCallback((e: React.DragEvent) => {
      resetDragState();
    }, [resetDragState]),

    onDragOver: useCallback((e: React.DragEvent, targetIndex: number, panelId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      setDragState(prev => ({
        ...prev,
        dragOverTabIndex: targetIndex,
        dragOverPanelId: panelId,
      }));
    }, []),

    onDragLeave: useCallback((e: React.DragEvent) => {
      // 자식 요소로 이동하는 경우는 무시
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setDragState(prev => ({
          ...prev,
          dragOverTabIndex: null,
          dragOverPanelId: null,
        }));
      }
    }, []),

    onDrop: useCallback((e: React.DragEvent, targetIndex: number, panelId: string) => {
      e.preventDefault();
      
      const { draggedTabId, draggedFromPanelId } = dragState;
      
      if (!draggedTabId || !draggedFromPanelId) {
        resetDragState();
        return;
      }
      
      // 원본 위치 찾기
      const fromPanel = panels.find(panel => panel.id === draggedFromPanelId);
      if (!fromPanel) {
        resetDragState();
        return;
      }
      
      const fromIndex = fromPanel.tabs.findIndex(tab => tab.id === draggedTabId);
      if (fromIndex === -1) {
        resetDragState();
        return;
      }
      
      // 같은 위치에 드롭하는 경우 무시하고 상태만 초기화
      if (draggedFromPanelId === panelId && fromIndex === targetIndex) {
        resetDragState();
        return;
      }
      
      // 탭 이동 실행
      moveTab({
        tabId: draggedTabId,
        fromPanelId: draggedFromPanelId,
        toPanelId: panelId,
        fromIndex,
        toIndex: targetIndex,
      });
      
      // 드래그 상태 초기화
      resetDragState();
    }, [dragState, panels, moveTab, resetDragState]),
  };

  return {
    dragState,
    dragEvents,
  };
} 