import React, { useState } from 'react';
import { 
  FiHome, 
  FiPackage, 
  FiArchive, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings, 
  FiBell, 
  FiStore,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import styles from './LeftSideBar.module.css';

const LeftSideBar = ({ isCollapsed, onMenuClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const menuItems = [
    { name: 'DASHBOARD', icon: <FiHome size={18} />, hasDropdown: false },
    { name: 'PRODUCTS', icon: <FiPackage size={18} />, hasDropdown: true, items: ['All Products', 'Add Product', 'Categories'] },
    { name: 'INVENTORY', icon: <FiArchive size={18} />, hasDropdown: true, items: ['Inventory Monitor', 'Inventory Logs'] },
    { name: 'ORDERS', icon: <FiShoppingCart size={18} />, hasDropdown: true, items: ['All Orders', 'Carts (Abandoned / Active)'] },
    { name: 'CUSTOMERS', icon: <FiUsers size={18} />, hasDropdown: true, items: ['Users', 'Reviews'] },
    { name: 'ADMINISTRATION', icon: <FiSettings size={18} />, hasDropdown: true, items: ['Admin Accounts', 'Roles & Permissions', 'Audit Logs'] },
    { name: 'NOTIFICATIONS', icon: <FiBell size={18} />, hasDropdown: true, items: ['Alerts', 'Notification Settings'] },
    { name: 'STORE SETTINGS', icon: <FiStore size={18} />, hasDropdown: true, items: ['General Settings', 'Payment Settings', 'Shipping Settings', 'Banners & Promotions'] }
  ];

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div key={item.name} className={styles.menuItem}>
            <button
              className={styles.menuButton}
              onClick={() => item.hasDropdown ? toggleDropdown(item.name) : onMenuClick(item.name)}
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
                    className={styles.subMenuItem}
                    onClick={() => onMenuClick(`${item.name} - ${subItem}`)}
                  >
                    • {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default LeftSideBar;