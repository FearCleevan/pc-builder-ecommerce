// client/src/components/PCBuilder/CompareProducts/CompareProducts.jsx
import React, { useState } from 'react';
import CompareProductHeader from './CompareProductHeader/CompareProductHeader';
import SearchAndClearProduct from './SearchAndClearProduct/SearchAndClearProduct';
import DisplayProductCompare from './DisplayProductCompare/DisplayProductCompare';
import styles from './CompareProducts.module.css';

const CompareProducts = ({ products, componentType, onExit }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentComponentType, setCurrentComponentType] = useState(componentType);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredProducts(products);
  };

  const handleComponentTypeChange = (newType) => {
    setCurrentComponentType(newType);
    // In a real app, you would fetch products of the new type here
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = filteredProducts.filter(product => product.id !== productId);
    setFilteredProducts(updatedProducts);
    
    // If no products left, exit comparison view
    if (updatedProducts.length === 0) {
      onExit();
    }
  };

  const handleViewDetails = (product) => {
    // Implement view details functionality
    console.log('View details:', product);
  };

  const handleAddToBuild = (product) => {
    // Implement add to build functionality
    console.log('Add to build:', product);
  };

  return (
    <div className={styles.compareProducts}>
      <CompareProductHeader 
        componentType={currentComponentType}
        onComponentTypeChange={handleComponentTypeChange}
      />
      
      <SearchAndClearProduct 
        onSearch={handleSearch}
        onClear={handleClear}
        componentType={currentComponentType}
      />
      
      <DisplayProductCompare 
        products={filteredProducts}
        onRemove={handleRemoveProduct}
        onViewDetails={handleViewDetails}
        onAddToBuild={handleAddToBuild}
      />
    </div>
  );
};

export default CompareProducts;