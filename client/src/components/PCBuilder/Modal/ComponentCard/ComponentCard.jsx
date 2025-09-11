// client/src/components/PCBuilder/Modal/ComponentCard/ComponentCard.jsx
import React from 'react';
import Desktop1Image from '../../../../assets/Desktop1.jpg';
import styles from './ComponentCard.module.css';

const ComponentCard = ({ component, onSelect }) => {
  const handleAddToBuild = () => {
    onSelect(component);
  };

  return (
    <div className={styles.card} data-testid="part-card">
      <div className={styles.imageContainer}>
        <img
          src={component.SampleImg || Desktop1Image}
          alt={component.name}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        {component.has3D && (
          <div className={styles.badge3D} data-testid="part-3d-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"></path>
              <path d="m15.194 13.707 3.814 1.86-1.86 3.814"></path>
              <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"></path>
            </svg>
            <span>3D</span>
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <div className={styles.infoSection}>
          <h3 className={styles.name}>{component.name}</h3>
          <p className={styles.price} data-testid="part-price">${component.price}</p>
          
          <div className={styles.specs} data-testid="part-specs">
            {component.specs && Object.entries(component.specs).slice(0, 3).map(([key, value], index) => (
              <div key={index} className={styles.specItem}>
                <p className={styles.specLabel}>{key}</p>
                <p className={styles.specValue}>{value}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.actionSection}>
          <button 
            className={styles.addButton} 
            onClick={handleAddToBuild}
            data-testid="add-to-build-button"
          >
            <span className={styles.buttonIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </span>
            <span className={styles.buttonText}>Add to build</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComponentCard;