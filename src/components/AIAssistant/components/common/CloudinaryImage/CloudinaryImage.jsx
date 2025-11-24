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

        console.log(`🖼️ Loading ${detectedComponentType} image for: ${productName}`);
        console.log(`📁 Cloudinary Path:`, CloudinaryService.getCloudinaryPath(detectedComponentType, productName));

        // Check if the image exists on Cloudinary
        const exists = await CloudinaryService.checkImageExists(cloudinaryUrl);
        
        if (exists) {
          setImageUrl(cloudinaryUrl);
        } else {
          console.warn(`❌ ${detectedComponentType} image not found on Cloudinary: ${productName}`);
          console.warn(`📁 Attempted path:`, CloudinaryService.getCloudinaryPath(detectedComponentType, productName));
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

// Enhanced helper function to detect component type from product name
const detectComponentTypeFromName = (productName) => {
  if (!productName) return 'cpu';
  
  const name = productName.toLowerCase();
  
  // Case detection - ADDED THIS SECTION
  if (name.includes('case') || name.includes('tower') || name.includes('chassis')) {
    return 'case';
  }
  
  // CPU detection
  if (name.includes('ryzen') || name.includes('core') || name.includes('intel') || 
      name.includes('amd') || name.includes('xeon') || name.includes('pentium') ||
      name.includes('cpu') || name.includes('processor')) {
    return 'cpu';
  }
  
  // Motherboard detection
  if (name.includes('motherboard') || name.includes('mainboard') || name.includes('mb ') ||
      name.includes('b450') || name.includes('b550') || name.includes('b650') ||
      name.includes('x570') || name.includes('x670') || name.includes('z690') ||
      name.includes('z790') || name.includes('h610') || name.includes('h670') ||
      name.includes('atx') || name.includes('micro atx') || name.includes('mini itx')) {
    return 'motherboard';
  }
  
  // GPU detection
  if (name.includes('rtx') || name.includes('gtx') || name.includes('radeon') ||
      name.includes('geforce') || name.includes('video card') || name.includes('gpu') ||
      name.includes('graphics card')) {
    return 'gpu';
  }
  
  // RAM detection
  if (name.includes('ram') || name.includes('memory') || name.includes('ddr')) {
    return 'ram';
  }
  
  // Storage detection
  if (name.includes('ssd') || name.includes('hdd') || name.includes('nvme') ||
      name.includes('solid state') || name.includes('hard drive') || name.includes('m.2')) {
    return 'storage';
  }
  
  // CPU Cooler detection - ADDED THIS SECTION
  if (name.includes('cooler') || name.includes('heatsink') || name.includes('aio') ||
      name.includes('liquid cooler') || name.includes('air cooler')) {
    return 'cooler';
  }
  
  // Power Supply detection - ADDED THIS SECTION
  if (name.includes('power supply') || name.includes('psu') || name.includes('watt')) {
    return 'psu';
  }
  
  // Monitor detection - ADDED THIS SECTION
  if (name.includes('monitor') || name.includes('display') || name.includes('screen')) {
    return 'monitor';
  }
  
  // Keyboard detection - ADDED THIS SECTION
  if (name.includes('keyboard')) {
    return 'keyboard';
  }
  
  // Mouse detection - ADDED THIS SECTION
  if (name.includes('mouse')) {
    return 'mouse';
  }
  
  // Speaker detection - ADDED THIS SECTION
  if (name.includes('speaker')) {
    return 'speaker';
  }
  
  // Headphones detection - ADDED THIS SECTION
  if (name.includes('headphone') || name.includes('headset')) {
    return 'headphones';
  }
  
  // Webcam detection - ADDED THIS SECTION
  if (name.includes('webcam') || name.includes('camera')) {
    return 'webcam';
  }
  
  // Default to CPU if unknown
  return 'cpu';
};

export default CloudinaryImage;