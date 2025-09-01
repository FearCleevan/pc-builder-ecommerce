// client/src/components/Main/Main.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Main.module.css';

const Main = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Build Your Dream PC</h1>
            <p>Custom computers built for gaming, creativity, and productivity</p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton}>Start Building</button>
              <button className={styles.secondaryButton}>Explore Pre-builts</button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.placeholderImage}>
              <span>High-end Gaming PC Image</span>
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