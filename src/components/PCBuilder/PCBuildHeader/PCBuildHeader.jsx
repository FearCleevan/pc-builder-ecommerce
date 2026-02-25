import React, { useState, useEffect, useRef } from 'react';
import styles from './PCBuildHeader.module.css';
import BuildCostModal from './BuildCostModal/BuildCostModal';
import CompatibilityModal from './CompatibilityModal/CompatibilityModal';
import WattageModal from './WattageModal/WattageModal';

const PCBuildHeader = ({
  selectedComponents = {},
  onClearAll,
  hasSelectedComponents,
  compatibilityReport,
  wattageReport,
  buildAssemblyOption,
  onBuildAssemblyOptionChange,
  onAddToCart
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [buildName, setBuildName] = useState('New Build');
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);
  const [isCompatibilityModalOpen, setIsCompatibilityModalOpen] = useState(false);
  const [isWattageModalOpen, setIsWattageModalOpen] = useState(false);
  const animationFrameRef = useRef(null);
  const displayPriceRef = useRef(0);
  
  useEffect(() => {
    displayPriceRef.current = displayPrice;
  }, [displayPrice]);

  // Calculate total price whenever selectedComponents changes
  useEffect(() => {
    const newTotalPrice = Object.values(selectedComponents).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedComponents]);

  // Animate displayed price only when totalPrice changes
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startValue = displayPriceRef.current;
    const endValue = totalPrice;

    if (startValue === endValue) {
      setDisplayPrice(endValue);
      return undefined;
    }

    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;

      setDisplayPrice(Math.floor(currentValue));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalPrice]);

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

  const handleCostModalOpen = () => {
    setIsCostModalOpen(true);
  };

  const handleCostModalClose = () => {
    setIsCostModalOpen(false);
  };

  const handleCompatibilityModalOpen = () => {
    setIsCompatibilityModalOpen(true);
  };

  const handleCompatibilityModalClose = () => {
    setIsCompatibilityModalOpen(false);
  };

  const handleWattageModalOpen = () => {
    setIsWattageModalOpen(true);
  };

  const handleWattageModalClose = () => {
    setIsWattageModalOpen(false);
  };

  const handleClearAllClick = () => {
    setIsClearAllModalOpen(true);
  };

  const handleClearAllConfirm = () => {
    onClearAll();
    setIsClearAllModalOpen(false);
  };

  const handleClearAllCancel = () => {
    setIsClearAllModalOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <>
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
                <p className={styles.metaText}>{new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
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

          {/* Clear All Button */}
          {hasSelectedComponents && (
            <div className={styles.clearAllSection}>
              <button 
                className={styles.clearAllButton}
                onClick={handleClearAllClick}
              >
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                  </svg>
                </span>
                <span className={styles.tabletText}>Clear All Components</span>
                <span className={styles.mobileText}>Clear All</span>
              </button>
            </div>
          )}
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
                  <div className={styles.statNumber}>{formatPrice(displayPrice)}</div>
                </div>
              </div>
              <div className={styles.statDropdown} onClick={handleCostModalOpen}>
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
                  <span>{compatibilityReport?.isCompatible ? 'Compatible' : 'Needs Attention'}</span>
                </div>
              </div>
              <div className={styles.statDropdown} onClick={handleCompatibilityModalOpen}>
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
                  <div className={styles.statNumber}>{wattageReport?.totalEstimatedWattage || 0}W</div>
                </div>
              </div>
              <div className={styles.statDropdown} onClick={handleWattageModalOpen}>
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
            <div className={styles.buildModeSection}>
              <span className={styles.buildModeLabel}>Build Option</span>
              <div className={styles.buildModeButtons}>
                <button
                  className={`${styles.buildModeButton} ${buildAssemblyOption === 'store-build' ? styles.buildModeButtonActive : ''}`}
                  onClick={() => onBuildAssemblyOptionChange('store-build')}
                  type="button"
                >
                  Build by Store
                </button>
                <button
                  className={`${styles.buildModeButton} ${buildAssemblyOption === 'components-only' ? styles.buildModeButtonActive : ''}`}
                  onClick={() => onBuildAssemblyOptionChange('components-only')}
                  type="button"
                >
                  Components Only
                </button>
              </div>
            </div>

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

      {/* Build Cost Modal */}
      <BuildCostModal 
        isOpen={isCostModalOpen}
        onClose={handleCostModalClose}
        selectedComponents={selectedComponents}
        totalPrice={totalPrice}
        buildName={buildName}
        compatibilityReport={compatibilityReport}
        wattageReport={wattageReport}
        buildAssemblyOption={buildAssemblyOption}
        onAddToCart={onAddToCart}
      />

      <CompatibilityModal
        isOpen={isCompatibilityModalOpen}
        onClose={handleCompatibilityModalClose}
        selectedComponents={selectedComponents}
        compatibilityReport={compatibilityReport}
        wattageReport={wattageReport}
      />

      <WattageModal
        isOpen={isWattageModalOpen}
        onClose={handleWattageModalClose}
        wattageReport={wattageReport}
      />

      {/* Clear All Confirmation Modal */}
      {isClearAllModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </div>
              <h3 className={styles.modalTitle}>Clear All Components</h3>
            </div>
            
            <div className={styles.modalBody}>
              <p>Are you sure you want to clear all components from your build?</p>
              <p className={styles.modalWarning}>This action cannot be undone.</p>
            </div>
            
            <div className={styles.modalActions}>
              <button 
                className={styles.cancelButton}
                onClick={handleClearAllCancel}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmButton}
                onClick={handleClearAllConfirm}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PCBuildHeader;
