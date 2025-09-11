// client/src/components/PCBuilder/Modal/AddComponentModal/AddComponentModal.jsx
import React, { useEffect, useState } from 'react';
import ModalHeader from '../ModalHeader/ModalHeader';
import ProductFilter from '../ProductFilter/ProductFilter';
import ComponentCard from '../ComponentCard/ComponentCard';
import Pagination from '../Pagination/Pagination';
import styles from './AddComponentModal.module.css';

const AddComponentModal = ({ isOpen, onClose, onSelect, componentType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [components, setComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [compatibilityFilter, setCompatibilityFilter] = useState(true);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Generate mock data based on component type
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
    
    const baseData = {
      case: [
        {
          id: 'case-1',
          name: 'HYTE Y60 ATX Mid Tower White Tempered Glass Side Panel',
          image: "/src/assets/Laptop1.png",
          price: 179.97,
          specs: {
            "Form Factor": "ATX Mid Tower",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "440 mm"
          },
          has3D: true,
          store: "Newegg",
          stock: "In stock"
        },
        {
          id: 'case-2',
          name: 'NZXT H510 Elite ATX Mid Tower Black',
          image: "/src/assets/Laptop1.png",
          price: 149.99,
          specs: {
            "Form Factor": "ATX Mid Tower",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "381 mm"
          },
          has3D: true,
          store: "Amazon",
          stock: "In stock"
        },
        {
          id: 'case-3',
          name: 'Corsair 4000D Airflow ATX Mid Tower',
          image: "/src/assets/Laptop1.png",
          price: 94.99,
          specs: {
            "Form Factor": "ATX Mid Tower",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "360 mm"
          },
          has3D: false,
          store: "Best Buy",
          stock: "In stock"
        }
      ],
      cpu: [
        {
          id: 'cpu-1',
          name: 'AMD Ryzen 9 7950X 16-Core Processor',
          image: "/src/assets/Laptop1.png",
          price: 599.99,
          specs: {
            "Cores": "16",
            "Threads": "32",
            "Base Clock": "4.5 GHz"
          },
          has3D: true,
          store: "Newegg",
          stock: "In stock"
        },
        {
          id: 'cpu-2',
          name: 'Intel Core i9-13900K 24-Core Processor',
          image: "/src/assets/Laptop1.png",
          price: 589.99,
          specs: {
            "Cores": "24",
            "Threads": "32",
            "Base Clock": "3.0 GHz"
          },
          has3D: true,
          store: "Amazon",
          stock: "In stock"
        }
      ],
      motherboard: [
        {
          id: 'mb-1',
          name: 'ASUS ROG Strix X670E-E Gaming WiFi',
          image: "/src/assets/Laptop1.png",
          price: 449.99,
          specs: {
            "Socket": "AM5",
            "Chipset": "AMD X670",
            "Form Factor": "ATX"
          },
          has3D: true,
          store: "Newegg",
          stock: "In stock"
        }
      ],
      gpu: [
        {
          id: 'gpu-1',
          name: 'NVIDIA GeForce RTX 4090 24GB',
          image: "/src/assets/Laptop1.png",
          price: 1599.99,
          specs: {
            "Memory": "24GB GDDR6X",
            "Boost Clock": "2520 MHz",
            "Interface": "PCIe 4.0"
          },
          has3D: true,
          store: "Newegg",
          stock: "In stock"
        }
      ],
      ram: [
        {
          id: 'ram-1',
          name: 'Corsair Vengeance RGB 32GB DDR5 6000MHz',
          image: "/src/assets/Laptop1.png",
          price: 129.99,
          specs: {
            "Capacity": "32GB (2x16GB)",
            "Speed": "DDR5 6000MHz",
            "Timing": "CL36"
          },
          has3D: false,
          store: "Amazon",
          stock: "In stock"
        }
      ],
      cpuCooler: [
        {
          id: 'cooler-1',
          name: 'NZXT Kraken X73 RGB 360mm AIO Liquid Cooler',
          image: "/src/assets/Laptop1.png",
          price: 179.99,
          specs: {
            "Type": "Liquid Cooler",
            "Radiator Size": "360mm",
            "Compatibility": "All Sockets"
          },
          has3D: true,
          store: "Newegg",
          stock: "In stock"
        }
      ],
      storage: [
        {
          id: 'storage-1',
          name: 'Samsung 980 Pro 2TB PCIe 4.0 NVMe SSD',
          image: "/src/assets/Laptop1.png",
          price: 159.99,
          specs: {
            "Capacity": "2TB",
            "Interface": "PCIe 4.0 NVMe",
            "Sequential Read": "7000 MB/s"
          },
          has3D: false,
          store: "Amazon",
          stock: "In stock"
        }
      ],
      powerSupply: [
        {
          id: 'psu-1',
          name: 'Corsair RM1000x 1000W 80+ Gold Modular',
          image: "/src/assets/Laptop1.png",
          price: 189.99,
          specs: {
            "Wattage": "1000W",
            "Efficiency": "80+ Gold",
            "Modular": "Full Modular"
          },
          has3D: false,
          store: "Newegg",
          stock: "In stock"
        }
      ]
    };

    return baseData[type.id] || [
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
            <ProductFilter />
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