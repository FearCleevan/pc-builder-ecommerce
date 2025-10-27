//client/src/components/AIAssistant/utils/aiProcessor.js

import { extractFilters, extractBudget, extractProductNames } from '../utils/filterUtils';
import { searchProducts, generateRecommendations, generateSalesPitch, generateSpecifications, generateComparison, generateProductCard } from '../utils/productUtils';
import { generatePCPartRecommendation, buildCompletePC, generatePCBuildCard, checkBuildCompatibility } from '../utils/pcBuildingUtils';
import allItems from '../data/productData';
import filterOptions from '../data/filterOptions';

// Import individual product categories for recommendations
import { laptopProducts } from '../../MockData/laptopProducts';
import { desktopProducts } from '../../MockData/desktopProducts';
import { gpuData } from '../../PCBuilder/Modal/MockData/GPU/GPU';
import { cpuData } from '../../PCBuilder/Modal/MockData/CPU/CPU';
import { monitorData } from '../../PCBuilder/Modal/MockData/Monitor/Monitor';

// Import all component data for PC building
import { caseData } from '../../PCBuilder/Modal/MockData/Case/Case';
import { motherboardData } from '../../PCBuilder/Modal/MockData/Motherboard/Motherboard';
import { ramData } from '../../PCBuilder/Modal/MockData/RAM/Ram';
import { cpuCoolerData } from '../../PCBuilder/Modal/MockData/CPU Cooler/CPUCooler';
import { storageData } from '../../PCBuilder/Modal/MockData/Storage/Storage';
import { powerSupplyData } from '../../PCBuilder/Modal/MockData/Power Suppy/PowerSupply';
import { callGeminiAI } from '../utils/geminiAPI';

// Component data for PC building
const componentData = {
  caseData,
  cpuData,
  motherboardData,
  gpuData,
  ramData,
  cpuCoolerData,
  storageData,
  powerSupplyData
};

/**
 * Enhanced AI message processing with Gemini AI integration
 * @param {string} userMessage - User's message
 * @param {boolean} useGeminiAI - Whether to use Gemini AI
 * @param {function} setMessages - Function to set messages
 * @param {function} setIsTyping - Function to set typing state
 * @returns {object} Response object with message, product cards, and PC build
 */
