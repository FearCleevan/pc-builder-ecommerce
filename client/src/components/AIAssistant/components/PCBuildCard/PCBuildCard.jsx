//client/src/components/AIAssistant/components/PCBuildCard/PCBuildCard.jsx
import React from 'react';
import styles from '../../AIAssistant.module.css';

/**
 * PC build card component for displaying PC build configurations
 * @param {object} props - Component props
 * @param {object} props.build - PC build object
 * @param {number} props.totalPrice - Total price of the build
 * @param {string} props.purpose - Purpose of the build
 * @param {function} props.onAction - Function to handle PC build actions
 * @returns {JSX.Element} PC build card component
 */
const PCBuildCard = ({ build, totalPrice, purpose, onAction }) => {
  return (
    <div className={styles.pcBuild}>
      <h4>{purpose.charAt(0).toUpperCase() + purpose.slice(1)} PC Build - ₱{totalPrice.toLocaleString()}</h4>
      <div className={styles.buildComponents}>
        {Object.entries(build).map(([type, component]) => (
          <div key={type} className={styles.buildComponentCard}>
            <div className={styles.componentImage}>
              <img src={component.img} alt={component.name} />
            </div>
            <div className={styles.componentInfo}>
              <h5>{type.toUpperCase()}</h5>
              <p className={styles.componentName}>{component.name}</p>
              <div className={styles.componentSpecs}>
                {component.specs && Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
                  <span key={key} className={styles.specItem}>{key}: {value}</span>
                ))}
              </div>
              <p className={styles.componentPrice}>₱{component.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buildTotal}>
        <strong>Total: ₱{totalPrice.toLocaleString()}</strong>
      </div>
      <div className={styles.buildActions}>
        <button
          className={styles.saveBuildButton}
          onClick={() => onAction('save', build, totalPrice)}
        >
          Save Build
        </button>
        <button
          className={styles.customizeButton}
          onClick={() => onAction('customize', build, totalPrice)}
        >
          Customize
        </button>
        <button
          className={styles.buyBuildButton}
          onClick={() => onAction('buy', build, totalPrice)}
        >
          Buy Complete Build
        </button>
      </div>
    </div>
  );
};

export default PCBuildCard;