//client/src/components/AIAssistant/utils/productUtils.js
/**
 * Searches products based on query and filters
 * @param {string} query - Search query
 * @param {array} products - All available products
 * @param {object} filters - Filters to apply
 * @returns {array} Filtered products
 */
export const searchProducts = (query, products, filters = {}) => {
  let results = [...products];

  // Simple text search
  if (query) {
    const searchTerms = query.toLowerCase().split(' ');
    results = results.filter(product =>
      searchTerms.some(term =>
        product.name.toLowerCase().includes(term) ||
        (product.description && product.description.toLowerCase().includes(term)) ||
        (product.brand && product.brand.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term)) ||
        (product.specs && Object.values(product.specs).some(spec =>
          spec && spec.toString().toLowerCase().includes(term)
        ))
      )
    );
  }

  // Apply advanced filters
  if (filters.category) {
    results = results.filter(product => product.category === filters.category);
  }

  if (filters.gpu) {
    results = results.filter(product =>
      product.specs?.gpu?.toLowerCase().includes(filters.gpu.toLowerCase())
    );
  }

  if (filters.processor) {
    results = results.filter(product =>
      product.specs?.processor?.toLowerCase().includes(filters.processor.toLowerCase())
    );
  }

  if (filters.ram) {
    results = results.filter(product =>
      product.specs?.ram?.toLowerCase().includes(filters.ram.toLowerCase())
    );
  }

  if (filters.storage) {
    results = results.filter(product =>
      product.specs?.storage?.toLowerCase().includes(filters.storage.toLowerCase())
    );
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange.split('-').map(Number);
    results = results.filter(product => product.price >= min && product.price <= max);
  }

  if (filters.rating) {
    results = results.filter(product => product.rating >= parseFloat(filters.rating));
  }

  return results.slice(0, 8); // Return more results for better selection
};

/**
 * Generates product recommendations based on user needs
 * @param {string} userNeeds - User's expressed needs
 * @param {array} allItems - All available products
 * @param {array} laptopProducts - Laptop products
 * @param {array} desktopProducts - Desktop products
 * @param {array} gpuData - GPU products
 * @param {array} cpuData - CPU products
 * @param {array} monitorData - Monitor products
 * @returns {array} Recommended products
 */
