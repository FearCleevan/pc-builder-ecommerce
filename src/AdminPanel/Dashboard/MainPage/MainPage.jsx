//src/AdminPaneel/Dashboard/MainPage/MainPage.jsx
import React from 'react';
import styles from './MainPage.module.css';

const MainPage = ({ activeMenu }) => {
  const getPageTitle = () => {
    if (!activeMenu) return 'Dashboard Overview';
    return activeMenu;
  };

  const getPageContent = () => {
    if (!activeMenu || activeMenu === 'DASHBOARD') {
      return (
        <div className={styles.dashboardGrid}>
          <div className={styles.statCard}>
            <h3>Total Revenue</h3>
            <p className={styles.statValue}>$24,580</p>
            <span className={styles.statChange}>+12% from last month</span>
          </div>
          <div className={styles.statCard}>
            <h3>Orders</h3>
            <p className={styles.statValue}>1,248</p>
            <span className={styles.statChange}>+8% from last month</span>
          </div>
          <div className={styles.statCard}>
            <h3>Customers</h3>
            <p className={styles.statValue}>8,452</p>
            <span className={styles.statChange}>+15% from last month</span>
          </div>
          <div className={styles.statCard}>
            <h3>Products</h3>
            <p className={styles.statValue}>356</p>
            <span className={styles.statChange}>+5% from last month</span>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.pageContent}>
        <h2>{getPageTitle()}</h2>
        <p>This is the {getPageTitle().toLowerCase()} page. Content will be implemented based on the selected menu.</p>
        <div className={styles.placeholder}>
          <p>🚀 Feature coming soon!</p>
          <p>This section is ready for implementation of {getPageTitle()} functionality.</p>
        </div>
      </div>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1>{getPageTitle()}</h1>
        <p>Welcome to your admin dashboard</p>
      </div>
      {getPageContent()}
    </main>
  );
};

export default MainPage;