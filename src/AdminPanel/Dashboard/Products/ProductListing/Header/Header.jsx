import React from 'react';
import { FiGrid, FiList, FiPackage, FiDownload, FiUpload } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = ({
  title,
  subtitle,
  viewMode,
  onViewModeChange,
  selectedCount,
  onBulkOperationsClick
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.statsBadge}>
          <FiPackage size={16} />
          <span>{selectedCount} selected</span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.viewModeToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
          >
            <FiGrid size={18} />
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'table' ? styles.active : ''}`}
            onClick={() => onViewModeChange('table')}
            title="Table View"
          >
            <FiList size={18} />
          </button>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.exportButton}>
            <FiDownload size={16} />
            <span>Export</span>
          </button>
          <button className={styles.importButton}>
            <FiUpload size={16} />
            <span>Import</span>
          </button>
          
          {selectedCount > 0 && (
            <button
              className={styles.bulkActionButton}
              onClick={onBulkOperationsClick}
            >
              Bulk Actions ({selectedCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;