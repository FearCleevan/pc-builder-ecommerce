import React, { useState, useEffect, useRef } from 'react';
import styles from './ComponentCard.module.css';
import CloudinaryImage from '../../../AIAssistant/components/common/CloudinaryImage/CloudinaryImage';
import Desktop1Image from '../../../../assets/Desktop1.jpg';

const ComponentCard = ({ component, onSelect, onCompareToggle, isComparing }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const cardRef = useRef();

  // Enhanced component type detection that works with or without explicit type
  const getComponentType = () => {
    if (!component) return 'cpu'; // Default fallback
    
    // If component has explicit type, use the mapping
    if (component.type) {
      const typeMap = {
        'cpu': 'cpu',
        'cpu-cooler': 'cooler',
        'motherboard': 'motherboard',
        'memory': 'ram',
        'storage': 'storage',
        'video-card': 'gpu',
        'power-supply': 'psu',
        'case': 'case',
        'peripherals': 'peripherals',
        'headphones': 'headphones',
        'keyboard': 'keyboard',
        'mouse': 'mouse',
        'speakers': 'speakers',
        'webcam': 'webcam',
        'display': 'monitor',
        'monitor': 'monitor',
        'software': 'software',
        'operating-system': 'software',
        'expansion': 'expansion',
        'sound-card': 'sound-card',
        'wired-networking': 'networking',
        'wireless-networking': 'networking',
        'accessories': 'accessories',
        'case-fan': 'cooler',
        'fan-controller': 'accessories',
        'thermal-compound': 'accessories',
        'external-hard-drive': 'storage',
        'optical-drive': 'storage',
        'ups': 'psu'
      };

      return typeMap[component.type.toLowerCase()] || component.type.toLowerCase();
    }

    // Auto-detect component type based on component properties
    return detectComponentType(component);
  };

  // Auto-detect component type based on component data
  const detectComponentType = (component) => {
    if (!component || !component.name) return 'cpu';
    
    const name = component.name.toLowerCase();
    const specs = component.specs || {};

    // Case detection - ADDED THIS SECTION
    if (name.includes('case') || name.includes('tower') || name.includes('chassis') ||
        specs['Form Factor'] || specs['Max GPU Length'] || specs['Max CPU Cooler Height'] ||
        specs['Side Panel'] || specs['Volume'] || specs['Weight']) {
      return 'case';
    }
    
    // CPU detection
    if (name.includes('ryzen') || name.includes('core') || name.includes('intel') || 
        name.includes('amd') || name.includes('xeon') || name.includes('pentium') ||
        specs.Socket || specs['Core Count'] || specs['Thread Count']) {
      return 'cpu';
    }
    
    // Motherboard detection
    if (name.includes('motherboard') || name.includes('mainboard') || name.includes('mb ') ||
        name.includes('b450') || name.includes('b550') || name.includes('b650') ||
        name.includes('x570') || name.includes('x670') || name.includes('z690') ||
        name.includes('z790') || specs.Chipset || specs['Form Factor'] === 'ATX' ||
        specs['Form Factor'] === 'Micro-ATX' || specs['Form Factor'] === 'Mini-ITX') {
      return 'motherboard';
    }
    
    // GPU detection
    if (name.includes('rtx') || name.includes('gtx') || name.includes('radeon') ||
        name.includes('geforce') || name.includes('video card') || name.includes('gpu') ||
        specs['Video Memory'] || specs['Memory Interface']) {
      return 'gpu';
    }
    
    // RAM detection
    if (name.includes('ram') || name.includes('memory') || name.includes('ddr') ||
        specs['Memory Type'] || specs['Memory Speed']) {
      return 'ram';
    }
    
    // Storage detection
    if (name.includes('ssd') || name.includes('hdd') || name.includes('nvme') ||
        name.includes('solid state') || name.includes('hard drive') || specs.Capacity) {
      return 'storage';
    }
    
    // CPU Cooler detection - ADDED THIS SECTION
    if (name.includes('cooler') || name.includes('heatsink') || name.includes('aio') ||
        specs['RPM'] || specs['Noise Level'] || specs['Compatible Sockets']) {
      return 'cooler';
    }
    
    // Power Supply detection - ADDED THIS SECTION
    if (name.includes('power supply') || name.includes('psu') || name.includes('watt') ||
        specs['Wattage'] || specs['Efficiency'] || specs['Modular']) {
      return 'psu';
    }
    
    // Default to CPU if unknown
    return 'cpu';
  };

  useEffect(() => {
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

  const handleImageError = () => {
    setImageLoaded(true);
  };

  const toggleCheck = (e) => {
    e.stopPropagation();
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCompareToggle(component, newCheckedState);
  };

  const componentType = getComponentType();

  return (
    <div ref={cardRef} className={styles.card} data-testid="part-card">
      {isVisible ? (
        <>
          {/* Checkbox */}
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

          {/* Cloudinary Image with Loading State */}
          <div className={styles.imageContainer}>
            {!imageLoaded && <div className={styles.imagePlaceholder}></div>}
            
            <CloudinaryImage
              productName={component.name}
              componentType={componentType}
              alt={component.name}
              className={`${styles.image} ${imageLoaded ? styles.imageLoaded : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              fallbackSrc={component.SampleImg || Desktop1Image}
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