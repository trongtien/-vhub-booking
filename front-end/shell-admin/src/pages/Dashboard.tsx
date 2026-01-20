import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Admin Dashboard
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Total Users
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
            1,234
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Active Sessions
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
            567
          </p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            Revenue
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
            $89,000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
