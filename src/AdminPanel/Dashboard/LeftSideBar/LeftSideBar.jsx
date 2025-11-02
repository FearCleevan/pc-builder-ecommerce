import React, { useState, useEffect } from 'react';
import { 
  FiHome, 
  FiPackage, 
  FiArchive, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings, 
  FiBell, 
  FiShoppingBag,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import styles from './LeftSideBar.module.css';

const LeftSideBar = ({ isCollapsed, onMenuClick, isMobile, currentPage }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  // Keep ADMINISTRATION dropdown open when on user management page
  useEffect(() => {
    if (currentPage === 'user-management') {
      setActiveDropdown('ADMINISTRATION');
    }
  }, [currentPage]);

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const menuItems = [
    { name: 'DASHBOARD', icon: <FiHome size={18} />, hasDropdown: false },
    { name: 'PRODUCTS', icon: <FiPackage size={18} />, hasDropdown: true, items: ['All Products', 'Add Product', 'Categories'] },
    { name: 'INVENTORY', icon: <FiArchive size={18} />, hasDropdown: true, items: ['Inventory Monitor', 'Inventory Logs'] },
    { name: 'ORDERS', icon: <FiShoppingCart size={18} />, hasDropdown: true, items: ['All Orders', 'Carts (Abandoned / Active)'] },
    { name: 'CUSTOMERS', icon: <FiUsers size={18} />, hasDropdown: true, items: ['Users', 'Reviews'] },
    { name: 'ADMINISTRATION', icon: <FiSettings size={18} />, hasDropdown: true, items: ['User Management', 'Roles & Permissions', 'Audit Logs'] },
    { name: 'NOTIFICATIONS', icon: <FiBell size={18} />, hasDropdown: true, items: ['Alerts', 'Notification Settings'] },
    { name: 'STORE SETTINGS', icon: <FiShoppingBag size={18} />, hasDropdown: true, items: ['General Settings', 'Payment Settings', 'Shipping Settings', 'Banners & Promotions'] }
  ];

  const handleMenuHover = (menuName) => {
    if (isCollapsed) {
      setHoveredMenu(menuName);
    }
  };

  const handleMenuLeave = () => {
    setHoveredMenu(null);
  };

  const handleMenuItemClick = (item, subItem = null) => {
    if (item.hasDropdown && !subItem) {
      toggleDropdown(item.name);
    } else if (subItem) {
      onMenuClick(`${item.name} - ${subItem}`);
    } else {
      onMenuClick(item.name);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''} ${isMobile ? styles.mobile : ''}`}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div 
            key={item.name} 
            className={styles.menuItem}
            onMouseEnter={() => handleMenuHover(item.name)}
            onMouseLeave={handleMenuLeave}
          >
            <button
              className={`${styles.menuButton} ${
                currentPage === 'user-management' && item.name === 'ADMINISTRATION' ? styles.activeMenu : ''
              }`}
              onClick={() => handleMenuItemClick(item)}
              data-tooltip={isCollapsed ? item.name : ''}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className={styles.menuText}>{item.name}</span>
                  {item.hasDropdown && (
                    <span className={styles.dropdownArrow}>
                      {activeDropdown === item.name ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                    </span>
                  )}
                </>
              )}
            </button>
            
            {!isCollapsed && item.hasDropdown && activeDropdown === item.name && (
              <div className={styles.dropdown}>
                {item.items.map((subItem) => (
                  <button
                    key={subItem}
                    className={`${styles.subMenuItem} ${
                      currentPage === 'user-management' && subItem === 'Admin Accounts' ? styles.activeSubMenu : ''
                    }`}
                    onClick={() => handleMenuItemClick(item, subItem)}
                  >
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      {/* Enhanced tooltip for collapsed state */}
      {isCollapsed && hoveredMenu && (
        <div className={styles.enhancedTooltip}>
          {hoveredMenu}
        </div>
      )}
    </aside>
  );
};

export default LeftSideBar;