// client/src/components/Pages/ProductsPages/ProductsPages.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // Add this import
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsGrid from './ProductsGrid/ProductsGrid';
import ProductsBreadcrumb from './ProductsBreadcrumb/ProductsBreadcrumb';
import { accessoriesProducts, otherProducts } from '../../MockData/MockData';
import styles from './ProductsPages.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ProductsPages = () => {
  const [filteredProducts, setFilteredProducts] = useState(otherProducts, accessoriesProducts);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    series: [],
    subcategory: []
  });
  
  // Use React Router's useSearchParams to get URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse URL parameters on component mount and when they change
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const series = searchParams.get('series') ? [searchParams.get('series')] : [];
    const subcategory = searchParams.get('subcategory') ? [searchParams.get('subcategory')] : [];
    
    setActiveFilters({
      category,
      series,
      subcategory
    });
    
    // Apply initial filters
    applyFilters(category, series, subcategory);
  }, [searchParams]);

  const applyFilters = (category, series, subcategory) => {
    let filtered = [...otherProducts, ...accessoriesProducts];
    
    if (category) {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }
    
    if (series.length > 0) {
      filtered = filtered.filter(product =>
        series.includes(product.series)
      );
    }
    
    if (subcategory.length > 0) {
      filtered = filtered.filter(product =>
        subcategory.includes(product.subcategory)
      );
    }
    
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    applyFilters(newFilters.category, newFilters.series, newFilters.subcategory);
    
    // Update URL with new filters using React Router
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.series.length > 0) params.set('series', newFilters.series[0]);
    if (newFilters.subcategory.length > 0) params.set('subcategory', newFilters.subcategory[0]);
    
    setSearchParams(params);
  };

  return (
    <div className={styles.productsPage}>
      <Header />
      <div className={styles.container}>
        <ProductsBreadcrumb 
          category={activeFilters.category} 
          subcategory={activeFilters.subcategory[0]}
          series={activeFilters.series[0]}
          productCount={filteredProducts.length} 
        />
        
        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <ProductsFilter 
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </aside>
          
          <main className={styles.mainContent}>
            <ProductsGrid products={filteredProducts} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPages;