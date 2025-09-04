//client/src/components/Header/ProductNavbar/ProductNavbar.jsx
import React, { useState, useEffect, forwardRef } from "react";
import styles from "./ProductNavbar.module.css";

// Import mock data
import {
  categories,
  getSeriesItems,
  getExploreItems,
  getSubCategories,
  getPromoContent
} from "../../MockData/ProductMockData";

// Custom hook for navigation
const useNavigation = () => {
  const handleNavigation = (path, e, category, series, subcategory) => {
    if (e) e.preventDefault();

    // Build query parameters based on what was clicked
    const searchParams = new URLSearchParams();

    if (category) searchParams.set('category', category);
    if (series) searchParams.set('series', series);
    if (subcategory) searchParams.set('subcategory', subcategory);

    // Navigate to the products page with filters
    window.location.href = `/products?${searchParams.toString()}`;
  };

  return { handleNavigation };
};

const ProductNavbar = forwardRef(({ isOpen, onClose, mobileView, isMobileMenuOpen }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Components");
  const [isDesktop, setIsDesktop] = useState(true);
  const { handleNavigation } = useNavigation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 991);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Don't show this navbar on mobile devices
  if (!isDesktop) {
    return null;
  }

  // Prevent clicks inside the navbar from closing it
  const handleNavbarClick = (e) => {
    e.stopPropagation();
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
                <span
                  className={styles.categoryLink}
                  onClick={(e) => handleNavigation(`/${category}`, e, category, null, null)}
                >
                  {category}
                </span>
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
                  onClick={(e) => handleNavigation(item.path, e, activeCategory, null, item.id)}
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
                    onClick={(e) => handleNavigation(item.path, e, activeCategory, item.id, null)}
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
                    onClick={(e) => handleNavigation(item.path, e, activeCategory, null, null)}
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

ProductNavbar.displayName = 'ProductNavbar';

export default ProductNavbar;