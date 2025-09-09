//client/src/components/PCBuilder/PCBuildHeader/PCBuildHeader.jsx
import React from 'react';
import styles from './PCBuildHeader.module.css';

const PCBuildHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.titleSection}>
          <p className={styles.buildTitle}>
            New Build
            <span className={styles.editIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
            </span>
          </p>
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <p className={styles.metaText}>September 9, 2025</p>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaIcon}>
                <span className={styles.avatar}>
                  <span className={styles.avatarInner}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="10" r="3"></circle>
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                    </svg>
                  </span>
                </span>
              </div>
              <p className={styles.metaText}>Anonymous</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        {/* Stats items would go here */}
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.shareSection}>
          <p className={styles.shareLabel}>Share</p>
          <div className={styles.shareButtons}>
            <div className={styles.buttonWrapper}>
              <div className={styles.loadingSpinner}>
                {/* Loading spinner SVG */}
              </div>
              <button className={styles.shareButton}>
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </span>
                <span>Link</span>
              </button>
            </div>
            {/* Other share buttons */}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.buttonWrapper}>
            <button className={styles.actionButton} disabled>
              <span className={styles.buttonIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                  <path d="m2 2 20 20"></path>
                </svg>
              </span>
              <span>3D Unavailable</span>
            </button>
          </div>
          {/* Other action buttons */}
        </div>
      </div>
    </div>
  );
};

export default PCBuildHeader;