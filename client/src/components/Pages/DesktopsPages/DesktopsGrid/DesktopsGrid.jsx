// client/src/components/Pages/LaptopsPages/LaptopsGrid/LaptopsGrid.jsx
import React from 'react';
import DesktopCard from '../DesktopCard/DesktopCard';
import styles from './DesktopsGrid.module.css';

const DesktopsGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <h3>No desktops found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map(product => (
        <DesktopCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DesktopsGrid;