// client/src/components/Main/Main.jsx
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainSecondContainer from './MainSecondContainer';
import MainThirdContainer from './MainThirdContainer';
import MainFourthContainer from './MainFourthContainer';
import MainFifthContainer from './MainFifthContainer';
import MainSixthContainer from './MainSixthContainer';
import MainSeventhContainer from './MainSeventhContainer';
import styles from './Main.module.css';

// Import your banner images
import Banner1 from '../../assets/banner1.jpeg';
import Banner2 from '../../assets/banner2.jpeg';
import Banner3 from '../../assets/banner3.jpeg';
import Banner4 from '../../assets/banner4.jpeg';

// Import mock data
import { banners as mockBanners } from '../MockData/banners';

const BREAKPOINTS = {
  mobileMax: 767,
};

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.mobileMax);

  const bannerImages = {
    banner1: Banner1,
    banner2: Banner2,
    banner3: Banner3,
    banner4: Banner4,
  };

  // Add image URLs to banner data by imageKey
  const banners = mockBanners.map((banner) => ({
    ...banner,
    image: bannerImages[banner.imageKey] || Banner1,
  }));

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= BREAKPOINTS.mobileMax);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section with Banner Carousel */}
        <section className={styles.hero}>
          <div className={styles.bannerContainer}>
            {banners.map((banner, index) => (
              <div
                key={banner.id || index}
                className={`${styles.bannerSlide} ${index === currentBanner ? styles.active : ''}`}
                style={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundPosition: banner.backgroundPosition || 'center',
                }}
              >
                <div
                  className={styles.bannerOverlay}
                  style={{ background: `rgba(0, 0, 0, ${banner.overlayOpacity ?? 0.45})` }}
                />
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
                  className={`${styles.indicator} ${index === currentBanner ? styles.active : ''}`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>

        </section>

        <section className={styles.bannerInfoSection}>
          <div className={styles.bannerInfoCard}>
            {banners[currentBanner].eyebrow && (
              <span className={styles.bannerEyebrow}>{banners[currentBanner].eyebrow}</span>
            )}
            <h1>{banners[currentBanner].title}</h1>
            <p>{banners[currentBanner].description}</p>
          </div>
        </section>

        <section className={styles.heroCtaSection}>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Start Building</button>
            <button className={styles.secondaryButton}>Explore Pre-builts</button>
          </div>
        </section>

        {/* Import all other sections as separate components */}
        <MainSecondContainer isMobile={isMobile} />
        <MainThirdContainer isMobile={isMobile} />
        <MainFourthContainer isMobile={isMobile} />
        <MainFifthContainer isMobile={isMobile} />
        <MainSixthContainer isMobile={isMobile} />
        <MainSeventhContainer />
      </main>
      <Footer />
    </>
  );
};

export default Main;
