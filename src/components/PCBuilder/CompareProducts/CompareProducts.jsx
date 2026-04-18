import React, { useState, useEffect, useRef, useMemo } from 'react';
import CompareProductHeader from './CompareProductHeader/CompareProductHeader';
import SearchAndClearProduct from './SearchAndClearProduct/SearchAndClearProduct';
import DisplayProductCompare from './DisplayProductCompare/DisplayProductCompare';
import SearchResults from './SearchResults/SearchResults';
import styles from './CompareProducts.module.css';

// Import mock data
import { caseData } from '../Modal/MockData/Case/Case';
import { cpuData } from '../Modal/MockData/CPU/CPU';
import { motherboardData } from '../Modal/MockData/Motherboard/Motherboard';
import { gpuData } from '../Modal/MockData/GPU/GPU';
import { ramData } from '../Modal/MockData/RAM/Ram';
import { cpuCoolerData } from '../Modal/MockData/CPU Cooler/CPUCooler';
import { storageData } from '../Modal/MockData/Storage/Storage';
import { caseFanData } from '../Modal/MockData/Case Fan/CaseFan';
import { monitorData } from '../Modal/MockData/Monitor/Monitor';
import { mouseData } from '../Modal/MockData/Mouse/Mouse';
import { keyboardData } from '../Modal/MockData/Keyboard/Keyboard';
import { speakerData } from '../Modal/MockData/Speaker/Speaker';
import { headphonesData } from '../Modal/MockData/Headphones/Headphones';
import { microphoneData } from '../Modal/MockData/Microphone/Microphone';
import { webcamData } from '../Modal/MockData/Webcam/Webcam';
import { powerSupplyData } from '../Modal/MockData/Power Suppy/PowerSupply';

