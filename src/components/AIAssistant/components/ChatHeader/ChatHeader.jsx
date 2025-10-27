//client/src/components/AIAssistant/components/ChatHeader/ChatHeader.jsx
import React from 'react';
import styles from '../../AIAssistant.module.css';


/**
 * Chat header component with title and controls
 * @param {object} props - Component props
 * @param {function} props.onClose - Function to close the chat
 * @param {function} props.onToggleAIMode - Function to toggle AI mode
 * @param {boolean} props.useGeminiAI - Whether AI mode is enabled
 * @returns {JSX.Element} Chat header component
 */
const ChatHeader = ({ onClose, onToggleAIMode, useGeminiAI }) => {
  return (
    <div className={styles.chatHeader}>
      <h3>TechnoBuild Shopping Assistant</h3>
      <div className={styles.headerControls}>
        <button
          className={`${styles.aiToggle} ${useGeminiAI ? styles.aiMode : styles.ruleMode}`}
          onClick={onToggleAIMode}
          aria-label="Toggle AI Mode"
          type="button"
        >
          <div className={`${styles.toggleKnob} ${useGeminiAI ? styles.knobAI : styles.knobRule}`}>
            {useGeminiAI ? (
              <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="#0dcaf0">
                <path d="M12 2a5 5 0 00-5 5v3H5a3 3 0 00-3 3v7h6v2a2 2 0 004 0v-2h6v-7a3 3 0 00-3-3h-2V7a5 5 0 00-5-5z" />
              </svg>
            ) : (
              <svg className={styles.toggleIcon} viewBox="0 0 24 24" fill="#f8f9fa">
                <path d="M19.14 12.936a7.07 7.07 0 000-1.872l2.03-1.578a.5.5 0 00.12-.65l-1.924-3.328a.5.5 0 00-.607-.22l-2.39.96a7.11 7.11 0 00-1.62-.936l-.36-2.54a.5.5 0 00-.497-.422h-3.848a.5.5 0 00-.497.422l-.36 2.54a7.11 7.11 0 00-1.62.936l-2.39-.96a.5.5 0 00-.607.22L2.71 8.836a.5.5 0 00.12.65l2.03 1.578a7.07 7.07 0 000 1.872l-2.03 1.578a.5.5 0 00-.12.65l1.924 3.328a.5.5 0 00.607.22l2.39-.96c.495.392 1.04.715 1.62.936l.36 2.54a.5.5 0 00.497.422h3.848a.5.5 0 00.497-.422l.36-2.54c.58-.221 1.125-.544 1.62-.936l2.39.96a.5.5 0 00.607-.22l1.924-3.328a.5.5 0 00-.12-.65l-2.03-1.578zM12 15a3 3 0 110-6 3 3 0 010 6z" />
              </svg>
            )}
          </div>
        </button>

        <button onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default ChatHeader;