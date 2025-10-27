import React, { useState, useEffect } from 'react';
import styles from './ProductsFilter.module.css';
import { 
    categories, 
    getSeriesItems, 
    getSubCategories,
    gpuOptions,
    processorOptions,
    panelSizeOptions
} from '../../../MockData/ProductMockData';

const FILTER_DEFAULTS = {
    subcategory: 5,
    series: 5,
    gpu: 5,
    processor: 6,
    panelSize: 5
};

const ProductsFilter = ({ activeFilters, onFilterChange, isMobile }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        category: activeFilters.category || '',
        series: activeFilters.series || [],
        subcategory: activeFilters.subcategory || [],
        gpu: [],
        processor: [],
        panelSize: []
    });

    useEffect(() => {
        setSelectedFilters(prev => ({
            ...prev,
            category: activeFilters.category || '',
            series: activeFilters.series || [],
            subcategory: activeFilters.subcategory || []
        }));
    }, [activeFilters]);

    const handleShowAllToggle = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [`${section}ShowAll`]: !prev[`${section}ShowAll`]
        }));
    };

    const handleFilterToggle = (filterType, value) => {
        const newFilters = { ...selectedFilters };

        if (filterType === 'category') {
            newFilters[filterType] = newFilters[filterType] === value ? '' : value;
            newFilters.series = [];
            newFilters.subcategory = [];
        } else {
            if (newFilters[filterType].includes(value)) {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            } else {
                newFilters[filterType] = [...newFilters[filterType], value];
            }
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const resetFilters = () => {
        const newFilters = {
            category: selectedFilters.category,
            series: [],
            subcategory: [],
            gpu: [],
            processor: [],
            panelSize: []
        };

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const seriesItems = getSeriesItems(selectedFilters.category);
    const subCategories = getSubCategories(selectedFilters.category);

    // Helper to render filter sections with show all/less
    const renderFilterSection = ({section, options, selected, filterType, defaultCount, label}) => {
        const showAll = !!expandedSections[`${section}ShowAll`];
        const countToShow = showAll ? options.length : defaultCount;

        return (
            <fieldset className={styles.filterFieldset}>
                <legend className={styles.filterLegend}>
                    <div className={styles.filterTitle}>
                        <span>{label}</span>
                    </div>
                </legend>
                <ul className={`${styles.filterList} ${styles.filterListDown}`}>
                    {options.slice(0, countToShow).map(option => (
                        <li key={option.id} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={`${section}-${option.id}`}
                                type="checkbox"
                                checked={selected.includes(option.id)}
                                onChange={() => handleFilterToggle(filterType, option.id)}
                            />
                            <label htmlFor={`${section}-${option.id}`} className={styles.filterLabel}>
                                {option.name || option.label}
                            </label>
                        </li>
                    ))}
                </ul>
                {options.length > defaultCount && (
                    <button
                        type="button"
                        className={styles.filterShowAll}
                        onClick={() => handleShowAllToggle(section)}
                    >
                        {showAll ? '↑ Show less' : '↓ Show all...'}
                    </button>
                )}
            </fieldset>
        );
    };

    return (
        <form id="pd-filter" className={`${styles.filterForm} ${isMobile ? styles.mobile : ''}`}>
            {/* Category Filter */}
            <fieldset className={styles.filterFieldset}>
                <legend className={styles.filterLegend}>
                    <div className={styles.filterTitle}>
                        <span>Category</span>
                    </div>
                </legend>

                <ul className={`${styles.filterList} ${styles.filterListDown}`}>
                    {categories.map(category => (
                        <li key={category} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={`category-${category}`}
                                type="checkbox"
                                checked={selectedFilters.category === category}
                                onChange={() => handleFilterToggle('category', category)}
                            />
                            <label htmlFor={`category-${category}`} className={styles.filterLabel}>
                                {category}
                            </label>
                        </li>
                    ))}
                </ul>
            </fieldset>

            {/* Subcategory */}
            {selectedFilters.category && renderFilterSection({
                section: 'subcategory',
                options: subCategories,
                selected: selectedFilters.subcategory,
                filterType: 'subcategory',
                defaultCount: FILTER_DEFAULTS.subcategory,
                label: 'Subcategories',
            })}

            {/* Series */}
            {selectedFilters.category && renderFilterSection({
                section: 'series',
                options: seriesItems,
                selected: selectedFilters.series,
                filterType: 'series',
                defaultCount: FILTER_DEFAULTS.series,
                label: 'Series',
            })}

            {/* GPU */}
            {renderFilterSection({
                section: 'gpu',
                options: gpuOptions,
                selected: selectedFilters.gpu,
                filterType: 'gpu',
                defaultCount: FILTER_DEFAULTS.gpu,
                label: 'GPU SKU',
            })}

            {/* Processor */}
            {renderFilterSection({
                section: 'processor',
                options: processorOptions,
                selected: selectedFilters.processor,
                filterType: 'processor',
                defaultCount: FILTER_DEFAULTS.processor,
                label: 'Processors',
            })}

            {/* Panel Size */}
            {renderFilterSection({
                section: 'panelSize',
                options: panelSizeOptions,
                selected: selectedFilters.panelSize,
                filterType: 'panelSize',
                defaultCount: FILTER_DEFAULTS.panelSize,
                label: 'Panel Size',
            })}

            <button type="reset" className={styles.filterReset} onClick={resetFilters}>
                <span className={styles.resetIcon}></span>
                Reset Filters
            </button>
        </form>
    );
};

export default ProductsFilter;