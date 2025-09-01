// client/src/components/Header/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaShoppingCart, FaSearch, FaTruck, FaTimes, FaBars, FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./Header.module.css";
import ProductNavbar from "./ProductNavbar/ProductNavbar";
import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import LaptopNavbar from "./LaptopNavbar/LaptopNavbar";

import Logo from "../../assets/Logo.png";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductNavOpen, setIsProductNavOpen] = useState(false);
  const [isDesktopNavOpen, setIsDesktopNavOpen] = useState(false);
  const [isLaptopNavOpen, setIsLaptopNavOpen] = useState(false);

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

        setIsProductNavOpen(false);
        setIsDesktopNavOpen(false);
        setIsLaptopNavOpen(false);
        setActiveMenu(null);
      }
    };

    const handleScroll = () => {
      if (isProductNavOpen || isDesktopNavOpen || isLaptopNavOpen) {
        setIsProductNavOpen(false);
        setIsDesktopNavOpen(false);
        setIsLaptopNavOpen(false);
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProductNavOpen, isDesktopNavOpen, isLaptopNavOpen]);

  const handleMenuClick = (itemId) => {
    // Close search if open
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }

    // Close all other navbars
    setIsProductNavOpen(false);
    setIsDesktopNavOpen(false);
    setIsLaptopNavOpen(false);

    // Toggle the clicked navbar
    if (itemId === "products") {
      setIsProductNavOpen(!isProductNavOpen);
      setActiveMenu(isProductNavOpen ? null : itemId);
    } else if (itemId === "desktop") {
      setIsDesktopNavOpen(!isDesktopNavOpen);
      setActiveMenu(isDesktopNavOpen ? null : itemId);
    } else if (itemId === "laptop") {
      setIsLaptopNavOpen(!isLaptopNavOpen);
      setActiveMenu(isLaptopNavOpen ? null : itemId);
    } else {
      // For other dropdowns, just toggle their active state
      setActiveMenu(activeMenu === itemId ? null : itemId);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close all navbars when mobile menu is toggled
    setIsProductNavOpen(false);
    setIsDesktopNavOpen(false);
    setIsLaptopNavOpen(false);
    setActiveMenu(null);
  };

  const toggleSearch = () => {
    // Close all navbars when search is toggled
    setIsProductNavOpen(false);
    setIsDesktopNavOpen(false);
    setIsLaptopNavOpen(false);
    setActiveMenu(null);

    setIsSearchOpen(!isSearchOpen);
  };

  const closeProductNavbar = () => {
    setIsProductNavOpen(false);
    setActiveMenu(null);
  };

  const closeDesktopNavbar = () => {
    setIsDesktopNavOpen(false);
    setActiveMenu(null);
  };

  const closeLaptopNavbar = () => {
    setIsLaptopNavOpen(false);
    setActiveMenu(null);
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
              <a className={styles.homeLink} href="/">
                <picture className={styles.logo}>
                  <img
                    src={Logo}
                    alt="MSI Logo"
                    width="300"
                    height="auto"
                  />
                </picture>
              </a>

              <div className={styles.menuActions}>
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className={styles.menuItem}
                  >
                    {item.hasDropdown ? (
                      <button
                        className={`${styles.navButton} ${item.highlight ? styles.highlight : ""
                          } ${activeMenu === item.id ? styles.active : ""}`}
                        onClick={() => handleMenuClick(item.id)}
                        aria-expanded={activeMenu === item.id}
                      >
                        {item.label}
                        {item.hasDropdown && (
                          <span className={styles.dropdownArrow}>
                            {activeMenu === item.id}
                          </span>
                        )}
                      </button>
                    ) : (
                      <a
                        href="#"
                        className={`${styles.navLink} ${item.highlight ? styles.highlight : ""
                          } ${activeMenu === item.id ? styles.active : ""}`}
                      >
                        {item.label}
                      </a>
                    )}

                    {/* Dropdown for other menu items */}
                    {item.hasDropdown && activeMenu === item.id &&
                      item.id !== "products" && item.id !== "desktop" && item.id !== "laptop" && (
                        <div className={styles.dropdown}>
                          <div className={styles.dropdownContent}>
                            <p>{item.label} dropdown content would appear here</p>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side operations */}
            <div className={styles.operations}>
              {/* User */}
              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="User account"
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
        isOpen={isProductNavOpen}
        onClose={closeProductNavbar}
        ref={productNavRef}
      />

      {/* Desktop Navbar */}
      <DesktopNavbar
        isOpen={isDesktopNavOpen}
        onClose={closeDesktopNavbar}
        ref={desktopNavRef}
      />

      {/* Laptop Navbar */}
      <LaptopNavbar
        isOpen={isLaptopNavOpen}
        onClose={closeLaptopNavbar}
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
    </>
  );
};

export default Header;