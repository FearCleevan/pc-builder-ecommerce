// client/src/components/Main/MainThirdContainer.jsx
import React, { useRef } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';
import styles from './MainThirdContainer.module.css';
import { desktopProducts } from '../MockData/desktopProducts';
import { formatPrice } from '../MockData/formatPrice';

const MainThirdContainer = ({ isMobile }) => {
  const desktopRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });
  const suppressClickRef = useRef(false);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const firstCard = ref.current.querySelector(`.${styles.productCard}`);
      if (!firstCard) return;

      const gap = parseFloat(window.getComputedStyle(ref.current).columnGap || window.getComputedStyle(ref.current).gap || '0');
      const cardWidth = firstCard.getBoundingClientRect().width + gap;
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePointerDown = (event) => {
    if (!desktopRef.current) return;

    dragState.current.isDragging = true;
    dragState.current.startX = event.clientX;
    dragState.current.scrollLeft = desktopRef.current.scrollLeft;
    dragState.current.hasMoved = false;

    desktopRef.current.classList.add(styles.dragging);
    desktopRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isDragging || !desktopRef.current) return;

    const deltaX = event.clientX - dragState.current.startX;
    if (Math.abs(deltaX) > 4) dragState.current.hasMoved = true;
    desktopRef.current.scrollLeft = dragState.current.scrollLeft - deltaX;
  };

  const handlePointerUp = (event) => {
    if (!desktopRef.current) return;

    if (dragState.current.hasMoved) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragState.current.isDragging = false;
    dragState.current.hasMoved = false;
    desktopRef.current.classList.remove(styles.dragging);

    if (desktopRef.current.hasPointerCapture(event.pointerId)) {
      desktopRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleCarouselClickCapture = (event) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      event.stopPropagation();
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
        <h2>New Arrivals - Desktops</h2>
        <a href="#" className={styles.viewAll}>View All</a>
      </div>
      <div className={styles.carouselWrapper}>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(desktopRef, "left")}>
            &#8249;
          </button>
        )}
        <div
          className={styles.productCarousel}
          ref={desktopRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={handleCarouselClickCapture}
        >
          {desktopProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
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
                  <button className={styles.compareBtn} aria-label="Compare Products">
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
          <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(desktopRef, "right")}>
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default MainThirdContainer;
