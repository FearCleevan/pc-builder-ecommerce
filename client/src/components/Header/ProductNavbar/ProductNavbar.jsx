// client/src/components/Header/ProductNavbar/ProductNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./ProductNavbar.module.css";

// Import mock data
import {
  categories,
  getSeriesItems,
  getExploreItems,
  getSubCategories,
  getPromoContent
} from "../../MockData/ProductMockData";

const ProductNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Components");

  // Prevent clicks inside the navbar from closing it
  const handleNavbarClick = (e) => {
    e.stopPropagation();
  };

  // Handle navigation (placeholder for now)
  const handleNavigation = (path, e) => {
    e.preventDefault();
    console.log("Would navigate to:", path);
    // In a real implementation, you would use:
    // navigate(path); // from react-router-dom
    // or
    // window.location.href = path;
  };

  const promoContent = getPromoContent(activeCategory);

  return (
    <div
      className={`${styles.productNavbar} ${isOpen ? styles.open : ""}`}
      onClick={handleNavbarClick}
      ref={ref}
    >
      <div className={styles.container}>
        {/* Left side menu */}
        <div className={styles.leftMenu}>
          <h3>PRODUCT CATEGORIES</h3>
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

        {/* Middle submenu - Subcategories */}
        <div className={styles.middleMenu}>
          <h4>{activeCategory.toUpperCase()}</h4>
          <ul className={styles.subCategories}>
            {getSubCategories(activeCategory).map(item => (
              <li key={item.name}>
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(item.path, e)}
                  className={styles.subCategoryLink}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle right - Series & Explore */}
        <div className={styles.middleRight}>
          <div className={styles.seriesSection}>
            <h4>SERIES</h4>
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

ProductNavbar.displayName = 'ProductNavbar';

export default ProductNavbar;