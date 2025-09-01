// client/src/components/Header/ProductNavbar/ProductNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./ProductNavbar.module.css";

const ProductNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Laptops");

  const categories = [
    "Laptops",
    "Handhelds",
    "Monitors / Desktops",
    "Graphics Cards",
    "Motherboards / Components",
    "Peripherals",
    "Networking",
    "Servers",
    "Automotive / AMR",
    "Industrial PC / Tablet"
  ];

  const seriesItems = [
    "Titan Series",
    "Raider / Vector Series",
    "Stealth Series",
    "Crosshair / Pulse Series",
    "Sword / Katana Series",
    "Cyborg / Thin Series"
  ];

  const exploreItems = [
    "Copilot+ PC",
    "About Gaming Series",
    "Windows 11",
    "MSI App Player",
    "Nahimic"
  ];

  // Prevent clicks inside the navbar from closing it
  const handleNavbarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`${styles.productNavbar} ${isOpen ? styles.open : ""}`}
      onClick={handleNavbarClick}
      ref={ref}  // ref is passed directly here
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
          <p>For the gamer in all of us</p>
          <button className={styles.ctaButton}>Exclusive Features</button>
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