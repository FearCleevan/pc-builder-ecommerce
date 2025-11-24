// client/src/components/PCBuilder/PCBuilder.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CreateNewBuild from './CreateNewBuild/CreateNewBuild';
import PCBuildHeader from './PCBuildHeader/PCBuildHeader';
import PCBuildBody from './PCBuildBody/PCBuildBody';
import PCBuildFooter from './PCBuildFooter/PCBuildFooter';
import CompareProducts from './CompareProducts/CompareProducts';
import styles from './PCBuilder.module.css';

// Initial state for selected components
const initialComponentsState = {
  case: null,
  cpu: null,
  motherboard: null,
  gpu: null,
  ram: null,
  cpuCooler: null,
  storage: null,
  powerSupply: null,
  caseFan: null,
  monitor: null,
  mouse: null,
  keyboard: null,
  speaker: null,
  headphones: null,
  microphone: null,
  webcam: null
};

const PCBuilder = () => {
  const [isComparing, setIsComparing] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState(initialComponentsState);

  // Load saved components from localStorage on component mount
  useEffect(() => {
    const savedComponents = localStorage.getItem('pcBuildSelectedComponents');
    if (savedComponents) {
      try {
        const parsedComponents = JSON.parse(savedComponents);
        setSelectedComponents(parsedComponents);
        console.log('Loaded saved components from localStorage');
      } catch (error) {
        console.error('Error loading saved components from localStorage:', error);
        // If there's an error, clear the corrupted data
        localStorage.removeItem('pcBuildSelectedComponents');
      }
    }
  }, []);

  // Save components to localStorage whenever they change
  useEffect(() => {
    const hasComponents = Object.values(selectedComponents).some(component => component !== null);
    
    if (hasComponents) {
      localStorage.setItem('pcBuildSelectedComponents', JSON.stringify(selectedComponents));
    } else {
      localStorage.removeItem('pcBuildSelectedComponents');
    }
  }, [selectedComponents]);

  const handleCompareNavigate = (products, componentType) => {
    setCompareData({ products, componentType });
    setIsComparing(true);
  };

  const handleExitCompare = () => {
    setIsComparing(false);
    setCompareData(null);
  };

  const handleComponentSelect = (component, category) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };

  const handleComponentRemove = (category) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: null
    }));
  };

  // Remove the window.confirm from here - just clear directly
  const handleClearAllComponents = () => {
    setSelectedComponents(initialComponentsState);
    localStorage.removeItem('pcBuildSelectedComponents');
  };

  // Check if any components are selected
  const hasSelectedComponents = Object.values(selectedComponents).some(component => component !== null);

  return (
    <div className={styles.pcBuilder}>
      <Header />
      <div className={styles.container}>
        {isComparing ? (
          <CompareProducts 
            products={compareData.products} 
            componentType={compareData.componentType}
            onExit={handleExitCompare}
          />
        ) : (
          <>
            <CreateNewBuild />
            <PCBuildHeader 
              selectedComponents={selectedComponents} 
              onClearAll={handleClearAllComponents}
              hasSelectedComponents={hasSelectedComponents}
            />
            <PCBuildBody 
              selectedComponents={selectedComponents}
              onComponentSelect={handleComponentSelect}
              onComponentRemove={handleComponentRemove}
              onCompareNavigate={handleCompareNavigate}
            />
            <PCBuildFooter selectedComponents={selectedComponents} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PCBuilder;