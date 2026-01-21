import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: '',
    email: '',
    phone: '',
    product: '',
    quantity: 1,
    shippingAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Order created:', formData);
    navigate('/order/list');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Create New Order
      </h2>

      <form onSubmit={handleSubmit} style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Customer Name *
          </label>
          <input 
            type="text" 
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
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
            Email *
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            Phone
          </label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
            Product *
          </label>
          <select 
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem'
            }}
          >
            <option value="">Select a product</option>
            <option value="product-a">Product A</option>
            <option value="product-b">Product B</option>
            <option value="product-c">Product C</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Quantity *
          </label>
          <input 
            type="number" 
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
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
            Shipping Address *
          </label>
          <textarea 
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
            rows={3}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="submit"
            style={{ 
              background: '#059669', 
              color: 'white', 
              padding: '0.75rem 2rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Create Order
          </button>
          <button 
            type="button"
            onClick={() => navigate('/pos/list')}
            style={{ 
              background: '#e5e7eb', 
              color: '#374151', 
              padding: '0.75rem 2rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
