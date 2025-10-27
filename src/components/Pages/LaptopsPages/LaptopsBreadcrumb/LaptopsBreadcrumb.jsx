// client/src/components/Pages/LaptopsPages/LaptopsBreadcrumb/LaptopsBreadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LaptopsBreadcrumb.module.css';
import { getSeriesItems, getFeatures } from '../../../MockData/LaptopMockData';

const LaptopsBreadcrumb = ({ category, subcategory, series, productCount }) => {
  const getSeriesName = (id) => {
    const seriesItems = getSeriesItems(category);
    const found = seriesItems.find(item => item.id === id);
    return found ? found.name : id;
  };

  const getFeatureName = (id) => {
    const features = getFeatures(category);
    const found = features.find(item => item.id === id);
    return found ? found.name : id;
  };

  return (
    <section className={styles.topbox}>
      <div className={styles.topboxContainer}>
        <div className={styles.topboxLeft}>
          <h2 className={styles.topboxTitle}>
            {series ? getSeriesName(series) : 
             subcategory ? getFeatureName(subcategory) : 
             category || 'All Laptops'} ({productCount})
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
                    to={`/laptops?category=${category}`}
                  >
                    {category}
                  </Link>
                </li>
              )}
              {subcategory && (
                <li className={styles.breadcrumbItem}>
                  <Link 
                    className={styles.breadcrumbLink} 
                    to={`/laptops?category=${category}&subcategory=${subcategory}`}
                  >
                    {getFeatureName(subcategory)}
                  </Link>
                </li>
              )}
              {series && (
                <li className={styles.breadcrumbItem}>
                  <Link 
                    className={styles.breadcrumbLink} 
                    to={`/laptops?category=${category}&series=${series}`}
                  >
                    {getSeriesName(series)}
                  </Link>
                </li>
              )}
              <li className={styles.breadcrumbItem}></li>
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

export default LaptopsBreadcrumb;