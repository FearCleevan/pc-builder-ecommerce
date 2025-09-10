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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Mock data - in a real app, this would come from an API
      const mockComponents = [
        {
          id: '1',
          name: `Sample ${componentType?.name}`,
          image: "/placeholder-image.jpg",
          price: Math.floor(Math.random() * 500) + 50,
          specs: {
            "Form Factor": "ATX Full Tower",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "440 mm"
          },
          has3D: true
        },
        {
          id: '2',
          name: `Premium ${componentType?.name}`,
          image: "/placeholder-image.jpg",
          price: Math.floor(Math.random() * 500) + 200,
          specs: {
            "Form Factor": "EATX",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "500 mm"
          },
          has3D: true
        },
        {
          id: '3',
          name: `Budget ${componentType?.name}`,
          image: "/placeholder-image.jpg",
          price: Math.floor(Math.random() * 200) + 30,
          specs: {
            "Form Factor": "ATX Mid Tower",
            "Side Panel": "Acrylic",
            "Max GPU Length": "350 mm"
          },
          has3D: false
        },
        {
          id: '4',
          name: `Gaming ${componentType?.name}`,
          image: "/placeholder-image.jpg",
          price: Math.floor(Math.random() * 600) + 100,
          specs: {
            "Form Factor": "ATX Full Tower",
            "Side Panel": "Tempered Glass",
            "Max GPU Length": "450 mm"
          },
          has3D: true
        }
      ];
      setComponents(mockComponents);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, componentType]);

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
    // In a real app, you would fetch data for the new page
  };

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
            <div className={styles.searchAndInfo}>
              <div className={styles.searchSection}>
                <div className={styles.searchInputContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder={`Search for ${componentType?.name}...`}
                    className={styles.searchInput}
                  />
                </div>
              </div>
              
              <div className={styles.resultsInfo}>
                <span className={styles.resultsCount}>3535 Compatible Products</span>
                <div className={styles.sortSection}>
                  <span className={styles.sortLabel}>Sort by</span>
                  <select className={styles.sortSelect} defaultValue="default">
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className={styles.componentsGrid}>
              {components.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onSelect={handleComponentSelect}
                />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={71}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComponentModal;