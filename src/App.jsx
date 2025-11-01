// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import ProductsPages from './components/Pages/ProductsPages/ProductsPages';
import PCBuilder from './components/PCBuilder/PCBuilder';
import LaptopsPages from './components/Pages/LaptopsPages/LaptopsPages';
import DesktopsPages from './components/Pages/DesktopsPages/DesktopsPages';

import LoginPage from './AdminPanel/LoginPage/LoginPage';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductsPages />} />
          <Route path="/laptops" element={<LaptopsPages />} />
          <Route path="/desktops" element={<DesktopsPages />} />
          <Route path="/pc-builder" element={<PCBuilder />} />

          {/* ✅ Admin Login Route */}
          <Route path="/admin" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
