import React from 'react';
import styles from './ProductFilter.module.css';

// Import filter data
import { caseFilter } from '../MockData/Case/CaseFilter';
import { cpuFilter } from '../MockData/CPU/CPUFilter';

const ProductFilter = ({ componentType }) => {
  // Default filter sections if no component type is provided
  const defaultFilterSections = [
    {
      title: "Price",
      type: "range",
      min: 38.99,
      max: 1399.99,
      unit: "$"
    },
    {
      title: "Category",
      type: "checkbox",
      options: ["Option 1", "Option 2", "Option 3"]
    }
  ];

  // Map component types to their respective filters
  const filterMap = {
    case: caseFilter,
    cpu: cpuFilter,
    // Add other component filters here as they are created
    motherboard: defaultFilterSections,
    gpu: defaultFilterSections,
    ram: defaultFilterSections,
    cpuCooler: defaultFilterSections,
    storage: defaultFilterSections,
    powerSupply: defaultFilterSections,
    caseFan: defaultFilterSections,
    monitor: defaultFilterSections,
    mouse: defaultFilterSections,
    keyboard: defaultFilterSections,
    speaker: defaultFilterSections,
    headphones: defaultFilterSections,
    microphone: defaultFilterSections,
    webcam: defaultFilterSections
  };

  // Get the appropriate filter sections based on component type
  const filterSections = componentType && filterMap[componentType.id] 
    ? filterMap[componentType.id] 
    : defaultFilterSections;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContent}>
        {filterSections.map((section, index) => (
          <div key={index} className={styles.filterSection}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <div className={styles.sectionContent}>
              {section.type === "range" ? (
                <div className={styles.rangeSlider}>
                  <input
                    type="range"
                    min={section.min}
                    max={section.max}
                    className={styles.slider}
                  />
                  <div className={styles.rangeValues}>
                    <span>{section.unit}{section.min}</span>
                    <span>{section.unit}{section.max}</span>
                  </div>
                </div>
              ) : (
                <div className={styles.checkboxGroup}>
                  {section.options.slice(0, 5).map((option, optIndex) => (
                    <div key={optIndex} className={styles.checkboxItem}>
                      <input type="checkbox" id={`filter-${section.title}-${option}`} />
                      <label htmlFor={`filter-${section.title}-${option}`}>{option}</label>
                    </div>
                  ))}
                  {section.options.length > 5 && (
                    <button className={styles.showMoreBtn}>Show More</button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;