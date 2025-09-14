// client/src/components/PCBuilder/CompareProducts/DisplayProductCompare/DisplayProductCompare.jsx
import React from 'react';
import styles from './DisplayProductCompare.module.css';

const DisplayProductCompare = ({ products, onRemove, onViewDetails, onAddToBuild }) => {
  if (!products || products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No products selected for comparison</p>
      </div>
    );
  }

  // Get all unique specification keys from all products
  const allSpecKeys = [...new Set(products.flatMap(product => 
    product.specs ? Object.keys(product.specs) : []
  ))];

  // Common specifications to show first
  const commonSpecs = ['Form Factor', 'Manufacturer', 'Price', 'Color', 'TDP', 'Memory Size', 'Socket'];
  
  // Sort specifications with common ones first
  const sortedSpecs = [
    ...commonSpecs.filter(spec => allSpecKeys.includes(spec)),
    ...allSpecKeys.filter(spec => !commonSpecs.includes(spec))
  ];

  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${products.length}, 250px)` }}>
      {/* Product columns */}
      {products.map((product, index) => (
        <div key={product.id} className={styles.productColumn}>
          <div className={styles.productImageContainer}>
            <div className={styles.productImage}>
              <img 
                src={product.SampleImg || "/src/assets/Laptop1.png"} 
                alt={product.name}
              />
              {product.has3D && (
                <div className={styles.badge3D}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"></path>
                    <path d="m15.194 13.707 3.814 1.86-1.86 3.814"></path>
                    <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.productActions}>
            <button 
              className={styles.actionButton}
              onClick={() => onRemove(product.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
              </svg>
              Remove
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => onViewDetails(product)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Open Part Details
            </button>
          </div>
          
          <div className={styles.specSection}>
            <div className={styles.specLabel}>Name</div>
            <div className={styles.specValue}>{product.name}</div>
          </div>
          
          <div className={styles.specSection}>
            <div className={styles.specLabel}>Lowest Price</div>
            <div className={styles.priceValue}>₱{product.price}</div>
            <button 
              className={styles.addToBuildButton}
              onClick={() => onAddToBuild(product)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add to Build
            </button>
          </div>
          
          {/* Dynamic specifications */}
          {sortedSpecs.map(specKey => (
            <div key={specKey} className={styles.specSection}>
              <div className={styles.specLabel}>{specKey}</div>
              <div className={styles.specValue}>
                {product.specs && product.specs[specKey] ? (
                  typeof product.specs[specKey] === 'number' ? (
                    <span>{product.specs[specKey]}</span>
                  ) : (
                    <span>{product.specs[specKey]}</span>
                  )
                ) : (
                  <span className={styles.notAvailable}>N/A</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DisplayProductCompare;