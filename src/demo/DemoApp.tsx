// DemoPage 100% made with Cursor AI
// Maybe it means this module is easy enough to be made with AI? lol

import React, { useState } from 'react';
import { DualTabPanel } from '../components/DualTabPanel';
import type { Panel, Tab } from '../types';
import { SideMenu, type MenuItem } from './SideMenu';
import { 
  Dashboard, 
  Users, 
  Settings, 
  Analytics, 
  Reports, 
  Roles, 
  AuditLog, 
  Profile, 
  Notifications 
} from './PageComponents';
import '../styles/index.css';

// Page component mapping
const getPageComponent = (menuId: string): React.ReactNode => {
  switch (menuId) {
    case 'dashboard': return <Dashboard />;
    case 'analytics': return <Analytics />;
    case 'reports': return <Reports />;
    case 'users': return <Users />;
    case 'roles': return <Roles />;
    case 'audit': return <AuditLog />;
    case 'settings': return <Settings />;
    case 'profile': return <Profile />;
    case 'notifications': return <Notifications />;
    default: return <div style={{ padding: '20px' }}>Page not found.</div>;
  }
};

export function DemoApp() {
  const [panels, setPanels] = useState<[Panel, Panel]>([
    {
      id: 'left',
      tabs: [
        { id: 'welcome', title: '👋 Welcome', content: (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Welcome to DualTabPanel Demo!</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Click on menu items in the left sidebar to open tabs.
            </p>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
            <p>This library helps you easily implement dual tab panels in your React applications.</p>
          </div>
        )},
      ],
      activeTabId: 'welcome'
    },
    {
      id: 'right', 
      tabs: [
        { id: 'info', title: 'ℹ️ How to Use', content: (
          <div style={{ padding: '20px' }}>
            <h2>How to Use</h2>
            <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
              <h3>1. Click Menu Items</h3>
              <p>• Click on desired pages from the left sidebar menu</p>
              
              <h3>2. Manage Tabs</h3>
              <p>• Close tabs using the X button on each tab</p>
              
              <h3>3. Drag & Drop Tabs</h3>
              <p>• Drag tabs to reorder</p>
              <p>• Drag tabs between panels to move</p>
              <p>• Drop tabs into empty panels to populate</p>
              
              <h3>4. Resize Panels</h3>
              <p>• Drag the center divider to adjust panel sizes.</p>
              
              <h3>5. Panel Options</h3>
              <p>• Switch between horizontal/vertical layout using the header controls</p>
              <p>• Use the "Allow tab sharing" checkbox to control whether tabs can be moved between panels</p>
            </div>
          </div>
        )},
      ],
      activeTabId: 'info'
    }
  ]);

  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [allowTabSharing, setAllowTabSharing] = useState(true);

  // Tab addition logic on menu click
  const handleMenuClick = (menuItem: MenuItem) => {
    const newTab: Tab = {
      id: menuItem.id,
      title: `${menuItem.icon} ${menuItem.title}`,
      content: getPageComponent(menuItem.id),
      closable: true
    };

    // Add tab to left panel (activate if already exists)
    const leftPanel = panels[0];
    const existingTabIndex = leftPanel.tabs.findIndex(tab => tab.id === menuItem.id);
    
    if (existingTabIndex >= 0) {
      // Activate existing tab
      const updatedPanels: [Panel, Panel] = [
        { ...leftPanel, activeTabId: menuItem.id },
        panels[1]
      ];
      setPanels(updatedPanels);
    } else {
      // Add new tab
      const updatedPanels: [Panel, Panel] = [
        {
          ...leftPanel,
          tabs: [...leftPanel.tabs, newTab],
          activeTabId: menuItem.id
        },
        panels[1]
      ];
      setPanels(updatedPanels);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f9fafb', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
            🔄 DualTabPanel Demo
          </h1>
          <span style={{ fontSize: '12px', color: '#6b7280', backgroundColor: '#e5e7eb', padding: '2px 8px', borderRadius: '4px' }}>
            v0.1.0-beta.1
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>Layout:</label>
            <select 
              value={orientation} 
              onChange={(e) => setOrientation(e.target.value as 'horizontal' | 'vertical')}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              <option value="horizontal">Horizontal Split</option>
              <option value="vertical">Vertical Split</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>
              <input 
                type="checkbox" 
                checked={allowTabSharing}
                onChange={(e) => setAllowTabSharing(e.target.checked)}
                style={{ marginRight: '4px' }}
              />
              Allow tab sharing
            </label>
          </div>
          
          <div style={{ fontSize: '12px', color: '#6b7280' }}>
            Active tabs: {panels[0].tabs.length + panels[1].tabs.length}
          </div>
        </div>
      </div>

              {/* Main content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Side menu */}
          <SideMenu onMenuClick={handleMenuClick} />
          
          {/* Dual tab panel */}
          <div style={{ flex: 1 }}>
            <DualTabPanel
              panels={panels}
              onPanelsChange={setPanels}
              orientation={orientation}
              defaultSplitRatio={0.6}
              allowTabSharing={allowTabSharing}
            />
          </div>
        </div>
    </div>
  );
} 