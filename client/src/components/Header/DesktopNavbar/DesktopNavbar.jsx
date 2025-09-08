// client/src/components/Header/DesktopNavbar/DesktopNavbar.jsx
import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DesktopNavbar.module.css";

// Import mock data
import {
  categories,
  getSeriesItems,
  getExploreItems,
  getFeatures,
  getPromoContent
} from "../../MockData/DesktopMockData";

const DesktopNavbar = forwardRef(({ isOpen, onClose, mobileView, isMobileMenuOpen }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Gaming Desktops");
  const [isLaptop, setIsLaptop] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLaptop(window.innerWidth > 991);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle navigation to desktops page
  const handleNavigation = (path, e, category, series, feature) => {
    if (e) e.preventDefault();

    const searchParams = new URLSearchParams();

    if (category) searchParams.set('category', category);
    if (series) searchParams.set('series', series);
    if (feature) searchParams.set('subcategory', feature);

    navigate(`/desktops?${searchParams.toString()}`);
    onClose();
  };

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
              <li key={item.id}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e, activeCategory, item.id, null)}
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
              <li key={item.id}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e, activeCategory, null, item.id)}
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
              <li key={item.id}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e, activeCategory, null, null)}
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
            onClick={(e) => handleNavigation(promoContent.buttonPath, e, activeCategory, null, null)}
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