// client/src/components/PCBuilder/CreateNewBuild/BuildListModal/BuildListModal.jsx
import React, { useState, useEffect } from 'react';
import styles from './BuildListModal.module.css';

const BuildListModal = ({ isOpen, onClose, onSelectBuild, onCreateNewBuild }) => {
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved builds from localStorage on component mount
  useEffect(() => {
    if (isOpen) {
      loadSavedBuilds();
    }
  }, [isOpen]);

  const loadSavedBuilds = () => {
    try {
      setIsLoading(true);
      const savedBuildsData = localStorage.getItem('pcBuilder_savedBuilds');
      if (savedBuildsData) {
        const builds = JSON.parse(savedBuildsData);
        setSavedBuilds(builds);
      } else {
        setSavedBuilds([]);
      }
    } catch (error) {
      console.error('Error loading saved builds:', error);
      setSavedBuilds([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuildSelect = (build) => {
    onSelectBuild(build);
    onClose();
  };

  const handleCreateNewBuild = () => {
    onCreateNewBuild();
    onClose();
  };

  const formatPrice = (price) => {
    if (!price || price === 0) return 'N/A';
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  const calculateTotalPrice = (components) => {
    return Object.values(components).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const getBuildImage = (components) => {
    // Return the first component with an image, or a default case image
    const componentWithImage = Object.values(components).find(comp => comp?.image || comp?.SampleImg);
    return componentWithImage?.image || componentWithImage?.SampleImg || null;
  };

  const getComponentDisplay = (components, maxDisplay = 2) => {
    const nonNullComponents = Object.entries(components)
      .filter(([, component]) => component !== null)
      .slice(0, maxDisplay);
    
    return nonNullComponents.map(([category, component]) => ({
      category,
      name: component?.name || 'Unknown',
      type: category
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-describedby="Switch Build"
      aria-labelledby="build-list-title"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <h2 id="build-list-title" className={styles.modalTitle}>Switch Build</h2>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.createButtonContainer}>
              <div className={styles.loadingSpinner} style={{ opacity: 0, transform: 'scale(0.5)' }}>
                <div role="status">
                  <svg aria-hidden="true" className={styles.spinner} viewBox="0 0 100 101" fill="none">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                  </svg>
                  <span className={styles.srOnly}>Loading...</span>
                </div>
                <span className={styles.srOnly}>Loading</span>
              </div>
              <button 
                className={styles.createNewBuildButton}
                onClick={handleCreateNewBuild}
              >
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </span>
                <span>Create New Build</span>
              </button>
            </div>
            
            <button 
              type="button" 
              className={styles.closeButton}
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className={styles.srOnly}>Close</span>
            </button>
          </div>
        </div>

        <div className={styles.modalBody}>
          {isLoading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Loading builds...</p>
            </div>
          ) : savedBuilds.length === 0 ? (
            <div className={styles.emptyState}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                <path d="m15 5 4 4"></path>
              </svg>
              <h3>No builds yet</h3>
              <p>Create your first build to get started</p>
              <button 
                className={styles.createFirstBuildButton}
                onClick={handleCreateNewBuild}
              >
                Create First Build
              </button>
            </div>
          ) : (
            <div className={styles.buildsGrid}>
              {savedBuilds.map((build, index) => (
                <div 
                  key={build.id || index} 
                  className={styles.buildCard}
                  onClick={() => handleBuildSelect(build)}
                >
                  <div className={styles.buildImageContainer}>
                    <div className={styles.buildImage}>
                      {getBuildImage(build.components) ? (
                        <img 
                          src={getBuildImage(build.components)} 
                          alt={build.name}
                          loading="lazy"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509.58 350" width="115" height="92" fill="#98989A">
                          {/* Case icon SVG from your design */}
                          <path d="M289.33 307.26v19.76c0 1.2-.64 2.3-1.67 2.9l-11.25 6.49c-.72.42-1.62-.1-1.62-.93v-28.22z" fill="#566882"></path>
                          <path d="M277.81 315.66v17.99c0 2.58-2.79 4.19-5.02 2.9l-6.66-3.85a5.72 5.72 0 0 1-2.86-4.95v-20.48zM160.75 232.98v19.76c0 1.2-.64 2.3-1.67 2.9l-11.25 6.49c-.72.42-1.62-.1-1.62-.93v-28.22z" fill="#566882"></path>
                          <path d="M149.23 241.37v17.99c0 2.58-2.79 4.19-5.02 2.9l-6.66-3.85a5.72 5.72 0 0 1-2.86-4.95v-20.48z" fill="#566882"></path>
                          {/* Add more SVG paths as needed */}
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className={styles.buildInfo}>
                    <div className={styles.buildHeader}>
                      <p className={styles.buildName}>{build.name}</p>
                      <p className={styles.buildPrice}>{formatPrice(calculateTotalPrice(build.components))}</p>
                    </div>
                    
                    <div className={styles.componentsList}>
                      {getComponentDisplay(build.components).map((component, compIndex) => (
                        <div key={compIndex} className={styles.componentItem}>
                          <div className={styles.componentIcon}>
                            {/* Add component type icons here */}
                            <span>⚙️</span>
                          </div>
                          <p className={styles.componentName}>{component.name}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.buildMeta}>
                      <div className={styles.buildDate}>
                        {formatDate(build.createdAt || build.lastModified)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildListModal;