// client/src/components/Main/Main.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainSecondContainer from './MainSecondContainer';
import MainThirdContainer from './MainThirdContainer';
import MainFourthContainer from './MainFourthContainer';
import MainFifthContainer from './MainFifthContainer';
import MainSixthContainer from './MainSixthContainer';
import MainSeventhContainer from './MainSeventhContainer';
import styles from './Main.module.css';

import Banner1 from '../../assets/banner1.jpeg';
import Banner2 from '../../assets/banner2.jpeg';
import Banner3 from '../../assets/banner3.jpeg';
import Banner4 from '../../assets/banner4.jpeg';

import { banners as mockBanners } from '../MockData/banners';

const BREAKPOINTS = { mobileMax: 767 };

const trustItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    ),
    title: 'Free Shipping',
    subtitle: 'On orders over ₱2,000',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Secure Payment',
    subtitle: '100% Protected',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: '1-Year Warranty',
    subtitle: 'All products covered',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    title: '24/7 Support',
    subtitle: 'Expert help anytime',
  },
];

const Main = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= BREAKPOINTS.mobileMax);

  const bannerImages = { banner1: Banner1, banner2: Banner2, banner3: Banner3, banner4: Banner4 };

  const banners = mockBanners.map((banner) => ({
    ...banner,
    image: bannerImages[banner.imageKey] || Banner1,
  }));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= BREAKPOINTS.mobileMax);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const activeBanner = banners[currentBanner];

  return (
    <>
      <Header />
      <main className={styles.main}>

        {/* ── Hero Section ── */}
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
              />
            ))}

            {/* Gradient overlay for text legibility */}
            <div className={styles.heroGradient} />

            {/* Hero Content */}
            <div className={styles.heroContent}>
              {activeBanner.eyebrow && (
                <span className={styles.heroBadge}>{activeBanner.eyebrow}</span>
              )}
              <h1 className={styles.heroTitle}>{activeBanner.title}</h1>
              <p className={styles.heroDesc}>{activeBanner.description}</p>
              <div className={styles.heroButtons}>
                <button
                  className={styles.primaryButton}
                  onClick={() => navigate('/pcbuilder')}
                >
                  Start Building
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate('/desktop')}
                >
                  Explore Pre-builts
                </button>
              </div>
            </div>

            {/* Slide counter */}
            <div className={styles.slideCounter}>
              <span className={styles.slideActive}>{String(currentBanner + 1).padStart(2, '0')}</span>
              <span className={styles.slideDivider}>/</span>
              <span>{String(banners.length).padStart(2, '0')}</span>
            </div>

            {/* Nav Arrows */}
            <button className={`${styles.navArrow} ${styles.leftArrow}`} onClick={prevBanner} aria-label="Previous">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className={`${styles.navArrow} ${styles.rightArrow}`} onClick={nextBanner} aria-label="Next">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

            {/* Indicator Dots */}
            <div className={styles.bannerIndicators}>
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentBanner ? styles.active : ''}`}
                  onClick={() => setCurrentBanner(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Bar ── */}
        <section className={styles.trustBar}>
          <div className={styles.trustInner}>
            {trustItems.map((item, i) => (
              <div key={i} className={styles.trustItem}>
                <span className={styles.trustIcon}>{item.icon}</span>
                <div className={styles.trustText}>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
                {i < trustItems.length - 1 && <div className={styles.trustDivider} />}
              </div>
            ))}
          </div>
        </section>

        <MainSecondContainer isMobile={isMobile} />
        <MainThirdContainer isMobile={isMobile} />
        <MainFourthContainer isMobile={isMobile} />
        <MainFifthContainer isMobile={isMobile} />
        <MainSixthContainer />
        <MainSeventhContainer />
      </main>
      <Footer />
    </>
  );
};

export default Main;
