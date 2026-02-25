import React from 'react';
import styles from './WattageModal.module.css';

const categoryLabelMap = {
  case: 'Case',
  cpu: 'CPU',
  motherboard: 'Motherboard',
  gpu: 'GPU',
  ram: 'RAM',
  cpuCooler: 'CPU Cooler',
  storage: 'Storage',
  powerSupply: 'Power Supply',
  caseFan: 'Case Fan',
  monitor: 'Monitor',
  mouse: 'Mouse',
  keyboard: 'Keyboard',
  speaker: 'Speaker',
  headphones: 'Headphones',
  microphone: 'Microphone',
  webcam: 'Webcam',
  thermalCompound: 'Thermal Compound',
  operatingSystem: 'Operating System',
  soundCard: 'Sound Card',
  networkCard: 'Network Card',
  captureCard: 'Capture Card',
  vrHeadset: 'VR Headset',
  accessory: 'Accessory'
};

const getCategoryLabel = (category) => categoryLabelMap[category] || category;

const WattageModal = ({ isOpen, onClose, wattageReport }) => {
  if (!isOpen) return null;

  const breakdown = wattageReport?.breakdown || [];
  const totalEstimatedWattage = wattageReport?.totalEstimatedWattage || 0;
  const recommendedPsuWattage = wattageReport?.recommendedPsuWattage || 0;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Estimated Wattage</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryCard}>
            <p className={styles.summaryLabel}>Estimated Usage</p>
            <p className={styles.summaryValue}>{totalEstimatedWattage} W</p>
          </div>
          <div className={styles.summaryCard}>
            <p className={styles.summaryLabel}>Recommended PSU</p>
            <p className={styles.summaryValue}>{recommendedPsuWattage} W</p>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Per-Component Power Draw</h3>
          {breakdown.length > 0 ? (
            <ul className={styles.breakdownList}>
              {breakdown.map((item) => (
                <li key={`${item.category}-${item.name}`} className={styles.breakdownItem}>
                  <div>
                    <p className={styles.componentCategory}>{getCategoryLabel(item.category)}</p>
                    <p className={styles.componentName}>{item.name}</p>
                  </div>
                  <p className={styles.componentWatts}>{item.watts} W</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyText}>No components selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WattageModal;
