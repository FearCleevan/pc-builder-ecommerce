//client/src/components/AIAssistant/components/QuickSuggestions/QuickSuggestions.jsx
import React from 'react';
import styles from '../../AIAssistant.module.css';

/**
 * Quick suggestions component for common questions
 * @param {object} props - Component props
 * @param {function} props.onSuggestionClick - Function to handle suggestion clicks
 * @returns {JSX.Element} Quick suggestions component
 */
const QuickSuggestions = ({ onSuggestionClick }) => {
  const suggestions = [
    { text: "Build a gaming PC under 50k", label: "Gaming PC Build" },
    { text: "Recommend a CPU for gaming", label: "CPU Recommendation" },
    { text: "Best GPU under 30k", label: "GPU Suggestion" }
  ];

  return (
    <div className={styles.quickSuggestions}>
      <span>Quick questions:</span>
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.text)}
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  );
};

export default QuickSuggestions;