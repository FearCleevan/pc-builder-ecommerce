import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaTruck, FaTimes, FaBars, FaChevronDown, FaChevronUp, FaArrowLeft } from "react-icons/fa";
import styles from "./Header.module.css";
import ProductNavbar from "./ProductNavbar/ProductNavbar";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import LaptopNavbar from "./LaptopNavbar/LaptopNavbar";

import Logo from "../../assets/Logo.png";

// Import mock data directly for mobile view
import {
  categories,
  getSeriesItems,
  getExploreItems,
  getSubCategories,
} from "../MockData/ProductMockData";

const Header = () => {
  const [activeNav, setActiveNav] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main"); // 'main', 'products'
  const [activeCategory, setActiveCategory] = useState("Components");

  const menuRef = useRef(null);
  const productNavRef = useRef(null);
  const desktopNavRef = useRef(null);
  const laptopNavRef = useRef(null);

  const navItems = [
    { id: "products", label: "PRODUCTS", hasDropdown: true },
    { id: "desktop", label: "DESKTOP", hasDropdown: true },
    { id: "laptop", label: "LAPTOP", hasDropdown: true },
    { id: "build-pc", label: "BUILD A PC", hasDropdown: false, highlight: true },
    { id: "whats-new", label: "WHAT'S NEW", hasDropdown: true },
  ];

  // Check screen size and adjust behavior
  const checkScreenSize = useCallback(() => {
    if (window.innerWidth <= 991) {
      // Mobile/tablet behavior
      if (activeNav === "products") {
        setMobileView("products");
      }
    } else {
      // Desktop behavior
      setMobileView("main");
    }
  }, [activeNav]);

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Don't close if clicking inside any of the navbars
        if (
          (productNavRef.current && productNavRef.current.contains(event.target)) ||
          (desktopNavRef.current && desktopNavRef.current.contains(event.target)) ||
          (laptopNavRef.current && laptopNavRef.current.contains(event.target))
        ) {
          return;
        }

        setActiveNav(null);
        setIsMobileMenuOpen(false);
        setMobileView("main");
      }
    };

    const handleScroll = () => {
      if (activeNav) {
        setActiveNav(null);
        setIsMobileMenuOpen(false);
        setMobileView("main");
      }
    };

    // Initial screen size check
    checkScreenSize();
    
    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScreenSize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [activeNav, checkScreenSize]);

  const handleMenuClick = (itemId) => {
    // Close search if open
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }

    // For mobile, handle products menu differently
    if (window.innerWidth <= 991 && itemId === "products") {
      setMobileView("products");
      setActiveNav("products");
      return;
    }

    // Toggle the clicked navbar
    if (activeNav === itemId) {
      setActiveNav(null);
      setMobileView("main");
    } else {
      setActiveNav(itemId);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Reset to main view when toggling mobile menu
    setMobileView("main");
    // Close all navbars when mobile menu is toggled
    setActiveNav(null);
  };

  const toggleSearch = () => {
    // Close all navbars when search is toggled
    setActiveNav(null);
    setMobileView("main");
    setIsMobileMenuOpen(false);

    setIsSearchOpen(!isSearchOpen);
  };

  const closeAllMenus = () => {
    setActiveNav(null);
    setIsMobileMenuOpen(false);
    setMobileView("main");
  };

  const handleBackToMainMenu = () => {
    setMobileView("main");
  };

  // Handle navigation (placeholder for now)
  const handleNavigation = (path, e) => {
    e.preventDefault();
    console.log("Would navigate to:", path);
    closeAllMenus();
  };

  return (
    <>
      <nav className={styles.nav} ref={menuRef}>
        <div className={styles.container}>
          <div className={styles.mainArea}>
            {/* Mobile hamburger button */}
            <button
              className={styles.hamburger}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Logo and navigation menu */}
            <div
              className={`${styles.menu} ${isMobileMenuOpen ? styles.menuOpen : ""
                }`}
            >
              <a className={styles.homeLink} href="/" onClick={closeAllMenus}>
                <picture className={styles.logo}>
                  <img
                    src={Logo}
                    alt="MSI Logo"
                    width="300"
                    height="auto"
                  />
                </picture>
              </a>

              {/* Mobile breadcrumb for products */}
              {isMobileMenuOpen && mobileView === "products" && (
                <div className={styles.mobileBreadcrumb}>
                  <button 
                    className={styles.backButton}
                    onClick={handleBackToMainMenu}
                  >
                    <FaArrowLeft size={16} />
                    <span>Menu</span>
                  </button>
                  <h3>PRODUCTS</h3>
                  <button 
                    className={styles.closeButton}
                    onClick={closeAllMenus}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              )}

              <div className={styles.menuActions}>
                {/* Main menu items - hidden on mobile when in products view */}
                {(mobileView === "main" || window.innerWidth > 991) && navItems.map((item) => (
                  <div
                    key={item.id}
                    className={styles.menuItem}
                  >
                    {item.hasDropdown ? (
                      <button
                        className={`${styles.navButton} ${item.highlight ? styles.highlight : ""
                          } ${activeNav === item.id ? styles.active : ""}`}
                        onClick={() => handleMenuClick(item.id)}
                        aria-expanded={activeNav === item.id}
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <span className={styles.dropdownArrow}>
                            {activeNav === item.id}
                          </span>
                        )}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className={`${styles.navLink} ${item.highlight ? styles.highlight : ""
                          } ${activeNav === item.id ? styles.active : ""}`}
                        onClick={() => handleMenuClick(item.id)}
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Dropdown for other menu items */}
                    {item.hasDropdown && activeNav === item.id &&
                      item.id !== "products" && item.id !== "desktop" && item.id !== "laptop" && (
                        <div className={styles.dropdown}>
                          <div className={styles.dropdownContent}>
                            <p>{item.label} dropdown content would appear here</p>
                          </div>
                        </div>
                      )}
                  </div>
                ))}

                {/* Mobile Products Menu Content */}
                {isMobileMenuOpen && mobileView === "products" && (
                  <div className={styles.mobileProductsMenu}>
                    {/* Categories */}
                    <div className={styles.mobileCategorySection}>
                      <h4>CATEGORIES</h4>
                      <ul>
                        {categories.map(category => (
                          <li
                            key={category}
                            className={activeCategory === category ? styles.active : ""}
                            onClick={() => setActiveCategory(category)}
                          >
                            {category}
                            {activeCategory === category && <span className={styles.arrow}>▼</span>}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Subcategories */}
                    {activeCategory && (
                      <div className={styles.mobileSubcategorySection}>
                        <h4>{activeCategory.toUpperCase()}</h4>
                        <ul>
                          {getSubCategories(activeCategory).map(item => (
                            <li key={item.name}>
                              <a
                                href={item.path}
                                onClick={(e) => handleNavigation(item.path, e)}
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Series */}
                    <div className={styles.mobileSeriesSection}>
                      <h4>SERIES</h4>
                      <ul>
                        {getSeriesItems(activeCategory).map(item => (
                          <li key={item.name}>
                            <a
                              href={item.path}
                              onClick={(e) => handleNavigation(item.path, e)}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Explore */}
                    <div className={styles.mobileExploreSection}>
                      <h4>EXPLORE</h4>
                      <ul>
                        {getExploreItems(activeCategory).map(item => (
                          <li key={item.name}>
                            <a
                              href={item.path}
                              onClick={(e) => handleNavigation(item.path, e)}
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side operations */}
            <div className={styles.operations}>
              {/* User */}
              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="User account"
                  onClick={closeAllMenus}
                >
                  <FaUser size={20} />
                </button>
              </div>

              {/* Cart */}
              <div className={styles.operationItem}>
                <a
                  href="https://ph.msi.com/service/wheretobuy#46,3"
                  className={styles.operationLink}
                  aria-label="Where to buy"
                  onClick={closeAllMenus}
                >
                  <FaShoppingCart size={20} />
                  <span className={styles.notificationBadge}>3</span>
                </a>
              </div>

              {/* Search */}
              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="Search"
                  onClick={toggleSearch}
                >
                  <FaSearch size={20} />
                </button>
              </div>

              {/* Track Order */}
              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="Track your order"
                  onClick={closeAllMenus}
                >
                  <FaTruck size={20} />
                  <span className={styles.notificationBadge}>1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Navbar */}
      <ProductNavbar
        isOpen={activeNav === "products" && window.innerWidth > 991}
        onClose={closeAllMenus}
        ref={productNavRef}
        mobileView={mobileView}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Desktop Navbar */}
      <DesktopNavbar
        isOpen={activeNav === "desktop"}
        onClose={closeAllMenus}
        ref={desktopNavRef}
      />

      {/* Laptop Navbar */}
      <LaptopNavbar
        isOpen={activeNav === "laptop"}
        onClose={closeAllMenus}
        ref={laptopNavRef}
      />

      {/* Search Popup */}
      <div
        className={`${styles.searchPopup} ${isSearchOpen ? styles.open : ""}`}
      >
        <div className={styles.searchBox}>
          <div className={styles.searchInputContainer}>
            <FaSearch className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search products, categories..."
              className={styles.searchInput}
            />
          </div>
          <button className={styles.closeBtn} onClick={toggleSearch}>
            ✖
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeAllMenus}></div>
      )}
    </>
  );
};

export default Header;