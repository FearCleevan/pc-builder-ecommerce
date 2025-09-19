import React from 'react';

// Import custom hooks
import { useAIAssistant } from './hooks/useAIAssistant';
import { useScrollToBottom } from './hooks/useScrollToBottom';

// Import components
import ChatHeader from './components/ChatHeader/ChatHeader';
import MessageList from './components/MessageList/MessageList';
import InputArea from './components/InputArea/InputArea';
import QuickSuggestions from './components/QuickSuggestions/QuickSuggestions';

// Import styles
import styles from './AIAssistant.module.css';

/**
 * Main AI Assistant component
 * Provides a chat interface for product recommendations, PC building, and technical assistance
 */
const AIAssistant = () => {
  // Use custom hooks for state management
  const {
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
    toggleAIMode,
  } = useAIAssistant();

  // Use custom hook for scrolling to bottom
  const { messagesEndRef } = useScrollToBottom();

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestionText) => {
    setInputText(suggestionText);
  };

  return (
    <div className={styles.aiAssistant}>
      {/* Toggle button for opening/closing the chat */}
      <button
        className={styles.chatToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>AI Assistant</span>
        <span>💬</span>
        <span className={styles.aiStatusIndicator} data-active={useGeminiAI}>
          {useGeminiAI ? 'AI' : 'RB'}
        </span>
      </button>

      {isOpen && (
        <div className={styles.chatContainer}>
          {/* Chat header with title and controls */}
          <ChatHeader
            onClose={() => setIsOpen(false)}
            onToggleAIMode={toggleAIMode}
            useGeminiAI={useGeminiAI}
          />

          {/* Message list displaying all messages */}
          <MessageList
            messages={messages}
            onProductAction={handleProductAction}
            onPCBuildAction={handlePCBuildAction}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />

          {/* Input area for sending messages */}
          <InputArea
            inputText={inputText}
            onInputChange={setInputText}
            onSendMessage={() => handleSendMessage(inputText)}
            isTyping={isTyping}
          />

          {/* Quick suggestions for common questions */}
          <QuickSuggestions onSuggestionClick={handleSuggestionClick} />
        </div>
      )}
    </div>
  );
};

export default AIAssistant;