//client/src/components/PCBuilder/PCBuildFooter/PCBuildFooter.jsx
import React, { useMemo, useState } from 'react';
import AddComponentModal from '../Modal/AddComponentModal/AddComponentModal';
import styles from './PCBuildFooter.module.css';

const additionalProducts = [
  { id: 'thermalCompound', name: 'Thermal Compound' },
  { id: 'operatingSystem', name: 'Operating System' },
  { id: 'soundCard', name: 'Sound Card' },
  { id: 'networkCard', name: 'Network Card' },
  { id: 'captureCard', name: 'Capture Card' },
  { id: 'vrHeadset', name: 'VR Headset' },
  { id: 'accessory', name: 'Accessory' }
];

const PCBuildFooter = ({ selectedComponents, onComponentSelect, onCompareNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);

  const mappedProductTypes = useMemo(() => {
    return additionalProducts.map((item) => ({
      ...item,
      selected: selectedComponents?.[item.id] || null
    }));
  }, [selectedComponents]);

  const openModal = (productType) => {
    setSelectedProductType(productType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductType(null);
  };

  const handleSelect = (component) => {
    if (selectedProductType?.id) {
      onComponentSelect(component, selectedProductType.id);
    }
    closeModal();
  };

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.title}>Additional Products</h3>
        <div className={styles.productsGrid}>
          {mappedProductTypes.map((product) => (
            <button
              key={product.id}
              className={`${styles.productButton} ${product.selected ? styles.productButtonSelected : ''}`}
              onClick={() => openModal(product)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {product.selected ? (
                  <>
                    <path d="m20 6-11 11-5-5"></path>
                  </>
                ) : (
                  <>
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </>
                )}
              </svg>
              <span className={styles.productText}>
                {product.selected ? `${product.name}: ${product.selected.name}` : product.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AddComponentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSelect}
        componentType={selectedProductType}
        selectedComponents={selectedComponents}
        onCompareNavigate={onCompareNavigate}
      />
    </>
  );
};

export default PCBuildFooter;
