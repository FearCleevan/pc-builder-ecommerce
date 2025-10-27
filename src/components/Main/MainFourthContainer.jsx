// client/src/components/Main/MainFourthContainer.jsx
import React, { useRef } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';
import styles from './MainFourthContainer.module.css';
import { formatPrice } from '../MockData/formatPrice';
import { laptopProducts } from '../MockData/laptopProducts';

const MainFourthContainer = ({ isMobile }) => {
  const laptopRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const cardWidth = ref.current.querySelector('.card').offsetWidth + (isMobile ? 10 : 20);
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

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
    <section className={styles.newArrivals}>
      <div className={styles.sectionHeader}>
        <h2>New Arrivals - Laptops</h2>
        <a href="#" className={styles.viewAll}>View All</a>
      </div>
      <div className={styles.carouselWrapper}>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(laptopRef, "left")}>
            &#8249;
          </button>
        )}
        <div className={styles.productCarousel} ref={laptopRef}>
          {laptopProducts.map((product) => (
            <div key={product.id} className={`${styles.productCard} card`}>
              {/* Same product card structure as MainThirdContainer */}
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
          ))}
        </div>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(laptopRef, "right")}>
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default MainFourthContainer;