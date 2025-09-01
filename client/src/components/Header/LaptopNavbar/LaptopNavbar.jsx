// client/src/components/Header/LaptopNavbar/LaptopNavbar.jsx// client/src/components/Header/LaptopNavbar/LaptopNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./LaptopNavbar.module.css";

const LaptopNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Laptops");

  const categories = [
    "Gaming Laptops",
    "Content Creation Laptops",
    "Business Laptops",
    "Thin & Light Laptops",
    "2-in-1 Convertibles"
  ];

  const seriesItems = [
    "Titan Series",
    "Raider Series",
    "Stealth Series",
    "Vector Series",
    "Pulse Series",
    "Sword Series",
    "Katana Series",
    "Cyborg Series"
  ];

  const exploreItems = [
    "MSI True Color",
    "MSI App Player",
    "MSI Battery Calibration",
    "MSI Center"
  ];

    // Prevent clicks inside the navbar from closing it
  const handleNavbarClick = (e) => {
    e.stopPropagation();
  };


  return (
    <div 
      className={`${styles.laptopNavbar} ${isOpen ? styles.open : ""}`}
      onClick={handleNavbarClick}
      ref={ref}  // ref is passed directly here
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
            src="https://storage-asset.msi.com/global/picture/image/feature/nb/GS76/GS76-banner.png"
            alt="Gaming Laptop"
            className={styles.promoImage}
          />
          <h3>Gaming Laptops</h3>
          <p>Powerful performance for gaming on the go</p>
          <button className={styles.ctaButton}>Discover Series</button>
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