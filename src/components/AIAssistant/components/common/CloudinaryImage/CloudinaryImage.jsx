import React, { useState, useEffect } from 'react';
import styles from './CloudinaryImage.module.css';

// Default fallback image - use your existing image
import DefaultImage from '../../../../../assets/Desktop1.jpg';
import CloudinaryService from '../../../../../firebase/services/cloudinaryService';

const CloudinaryImage = ({ 
  productName, 
  componentType, // REMOVE the default value here
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
        
        switch (componentType) {
          case 'cpu':
            cloudinaryUrl = CloudinaryService.getProcessorImage(productName, { width, height });
            break;
          case 'motherboard':
            cloudinaryUrl = CloudinaryService.getMotherboardImage(productName, { width, height });
            break;
          // Add other component types as needed
          default:
            cloudinaryUrl = CloudinaryService.getDefaultImage(componentType, 'default', { width, height });
        }

        // Validate the URL is not empty
        if (!cloudinaryUrl || cloudinaryUrl === '') {
          throw new Error('Empty Cloudinary URL generated');
        }

        console.log(`🖼️ Loading ${componentType} image for: ${productName}`, cloudinaryUrl);

        // Check if the image exists on Cloudinary
        const exists = await CloudinaryService.checkImageExists(cloudinaryUrl);
        
        if (exists) {
          setImageUrl(cloudinaryUrl);
        } else {
          console.warn(`❌ ${componentType} image not found on Cloudinary: ${productName}`);
          setImageUrl(fallbackImage);
          setHasError(true);
        }
      } catch (error) {
        console.warn(`❌ Error loading ${componentType} image for ${productName}:`, error.message);
        setImageUrl(fallbackImage);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [productName, componentType, width, height, fallbackImage]);

  const handleImageLoad = (e) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  const handleImageError = (e) => {
    console.warn(`🖼️ ${componentType} image failed to load: ${productName}`, imageUrl);
    
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
        alt={alt || productName || `${componentType} image`}
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

// Set default props separately
CloudinaryImage.defaultProps = {
  componentType: 'motherboard' // Change default to motherboard or remove entirely
};

export default CloudinaryImage;