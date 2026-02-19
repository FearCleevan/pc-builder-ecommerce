// client/src/components/Main/MainSecondContainer.jsx
import React, { useRef } from 'react';
import styles from './MainSecondContainer.module.css';
import { exploreProducts } from '../MockData/exploreProducts';

const MainSecondContainer = ({ isMobile, onProductClick }) => {
  const exploreRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    hasMoved: false,
  });
  const suppressClickRef = useRef(false);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const firstCard = ref.current.querySelector(`.${styles.exploreCard}`);
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
    if (!exploreRef.current) return;

    dragState.current.isDragging = true;
    dragState.current.startX = event.clientX;
    dragState.current.scrollLeft = exploreRef.current.scrollLeft;
    dragState.current.hasMoved = false;

    exploreRef.current.classList.add(styles.dragging);
    exploreRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragState.current.isDragging || !exploreRef.current) return;

    const deltaX = event.clientX - dragState.current.startX;
    if (Math.abs(deltaX) > 4) {
      dragState.current.hasMoved = true;
    }
    exploreRef.current.scrollLeft = dragState.current.scrollLeft - deltaX;
  };

  const handlePointerUp = (event) => {
    if (!exploreRef.current) return;
    if (dragState.current.hasMoved) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    dragState.current.isDragging = false;
    dragState.current.hasMoved = false;
    exploreRef.current.classList.remove(styles.dragging);
    if (exploreRef.current.hasPointerCapture(event.pointerId)) {
      exploreRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleCardClick = (product) => {
    if (suppressClickRef.current) return;
    if (typeof onProductClick === 'function') {
      onProductClick(product);
    }
  };

  return (
    <section className={styles.exploreProducts}>
      <div className={styles.header}>
        <h2>Explore Products</h2>
        <p>Browse by category and drag to discover more options.</p>
      </div>

      <div className={styles.carouselWrapper}>
        {!isMobile && (
          <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(exploreRef, "left")}>
            &#8249;
          </button>
        )}
        <div
          className={styles.carousel}
          ref={exploreRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {exploreProducts.map((product, index) => (
            <button
              key={index}
              type="button"
              className={styles.exploreCard}
              onClick={() => handleCardClick(product)}
              aria-label={`Open ${product.name}`}
            >
              <img src={product.img} alt={product.name} draggable="false" />
              <h3>{product.name}</h3>
            </button>
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
