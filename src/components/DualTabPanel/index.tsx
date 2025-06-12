import React, { useState } from 'react';
import type { DualTabPanelProps } from '../../types';
import { TabContainer } from '../TabContainer';
import { PanelSplitter } from '../PanelSplitter';
import { useTabDragDrop } from '../../hooks/useTabDragDrop';

export function DualTabPanel({
  panels,
  onPanelsChange,
  orientation = 'horizontal',
  defaultSplitRatio = 0.5,
  onSplitRatioChange,
  className = '',
  style,
  minPanelSize = 100,
  allowTabSharing = true,
}: DualTabPanelProps) {
  const [splitRatio, setSplitRatio] = useState(defaultSplitRatio);
  const { dragState, dragEvents } = useTabDragDrop({ 
    panels, 
    onPanelsChange, 
    allowTabSharing 
  });

  const handleSplitRatioChange = (newRatio: number) => {
    setSplitRatio(newRatio);
    onSplitRatioChange?.(newRatio);
  };



  const handlePanelChange = (panelIndex: 0 | 1) => (updatedPanel: typeof panels[0]) => {
    const newPanels: [typeof panels[0], typeof panels[1]] = [...panels];
    newPanels[panelIndex] = updatedPanel;
    onPanelsChange(newPanels);
  };

  const panelClasses = [
    'dualtab-panel',
    `dualtab-panel--${orientation}`,
    className
  ].filter(Boolean).join(' ');

  const panel1Style = {
    [orientation === 'horizontal' ? 'width' : 'height']: `${splitRatio * 100}%`,
    [orientation === 'horizontal' ? 'minWidth' : 'minHeight']: `${minPanelSize}px`,
  };

  const panel2Style = {
    [orientation === 'horizontal' ? 'width' : 'height']: `${(1 - splitRatio) * 100}%`,
    [orientation === 'horizontal' ? 'minWidth' : 'minHeight']: `${minPanelSize}px`,
  };

  return (
    <div className={panelClasses} style={style}>
      <div className="dualtab-panel__panel" style={panel1Style}>
        <TabContainer
          panel={panels[0]}
          onPanelChange={handlePanelChange(0)}
          orientation={orientation}
          dragState={dragState}
          dragEvents={dragEvents}
          allowTabSharing={allowTabSharing}
        />
      </div>
      
      <PanelSplitter
        orientation={orientation}
        onSplitRatioChange={handleSplitRatioChange}
        minSize={minPanelSize}
      />
      
      <div className="dualtab-panel__panel" style={panel2Style}>
        <TabContainer
          panel={panels[1]}
          onPanelChange={handlePanelChange(1)}
          orientation={orientation}
          dragState={dragState}
          dragEvents={dragEvents}
          allowTabSharing={allowTabSharing}
        />
      </div>
    </div>
  );
} 