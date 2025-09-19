//client/src/components/AIAssistant/utils/filterUtils.js
/**
 * Extracts filters from user message
 * @param {string} message - User message
 * @param {object} options - Available filter options
 * @returns {object} Extracted filters
 */
export const extractFilters = (message, options) => {
  const filters = {};
  const lowerMessage = message.toLowerCase();

  // Extract GPU filter
  options.gpuOptions.forEach(gpu => {
    if (lowerMessage.includes(gpu.toLowerCase())) {
      filters.gpu = gpu;
    }
  });

  // Extract Processor filter
  options.processorOptions.forEach(processor => {
    if (lowerMessage.includes(processor.toLowerCase())) {
      filters.processor = processor;
    }
  });

  // Extract RAM filter
  options.ramOptions.forEach(ram => {
    if (lowerMessage.includes(ram.toLowerCase())) {
      filters.ram = ram;
    }
  });

  // Extract Storage filter
  options.storageOptions.forEach(storage => {
    if (lowerMessage.includes(storage.toLowerCase())) {
      filters.storage = storage;
    }
  });

  // Extract Screen Size filter
  options.screenSizeOptions.forEach(screenSize => {
    if (lowerMessage.includes(screenSize.toLowerCase())) {
      filters.screenSize = screenSize;
    }
  });

  // Extract Category filter
  options.categories.forEach(category => {
    if (lowerMessage.includes(category.toLowerCase())) {
      filters.category = category;
    }
  });

  return filters;
};

/**
 * Extracts budget from user message
 * @param {string} message - User message
 * @returns {number|null} Extracted budget or null if not found
 */
export const extractBudget = (message) => {
  const budgetMatch = message.match(/(\d+)(?:\s*(?:k|thousand))?/i);
  return budgetMatch ? parseInt(budgetMatch[1]) * (budgetMatch[2] ? 1000 : 1) : null;
};

/**
 * Extracts product names from user message
 * @param {string} message - User message
 * @param {array} products - All available products
 * @returns {array} Array of product names found in the message
 */
export const extractProductNames = (message, products) => {
  const productKeywords = products.map(p => p.name.toLowerCase());
  return productKeywords.filter(keyword =>
    message.toLowerCase().includes(keyword)
  );
};
