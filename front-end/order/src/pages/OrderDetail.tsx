import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const orderDetails = {
    id,
    orderNumber: `ORD-00${id}`,
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    status: 'processing',
    total: 1250.00,
    date: '2026-01-15',
    items: [
      { name: 'Product A', quantity: 2, price: 500.00 },
      { name: 'Product B', quantity: 1, price: 250.00 },
    ],
    shippingAddress: '123 Main St, City, State 12345',
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/order/list" style={{ 
          color: '#3b82f6', 
          textDecoration: 'none',
          fontSize: '0.875rem'
        }}>
          ← Back to Orders
        </Link>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Order Details - {orderDetails.orderNumber}
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Customer Information
          </h3>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Name:</strong> {orderDetails.customer}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Email:</strong> {orderDetails.email}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Phone:</strong> {orderDetails.phone}
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Order Information
          </h3>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Date:</strong> {orderDetails.date}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Status:</strong> {orderDetails.status}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <strong>Total:</strong> ${orderDetails.total.toFixed(2)}
          </div>
        </div>

        <div style={{ 
          gridColumn: 'span 2',
          background: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Order Items
          </h3>
          <table style={{ width: '100%' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Quantity</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem' }}>{item.name}</td>
                  <td style={{ padding: '0.75rem' }}>{item.quantity}</td>
                  <td style={{ padding: '0.75rem' }}>${item.price.toFixed(2)}</td>
                  <td style={{ padding: '0.75rem' }}>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ 
          gridColumn: 'span 2',
          background: 'white', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            Shipping Address
          </h3>
          <p>{orderDetails.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
