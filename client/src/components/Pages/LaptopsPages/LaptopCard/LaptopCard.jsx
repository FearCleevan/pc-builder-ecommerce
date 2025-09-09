import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaStar, FaRegStar, FaBalanceScale } from 'react-icons/fa';
import { formatPrice } from '../../../MockData/formatPrice';
import styles from './LaptopCard.module.css';

const LaptopCard = ({ product }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imageRef = useRef(null);
    const cardRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: '200px', // Load images 200px before they come into view
                threshold: 0.01
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    // Load image when component is in view
    useEffect(() => {
        if (isInView && imageRef.current) {
            const img = new Image();
            img.src = product.img;
            img.onload = () => {
                setIsImageLoaded(true);
                if (imageRef.current) {
                    imageRef.current.src = product.img;
                }
            };
            img.onerror = () => {
                // Fallback image in case of error
                if (imageRef.current) {
                    imageRef.current.src = '/fallback-image.jpg';
                    setIsImageLoaded(true);
                }
            };
        }
    }, [isInView, product.img]);

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
        <div className={styles.productCard} ref={cardRef}>
            <div className={styles.productImage}>
                {/* Lazy loaded image with placeholder */}
                <img 
                    ref={imageRef}
                    src={isImageLoaded ? product.img : '/placeholder-image.jpg'} 
                    alt={product.name}
                    className={`${isImageLoaded ? styles.imageLoaded : styles.imageLoading}`}
                    loading="lazy" // Native lazy loading as fallback
                />
                
                {product.oldPrice > 0 && (
                    <span className={styles.discountBadge}>
                        {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                    </span>
                )}
                
                {/* Loading skeleton */}
                {!isImageLoaded && (
                    <div className={styles.imagePlaceholder}>
                        <div className={styles.loadingSpinner}></div>
                    </div>
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
                
                {/* View Product Hover Button */}
                <a
                    href={`/laptops/${product.id}`}
                    className={styles.viewProductBtn}
                    tabIndex={-1}
                >
                    View Product
                </a>
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
    );
};

export default LaptopCard;