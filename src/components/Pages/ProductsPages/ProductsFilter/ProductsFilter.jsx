import React, { useState, useEffect } from 'react';
import styles from './ProductsFilter.module.css';
import { 
    categories, 
    productFilterConfig,
    getSeriesDrilldownSections
} from '../../../MockData/ProductMockData';

const FILTER_DEFAULTS = {
    subcategory: 6,
    series: 6
};

const ProductsFilter = ({ activeFilters, onFilterChange, isMobile, products = [], priceBounds = { min: 0, max: 0 } }) => {
    const [expandedSections, setExpandedSections] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({
        category: activeFilters.category || '',
        series: activeFilters.series || [],
        subcategory: activeFilters.subcategory || [],
        seriesFacet: activeFilters.seriesFacet || [],
        availability: activeFilters.availability || [],
        minPrice: Number(activeFilters.minPrice ?? priceBounds.min),
        maxPrice: Number(activeFilters.maxPrice ?? priceBounds.max)
    });

    useEffect(() => {
        setSelectedFilters(prev => ({
            ...prev,
            category: activeFilters.category || '',
            series: activeFilters.series || [],
            subcategory: activeFilters.subcategory || [],
            seriesFacet: activeFilters.seriesFacet || [],
            availability: activeFilters.availability || [],
            minPrice: Number(activeFilters.minPrice ?? priceBounds.min),
            maxPrice: Number(activeFilters.maxPrice ?? priceBounds.max)
        }));
    }, [activeFilters, priceBounds.min, priceBounds.max]);

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
            newFilters.seriesFacet = [];
        } else {
            if (newFilters[filterType].includes(value)) {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
            } else {
                newFilters[filterType] = [...newFilters[filterType], value];
            }

            if (filterType === 'series') {
                newFilters.seriesFacet = [];
            }
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handlePriceChange = (type, value) => {
        const parsedValue = Number(value) || 0;
        const clampedValue = Math.min(Math.max(parsedValue, priceBounds.min), priceBounds.max);
        const newFilters = { ...selectedFilters };

        if (type === 'minPrice') {
            newFilters.minPrice = Math.min(clampedValue, newFilters.maxPrice);
        } else {
            newFilters.maxPrice = Math.max(clampedValue, newFilters.minPrice);
        }

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const resetFilters = () => {
        const newFilters = {
            category: selectedFilters.category,
            series: [],
            subcategory: [],
            seriesFacet: [],
            availability: [],
            minPrice: priceBounds.min,
            maxPrice: priceBounds.max
        };

        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    const dynamicSections = productFilterConfig.getFilterSections(selectedFilters.category);
    const seriesDrilldownSections = getSeriesDrilldownSections(
        selectedFilters.category,
        selectedFilters.series,
        products
    );
    const totalRange = Math.max(1, priceBounds.max - priceBounds.min);
    const rangeFrom = ((selectedFilters.minPrice - priceBounds.min) / totalRange) * 100;
    const rangeTo = ((selectedFilters.maxPrice - priceBounds.min) / totalRange) * 100;

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

            {/* Dynamic Category-Specific Filters */}
            {selectedFilters.category && dynamicSections.map((section) => (
                <React.Fragment key={section.id}>
                    {renderFilterSection({
                        section: section.id,
                        options: section.options,
                        selected: selectedFilters[section.filterType] || [],
                        filterType: section.filterType,
                        defaultCount: section.defaultCount || FILTER_DEFAULTS[section.id] || 6,
                        label: section.label,
                    })}
                </React.Fragment>
            ))}

            {/* Series Drilldown Filters */}
            {selectedFilters.category && selectedFilters.series.length > 0 && seriesDrilldownSections.map((section) => (
                <React.Fragment key={section.id}>
                    {renderFilterSection({
                        section: section.id,
                        options: section.options,
                        selected: selectedFilters[section.filterType] || [],
                        filterType: section.filterType,
                        defaultCount: section.defaultCount || 6,
                        label: section.label,
                    })}
                </React.Fragment>
            ))}

            {/* Availability */}
            {renderFilterSection({
                section: 'availability',
                options: [
                    { id: 'in-stock', label: 'In stock' },
                    { id: 'out-of-stock', label: 'Out of stock' }
                ],
                selected: selectedFilters.availability,
                filterType: 'availability',
                defaultCount: 2,
                label: 'Availability',
            })}

            {/* Price */}
            <fieldset className={styles.filterFieldset}>
                <legend className={styles.filterLegend}>
                    <div className={styles.filterTitle}>
                        <span>Price</span>
                    </div>
                </legend>

                <div className={styles.priceInputs}>
                    <input
                        type="number"
                        className={styles.priceInput}
                        value={selectedFilters.minPrice}
                        min={priceBounds.min}
                        max={selectedFilters.maxPrice}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                    />
                    <span className={styles.priceSeparator}>-</span>
                    <input
                        type="number"
                        className={styles.priceInput}
                        value={selectedFilters.maxPrice}
                        min={selectedFilters.minPrice}
                        max={priceBounds.max}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    />
                </div>

                <div
                    className={styles.priceRange}
                    style={{
                        '--range-from': `${rangeFrom}%`,
                        '--range-to': `${rangeTo}%`
                    }}
                >
                    <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={selectedFilters.minPrice}
                        className={`${styles.rangeSlider} ${styles.rangeSliderMin}`}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                    />
                    <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={selectedFilters.maxPrice}
                        className={`${styles.rangeSlider} ${styles.rangeSliderMax}`}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                    />
                </div>

                <div className={styles.priceLabel}>
                    <span>Price:</span>
                    <span>
                        ₱{Number(selectedFilters.minPrice).toLocaleString()} - ₱{Number(selectedFilters.maxPrice).toLocaleString()}
                    </span>
                </div>
            </fieldset>

            <button type="reset" className={styles.filterReset} onClick={resetFilters}>
                <span className={styles.resetIcon}></span>
                Reset Filters
            </button>
        </form>
    );
};

export default ProductsFilter;
