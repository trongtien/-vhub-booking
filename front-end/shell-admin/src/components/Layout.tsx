import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ 
        background: '#1f2937', 
        color: 'white', 
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Admin Portal</h1>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <nav style={{ 
          width: '250px', 
          background: '#f3f4f6', 
          padding: '1rem',
          borderRight: '1px solid #e5e7eb'
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/shell-admin/dashboard" style={{ 
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s'
              }}>
                Dashboard
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/shell-admin/users" style={{ 
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s'
              }}>
                Users
              </Link>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <Link to="/shell-admin/settings" style={{ 
                display: 'block',
                padding: '0.75rem 1rem',
                color: '#374151',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                transition: 'background-color 0.2s'
              }}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
