// client/src/components/AIAssistant/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { allProducts, laptopProducts, desktopProducts, otherProducts, accessoriesProducts } from '../MockData/MockData';
import { categories, getSeriesItems, getFeatures, gpuOptions, processorOptions, screenSizeOptions, ramOptions, storageOptions } from '../MockData/LaptopMockData';
import styles from './AIAssistant.module.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your MSI shopping assistant. How can I help you today? You can ask about products, get recommendations, or request help filtering options.",
      sender: 'bot',
      timestamp: new Date()
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

  // Process user message and generate response
  const processMessage = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const message = userMessage.toLowerCase();
    let response = '';
    let products = [];

    // Greeting responses
    if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
      response = "Hello! How can I assist you with your MSI product search today?";
    }
    // Help command
    else if (message.includes('help') || message.includes('what can you do')) {
      response = "I can help you:\n• Find products based on your needs\n• Provide recommendations\n• Compare products\n• Give sales information\n• Answer questions about specifications\n• Help with filtering options\n\nWhat would you like to do?";
    }
    // Product search
    else if (message.includes('find') || message.includes('search') || message.includes('looking for')) {
      products = searchProducts(userMessage);
      if (products.length > 0) {
        response = `I found ${products.length} products matching your search:\n`;
        products.forEach((product, index) => {
          response += `\n${index + 1}. ${product.name} - ₱${product.price.toLocaleString()} (Rating: ${product.rating}/5)`;
        });
        response += "\n\nWould you like more details about any of these?";
      } else {
        response = "I couldn't find any products matching your search. Could you try different keywords or ask for recommendations?";
      }
    }
    // Recommendations
    else if (message.includes('recommend') || message.includes('suggest') || message.includes('what should')) {
      products = generateRecommendations(userMessage);
      if (products.length > 0) {
        response = "Based on your needs, I recommend:\n";
        products.forEach((product, index) => {
          response += `\n${index + 1}. ${product.name} - ${generateSalesPitch(product)}`;
        });
      } else {
        response = "I'd be happy to recommend products! Could you tell me what you're looking for? (gaming, business, creative work, etc.)";
      }
    }
    // Price questions
    else if (message.includes('price') || message.includes('how much') || message.includes('cost')) {
      const productMatch = allProducts.find(p => 
        p.name.toLowerCase().includes(message.split('price')[0].trim()) ||
        message.includes(p.name.toLowerCase())
      );
      
      if (productMatch) {
        response = `The ${productMatch.name} is priced at ₱${productMatch.price.toLocaleString()}`;
        if (productMatch.oldPrice) {
          response += ` (originally ₱${productMatch.oldPrice.toLocaleString()}, you save ₱${(productMatch.oldPrice - productMatch.price).toLocaleString()})`;
        }
        response += `. ${generateSalesPitch(productMatch)}`;
      } else {
        response = "I'm not sure which product you're asking about. Could you specify the product name?";
      }
    }
    // Filtering help
    else if (message.includes('filter') || message.includes('category') || message.includes('spec')) {
      response = "I can help you filter products by:\n• Category (Gaming, Business, etc.)\n• Price range\n• Specifications (GPU, CPU, RAM)\n• Ratings\n\nWhat type of products are you interested in?";
    }
    // Default response
    else {
      response = "I'm here to help you find the perfect MSI product! You can ask me about specific products, get recommendations, or ask for help filtering options. What are you looking for today?";
    }

    setIsTyping(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get AI response
    const aiResponse = await processMessage(inputText);
    
    // Add AI response
    const botMessage = {
      id: Date.now() + 1,
      text: aiResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
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