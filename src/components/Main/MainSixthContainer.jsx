// client/src/components/Main/MainSixthContainer.jsx
import React from 'react';
import styles from './MainSixthContainer.module.css';

// Import product images
import GamingLaptop from '../../assets/Products1.png';
import GraphicsCard from '../../assets/Products1.png';
import Keyboard from '../../assets/Products1.png';

const MainSixthContainer = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Gaming Laptops",
      description: "Powerful laptops for gaming on the go",
      image: GamingLaptop,
      link: "/gaming-laptops"
    },
    {
      id: 2,
      name: "Graphics Cards",
      description: "Latest GPUs for ultimate performance",
      image: GraphicsCard,
      link: "/graphics-cards"
    },
    {
      id: 3,
      name: "Gaming Peripherals",
      description: "Keyboards, mice, and headsets",
      image: Keyboard,
      link: "/gaming-peripherals"
    }
  ];

  return (
    <section className={styles.featured}>
      <div className={styles.sectionHeader}>
        <h2>Featured Products</h2>
        <a href="#" className={styles.viewAll}>View All</a>
      </div>
      <div className={styles.featuredGrid}>
        {featuredProducts.map((product) => (
          <div key={product.id} className={styles.featuredCard}>
            <div className={styles.featuredImage}>
              <img src={product.image} alt={product.name} />
              <div className={styles.featuredOverlay}></div>
            </div>
            <div className={styles.featuredContent}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <a href={product.link} className={styles.featuredButton}>
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainSixthContainer;