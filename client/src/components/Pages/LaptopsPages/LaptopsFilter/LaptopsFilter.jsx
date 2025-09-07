// client/src/components/Pages/LaptopsPages/LaptopsFilter/LaptopsFilter.jsx
import React, { useState, useEffect } from 'react';
import styles from './LaptopsFilter.module.css';
import { categories, getSeriesItems, getFeatures } from '../../../MockData/LaptopMockData';

const LaptopsFilter = ({ activeFilters, onFilterChange, isMobile }) => {
    const [expandedSections, setExpandedSections] = useState({});
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

    const gpuOptions = [
        { id: 'rtx5090', label: 'GeForce RTX™ 5090' },
        { id: 'rtx5080', label: 'GeForce RTX™ 5080' },
        { id: 'rtx5070ti', label: 'GeForce RTX™ 5070 Ti' },
        { id: 'rtx5070', label: 'GeForce RTX™ 5070' },
        { id: 'rtx5060', label: 'GeForce RTX™ 5060' },
        { id: 'rtx4050', label: 'GeForce RTX™ 4050' },
        { id: 'rtx4080', label: 'GeForce RTX™ 4080' },
        { id: 'rtx4070', label: 'GeForce RTX™ 4070' },
        { id: 'rtx4060', label: 'GeForce RTX™ 4060' },
        { id: 'integrated', label: 'Integrated Graphics' },
        { id: 'apple-silicon', label: 'Apple Silicon' },
        { id: 'rtx5000', label: 'NVIDIA RTX™ 5000' }
    ];

    const processorOptions = [
        { id: 'intel-i9', label: 'Intel® Core™ i9' },
        { id: 'intel-i7', label: 'Intel® Core™ i7' },
        { id: 'intel-i5', label: 'Intel® Core™ i5' },
        { id: 'intel-i3', label: 'Intel® Core™ i3' },
        { id: 'intel-xeon', label: 'Intel® Xeon®' },
        { id: 'amd-ryzen9', label: 'AMD Ryzen™ 9' },
        { id: 'amd-ryzen7', label: 'AMD Ryzen™ 7' },
        { id: 'amd-ryzen5', label: 'AMD Ryzen™ 5' },
        { id: 'amd-ryzen3', label: 'AMD Ryzen™ 3' },
        { id: 'apple-m2', label: 'Apple M2' },
        { id: 'apple-m1', label: 'Apple M1' }
    ];

    const screenSizeOptions = [
        { id: '13', label: '13"' },
        { id: '14', label: '14"' },
        { id: '15', label: '15"' },
        { id: '16', label: '16"' },
        { id: '17', label: '17"' },
        { id: '18', label: '18"' }
    ];

    const ramOptions = [
        { id: '8gb', label: '8GB' },
        { id: '16gb', label: '16GB' },
        { id: '32gb', label: '32GB' },
        { id: '64gb', label: '64GB' },
        { id: '128gb', label: '128GB' }
    ];

    const storageOptions = [
        { id: '256gb', label: '256GB SSD' },
        { id: '512gb', label: '512GB SSD' },
        { id: '1tb', label: '1TB SSD' },
        { id: '2tb', label: '2TB SSD' },
        { id: '4tb', label: '4TB SSD' }
    ];

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
                        <ul className={styles.filterDropList}>
                            {gpuOptions.map(option => (
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
                            {processorOptions.map(option => (
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
            </fieldset>

            <button type="reset" className={styles.filterReset} onClick={resetFilters}>
                <span className={styles.resetIcon}></span>
                Reset Filters
            </button>
        </form>
    );
};

export default LaptopsFilter;