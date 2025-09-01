// client/src/components/Main/Main.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Main.module.css';

// Import your banner images
import Banner1 from '../../assets/banner1.jpeg';
import Banner2 from '../../assets/banner2.jpeg';
import Banner3 from '../../assets/banner3.jpeg';
import Banner4 from '../../assets/banner4.jpeg';

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      image: Banner1,
      title: "Build Your Dream PC",
      description: "Custom computers built for gaming, creativity, and productivity",
    },
    {
      image: Banner2,
      title: "Ultimate Gaming Experience",
      description: "High-performance components for the serious gamer",
    },
    {
      image: Banner3,
      title: "Professional Workstations",
      description: "Powerful systems for content creation and professional work",
    },
    {
      image: Banner4,
      title: "Cutting-Edge Technology",
      description: "Stay ahead with the latest innovations in PC hardware",
    },
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section with Banner Carousel */}
        <section className={styles.hero}>
          <div className={styles.bannerContainer}>
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`${styles.bannerSlide} ${
                  index === currentBanner ? styles.active : ''
                }`}
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className={styles.bannerOverlay}></div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button className={`${styles.navArrow} ${styles.leftArrow}`} onClick={prevBanner}>
              &#8249;
            </button>
            <button className={`${styles.navArrow} ${styles.rightArrow}`} onClick={nextBanner}>
              &#8250;
            </button>

            {/* Banner Indicators */}
            <div className={styles.bannerIndicators}>
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentBanner ? styles.active : ''
                  }`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>

          {/* Banner Text Component (separate, bottom of banner) */}
          <div className={styles.bannerText}>
            <h1>{banners[currentBanner].title}</h1>
            <p>{banners[currentBanner].description}</p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton}>Start Building</button>
              <button className={styles.secondaryButton}>Explore Pre-builts</button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className={styles.featured}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Gaming Laptops</h3>
              <p>Powerful laptops for gaming on the go</p>
              <button>Shop Now</button>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Graphics Cards</h3>
              <p>Latest GPUs for ultimate performance</p>
              <button>Shop Now</button>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Gaming Peripherals</h3>
              <p>Keyboards, mice, and headsets</p>
              <button>Shop Now</button>
            </div>
          </div>
        </section>

        {/* PC Builder CTA */}
        <section className={styles.builderCta}>
          <div className={styles.builderContent}>
            <h2>AI-Powered PC Builder</h2>
            <p>Our intelligent system will help you build the perfect PC based on your budget and needs</p>
            <ul>
              <li>Budget-based recommendations</li>
              <li>Compatibility checking</li>
              <li>Performance optimization</li>
            </ul>
            <button className={styles.ctaButton}>Try PC Builder AI</button>
          </div>
          <div className={styles.builderVisual}>
            <div className={styles.placeholderBuilder}>
              <span>PC Builder Interface Preview</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;
