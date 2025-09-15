// client/src/components/PCBuilder/CompareProducts/SearchResults/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import styles from './SearchResults.module.css';

const SearchResults = ({ results, onAddToComparison, parentRef }) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (parentRef && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left,
        width: rect.width
      });
    }
  }, [parentRef, results]);

  if (results.length === 0) {
    return null;
  }

  return (
    <div 
      className={styles.searchResults} 
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`
      }}
    >
      <div className={styles.resultsHeader}>
        <h3>Search Results</h3>
        <span>{results.length} products found</span>
      </div>
      
      <div className={styles.resultsList}>
        {results.map((product) => (
          <div key={product.id} className={styles.resultItem}>
            <div className={styles.productInfo}>
              <div className={styles.productImage}>
                <img 
                  src={product.image || product.SampleImg || "/src/assets/Laptop1.png"} 
                  alt={product.name}
                />
              </div>
              <div className={styles.productDetails}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productPrice}>₱{product.price}</p>
                <div className={styles.productSpecs}>
                  {product.specs && Object.entries(product.specs).slice(0, 2).map(([key, value], index) => (
                    <span key={index} className={styles.specItem}>
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              className={styles.addButton}
              onClick={() => onAddToComparison(product)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add to Comparison
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;