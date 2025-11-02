import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiSearch, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import styles from './Header.module.css';

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileDropdown(false);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowNotifications(false);
  };

  const handleSearchToggle = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.logo}>
          <span className={styles.tb}>TB</span> 
          {!isMobile && <span className={styles.logoText}>ADMIN PANEL</span>}
        </div>
        <button 
          className={styles.sidebarToggle}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu size={20} />
        </button>
      </div>

      <div className={`${styles.headerCenter} ${showMobileSearch ? styles.mobileSearchActive : ''}`}>
        {(!isMobile || showMobileSearch) && (
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search products, orders, users..." 
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <FiSearch size={16} />
            </button>
            {isMobile && (
              <button 
                className={styles.closeSearch}
                onClick={handleSearchToggle}
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles.headerRight}>
        {isMobile && !showMobileSearch && (
          <button 
            className={styles.searchToggle}
            onClick={handleSearchToggle}
            aria-label="Search"
          >
            <FiSearch size={18} />
          </button>
        )}

        <div className={styles.notifications}>
          <button 
            className={styles.notificationBell}
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <FiBell size={18} />
            <span className={styles.notificationBadge}>3</span>
          </button>
          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h4>Notifications</h4>
                <span className={styles.notificationCount}>3 new</span>
              </div>
              <div className={styles.notificationList}>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationIcon}>🛒</div>
                  <div className={styles.notificationContent}>
                    <strong>New Order</strong>
                    <span>Order #1234 received</span>
                    <small>2 min ago</small>
                  </div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationIcon}>📦</div>
                  <div className={styles.notificationContent}>
                    <strong>Low Stock</strong>
                    <span>Product XYZ is running low</span>
                    <small>1 hour ago</small>
                  </div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationIcon}>🔄</div>
                  <div className={styles.notificationContent}>
                    <strong>System Update</strong>
                    <span>New features available</span>
                    <small>3 hours ago</small>
                  </div>
                </div>
              </div>
              <button className={styles.viewAllButton}>View All Notifications</button>
            </div>
          )}
        </div>

        <div className={styles.profile}>
          <button 
            className={styles.profileButton}
            onClick={handleProfileClick}
            aria-label="Profile menu"
          >
            <div className={styles.avatar}>
              <FiUser size={16} />
            </div>
            {!isMobile && (
              <>
                <span className={styles.profileName}>Admin User</span>
                <FiChevronDown size={14} />
              </>
            )}
          </button>
          {showProfileDropdown && (
            <div className={styles.profileDropdown}>
              <div className={styles.profileInfo}>
                <div className={styles.avatarLarge}>
                  <FiUser size={20} />
                </div>
                <div className={styles.profileDetails}>
                  <strong>Admin User</strong>
                  <span>admin@example.com</span>
                </div>
              </div>
              <div className={styles.dropdownDivider}></div>
              <button className={styles.dropdownItem}>
                <FiUser size={16} />
                <span>Profile</span>
              </button>
              <button className={styles.dropdownItem}>
                <FiSettings size={16} />
                <span>Settings</span>
              </button>
              <div className={styles.dropdownDivider}></div>
              <button className={styles.dropdownItem}>
                <FiLogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for dropdowns on mobile */}
      {(showNotifications || showProfileDropdown) && isMobile && (
        <div 
          className={styles.dropdownOverlay}
          onClick={() => {
            setShowNotifications(false);
            setShowProfileDropdown(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;