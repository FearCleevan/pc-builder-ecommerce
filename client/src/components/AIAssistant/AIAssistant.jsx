// client/src/components/AIAssistant/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { allProducts } from '../MockData/allProducts';
import { laptopProducts } from '../MockData/laptopProducts';
import { desktopProducts } from '../MockData/desktopProducts';
import { otherProducts } from '../MockData/otherProducts';
import { accessoriesProducts } from '../MockData/accessoriesProducts';
import { categories, getSeriesItems, getFeatures, gpuOptions, processorOptions, screenSizeOptions, ramOptions, storageOptions } from '../MockData/LaptopMockData';
import styles from './AIAssistant.module.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your MSI shopping assistant. How can I help you today? You can ask about products, get recommendations, or request help filtering options.",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Helper functions
  const extractProductNames = (message) => {
    const productKeywords = allProducts.map(p => p.name.toLowerCase());
    return productKeywords.filter(keyword => 
      message.toLowerCase().includes(keyword)
    );
  };

  const extractProductName = (message) => {
    const products = allProducts.filter(p => 
      message.toLowerCase().includes(p.name.toLowerCase())
    );
    return products.length > 0 ? products[0].name.toLowerCase() : '';
  };

  const extractBudget = (message) => {
    const budgetMatch = message.match(/(\d+)(?:\s*(?:k|thousand))?/i);
    return budgetMatch ? parseInt(budgetMatch[1]) * (budgetMatch[2] ? 1000 : 1) : null;
  };

  const generateComparison = (products) => {
    if (products.length < 2) return "I need at least two products to compare.";
    
    let comparison = "Here's a comparison of the products:\n\n";
    
    products.forEach((product, index) => {
      comparison += `${index + 1}. ${product.name}\n`;
      comparison += `   Price: ₱${product.price.toLocaleString()}\n`;
      comparison += `   Rating: ${product.rating}/5\n`;
      comparison += `   Category: ${product.category}\n\n`;
    });
    
    return comparison;
  };

  const generateSpecifications = (product) => {
    let specs = `Specifications for ${product.name}:\n\n`;
    specs += `• Brand: ${product.brand}\n`;
    specs += `• Price: ₱${product.price.toLocaleString()}\n`;
    specs += `• Rating: ${product.rating}/5 (${product.reviews} reviews)\n`;
    specs += `• Category: ${product.category}\n`;
    
    if (product.specs) {
      if (product.specs.gpu) specs += `• GPU: ${product.specs.gpu.replace('rtx', 'RTX ')}\n`;
      if (product.specs.processor) specs += `• Processor: ${product.specs.processor}\n`;
      if (product.specs.screenSize) specs += `• Screen Size: ${product.specs.screenSize}"\n`;
      if (product.specs.ram) specs += `• RAM: ${product.specs.ram}\n`;
      if (product.specs.storage) specs += `• Storage: ${product.specs.storage}\n`;
    }
    
    specs += `\n${product.description}`;
    return specs;
  };

  // Product search and filtering logic
  const searchProducts = (query, filters = {}) => {
    let results = [...allProducts];
    
    // Simple text search
    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      results = results.filter(product => 
        searchTerms.some(term => 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        )
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(product => product.category === filters.category);
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(product => product.price >= min && product.price <= max);
    }

    if (filters.rating) {
      results = results.filter(product => product.rating >= parseFloat(filters.rating));
    }

    return results.slice(0, 5); // Return top 5 results
  };

  // Generate product recommendations based on user needs
  const generateRecommendations = (userNeeds) => {
    let recommendations = [];
    
    if (userNeeds.includes('gaming') || userNeeds.includes('game')) {
      recommendations = [
        ...allProducts.filter(p => p.category === 'Gaming Laptops' || p.subcategory === 'gaming'),
        ...desktopProducts.filter(p => p.series === 'gaming-series')
      ];
    }
    
    if (userNeeds.includes('business') || userNeeds.includes('work')) {
      recommendations = [
        ...allProducts.filter(p => p.category === 'Business Laptops'),
        ...desktopProducts.filter(p => p.series === 'workstation-series')
      ];
    }
    
    if (userNeeds.includes('creative') || userNeeds.includes('design')) {
      recommendations = [
        ...allProducts.filter(p => p.category === 'Content Creation Laptops'),
        ...desktopProducts.filter(p => p.series === 'workstation-series')
      ];
    }

    // Sort by rating and price
    return recommendations
      .sort((a, b) => b.rating - a.rating || a.price - b.price)
      .slice(0, 3);
  };

  // Generate sales pitch for a product
  const generateSalesPitch = (product) => {
    const pitches = {
      'Gaming Laptops': `The ${product.name} is perfect for gaming with its ${product.specs?.gpu?.replace('rtx', 'RTX ') || 'powerful graphics'} and high-performance specs.`,
      'Content Creation Laptops': `Ideal for creative work, the ${product.name} offers color-accurate displays and powerful processing for your projects.`,
      'Business Laptops': `The ${product.name} provides enterprise-grade security and reliability for professional use with long battery life.`,
      'Desktop': `This ${product.name} desktop delivers exceptional performance with ${product.description.toLowerCase()}.`,
      'default': `The ${product.name} is a great choice with a ${product.rating}/5 rating from ${product.reviews} customers.`
    };

    return pitches[product.category] || pitches.default;
  };

  // Generate product card component
  const generateProductCard = (product) => {
    return {
      type: 'productCard',
      product: product,
      timestamp: new Date()
    };
  };

  // Enhanced AI processing with more capabilities
  const enhancedProcessMessage = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const message = userMessage.toLowerCase();
    let response = { type: 'text', content: '' };
    let products = [];
    let productCards = [];

    // Greeting responses
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      response.content = "Hello! How can I assist you with your MSI product search today?";
    }
    // Help command
    else if (message.includes('help') || message.includes('what can you do')) {
      response.content = "I can help you:\n• Find products based on your needs\n• Provide recommendations\n• Compare products\n• Give sales information\n• Answer questions about specifications\n• Help with filtering options\n\nWhat would you like to do?";
    }
    // Product search
    else if (message.includes('find') || message.includes('search') || message.includes('looking for')) {
      products = searchProducts(userMessage);
      if (products.length > 0) {
        response.content = `I found ${products.length} products matching your search:\n`;
        products.forEach((product, index) => {
          response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()} (Rating: ${product.rating}/5)`;
          productCards.push(generateProductCard(product));
        });
        response.content += "\n\nWould you like more details about any of these?";
      } else {
        response.content = "I couldn't find any products matching your search. Could you try different keywords or ask for recommendations?";
      }
    }
    // Recommendations
    else if (message.includes('recommend') || message.includes('suggest') || message.includes('what should')) {
      products = generateRecommendations(userMessage);
      if (products.length > 0) {
        response.content = "Based on your needs, I recommend:\n";
        products.forEach((product, index) => {
          response.content += `\n${index + 1}. ${product.name} - ${generateSalesPitch(product)}`;
          productCards.push(generateProductCard(product));
        });
      } else {
        response.content = "I'd be happy to recommend products! Could you tell me what you're looking for? (gaming, business, creative work, etc.)";
      }
    }
    // Price questions
    else if (message.includes('price') || message.includes('how much') || message.includes('cost')) {
      const productMatch = allProducts.find(p => 
        p.name.toLowerCase().includes(message.split('price')[0].trim()) ||
        message.includes(p.name.toLowerCase())
      );
      
      if (productMatch) {
        response.content = `The ${productMatch.name} is priced at ₱${productMatch.price.toLocaleString()}`;
        if (productMatch.oldPrice) {
          response.content += ` (originally ₱${productMatch.oldPrice.toLocaleString()}, you save ₱${(productMatch.oldPrice - productMatch.price).toLocaleString()})`;
        }
        response.content += `. ${generateSalesPitch(productMatch)}`;
        productCards.push(generateProductCard(productMatch));
      } else {
        response.content = "I'm not sure which product you're asking about. Could you specify the product name?";
      }
    }
    // Filtering help
    else if (message.includes('filter') || message.includes('category') || message.includes('spec')) {
      response.content = "I can help you filter products by:\n• Category (Gaming, Business, etc.)\n• Price range\n• Specifications (GPU, CPU, RAM)\n• Ratings\n\nWhat type of products are you interested in?";
    }
    // Product comparison
    else if (message.includes('compare') || message.includes('vs') || message.includes('difference')) {
      const productNames = extractProductNames(message);
      if (productNames.length >= 2) {
        const productsToCompare = productNames.map(name => 
          allProducts.find(p => p.name.toLowerCase().includes(name))
        ).filter(Boolean);
        
        if (productsToCompare.length >= 2) {
          response.content = generateComparison(productsToCompare);
          productsToCompare.forEach(product => {
            productCards.push(generateProductCard(product));
          });
        } else {
          response.content = "I need at least two product names to compare. Which products would you like to compare?";
        }
      }
    }
    // Technical specifications
    else if (message.includes('spec') || message.includes('specs') || message.includes('technical')) {
      const productName = extractProductName(message);
      if (productName) {
        const product = allProducts.find(p => 
          p.name.toLowerCase().includes(productName)
        );
        if (product) {
          response.content = generateSpecifications(product);
          productCards.push(generateProductCard(product));
        } else {
          response.content = "I couldn't find that product. Could you specify the exact product name?";
        }
      }
    }
    // Budget recommendations
    else if (message.includes('budget') || (message.includes('under') && message.includes('php'))) {
      const budget = extractBudget(message);
      if (budget) {
        products = allProducts.filter(p => p.price <= budget)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        
        if (products.length > 0) {
          response.content = `Here are the best products under ₱${budget.toLocaleString()}:\n`;
          products.forEach((product, index) => {
            response.content += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()} (Rating: ${product.rating}/5)`;
            productCards.push(generateProductCard(product));
          });
        } else {
          response.content = `I couldn't find products under ₱${budget.toLocaleString()}. Would you like to see products in a higher budget range?`;
        }
      }
    }
    // Default response
    else {
      response.content = "I'm here to help you find the perfect MSI product! You can ask me about specific products, get recommendations, or ask for help filtering options. What are you looking for today?";
    }

    setIsTyping(false);
    return { response, productCards };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get AI response
    const { response, productCards } = await enhancedProcessMessage(inputText);
    
    // Add AI response
    const botMessage = {
      id: Date.now() + 1,
      text: response.content,
      sender: 'bot',
      timestamp: new Date(),
      type: response.type
    };

    setMessages(prev => [...prev, botMessage]);
    
    // Add product cards if any
    if (productCards && productCards.length > 0) {
      productCards.forEach((card, index) => {
        setMessages(prev => [...prev, {
          id: Date.now() + 2 + index,
          ...card,
          sender: 'bot',
        }]);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleProductAction = (action, product) => {
    let actionMessage = '';
    
    switch(action) {
      case 'view':
        actionMessage = `Viewing details for ${product.name}`;
        // In a real app, you would navigate to the product page
        break;
      case 'buy':
        actionMessage = `Proceeding to buy ${product.name}`;
        // In a real app, you would redirect to checkout
        break;
      case 'cart':
        actionMessage = `Added ${product.name} to cart`;
        // In a real app, you would add to cart
        break;
      default:
        actionMessage = `Action performed on ${product.name}`;
    }
    
    // Add user action message
    const actionMessageObj = {
      id: Date.now(),
      text: actionMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, actionMessageObj]);
    
    // Add bot confirmation
    const botConfirmation = {
      id: Date.now() + 1,
      text: `Great! I've processed your request for the ${product.name}. Is there anything else I can help you with?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, botConfirmation]);
  };

  return (
    <div className={styles.aiAssistant}>
      <button 
        className={styles.chatToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>AI Assistant</span>
        <span>💬</span>
      </button>

      {isOpen && (
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h3>MSI Shopping Assistant</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.userMessage : styles.botMessage
                }`}
              >
                {message.type === 'text' ? (
                  <>
                    <div className={styles.messageContent}>
                      {message.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    <span className={styles.timestamp}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </>
                ) : message.type === 'productCard' ? (
                  <div className={styles.productCard}>
                    <div className={styles.productImage}>
                      <img src={message.product.img} alt={message.product.name} />
                    </div>
                    <div className={styles.productInfo}>
                      <h4>{message.product.name}</h4>
                      <p className={styles.productBrand}>{message.product.brand}</p>
                      <p className={styles.productDescription}>{message.product.description}</p>
                      <div className={styles.productPrice}>
                        <span className={styles.currentPrice}>₱{message.product.price.toLocaleString()}</span>
                        {message.product.oldPrice && (
                          <span className={styles.oldPrice}>₱{message.product.oldPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className={styles.productRating}>
                        <span className={styles.ratingStars}>
                          {'★'.repeat(Math.floor(message.product.rating))}
                          {'☆'.repeat(5 - Math.floor(message.product.rating))}
                        </span>
                        <span className={styles.ratingText}>({message.product.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className={styles.productActions}>
                      <button 
                        className={styles.viewButton}
                        onClick={() => handleProductAction('view', message.product)}
                      >
                        View Product
                      </button>
                      <button 
                        className={styles.cartButton}
                        onClick={() => handleProductAction('cart', message.product)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className={styles.buyButton}
                        onClick={() => handleProductAction('buy', message.product)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
            
            {isTyping && (
              <div className={styles.typingIndicator}>
                <span>AI Assistant is typing</span>
                <div className={styles.typingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about products, get recommendations..."
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || !inputText.trim()}
            >
              Send
            </button>
          </div>

          <div className={styles.quickSuggestions}>
            <span>Quick questions:</span>
            <button onClick={() => setInputText("Recommend a gaming laptop")}>
              Gaming laptop
            </button>
            <button onClick={() => setInputText("Show me business laptops under 70k")}>
              Business laptops
            </button>
            <button onClick={() => setInputText("Best desktop for creative work")}>
              Creative desktop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;