export const generateRecommendations = (userNeeds, allItems, laptopProducts, desktopProducts, gpuData, cpuData, monitorData) => {
  let recommendations = [];
  const lowerNeeds = userNeeds.toLowerCase();

  if (lowerNeeds.includes('gaming') || lowerNeeds.includes('game')) {
    recommendations = [
      ...laptopProducts.filter(p => p.category === 'Gaming Laptops'),
      ...desktopProducts.filter(p => p.series === 'gaming-series'),
      ...gpuData.filter(gpu => gpu.specs?.series?.toLowerCase().includes('gaming')),
      ...cpuData.filter(cpu => cpu.specs?.series?.toLowerCase().includes('gaming'))
    ];
  }

  if (lowerNeeds.includes('business') || lowerNeeds.includes('work')) {
    recommendations = [
      ...laptopProducts.filter(p => p.category === 'Business Laptops'),
      ...desktopProducts.filter(p => p.series === 'workstation-series'),
      ...allItems.filter(item => item.features?.includes('security') || item.features?.includes('reliability'))
    ];
  }

  if (lowerNeeds.includes('creative') || lowerNeeds.includes('design')) {
    recommendations = [
      ...laptopProducts.filter(p => p.category === 'Content Creation Laptops'),
      ...desktopProducts.filter(p => p.series === 'workstation-series'),
      ...monitorData.filter(monitor => monitor.specs?.colorAccuracy),
      ...gpuData.filter(gpu => gpu.specs?.vram >= 8),
      ...allItems.filter(item => item.features?.includes('color accurate') || item.features?.includes('creative'))
    ];
  }

  if (lowerNeeds.includes('budget') || lowerNeeds.includes('cheap')) {
    recommendations = allItems
      .filter(item => item.price <= 30000)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  if (lowerNeeds.includes('premium') || lowerNeeds.includes('high-end')) {
    recommendations = allItems
      .filter(item => item.price >= 70000)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // If no specific needs, recommend popular items
  if (recommendations.length === 0) {
    recommendations = allItems
      .filter(item => item.rating >= 4)
      .sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
  }

  return recommendations.slice(0, 5);
};

/**
 * Generates a sales pitch for a product
 * @param {object} product - Product object
 * @returns {string} Sales pitch text
 */
export const generateSalesPitch = (product) => {
  const pitches = {
    'Gaming Laptops': `The ${product.name} is perfect for gaming with its ${product.specs?.gpu || 'powerful graphics'} and high-performance specs. ${product.features ? 'Features: ' + product.features.join(', ') : ''}`,
    'Business Laptops': `The ${product.name} provides enterprise-grade security and reliability for professional use. ${product.features ? 'Includes: ' + product.features.join(', ') : ''}`,
    'Content Creation Laptops': `Ideal for creative work, the ${product.name} offers excellent performance and display quality. ${product.features ? 'Perfect for: ' + product.features.join(', ') : ''}`,
    'CPU': `The ${product.name} delivers exceptional processing power with ${product.specs?.cores || 'multiple'} cores. ${product.specs?.clockSpeed ? 'Clock speed: ' + product.specs.clockSpeed : ''}`,
    'GPU': `Experience stunning graphics with the ${product.name} featuring ${product.specs?.vram || 'ample'} VRAM. ${product.specs?.memoryType ? 'Memory type: ' + product.specs.memoryType : ''}`,
    'default': `The ${product.name} is an excellent choice ${product.rating ? `with a ${product.rating}/5 rating` : ''} ${product.features ? 'featuring: ' + product.features.join(', ') : ''}`
  };

  return pitches[product.category] || pitches[product.type] || pitches.default;
};

/**
 * Generates product specifications text
 * @param {object} product - Product object
 * @returns {string} Formatted specifications text
 */
export const generateSpecifications = (product) => {
  let specs = `📋 Specifications for ${product.name}:\n\n`;
  if (product.brand) specs += `• 🏷️ Brand: ${product.brand}\n`;
  specs += `• 💰 Price: ₱${product.price.toLocaleString()}\n`;
  if (product.rating) specs += `• ⭐ Rating: ${product.rating}/5\n`;
  if (product.reviews) specs += `• 📊 Reviews: ${product.reviews}\n`;
  if (product.category) specs += `• 📦 Category: ${product.category}\n`;

  if (product.specs) {
    Object.entries(product.specs).forEach(([key, value]) => {
      if (value) specs += `• 🔧 ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
    });
  }

  if (product.description) specs += `\n📝 Description: ${product.description}`;
  return specs;
};

/**
 * Generates a comparison between products
 * @param {array} products - Array of products to compare
 * @returns {string} Formatted comparison text
 */
export const generateComparison = (products) => {
  if (products.length < 2) return "I need at least two products to compare.";

  let comparison = "Here's a detailed comparison:\n\n";

  products.forEach((product, index) => {
    comparison += `🏆 ${index + 1}. ${product.name}\n`;
    comparison += `   💰 Price: ₱${product.price.toLocaleString()}\n`;
    if (product.rating) {
      comparison += `   ⭐ Rating: ${product.rating}/5\n`;
    }
    if (product.category) {
      comparison += `   📦 Category: ${product.category}\n`;
    }
    if (product.specs) {
      Object.entries(product.specs).forEach(([key, value]) => {
        if (value) comparison += `   🔧 ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
      });
    }
    comparison += '\n';
  });

  return comparison;
};

/**
 * Creates a product card object
 * @param {object} product - Product object
 * @returns {object} Product card object
 */
export const generateProductCard = (product) => {
  return {
    type: 'productCard',
    product: product,
    timestamp: new Date()
  };
};