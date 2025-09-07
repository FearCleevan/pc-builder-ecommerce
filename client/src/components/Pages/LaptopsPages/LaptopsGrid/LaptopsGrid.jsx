// client/src/components/Pages/LaptopsPages/LaptopsGrid/LaptopsGrid.jsx
import React from 'react';
import LaptopCard from '../LaptopCard/LaptopCard';
import styles from './LaptopsGrid.module.css';

const LaptopsGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <h3>No laptops found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <LaptopCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default LaptopsGrid;