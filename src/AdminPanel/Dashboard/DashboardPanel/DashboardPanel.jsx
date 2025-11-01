//src/AdminPanel/Dashboard/DashboardPanel/DashboardPanel.jsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import LeftSideBar from '../LeftSideBar/LeftSideBar';
import MainPage from '../MainPage/MainPage';
import styles from './DashboardPanel.module.css';

const DashboardPanel = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('DASHBOARD');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div className={styles.dashboard}>
      <Header 
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className={styles.dashboardBody}>
        <LeftSideBar 
          isCollapsed={isSidebarCollapsed}
          onMenuClick={handleMenuClick}
        />
        <MainPage activeMenu={activeMenu} />
      </div>
    </div>
  );
};

export default DashboardPanel;