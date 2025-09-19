//client/src/components/AIAssistant/components/ProductCard/ProductCard.jsx

import React from 'react';
import styles from '../../AIAssistant.module.css';

/**
 * Product card component for displaying product information
 * @param {object} props - Component props
 * @param {object} props.product - Product object
 * @param {function} props.onAction - Function to handle product actions
 * @returns {JSX.Element} Product card component
 */
const ProductCard = ({ product, onAction }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h4>{product.name}</h4>
        {product.brand && (
          <p className={styles.productBrand}>{product.brand}</p>
        )}
        {product.description && (
          <p className={styles.productDescription}>{product.description}</p>
        )}
        <div className={styles.productPrice}>
          <span className={styles.currentPrice}>₱{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className={styles.oldPrice}>₱{product.oldPrice.toLocaleString()}</span>
          )}
        </div>
        {product.rating && (
          <div className={styles.productRating}>
            <span className={styles.ratingStars}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className={styles.ratingText}>({product.reviews} reviews)</span>
          </div>
        )}
      </div>
      <div className={styles.productActions}>
        <button
          className={styles.viewButton}
          onClick={() => onAction('view', product)}
        >
          View Product
        </button>
        <button
          className={styles.cartButton}
          onClick={() => onAction('cart', product)}
        >
          Add to Cart
        </button>
        <button
          className={styles.buyButton}
          onClick={() => onAction('buy', product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;