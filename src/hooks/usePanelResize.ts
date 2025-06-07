import { useState, useCallback, useEffect, useRef } from 'react';
import type { Orientation } from '../types';

interface UsePanelResizeProps {
  orientation: Orientation;
  defaultSplitRatio: number;
  minSize: number;
  onSplitRatioChange?: (ratio: number) => void;
}

export function usePanelResize({
  orientation,
  defaultSplitRatio,
  minSize,
  onSplitRatioChange,
}: UsePanelResizeProps) {
  const [splitRatio, setSplitRatio] = useState(defaultSplitRatio);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      let newRatio: number;
      
      if (orientation === 'horizontal') {
        const x = e.clientX - rect.left;
        newRatio = x / rect.width;
      } else {
        const y = e.clientY - rect.top;
        newRatio = y / rect.height;
      }

      // 최소/최대 크기 제한
      const minRatio = minSize / (orientation === 'horizontal' ? rect.width : rect.height);
      const maxRatio = 1 - minRatio;
      
      newRatio = Math.max(minRatio, Math.min(maxRatio, newRatio));
      
      setSplitRatio(newRatio);
      onSplitRatioChange?.(newRatio);
    },
    [isDragging, orientation, minSize, onSplitRatioChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = orientation === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, orientation]);

  return {
    splitRatio,
    isDragging,
    containerRef,
    handleMouseDown,
  };
} 