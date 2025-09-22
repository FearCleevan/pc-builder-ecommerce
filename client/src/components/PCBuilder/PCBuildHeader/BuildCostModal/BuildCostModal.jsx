//client/src/components/PCBuilder/PCHeader/Modal/BuildCostModal.jsx
// client/src/components/PCBuilder/PCBuildHeader/BuildCostModal/BuildCostModal.jsx
import React from 'react';
import styles from './BuildCostModal.module.css';

const BuildCostModal = ({ isOpen, onClose, selectedComponents, totalPrice }) => {
  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Add to cart:', selectedComponents);
    // You can integrate with your cart system here
  };

  return (
    <div 
      className={styles.modalOverlay} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-describedby="Build Cost"
      aria-labelledby="build-cost-title"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <h2 id="build-cost-title" className={styles.modalTitle}>Build Cost</h2>
          </div>
          <div className={styles.headerActions}>
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
          <div className={styles.priceSummary}>
            <div className={styles.totalPriceSection}>
              <div className={styles.totalPrice}>
                <span className={styles.priceIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M6 12h.01M18 12h.01"></path>
                  </svg>
                </span>
                <span className={styles.totalAmount}>{formatPrice(totalPrice)}</span>
              </div>
              <div className={styles.actionButtonContainer}>
                <button 
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={Object.keys(selectedComponents).length === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <div className={styles.priceDetails}>
            <h3 className={styles.detailsTitle}>Price Details</h3>
            <ul className={styles.componentsList}>
              {Object.entries(selectedComponents).map(([category, component]) => (
                <li key={category} className={styles.componentItem}>
                  <div className={styles.componentInfo}>
                    <span className={styles.componentName}>
                      {component?.name}
                    </span>
                    <p className={styles.componentPrice}>
                      {formatPrice(component?.price || 0)}
                    </p>
                  </div>
                </li>
              ))}
              
              {Object.keys(selectedComponents).length === 0 && (
                <li className={styles.emptyState}>
                  <p>No components added yet</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildCostModal;