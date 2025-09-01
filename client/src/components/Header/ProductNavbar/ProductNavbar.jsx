// client/src/components/Header/ProductNavbar/ProductNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./ProductNavbar.module.css";

const ProductNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Components");

  const categories = [
    "Components",
    "Peripherals",
    "Accessories",
    "OS & Softwares"
  ];

  // Different series and explore items for each category
  const getSeriesItems = (category) => {
    switch(category) {
      case "Components":
        return [
          "Gaming Series",
          "Performance Series",
          "Budget Series",
          "RGB Series",
          "Silent Series",
          "Overclocking Series"
        ];
      case "Peripherals":
        return [
          "Gaming Series",
          "Professional Series",
          "Wireless Series",
          "Ergonomic Series",
          "RGB Lighting Series",
          "Ultra-Thin Series"
        ];
      case "Accessories":
        return [
          "Premium Series",
          "Essential Series",
          "Travel Series",
          "Gaming Series",
          "Office Series",
          "Protection Series"
        ];
      case "OS & Softwares":
        return [
          "Security Suite",
          "Productivity Bundle",
          "Gaming Optimization",
          "Creative Suite",
          "Business Solutions",
          "Education Package"
        ];
      default:
        return [];
    }
  };

  const getExploreItems = (category) => {
    switch(category) {
      case "Components":
        return [
          "Build Guides",
          "Compatibility Checker",
          "Performance Benchmarks",
          "Cooling Solutions",
          "RGB Sync Technology"
        ];
      case "Peripherals":
        return [
          "Customization Hub",
          "Driver & Software",
          "Gaming Profiles",
          "Wireless Connectivity",
          "Ergonomic Design"
        ];
      case "Accessories":
        return [
          "Setup Inspiration",
          "Cable Management",
          "Travel Solutions",
          "Device Protection",
          "Organization Tips"
        ];
      case "OS & Softwares":
        return [
          "Free Trials",
          "System Requirements",
          "License Options",
          "Update Center",
          "Support Resources"
        ];
      default:
        return [];
    }
  };

  const getSubCategories = (category) => {
    switch(category) {
      case "Components":
        return [
          "Chassis Fan",
          "CPU Cooling",
          "Graphics Card",
          "Hard Disk Drive",
          "Solid State Drive",
          "RAM",
          "Motherboard",
          "PC Case",
          "Power Supply",
          "Processor AMD",
          "Processor Intel"
        ];
      case "Peripherals":
        return [
          "Headset",
          "Keyboard",
          "Mouse",
          "Monitor",
          "UPS & AVR",
          "Mouse Pad",
          "Web & Digital Camera",
          "Printer & Scanner",
          "Speaker"
        ];
      case "Accessories":
        return [
          "Cables",
          "Earphones",
          "Power Bank",
          "Adapters",
          "Mounts & Stands",
          "Cleaning Kits",
          "Tool Kits",
          "Cable Organizers"
        ];
      case "OS & Softwares":
        return [
          "Antivirus",
          "Office Applications",
          "Operating System",
          "Creative Software",
          "Utility Tools",
          "Driver Packages",
          "Backup Solutions"
        ];
      default:
        return [];
    }
  };

  const getPromoContent = (category) => {
    switch(category) {
      case "Components":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/components/2023-gaming-components-banner.jpg",
          title: "High-Performance Components",
          description: "Build the ultimate gaming rig with our premium components",
          buttonText: "View Components"
        };
      case "Peripherals":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/peripherals/gaming-peripherals-banner.jpg",
          title: "Gaming Peripherals",
          description: "Enhance your gaming experience with precision equipment",
          buttonText: "Explore Peripherals"
        };
      case "Accessories":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/accessories/pc-accessories-banner.jpg",
          title: "Essential Accessories",
          description: "Complete your setup with must-have accessories",
          buttonText: "Shop Accessories"
        };
      case "OS & Softwares":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/software/digital-software-banner.jpg",
          title: "Software Solutions",
          description: "Optimize your system with professional software",
          buttonText: "Discover Software"
        };
      default:
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/GS76/GS76-banner.png",
          title: "Gaming Products",
          description: "Discover our complete product lineup",
          buttonText: "Explore All"
        };
    }
  };

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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Middle right - Series & Explore */}
        <div className={styles.middleRight}>
          <div className={styles.seriesSection}>
            <h4>SERIES</h4>
            <ul>
              {getSeriesItems(activeCategory).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.exploreSection}>
            <h4>EXPLORE</h4>
            <ul>
              {getExploreItems(activeCategory).map(item => (
                <li key={item}>{item}</li>
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
          <button className={styles.ctaButton}>{promoContent.buttonText}</button>
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