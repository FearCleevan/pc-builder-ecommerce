import React from 'react';
import styles from './ComponentCardSkeleton.module.css';

const ComponentCardSkeleton = () => {
  return (
    <div className={styles.cardSkeleton} data-testid="part-card-skeleton">
      <div className={styles.imageSkeleton}></div>
      
      <div className={styles.contentSkeleton}>
        <div className={styles.infoSectionSkeleton}>
          <div className={styles.nameSkeleton}></div>
          <div className={styles.priceSkeleton}></div>
          
          <div className={styles.specsSkeleton}>
            <div className={styles.specItemSkeleton}></div>
            <div className={styles.specItemSkeleton}></div>
            <div className={styles.specItemSkeleton}></div>
          </div>
        </div>
        
        <div className={styles.actionSectionSkeleton}>
          <div className={styles.buttonSkeleton}></div>
        </div>
      </div>
    </div>
  );
};

export default ComponentCardSkeleton;