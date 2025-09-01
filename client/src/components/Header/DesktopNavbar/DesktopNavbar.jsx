// client/src/components/Header/DesktopNavbar/DesktopNavbar.jsx// client/src/components/Header/DesktopNavbar/DesktopNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./DesktopNavbar.module.css";

const DesktopNavbar = forwardRef (({ isOpen, onClose }, ref ) => {
  const [activeCategory, setActiveCategory] = useState("Desktops");

  const categories = [
    "Gaming Desktops",
    "Workstation Desktops",
    "All-in-One PCs",
    "Mini PCs",
    "Barebones"
  ];

  const seriesItems = [
    "MEG Series",
    "MPG Series",
    "MAG Series",
    "PRO Series",
    "Infinite Series"
  ];

  const exploreItems = [
    "Gaming Center",
    "Mystic Light",
    "MSI Cloud Center",
    "MSI Companion App"
  ];

    const handleNavbarClick = (e) => {
    e.stopPropagation();
  };

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

        {/* Middle submenu */}
        <div className={styles.middleMenu}>
          <h4>SERIES</h4>
          <ul>
            {seriesItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h4>EXPLORE</h4>
          <ul>
            {exploreItems.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Right side promo */}
        <div className={styles.rightPromo}>
          <img
            src="https://storage-asset.msi.com/global/picture/image/feature/desktop/MPG-Trident-AS/MPG-Trident-AS-banner.png"
            alt="Gaming Desktop"
            className={styles.promoImage}
          />
          <h3>Gaming Desktops</h3>
          <p>Ultimate performance for serious gamers</p>
          <button className={styles.ctaButton}>Explore Series</button>
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