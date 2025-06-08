import React, { useState, useRef } from 'react';
import type { PanelSplitterProps } from '../../types';

export function PanelSplitter({
  orientation,
  onSplitRatioChange,
  minSize = 100,
  className = '',
}: PanelSplitterProps) {
  const [isDragging, setIsDragging] = useState(false);
  const isMountedRef = useRef(true);

  // 컴포넌트 unmount 추적
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const container = (e.target as HTMLElement).parentElement;
    
    if (!container) {
      console.warn('PanelSplitter: Container element not found');
      return;
    }
    
    setIsDragging(true);
    
    const containerRect = container.getBoundingClientRect();
    const containerSize = orientation === 'horizontal' 
      ? containerRect.width 
      : containerRect.height;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = orientation === 'horizontal' ? e.clientX : e.clientY;
      const containerStart = orientation === 'horizontal' 
        ? containerRect.left 
        : containerRect.top;
      
      const newPos = currentPos - containerStart;
      let newRatio = newPos / containerSize;
      
      // 최소/최대 크기 제한하는 로직
      const minRatio = minSize / containerSize;
      const maxRatio = 1 - minRatio;
      
      newRatio = Math.max(minRatio, Math.min(maxRatio, newRatio));
      onSplitRatioChange(newRatio);
    };

    const handleMouseUp = () => {
      if (isMountedRef.current) {
        setIsDragging(false);
      }
      
      try {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      } catch (error) {
        console.warn('PanelSplitter: Error cleaning up event listeners', error);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };

  const splitterClasses = [
    'panel-splitter',
    `panel-splitter--${orientation}`,
    isDragging && 'panel-splitter--dragging',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={splitterClasses}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-orientation={orientation}
      aria-label="패널 크기 조절"
    />
  );
} 