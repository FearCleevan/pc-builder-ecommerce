//client/src/components/AIAssistant/components/InputArea/InputArea.jsx
import React from 'react';
import styles from '../../AIAssistant.module.css';

/**
 * Input area component for sending messages
 * @param {object} props - Component props
 * @param {string} props.inputText - Current input text
 * @param {function} props.onInputChange - Function to handle input changes
 * @param {function} props.onSendMessage - Function to send message
 * @param {boolean} props.isTyping - Whether the AI is typing
 * @returns {JSX.Element} Input area component
 */
const InputArea = ({ inputText, onInputChange, onSendMessage, isTyping }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about products, get recommendations, build a PC..."
        disabled={isTyping}
      />
      <button
        onClick={onSendMessage}
        disabled={isTyping || !inputText.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default InputArea;