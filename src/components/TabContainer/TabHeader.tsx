import React from 'react';
import type { TabHeaderProps } from '../../types';

export function TabHeader({ 
  tab, 
  tabIndex,
  panelIndex,
  isActive, 
  onSelect, 
  onClose,
  isDragging,
  isDropTarget,
  dropPosition,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd
}: TabHeaderProps) {
  const handleDragStart = (e: React.DragEvent) => {
    const canDrag = onDragStart(tab, panelIndex, tabIndex);
    if (canDrag === false) {
      e.preventDefault();
      return;
    }

    // 드래그 이미지 커스터마이징
    const dragImage = document.createElement('div');
    dragImage.className = 'drag-ghost';
    dragImage.textContent = tab.title;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    e.dataTransfer.effectAllowed = 'move';
    
    // 정리
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver(e, panelIndex, tabIndex);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(e, panelIndex, tabIndex);
  };

  const headerClasses = [
    'tab-header__item',
    isActive ? 'tab-header__item--active' : '',
    isDragging ? 'tab-header__item--dragging' : '',
    isDropTarget ? `tab-header__item--drop-target${dropPosition === 'after' ? '-after' : ''}` : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={headerClasses}
      draggable={!isDragging}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
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