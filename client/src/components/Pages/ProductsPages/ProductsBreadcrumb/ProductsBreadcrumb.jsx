// client/src/components/Pages/ProductsPages/ProductsBreadcrumb/ProductsBreadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import styles from './ProductsBreadcrumb.module.css';
import { getSeriesItems, getSubCategories } from '../../../MockData/ProductMockData';

const ProductsBreadcrumb = ({ category, subcategory, series, productCount }) => {
  // Get display names for IDs
  const getSubcategoryName = (id) => {
    const subcategories = getSubCategories(category);
    const found = subcategories.find(item => item.id === id);
    return found ? found.name : id;
  };

  const getSeriesName = (id) => {
    const seriesItems = getSeriesItems(category);
    const found = seriesItems.find(item => item.id === id);
    return found ? found.name : id;
  };

  return (
    <section className={styles.topbox}>
      <div className={styles.topboxContainer}>
        <div className={styles.topboxLeft}>
          <h2 className={styles.topboxTitle}>
            {series ? getSeriesName(series) : 
             subcategory ? getSubcategoryName(subcategory) : 
             category || 'All Products'} ({productCount})
          </h2>
          <nav className={styles.breadcrumb}>
            <ol className={styles.breadcrumbList}>
              <li className={styles.breadcrumbItem}>
                <Link className={styles.breadcrumbLink} to="/">Home</Link>
              </li>
              {category && (
                <li className={styles.breadcrumbItem}>
                  <Link 
                    className={styles.breadcrumbLink} 
                    to={`/products?category=${category}`}
                  >
                    {category}
                  </Link>
                </li>
              )}
              {subcategory && (
                <li className={styles.breadcrumbItem}>
                  <Link 
                    className={styles.breadcrumbLink} 
                    to={`/products?category=${category}&subcategory=${subcategory}`}
                  >
                    {getSubcategoryName(subcategory)}
                  </Link>
                </li>
              )}
              {series && (
                <li className={styles.breadcrumbItem}>
                  <Link 
                    className={styles.breadcrumbLink} 
                    to={`/products?category=${category}&series=${series}`}
                  >
                    {getSeriesName(series)}
                  </Link>
                </li>
              )}
              <li className={styles.breadcrumbItem}>Products</li>
            </ol>
          </nav>
        </div>
        
        <div className={styles.topboxRight}>
          <fieldset className={styles.sort}>
            <label className={styles.sortLabel} htmlFor="sort">
              <span className={styles.sortIcon}>↕</span>
              Sort By
            </label>
            <select className={styles.sortSelect} id="sort">
              <option className={styles.sortOption} value="default">Popularity</option>
              <option className={styles.sortOption} value="date">Release Date</option>
              <option className={styles.sortOption} value="name">Name</option>
              <option className={styles.sortOption} value="price-low">Price: Low to High</option>
              <option className={styles.sortOption} value="price-high">Price: High to Low</option>
            </select>
          </fieldset>
        </div>
      </div>
    </section>
  );
};

export default ProductsBreadcrumb;