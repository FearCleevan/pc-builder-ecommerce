import React, { useState, useEffect } from 'react';
import styles from './LaptopsFilter.module.css';
import { 
  categories, 
  getSeriesItems, 
  getFeatures, 
  gpuOptions, 
  processorOptions, 
  screenSizeOptions, 
  ramOptions, 
  storageOptions 
} from '../../../MockData/LaptopMockData';

// Default visible counts per filter section
const FILTER_DEFAULTS = {
  series: 5,
  features: 5,
  gpuSeries: 4, // number of GPU series to show by default
  processor: 6,
  screenSize: 5,
  ram: 5,
  storage: 5
};

const LaptopsFilter = ({ activeFilters, onFilterChange, isMobile }) => {
    const [expandedSections, setExpandedSections] = useState({
        series: false,
        features: false,
        gpuShowAll: false,
        processor: false,
        processorShowAll: false,
        screenSize: false,
        screenSizeShowAll: false,
        ram: false,
        ramShowAll: false,
        storage: false,
        storageShowAll: false,
    });
    const [expandedGpuSeries, setExpandedGpuSeries] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        category: activeFilters.category || '',
        series: activeFilters.series || [],
        subcategory: activeFilters.subcategory || [],
        gpu: [],
        processor: [],
        screenSize: [],
        ram: [],
        storage: []
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

    const toggleGpuSeries = (seriesId) => {
        setExpandedGpuSeries(prev => ({
            ...prev,
            [seriesId]: !prev[seriesId]
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
            screenSize: [],
            ram: [],
            storage: []
        };

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const seriesItems = getSeriesItems(selectedFilters.category);
    const features = getFeatures(selectedFilters.category);

    // GPU series shown by default or all when expanded
    const displayedGpuSeries = expandedSections.gpuShowAll 
        ? gpuOptions 
        : gpuOptions.slice(0, FILTER_DEFAULTS.gpuSeries);

    // Helper: render a filter section with show all/less and the right default count
    const renderFilterSection = ({
        section,
        options,
        selected,
        filterType,
        defaultCount,
        label,
    }) => {
        const showAll = !!expandedSections[`${section}ShowAll`];
        const countToShow = showAll ? options.length : defaultCount;

        return (
            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                >
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
        <form id="laptop-filter" className={`${styles.filterForm} ${isMobile ? styles.mobile : ''}`}>
            {/* Category */}
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

            {/* Series */}
            {selectedFilters.category && renderFilterSection({
                section: 'series',
                options: seriesItems,
                selected: selectedFilters.series,
                filterType: 'series',
                defaultCount: FILTER_DEFAULTS.series,
                label: 'Series',
            })}

            {/* Key Features */}
            {selectedFilters.category && renderFilterSection({
                section: 'features',
                options: features,
                selected: selectedFilters.subcategory,
                filterType: 'subcategory',
                defaultCount: FILTER_DEFAULTS.features,
                label: 'Key Features',
            })}

            {/* GPU */}
            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                >
                    <div className={styles.filterTitle}>
                        <span>GPU</span>
                    </div>
                </legend>
                <div className={styles.filterDropdown}>
                    {displayedGpuSeries.map(series => (
                        <div key={series.id} className={styles.gpuSeries}>
                            <div 
                                className={styles.gpuSeriesHeader}
                                onClick={() => toggleGpuSeries(series.id)}
                            >
                                <span className={styles.gpuSeriesTitle}>{series.series}</span>
                                <span className={styles.gpuSeriesToggle}>
                                    {expandedGpuSeries[series.id] ? '−' : '+'}
                                </span>
                            </div>
                            {expandedGpuSeries[series.id] && (
                                <ul className={styles.filterDropList}>
                                    {series.options.map(option => (
                                        <li key={option.id} className={styles.filterItem}>
                                            <input
                                                className={styles.filterCheckbox}
                                                id={option.id}
                                                type="checkbox"
                                                checked={selectedFilters.gpu.includes(option.id)}
                                                onChange={() => handleFilterToggle('gpu', option.id)}
                                            />
                                            <label htmlFor={option.id} className={styles.filterLabel}>
                                                {option.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                    {gpuOptions.length > FILTER_DEFAULTS.gpuSeries && (
                        <button
                            type="button"
                            className={styles.filterShowAll}
                            onClick={() =>
                                setExpandedSections(prev => ({
                                    ...prev,
                                    gpuShowAll: !prev.gpuShowAll
                                }))
                            }
                        >
                            {expandedSections.gpuShowAll ? '↑ Show less GPU series' : '↓ Show all GPU series...'}
                        </button>
                    )}
                </div>
            </fieldset>

            {/* Processor */}
            {renderFilterSection({
                section: 'processor',
                options: processorOptions,
                selected: selectedFilters.processor,
                filterType: 'processor',
                defaultCount: FILTER_DEFAULTS.processor,
                label: 'Processor',
            })}

            {/* Screen Size */}
            {renderFilterSection({
                section: 'screenSize',
                options: screenSizeOptions,
                selected: selectedFilters.screenSize,
                filterType: 'screenSize',
                defaultCount: FILTER_DEFAULTS.screenSize,
                label: 'Screen Size',
            })}

            {/* RAM */}
            {renderFilterSection({
                section: 'ram',
                options: ramOptions,
                selected: selectedFilters.ram,
                filterType: 'ram',
                defaultCount: FILTER_DEFAULTS.ram,
                label: 'RAM',
            })}

            {/* Storage */}
            {renderFilterSection({
                section: 'storage',
                options: storageOptions,
                selected: selectedFilters.storage,
                filterType: 'storage',
                defaultCount: FILTER_DEFAULTS.storage,
                label: 'Storage',
            })}

            <button type="reset" className={styles.filterReset} onClick={resetFilters}>
                <span className={styles.resetIcon}></span>
                Reset Filters
            </button>
        </form>
    );
};

export default LaptopsFilter;