import { Cloudinary } from 'cloudinary-core';

const cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true
});

export class CloudinaryService {
  static getComponentImage(componentName, category, brand, model, options = {}) {
    const normalizedName = componentName
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const defaultOptions = {
      width: 400,
      height: 400,
      crop: 'limit',
      quality: 'auto',
      format: 'auto'
    };

    return cl.url(`pc-builder/${category}/${brand}/${model}/${normalizedName}`, {
      ...defaultOptions,
      ...options
    });
  }

  // Fallback method if exact match fails
  static getGenericComponentImage(category, brand) {
    return cl.url(`pc-builder/${category}/${brand}/default`, {
      width: 400,
      height: 400,
      crop: 'limit',
      quality: 'auto'
    });
  }
}

export default CloudinaryService;