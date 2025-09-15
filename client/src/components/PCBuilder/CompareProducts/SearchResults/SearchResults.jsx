// client/src/components/PCBuilder/CompareProducts/SearchResults/SearchResults.jsx
import React from 'react';
import styles from './SearchResults.module.css';

const SearchResults = ({ results, onAddToComparison }) => {
  return (
    <div className={styles.searchResults}>
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
                {product.has3D && (
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
              <div className={styles.productDetails}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productPrice}>₱{product.price}</p>
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