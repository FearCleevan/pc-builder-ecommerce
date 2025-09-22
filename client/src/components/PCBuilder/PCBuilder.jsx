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

  const handleCompareNavigate = (products, componentType) => {
    setCompareData({ products, componentType });
    setIsComparing(true);
  };

  const [selectedComponents, setSelectedComponents] = useState({

  });
  const handleComponentSelect = (component, category) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };


  const handleExitCompare = () => {
    setIsComparing(false);
    setCompareData(null);
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
            <PCBuildBody onCompareNavigate={handleCompareNavigate} />
            <PCBuildFooter />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PCBuilder;