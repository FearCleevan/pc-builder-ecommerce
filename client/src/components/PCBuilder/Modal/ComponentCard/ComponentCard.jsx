// client/src/components/PCBuilder/Modal/ComponentCard/ComponentCard.jsx
import React from 'react';
import styles from './ComponentCard.module.css';

const ComponentCard = ({ component, onSelect }) => {
  const handleAddToBuild = () => {
    onSelect(component);
  };

  return (
    <div className={styles.card} onClick={handleAddToBuild}>
      <div className={styles.imageContainer}>
        <img
          src={component.image || "/src/assets/Laptop1.png"}
          alt={component.name}
          className={styles.image}
        />
        {component.has3D && (
          <div className={styles.badge3D}>
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
        <h3 className={styles.name}>{component.name}</h3>
        <p className={styles.price}>${component.price}</p>
        <div className={styles.specs}>
          {component.specs && Object.entries(component.specs).slice(0, 3).map(([key, value], index) => (
            <div key={index} className={styles.specItem}>
              <p className={styles.specLabel}>{key}</p>
              <p className={styles.specValue}>{value}</p>
            </div>
          ))}
        </div>
        <div className={styles.storeInfo}>
          <span className={styles.store}>{component.store}</span>
          <span className={styles.stock}>{component.stock}</span>
        </div>
        <button className={styles.addButton} onClick={handleAddToBuild}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Add to build
        </button>
      </div>
    </div>
  );
};

export default ComponentCard;