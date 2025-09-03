// client/src/components/Main/Main.jsx
import React, { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Main.module.css';

// Import your banner images
import Banner1 from '../../assets/banner1.jpeg';
import Banner2 from '../../assets/banner2.jpeg';
import Banner3 from '../../assets/banner3.jpeg';
import Banner4 from '../../assets/banner4.jpeg';

// Import product images
import GamingDesktop from '../../assets/Products1.png';
import GamingLaptop from '../../assets/Products1.png';
import GraphicsCard from '../../assets/Products1.png';
import Keyboard from '../../assets/Products1.png';
import Mouse from '../../assets/Products1.png';
import Headset from '../../assets/Products1.png';
import Monitor from '../../assets/Products1.png';

// Import mock data
import {
  banners as mockBanners,
  exploreProducts,
  desktopProducts,
  laptopProducts,
  otherProducts,
  formatPrice
} from '../MockData/MockData';

// Import icons
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale, FaCog, FaMagic, FaRobot } from 'react-icons/fa';

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const exploreRef = useRef(null);
  const desktopRef = useRef(null);
  const laptopRef = useRef(null);
  const productsRef = useRef(null);

  // Add images to banners
  const banners = mockBanners.map((banner, index) => {
    const bannerImages = [Banner1, Banner2, Banner3, Banner4];
    return {
      ...banner,
      image: bannerImages[index] || Banner1
    };
  });

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  // Carousel Scroll Functions
  const scroll = (ref, direction) => {
    if (ref.current) {
      const cardWidth = ref.current.querySelector('.card').offsetWidth + (isMobile ? 10 : 20); // width + gap
      ref.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  // Handle swipe for carousels
  const handleSwipe = (ref, startX, endX) => {
    if (startX > endX + 50) {
      scroll(ref, "right");
    } else if (startX < endX - 50) {
      scroll(ref, "left");
    }
  };

  // Setup swipe for a ref
  const setupSwipe = (ref) => {
    let startX = 0;
    
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    
    const onTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      handleSwipe(ref, startX, endX);
    };
    
    const element = ref.current;
    if (element) {
      element.addEventListener('touchstart', onTouchStart);
      element.addEventListener('touchend', onTouchEnd);
      
      return () => {
        element.removeEventListener('touchstart', onTouchStart);
        element.removeEventListener('touchend', onTouchEnd);
      };
    }
  };

  // Setup swipe for all carousels
  useEffect(() => {
    const cleanups = [
      setupSwipe(exploreRef),
      setupSwipe(desktopRef),
      setupSwipe(laptopRef),
      setupSwipe(productsRef)
    ];
    
    return () => cleanups.forEach(cleanup => cleanup && cleanup());
  }, []);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className={styles.starIcon} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className={styles.starIconHalf} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.starIcon} />);
      }
    }
    
    return stars;
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Gaming Laptops",
      description: "Powerful laptops for gaming on the go",
      image: GamingLaptop,
      link: "/gaming-laptops"
    },
    {
      id: 2,
      name: "Graphics Cards",
      description: "Latest GPUs for ultimate performance",
      image: GraphicsCard,
      link: "/graphics-cards"
    },
    {
      id: 3,
      name: "Gaming Peripherals",
      description: "Keyboards, mice, and headsets",
      image: Keyboard,
      link: "/gaming-peripherals"
    }
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section with Banner Carousel */}
        <section className={styles.hero}>
          <div className={styles.bannerContainer}>
            {banners.map((banner, index) => (
              <div
                key={index}
                className={`${styles.bannerSlide} ${index === currentBanner ? styles.active : ''}`}
                style={{ backgroundImage: `url(${banner.image})` }}
              >
                <div className={styles.bannerOverlay}></div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button className={`${styles.navArrow} ${styles.leftArrow}`} onClick={prevBanner}>
              &#8249;
            </button>
            <button className={`${styles.navArrow} ${styles.rightArrow}`} onClick={nextBanner}>
              &#8250;
            </button>

            {/* Banner Indicators */}
            <div className={styles.bannerIndicators}>
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentBanner ? styles.active : ''}`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>

          {/* Banner Text Component */}
          <div className={styles.bannerText}>
            <h1>{banners[currentBanner].title}</h1>
            <p>{banners[currentBanner].description}</p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryButton}>Start Building</button>
              <button className={styles.secondaryButton}>Explore Pre-builts</button>
            </div>
          </div>
        </section>

        {/* 🔥 Explore Products Section */}
        <section className={styles.exploreProducts}>
          <h2>Explore Products</h2>
          <div className={styles.carouselWrapper}>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(exploreRef, "left")}>
                &#8249;
              </button>
            )}
            <div className={styles.carousel} ref={exploreRef}>
              {exploreProducts.map((product, index) => (
                <div key={index} className={`${styles.exploreCard} card`}>
                  <img src={product.img} alt={product.name} />
                  <h3>{product.name}</h3>
                </div>
              ))}
            </div>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(exploreRef, "right")}>
                &#8250;
              </button>
            )}
          </div>
        </section>

        {/* New Arrivals - Desktops */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Desktops</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(desktopRef, "left")}>
                &#8249;
              </button>
            )}
            <div className={styles.productCarousel} ref={desktopRef}>
              {desktopProducts.map((product) => (
                <div key={product.id} className={`${styles.productCard} card`}>
                  <div className={styles.productImage}>
                    <img src={product.img} alt={product.name} />
                    {product.oldPrice > 0 && (
                      <span className={styles.discountBadge}>
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                    <div className={styles.productActions}>
                      <button className={styles.wishlistBtn} aria-label="Add to Wishlist">
                        <FaHeart />
                        <span className={styles.tooltip}>Add to Wishlist</span>
                      </button>
                      <button className={styles.compareBtn} aria-label="Compare Product">
                        <FaBalanceScale />
                        <span className={styles.tooltip}>Compare</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productBrand}>{product.brand}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description}</p>
                    <div className={styles.productRating}>
                      <div className={styles.stars}>
                        {renderStars(product.rating)}
                        <span>({product.reviews})</span>
                      </div>
                    </div>
                    <div className={styles.productPrice}>
                      {product.oldPrice > 0 && (
                        <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                      )}
                      <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                    </div>
                    <div className={styles.productButtons}>
                      <button className={styles.buyNowBtn}>Buy Now</button>
                      <button className={styles.addToCartBtn}>
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(desktopRef, "right")}>
                &#8250;
              </button>
            )}
          </div>
        </section>

        {/* New Arrivals - Laptops */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Laptops</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(laptopRef, "left")}>
                &#8249;
              </button>
            )}
            <div className={styles.productCarousel} ref={laptopRef}>
              {laptopProducts.map((product) => (
                <div key={product.id} className={`${styles.productCard} card`}>
                  <div className={styles.productImage}>
                    <img src={product.img} alt={product.name} />
                    {product.oldPrice > 0 && (
                      <span className={styles.discountBadge}>
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                    <div className={styles.productActions}>
                      <button className={styles.wishlistBtn} aria-label="Add to Wishlist">
                        <FaHeart />
                        <span className={styles.tooltip}>Add to Wishlist</span>
                      </button>
                      <button className={styles.compareBtn} aria-label="Compare Product">
                        <FaBalanceScale />
                        <span className={styles.tooltip}>Compare</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productBrand}>{product.brand}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description}</p>
                    <div className={styles.productRating}>
                      <div className={styles.stars}>
                        {renderStars(product.rating)}
                        <span>({product.reviews})</span>
                      </div>
                    </div>
                    <div className={styles.productPrice}>
                      {product.oldPrice > 0 && (
                        <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                      )}
                      <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                    </div>
                    <div className={styles.productButtons}>
                      <button className={styles.buyNowBtn}>Buy Now</button>
                      <button className={styles.addToCartBtn}>
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(laptopRef, "right")}>
                &#8250;
              </button>
            )}
          </div>
        </section>

        {/* New Arrivals - Products */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Products</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(productsRef, "left")}>
                &#8249;
              </button>
            )}
            <div className={styles.productCarousel} ref={productsRef}>
              {otherProducts.map((product) => (
                <div key={product.id} className={`${styles.productCard} card`}>
                  <div className={styles.productImage}>
                    <img src={product.img} alt={product.name} />
                    {product.oldPrice > 0 && (
                      <span className={styles.discountBadge}>
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                      </span>
                    )}
                    <div className={styles.productActions}>
                      <button className={styles.wishlistBtn} aria-label="Add to Wishlist">
                        <FaHeart />
                        <span className={styles.tooltip}>Add to Wishlist</span>
                      </button>
                      <button className={styles.compareBtn} aria-label="Compare Product">
                        <FaBalanceScale />
                        <span className={styles.tooltip}>Compare</span>
                      </button>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productBrand}>{product.brand}</span>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description}</p>
                    <div className={styles.productRating}>
                      <div className={styles.stars}>
                        {renderStars(product.rating)}
                        <span>({product.reviews})</span>
                      </div>
                    </div>
                    <div className={styles.productPrice}>
                      {product.oldPrice > 0 && (
                        <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
                      )}
                      <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                    </div>
                    <div className={styles.productButtons}>
                      <button className={styles.buyNowBtn}>Buy Now</button>
                      <button className={styles.addToCartBtn}>
                        <FaShoppingCart />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isMobile && (
              <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(productsRef, "right")}>
                &#8250;
              </button>
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className={styles.featured}>
          <div className={styles.sectionHeader}>
            <h2>Featured Products</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <div key={product.id} className={styles.featuredCard}>
                <div className={styles.featuredImage}>
                  <img src={product.image} alt={product.name} />
                  <div className={styles.featuredOverlay}></div>
                </div>
                <div className={styles.featuredContent}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <a href={product.link} className={styles.featuredButton}>
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI-Powered PC Builder */}
        <section className={styles.builderCta}>
          <div className={styles.builderContent}>
            <div className={styles.builderHeader}>
              <FaRobot className={styles.builderIcon} />
              <h2>AI-Powered PC Builder</h2>
            </div>
            <p>Our intelligent system will help you build the perfect PC based on your budget and needs</p>
            <ul className={styles.builderFeatures}>
              <li>
                <FaCog className={styles.featureIcon} />
                <span>Budget-based recommendations</span>
              </li>
              <li>
                <FaBalanceScale className={styles.featureIcon} />
                <span>Compatibility checking</span>
              </li>
              <li>
                <FaMagic className={styles.featureIcon} />
                <span>Performance optimization</span>
              </li>
            </ul>
            <button className={styles.ctaButton}>
              <FaRobot />
              <span>Try PC Builder AI</span>
            </button>
          </div>
          <div className={styles.builderVisual}>
            <div className={styles.builderAnimation}>
              <div className={styles.cpuChip}></div>
              <div className={styles.gpuCard}></div>
              <div className={styles.ramStick}></div>
              <div className={styles.aiOrb}>
                <div className={styles.pulse}></div>
                <FaRobot className={styles.aiIcon} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;