// client/src/components/Pages/ProductsPages/ProductsPages.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsGrid from './ProductsGrid/ProductsGrid';
import ProductsBreadcrumb from './ProductsBreadcrumb/ProductsBreadcrumb';
import { accessoriesProducts, otherProducts } from '../../MockData/MockData';
import styles from './ProductsPages.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

const ProductsPages = () => {
  const [filteredProducts, setFilteredProducts] = useState([...otherProducts, ...accessoriesProducts]);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    series: [],
    subcategory: []
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Use React Router's useSearchParams to get URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  // Check if mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      // Auto-close filter on resize to desktop
      if (window.innerWidth > 992) {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
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
          {/* Desktop Sidebar */}
          {!isMobile && (
            <aside className={styles.sidebar}>
              <ProductsFilter 
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                isMobile={false}
              />
            </aside>
          )}
          
          <main className={styles.mainContent}>
            {/* Mobile Filter Toggle Button - Integrated with filter */}
            {isMobile && (
              <div className={styles.mobileFilterContainer}>
                <button 
                  className={`${styles.mobileFilterToggle} ${isMobileFilterOpen ? styles.active : ''}`}
                  onClick={toggleMobileFilter}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" stroke="#ccc" style={{margin: '0px 5px 0px 0px'}}>
                    <g id="Group_33" data-name="Group 33" transform="translate(-1651 -352)">
                      <g id="Group_24" data-name="Group 24" transform="translate(1651 352)">
                        <path id="Path_1" data-name="Path 1" d="M18.507,45.465H6.8V45A1.233,1.233,0,0,0,5.566,43.77H3.655A1.233,1.233,0,0,0,2.423,45v.463H.493a.493.493,0,0,0,0,.985h1.93v.463a1.233,1.233,0,0,0,1.232,1.232H5.566A1.233,1.233,0,0,0,6.8,46.913V46.45h11.71a.493.493,0,0,0,0-.985Zm-12.7,1.448a.247.247,0,0,1-.246.246H3.655a.247.247,0,0,1-.246-.246V45a.247.247,0,0,1,.246-.246H5.566A.247.247,0,0,1,5.812,45Z" transform="translate(0 -43.77)" fill="#999"></path>
                      </g>
                      <g id="Group_26" data-name="Group 26" transform="translate(1651 357.487)">
                        <path id="Path_2" data-name="Path 2" d="M18.507,193.321h-1.93v-.463a1.233,1.233,0,0,0-1.232-1.232H13.434a1.233,1.233,0,0,0-1.232,1.232v.463H.493a.493.493,0,1,0,0,.985H12.2v.463A1.233,1.233,0,0,0,13.434,196h1.911a1.233,1.233,0,0,0,1.232-1.232v-.463h1.93a.493.493,0,0,0,0-.985Zm-2.916,1.448a.247.247,0,0,1-.246.246H13.434a.247.247,0,0,1-.246-.246v-1.911a.247.247,0,0,1,.246-.246h1.911a.247.247,0,0,1,.246.246Z" transform="translate(0 -191.626)" fill="#999"></path>
                      </g>
                      <g id="Group_28" data-name="Group 28" transform="translate(1651 363.377)">
                        <path id="Path_3" data-name="Path 3" d="M18.507,352.047H10.258v-.463a1.233,1.233,0,0,0-1.232-1.232H7.115a1.233,1.233,0,0,0-1.232,1.232v.463H.493a.493.493,0,0,0,0,.985H5.884v.463a1.233,1.233,0,0,0,1.232,1.232H9.027a1.233,1.233,0,0,0,1.232-1.232v-.463h8.249a.493.493,0,0,0,0-.985ZM9.273,353.5a.247.247,0,0,1-.246.246H7.115a.247.247,0,0,1-.246-.246v-1.911a.247.247,0,0,1,.246-.246H9.027a.247.247,0,0,1,.246.246Z" transform="translate(0 -350.353)" fill="#999"></path>
                      </g>
                    </g>
                  </svg>
                  ADVANCED SEARCH
                </button>
                
                {/* Mobile Filter Dropdown - Connected to the button */}
                {isMobileFilterOpen && (
                  <div className={styles.mobileFilterDropdown}>
                    <ProductsFilter 
                      activeFilters={activeFilters}
                      onFilterChange={handleFilterChange}
                      isMobile={true}
                    />
                  </div>
                )}
              </div>
            )}
            
            <div className={`${styles.productsContainer} ${isMobileFilterOpen ? styles.productsShifted : ''}`}>
              <ProductsGrid products={filteredProducts} />
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPages;