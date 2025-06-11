import { useState, useCallback } from 'react';
import type { Tab, Panel, DragState } from '../types';

interface UseDragAndDropOptions {
  panels: [Panel, Panel];
  onPanelsChange: (panels: [Panel, Panel]) => void;
  allowCrossPanelDrop?: boolean;
  keepMinimumTab?: boolean;
  onTabMove?: (tab: Tab, fromPanelIndex: number, toPanelIndex: number, position: number) => void;
  onTabReorder?: (panelIndex: number, fromIndex: number, toIndex: number) => void;
}

export function useDragAndDrop({
  panels,
  onPanelsChange,
  allowCrossPanelDrop = false,
  keepMinimumTab = true,
  onTabMove,
  onTabReorder,
}: UseDragAndDropOptions) {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedTab: null,
    sourcePanel: null,
    sourcePanelIndex: null,
    sourceTabIndex: null,
    dropPosition: null,
    dropPanelId: null,
    insertionIndex: null,
  });

  const handleDragStart = useCallback((tab: Tab, panelIndex: number, tabIndex: number) => {
    // keepMinimumTab이 true인 경우에만 마지막 남은 탭 드래그 방지
    if (keepMinimumTab && panels[panelIndex].tabs.length === 1) {
      return false;
    }

    setDragState({
      isDragging: true,
      draggedTab: tab,
      sourcePanel: panels[panelIndex].id,
      sourcePanelIndex: panelIndex,
      sourceTabIndex: tabIndex,
      dropPosition: null,
      dropPanelId: null,
      insertionIndex: null,
    });

    return true;
  }, [panels, keepMinimumTab]);

  const handleDragOver = useCallback((e: React.DragEvent, panelIndex: number, position: number) => {
    e.preventDefault();
    
    if (!dragState.isDragging || !dragState.draggedTab) return;

    // 같은 패널 내에서만 허용하거나, allowCrossPanelDrop이 true인 경우
    const isSamePanel = dragState.sourcePanelIndex === panelIndex;
    const isAllowed = isSamePanel || allowCrossPanelDrop;

    if (!isAllowed) return;

    // 삽입 위치 계산
    let insertionIndex = position;
    const sourceIndex = dragState.sourceTabIndex;
    
    // 같은 패널 내에서 이동하는 경우, 소스 탭을 제외한 위치 조정
    if (isSamePanel && sourceIndex !== null) {
      if (position > sourceIndex) {
        insertionIndex = position - 1;
      }
    }

    setDragState(prev => ({
      ...prev,
      dropPosition: position,
      dropPanelId: panels[panelIndex].id,
      insertionIndex,
    }));
  }, [dragState.isDragging, dragState.draggedTab, dragState.sourcePanelIndex, dragState.sourceTabIndex, allowCrossPanelDrop, panels]);

  const handleDrop = useCallback((e: React.DragEvent, panelIndex: number, position: number) => {
    e.preventDefault();
    
    if (!dragState.isDragging || !dragState.draggedTab || dragState.sourcePanelIndex === null || dragState.sourceTabIndex === null) {
      return;
    }

    const isSamePanel = dragState.sourcePanelIndex === panelIndex;
    const isAllowed = isSamePanel || allowCrossPanelDrop;

    if (!isAllowed) {
      handleDragEnd();
      return;
    }

    const newPanels: [Panel, Panel] = [...panels];
    const sourcePanel = newPanels[dragState.sourcePanelIndex];
    const targetPanel = newPanels[panelIndex];

    // 드래그된 탭을 소스에서 제거
    const [draggedTab] = sourcePanel.tabs.splice(dragState.sourceTabIndex, 1);

    if (isSamePanel) {
      // 같은 패널 내 이동
      let targetIndex = position;
      
      // 드래그된 탭이 원래 있던 위치보다 뒤로 이동하는 경우 인덱스 조정
      if (dragState.sourceTabIndex < position) {
        targetIndex = position - 1;
      }

      targetPanel.tabs.splice(targetIndex, 0, draggedTab);
      
      onTabReorder?.(panelIndex, dragState.sourceTabIndex, targetIndex);
    } else {
      // 패널 간 이동
      targetPanel.tabs.splice(position, 0, draggedTab);
      
      // 소스 패널이 비어있으면 활성 탭 초기화
      if (sourcePanel.tabs.length === 0) {
        sourcePanel.activeTabId = '';
      } else if (sourcePanel.activeTabId === draggedTab.id) {
        // 활성 탭이 이동된 경우 첫 번째 탭을 활성화
        sourcePanel.activeTabId = sourcePanel.tabs[0].id;
      }

      // 타겟 패널에서 이동된 탭을 활성화
      targetPanel.activeTabId = draggedTab.id;
      
      onTabMove?.(draggedTab, dragState.sourcePanelIndex, panelIndex, position);
    }

    onPanelsChange(newPanels);
    handleDragEnd();
  }, [dragState, panels, allowCrossPanelDrop, onPanelsChange, onTabMove, onTabReorder]);

  const handleDragEnd = useCallback(() => {
    setDragState({
      isDragging: false,
      draggedTab: null,
      sourcePanel: null,
      sourcePanelIndex: null,
      sourceTabIndex: null,
      dropPosition: null,
      dropPanelId: null,
      insertionIndex: null,
    });
  }, []);

  const isDraggedTab = useCallback((tab: Tab, panelIndex: number, tabIndex: number) => {
    return dragState.isDragging && 
           dragState.draggedTab?.id === tab.id && 
           dragState.sourcePanelIndex === panelIndex && 
           dragState.sourceTabIndex === tabIndex;
  }, [dragState]);

  const isDropTarget = useCallback((panelIndex: number, tabIndex: number) => {
    return dragState.isDragging && 
           dragState.dropPanelId === panels[panelIndex].id && 
           dragState.dropPosition === tabIndex;
  }, [dragState, panels]);

  const getDropPosition = useCallback((panelIndex: number, tabIndex: number): 'before' | 'after' | null => {
    if (!isDropTarget(panelIndex, tabIndex)) return null;
    
    const isSamePanel = dragState.sourcePanelIndex === panelIndex;
    const sourceIndex = dragState.sourceTabIndex;
    
    if (isSamePanel && sourceIndex !== null) {
      return sourceIndex < tabIndex ? 'after' : 'before';
    }
    
    return 'before';
  }, [dragState, isDropTarget]);

  return {
    dragState,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    isDraggedTab,
    isDropTarget,
    getDropPosition,
  };
} 