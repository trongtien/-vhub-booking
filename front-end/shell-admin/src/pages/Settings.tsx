import React from 'react';

const Settings: React.FC = () => {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Settings
      </h2>
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginTop: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Site Name
          </label>
          <input 
            type="text" 
            defaultValue="Admin Portal"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem'
            }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Email Notifications
          </label>
          <input type="checkbox" defaultChecked />
          <span style={{ marginLeft: '0.5rem' }}>Enable email notifications</span>
        </div>
        <button style={{ 
          background: '#3b82f6', 
          color: 'white', 
          padding: '0.5rem 1.5rem',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
