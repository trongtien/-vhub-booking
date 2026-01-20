import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import OrderList from './pages/OrderList';
import OrderDetail from './pages/OrderDetail';
import CreateOrder from './pages/CreateOrder';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/order">
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/list" replace />} />
          <Route path="/list" element={<OrderList />} />
          <Route path="/detail/:id" element={<OrderDetail />} />
          <Route path="/create" element={<CreateOrder />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
