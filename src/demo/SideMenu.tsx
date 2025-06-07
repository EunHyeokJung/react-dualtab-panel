import React from 'react';

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  category?: string;
}

interface SideMenuProps {
  onMenuClick: (menuItem: MenuItem) => void;
}

const menuItems: MenuItem[] = [
  // Dashboard section
  { id: 'dashboard', title: 'Dashboard', icon: '📊', category: 'Main' },
  { id: 'analytics', title: 'Analytics', icon: '📈', category: 'Main' },
  { id: 'reports', title: 'Reports', icon: '📋', category: 'Main' },
  
  // Management section
  { id: 'users', title: 'User Management', icon: '👥', category: 'Management' },
  { id: 'roles', title: 'Role Management', icon: '🔐', category: 'Management' },
  { id: 'audit', title: 'Audit Log', icon: '📜', category: 'Management' },
  
  // Settings section
  { id: 'settings', title: 'System Settings', icon: '⚙️', category: 'Settings' },
  { id: 'profile', title: 'Profile', icon: '👤', category: 'Settings' },
  { id: 'notifications', title: 'Notifications', icon: '🔔', category: 'Settings' },
];

const categoryOrder = ['Main', 'Management', 'Settings'];

export function SideMenu({ onMenuClick }: SideMenuProps) {
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div style={{
      width: '240px',
      height: '100%',
      backgroundColor: '#1f2937',
      color: '#f3f4f6',
      overflow: 'auto',
      borderRight: '1px solid #374151'
    }}>
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid #374151',
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff'
      }}>
        📱 Admin Panel
      </div>
      
      <div style={{ padding: '8px 0' }}>
        {categoryOrder.map(category => {
          const items = groupedItems[category] || [];
          if (items.length === 0) return null;
          
          return (
            <div key={category} style={{ marginBottom: '8px' }}>
              <div style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#9ca3af',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {category}
              </div>
              
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onMenuClick(item)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#d1d5db',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#374151';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#d1d5db';
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '16px' }}>
                    {item.icon}
                  </span>
                  {item.title}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
} 