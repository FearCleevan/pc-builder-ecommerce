// client/src/components/PCBuilder/ComponentCard/ComponentCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import Desktop1Image from '../../../../assets/Desktop1.jpg';
import styles from './ComponentCard.module.css';

const ComponentCard = ({ component, onSelect, onCompareToggle, isComparing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    // Capture the current value in a variable
    const currentCardRef = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  useEffect(() => {
    setIsChecked(isComparing || false);
  }, [isComparing]);

  const handleAddToBuild = () => {
    onSelect(component);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const toggleCheck = (e) => {
    e.stopPropagation(); // prevent card click propagation
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCompareToggle(component, newCheckedState);
  };

  return (
    <div ref={cardRef} className={styles.card} data-testid="part-card">
      {isVisible ? (
        <>
          {/* ✅ Updated Circle Check with Chakra-inspired design */}
          <label className={styles.chakraCheckbox} data-checked={isChecked ? "" : null}>
            <input 
              className={styles.chakraCheckboxInput} 
              type="checkbox" 
              checked={isChecked}
              onChange={toggleCheck}
            />
            <span className={`${styles.chakraCheckboxControl} ${isChecked ? styles.checked : ''}`} aria-hidden="true" data-checked={isChecked ? "" : null}>
              <div className={styles.checkboxSvgContainer}>
                <svg viewBox="0 0 12 10" className={styles.checkboxSvg} style={{ opacity: isChecked ? 1 : 0 }}>
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </div>
            </span>
          </label>

          <div className={styles.imageContainer}>
            {!imageLoaded && <div className={styles.imagePlaceholder}></div>}
            <img
              src={component.SampleImg || Desktop1Image}
              alt={component.name}
              className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
              loading="lazy"
              decoding="async"
              onLoad={handleImageLoad}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.infoSection}>
              <h3 className={styles.name}>{component.name}</h3>
              <p className={styles.price} data-testid="part-price">₱{component.price}</p>
              <div className={styles.specs} data-testid="part-specs">
                {component.specs &&
                  Object.entries(component.specs).slice(0, 3).map(([key, value], index) => (
                    <div key={index} className={styles.specItem}>
                      <p className={styles.specLabel}>{key}</p>
                      <p className={styles.specValue}>{value}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className={styles.actionSection}>
              <button
                className={styles.addButton}
                onClick={handleAddToBuild}
                data-testid="add-to-build-button"
              >
                <span className={styles.buttonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </span>
                <span className={styles.buttonText}>Add to build</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ height: '420px' }}></div>
      )}
    </div>
  );
};

export default ComponentCard;