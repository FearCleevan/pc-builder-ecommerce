// client/src/components/PCBuilder/CompareProducts/SearchAndClearProduct/SearchAndClearProduct.jsx
import React, { useState } from 'react';
import styles from './SearchAndClearProduct.module.css';

const SearchAndClearProduct = ({ onSearch, onClear, componentType }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onClear();
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.searchIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
        <input
          className={styles.searchInput}
          placeholder={`Search ${componentType?.name || 'products'}...`}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className={styles.clearContainer}>
        <button className={styles.clearButton} onClick={handleClear}>
          <span className={styles.clearIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </span>
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default SearchAndClearProduct;