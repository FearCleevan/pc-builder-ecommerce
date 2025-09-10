// client/src/components/PCBuilder/Modal/ProductFilter/ProductFilter.jsx
import React from 'react';
import styles from './ProductFilter.module.css';

const ProductFilter = () => {
  const filterSections = [
    {
      title: "Price",
      type: "range",
      min: 38.99,
      max: 1399.99,
      unit: "$"
    },
    {
      title: "Form Factor",
      type: "checkbox",
      options: [
        "ATX Desktop", "ATX Full Tower", "ATX Mid Tower", "ATX Mini Tower",
        "ATX Test Bench", "EATX", "EATX Full Tower", "EATX Mid Tower"
      ]
    },
    {
      title: "Side Panel",
      type: "checkbox",
      options: [
        "Acrylic", "Aluminum", "Mesh", "None", "Solid", "Steel",
        "Tempered Glass", "Tinted Acrylic"
      ]
    },
    {
      title: "Manufacturer",
      type: "checkbox",
      options: [
        "1STPLAYER", "ABKONCORE", "ABYSS-TR", "Acer", "ADATA", "Aerocool",
        "AeroCool", "aigo"
      ]
    },
    {
      title: "Color",
      type: "checkbox",
      options: [
        "BLACK", "BLUE", "BROWN", "GOLD", "GRAY", "GREEN", "GREY", "ORANGE"
      ]
    },
    {
      title: "Transparent Side Panel",
      type: "checkbox",
      options: ["No", "Yes"]
    },
    {
      title: "Max GPU Length",
      type: "range",
      min: 0,
      max: 635,
      unit: "mm"
    },
    {
      title: "Max CPU Cooler Height",
      type: "range",
      min: 0,
      max: 260,
      unit: "mm"
    }
  ];

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