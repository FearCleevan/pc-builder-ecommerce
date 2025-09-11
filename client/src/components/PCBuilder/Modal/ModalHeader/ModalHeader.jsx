// client/src/components/PCBuilder/Modal/ModalHeader/ModalHeader.jsx
import React from 'react';
import styles from './ModalHeader.module.css';

const ModalHeader = ({ title, onClose = true }) => {
  return (
    <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>{title}</h2>
      {/* <div className={styles.headerContent}>
        {showFilters && (
          <div className={styles.filterSection}>
            <div className={styles.filterCheckbox}>
              <input type="checkbox" id="compatibility" defaultChecked />
              <label htmlFor="compatibility">Compatibility Filter</label>
            </div>
            <div className={styles.filterCheckbox}>
              <input type="checkbox" id="3d-only" />
              <label htmlFor="3d-only">
                <span className={styles.badge3D}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"></path>
                    <path d="m15.194 13.707 3.814 1.86-1.86 3.814"></path>
                    <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"></path>
                  </svg>
                  3D
                </span>
                Only
              </label>
            </div>
          </div>
        )}
        <div className={styles.headerActions}>
          <button className={styles.compareButton} disabled>
            Compare
          </button>
        </div>
      </div> */}
      <button className={styles.closeButton} onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default ModalHeader;