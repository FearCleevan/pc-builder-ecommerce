//client/src/components/PCBuilder/PCBuildFooter/PCBuildFooter.jsx
import React from 'react';
import styles from './PCBuildFooter.module.css';

const PCBuildFooter = () => {
  const additionalProducts = [
    'Thermal Compound',
    'Operating System',
    'Sound Card',
    'Network Card',
    'Capture Card',
    'VR Headset',
    'Accessory'
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Additional Products</h3>
      <div className={styles.productsGrid}>
        {additionalProducts.map((product, index) => (
          <button key={index} className={styles.productButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span className={styles.productText}>{product}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PCBuildFooter;