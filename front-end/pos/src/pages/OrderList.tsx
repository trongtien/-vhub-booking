import React from 'react';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  date: string;
}

const OrderList: React.FC = () => {
  const orders: Order[] = [
    { id: 1, orderNumber: 'ORD-001', customer: 'John Doe', status: 'completed', total: 1250.00, date: '2026-01-15' },
    { id: 2, orderNumber: 'ORD-002', customer: 'Jane Smith', status: 'processing', total: 850.50, date: '2026-01-18' },
    { id: 3, orderNumber: 'ORD-003', customer: 'Bob Johnson', status: 'pending', total: 2100.00, date: '2026-01-20' },
  ];

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      completed: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status];
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
          Orders
        </h2>
        <Link to="/order/create" style={{
          background: '#059669',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Create New Order
        </Link>
      </div>
      
      <div style={{ 
        background: 'white', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f9fafb' }}>
            <tr>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Order #</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Customer</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Total</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem' }}>{order.orderNumber}</td>
                <td style={{ padding: '1rem' }}>{order.customer}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: `${getStatusColor(order.status)}20`,
                    color: getStatusColor(order.status)
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>${order.total.toFixed(2)}</td>
                <td style={{ padding: '1rem' }}>{order.date}</td>
                <td style={{ padding: '1rem' }}>
                  <Link to={`/order/detail/${order.id}`} style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
