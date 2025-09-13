import React, { useEffect, useState, useMemo } from 'react';
import ModalHeader from '../ModalHeader/ModalHeader';
import ProductFilter from '../ProductFilter/ProductFilter';
import ComponentCard from '../ComponentCard/ComponentCard';
import ComponentCardSkeleton from '../ComponentCardSkeleton/ComponentCardSkeleton';
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
import { caseFanData } from '../MockData/Case Fan/CaseFan';
import { monitorData } from '../MockData/Monitor/Monitor';
import { mouseData } from '../MockData/Mouse/Mouse';
import { keyboardData } from '../MockData/Keyboard/Keyboard';
import { speakerData } from '../MockData/Speaker/Speaker';
import { headphonesData } from '../MockData/Headphones/Headphones';
import { microphoneData } from '../MockData/Microphone/Microphone';
import { webcamData } from '../MockData/Webcam/Webcam';
import { powerSupplyData } from '../MockData/Power Suppy/PowerSupply';
import { caseFilter } from '../MockData/Case/CaseFilter';
import { cpuFilter } from '../MockData/CPU/CPUFilter';
import { motherboardFilter } from '../MockData/Motherboard/MotherboardFilter';
import { gpuFilter } from '../MockData/GPU/GPUFilter';
import { ramFilter } from '../MockData/RAM/RamFilter';
import { cpuCoolerFilter } from '../MockData/CPU Cooler/CPUCoolerFilter';
import { powerSupplyFilter } from '../MockData/Power Suppy/PowerSupplyFilter';
import { caseFanFilter } from '../MockData/Case Fan/CaseFanFilter';
import { monitorFilter } from '../MockData/Monitor/MonitorFilter';
import { mouseFilter } from '../MockData/Mouse/MouseFilter';
import { KeyboardFilter } from '../MockData/Keyboard/KeyboardFilter';
import { speakerFilter } from '../MockData/Speaker/SpeakerFilter';
import { headphonesFilter } from '../MockData/Headphones/HeadphonesFilter';
import { microphoneFilter } from '../MockData/Microphone/MicrophoneFilter';
import { webcamFilter } from '../MockData/Webcam/WebcamFilter';
import { storageFilter } from '../MockData/Storage/StorageFilter';

const AddComponentModal = ({ isOpen, onClose, onSelect, componentType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [components, setComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [compatibilityFilter, setCompatibilityFilter] = useState(true);
  const [sortOption, setSortOption] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Get mock data based on component type
      const mockComponents = generateMockComponents(componentType);
      setComponents(mockComponents);
      setFilteredComponents(mockComponents);
      setIsLoading(false);
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setActiveFilters({});
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

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  // Apply filters whenever activeFilters, searchTerm, or components change
  useEffect(() => {
    if (components.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate API call delay for better UX
    const timeoutId = setTimeout(() => {
      let filtered = [...components];
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(component =>
          component.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply compatibility filter
      if (compatibilityFilter) {
        // This is a placeholder for actual compatibility logic
        // You would need to implement based on your specific requirements
        filtered = filtered.filter(component => 
          component.specs?.Compatibility !== "Incompatible"
        );
      }
      
      // Apply other filters
      Object.entries(activeFilters).forEach(([filterName, filterValue]) => {
        if (Array.isArray(filterValue)) {
          // Range filter - only apply if values are different from default
          const defaultMin = filterSections.find(s => s.title === filterName)?.min || 0;
          const defaultMax = filterSections.find(s => s.title === filterName)?.max || 0;
          
          if (filterValue[0] !== defaultMin || filterValue[1] !== defaultMax) {
            filtered = filtered.filter(component => {
              const componentValue = getComponentValue(component, filterName);
              return componentValue >= filterValue[0] && componentValue <= filterValue[1];
            });
          }
        } else if (typeof filterValue === 'object') {
          // Checkbox filter - only apply if at least one option is selected
          const selectedOptions = Object.entries(filterValue)
            .filter(([_, isSelected]) => isSelected)
            .map(([option]) => option);
          
          if (selectedOptions.length > 0) {
            filtered = filtered.filter(component => {
              const componentValue = getComponentValue(component, filterName);
              return selectedOptions.includes(componentValue);
            });
          }
        }
      });
      
      // Apply sorting
      switch (sortOption) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Default sorting (no change)
          break;
      }
      
      setFilteredComponents(filtered);
      setIsLoading(false);
    }, 300); // Small delay to show loading state
    
    return () => clearTimeout(timeoutId);
  }, [activeFilters, searchTerm, compatibilityFilter, sortOption, components]);

  // Helper function to extract value from component based on filter name
  const getComponentValue = (component, filterName) => {
    // Special case for price
    if (filterName === "Price") {
      return component.price;
    }
    
    // Check if the filter name matches a spec key
    if (component.specs && component.specs[filterName] !== undefined) {
      return component.specs[filterName];
    }
    
    // Check if the filter name matches a direct property
    if (component[filterName] !== undefined) {
      return component[filterName];
    }
    
    // Default return if no match found
    return "";
  };

  // Get filter sections for the current component type
  const filterSections = useMemo(() => {
    const filterMap = {
      case: caseFilter,
      cpu: cpuFilter,
      motherboard: motherboardFilter,
      gpu: gpuFilter,
      ram: ramFilter,
      cpuCooler: cpuCoolerFilter,
      storage: storageFilter,
      powerSupply: powerSupplyFilter,
      caseFan: caseFanFilter,
      monitor: monitorFilter,
      mouse: mouseFilter,
      keyboard: KeyboardFilter,
      speaker: speakerFilter,
      headphones: headphonesFilter,
      microphone: microphoneFilter,
      webcam: webcamFilter,
    };

    return componentType && filterMap[componentType.id]
      ? filterMap[componentType.id]
      : [
          {
            title: "Price",
            type: "range",
            min: 38.99,
            max: 1399.99,
            unit: "$",
          },
          {
            title: "Category",
            type: "checkbox",
            options: ["Option 1", "Option 2", "Option 3"],
          },
        ];
  }, [componentType]);

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

  // Calculate paginated components
  const itemsPerPage = 12;
  const paginatedComponents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredComponents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredComponents, currentPage, itemsPerPage]);

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
            <ProductFilter 
              componentType={componentType} 
              onFilterChange={handleFilterChange}
            />
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
              {isLoading ? (
                // Show skeleton loading while filtering
                Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ComponentCardSkeleton key={index} />
                ))
              ) : (
                // Show actual components
                paginatedComponents.map((component) => (
                  <ComponentCard
                    key={component.id}
                    component={component}
                    onSelect={handleComponentSelect}
                  />
                ))
              )}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredComponents.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;