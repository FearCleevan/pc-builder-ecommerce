// client/src/components/Header/LaptopNavbar/LaptopNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./LaptopNavbar.module.css";

const LaptopNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Gaming Laptops");

  const categories = [
    "Gaming Laptops",
    "Content Creation Laptops",
    "Business Laptops",
    "Thin & Light Laptops",
    "2-in-1 Convertibles"
  ];

  // Different content based on selected category
  const getSeriesItems = (category) => {
    switch(category) {
      case "Gaming Laptops":
        return [
          "Titan Series - Ultimate Performance",
          "Raider Series - Premium Gaming",
          "Vector Series - Mainstream Gaming",
          "Stealth Series - Slim Gaming",
          "Katana Series - Value Gaming",
          "Sword Series - Entry Level Gaming",
          "Cyborg Series - Futuristic Design",
          "Pulse Series - Balanced Performance"
        ];
      case "Content Creation Laptops":
        return [
          "Creator Z Series - Professional Content",
          "CreatorPro Series - Workstation Grade",
          "Prestige Series - Creative Professionals",
          "Modern Series - Modern Creators",
          "Summit Series - Executive Creative",
          "Content Master Series - All-in-One Creative"
        ];
      case "Business Laptops":
        return [
          "Modern Business Series",
          "Prestige Business Line",
          "Summit Business Series",
          "Pro Series - Enterprise Grade",
          "TravelMate Series - Mobile Professionals",
          "Executive Series - Premium Business"
        ];
      case "Thin & Light Laptops":
        return [
          "Prestige Slim Series",
          "Modern Thin Series",
          "Summit Ultra Slim",
          "Stealth Thin Series",
          "Zen Series - Ultra Portable",
          "Air Series - Featherlight"
        ];
      case "2-in-1 Convertibles":
        return [
          "Summit E Series - Convertible Elite",
          "Prestige Flip Series",
          "Modern Convertible Series",
          "Creator Flip - Creative Convertible",
          "Business Flip - Professional Convertible",
          "Style Series - Fashion Convertible"
        ];
      default:
        return [];
    }
  };

  const getFeatures = (category) => {
    switch(category) {
      case "Gaming Laptops":
        return [
          "High Refresh Rate Displays",
          "NVIDIA GeForce RTX GPUs",
          "Advanced Cooling Systems",
          "Per Key RGB Keyboard",
          "VR Ready Performance",
          "4K Gaming Capability"
        ];
      case "Content Creation Laptops":
        return [
          "Color-Accurate Displays",
          "NVIDIA Studio Drivers",
          "High-Core Count CPUs",
          "Professional GPU Options",
          "Calibrated Color Accuracy",
          "Creator-Centric Software"
        ];
      case "Business Laptops":
        return [
          "Military Grade Durability",
          "Enhanced Security Features",
          "Long Battery Life",
          "Business-Class Support",
          "VPro Technology",
          "Privacy Protection"
        ];
      case "Thin & Light Laptops":
        return [
          "Ultra-Thin Design",
          "Lightweight Construction",
          "All-Day Battery Life",
          "Fast Charging Technology",
          "Premium Materials",
          "Silent Operation"
        ];
      case "2-in-1 Convertibles":
        return [
          "360° Hinge Design",
          "Touchscreen Display",
          "Active Pen Support",
          "Multiple Usage Modes",
          "Convertible Design",
          "Tablet Mode Capability"
        ];
      default:
        return [];
    }
  };

  const getExploreItems = (category) => {
    switch(category) {
      case "Gaming Laptops":
        return [
          "Gaming Performance Benchmarks",
          "Cooler Boost Technology",
          "MSI Center Gaming Mode",
          "Nahimic Audio Enhancement",
          "Mystic Light RGB Control",
          "Game Optimization Guides"
        ];
      case "Content Creation Laptops":
        return [
          "Color Calibration Tools",
          "Creator Software Bundle",
          "4K Video Editing Support",
          "3D Rendering Performance",
          "Creative Workflow Tips",
          "Professional Certification"
        ];
      case "Business Laptops":
        return [
          "Business Security Solutions",
          "Remote Management Tools",
          "Docking Station Compatibility",
          "Enterprise Software Support",
          "IT Management Features",
          "Warranty & Support Options"
        ];
      case "Thin & Light Laptops":
        return [
          "Portability Features",
          "Battery Life Optimization",
          "Travel Accessories",
          "Wireless Connectivity",
          "Mobile Productivity Tips",
          "Ultrabook Certification"
        ];
      case "2-in-1 Convertibles":
        return [
          "Pen & Touch Features",
          "Tablet Mode Applications",
          "Convertible Usage Tips",
          "Digital Note Taking",
          "Presentation Features",
          "Creative Drawing Tools"
        ];
      default:
        return [];
    }
  };

  const getPromoContent = (category) => {
    switch(category) {
      case "Gaming Laptops":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/GS76/GS76-banner.png",
          title: "Ultimate Gaming Laptops",
          description: "Dominate the competition with high-refresh displays and powerful RTX graphics",
          buttonText: "Explore Gaming Laptops"
        };
      case "Content Creation Laptops":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/creator/creator-pro-banner.jpg",
          title: "Content Creation Power",
          description: "Bring your creative visions to life with color-accurate displays and professional performance",
          buttonText: "View Creator Laptops"
        };
      case "Business Laptops":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/business/modern-business-banner.jpg",
          title: "Business Excellence",
          description: "Professional laptops with enterprise-grade security and reliability for business success",
          buttonText: "See Business Laptops"
        };
      case "Thin & Light Laptops":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/prestige/prestige-slim-banner.jpg",
          title: "Slim & Powerful",
          description: "Ultra-portable laptops that don't compromise on performance or style",
          buttonText: "Discover Thin Laptops"
        };
      case "2-in-1 Convertibles":
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/summit/summit-flip-banner.jpg",
          title: "Versatile Convertibles",
          description: "Transform your workflow with flexible 2-in-1 laptops for work and play",
          buttonText: "Explore Convertibles"
        };
      default:
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/nb/GS76/GS76-banner.png",
          title: "MSI Laptops",
          description: "Discover our complete laptop lineup for every need",
          buttonText: "View All Laptops"
        };
    }
  };

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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Middle - Features */}
        <div className={styles.featuresSection}>
          <h4>KEY FEATURES</h4>
          <ul>
            {getFeatures(activeCategory).map(item => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </div>

        {/* Middle - Explore */}
        <div className={styles.exploreSection}>
          <h4>EXPLORE</h4>
          <ul>
            {getExploreItems(activeCategory).map(item => (
              <li key={item}>{item}</li>
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

LaptopNavbar.displayName = 'LaptopNavbar';

export default LaptopNavbar;