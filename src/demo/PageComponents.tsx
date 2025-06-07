import React from 'react';

// Main components
export const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h2>📊 Dashboard</h2>
    <p>Overview of system status and key metrics at a glance.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '20px' }}>
      <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>Total Users</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>1,234</p>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>Monthly Revenue</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>$12,345</p>
      </div>
      <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>Active Sessions</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>89</p>
      </div>
    </div>
  </div>
);

export const Users = () => (
  <div style={{ padding: '20px' }}>
    <h2>👥 User Management</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <p>Manage registered users and their permissions.</p>
      <button style={{ 
        padding: '8px 16px', 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        + Add User
      </button>
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f9fafb' }}>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Name</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Email</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Role</th>
          <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {[
          { name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'Active' },
          { name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'Active' },
          { name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive' },
        ].map((user, index) => (
          <tr key={index}>
            <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{user.name}</td>
            <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{user.email}</td>
            <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>{user.role}</td>
            <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px',
                backgroundColor: user.status === 'Active' ? '#d1fae5' : '#fee2e2',
                color: user.status === 'Active' ? '#065f46' : '#991b1b'
              }}>
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Settings = () => (
  <div style={{ padding: '20px' }}>
    <h2>⚙️ System Settings</h2>
    <p>Manage overall system configuration and preferences.</p>
    <div style={{ marginTop: '20px', maxWidth: '500px' }}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Site Name
        </label>
        <input 
          type="text" 
          defaultValue="My Dashboard"
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '6px' 
          }}
        />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Language
        </label>
        <select style={{ 
          width: '100%', 
          padding: '8px 12px', 
          border: '1px solid #d1d5db', 
          borderRadius: '6px' 
        }}>
          <option>English</option>
          <option>한국어</option>
          <option>日本語</option>
        </select>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" defaultChecked style={{ marginRight: '8px' }} />
          Enable email notifications
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          <input type="checkbox" style={{ marginRight: '8px' }} />
          Enable push notifications
        </label>
      </div>
    </div>
  </div>
);

// Additional components
export const Analytics = () => (
  <div style={{ padding: '20px' }}>
    <h2>📈 Analytics</h2>
    <p>View site analytics and performance data.</p>
    <div style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>Visitor Statistics</h3>
        <div style={{ height: '200px', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#6b7280' }}>📊 Chart Area (Use Chart.js or similar in production)</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h4>Today's Visitors</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>2,456</p>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h4>Page Views</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>8,234</p>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h4>Avg. Session Duration</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>3m 24s</p>
        </div>
      </div>
    </div>
  </div>
);

export const Reports = () => (
  <div style={{ padding: '20px' }}>
    <h2>📋 Reports</h2>
    <p>Generate and manage various reports.</p>
    <div style={{ marginTop: '20px' }}>
      {['Monthly User Report', 'Revenue Analysis Report', 'System Performance Report'].map((report, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px', 
          borderBottom: '1px solid #e5e7eb' 
        }}>
          <div>
            <h4 style={{ margin: 0 }}>{report}</h4>
            <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
              Last generated: Jan {15 + index}, 2024
            </p>
          </div>
          <button style={{ 
            padding: '6px 12px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Download
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const Roles = () => (
  <div style={{ padding: '20px' }}>
    <h2>🔐 Role Management</h2>
    <p>Manage user roles and permissions.</p>
    <div style={{ marginTop: '20px' }}>
      {[
        { name: 'Administrator', users: 3, permissions: ['All permissions'] },
        { name: 'Editor', users: 12, permissions: ['Content editing', 'View users'] },
        { name: 'User', users: 156, permissions: ['Basic access'] }
      ].map((role, index) => (
        <div key={index} style={{ 
          padding: '16px', 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{role.name}</h4>
              <p style={{ margin: '4px 0', color: '#6b7280' }}>{role.users} users</p>
              <div style={{ marginTop: '8px' }}>
                {role.permissions.map((perm, i) => (
                  <span key={i} style={{ 
                    display: 'inline-block',
                    padding: '2px 8px', 
                    backgroundColor: '#e0e7ff', 
                    color: '#3730a3',
                    borderRadius: '4px', 
                    fontSize: '12px',
                    marginRight: '4px'
                  }}>
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <button style={{ 
              padding: '6px 12px', 
              backgroundColor: '#6b7280', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AuditLog = () => (
  <div style={{ padding: '20px' }}>
    <h2>📜 Audit Log</h2>
    <p>Track all system activities and user actions.</p>
    <div style={{ marginTop: '20px' }}>
      {[
        { user: 'John Smith', action: 'User created', target: 'user:new_user@example.com', time: '2024-01-15 14:30' },
        { user: 'Jane Doe', action: 'Settings changed', target: 'system:notification_settings', time: '2024-01-15 13:22' },
        { user: 'Mike Johnson', action: 'Report downloaded', target: 'report:monthly_users', time: '2024-01-15 12:15' },
        { user: 'John Smith', action: 'Permission modified', target: 'user:editor@example.com', time: '2024-01-15 11:45' },
      ].map((log, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12px', 
          borderBottom: '1px solid #e5e7eb',
          fontSize: '14px'
        }}>
          <div style={{ flex: 1 }}>
            <strong>{log.user}</strong> performed <strong>{log.action}</strong>
            <br />
            <span style={{ color: '#6b7280' }}>Target: {log.target}</span>
          </div>
          <div style={{ color: '#6b7280', fontSize: '12px' }}>
            {log.time}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Profile = () => (
  <div style={{ padding: '20px' }}>
    <h2>👤 Profile</h2>
    <p>Manage your personal account information.</p>
    <div style={{ marginTop: '20px', maxWidth: '500px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#e5e7eb', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          marginRight: '16px'
        }}>
          👤
        </div>
        <div>
          <h3 style={{ margin: 0 }}>John Smith</h3>
          <p style={{ margin: '4px 0', color: '#6b7280' }}>admin@example.com</p>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Name
        </label>
        <input 
          type="text" 
          defaultValue="John Smith"
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '6px' 
          }}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Email
        </label>
        <input 
          type="email" 
          defaultValue="admin@example.com"
          style={{ 
            width: '100%', 
            padding: '8px 12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '6px' 
          }}
        />
      </div>
      
      <button style={{ 
        padding: '10px 20px', 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Save Changes
      </button>
    </div>
  </div>
);

export const Notifications = () => (
  <div style={{ padding: '20px' }}>
    <h2>🔔 Notifications</h2>
    <p>Manage your notification preferences.</p>
    <div style={{ marginTop: '20px', maxWidth: '500px' }}>
      {[
        { title: 'Email Notifications', desc: 'Receive important updates via email', checked: true },
        { title: 'Push Notifications', desc: 'Receive browser push notifications', checked: false },
        { title: 'System Notifications', desc: 'System maintenance and update alerts', checked: true },
        { title: 'Marketing Notifications', desc: 'New features and event notifications', checked: false }
      ].map((setting, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          marginBottom: '8px'
        }}>
          <div>
            <h4 style={{ margin: 0 }}>{setting.title}</h4>
            <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
              {setting.desc}
            </p>
          </div>
          <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
            <input 
              type="checkbox" 
              defaultChecked={setting.checked}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span style={{
              position: 'absolute',
              cursor: 'pointer',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: setting.checked ? '#3b82f6' : '#ccc',
              borderRadius: '24px',
              transition: '0.4s'
            }}>
              <span style={{
                position: 'absolute',
                content: '',
                height: '18px',
                width: '18px',
                left: setting.checked ? '23px' : '3px',
                bottom: '3px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: '0.4s'
              }} />
            </span>
          </label>
        </div>
      ))}
    </div>
  </div>
); 