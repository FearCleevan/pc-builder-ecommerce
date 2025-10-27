// client/src/components/PCBuilder/Modal/ModalHeader/ModalHeader.jsx
import React from 'react';
import styles from './ModalHeader.module.css';

const ModalHeader = ({ title, onClose = true }) => {
  return (
    <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>{title}</h2>
      <button className={styles.closeButton} onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default ModalHeader;