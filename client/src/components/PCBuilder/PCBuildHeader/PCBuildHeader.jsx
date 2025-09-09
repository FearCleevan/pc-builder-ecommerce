// client/src/components/PCBuilder/PCBuildHeader/PCBuildHeader.jsx
import React, { useState } from 'react';
import styles from './PCBuildHeader.module.css';

const PCBuildHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [buildName, setBuildName] = useState('New Build');
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleNameChange = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };
  
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.titleSection}>
          {isEditing ? (
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              onKeyDown={handleNameChange}
              onBlur={handleBlur}
              autoFocus
              className={styles.editInput}
            />
          ) : (
            <p className={styles.buildTitle}>
              {buildName}
              <span className={styles.editIcon} onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>
              </span>
            </p>
          )}
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
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={`${styles.statValue} ${styles.greenText}`}>
                <span className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                </span>
                <div className={styles.statNumber}>₱0.00</div>
              </div>
            </div>
            <div className={styles.statDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownIcon}>
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </div>
          </div>
          
          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={`${styles.statValue} ${styles.blueText}`}>
                <span className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </span>
                <span>Compatible</span>
              </div>
            </div>
            <div className={styles.statDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownIcon}>
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </div>
          </div>
          
          <div className={styles.statItem}>
            <div className={styles.statContent}>
              <div className={`${styles.statValue} ${styles.yellowText}`}>
                <span className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </span>
                <div className={styles.statNumber}>0W</div>
              </div>
            </div>
            <div className={styles.statDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.dropdownIcon}>
                <path d="m7 15 5 5 5-5"></path>
                <path d="m7 9 5-5 5 5"></path>
              </svg>
            </div>
          </div>
          
        </div>
      </div>

      <div className={styles.actionsContainer}>
        <div className={styles.shareSection}>
          <p className={styles.shareLabel}>Share</p>
          <div className={styles.shareButtons}>
            <div className={styles.buttonWrapper}>
              <div className={styles.loadingSpinner}>
                {/* Loading spinner would go here */}
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
            
            <div className={styles.buttonWrapper}>
              <div className={styles.loadingSpinner}>
                {/* Loading spinner would go here */}
              </div>
              <button className={styles.shareButton}>
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v18"></path>
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M3 15h18"></path>
                  </svg>
                </span>
                <span>Markdown Table</span>
              </button>
            </div>
            
            <div className={styles.buttonWrapper}>
              <div className={styles.loadingSpinner}>
                {/* Loading spinner would go here */}
              </div>
              <button className={styles.shareButton}>
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 7 4 4 20 4 20 7"></polyline>
                    <line x1="9" x2="15" y1="20" y2="20"></line>
                    <line x1="12" x2="12" y1="4" y2="20"></line>
                  </svg>
                </span>
                <span>Text</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.buttonWrapper}>
          </div>
          
          <div className={styles.buttonWrapper}>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                </svg>
              </span>
              <span className={styles.tabletText}>Clone Build</span>
              <span className={styles.mobileText}>Clone</span>
            </button>
          </div>
          
          <div className={styles.buttonWrapper}>
            <button className={styles.actionButton}>
              <span className={styles.buttonIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M12 2v2"></path>
                  <path d="M12 22v-2"></path>
                  <path d="m17 20.66-1-1.73"></path>
                  <path d="M11 10.27 7 3.34"></path>
                  <path d="m20.66 17-1.73-1"></path>
                  <path d="m3.34 7 1.73 1"></path>
                  <path d="M14 12h8"></path>
                  <path d="M2 12h2"></path>
                  <path d="m20.66 7-1.73 1"></path>
                  <path d="m3.34 17 1.73-1"></path>
                  <path d="m17 3.34-1 1.73"></path>
                  <path d="m11 13.73-4 6.93"></path>
                </svg>
              </span>
              <span className={styles.tabletText}>Build Settings</span>
              <span className={styles.mobileText}>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCBuildHeader;