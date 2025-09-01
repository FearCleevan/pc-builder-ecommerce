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
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
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
      const cardWidth = ref.current.querySelector('.card').offsetWidth + 20; // width + gap
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
            <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(exploreRef, "left")}>
              &#8249;
            </button>
            <div className={styles.carousel} ref={exploreRef}>
              {exploreProducts.map((product, index) => (
                <div key={index} className={`${styles.exploreCard} card`}>
                  <img src={product.img} alt={product.name} />
                  <h3>{product.name}</h3>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(exploreRef, "right")}>
              &#8250;
            </button>
          </div>
        </section>

        {/* New Arrivals - Desktops */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Desktops</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(desktopRef, "left")}>
              &#8249;
            </button>
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
                      <button className={styles.wishlistBtn}><FaHeart /></button>
                      <button className={styles.compareBtn}><FaBalanceScale /></button>
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
                    <div className={styles.hoverActions}>
                      <button className={styles.hoverBtn}><FaBalanceScale /> Compare</button>
                      <button className={styles.hoverBtn}><FaHeart /> Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(desktopRef, "right")}>
              &#8250;
            </button>
          </div>
        </section>

        {/* New Arrivals - Laptops */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Laptops</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(laptopRef, "left")}>
              &#8249;
            </button>
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
                      <button className={styles.wishlistBtn}><FaHeart /></button>
                      <button className={styles.compareBtn}><FaBalanceScale /></button>
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
                    <div className={styles.hoverActions}>
                      <button className={styles.hoverBtn}><FaBalanceScale /> Compare</button>
                      <button className={styles.hoverBtn}><FaHeart /> Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(laptopRef, "right")}>
              &#8250;
            </button>
          </div>
        </section>

        {/* New Arrivals - Products */}
        <section className={styles.newArrivals}>
          <div className={styles.sectionHeader}>
            <h2>New Arrivals - Products</h2>
            <a href="#" className={styles.viewAll}>View All</a>
          </div>
          <div className={styles.carouselWrapper}>
            <button className={`${styles.carouselArrow} ${styles.left}`} onClick={() => scroll(productsRef, "left")}>
              &#8249;
            </button>
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
                      <button className={styles.wishlistBtn}><FaHeart /></button>
                      <button className={styles.compareBtn}><FaBalanceScale /></button>
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
                    <div className={styles.hoverActions}>
                      <button className={styles.hoverBtn}><FaBalanceScale /> Compare</button>
                      <button className={styles.hoverBtn}><FaHeart /> Wishlist</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className={`${styles.carouselArrow} ${styles.right}`} onClick={() => scroll(productsRef, "right")}>
              &#8250;
            </button>
          </div>
        </section>

        {/* Featured Products */}
        <section className={styles.featured}>
          <h2>Featured Products</h2>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Gaming Laptops</h3>
              <p>Powerful laptops for gaming on the go</p>
              <button>Shop Now</button>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Graphics Cards</h3>
              <p>Latest GPUs for ultimate performance</p>
              <button>Shop Now</button>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImage}></div>
              <h3>Gaming Peripherals</h3>
              <p>Keyboards, mice, and headsets</p>
              <button>Shop Now</button>
            </div>
          </div>
        </section>

        {/* PC Builder CTA */}
        <section className={styles.builderCta}>
          <div className={styles.builderContent}>
            <h2>AI-Powered PC Builder</h2>
            <p>Our intelligent system will help you build the perfect PC based on your budget and needs</p>
            <ul>
              <li>Budget-based recommendations</li>
              <li>Compatibility checking</li>
              <li>Performance optimization</li>
            </ul>
            <button className={styles.ctaButton}>Try PC Builder AI</button>
          </div>
          <div className={styles.builderVisual}>
            <div className={styles.placeholderBuilder}>
              <span>PC Builder Interface Preview</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Main;