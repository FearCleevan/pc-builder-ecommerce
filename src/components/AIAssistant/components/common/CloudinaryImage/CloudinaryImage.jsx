import React, { useState, useEffect } from 'react';
import styles from './CloudinaryImage.module.css';

// Default fallback image - use your existing image
import DefaultImage from '../../../../../assets/Desktop1.jpg';
import CloudinaryService from '../../../../../firebase/services/cloudinaryService';

const CloudinaryImage = ({ 
  productName, 
  componentType, 
  alt,
  className = '',
  width = 400,
  height = 400,
  fallbackImage = DefaultImage,
  onLoad,
  onError,
  ...props 
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-detect component type if not provided
  const detectedComponentType = componentType || detectComponentTypeFromName(productName);

  useEffect(() => {
    const loadImage = async () => {
      if (!productName) {
        // If no product name, use fallback immediately
        setImageUrl(fallbackImage);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);

        // Generate Cloudinary URL based on product name and type
        let cloudinaryUrl;
        
        // Use the generic component image method that handles all types
        cloudinaryUrl = CloudinaryService.getComponentImage(
          detectedComponentType, 
          productName, 
          { width, height }
        );

        // Validate the URL is not empty
        if (!cloudinaryUrl || cloudinaryUrl === '') {
          throw new Error('Empty Cloudinary URL generated');
        }

        console.log(`🖼️ Loading ${detectedComponentType} image for: ${productName}`, cloudinaryUrl);

        // Check if the image exists on Cloudinary
        const exists = await CloudinaryService.checkImageExists(cloudinaryUrl);
        
        if (exists) {
          setImageUrl(cloudinaryUrl);
        } else {
          console.warn(`❌ ${detectedComponentType} image not found on Cloudinary: ${productName}`);
          setImageUrl(fallbackImage);
          setHasError(true);
        }
      } catch (error) {
        console.warn(`❌ Error loading ${detectedComponentType} image for ${productName}:`, error.message);
        setImageUrl(fallbackImage);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [productName, detectedComponentType, width, height, fallbackImage]);

  const handleImageLoad = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleImageError = (e) => {
    console.warn(`🖼️ ${detectedComponentType} image failed to load: ${productName}`, imageUrl);
    
    // If Cloudinary image fails, fall back to default image
    if (imageUrl && imageUrl.includes('cloudinary.com') && imageUrl !== fallbackImage) {
      setImageUrl(fallbackImage);
      setHasError(true);
    }
    
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
        alt={alt || productName || `${detectedComponentType} image`}
        className={`${styles.image} ${isLoading ? styles.loading : ''} ${hasError ? styles.error : ''}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

// Helper function to detect component type from product name
const detectComponentTypeFromName = (productName) => {
  if (!productName) return 'cpu';
  
  const name = productName.toLowerCase();
  
  // CPU detection
  if (name.includes('ryzen') || name.includes('core') || name.includes('intel') || 
      name.includes('amd') || name.includes('xeon') || name.includes('pentium')) {
    return 'cpu';
  }
  
  // Motherboard detection
  if (name.includes('motherboard') || name.includes('mainboard') || name.includes('mb ') ||
      name.includes('b450') || name.includes('b550') || name.includes('b650') ||
      name.includes('x570') || name.includes('x670') || name.includes('z690') ||
      name.includes('z790')) {
    return 'motherboard';
  }
  
  // GPU detection
  if (name.includes('rtx') || name.includes('gtx') || name.includes('radeon') ||
      name.includes('geforce') || name.includes('video card') || name.includes('gpu')) {
    return 'gpu';
  }
  
  // RAM detection
  if (name.includes('ram') || name.includes('memory') || name.includes('ddr')) {
    return 'ram';
  }
  
  // Storage detection
  if (name.includes('ssd') || name.includes('hdd') || name.includes('nvme') ||
      name.includes('solid state') || name.includes('hard drive')) {
    return 'storage';
  }
  
  // Default to CPU if unknown
  return 'cpu';
};

export default CloudinaryImage;