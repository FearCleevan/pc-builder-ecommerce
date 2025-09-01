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

// Import sample product images (replace later with real ones)
import SampleImg from '../../assets/banner4.jpeg';
// Import icons
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';

const Main = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const exploreRef = useRef(null);
  const desktopRef = useRef(null);
  const laptopRef = useRef(null);
  const productsRef = useRef(null);

  const banners = [
    { image: Banner1, title: "Build Your Dream PC", description: "Custom computers built for gaming, creativity, and productivity" },
    { image: Banner2, title: "Ultimate Gaming Experience", description: "High-performance components for the serious gamer" },
    { image: Banner3, title: "Professional Workstations", description: "Powerful systems for content creation and professional work" },
    { image: Banner4, title: "Cutting-Edge Technology", description: "Stay ahead with the latest innovations in PC hardware" },
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  // Subcategories (trimmed list, not all)
  const exploreProducts = [
    { name: "Graphics Card", img: SampleImg },
    { name: "Processor Intel", img: SampleImg },
    { name: "Processor AMD", img: SampleImg },
    { name: "RAM", img: SampleImg },
    { name: "SSD", img: SampleImg },
    { name: "Motherboard", img: SampleImg },
    { name: "Keyboard", img: SampleImg },
    { name: "Mouse", img: SampleImg },
    { name: "Monitor", img: SampleImg },
    { name: "Headset", img: SampleImg },
    { name: "Power Supply", img: SampleImg },
    { name: "CPU Cooler", img: SampleImg },
  ];

  // Sample products data
  const desktopProducts = [
    { 
      id: 1, 
      name: "Gaming Desktop Pro", 
      brand: "NVIDIA", 
      description: "High-performance gaming desktop with RTX 4080", 
      img: SampleImg, 
      price: 85999, 
      oldPrice: 89999, 
      rating: 4.8,
      reviews: 124 
    },
    { 
      id: 2, 
      name: "Workstation Elite", 
      brand: "Intel", 
      description: "Professional workstation for content creators", 
      img: SampleImg, 
      price: 72999, 
      oldPrice: 78999, 
      rating: 4.6,
      reviews: 87 
    },
    { 
      id: 3, 
      name: "Streamer PC", 
      brand: "AMD", 
      description: "Optimized for streaming and gaming simultaneously", 
      img: SampleImg, 
      price: 65999, 
      oldPrice: 0, 
      rating: 4.7,
      reviews: 56 
    },
    { 
      id: 4, 
      name: "Budget Gaming PC", 
      brand: "ASUS", 
      description: "Entry-level gaming desktop with great performance", 
      img: SampleImg, 
      price: 42999, 
      oldPrice: 45999, 
      rating: 4.5,
      reviews: 203 
    },
    { 
      id: 5, 
      name: "Mini ITX Build", 
      brand: "MSI", 
      description: "Compact gaming PC with powerful components", 
      img: SampleImg, 
      price: 57999, 
      oldPrice: 61999, 
      rating: 4.9,
      reviews: 42 
    },
    { 
      id: 6, 
      name: "RGB Gaming Beast", 
      brand: "Corsair", 
      description: "Fully customized RGB gaming desktop", 
      img: SampleImg, 
      price: 78999, 
      oldPrice: 84999, 
      rating: 4.8,
      reviews: 91 
    },
    { 
      id: 7, 
      name: "Silent Workstation", 
      brand: "Be Quiet!", 
      description: "Whisper quiet performance for professionals", 
      img: SampleImg, 
      price: 68999, 
      oldPrice: 0, 
      rating: 4.7,
      reviews: 38 
    },
    { 
      id: 8, 
      name: "VR Ready Desktop", 
      brand: "HP", 
      description: "Optimized for virtual reality experiences", 
      img: SampleImg, 
      price: 75999, 
      oldPrice: 79999, 
      rating: 4.6,
      reviews: 67 
    },
  ];

  const laptopProducts = [
    { 
      id: 1, 
      name: "Gaming Laptop Pro", 
      brand: "ASUS ROG", 
      description: "17-inch gaming laptop with RTX 4070", 
      img: SampleImg, 
      price: 95999, 
      oldPrice: 99999, 
      rating: 4.8,
      reviews: 156 
    },
    { 
      id: 2, 
      name: "Ultrabook Elite", 
      brand: "Dell", 
      description: "Thin and light for professionals on the go", 
      img: SampleImg, 
      price: 72999, 
      oldPrice: 76999, 
      rating: 4.5,
      reviews: 89 
    },
    { 
      id: 3, 
      name: "Content Creator Laptop", 
      brand: "MSI", 
      description: "Color-accurate display for creative work", 
      img: SampleImg, 
      price: 85999, 
      oldPrice: 89999, 
      rating: 4.7,
      reviews: 64 
    },
    { 
      id: 4, 
      name: "Budget Gaming Laptop", 
      brand: "Acer", 
      description: "Affordable gaming performance", 
      img: SampleImg, 
      price: 49999, 
      oldPrice: 54999, 
      rating: 4.3,
      reviews: 187 
    },
    { 
      id: 5, 
      name: "2-in-1 Convertible", 
      brand: "Lenovo", 
      description: "Versatile laptop and tablet combination", 
      img: SampleImg, 
      price: 65999, 
      oldPrice: 69999, 
      rating: 4.6,
      reviews: 112 
    },
    { 
      id: 6, 
      name: "MacBook Pro", 
      brand: "Apple", 
      description: "Professional laptop for creatives", 
      img: SampleImg, 
      price: 112999, 
      oldPrice: 119999, 
      rating: 4.9,
      reviews: 245 
    },
    { 
      id: 7, 
      name: "Business Laptop", 
      brand: "HP", 
      description: "Security-focused for enterprise use", 
      img: SampleImg, 
      price: 58999, 
      oldPrice: 62999, 
      rating: 4.4,
      reviews: 76 
    },
    { 
      id: 8, 
      name: "RGB Gaming Laptop", 
      brand: "Razer", 
      description: "Sleek design with customizable lighting", 
      img: SampleImg, 
      price: 102999, 
      oldPrice: 109999, 
      rating: 4.7,
      reviews: 98 
    },
  ];

  const otherProducts = [
    { 
      id: 1, 
      name: "Mechanical Keyboard", 
      brand: "Corsair", 
      description: "RGB mechanical keyboard with Cherry MX switches", 
      img: SampleImg, 
      price: 6999, 
      oldPrice: 7999, 
      rating: 4.8,
      reviews: 342 
    },
    { 
      id: 2, 
      name: "Gaming Mouse", 
      brand: "Logitech", 
      description: "Wireless gaming mouse with Hero sensor", 
      img: SampleImg, 
      price: 5499, 
      oldPrice: 5999, 
      rating: 4.7,
      reviews: 287 
    },
    { 
      id: 3, 
      name: "4K Monitor", 
      brand: "Samsung", 
      description: "32-inch 4K display with HDR support", 
      img: SampleImg, 
      price: 23999, 
      oldPrice: 25999, 
      rating: 4.6,
      reviews: 154 
    },
    { 
      id: 4, 
      name: "Gaming Headset", 
      brand: "SteelSeries", 
      description: "7.1 surround sound with noise cancellation", 
      img: SampleImg, 
      price: 6999, 
      oldPrice: 7999, 
      rating: 4.5,
      reviews: 213 
    },
    { 
      id: 5, 
      name: "Webcam", 
      brand: "Logitech", 
      description: "4K webcam with background replacement", 
      img: SampleImg, 
      price: 8999, 
      oldPrice: 9999, 
      rating: 4.4,
      reviews: 178 
    },
    { 
      id: 6, 
      name: "SSD 1TB", 
      brand: "Samsung", 
      description: "NVMe SSD with read speeds up to 7000MB/s", 
      img: SampleImg, 
      price: 7999, 
      oldPrice: 8999, 
      rating: 4.9,
      reviews: 432 
    },
    { 
      id: 7, 
      name: "Router", 
      brand: "TP-Link", 
      description: "Wi-Fi 6 gaming router with prioritization", 
      img: SampleImg, 
      price: 5999, 
      oldPrice: 6999, 
      rating: 4.3,
      reviews: 167 
    },
    { 
      id: 8, 
      name: "Mouse Pad", 
      brand: "Razer", 
      description: "Extended RGB gaming mouse pad", 
      img: SampleImg, 
      price: 2999, 
      oldPrice: 3499, 
      rating: 4.6,
      reviews: 198 
    },
  ];

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

  // Format price in Philippine Peso
  const formatPrice = (price) => {
    return `₱${price.toLocaleString('en-PH')}`;
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