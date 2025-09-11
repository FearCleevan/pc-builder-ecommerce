import React, { useEffect, useState } from 'react';
import ModalHeader from '../ModalHeader/ModalHeader';
import ProductFilter from '../ProductFilter/ProductFilter';
import ComponentCard from '../ComponentCard/ComponentCard';
import Pagination from '../Pagination/Pagination';
import styles from './AddComponentModal.module.css';

// Import mock data
import { caseData } from '../MockData/Case/Case';
import { cpuData } from '../MockData/CPU/CPU';
import { motherboardData } from '../MockData/Motherboard/Motherboard';
import { gpuData } from '../MockData/GPU/GPU';
import { ramData } from '../MockData/RAM/Ram';
import { cpuCoolerData } from '../MockData/CPU Cooler/CPUCooler';
import { storageData } from '../MockData/Storage/Storage';
import { powerSupplyData } from '../MockData/Power Supply/PowerSupply';
import { caseFanData } from '../MockData/Case Fan/CaseFan';
import { monitorData } from '../MockData/Monitor/Monitor';
import { mouseData } from '../MockData/Mouse/Mouse';
import { keyboardData } from '../MockData/Keyboard/Keyboard';
import { speakerData } from '../MockData/Speaker/Speaker';
import { headphonesData } from '../MockData/Headphones/Headphones';
import { microphoneData } from '../MockData/Microphone/Microphone';
import { webcamData } from '../MockData/Webcam/Webcam';

const AddComponentModal = ({ isOpen, onClose, onSelect, componentType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [components, setComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [compatibilityFilter, setCompatibilityFilter] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Get mock data based on component type
      const mockComponents = generateMockComponents(componentType);
      setComponents(mockComponents);
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, componentType]);

  const generateMockComponents = (type) => {
    if (!type) return [];
    
    const componentDataMap = {
      case: caseData,
      cpu: cpuData,
      motherboard: motherboardData,
      gpu: gpuData,
      ram: ramData,
      cpuCooler: cpuCoolerData,
      storage: storageData,
      powerSupply: powerSupplyData,
      caseFan: caseFanData,
      monitor: monitorData,
      mouse: mouseData,
      keyboard: keyboardData,
      speaker: speakerData,
      headphones: headphonesData,
      microphone: microphoneData,
      webcam: webcamData
    };

    return componentDataMap[type.id] || [
      {
        id: 'default-1',
        name: `Sample ${type?.name}`,
        image: "/src/assets/Laptop1.png",
        price: Math.floor(Math.random() * 500) + 50,
        specs: {
          "Specification": "Sample value",
          "Feature": "Premium quality",
          "Compatibility": "Universal"
        },
        has3D: true,
        store: "Sample Store",
        stock: "In stock"
      }
    ];
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleComponentSelect = (component) => {
    onSelect(component);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleCompatibilityFilter = () => {
    setCompatibilityFilter(!compatibilityFilter);
  };

  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <ModalHeader 
          title={`Select ${componentType?.name}`} 
          onClose={onClose} 
        />
        
        <div className={styles.modalContent}>
          <div className={styles.filterSection}>
            <ProductFilter componentType={componentType} />
          </div>
          
          <div className={styles.mainContent}>
            <div className={styles.filterBar}>
              <div className={styles.compatibilityFilter}>
                <div className={styles.checkboxContainer}>
                  <input 
                    type="checkbox" 
                    id="compatibility" 
                    checked={compatibilityFilter}
                    onChange={toggleCompatibilityFilter}
                    className={styles.hiddenCheckbox}
                  />
                  <label htmlFor="compatibility" className={styles.customCheckbox}>
                    {compatibilityFilter && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    )}
                  </label>
                  <label htmlFor="compatibility" className={styles.checkboxLabel}>
                    Compatibility Filter
                  </label>
                </div>
              </div>
              
              <div className={styles.compareButtonContainer}>
                <button className={styles.compareButton} disabled>
                  Compare
                </button>
              </div>
            </div>
            
            <div className={styles.searchAndSortSection}>
              <div className={styles.resultsInfo}>
                <span className={styles.resultsCount}>
                  {filteredComponents.length} Compatible Products
                </span>
              </div>
              
              <div className={styles.sortAndSearch}>
                <div className={styles.sortContainer}>
                  <div className={styles.sortLabel}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 16 4 4 4-4"></path>
                      <path d="M7 20V4"></path>
                      <path d="m21 8-4-4-4 4"></path>
                      <path d="M17 4v16"></path>
                    </svg>
                    <span>Sort by</span>
                  </div>
                  <select 
                    className={styles.sortSelect} 
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
                
                <div className={styles.searchContainer}>
                  <div className={styles.searchIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.componentsGrid}>
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onSelect={handleComponentSelect}
                />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredComponents.length / 12)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;