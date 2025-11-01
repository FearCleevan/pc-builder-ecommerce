//src/AdminPanel/Dashboard/Header/Header.jsx
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <span className={styles.tb}>TB</span> ADMIN PANEL
        </div>
        <button 
          className={styles.sidebarToggle}
          onClick={onToggleSidebar}
        >
          ☰
        </button>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search products, orders, users..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>🔍</button>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.notifications}>
          <button 
            className={styles.notificationBell}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
          </button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationItem}>
                <strong>New Order</strong>
                <span>Order #1234 received</span>
              </div>
              <div className={styles.notificationItem}>
                <strong>Low Stock</strong>
                <span>Product XYZ is running low</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.profile}>
          <button 
            className={styles.profileButton}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className={styles.avatar}>A</div>
          </button>
          {showProfileDropdown && (
            <div className={styles.profileDropdown}>
              <button className={styles.dropdownItem}>Profile</button>
              <button className={styles.dropdownItem}>Settings</button>
              <button className={styles.dropdownItem}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;