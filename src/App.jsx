import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Main from './components/Main/Main';
import ProductsPages from './components/Pages/ProductsPages/ProductsPages';
import PCBuilder from './components/PCBuilder/PCBuilder';
import LaptopsPages from './components/Pages/LaptopsPages/LaptopsPages';
import DesktopsPages from './components/Pages/DesktopsPages/DesktopsPages';
import LoginPage from './AdminPanel/LoginPage/LoginPage';
import DashboardPanel from './AdminPanel/Dashboard/DashboardPanel/DashboardPanel';
import UserManagement from './AdminPanel/UserManagement/UserManagement';
import './index.css';
import { onAuthChange } from './firebase/services/authService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Protected Route Component for Admin Routes
  const ProtectedAdminRoute = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    if (!currentUser) {
      return <Navigate to="/admin" replace />;
    }

    if (!currentUser.isActive) {
      return <div className="error-screen">Your account has been deactivated. Please contact super admin.</div>;
    }

    return children;
  };

  // Public Route Component (redirect to dashboard if already logged in)
  const PublicAdminRoute = ({ children }) => {
    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }
    
    if (currentUser) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
  };

  // Loading screen component
  const LoadingScreen = () => (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public E-commerce Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/products" element={<ProductsPages />} />
          <Route path="/laptops" element={<LaptopsPages />} />
          <Route path="/desktops" element={<DesktopsPages />} />
          <Route path="/pc-builder" element={<PCBuilder />} />

          {/* Admin Authentication Routes */}
          <Route 
            path="/admin" 
            element={
              <PublicAdminRoute>
                <LoginPage />
              </PublicAdminRoute>
            } 
          />
          
          <Route 
            path="/admin/login" 
            element={
              <PublicAdminRoute>
                <LoginPage />
              </PublicAdminRoute>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedAdminRoute>
                <DashboardPanel />
              </ProtectedAdminRoute>
            } 
          />
          
          <Route 
            path="/admin/users" 
            element={
              <ProtectedAdminRoute>
                <UserManagement />
              </ProtectedAdminRoute>
            } 
          />

          {/* Redirects */}
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;