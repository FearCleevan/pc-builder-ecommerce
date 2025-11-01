import React, { useState } from 'react';
import { 
  FiMenu, 
  FiSearch, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';
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
          <FiMenu size={20} />
        </button>
      </div>

      <div className={styles.headerCenter}>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search products, orders, users..." 
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <FiSearch size={16} />
          </button>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.notifications}>
          <button 
            className={styles.notificationBell}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell size={18} />
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
              <div className={styles.notificationItem}>
                <strong>System Update</strong>
                <span>New features available</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.profile}>
          <button 
            className={styles.profileButton}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className={styles.avatar}>
              <FiUser size={16} />
            </div>
            <FiChevronDown size={14} />
          </button>
          {showProfileDropdown && (
            <div className={styles.profileDropdown}>
              <button className={styles.dropdownItem}>
                <FiUser size={16} />
                <span>Profile</span>
              </button>
              <button className={styles.dropdownItem}>
                <FiSettings size={16} />
                <span>Settings</span>
              </button>
              <button className={styles.dropdownItem}>
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;