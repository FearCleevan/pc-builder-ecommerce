// client/src/components/Header/LaptopNavbar/LaptopNavbar.jsx
import React, { useState, useEffect, forwardRef } from "react";
import styles from "./LaptopNavbar.module.css";

// Import mock data
import {
  categories,
  getSeriesItems,
  getFeatures,
  getExploreItems,
  getPromoContent
} from "../../MockData/LaptopMockData";

// Custom hook for navigation
const useNavigation = () => {
  const handleNavigation = (path, e) => {
    if (e) e.preventDefault();
    console.log("Would navigate to:", path);
    // In a real implementation, you would use:
    // navigate(path); // from react-router-dom
    // or
    // window.location.href = path;
  };

  return { handleNavigation };
};

const LaptopNavbar = forwardRef(({ isOpen, onClose, mobileView, isMobileMenuOpen }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Gaming Laptops");
  const [isLaptop, setIsLaptop] = useState(true);
  const { handleNavigation } = useNavigation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLaptop(window.innerWidth > 991);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Don't show this navbar on mobile devices
  if (!isLaptop) {
    return null;
  }

  // Prevent clicks inside the navbar from closing it
  const handleNavbarClick = (e) => {
    e.stopPropagation();
  };

  const promoContent = getPromoContent(activeCategory);

  return (
    <div
      className={`${styles.laptopNavbar} ${isOpen ? styles.open : ""}`}
      onClick={handleNavbarClick}
      ref={ref}
    >
      <div className={styles.container}>
        {/* Left side menu */}
        <div className={styles.leftMenu}>
          <h3>LAPTOP CATEGORIES</h3>
          <ul>
            {categories.map(category => (
              <li
                key={category}
                className={activeCategory === category ? styles.active : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
                {activeCategory === category && <span className={styles.arrow}>▶</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle - Series */}
        <div className={styles.seriesSection}>
          <h4>POPULAR SERIES</h4>
          <ul>
            {getSeriesItems(activeCategory).map(item => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={styles.seriesLink}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle - Features */}
        <div className={styles.featuresSection}>
          <h4>KEY FEATURES</h4>
          <ul>
            {getFeatures(activeCategory).map(item => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={styles.featureLink}
                >
                  ✓ {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle - Explore */}
        <div className={styles.exploreSection}>
          <h4>EXPLORE</h4>
          <ul>
            {getExploreItems(activeCategory).map(item => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={styles.exploreLink}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side promo */}
        <div className={styles.rightPromo}>
          <img
            src={promoContent.image}
            alt={promoContent.title}
            className={styles.promoImage}
          />
          <h3>{promoContent.title}</h3>
          <p>{promoContent.description}</p>
          <a
            href={promoContent.buttonPath}
            onClick={(e) => handleNavigation(promoContent.buttonPath, e)}
            className={styles.ctaButton}
          >
            {promoContent.buttonText}
          </a>
        </div>
      </div>

      {/* Close button */}
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
        ✖
      </button>
    </div>
  );
});

LaptopNavbar.displayName = 'LaptopNavbar';

export default LaptopNavbar;