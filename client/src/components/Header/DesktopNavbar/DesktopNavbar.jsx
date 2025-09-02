// client/src/components/Header/DesktopNavbar/DesktopNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./DesktopNavbar.module.css";

import {
  categories,
  getSeriesItems,
  getExploreItems,
  getFeatures,
  getPromoContent
} from "../../MockData/DesktopMockData";

const DesktopNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Gaming Desktops");

  // Handle navigation (placeholder for now)
  const handleNavigation = (path, e) => {
    e.preventDefault();
    console.log("Would navigate to:", path);
    // In a real implementation, you would use:
    // navigate(path); // from react-router-dom
    // or
    // window.location.href = path;
  };

  const handleNavbarClick = (e) => {
    e.stopPropagation();
  };

  const promoContent = getPromoContent(activeCategory);

  return (
    <div 
      className={`${styles.desktopNavbar} ${isOpen ? styles.open : ""}`}
      onClick={handleNavbarClick}
      ref={ref}
    >
      <div className={styles.container}>
        {/* Left side menu */}
        <div className={styles.leftMenu}>
          <h3>DESKTOP CATEGORIES</h3>
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

DesktopNavbar.displayName = 'DesktopNavbar';

export default DesktopNavbar;