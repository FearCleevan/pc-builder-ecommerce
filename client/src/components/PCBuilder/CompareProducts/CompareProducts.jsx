// client/src/components/PCBuilder/CompareProducts/CompareProducts.jsx
import React, { useState, useEffect, useRef } from 'react';
import CompareProductHeader from './CompareProductHeader/CompareProductHeader';
import SearchAndClearProduct from './SearchAndClearProduct/SearchAndClearProduct';
import DisplayProductCompare from './DisplayProductCompare/DisplayProductCompare';
import SearchResults from './SearchResults/SearchResults';
import styles from './CompareProducts.module.css';

// Import mock data
import { caseData } from '../Modal/MockData/Case/Case';
import { cpuData } from '../Modal/MockData/CPU/CPU';
import { motherboardData } from '../Modal/MockData/Motherboard/Motherboard';
import { gpuData } from '../Modal/MockData/GPU/GPU';
import { ramData } from '../Modal/MockData/RAM/Ram';
import { cpuCoolerData } from '../Modal/MockData/CPU Cooler/CPUCooler';
import { storageData } from '../Modal/MockData/Storage/Storage';
import { caseFanData } from '../Modal/MockData/Case Fan/CaseFan';
import { monitorData } from '../Modal/MockData/Monitor/Monitor';
import { mouseData } from '../Modal/MockData/Mouse/Mouse';
import { keyboardData } from '../Modal/MockData/Keyboard/Keyboard';
import { speakerData } from '../Modal/MockData/Speaker/Speaker';
import { headphonesData } from '../Modal/MockData/Headphones/Headphones';
import { microphoneData } from '../Modal/MockData/Microphone/Microphone';
import { webcamData } from '../Modal/MockData/Webcam/Webcam';
import { powerSupplyData } from '../Modal/MockData/Power Suppy/PowerSupply';

const CompareProducts = ({ products, componentType, onExit }) => {
  const [comparisonProducts, setComparisonProducts] = useState(products || []);
  const [currentComponentType, setCurrentComponentType] = useState(componentType);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  // Component data mapping
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

  // Set initial products if provided
  useEffect(() => {
    if (products && products.length > 0) {
      setComparisonProducts(products);
    }
  }, [products]);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === '') {
      setShowSearchResults(false);
      setSearchResults([]);
    } else {
      // Get all products of the current component type from mock data
      const allProducts = componentDataMap[currentComponentType.id] || [];

      // Filter out products that are already in comparison
      const availableProducts = allProducts.filter(
        product => !comparisonProducts.some(p => p.id === product.id)
      );

      // Search through available products
      const results = availableProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

      setSearchResults(results);
      setShowSearchResults(true);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const handleComponentTypeChange = (newType) => {
    setCurrentComponentType(newType);
    setSearchTerm('');
    setShowSearchResults(false);
    setSearchResults([]);
    setComparisonProducts([]);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = comparisonProducts.filter(product => product.id !== productId);
    setComparisonProducts(updatedProducts);
  };

  const handleViewDetails = (product) => {
    // Implement view details functionality
    console.log('View details:', product);
  };

  const handleAddToBuild = (product) => {
    // Implement add to build functionality
    console.log('Add to build:', product);
  };

  const handleAddToComparison = (product) => {
    // Add product to comparison
    const updatedProducts = [...comparisonProducts, product];
    setComparisonProducts(updatedProducts);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const handleBackToBuilder = () => {
    onExit();
  };

  return (
    <div className={styles.compareProducts}>
      <CompareProductHeader
        componentType={currentComponentType}
        onComponentTypeChange={handleComponentTypeChange}
        onBackToBuilder={handleBackToBuilder}
      />

      <div className={styles.searchSection} ref={searchContainerRef}>
        <SearchAndClearProduct
          onSearch={handleSearch}
          onClear={handleClear}
          componentType={currentComponentType}
        />

        {showSearchResults && (
          <SearchResults
            results={searchResults}
            onAddToComparison={handleAddToComparison}
            parentRef={searchContainerRef}
          />
        )}
      </div>

      <div className={styles.comparisonContainer}>
        {comparisonProducts.length > 0 ? (
          <DisplayProductCompare
            products={comparisonProducts}
            onRemove={handleRemoveProduct}
            onViewDetails={handleViewDetails}
            onAddToBuild={handleAddToBuild}
          />
        ) : (
          <div className={styles.emptyComparison}>
            <div className={styles.emptyComparisonContent}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>No products to compare</h3>
              <p>Search for products to add to your comparison</p>
            </div>
          </div>
        )}
      </div>

      {showSearchResults && searchResults.length === 0 && searchTerm && (
        <div className={styles.noResults}>
          <p>No products found for "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CompareProducts;