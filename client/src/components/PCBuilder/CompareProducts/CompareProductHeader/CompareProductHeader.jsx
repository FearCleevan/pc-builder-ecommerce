// client/src/components/PCBuilder/CompareProducts/CompareProductHeader/CompareProductHeader.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './CompareProductHeader.module.css';

const CompareProductHeader = ({ componentType, onComponentTypeChange, onBackToBuilder }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const componentTypes = [
    { id: 'case', name: 'Case' },
    { id: 'cpu', name: 'CPU' },
    { id: 'motherboard', name: 'Motherboard' },
    { id: 'gpu', name: 'GPU' },
    { id: 'ram', name: 'RAM' },
    { id: 'cpuCooler', name: 'CPU Cooler' },
    { id: 'storage', name: 'Storage' },
    { id: 'powerSupply', name: 'Power Supply' },
    { id: 'caseFan', name: 'Case Fan' },
    { id: 'monitor', name: 'Monitor' },
    { id: 'mouse', name: 'Mouse' },
    { id: 'keyboard', name: 'Keyboard' },
    { id: 'speaker', name: 'Speaker' },
    { id: 'headphones', name: 'Headphones' },
    { id: 'microphone', name: 'Microphone' },
    { id: 'webcam', name: 'Webcam' }
  ];

  const handleComponentTypeSelect = (type) => {
    onComponentTypeChange(type);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.breadcrumb}>
        <button onClick={onBackToBuilder} className={styles.breadcrumbButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Back to PC Builder
        </button>
      </div>
      
      <div className={styles.headerContent}>
        <p className={styles.title}>Compare Products</p>
        
        <div className={styles.dropdownContainer} ref={dropdownRef}>
          <button 
            type="button" 
            className={styles.dropdownButton}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={styles.dropdownButtonContent}>
              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="20" height="16">
                <path d="M12.64 24.59c-.3-.28-.47-.68-.47-1.09V2.56c-2.38.18-4.26 2.15-4.26 4.58v35.71a4.6 4.6 0 0 0 4.6 4.6h3.13V27.41l-3-2.82Zm2.53-22.04v20.3l3 2.82c.3.28.47.68.47 1.09v20.69h12.72V26.76c0-.41.17-.81.47-1.09l3-2.82V2.55H15.17ZM25 38.84c-1.42 0-2.56-1.15-2.56-2.56s1.14-2.56 2.56-2.56 2.56 1.15 2.56 2.56-1.15 2.56-2.56 2.56Zm5.48-21.08H19.76c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.68 1.5 1.5s-.67 1.5-1.5 1.5Zm0-6.7H19.76c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Zm7.35-8.5V23.5c0 .41-.18.81-.48 1.09l-2.99 2.82v20.04h3.12a4.6 4.6 0 0 0 4.6-4.6V7.14c0-2.42-1.87-4.4-4.25-4.58Z" fill="#98989A"></path>
              </svg>
              <span>{componentType?.name || 'Select Component'}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevron}>
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {componentTypes.map((type) => (
                <button
                  key={type.id}
                  className={styles.dropdownItem}
                  onClick={() => handleComponentTypeSelect(type)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareProductHeader;