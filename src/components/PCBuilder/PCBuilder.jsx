// client/src/components/PCBuilder/PCBuilder.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CreateNewBuild from './CreateNewBuild/CreateNewBuild';
import PCBuildHeader from './PCBuildHeader/PCBuildHeader';
import PCBuildBody from './PCBuildBody/PCBuildBody';
import PCBuildFooter from './PCBuildFooter/PCBuildFooter';
import CompareProducts from './CompareProducts/CompareProducts';
import { useNavigate } from 'react-router-dom';
import { addBuildToCart } from '../../utils/cartStorage';
import { getCompatibilityReport, getWattageReport } from './utils/buildAnalysis';
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
  webcam: null,
  thermalCompound: null,
  operatingSystem: null,
  soundCard: null,
  networkCard: null,
  captureCard: null,
  vrHeadset: null,
  accessory: null
};

const SAVED_BUILDS_KEY = 'pcBuilder_savedBuilds';

const loadSavedBuilds = () => {
  try {
    const raw = localStorage.getItem(SAVED_BUILDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeSavedBuilds = (builds) => {
  localStorage.setItem(SAVED_BUILDS_KEY, JSON.stringify(builds));
};

const PCBuilder = () => {
  const navigate = useNavigate();
  const [isComparing, setIsComparing] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState(initialComponentsState);
  const [buildAssemblyOption, setBuildAssemblyOption] = useState('store-build');
  const [isAddToCartConfirmOpen, setIsAddToCartConfirmOpen] = useState(false);
  const [buildName, setBuildName] = useState('New Build');

  // Load saved components from localStorage on component mount
  useEffect(() => {
    const savedComponents = localStorage.getItem('pcBuildSelectedComponents');
    if (savedComponents) {
      try {
        const parsedComponents = JSON.parse(savedComponents);
        setSelectedComponents({ ...initialComponentsState, ...parsedComponents });
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

  const handleClearAllComponents = () => {
    setSelectedComponents(initialComponentsState);
    localStorage.removeItem('pcBuildSelectedComponents');
  };

  const handleSaveBuild = () => {
    const hasComponents = Object.values(selectedComponents).some(c => c !== null);
    if (!hasComponents) return;
    const builds = loadSavedBuilds();
    builds.push({
      id: `build-${Date.now()}`,
      name: buildName,
      components: selectedComponents,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    });
    writeSavedBuilds(builds);
  };

  const handleLoadBuild = (build) => {
    setBuildName(build.name || 'New Build');
    setSelectedComponents({ ...initialComponentsState, ...build.components });
  };

  const handleDeleteBuild = (buildId) => {
    const builds = loadSavedBuilds().filter(b => b.id !== buildId);
    writeSavedBuilds(builds);
  };

  const handleCreateNewBuild = () => {
    const hasComponents = Object.values(selectedComponents).some(c => c !== null);
    if (hasComponents) handleSaveBuild();
    setBuildName('New Build');
    handleClearAllComponents();
  };

  const handleCloneBuild = () => {
    const hasComponents = Object.values(selectedComponents).some(c => c !== null);
    if (!hasComponents) return;
    const cloneName = `${buildName} (Copy)`;
    const builds = loadSavedBuilds();
    builds.push({
      id: `build-${Date.now()}`,
      name: cloneName,
      components: selectedComponents,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    });
    writeSavedBuilds(builds);
    setBuildName(cloneName);
  };

  // Check if any components are selected
  const hasSelectedComponents = Object.values(selectedComponents).some(component => component !== null);
  const compatibilityReport = useMemo(
    () => getCompatibilityReport(selectedComponents),
    [selectedComponents]
  );
  const wattageReport = useMemo(
    () => getWattageReport(selectedComponents),
    [selectedComponents]
  );
  const totalPrice = useMemo(
    () => Object.values(selectedComponents).reduce((sum, component) => sum + (component?.price || 0), 0),
    [selectedComponents]
  );
  const missingRequired = compatibilityReport?.missingRequired || [];

  const handleAddBuildToCart = ({ buildName, totalPrice: cartTotalPrice }) => {
    addBuildToCart({
      buildName,
      components: selectedComponents,
      totalPrice: cartTotalPrice,
      buildAssemblyOption,
      compatibility: compatibilityReport,
      estimatedWattage: wattageReport.totalEstimatedWattage,
      recommendedPsuWattage: wattageReport.recommendedPsuWattage,
      missingRequired: compatibilityReport.missingRequired
    });
  };

  const handleDirectAddToCartClick = () => {
    if (!hasSelectedComponents) return;
    setIsAddToCartConfirmOpen(true);
  };

  const handleDirectContinueBuilding = () => {
    setIsAddToCartConfirmOpen(false);
  };

  const handleDirectSubmitToCart = () => {
    handleAddBuildToCart({ buildName, totalPrice });
    setIsAddToCartConfirmOpen(false);
    navigate('/cart');
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
            onAddToBuild={(product, componentType) => {
              handleComponentSelect(product, componentType.id);
              handleExitCompare();
            }}
          />
        ) : (
          <>
            <CreateNewBuild
              onCreateNewBuild={handleCreateNewBuild}
              onSelectBuild={handleLoadBuild}
              onDeleteBuild={handleDeleteBuild}
            />
            <PCBuildHeader
              selectedComponents={selectedComponents}
              onClearAll={handleClearAllComponents}
              hasSelectedComponents={hasSelectedComponents}
              compatibilityReport={compatibilityReport}
              wattageReport={wattageReport}
              buildAssemblyOption={buildAssemblyOption}
              onBuildAssemblyOptionChange={setBuildAssemblyOption}
              onAddToCart={handleAddBuildToCart}
              buildName={buildName}
              onBuildNameChange={setBuildName}
              onSaveBuild={handleSaveBuild}
              onCloneBuild={handleCloneBuild}
            />
            <div className={styles.builderActions}>
              <button
                type="button"
                className={styles.addToCartButton}
                onClick={handleDirectAddToCartClick}
                disabled={!hasSelectedComponents}
              >
                Add Build to Cart
              </button>
            </div>
            <PCBuildBody 
              selectedComponents={selectedComponents}
              onComponentSelect={handleComponentSelect}
              onComponentRemove={handleComponentRemove}
              onCompareNavigate={handleCompareNavigate}
            />
            <PCBuildFooter
              selectedComponents={selectedComponents}
              onComponentSelect={handleComponentSelect}
              onComponentRemove={handleComponentRemove}
              onCompareNavigate={handleCompareNavigate}
            />
          </>
        )}
      </div>
      {isAddToCartConfirmOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Add Build to Cart</h3>
            {missingRequired.length > 0 ? (
              <>
                <p className={styles.modalText}>
                  The following required components are missing:{' '}
                  <strong>{missingRequired.map(c => c.label).join(', ')}</strong>.
                </p>
                <p className={styles.modalText}>
                  Do you wish to continue to add to cart or continue building?
                </p>
              </>
            ) : (
              <p className={styles.modalText}>
                Your build is ready. Do you want to add it to cart?
              </p>
            )}
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.continueButton}
                onClick={handleDirectContinueBuilding}
              >
                Continue Building
              </button>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleDirectSubmitToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PCBuilder;
