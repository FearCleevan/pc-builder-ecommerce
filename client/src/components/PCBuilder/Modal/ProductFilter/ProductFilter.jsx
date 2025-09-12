import React, { useState } from "react";
import { Slider, Box } from '@mui/material';
import styles from "./ProductFilter.module.css";

// Import filter data
import { caseFilter } from "../MockData/Case/CaseFilter";
import { cpuFilter } from "../MockData/CPU/CPUFilter";
import { motherboardFilter } from "../MockData/Motherboard/MotherboardFilter";
import { gpuFilter } from "../MockData/GPU/GPUFilter";
import { ramFilter } from "../MockData/RAM/RamFilter";
import { cpuCoolerFilter } from "../MockData/CPU Cooler/CPUCoolerFilter";
import { storageFilter } from "../MockData/Storage/StorageFilter";
import { monitorFilter } from "../MockData/Monitor/MonitorFilter";
import { caseFanFilter } from "../MockData/Case Fan/CaseFanFilter";
import { mouseFilter } from "../MockData/Mouse/MouseFilter";
import { speakerFilter } from "../MockData/Speaker/SpeakerFilter";
import { headphonesFilter } from "../MockData/Headphones/HeadphonesFilter";
import { microphoneFilter } from "../MockData/Microphone/MicrophoneFilter";
import { webcamFilter } from "../MockData/Webcam/WebcamFilter";
import { powerSupplyFilter } from "../MockData/Power Suppy/PowerSupplyFilter";
import { KeyboardFilter } from "../MockData/Keyboard/KeyboardFilter";

// Material-UI Range Slider component
const RangeSlider = ({ min, max, unit }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formatValue = (val) => {
    return Number.isInteger(val) ? val : val.toFixed(2);
  };

  return (
    <div className={styles.rangeSliderContainer}>
      <Box sx={{ width: '100%', padding: '0 8px' }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelFormat={(val) => `${unit}${formatValue(val)}`}
          min={min}
          max={max}
          sx={{
            color: '#ff2c2c',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16,
              backgroundColor: '#fff',
              border: '2px solid #ff2c2c',
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0 0 0 4px rgba(255, 44, 44, 0.16)',
              },
              '&.Mui-active': {
                boxShadow: '0 0 0 8px rgba(255, 44, 44, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              border: 'none',
              backgroundColor: '#ff2c2c',
            },
            '& .MuiSlider-rail': {
              opacity: 1,
              backgroundColor: '#d1d5db',
            },
            '& .MuiSlider-valueLabel': {
              fontSize: '0.75rem',
              fontWeight: 'normal',
              top: -24,
              backgroundColor: 'unset',
              color: '#6b7280',
              '&:before': {
                display: 'none',
              },
            },
          }}
        />
      </Box>
      <div className={styles.rangeValues}>
        <span>{unit}{formatValue(value[0])}</span>
        <span>{unit}{formatValue(value[1])}</span>
      </div>
    </div>
  );
};

const ProductFilter = ({ componentType }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Default filter if no type
  const defaultFilterSections = [
    {
      title: "Price",
      type: "range",
      min: 38.99,
      max: 1399.99,
      unit: "$",
    },
    {
      title: "Category",
      type: "checkbox",
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];

  // Map component types to filters
  const filterMap = {
    case: caseFilter,
    cpu: cpuFilter,
    motherboard: motherboardFilter,
    gpu: gpuFilter,
    ram: ramFilter,
    cpuCooler: cpuCoolerFilter,
    storage: storageFilter,
    powerSupply: powerSupplyFilter,
    caseFan: caseFanFilter,
    monitor: monitorFilter,
    mouse: mouseFilter,
    keyboard: KeyboardFilter,
    speaker: speakerFilter,
    headphones: headphonesFilter,
    microphone: microphoneFilter,
    webcam: webcamFilter,
  };

  const filterSections =
    componentType && filterMap[componentType.id]
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
                <RangeSlider
                  min={section.min}
                  max={section.max}
                  unit={section.unit}
                />
              ) : (
                <div className={styles.checkboxGroup}>
                  {(expandedSection === index
                    ? section.options
                    : section.options.slice(0, 5)
                  ).map((option, optIndex) => (
                    <div key={optIndex} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        id={`filter-${section.title}-${option}`}
                      />
                      <label htmlFor={`filter-${section.title}-${option}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                  {section.options.length > 5 && (
                    <button
                      className={styles.showMoreBtn}
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === index ? null : index
                        )
                      }
                    >
                      {expandedSection === index ? "Show Less" : "Show More"}
                    </button>
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