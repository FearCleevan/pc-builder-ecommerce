// client/src/components/Main/MainSeventhContainer.jsx
import React from 'react';
import { FaRobot, FaCog, FaBalanceScale, FaMagic } from 'react-icons/fa';
import styles from './MainSeventhContainer.module.css';

const MainSeventhContainer = () => {
  return (
    <section className={styles.builderCta}>
      <div className={styles.builderContent}>
        <div className={styles.builderHeader}>
          <FaRobot className={styles.builderIcon} />
          <h2>AI-Powered PC Builder</h2>
        </div>
        <p>Our intelligent system will help you build the perfect PC based on your budget and needs</p>
        <ul className={styles.builderFeatures}>
          <li>
            <FaCog className={styles.featureIcon} />
            <span>Budget-based recommendations</span>
          </li>
          <li>
            <FaBalanceScale className={styles.featureIcon} />
            <span>Compatibility checking</span>
          </li>
          <li>
            <FaMagic className={styles.featureIcon} />
            <span>Performance optimization</span>
          </li>
        </ul>
        <button className={styles.ctaButton}>
          <FaRobot />
          <span>Try PC Builder AI</span>
        </button>
      </div>
      <div className={styles.builderVisual}>
        <div className={styles.builderAnimation}>
          <div className={styles.cpuChip}></div>
          <div className={styles.gpuCard}></div>
          <div className={styles.ramStick}></div>
          <div className={styles.aiOrb}>
            <div className={styles.pulse}></div>
            <FaRobot className={styles.aiIcon} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSeventhContainer;