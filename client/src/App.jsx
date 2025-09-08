// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import ProductsPages from './components/Pages/ProductsPages/ProductsPages';
import './index.css';
import LaptopsPages from './components/Pages/LaptopsPages/LaptopsPages';
import DesktopsPages from './components/Pages/DesktopsPages/DesktopsPages';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductsPages />} />
          <Route path="/laptops" element={<LaptopsPages />} />
          <Route path="/desktops" element={<DesktopsPages />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;