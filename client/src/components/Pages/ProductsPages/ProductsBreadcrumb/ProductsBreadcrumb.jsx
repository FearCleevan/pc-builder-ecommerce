// client/src/components/Pages/ProductsPages/ProductsBreadcrumb/ProductsBreadcrumb.jsx
import React from 'react';
import styles from './ProductsBreadcrumb.module.css';

const ProductsBreadcrumb = ({ category, productCount }) => {
  return (
    <section className={styles.topbox}>
      <div className={styles.topboxContainer}>
        <div className={styles.topboxLeft}>
          <h2 className={styles.topboxTitle}>{category} ({productCount})</h2>
          <nav className={styles.breadcrumb}>
            <ol className={styles.breadcrumbList}>
              <li className={styles.breadcrumbItem}>
                <a className={styles.breadcrumbLink} href="/">Home</a>
              </li>
              <li className={styles.breadcrumbItem}>
                <a className={styles.breadcrumbLink} href={`/${category}`}>{category}</a>
              </li>
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