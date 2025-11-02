import React, { useState, useEffect } from 'react';
import { 
  FiMenu, 
  FiSearch, 
  FiBell, 
  FiUser, 
  FiSettings, 
  FiLogOut,
  FiChevronDown,
  FiX,
  FiArrowLeft
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { logoutUser, getCurrentUser } from '../../../firebase/services/authService';

const Header = ({ onToggleSidebar, isSidebarCollapsed, currentPage, onBackToDashboard }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Load current user data
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    };

    loadCurrentUser();
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

  const handleLogoutClick = () => {
    setShowProfileDropdown(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      // Clear any stored user data
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
      
      // Navigate to login page
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Get user initials for avatar
  const getUserInitials = (user) => {
    if (!user || !user.displayName) return 'U';
    return user.displayName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get user role display name
  const getUserRoleDisplayName = (user) => {
    if (!user || !user.role) return 'User';
    
    const roleNames = {
      'super_admin': 'Super Admin',
      'admin': 'Admin',
      'manager': 'Manager',
      'support': 'Support',
      'viewer': 'Viewer'
    };
    
    return roleNames[user.role] || user.role;
  };

  return (
    <>
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
                {currentUser ? (
                  <span className={styles.avatarText}>
                    {getUserInitials(currentUser)}
                  </span>
                ) : (
                  <FiUser size={16} />
                )}
              </div>
              {!isMobile && (
                <>
                  <span className={styles.profileName}>
                    {currentUser ? currentUser.displayName : 'Loading...'}
                  </span>
                  <FiChevronDown size={14} />
                </>
              )}
            </button>
            {showProfileDropdown && (
              <div className={styles.profileDropdown}>
                <div className={styles.profileInfo}>
                  <div className={styles.avatarLarge}>
                    {currentUser ? (
                      <span className={styles.avatarLargeText}>
                        {getUserInitials(currentUser)}
                      </span>
                    ) : (
                      <FiUser size={20} />
                    )}
                  </div>
                  <div className={styles.profileDetails}>
                    <strong>{currentUser ? currentUser.displayName : 'Loading...'}</strong>
                    {currentUser && (
                      <span className={styles.userRole}>
                        {getUserRoleDisplayName(currentUser)}
                      </span>
                    )}
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
                <button 
                  className={styles.dropdownItem}
                  onClick={handleLogoutClick}
                >
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Confirm Logout</h2>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalIcon}>
                <FiLogOut size={32} />
              </div>
              <p>Are you sure you want to logout?</p>
              <p className={styles.modalSubtext}>You will need to login again to access the admin panel.</p>
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={handleCancelLogout}
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <div className={styles.spinner}></div>
                    Logging out...
                  </>
                ) : (
                  'Yes, Logout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;