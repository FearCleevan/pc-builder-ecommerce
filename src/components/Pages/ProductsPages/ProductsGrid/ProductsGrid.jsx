// client/src/components/Pages/ProductsPages/ProductsGrid/ProductsGrid.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsGrid.module.css';

const ProductsGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <h3>No products found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;