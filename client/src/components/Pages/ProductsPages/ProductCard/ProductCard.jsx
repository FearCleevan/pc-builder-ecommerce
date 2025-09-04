// client/src/components/Pages/ProductsPages/ProductCard/ProductCard.jsx
import React from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';
import { formatPrice } from '../../../MockData/MockData';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className={styles.starIcon} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className={styles.starIconHalf} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.starIcon} />);
      }
    }
    
    return stars;
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.img} alt={product.name} />
        {product.oldPrice > 0 && (
          <span className={styles.discountBadge}>
            {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
          </span>
        )}
        <div className={styles.productActions}>
          <button className={styles.wishlistBtn} aria-label="Add to Wishlist">
            <FaHeart />
            <span className={styles.tooltip}>Add to Wishlist</span>
          </button>
          <button className={styles.compareBtn} aria-label="Compare Product">
            <FaBalanceScale />
            <span className={styles.tooltip}>Compare</span>
          </button>
        </div>
      </div>
      
      <div className={styles.productInfo}>
        <span className={styles.productBrand}>{product.brand}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDesc}>{product.description}</p>
        
        <div className={styles.productRating}>
          <div className={styles.stars}>
            {renderStars(product.rating)}
            <span>({product.reviews})</span>
          </div>
        </div>
        
        <div className={styles.productPrice}>
          {product.oldPrice > 0 && (
            <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
          )}
          <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
        </div>
        
        <div className={styles.productButtons}>
          <button className={styles.buyNowBtn}>Buy Now</button>
          <button className={styles.addToCartBtn}>
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;