// client/src/components/MockData/allProducts.js
import { desktopProducts } from "./desktopProducts";
import { laptopProducts } from "./laptopProducts";
import { otherProducts } from "./otherProducts";
import { accessoriesProducts } from "./accessoriesProducts";

export const allProducts = [
  ...desktopProducts,
  ...laptopProducts,
  ...otherProducts,
  ...accessoriesProducts,
];

export const formatPrice = (price) => {
  return `₱${price.toLocaleString("en-PH")}`;
};

export const filterProducts = (products, filters) => {
  return products.filter((product) => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Series filter
    if (
      filters.series &&
      filters.series.length > 0 &&
      !filters.series.includes(product.series)
    ) {
      return false;
    }

    // Subcategory filter
    if (
      filters.subcategory &&
      filters.subcategory.length > 0 &&
      !filters.subcategory.includes(product.subcategory)
    ) {
      return false;
    }

    // GPU filter
    if (filters.gpu && filters.gpu.length > 0) {
      // This would need to match product specifications
      return true; // Placeholder
    }

    // Processor filter
    if (filters.processor && filters.processor.length > 0) {
      // This would need to match product specifications
      return true; // Placeholder
    }

    // Panel size filter
    if (filters.panelSize && filters.panelSize.length > 0) {
      // This would need to match product specifications
      return true; // Placeholder
    }

    return true;
  });
};