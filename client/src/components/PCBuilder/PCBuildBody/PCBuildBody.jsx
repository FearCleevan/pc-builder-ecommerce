//client/src/components/PCBuilder/PCBuildBody/PCBuildBody.jsx
import React from 'react';
import styles from './PCBuildBody.module.css';

const PCBuildBody = () => {
  const components = [
    {
      name: 'Case',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 50 50" width="16" height="12.8">
          <path d="M12.64 24.59c-.3-.28-.47-.68-.47-1.09V2.56c-2.38.18-4.26 2.15-4.26 4.58v35.71a4.6 4.6 0 0 0 4.6 4.6h3.13V27.41l-3-2.82Zm2.53-22.04v20.3l3 2.82c.3.28.47.68.47 1.09v20.69h12.72V26.76c0-.41.17-.81.47-1.09l3-2.82V2.55H15.17ZM25 38.84c-1.42 0-2.56-1.15-2.56-2.56s1.14-2.56 2.56-2.56 2.56 1.15 2.56 2.56-1.15 2.56-2.56 2.56Zm5.48-21.08H19.76c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.68 1.5 1.5s-.67 1.5-1.5 1.5Zm0-6.7H19.76c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5h10.72c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Zm7.35-8.5V23.5c0 .41-.18.81-.48 1.09l-2.99 2.82v20.04h3.12a4.6 4.6 0 0 0 4.6-4.6V7.14c0-2.42-1.87-4.4-4.25-4.58Z" fill="#98989A"></path>
        </svg>
      ),
      buttonStyle: 'accent'
    },
    {
      name: 'CPU',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 50 50" width="16" height="12.8">
          <path d="M15.74 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM25 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM34.26 3.03c1.52 0 2.76 1.24 2.76 2.76v3.12h-5.51V5.79c0-1.52 1.24-2.76 2.76-2.76ZM12.98 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM22.24 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM31.51 41.1h5.51v3.12c0 1.52-1.24 2.76-2.76 2.76-1.52 0-2.76-1.24-2.76-2.76V41.1ZM46.97 15.73c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM46.97 25c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM46.97 34.26c0 1.52-1.24 2.76-2.76 2.76h-3.12v-5.51h3.12c1.52 0 2.76 1.24 2.76 2.76ZM8.9 12.98v5.51H5.78c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76H8.9ZM8.91 22.24v5.51H5.79c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76h3.12ZM8.9 31.51v5.51H5.78c-1.52 0-2.76-1.24-2.76-2.76 0-1.52 1.24-2.76 2.76-2.76H8.9Z" fill="#98989A"></path>
          <path d="M32.99 42.29H17c-5.12 0-9.29-4.17-9.29-9.29V17.01c0-5.12 4.17-9.29 9.29-9.29h15.99c5.12 0 9.29 4.17 9.29 9.29V33c0 5.12-4.17 9.29-9.29 9.29ZM17.01 12.71c-2.37 0-4.29 1.93-4.29 4.29v15.99c0 2.37 1.93 4.29 4.29 4.29H33c2.37 0 4.29-1.93 4.29-4.29V17c0-2.37-1.93-4.29-4.29-4.29H17.01Z" fill="#98989A"></path>
          <rect width="17.16" height="17.16" x="16.42" y="16.42" fill="#98989A" rx="2.51" ry="2.51"></rect>
        </svg>
      )
    },
    // Add other components similarly...
  ];

  return (
    <table className={styles.table}>
      <thead className={styles.hiddenHeader}>
        <tr className={styles.headerRow}>
          <th className={styles.headerCell}></th>
          <th className={styles.headerCell}>Image</th>
          <th className={styles.headerCell}>Name</th>
          <th className={styles.headerCell}>Stock</th>
          <th className={styles.headerCell}>Price</th>
          <th className={styles.headerCell}>Where</th>
          <th className={styles.headerCell}></th>
        </tr>
      </thead>
      <tbody>
        {components.map((component, index) => (
          <tr key={index} className={styles.componentRow}>
            <td colSpan="7" className={styles.componentCell}>
              <div className={styles.componentItem}>
                <p className={styles.componentName}>
                  {component.icon}
                  {component.name}
                </p>
                <div className={styles.buttonWrapper}>
                  <div className={styles.loadingSpinner}>
                    {/* Loading spinner SVG */}
                  </div>
                  <button className={component.buttonStyle === 'accent' ? styles.accentButton : styles.defaultButton}>
                    <span className={styles.buttonIcon}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5v14"></path>
                      </svg>
                    </span>
                    <span>Add {component.name}</span>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PCBuildBody;