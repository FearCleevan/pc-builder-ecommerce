// client/src/components/Pages/LaptopsPages/LaptopsFilter/LaptopsFilter.jsx
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

const LaptopsFilter = ({ activeFilters, onFilterChange, isMobile }) => {
    const [expandedSections, setExpandedSections] = useState({
        gpu: {}, // Track expanded state for each GPU series
        gpuShowAll: false // Track if all GPU options should be shown
    });
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

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleGpuSeries = (seriesId) => {
        setExpandedSections(prev => ({
            ...prev,
            gpu: {
                ...prev.gpu,
                [seriesId]: !prev.gpu[seriesId]
            }
        }));
    };

    useEffect(() => {
        setSelectedFilters(prev => ({
            ...prev,
            category: activeFilters.category || '',
            series: activeFilters.series || [],
            subcategory: activeFilters.subcategory || []
        }));
    }, [activeFilters]);

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

    // Show only 4 GPU series by default, show all when expanded
    const displayedGpuSeries = expandedSections.gpuShowAll 
        ? gpuOptions 
        : gpuOptions.slice(0, 4);

    return (
        <form id="laptop-filter" className={`${styles.filterForm} ${isMobile ? styles.mobile : ''}`}>
            <fieldset className={styles.filterFieldset}>
                <legend className={styles.filterLegend}>
                    <div className={styles.filterTitle}>
                        <span>Category</span>
                    </div>
                </legend>

                <ul className={styles.filterList}>
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

            {selectedFilters.category && (
                <fieldset className={styles.filterFieldset}>
                    <legend
                        className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                        onClick={() => toggleSection('series')}
                    >
                        <div className={styles.filterTitle}>
                            <span className={styles.filterIcon}></span>
                            <span>Series</span>
                        </div>
                    </legend>

                    <ul className={`${styles.filterList} ${expandedSections.series ? styles.filterListDown : ''}`}>
                        {seriesItems.slice(0, expandedSections.series ? seriesItems.length : 5).map(item => (
                            <li key={item.id} className={styles.filterItem}>
                                <input
                                    className={styles.filterCheckbox}
                                    id={item.id}
                                    type="checkbox"
                                    checked={selectedFilters.series.includes(item.id)}
                                    onChange={() => handleFilterToggle('series', item.id)}
                                />
                                <label htmlFor={item.id} className={styles.filterLabel}>
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>

                    {seriesItems.length > 5 && (
                        <button
                            type="button"
                            className={styles.filterShowAll}
                            onClick={() => toggleSection('series')}
                        >
                            {expandedSections.series ? '↑ Show less' : '↓ Show all...'}
                        </button>
                    )}
                </fieldset>
            )}

            {selectedFilters.category && (
                <fieldset className={styles.filterFieldset}>
                    <legend
                        className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                        onClick={() => toggleSection('features')}
                    >
                        <div className={styles.filterTitle}>
                            <span className={styles.filterIcon}></span>
                            <span>Key Features</span>
                        </div>
                    </legend>

                    <ul className={`${styles.filterList} ${expandedSections.features ? styles.filterListDown : ''}`}>
                        {features.slice(0, expandedSections.features ? features.length : 5).map(item => (
                            <li key={item.id} className={styles.filterItem}>
                                <input
                                    className={styles.filterCheckbox}
                                    id={item.id}
                                    type="checkbox"
                                    checked={selectedFilters.subcategory.includes(item.id)}
                                    onChange={() => handleFilterToggle('subcategory', item.id)}
                                />
                                <label htmlFor={item.id} className={styles.filterLabel}>
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>

                    {features.length > 5 && (
                        <button
                            type="button"
                            className={styles.filterShowAll}
                            onClick={() => toggleSection('features')}
                        >
                            {expandedSections.features ? '↑ Show less' : '↓ Show all...'}
                        </button>
                    )}
                </fieldset>
            )}

            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                    onClick={() => toggleSection('gpu')}
                >
                    <div className={styles.filterTitle}>
                        <span>GPU</span>
                    </div>
                </legend>

                {expandedSections.gpu && (
                    <div className={styles.filterDropdown}>
                        {displayedGpuSeries.map(series => (
                            <div key={series.id} className={styles.gpuSeries}>
                                <div 
                                    className={styles.gpuSeriesHeader}
                                    onClick={() => toggleGpuSeries(series.id)}
                                >
                                    <span className={styles.gpuSeriesTitle}>{series.series}</span>
                                    <span className={styles.gpuSeriesToggle}>
                                        {expandedSections.gpu[series.id] ? '−' : '+'}
                                    </span>
                                </div>
                                
                                {expandedSections.gpu[series.id] && (
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
                        
                        {gpuOptions.length > 4 && (
                            <button
                                type="button"
                                className={styles.filterShowAll}
                                onClick={() => setExpandedSections(prev => ({
                                    ...prev,
                                    gpuShowAll: !prev.gpuShowAll
                                }))}
                            >
                                {expandedSections.gpuShowAll ? '↑ Show less GPU series' : '↓ Show all GPU series...'}
                            </button>
                        )}
                    </div>
                )}
            </fieldset>

            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                    onClick={() => toggleSection('processor')}
                >
                    <div className={styles.filterTitle}>
                        <span>Processor</span>
                    </div>
                </legend>

                {expandedSections.processor && (
                    <div className={styles.filterDropdown}>
                        <ul className={styles.filterDropList}>
                            {processorOptions.slice(0, expandedSections.processorShowAll ? processorOptions.length : 6).map(option => (
                                <li key={option.id} className={styles.filterItem}>
                                    <input
                                        className={styles.filterCheckbox}
                                        id={option.id}
                                        type="checkbox"
                                        checked={selectedFilters.processor.includes(option.id)}
                                        onChange={() => handleFilterToggle('processor', option.id)}
                                    />
                                    <label htmlFor={option.id} className={styles.filterLabel}>
                                        {option.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        
                        {processorOptions.length > 6 && (
                            <button
                                type="button"
                                className={styles.filterShowAll}
                                onClick={() => setExpandedSections(prev => ({
                                    ...prev,
                                    processorShowAll: !prev.processorShowAll
                                }))}
                            >
                                {expandedSections.processorShowAll ? '↑ Show less' : '↓ Show all...'}
                            </button>
                        )}
                    </div>
                )}
            </fieldset>

            <fieldset className={styles.filterFieldset}>
                <legend
                    className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                    onClick={() => toggleSection('screenSize')}
                >
                    <div className={styles.filterTitle}>
                        <span className={styles.filterIcon}></span>
                        <span>Screen Size</span>
                    </div>
                </legend>

                <ul className={`${styles.filterList} ${expandedSections.screenSize ? styles.filterListDown : ''}`}>
                    {screenSizeOptions.slice(0, expandedSections.screenSize ? screenSizeOptions.length : 5).map(option => (
                        <li key={option.id} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={option.id}
                                type="checkbox"
                                checked={selectedFilters.screenSize.includes(option.id)}
                                onChange={() => handleFilterToggle('screenSize', option.id)}
                            />
                            <label htmlFor={option.id} className={styles.filterLabel}>
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
                
                {screenSizeOptions.length > 5 && (
                    <button
                        type="button"
                        className={styles.filterShowAll}
                        onClick={() => toggleSection('screenSize')}
                    >
                        {expandedSections.screenSize ? '↑ Show less' : '↓ Show all...'}
                    </button>
                )}
            </fieldset>

            <fieldset className={styles.filterFieldset}>
                <legend
                    className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                    onClick={() => toggleSection('ram')}
                >
                    <div className={styles.filterTitle}>
                        <span className={styles.filterIcon}></span>
                        <span>RAM</span>
                    </div>
                </legend>

                <ul className={`${styles.filterList} ${expandedSections.ram ? styles.filterListDown : ''}`}>
                    {ramOptions.slice(0, expandedSections.ram ? ramOptions.length : 5).map(option => (
                        <li key={option.id} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={option.id}
                                type="checkbox"
                                checked={selectedFilters.ram.includes(option.id)}
                                onChange={() => handleFilterToggle('ram', option.id)}
                            />
                            <label htmlFor={option.id} className={styles.filterLabel}>
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
                
                {ramOptions.length > 5 && (
                    <button
                        type="button"
                        className={styles.filterShowAll}
                        onClick={() => toggleSection('ram')}
                    >
                        {expandedSections.ram ? '↑ Show less' : '↓ Show all...'}
                    </button>
                )}
            </fieldset>

            <fieldset className={styles.filterFieldset}>
                <legend
                    className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                    onClick={() => toggleSection('storage')}
                >
                    <div className={styles.filterTitle}>
                        <span className={styles.filterIcon}></span>
                        <span>Storage</span>
                    </div>
                </legend>

                <ul className={`${styles.filterList} ${expandedSections.storage ? styles.filterListDown : ''}`}>
                    {storageOptions.slice(0, expandedSections.storage ? storageOptions.length : 5).map(option => (
                        <li key={option.id} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={option.id}
                                type="checkbox"
                                checked={selectedFilters.storage.includes(option.id)}
                                onChange={() => handleFilterToggle('storage', option.id)}
                            />
                            <label htmlFor={option.id} className={styles.filterLabel}>
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>
                
                {storageOptions.length > 5 && (
                    <button
                        type="button"
                        className={styles.filterShowAll}
                        onClick={() => toggleSection('storage')}
                    >
                        {expandedSections.storage ? '↑ Show less' : '↓ Show all...'}
                    </button>
                )}
            </fieldset>

            <button type="reset" className={styles.filterReset} onClick={resetFilters}>
                <span className={styles.resetIcon}></span>
                Reset Filters
            </button>
        </form>
    );
};

export default LaptopsFilter;