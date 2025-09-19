//client/src/components/AIAssistant/hooks/useAIAssistant.js

import { useState } from 'react';
import { enhancedProcessMessage } from './aiProcessor';


/**
 * Custom hook for AI Assistant state and logic
 * @returns {object} AI Assistant state and functions
 */
export const useAIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your TechnoBuild shopping assistant. How can I help you today? You can ask about products, get recommendations, request help filtering options, or build a custom PC!",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [useGeminiAI, setUseGeminiAI] = useState(true);

  /**
   * Handles sending a message
   * @param {string} messageText - Message text to send
   */
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Get AI response
    const { response, productCards, pcBuild } = await enhancedProcessMessage(
      messageText, 
      useGeminiAI, 
      setMessages,
      setIsTyping
    );

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

    // Add PC build if any
    if (pcBuild) {
      setMessages(prev => [...prev, {
        id: Date.now() + 100,
        ...pcBuild,
        sender: 'bot',
      }]);
    }
  };

  /**
   * Handles product actions (view, buy, add to cart)
   * @param {string} action - Action type
   * @param {object} product - Product object
   */
  const handleProductAction = (action, product) => {
    let actionMessage = '';

    switch (action) {
      case 'view':
        actionMessage = `Viewing details for ${product.name}`;
        window.open(`/products/${product.id}`, '_blank');
        break;
      case 'buy':
        actionMessage = `Proceeding to buy ${product.name}`;
        console.log('Buy now:', product);
        break;
      case 'cart':
        actionMessage = `Added ${product.name} to cart`;
        console.log('Add to cart:', product);
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

  /**
   * Handles PC build actions (save, customize, buy)
   * @param {string} action - Action type
   * @param {object} build - PC build object
   * @param {number} totalPrice - Total price of the build
   */
  const handlePCBuildAction = (action, build, totalPrice) => {
    let actionMessage = '';

    switch (action) {
      case 'save':
        actionMessage = `Saving PC build configuration (₱${totalPrice.toLocaleString()})`;
        console.log('Saving build:', build);
        break;
      case 'customize':
        actionMessage = `Customizing PC build`;
        console.log('Customizing build:', build);
        break;
      case 'buy':
        actionMessage = `Proceeding to buy complete PC build`;
        console.log('Buying build:', build);
        break;
      default:
        actionMessage = `Action performed on PC build`;
    }

    const actionMessageObj = {
      id: Date.now(),
      text: actionMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, actionMessageObj]);

    const botConfirmation = {
      id: Date.now() + 1,
      text: `Excellent choice! I've ${action}ed your PC build configuration totaling ₱${totalPrice.toLocaleString()}. Would you like to make any adjustments or see individual components?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, botConfirmation]);
  };

  /**
   * Toggles between AI and rule-based modes
   */
  const toggleAIMode = () => {
    setUseGeminiAI(!useGeminiAI);
    const modeMessage = {
      id: Date.now(),
      text: `Switched to ${!useGeminiAI ? 'AI-powered' : 'rule-based'} mode`,
      sender: 'system',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, modeMessage]);
  };

  return {
    messages,
    inputText,
    setInputText,
    isOpen,
    setIsOpen,
    isTyping,
    useGeminiAI,
    handleSendMessage,
    handleProductAction,
    handlePCBuildAction,
    toggleAIMode
  };
};