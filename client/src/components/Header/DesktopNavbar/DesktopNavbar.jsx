// client/src/components/Header/DesktopNavbar/DesktopNavbar.jsx
import React, { useState, forwardRef } from "react";
import styles from "./DesktopNavbar.module.css";

import DesktopImage from "../../../assets/Desktop1.jpg";

const DesktopNavbar = forwardRef(({ isOpen, onClose }, ref) => {
  const [activeCategory, setActiveCategory] = useState("Gaming Desktops");

  const categories = [
    "Gaming Desktops",
    "Workstation Desktops",
    "All-in-One PCs",
    "Mini PCs",
    "Barebones"
  ];

  // Different content based on selected category
  const getSeriesItems = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return [
          "MEG Series - Flagship Performance",
          "MPG Series - Mainstream Gaming",
          "MAG Series - Value Gaming",
          "Infinite Series - Ready-to-Play",
          "Aegis Series - Compact Power",
          "Codex Series - Entry Level Gaming"
        ];
      case "Workstation Desktops":
        return [
          "WT Series - Professional Workstation",
          "Creator Series - Content Creation",
          "Pro Series - Business Solutions",
          "Engineering Series - CAD/Design",
          "Render Station - 3D Rendering",
          "Data Science Series - AI/ML"
        ];
      case "All-in-One PCs":
        return [
          "Modern Series - Sleek Design",
          "Pro Series - Business AIO",
          "Creative Series - Designer Focus",
          "Gaming AIO - All-in-One Gaming",
          "Touch Series - Interactive Display",
          "Space-Saver Series - Compact"
        ];
      case "Mini PCs":
        return [
          "Cubi Series - Ultra Compact",
          "Pro DP Series - Dual Display",
            "Gaming Cube - Mini Gaming",
          "Office Series - Business Mini",
          "Media Center - Home Entertainment",
          "Industrial Series - Rugged Design"
        ];
      case "Barebones":
        return [
          "Gaming Barebone Kits",
          "Workstation Barebone Systems",
          "Mini-ITX Barebones",
          "Custom Watercooling Kits",
          "Server Barebone Solutions",
          "HTPC Barebone Packages"
        ];
      default:
        return [];
    }
  };

  const getExploreItems = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return [
          "Gaming Performance Benchmarks",
          "RGB Lighting Control",
          "Overclocking Guides",
          "Streaming Setup Tips",
          "VR Ready Systems",
          "Custom Cooling Solutions"
        ];
      case "Workstation Desktops":
        return [
          "Professional Certification",
          "Software Compatibility",
          "Multi-GPU Configuration",
          "ECC Memory Support",
          "RAID Storage Options",
          "Remote Management"
        ];
      case "All-in-One PCs":
        return [
          "Space Saving Solutions",
          "Touch Screen Technology",
          "Wireless Connectivity",
          "Built-in Webcam & Mic",
          "Wall Mount Options",
          "Energy Efficiency"
        ];
      case "Mini PCs":
        return [
          "Portable Computing",
          "Multiple Display Support",
          "Low Power Consumption",
          "VESA Mount Compatibility",
          "Silent Operation",
          "Industrial Applications"
        ];
      case "Barebones":
        return [
          "Custom Build Guides",
          "Component Compatibility",
          "Cooling Solutions",
          "Cable Management Tips",
          "BIOS Configuration",
          "Warranty Information"
        ];
      default:
        return [];
    }
  };

  const getFeatures = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return [
          "Latest GPU Technology",
          "High Refresh Rate Ready",
          "Advanced Cooling Systems",
          "RGB Fusion 2.0",
          "VR Ready",
          "4K Gaming Capable"
        ];
      case "Workstation Desktops":
        return [
          "Professional GPUs (NVIDIA RTX)",
          "ECC Memory Support",
          "Multiple CPU Options",
          "Enterprise Storage",
          "ISV Certified",
          "Remote Management"
        ];
      case "All-in-One PCs":
        return [
          "Slim Bezels Design",
          "Touch Screen Options",
          "Built-in Speakers",
          "Wireless Keyboard/Mouse",
          "Webcam & Microphone",
          "Space Saving Design"
        ];
      case "Mini PCs":
        return [
          "Compact Form Factor",
          "Multiple I/O Ports",
          "VESA Mount Compatible",
          "Low Power Consumption",
          "Silent Operation",
          "4K Output Support"
        ];
      case "Barebones":
        return [
          "Customizable Components",
          "Various Form Factors",
          "Cooling Options",
          "Power Supply Options",
          "Expansion Slots",
          "Build Flexibility"
        ];
      default:
        return [];
    }
  };

  const getPromoContent = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return {
          image: DesktopImage,
          title: "Ultimate Gaming Desktops",
          description: "Experience unparalleled gaming performance with cutting-edge technology and stunning RGB lighting",
          buttonText: "View Gaming Desktops"
        };
      case "Workstation Desktops":
        return {
          image: DesktopImage,
          title: "Professional Workstations",
          description: "Power through demanding professional applications with certified hardware and reliable performance",
          buttonText: "Explore Workstations"
        };
      case "All-in-One PCs":
        return {
          image: DesktopImage,
          title: "All-in-One Solutions",
          description: "Sleek, space-saving computers with integrated displays and powerful performance",
          buttonText: "Discover AIO PCs"
        };
      case "Mini PCs":
        return {
          image: DesktopImage,
          title: "Compact Mini PCs",
          description: "Powerful computing in a small form factor perfect for office, home, or industrial use",
          buttonText: "See Mini PCs"
        };
      case "Barebones":
        return {
          image: DesktopImage,
          title: "Barebone Systems",
          description: "Build your dream system with our customizable barebone kits and components",
          buttonText: "Start Building"
        };
      default:
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/desktop/MPG-Trident-AS/MPG-Trident-AS-banner.png",
          title: "MSI Desktops",
          description: "Discover our complete desktop lineup",
          buttonText: "Explore All"
        };
    }
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

DesktopNavbar.displayName = 'DesktopNavbar';

export default DesktopNavbar;