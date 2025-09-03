// client/src/components/Header/Header.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaTruck,
  FaTimes,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
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

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// Navigation hook
const useNavigation = () => {
  const handleNavigation = useCallback((path, e) => {
    if (e) e.preventDefault();
    console.log("Would navigate to:", path);
  }, []);
  return { handleNavigation };
};

const Header = () => {
  const [activeNav, setActiveNav] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [activeCategory, setActiveCategory] = useState("Components", "Gaming Desktops", "Gaming Laptops");
  const [isProduct, serIsProduct] = useState("Components");
  const [isDesktop, setIsDesktop] = useState("Laptops");
  const [isLaptop, setIsLaptop] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const menuRef = useRef(null);
  const productNavRef = useRef(null);
  const desktopNavRef = useRef(null);
  const laptopNavRef = useRef(null);

  const navItems = [
    { id: "products", label: "PRODUCTS", hasDropdown: true },
    { id: "desktop", label: "DESKTOP", hasDropdown: true },
    { id: "laptop", label: "LAPTOP", hasDropdown: true },
    {
      id: "build-pc",
      label: "BUILD A PC",
      hasDropdown: false,
      highlight: true,
    },
    { id: "whats-new", label: "WHAT'S NEW", hasDropdown: true },
  ];

  const debouncedWindowSize = useDebounce(windowSize, 250);
  const { handleNavigation } = useNavigation();

  // ✅ Fixed screen size check
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;

    const isProductView = width >= 900;
    const isDesktopView = width >= 900;
    const isLaptopView = width >= 900;

    serIsProduct(isProductView);
    setIsDesktop(isDesktopView);
    setIsLaptop(isLaptopView);

    if (!isProductView & !isDesktopView && !isLaptopView) {
      // Mobile/tablet behavior
      if (["products", "laptop", "desktop"].includes(activeNav)) {
        setMobileView(activeNav);
      }
    } else {
      // Desktop/laptop behavior
      setMobileView("main");
    }
  }, [activeNav]);

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (
          (productNavRef.current &&
            productNavRef.current.contains(event.target)) ||
          (desktopNavRef.current &&
            desktopNavRef.current.contains(event.target)) ||
          (laptopNavRef.current &&
            laptopNavRef.current.contains(event.target))
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

    checkScreenSize();
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkScreenSize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [activeNav, checkScreenSize]);

  // Handle resize with debounce
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    checkScreenSize();
  }, [debouncedWindowSize, checkScreenSize]);

  const handleMenuClick = (itemId) => {
    if (isSearchOpen) setIsSearchOpen(false);

    if (!isProduct && itemId === "products") {
      setMobileView("products");
      setActiveNav("products");
      return;
    }

    if (!isDesktop && itemId === "desktop") {
      setMobileView("desktop ");
      setActiveNav("desktop");
      return;
    }

    if (!isLaptop && itemId === "laptop") {
      setMobileView("laptop");
      setActiveNav("laptop");
      return;
    }

    if (activeNav === itemId) {
      setActiveNav(null);
      setMobileView("main");
    } else {
      setActiveNav(itemId);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobileView("main");
    setActiveNav(null);
  };

  const toggleSearch = () => {
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

  const handleBackToMainMenu = () => setMobileView("main");

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

            {/* Logo & nav menu */}
            <div
              className={`${styles.menu} ${isMobileMenuOpen ? styles.menuOpen : ""
                }`}
            >
              <a className={styles.homeLink} href="/" onClick={closeAllMenus}>
                <picture className={styles.logo}>
                  <img src={Logo} alt="MSI Logo" width="300" height="auto" />
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

              {isMobileMenuOpen && mobileView === "desktop" && (
                <div className={styles.mobileBreadcrumb}>
                  <button
                    className={styles.backButton}
                    onClick={handleBackToMainMenu}
                  >
                    <FaArrowLeft size={16} />
                    <span>Menu</span>
                  </button>
                  <h3>DESKTOP</h3>
                  <button
                    className={styles.closeButton}
                    onClick={closeAllMenus}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              )}

              {isMobileMenuOpen && mobileView === "laptop" && (
                <div className={styles.mobileBreadcrumb}>
                  <button
                    className={styles.backButton}
                    onClick={handleBackToMainMenu}
                  >
                    <FaArrowLeft size={16} />
                    <span>Menu</span>
                  </button>
                  <h3>LAPTOP</h3>
                  <button
                    className={styles.closeButton}
                    onClick={closeAllMenus}
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              )}

              <div className={styles.menuActions}>
                {/* ✅ Fixed condition */}
                {(mobileView === "main" || isProduct || isDesktop || isLaptop) &&
                  navItems.map((item) => (
                    <div key={item.id} className={styles.menuItem}>
                      {item.hasDropdown ? (
                        <button
                          className={`${styles.navButton} ${item.highlight ? styles.highlight : ""
                            } ${activeNav === item.id ? styles.active : ""}`}
                          onClick={() => handleMenuClick(item.id)}
                          aria-expanded={activeNav === item.id}
                        >
                          {item.label}
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

                      {/* Dropdown */}
                      {item.hasDropdown &&
                        activeNav === item.id &&
                        !["products", "desktop", "laptop"].includes(item.id) && (
                          <div className={styles.dropdown}>
                            <div className={styles.dropdownContent}>
                              <p>{item.label} dropdown content here</p>
                            </div>
                          </div>
                        )}
                    </div>
                  ))}

                {/* Mobile Products Menu Content */}
                {isMobileMenuOpen && (
                  <>
                    {/* Products */}
                    {mobileView === "products" && (
                      <div
                        className={`${styles.mobileProductsMenu} ${mobileView === "products" ? styles.slideIn : styles.slideOut
                          }`}
                      >
                        {/* Categories */}
                        <div className={styles.mobileCategorySection}>
                          <h4>CATEGORIES</h4>
                          <ul>
                            {categories.map((category) => (
                              <li
                                key={category}
                                className={
                                  activeCategory === category ? styles.active : ""
                                }
                                onClick={() => setActiveCategory(category)}
                              >
                                {category}
                                {activeCategory === category && (
                                  <span className={styles.arrow}>▼</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Subcategories */}
                        {activeCategory && (
                          <div className={styles.mobileSubcategorySection}>
                            <h4>{activeCategory.toUpperCase()}</h4>
                            <ul>
                              {getSubCategories(activeCategory).map((item) => (
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
                            {getSeriesItems(activeCategory).map((item) => (
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
                            {getExploreItems(activeCategory).map((item) => (
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

                    {/* Laptop */}
                    {mobileView === "laptop" && (
                      <div
                        className={`${styles.mobileLaptopMenu} ${mobileView === "laptop" ? styles.slideIn : styles.slideOut
                          }`}
                      >
                        {/* Categories */}
                        <div className={styles.mobileCategorySection}>
                          <h4>CATEGORIES</h4>
                          <ul>
                            {categories.map((category) => (
                              <li
                                key={category}
                                className={
                                  activeCategory === category ? styles.active : ""
                                }
                                onClick={() => setActiveCategory(category)}
                              >
                                {category}
                                {activeCategory === category && (
                                  <span className={styles.arrow}>▼</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Subcategories */}
                        {activeCategory && (
                          <div className={styles.mobileSubcategorySection}>
                            <h4>{activeCategory.toUpperCase()}</h4>
                            <ul>
                              {getSubCategories(activeCategory).map((item) => (
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
                            {getSeriesItems(activeCategory).map((item) => (
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
                            {getExploreItems(activeCategory).map((item) => (
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

                    {/* Desktop */}
                    {mobileView === "desktop" && (
                      <div
                        className={`${styles.mobileDesktopMenu} ${mobileView === "desktop" ? styles.slideIn : styles.slideOut
                          }`}
                      >
                        {/* Categories */}
                        <div className={styles.mobileCategorySection}>
                          <h4>CATEGORIES</h4>
                          <ul>
                            {categories.map((category) => (
                              <li
                                key={category}
                                className={
                                  activeCategory === category ? styles.active : ""
                                }
                                onClick={() => setActiveCategory(category)}
                              >
                                {category}
                                {activeCategory === category && (
                                  <span className={styles.arrow}>▼</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Subcategories */}
                        {activeCategory && (
                          <div className={styles.mobileSubcategorySection}>
                            <h4>{activeCategory.toUpperCase()}</h4>
                            <ul>
                              {getSubCategories(activeCategory).map((item) => (
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
                            {getSeriesItems(activeCategory).map((item) => (
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
                            {getExploreItems(activeCategory).map((item) => (
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
                  </>
                )}

              </div>
            </div>

            {/* Right side operations */}
            <div className={styles.operations}>
              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="User account"
                  onClick={closeAllMenus}
                >
                  <FaUser size={20} />
                </button>
              </div>

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

              <div className={styles.operationItem}>
                <button
                  className={styles.operationButton}
                  aria-label="Search"
                  onClick={toggleSearch}
                >
                  <FaSearch size={20} />
                </button>
              </div>

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
        isOpen={activeNav === "products" && isProduct}
        onClose={closeAllMenus}
        ref={productNavRef}
        mobileView={mobileView}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Desktop Navbar */}
      <DesktopNavbar
        isOpen={activeNav === "desktop" && isDesktop}
        onClose={closeAllMenus}
        ref={desktopNavRef}
        mobileView={mobileView}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Laptop Navbar */}
      <LaptopNavbar
        isOpen={activeNav === "laptop" && isLaptop}
        onClose={closeAllMenus}
        ref={laptopNavRef}
        mobileView={mobileView}
        isMobileMenuOpen={isMobileMenuOpen}
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
