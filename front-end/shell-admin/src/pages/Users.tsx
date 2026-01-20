import React from 'react';

const Users: React.FC = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        User Management
      </h2>
      <div style={{ 
        background: 'white', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginTop: '2rem'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem 1rem' }}>{user.name}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{user.email}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
