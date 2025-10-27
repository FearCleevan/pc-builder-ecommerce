// client/src/components/PCBuilder/PCBuilder.jsx
import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CreateNewBuild from './CreateNewBuild/CreateNewBuild';
import PCBuildHeader from './PCBuildHeader/PCBuildHeader';
import PCBuildBody from './PCBuildBody/PCBuildBody';
import PCBuildFooter from './PCBuildFooter/PCBuildFooter';
import CompareProducts from './CompareProducts/CompareProducts';
import styles from './PCBuilder.module.css';

const PCBuilder = () => {
  const [isComparing, setIsComparing] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState({
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
  });

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

  const handleClearAllComponents = () => {
    setSelectedComponents({
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
    });
  };

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
            <PCBuildHeader selectedComponents={selectedComponents} />
            <PCBuildBody 
              selectedComponents={selectedComponents}
              onComponentSelect={handleComponentSelect}
              onComponentRemove={handleComponentRemove}
              onClearAllComponents={handleClearAllComponents}
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