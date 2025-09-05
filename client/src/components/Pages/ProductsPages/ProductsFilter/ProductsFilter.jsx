// client/src/components/Pages/ProductsPages/ProductsFilter/ProductsFilter.jsx
import React, { useState, useEffect } from 'react';
import styles from './ProductsFilter.module.css';
import { categories, getSeriesItems, getSubCategories } from '../../../MockData/ProductMockData';

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
            // Category is single selection, not multi
            newFilters[filterType] = newFilters[filterType] === value ? '' : value;
            // Reset series and subcategory when changing category
            newFilters.series = [];
            newFilters.subcategory = [];
        } else {
            // Series and subcategory are multi-select
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
        // Preserve the current category but reset all other filters
        const newFilters = {
            category: selectedFilters.category, // Keep the current category
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

    // Mock filter options - in a real app these would come from your data
    const gpuOptions = [
        { id: 'rtx5090', label: 'GeForce RTX™ 5090' },
        { id: 'rtx5080', label: 'GeForce RTX™ 5080' },
        { id: 'rtx5070ti', label: 'GeForce RTX™ 5070 Ti' },
        { id: 'rtx5070', label: 'GeForce RTX™ 5070' },
        { id: 'rtx5060', label: 'GeForce RTX™ 5060' }
    ];

    const processorOptions = [
        { id: 'intel-series2', label: 'Intel Series 2' },
        { id: 'intel-series1', label: 'Intel Series 1' },
        { id: 'intel-14gen', label: 'Intel 14th Gen' },
        { id: 'intel-13gen', label: 'Intel 13th Gen' },
        { id: 'amd-ai300', label: 'AMD Ryzen™ AI 300 Series' },
        { id: 'amd-9000', label: 'AMD Ryzen™ 9000 Series' }
    ];

    const panelSizeOptions = [
        { id: '15', label: '15"' },
        { id: '16', label: '16"' },
        { id: '17', label: '17"' },
        { id: '18', label: '18"' },
        { id: 'oled', label: 'OLED' },
        { id: 'miniled', label: 'MiniLED' }
    ];

    return (
        <form id="pd-filter" className={`${styles.filterForm} ${isMobile ? styles.mobile : ''}`}>
            {/* Category Filter */}
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

            {/* Subcategory Filter - only show if category is selected */}
            {selectedFilters.category && (
                <fieldset className={styles.filterFieldset}>
                    <legend
                        className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                        onClick={() => toggleSection('subcategory')}
                    >
                        <div className={styles.filterTitle}>
                            <span className={styles.filterIcon}></span>
                            <span>Subcategories</span>
                        </div>
                    </legend>

                    <ul className={`${styles.filterList} ${expandedSections.subcategory ? styles.filterListDown : ''}`}>
                        {subCategories.slice(0, expandedSections.subcategory ? subCategories.length : 5).map(item => (
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

                    {subCategories.length > 5 && (
                        <button
                            type="button"
                            className={styles.filterShowAll}
                            onClick={() => toggleSection('subcategory')}
                        >
                            {expandedSections.subcategory ? '↑ Show less' : '↓ Show all...'}
                        </button>
                    )}
                </fieldset>
            )}

            {/* Series Filter - only show if category is selected */}
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

            {/* GPU Filter */}
            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                    onClick={() => toggleSection('gpu')}
                >
                    <div className={styles.filterTitle}>
                        <span>GPU SKU</span>
                    </div>
                </legend>

                {expandedSections.gpu && (
                    <div className={styles.filterDropdown}>
                        <div className={styles.filterDropdownTitle}>GeForce RTX™ 50 Series</div>
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

            {/* Processor Filter */}
            <fieldset className={styles.filterFieldset}>
                <legend
                    className={styles.filterLegend}
                    onClick={() => toggleSection('processor')}
                >
                    <div className={styles.filterTitle}>
                        <span>Processors</span>
                    </div>
                </legend>

                {expandedSections.processor && (
                    <div className={styles.filterDropdown}>
                        <div className={styles.filterDropdownTitle}>Intel Platform</div>
                        <ul className={styles.filterDropList}>
                            {processorOptions.filter(opt => opt.id.includes('intel')).map(option => (
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

                        <div className={styles.filterDropdownTitle}>AMD Platform</div>
                        <ul className={styles.filterDropList}>
                            {processorOptions.filter(opt => opt.id.includes('amd')).map(option => (
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

            {/* Panel Size Filter */}
            <fieldset className={styles.filterFieldset}>
                <legend
                    className={`${styles.filterLegend} ${styles.filterLegendDown}`}
                    onClick={() => toggleSection('panelSize')}
                >
                    <div className={styles.filterTitle}>
                        <span className={styles.filterIcon}></span>
                        <span>Panel Size</span>
                    </div>
                </legend>

                <ul className={`${styles.filterList} ${expandedSections.panelSize ? styles.filterListDown : ''}`}>
                    {panelSizeOptions.slice(0, expandedSections.panelSize ? panelSizeOptions.length : 5).map(option => (
                        <li key={option.id} className={styles.filterItem}>
                            <input
                                className={styles.filterCheckbox}
                                id={option.id}
                                type="checkbox"
                                checked={selectedFilters.panelSize.includes(option.id)}
                                onChange={() => handleFilterToggle('panelSize', option.id)}
                            />
                            <label htmlFor={option.id} className={styles.filterLabel}>
                                {option.label}
                            </label>
                        </li>
                    ))}
                </ul>

                {panelSizeOptions.length > 5 && (
                    <button
                        type="button"
                        className={styles.filterShowAll}
                        onClick={() => toggleSection('panelSize')}
                    >
                        {expandedSections.panelSize ? '↑ Show less' : '↓ Show all...'}
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

export default ProductsFilter;