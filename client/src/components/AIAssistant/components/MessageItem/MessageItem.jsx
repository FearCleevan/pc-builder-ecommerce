//client/src/components/AIAssistant/components/MessageItem/MessageItem.jsx
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import PCBuildCard from '../PCBuildCard/PCBuildCard';
import styles from '../../AIAssistant.module.css';

/**
 * Individual message item component
 * @param {object} props - Component props
 * @param {object} props.message - Message object
 * @param {function} props.onProductAction - Function to handle product actions
 * @param {function} props.onPCBuildAction - Function to handle PC build actions
 * @returns {JSX.Element} Message item component
 */
const MessageItem = ({ message, onProductAction, onPCBuildAction }) => {
  return (
    <div
      className={`${styles.message} ${message.sender === 'user' ? styles.userMessage :
        message.sender === 'system' ? styles.systemMessage : styles.botMessage
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
        <ProductCard
          product={message.product}
          onAction={onProductAction}
        />
      ) : message.type === 'pcBuild' ? (
        <PCBuildCard
          build={message.build}
          totalPrice={message.totalPrice}
          purpose={message.purpose}
          onAction={onPCBuildAction}
        />
      ) : null}
    </div>
  );
};

export default MessageItem;