import React, { useState } from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import styles from './SearchFilterSystem.module.css';

const SearchFilterSystem = ({ filters, onFilterChange, categories }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleStockStatusChange = (e) => {
    onFilterChange({ stockStatus: e.target.value });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('_');
    onFilterChange({ sortBy, sortOrder });
  };

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({ priceRange: { min: Number(min), max: Number(max) } });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      category: '',
      priceRange: { min: 0, max: 100000 },
      stockStatus: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  return (
    <div className={styles.searchFilterContainer}>
      {/* Main Search Bar */}
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search products by name, SKU, or brand..."
            value={filters.search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className={styles.clearSearchButton}
            >
              <FiX size={18} />
            </button>
          )}
        </div>
        
        <button
          className={`${styles.filterToggleButton} ${showAdvancedFilters ? styles.active : ''}`}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FiFilter size={18} />
          <span>Filters</span>
          {Object.values(filters).some(value => 
            value && typeof value !== 'object' && value !== '' ||
            (typeof value === 'object' && Object.values(value).some(v => v !== 0 && v !== 100000))
          ) && (
            <span className={styles.filterBadge}>Active</span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className={styles.advancedFilters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category</label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className={styles.filterSelect}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Stock Status</label>
            <select
              value={filters.stockStatus}
              onChange={handleStockStatusChange}
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Price Range</label>
            <div className={styles.priceRangeInputs}>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceRangeChange(e.target.value, filters.priceRange.max)}
                className={styles.priceInput}
              />
              <span className={styles.priceSeparator}>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceRangeChange(filters.priceRange.min, e.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sort By</label>
            <select
              value={`${filters.sortBy}_${filters.sortOrder}`}
              onChange={handleSortChange}
              className={styles.filterSelect}
            >
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="stock_asc">Stock (Low to High)</option>
              <option value="stock_desc">Stock (High to Low)</option>
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
            </select>
          </div>

          <div className={styles.filterActions}>
            <button onClick={clearFilters} className={styles.clearFiltersButton}>
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterSystem;