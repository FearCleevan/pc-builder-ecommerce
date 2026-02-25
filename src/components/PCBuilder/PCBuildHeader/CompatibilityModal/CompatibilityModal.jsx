import React from 'react';
import styles from './CompatibilityModal.module.css';

const labelMap = {
  case: 'Case',
  cpu: 'CPU',
  motherboard: 'Motherboard',
  gpu: 'GPU',
  ram: 'RAM',
  cpuCooler: 'CPU Cooler',
  storage: 'Storage',
  powerSupply: 'Power Supply'
};

const getLabel = (id) => labelMap[id] || id;

const getValue = (component, specKey) => {
  if (!component) return 'Not selected';
  return component.specs?.[specKey] || 'N/A';
};

const CompatibilityModal = ({ isOpen, onClose, selectedComponents = {}, compatibilityReport, wattageReport }) => {
  if (!isOpen) return null;

  const hasIssues = compatibilityReport?.issues?.length > 0;
  const statusText = compatibilityReport?.isCompatible ? 'Compatible' : 'Needs Attention';

  const systemOverview = [
    {
      title: 'CPU / Motherboard Socket',
      left: selectedComponents.cpu ? `${selectedComponents.cpu.name} (${getValue(selectedComponents.cpu, 'Socket')})` : 'CPU not selected',
      right: selectedComponents.motherboard ? `${selectedComponents.motherboard.name} (${getValue(selectedComponents.motherboard, 'Socket')})` : 'Motherboard not selected'
    },
    {
      title: 'Motherboard / Case Form Factor',
      left: selectedComponents.motherboard ? `${selectedComponents.motherboard.name} (${getValue(selectedComponents.motherboard, 'Form Factor')})` : 'Motherboard not selected',
      right: selectedComponents.case ? `${selectedComponents.case.name} (${getValue(selectedComponents.case, 'Form Factor')})` : 'Case not selected'
    },
    {
      title: 'RAM Type Support',
      left: selectedComponents.ram ? `${selectedComponents.ram.name} (${getValue(selectedComponents.ram, 'RAM Type')})` : 'RAM not selected',
      right: selectedComponents.motherboard ? `${selectedComponents.motherboard.name} (${getValue(selectedComponents.motherboard, 'RAM Type')})` : 'Motherboard not selected'
    },
    {
      title: 'Power Headroom',
      left: `Estimated: ${wattageReport?.totalEstimatedWattage || 0} W`,
      right: selectedComponents.powerSupply
        ? `PSU: ${getValue(selectedComponents.powerSupply, 'Wattage')} (Recommended ${wattageReport?.recommendedPsuWattage || 0} W)`
        : 'Power Supply not selected'
    }
  ];

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Product Compatibility</h2>
          <button className={styles.closeButton} onClick={onClose} type="button">
            ×
          </button>
        </div>

        <div className={styles.statusRow}>
          <span className={`${styles.badge} ${compatibilityReport?.isCompatible ? styles.ok : styles.warn}`}>
            {statusText}
          </span>
          <span className={styles.helperText}>
            {hasIssues ? `${compatibilityReport.issues.length} issue(s) detected` : 'No conflicts found'}
          </span>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>System Specs Overview</h3>
          <div className={styles.overviewList}>
            {systemOverview.map((item) => (
              <div key={item.title} className={styles.overviewCard}>
                <p className={styles.cardTitle}>{item.title}</p>
                <p className={styles.cardValue}>{item.left}</p>
                <p className={styles.cardValue}>{item.right}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Selected Components</h3>
          <div className={styles.componentList}>
            {Object.entries(selectedComponents)
              .filter(([, component]) => component)
              .map(([category, component]) => (
                <div key={category} className={styles.componentItem}>
                  <span className={styles.componentCategory}>{getLabel(category)}</span>
                  <span className={styles.componentName}>{component.name}</span>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Compatibility Issues</h3>
          {hasIssues ? (
            <ul className={styles.issueList}>
              {compatibilityReport.issues.map((issue) => (
                <li key={issue.id} className={`${styles.issueItem} ${issue.level === 'error' ? styles.error : styles.warning}`}>
                  {issue.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyText}>All selected components are compatible.</p>
          )}
          {compatibilityReport?.missingRequired?.length > 0 && (
            <p className={styles.missingText}>
              Missing required parts: {compatibilityReport.missingRequired.map((item) => item.label).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityModal;
