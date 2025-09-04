// client/src/components/Pages/ProductsPages/ProductsPages.jsx
import React, { useState, useEffect } from 'react';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsGrid from './ProductsGrid/ProductsGrid';
import ProductsBreadcrumb from './ProductsBreadcrumb/ProductsBreadcrumb';
import { otherProducts } from '../../MockData/MockData';
import styles from './ProductsPages.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ProductsPages = () => {
  const [filteredProducts, setFilteredProducts] = useState(otherProducts);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    series: [],
    subcategory: []
  });

  // Parse URL parameters on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const category = queryParams.get('category') || '';
    const series = queryParams.get('series') ? [queryParams.get('series')] : [];
    const subcategory = queryParams.get('subcategory') ? [queryParams.get('subcategory')] : [];
    
    setActiveFilters({
      category,
      series,
      subcategory
    });
    
    // Apply initial filters
    applyFilters(category, series, subcategory);
  }, []);

  const applyFilters = (category, series, subcategory) => {
    let filtered = [...otherProducts];
    
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
    
    // Update URL with new filters
    const searchParams = new URLSearchParams();
    if (newFilters.category) searchParams.set('category', newFilters.category);
    if (newFilters.series.length > 0) searchParams.set('series', newFilters.series[0]);
    if (newFilters.subcategory.length > 0) searchParams.set('subcategory', newFilters.subcategory[0]);
    
    window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
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