export const enhancedProcessMessage = async (userMessage, useGeminiAI, setMessages, setIsTyping) => {
  setIsTyping(true);
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const message = userMessage.toLowerCase();
  let response = { type: 'text', content: '' };
  let products = [];
  let productCards = [];
  let pcBuild = null;

  // Try Gemini AI first if enabled
  if (useGeminiAI) {
    try {
      const productContext = allItems.slice(0, 20).map(p =>
        `${p.name}: ${p.description} (₱${p.price.toLocaleString()}) ${p.features ? 'Features: ' + p.features.join(', ') : ''}${p.specs ? ' Specs: ' + JSON.stringify(p.specs) : ''}`
      ).join('\n');

      const aiResponse = await callGeminiAI(userMessage, `
        Available Products Context:
        ${productContext}
        
        Filter Options:
        - Categories: ${filterOptions.categories.join(', ')}
        - GPUs: ${filterOptions.gpuOptions.join(', ')}
        - Processors: ${filterOptions.processorOptions.join(', ')}
        - RAM: ${filterOptions.ramOptions.join(', ')}
        - Storage: ${filterOptions.storageOptions.join(', ')}
        - Screen Sizes: ${filterOptions.screenSizeOptions.join(', ')}
        - Series: ${filterOptions.series.join(', ')}
      `);

      if (aiResponse) {
        response.content = aiResponse;

        // Extract mentioned products for cards
        const mentionedProducts = allItems.filter(product =>
          aiResponse.toLowerCase().includes(product.name.toLowerCase()) ||
          (product.specs && Object.values(product.specs).some(spec =>
            spec && aiResponse.toLowerCase().includes(spec.toString().toLowerCase())
          ))
        ).slice(0, 3);

        mentionedProducts.forEach(product => {
          productCards.push(generateProductCard(product));
        });

        setIsTyping(false);
        return { response, productCards, pcBuild };
      }
    } catch (error) {
      console.log('Falling back to rule-based system:', error);
    }
  }

  // Rule-based system with enhanced filtering
  const extractedFilters = extractFilters(userMessage, filterOptions);
//   const budget = extractBudget(userMessage);
  const productNames = extractProductNames(message, allItems);

  // Greeting
  if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message.includes('greeting')) {
    response.content = "Hello! Welcome to TechnoBuild! 🛍️ How can I assist you with your tech shopping today?";
  }
  // Help command
  else if (message.includes('help') || message.includes('what can you do') || message.includes('capabilities')) {
    response.content = `I can help you with: 🔧\n• Product search and recommendations\n• Custom PC building\n• Technical specifications\n• Price comparisons\n• Filtering by categories, specs, and features\n• Component compatibility checking\n\nWhat would you like to do?`;
  }
  // Filter-based search
  else if (Object.keys(extractedFilters).length > 0 || message.includes('filter') || message.includes('with') || message.includes('having')) {
    if (Object.keys(extractedFilters).length > 0) {
      products = searchProducts(userMessage, allItems, extractedFilters);
      if (products.length > 0) {
        response.content = `✅ Found ${products.length} products matching your criteria:\n`;
        products.forEach((product, index) => {
          response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
          if (product.rating) response.content += ` ⭐${product.rating}/5`;
          productCards.push(generateProductCard(product));
        });
      } else {
        response.content = "❌ No products found with those specifications. Try adjusting your criteria or ask for recommendations!";
      }
    } else {
      response.content = `I can filter by: 🎯\n• Categories: ${filterOptions.categories.join(', ')}\n• GPUs: ${filterOptions.gpuOptions.join(', ')}\n• Processors: ${filterOptions.processorOptions.join(', ')}\n• RAM: ${filterOptions.ramOptions.join(', ')}\n• Storage: ${filterOptions.storageOptions.join(', ')}\n• Screen Sizes: ${filterOptions.screenSizeOptions.join(', ')}\n\nWhat specific requirements do you have?`;
    }
  }
  // Product search by name
  else if (productNames.length > 0 || message.includes('find') || message.includes('search') || message.includes('looking for')) {
    products = searchProducts(userMessage, allItems);
    if (products.length > 0) {
      response.content = `🔍 Found ${products.length} products:\n`;
      products.forEach((product, index) => {
        response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
        if (product.rating) response.content += ` ⭐${product.rating}/5`;
        productCards.push(generateProductCard(product));
      });
    } else {
      response.content = "❌ No products found. Try different keywords or ask for recommendations!";
    }
  }
  // Recommendations
  else if (message.includes('recommend') || message.includes('suggest') || message.includes('what should') || message.includes('best')) {
    products = generateRecommendations(userMessage, allItems, laptopProducts, desktopProducts, gpuData, cpuData, monitorData);
    if (products.length > 0) {
      response.content = "🎯 Based on your needs, I recommend:\n";
      products.forEach((product, index) => {
        response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()} - ${generateSalesPitch(product)}`;
        productCards.push(generateProductCard(product));
      });
    } else {
      response.content = "I'd be happy to recommend products! Could you tell me what you're looking for? (gaming, business, creative work, budget, premium, etc.)";
    }
  }
  // Price inquiries
  else if (message.includes('price') || message.includes('how much') || message.includes('cost') || message.includes('₱')) {
    const productMatch = allItems.find(p =>
      productNames.some(name => p.name.toLowerCase().includes(name)) ||
      message.includes(p.name.toLowerCase())
    );

    if (productMatch) {
      response.content = `💰 The ${productMatch.name} is priced at ₱${productMatch.price.toLocaleString()}`;
      if (productMatch.oldPrice) {
        response.content += ` (was ₱${productMatch.oldPrice.toLocaleString()}, save ₱${(productMatch.oldPrice - productMatch.price).toLocaleString()})`;
      }
      response.content += `. ${generateSalesPitch(productMatch)}`;
      productCards.push(generateProductCard(productMatch));
    } else {
      response.content = "I'm not sure which product you're asking about. Could you specify the exact product name?";
    }
  }
  // PC Building
  else if (message.includes('build') || message.includes('custom pc') || message.includes('pc build') || message.includes('assemble')) {
    const budget = extractBudget(message);
    let purpose = 'gaming';

    if (message.includes('workstation') || message.includes('professional')) purpose = 'workstation';
    if (message.includes('creative') || message.includes('design')) purpose = 'creative';
    if (message.includes('budget') || message.includes('cheap') || message.includes('economy')) purpose = 'budget';
    if (message.includes('stream') || message.includes('content')) purpose = 'streaming';

    if (budget) {
      const { build, totalPrice } = buildCompletePC(budget, purpose, componentData);
      pcBuild = generatePCBuildCard(build, totalPrice, purpose);
      response.content = `🛠️ Here's a ${purpose} PC build for ₱${budget.toLocaleString()}:\n\n`;

      Object.entries(build).forEach(([type, component]) => {
        response.content += `• ${type.toUpperCase()}: ${component.name} - ₱${component.price.toLocaleString()}\n`;
      });

      response.content += `\n💵 Total: ₱${totalPrice.toLocaleString()}`;

      // Add build compatibility check
      const compatibility = checkBuildCompatibility(build);
      if (compatibility.issues.length > 0) {
        response.content += `\n\n⚠️ Compatibility Notes:\n${compatibility.issues.join('\n')}`;
      }
    } else {
      response.content = "I'd love to help you build a custom PC! What's your budget and primary use? (gaming, creative work, streaming, etc.)";
    }
  }
  // Component recommendations
  else if (message.includes('cpu') || message.includes('gpu') || message.includes('ram') ||
    message.includes('motherboard') || message.includes('storage') || message.includes('psu') ||
    message.includes('power supply') || message.includes('case') || message.includes('cooler') ||
    message.includes('monitor') || message.includes('keyboard') || message.includes('mouse')) {

    let componentType = '';
    const componentMap = {
      'cpu': 'cpu', 'processor': 'cpu',
      'gpu': 'gpu', 'graphics': 'gpu', 'video card': 'gpu',
      'ram': 'ram', 'memory': 'ram',
      'motherboard': 'motherboard', 'mobo': 'motherboard',
      'storage': 'storage', 'ssd': 'storage', 'hdd': 'storage',
      'psu': 'power supply', 'power supply': 'power supply',
      'case': 'case', 'chassis': 'case',
      'cooler': 'cooler', 'heatsink': 'cooler',
      'monitor': 'monitor', 'display': 'monitor',
      'keyboard': 'keyboard', 'mouse': 'mouse'
    };

    Object.entries(componentMap).forEach(([key, value]) => {
      if (message.includes(key)) componentType = value;
    });

    const budget = extractBudget(message);
    let purpose = 'general';
    if (message.includes('gaming')) purpose = 'gaming';
    if (message.includes('workstation')) purpose = 'workstation';
    if (message.includes('budget')) purpose = 'budget';

    const recommendations = generatePCPartRecommendation(componentType, budget, purpose, componentData);

    if (recommendations.length > 0) {
      response.content = `💡 Top ${componentType.toUpperCase()} recommendations${budget ? ` under ₱${budget.toLocaleString()}` : ''}:\n\n`;
      recommendations.forEach((product, index) => {
        response.content += `${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}\n`;
        productCards.push(generateProductCard(product));
      });
    } else {
      response.content = `❌ No ${componentType} found matching your criteria. Try adjusting your budget or requirements.`;
    }
  }
  // Product comparison
  else if (message.includes('compare') || message.includes('vs') || message.includes('difference') || message.includes('versus')) {
    if (productNames.length >= 2) {
      const productsToCompare = productNames.map(name =>
        allItems.find(p => p.name.toLowerCase().includes(name))
      ).filter(Boolean);

      if (productsToCompare.length >= 2) {
        response.content = generateComparison(productsToCompare);
        productsToCompare.forEach(product => {
          productCards.push(generateProductCard(product));
        });
      } else {
        response.content = "I need at least two valid product names to compare. Which products would you like to compare?";
      }
    } else {
      response.content = "Please specify at least two products to compare (e.g., 'compare Product A vs Product B').";
    }
  }
  // Technical specifications
  else if (message.includes('spec') || message.includes('specs') || message.includes('technical') || message.includes('details')) {
    if (productNames.length > 0) {
      const product = allItems.find(p =>
        p.name.toLowerCase().includes(productNames[0])
      );
      if (product) {
        response.content = generateSpecifications(product);
        productCards.push(generateProductCard(product));
      } else {
        response.content = "I couldn't find that product. Could you specify the exact product name?";
      }
    } else {
      response.content = "Which product's specifications would you like to see?";
    }
  }
  // Budget recommendations
  else if (message.includes('budget') || message.includes('under') || message.includes('affordable') || message.includes('cheap')) {
    const budget = extractBudget(message) || 30000; // Default budget if not specified
    products = allItems.filter(p => p.price <= budget)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.price - b.price)
      .slice(0, 5);

    if (products.length > 0) {
      response.content = `💸 Best products under ₱${budget.toLocaleString()}:\n`;
      products.forEach((product, index) => {
        response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
        if (product.rating) response.content += ` ⭐${product.rating}/5`;
        productCards.push(generateProductCard(product));
      });
    } else {
      response.content = `No products found under ₱${budget.toLocaleString()}. Try a higher budget or ask for recommendations.`;
    }
  }
  // Series and features inquiry
  else if (message.includes('series') || message.includes('model') || message.includes('feature')) {
    const matchingSeries = filterOptions.series.filter(series =>
      message.toLowerCase().includes(series.toLowerCase())
    );

    if (matchingSeries.length > 0) {
      products = allItems.filter(item =>
        item.series && matchingSeries.some(series =>
          item.series.toLowerCase().includes(series.toLowerCase())
        )
      );
      if (products.length > 0) {
        response.content = `📊 Products in ${matchingSeries.join(', ')} series:\n`;
        products.forEach((product, index) => {
          response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()}`;
          productCards.push(generateProductCard(product));
        });
      } else {
        response.content = `No products found in the ${matchingSeries.join(', ')} series.`;
      }
    } else {
      response.content = `Available series: ${filterOptions.series.join(', ')}\n\nWhich series are you interested in?`;
    }
  }
  // Default response
  else {
    response.content = "I'm here to help you find the perfect tech products at TechnoBuild! 🚀 You can:\n• Ask about specific products\n• Get recommendations\n• Build custom PCs\n• Compare products\n• Filter by specifications\n\nWhat would you like to explore today?";
  }

  setIsTyping(false);
  return { response, productCards, pcBuild };
};