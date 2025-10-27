//client/src/components/AIAssistant/hooks/useScrollToBottom.js

import { useRef, useEffect } from 'react';

/**
 * Custom hook to automatically scroll to the bottom of a container
 * @returns {object} Ref to attach to the container and scroll function
 */
export const useScrollToBottom = () => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return { messagesEndRef, scrollToBottom };
};