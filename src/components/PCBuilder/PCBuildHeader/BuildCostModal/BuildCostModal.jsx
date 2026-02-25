// client/src/components/PCBuilder/PCBuildHeader/BuildCostModal/BuildCostModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BuildCostModal.module.css';

const BuildCostModal = ({
  isOpen,
  onClose,
  selectedComponents,
  totalPrice,
  buildName,
  compatibilityReport,
  wattageReport,
  buildAssemblyOption,
  onAddToCart
}) => {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setIsConfirmOpen(false);
    }
  }, [isOpen]);

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
    const missingRequired = compatibilityReport?.missingRequired || [];
    if (missingRequired.length > 0) {
      setIsConfirmOpen(true);
      return;
    }
    submitCart();
  };

  const submitCart = () => {
    if (onAddToCart) {
      onAddToCart({ buildName, totalPrice });
    }
    setIsConfirmOpen(false);
    onClose();
    navigate('/cart');
  };

  const cancelIncompleteSubmit = () => {
    setIsConfirmOpen(false);
  };

  // Filter out null components and only show selected ones
  const selectedComponentsList = Object.entries(selectedComponents)
    .filter(([, component]) => component !== null)
    .map(([category, component]) => ({
      category,
      ...component
    }));

  const hasComponents = selectedComponentsList.length > 0;

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
                  disabled={!hasComponents}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <p className={styles.buildOptionText}>
              Build Option: {buildAssemblyOption === 'store-build' ? 'Build by Store' : 'Components Only (Buyer Assembles)'}
            </p>
            <p className={styles.wattageText}>
              Estimated Wattage: {wattageReport?.totalEstimatedWattage || 0}W
            </p>
          </div>

          <div className={styles.priceDetails}>
            <h3 className={styles.detailsTitle}>Price Details</h3>
            {hasComponents ? (
              <ul className={styles.componentsList}>
                {selectedComponentsList.map((component) => (
                  <li key={component.category} className={styles.componentItem}>
                    <div className={styles.componentInfo}>
                      <span className={styles.componentName}>
                        {component.name}
                      </span>
                      <p className={styles.componentPrice}>
                        {formatPrice(component.price || 0)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.emptyState}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h4>No components added yet</h4>
                <p>Start building your PC by adding components</p>
              </div>
            )}
          </div>

          {isConfirmOpen && (
            <div className={styles.confirmationBox}>
              <p className={styles.confirmationTitle}>Build is not complete yet</p>
              <p className={styles.confirmationText}>
                Missing required components: {(compatibilityReport?.missingRequired || []).map((item) => item.label).join(', ')}.
              </p>
              <p className={styles.confirmationText}>
                Do you want to continue building or add this incomplete build to cart?
              </p>
              <div className={styles.confirmButtons}>
                <button className={styles.continueButton} onClick={cancelIncompleteSubmit}>
                  Continue Building
                </button>
                <button className={styles.forceAddButton} onClick={submitCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildCostModal;