const CompareProducts = ({ products, componentType, onExit, onAddToBuild }) => {
    const [comparisonProducts, setComparisonProducts] = useState([]);
    const [currentComponentType, setCurrentComponentType] = useState(componentType);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [detailProduct, setDetailProduct] = useState(null);
    const searchContainerRef = useRef(null);

    // Component data mapping
    const componentDataMap = useMemo(() => ({
        case: caseData,
        cpu: cpuData,
        motherboard: motherboardData,
        gpu: gpuData,
        ram: ramData,
        cpuCooler: cpuCoolerData,
        storage: storageData,
        powerSupply: powerSupplyData,
        caseFan: caseFanData,
        monitor: monitorData,
        mouse: mouseData,
        keyboard: keyboardData,
        speaker: speakerData,
        headphones: headphonesData,
        microphone: microphoneData,
        webcam: webcamData
    }), []);

    // Generate unique storage key for each component type
    const getStorageKey = (componentTypeId) => {
        return `compare_${componentTypeId}_products`;
    };

    // Helper functions for localStorage operations
    const loadComparisonProducts = (storageKey) => {
        try {
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading comparison products from localStorage:', error);
        }
        return [];
    };

    const saveComparisonProducts = (storageKey, products) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(products));
        } catch (error) {
            console.error('Error saving comparison products to localStorage:', error);
        }
    };

    const clearComparisonProducts = (storageKey) => {
        try {
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error('Error clearing comparison products from localStorage:', error);
        }
    };

    // Load products when component type changes
    useEffect(() => {
        if (currentComponentType && currentComponentType.id) {
            const productsForType = componentDataMap[currentComponentType.id] || [];
            setAllProducts(productsForType);

            // Load comparison products from localStorage for this specific component type
            const storageKey = getStorageKey(currentComponentType.id);
            const savedComparisonProducts = loadComparisonProducts(storageKey);

            if (savedComparisonProducts.length > 0) {
                // If we have saved products for this category, use them
                setComparisonProducts(savedComparisonProducts);
            } else if (currentComponentType.id === componentType?.id && products && products.length > 0) {
                // If this is the initial component type and we have passed products, use them
                setComparisonProducts(products);
                // Also save them to localStorage
                saveComparisonProducts(storageKey, products);
            } else {
                // Otherwise, start with empty array
                setComparisonProducts([]);
            }

            setSearchTerm('');
            setShowSearchResults(false);
            setSearchResults([]);
        }
    }, [currentComponentType, componentDataMap, componentType, products]);

    // Save comparison products to localStorage whenever they change
    useEffect(() => {
        if (currentComponentType && currentComponentType.id && comparisonProducts.length >= 0) {
            const storageKey = getStorageKey(currentComponentType.id);
            saveComparisonProducts(storageKey, comparisonProducts);
        }
    }, [comparisonProducts, currentComponentType]);

    const handleSearch = (term) => {
        setSearchTerm(term);

        if (term === '') {
            setShowSearchResults(false);
            setSearchResults([]);
        } else {
            // Filter out products that are already in comparison
            const availableProducts = allProducts.filter(
                product => !comparisonProducts.some(p => p.id === product.id)
            );

            // Search through available products
            const results = availableProducts.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );

            setSearchResults(results);
            setShowSearchResults(true);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setShowSearchResults(false);
        setSearchResults([]);
        
        // Clear the current comparison products for this specific type
        if (currentComponentType && currentComponentType.id) {
            const storageKey = getStorageKey(currentComponentType.id);
            clearComparisonProducts(storageKey);
            setComparisonProducts([]);
        }
    };

    const handleComponentTypeChange = (newType) => {
        setCurrentComponentType(newType);
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = comparisonProducts.filter(product => product.id !== productId);
        setComparisonProducts(updatedProducts);
    };

    const handleViewDetails = (product) => {
        setDetailProduct(product);
    };

    const handleCloseDetails = () => {
        setDetailProduct(null);
    };

    const handleAddToBuild = (product) => {
        if (onAddToBuild && currentComponentType) {
            onAddToBuild(product, currentComponentType);
        }
    };

    const [maxReachedNotice, setMaxReachedNotice] = useState(false);

    const handleAddToComparison = (product) => {
        if (comparisonProducts.length < 4) {
            setComparisonProducts(prev => [...prev, product]);
            setShowSearchResults(false);
            setSearchTerm('');
        } else {
            setMaxReachedNotice(true);
            setTimeout(() => setMaxReachedNotice(false), 2500);
        }
    };

    const handleBackToBuilder = () => {
        onExit();
    };

    return (
        <div className={styles.compareProducts}>
            <CompareProductHeader
                componentType={currentComponentType}
                onComponentTypeChange={handleComponentTypeChange}
                onBackToBuilder={handleBackToBuilder}
            />

            <div className={styles.searchSection} ref={searchContainerRef}>
                <SearchAndClearProduct
                    onSearch={handleSearch}
                    onClear={handleClear}
                    componentType={currentComponentType}
                />

                {showSearchResults && (
                    <SearchResults
                        results={searchResults}
                        onAddToComparison={handleAddToComparison}
                        parentRef={searchContainerRef}
                    />
                )}
            </div>

            <div className={styles.comparisonContainer}>
                {comparisonProducts.length > 0 ? (
                    <DisplayProductCompare
                        products={comparisonProducts}
                        onRemove={handleRemoveProduct}
                        onViewDetails={handleViewDetails}
                        onAddToBuild={handleAddToBuild}
                    />
                ) : (
                    <div className={styles.emptyComparison}>
                        <div className={styles.emptyComparisonContent}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <h3>No products to compare</h3>
                            <p>Search for products to add to your comparison</p>
                        </div>
                    </div>
                )}
            </div>

            {showSearchResults && searchResults.length === 0 && searchTerm && (
                <div className={styles.noResults}>
                    <p>No products found for "{searchTerm}"</p>
                </div>
            )}

            {maxReachedNotice && (
                <div className={styles.maxNotice}>
                    Maximum of 4 products can be compared at once.
                </div>
            )}

            {detailProduct && (
                <div className={styles.detailOverlay} onClick={handleCloseDetails}>
                    <div className={styles.detailModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.detailHeader}>
                            <h3 className={styles.detailTitle}>{detailProduct.name}</h3>
                            <button className={styles.detailCloseButton} onClick={handleCloseDetails}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className={styles.detailBody}>
                            {detailProduct.image && (
                                <img src={detailProduct.image} alt={detailProduct.name} className={styles.detailImage} />
                            )}
                            <p className={styles.detailPrice}>
                                ₱{new Intl.NumberFormat('en-PH').format(detailProduct.price)}
                            </p>
                            <div className={styles.detailSpecs}>
                                {detailProduct.specs && Object.entries(detailProduct.specs).map(([key, val]) => (
                                    <div key={key} className={styles.detailSpecRow}>
                                        <span className={styles.detailSpecKey}>{key}</span>
                                        <span className={styles.detailSpecVal}>{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.detailFooter}>
                            <button
                                className={styles.detailAddButton}
                                onClick={() => { handleAddToBuild(detailProduct); handleCloseDetails(); }}
                            >
                                Add to Build
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompareProducts;