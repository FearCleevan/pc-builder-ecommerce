// client/src/components/Main/MainSecondContainer.jsx
import React, { useRef } from 'react';
import styles from './MainSecondContainer.module.css';
import { exploreProducts } from '../MockData/exploreProducts';

const MainSecondContainer = ({ isMobile }) => {
  const exploreRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const cardWidth = ref.current.querySelector('.card').offsetWidth + (isMobile ? 10 : 20);
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.exploreProducts}>
      <h2>Explore Products</h2>
      <div className={styles.carouselWrapper}>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(exploreRef, "left")}>
            &#8249;
          </button>
        )}
        <div className={styles.carousel} ref={exploreRef}>
          {exploreProducts.map((product, index) => (
            <div key={index} className={`${styles.exploreCard} card`}>
              <img src={product.img} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
          ))}
        </div>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(exploreRef, "right")}>
            &#8250;
          </button>
        )}
      </div>
    </section>
  );
};

export default MainSecondContainer;