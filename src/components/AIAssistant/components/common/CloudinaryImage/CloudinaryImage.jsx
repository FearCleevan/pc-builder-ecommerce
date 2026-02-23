import React, { useState, useEffect } from 'react';
import styles from './CloudinaryImage.module.css';

// Default fallback image - use your existing image
import DefaultImage from '../../../../../assets/Desktop1.jpg';

const CloudinaryImage = ({ 
  src,
  productName, 
  componentType: _componentType,
  alt,
  className = '',
  fallbackSrc,
  fallbackImage = DefaultImage,
  onLoad,
  onError,
  ...props 
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const candidate =
      src ||
      props.image ||
      props.mainImage ||
      props.mainImageUrl ||
      props.SampleImg ||
      props.sampleImg ||
      fallbackSrc ||
      fallbackImage;

    setImageUrl(candidate || fallbackImage);
    setIsLoading(false);
  }, [src, fallbackSrc, fallbackImage, props.image, props.mainImage, props.mainImageUrl, props.SampleImg, props.sampleImg]);

  const handleImageLoad = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleImageError = (e) => {
    if (imageUrl !== fallbackImage) setImageUrl(fallbackImage);
    setIsLoading(false);
    onError?.(e);
  };

  // Don't render img tag if no URL is available yet
  if (!imageUrl) {
    return (
      <div className={`${styles.imageContainer} ${className}`}>
        <div className={styles.imagePlaceholder}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.imageContainer} ${className}`}>
      {isLoading && (
        <div className={styles.imagePlaceholder}>
          <div className={styles.loadingSpinner}></div>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={alt || productName || 'product image'}
        className={`${styles.image} ${isLoading ? styles.loading : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export default CloudinaryImage;
