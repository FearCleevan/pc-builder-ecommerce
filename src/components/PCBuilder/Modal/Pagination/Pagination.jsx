// client/src/components/PCBuilder/Modal/Pagination/Pagination.jsx
import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage = 1, totalPages = 71, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.rowsPerPage}>
        <span className={styles.label}>Rows per page</span>
        <select className={styles.select} defaultValue="50">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className={styles.pageInfo}>
        <span>Page {currentPage} of {totalPages}</span>
      </div>
      <div className={styles.controls}>
        <button 
          className={styles.controlButton} 
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m11 17-5-5 5-5"></path>
            <path d="m18 17-5-5 5-5"></path>
          </svg>
        </button>
        <button 
          className={styles.controlButton} 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>
        <button 
          className={styles.controlButton} 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
        <button 
          className={styles.controlButton} 
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 17 5-5-5-5"></path>
            <path d="m13 17 5-5-5-5"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;