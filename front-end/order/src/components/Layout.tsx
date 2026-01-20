import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ 
        background: '#059669', 
        color: 'white', 
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Order Management</h1>
          <nav>
            <Link to="/order/list" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              marginRight: '1.5rem',
              fontWeight: '500'
            }}>
              Orders
            </Link>
            <Link to="/order/create" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              New Order
            </Link>
          </nav>
        </div>
      </header>
      <main style={{ flex: 1, padding: '2rem', background: '#f9fafb' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
