import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../AIAssistant.module.css';

/**
 * PC build card component for displaying and customizing PC build configurations
 * @param {object} props - Component props
 * @param {object} props.build - PC build object
 * @param {string} props.purpose - Purpose of the build
 * @param {function} props.onAction - Function to handle PC build actions
 * @param {object} props.componentData - All available component data for selection
 * @returns {JSX.Element} PC build card component
 */
const PCBuildCard = ({ build, purpose, onAction, componentData }) => {
  const [currentBuild, setCurrentBuild] = useState(build);
  const [totalPower, setTotalPower] = useState(0);
  const [compatibilityIssues, setCompatibilityIssues] = useState([]);
  const [showComponentSelector, setShowComponentSelector] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState('');
  const [filteredComponents, setFilteredComponents] = useState([]);

  // Calculate total power consumption
  const calculatePowerConsumption = useCallback(() => {
    let power = 0;
    Object.values(currentBuild).forEach(component => {
      if (component.specs) {
        const tdp = component.specs.tdp || component.specs.powerConsumption || 0;
        power += parseInt(tdp) || 0;
      }
    });
    setTotalPower(power);
  }, [currentBuild]);

  // Check component compatibility
  const checkCompatibility = useCallback(() => {
    const issues = [];
    const { cpu, motherboard, ram, gpu, powerSupply } = currentBuild;

    // Check CPU and motherboard compatibility
    if (cpu && motherboard) {
      const cpuSocket = cpu.specs?.socket;
      const moboSocket = motherboard.specs?.socket;
      if (cpuSocket && moboSocket && cpuSocket !== moboSocket) {
        issues.push(`⚠️ CPU socket (${cpuSocket}) doesn't match motherboard socket (${moboSocket})`);
      }
    }

    // Check RAM compatibility
    if (ram && motherboard) {
      const ramType = ram.specs?.type;
      const moboRamType = motherboard.specs?.memoryType;
      if (ramType && moboRamType && ramType !== moboRamType) {
        issues.push(`⚠️ RAM type (${ramType}) doesn't match motherboard support (${moboRamType})`);
      }

      // Check RAM speed compatibility
      const ramSpeed = parseInt(ram.specs?.speed) || 0;
      const moboMaxSpeed = parseInt(motherboard.specs?.maxMemorySpeed) || 0;
      if (ramSpeed > moboMaxSpeed && moboMaxSpeed > 0) {
        issues.push(`⚠️ RAM speed (${ramSpeed}MHz) exceeds motherboard maximum (${moboMaxSpeed}MHz)`);
      }
    }

    // Check power supply wattage
    if (powerSupply) {
      const psuWattage = parseInt(powerSupply.specs?.wattage) || 0;
      const estimatedPower = totalPower * 1.2; // Add 20% headroom

      if (psuWattage < estimatedPower) {
        issues.push(`⚠️ Power supply (${psuWattage}W) may be insufficient for estimated load (${Math.round(estimatedPower)}W)`);
      }
    }

    // Check GPU clearance
    if (gpu && currentBuild.case) {
      const gpuLength = parseInt(gpu.specs?.length) || 0;
      const caseMaxGpuLength = parseInt(currentBuild.case.specs?.maxGPULength) || 0;
      
      if (gpuLength > caseMaxGpuLength && caseMaxGpuLength > 0) {
        issues.push(`⚠️ GPU length (${gpuLength}mm) exceeds case maximum (${caseMaxGpuLength}mm)`);
      }
    }

    setCompatibilityIssues(issues);
  }, [currentBuild, totalPower]);

  // Calculate power consumption and compatibility when build changes
  useEffect(() => {
    calculatePowerConsumption();
    checkCompatibility();
  }, [currentBuild, calculatePowerConsumption, checkCompatibility]);

  // Open component selector for a specific type
  const openComponentSelector = (componentType) => {
    setSelectedComponentType(componentType);
    setFilteredComponents(componentData[`${componentType}Data`] || []);
    setShowComponentSelector(true);
  };

  // Select a component
  const selectComponent = (component) => {
    setCurrentBuild(prev => ({
      ...prev,
      [selectedComponentType]: component
    }));
    setShowComponentSelector(false);
    setSelectedComponentType('');
  };

  // Get component type display name
  const getComponentTypeName = (type) => {
    const typeNames = {
      cpu: 'CPU',
      gpu: 'GPU',
      motherboard: 'Motherboard',
      ram: 'RAM',
      storage: 'Storage',
      powerSupply: 'Power Supply',
      case: 'Case',
      cooler: 'CPU Cooler'
    };
    return typeNames[type] || type;
  };

  // Calculate new total price
  const newTotalPrice = Object.values(currentBuild).reduce((total, component) => {
    return total + (component?.price || 0);
  }, 0);

  return (
    <div className={styles.pcBuild}>
      <h4>{purpose.charAt(0).toUpperCase() + purpose.slice(1)} PC Build - ₱{newTotalPrice.toLocaleString()}</h4>
      
      {/* Power Consumption */}
      <div className={styles.powerConsumption}>
        <span>Estimated Power Consumption: <strong>{totalPower}W</strong></span>
        {currentBuild.powerSupply && (
          <span>PSU Capacity: <strong>{currentBuild.powerSupply.specs?.wattage}W</strong></span>
        )}
      </div>

      {/* Compatibility Issues */}
      {compatibilityIssues.length > 0 && (
        <div className={styles.compatibilityIssues}>
          <h5>Compatibility Notes:</h5>
          {compatibilityIssues.map((issue, index) => (
            <div key={index} className={styles.compatibilityIssue}>
              {issue}
            </div>
          ))}
        </div>
      )}

      <div className={styles.buildComponents}>
        {Object.entries(currentBuild).map(([type, component]) => (
          <div key={type} className={styles.buildComponentCard}>
            <div className={styles.componentImage}>
              <img src={component.img} alt={component.name} />
            </div>
            <div className={styles.componentInfo}>
              <h5>{getComponentTypeName(type)}</h5>
              <p className={styles.componentName}>{component.name}</p>
              <div className={styles.componentSpecs}>
                {component.specs && Object.entries(component.specs).slice(0, 3).map(([key, value]) => (
                  <span key={key} className={styles.specItem}>{key}: {value}</span>
                ))}
                {component.specs?.tdp && (
                  <span className={styles.specItem}>TDP: {component.specs.tdp}W</span>
                )}
              </div>
              <p className={styles.componentPrice}>₱{component.price.toLocaleString()}</p>
            </div>
            <button
              className={styles.changeComponentButton}
              onClick={() => openComponentSelector(type)}
              title="Change component"
            >
              🔄
            </button>
          </div>
        ))}
      </div>

      <div className={styles.buildTotal}>
        <strong>Total: ₱{newTotalPrice.toLocaleString()}</strong>
      </div>

      {/* Component Selector Modal */}
      {showComponentSelector && (
        <div className={styles.componentSelector}>
          <div className={styles.componentSelectorContent}>
            <h4>Select {getComponentTypeName(selectedComponentType)}</h4>
            <div className={styles.componentList}>
              {filteredComponents.map(component => (
                <div
                  key={component.id}
                  className={styles.componentOption}
                  onClick={() => selectComponent(component)}
                >
                  <img src={component.img} alt={component.name} />
                  <div className={styles.componentOptionInfo}>
                    <h5>{component.name}</h5>
                    <p>₱{component.price.toLocaleString()}</p>
                    {component.specs && (
                      <div className={styles.componentOptionSpecs}>
                        {Object.entries(component.specs).slice(0, 2).map(([key, value]) => (
                          <span key={key}>{key}: {value}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              className={styles.closeSelector}
              onClick={() => setShowComponentSelector(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={styles.buildActions}>
        <button
          className={styles.saveBuildButton}
          onClick={() => onAction('save', currentBuild, newTotalPrice)}
        >
          Save Build
        </button>
        <button
          className={styles.customizeButton}
          onClick={() => setShowComponentSelector(true)}
        >
          Customize
        </button>
        <button
          className={styles.buyBuildButton}
          onClick={() => onAction('buy', currentBuild, newTotalPrice)}
        >
          Buy Complete Build
        </button>
      </div>
    </div>
  );
};

export default PCBuildCard;