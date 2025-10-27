//client/src/components/AIAssistant/components/MessageList/MessageList.jsx
import React from 'react';
import MessageItem from '../MessageItem/MessageItem';
import styles from '../../AIAssistant.module.css';

/**
 * Message list component that displays all messages
 * @param {object} props - Component props
 * @param {array} props.messages - Array of messages
 * @param {function} props.onProductAction - Function to handle product actions
 * @param {function} props.onPCBuildAction - Function to handle PC build actions
 * @param {boolean} props.isTyping - Whether the AI is typing
 * @param {object} props.messagesEndRef - Ref for scrolling to bottom
 * @returns {JSX.Element} Message list component
 */
const MessageList = ({ messages, onProductAction, onPCBuildAction, isTyping, messagesEndRef }) => {
  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onProductAction={onProductAction}
          onPCBuildAction={onPCBuildAction}
        />
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
  );
};

export default MessageList;