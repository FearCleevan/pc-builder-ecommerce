import React, { useEffect, useState, useMemo } from 'react';
import ModalHeader from '../ModalHeader/ModalHeader';
import ProductFilter from '../ProductFilter/ProductFilter';
import ComponentCard from '../ComponentCard/ComponentCard';
import ComponentCardSkeleton from '../ComponentCardSkeleton/ComponentCardSkeleton';
import Pagination from '../Pagination/Pagination';
import styles from './AddComponentModal.module.css';

// Import mock data
import { caseData } from '../MockData/Case/Case';
import { cpuData } from '../MockData/CPU/CPU';
import { motherboardData } from '../MockData/Motherboard/Motherboard';
import { gpuData } from '../MockData/GPU/GPU';
import { ramData } from '../MockData/RAM/Ram';
import { cpuCoolerData } from '../MockData/CPU Cooler/CPUCooler';
import { storageData } from '../MockData/Storage/Storage';
import { caseFanData } from '../MockData/Case Fan/CaseFan';
import { monitorData } from '../MockData/Monitor/Monitor';
import { mouseData } from '../MockData/Mouse/Mouse';
import { keyboardData } from '../MockData/Keyboard/Keyboard';
import { speakerData } from '../MockData/Speaker/Speaker';
import { headphonesData } from '../MockData/Headphones/Headphones';
import { microphoneData } from '../MockData/Microphone/Microphone';
import { webcamData } from '../MockData/Webcam/Webcam';
import { powerSupplyData } from '../MockData/Power Suppy/PowerSupply';
import { caseFilter } from '../MockData/Case/CaseFilter';
import { cpuFilter } from '../MockData/CPU/CPUFilter';
import { motherboardFilter } from '../MockData/Motherboard/MotherboardFilter';
import { gpuFilter } from '../MockData/GPU/GPUFilter';
import { ramFilter } from '../MockData/RAM/RamFilter';
import { cpuCoolerFilter } from '../MockData/CPU Cooler/CPUCoolerFilter';
import { powerSupplyFilter } from '../MockData/Power Suppy/PowerSupplyFilter';
import { caseFanFilter } from '../MockData/Case Fan/CaseFanFilter';
import { monitorFilter } from '../MockData/Monitor/MonitorFilter';
import { mouseFilter } from '../MockData/Mouse/MouseFilter';
import { KeyboardFilter } from '../MockData/Keyboard/KeyboardFilter';
import { speakerFilter } from '../MockData/Speaker/SpeakerFilter';
import { headphonesFilter } from '../MockData/Headphones/HeadphonesFilter';
import { microphoneFilter } from '../MockData/Microphone/MicrophoneFilter';
import { webcamFilter } from '../MockData/Webcam/WebcamFilter';
import { storageFilter } from '../MockData/Storage/StorageFilter';

const AddComponentModal = ({ isOpen, onClose, onSelect, componentType, onCompareNavigate }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [components, setComponents] = useState([]);
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [compatibilityFilter, setCompatibilityFilter] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({});
    const [compareProducts, setCompareProducts] = useState([]);

    useEffect(() => {
        if (isOpen && componentType && componentType.id) {
            const savedComparisonProducts = loadComparisonProducts(componentType.id);
            setCompareProducts(savedComparisonProducts || []);
        } else {
            setCompareProducts([]);
        }
    }, [isOpen, componentType]);

    useEffect(() => {
        if (componentType && componentType.id) {
            saveComparisonProducts(componentType.id, compareProducts);
        }
    }, [compareProducts, componentType]);

    const loadComparisonProducts = (componentTypeId) => {
        try {
            const savedData = localStorage.getItem(`compare_${componentTypeId}`);
            if (savedData) {
                return JSON.parse(savedData);
            }
        } catch (error) {
            console.error('Error loading comparison products from localStorage:', error);
        }
        return [];
    };

    const saveComparisonProducts = (componentTypeId, products) => {
        try {
            localStorage.setItem(`compare_${componentTypeId}`, JSON.stringify(products));
        } catch (error) {
            console.error('Error saving comparison products to localStorage:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const mockComponents = generateMockComponents(componentType);
            setComponents(mockComponents);
            setFilteredComponents(mockComponents);
            setIsLoading(false);
        } else {
            document.body.style.overflow = 'unset';
            setSearchTerm('');
            setActiveFilters({});
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, componentType]);

    const generateMockComponents = (type) => {
        if (!type) return [];

        const componentDataMap = {
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
        };

        return componentDataMap[type.id] || [
            {
                id: 'default-1',
                name: `Sample ${type?.name}`,
                image: "/src/assets/Laptop1.png",
                price: Math.floor(Math.random() * 500) + 50,
                specs: {
                    "Specification": "Sample value",
                    "Feature": "Premium quality",
                    "Compatibility": "Universal"
                },
                has3D: true,
                store: "Sample Store",
                stock: "In stock"
            }
        ];
    };

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
    };

    // Enhanced getComponentValue function
    const getComponentValue = (component, filterName) => {
        // Map filter names to component properties
        const propertyMap = {
            "Price": "price",
            "Form Factor": "formFactor",
            "Side Panel": "sidePanel",
            "Manufacturer": "manufacturer",
            "Color": "color",
            "Transparent Side Panel": "transparentSidePanel",
            "Max GPU Length": "maxGpuLength",
            "Max CPU Cooler Height": "maxCpuCoolerHeight",
            "3.5\" Drive Bays": "driveBays35",
            "2.5\" Drive Bays": "driveBays25",
            "Expansion Slots": "expansionSlots",
            "Volume": "volume",
            "Weight": "weight",
            "Socket": "socket",
            "Microarchitecture": "microarchitecture",
            "Integrated Graphics": "integratedGraphics",
            "TDP": "tdp",
            "Core Count": "coreCount",
            "Brand": "brand",
            "Water Cooled": "waterCooled",
            "Fanless": "fanless",
            "Height": "height",
            "Fan Size": "fanSize",
            "Fan Quantity": "fanQuantity",
            "Radiator Size": "radiatorSize",
            "Noise Level": "noiseLevel",
            "Fan RPM": "fanRPM",
            "Chipset": "chipset",
            "Memory Type": "memoryType",
            "Interface": "interface",
            "Memory Size": "memorySize",
            "Card Length": "cardLength",
            "Refresh Rate": "refreshRate",
            "Screen Size": "screenSize",
            "Vertical Resolution": "verticalResolution",
            "Horizontal Resolution": "horizontalResolution",
            "RAM Type": "ramType",
            "ECC": "ecc",
            "Registered": "registered",
            "Heat Spreader": "heatSpreader",
            "RGB": "rgb",
            "Speed": "speed",
            "Total Capacity": "totalCapacity",
            "Number of Modules": "numberOfModules",
            "CAS Latency": "casLatency",
            "Module Height": "moduleHeight",
            "Type": "type",
            "NVMe": "nvme",
            "Capacity": "capacity",
            "Efficiency Rating": "efficiencyRating",
            "Modularity": "modularity",
            "Wattage": "wattage",
            "Length": "length",
            "EPS 8-pin (CPU)": "eps8pin",
            "PCIe 12VHPWR": "pcie12vhpwr",
            "PCIe 6+2-pin": "pcie6plus2pin",
            "SATA": "sata",
            "Molex 4-pin": "molex4pin",
            // Add more mappings as needed
        };

        // Get the property name from the map, or use the filter name as-is
        const propertyName = propertyMap[filterName] || filterName.toLowerCase();

        // Check if the component has the property
        if (component[propertyName] !== undefined) {
            return component[propertyName];
        }

        // Check if the component has specs and the property exists in specs
        if (component.specs && component.specs[filterName] !== undefined) {
            return component.specs[filterName];
        }

        // Check if the component has specs and the mapped property exists in specs
        if (component.specs && component.specs[propertyName] !== undefined) {
            return component.specs[propertyName];
        }

        // Try to find a case-insensitive match in specs
        if (component.specs) {
            const specKey = Object.keys(component.specs).find(
                key => key.toLowerCase() === filterName.toLowerCase()
            );
            if (specKey) {
                return component.specs[specKey];
            }
        }

        // Default return if no match found
        return "";
    };

    const handleCompareToggle = (component, isChecked) => {
        let updatedCompareProducts;

        if (isChecked) {
            updatedCompareProducts = [...compareProducts, component];
        } else {
            updatedCompareProducts = compareProducts.filter(item => item.id !== component.id);
        }

        setCompareProducts(updatedCompareProducts);
    };

    const handleClearCompare = () => {
        setCompareProducts([]);
    };

    const handleCompareNavigate = () => {
        if (onCompareNavigate && compareProducts.length > 0) {
            onCompareNavigate(compareProducts, componentType);
        }
    };

    // Apply filters whenever activeFilters, searchTerm, or components change
    useEffect(() => {
        if (components.length === 0) return;

        setIsLoading(true);

        // Simulate API call delay for better UX
        const timeoutId = setTimeout(() => {
            let filtered = [...components];

            // Apply search filter
            if (searchTerm) {
                filtered = filtered.filter(component =>
                    component.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Apply compatibility filter
            if (compatibilityFilter) {
                // This is a placeholder for actual compatibility logic
                // You would need to implement based on your specific requirements
                filtered = filtered.filter(component =>
                    component.specs?.Compatibility !== "Incompatible"
                );
            }

            // Apply other filters
            Object.entries(activeFilters).forEach(([filterName, filterValue]) => {
                if (Array.isArray(filterValue)) {
                    // Range filter - only apply if values are different from default
                    const defaultMin = filterSections.find(s => s.title === filterName)?.min || 0;
                    const defaultMax = filterSections.find(s => s.title === filterName)?.max || 0;

                    if (filterValue[0] !== defaultMin || filterValue[1] !== defaultMax) {
                        filtered = filtered.filter(component => {
                            const componentValue = getComponentValue(component, filterName);
                            // Convert to number for comparison
                            const numValue = typeof componentValue === 'string'
                                ? parseFloat(componentValue.replace(/[^\d.-]/g, ''))
                                : Number(componentValue);

                            return !isNaN(numValue) && numValue >= filterValue[0] && numValue <= filterValue[1];
                        });
                    }
                } else if (typeof filterValue === 'object') {
                    // Checkbox filter - only apply if at least one option is selected
                    const selectedOptions = Object.entries(filterValue)
                        .filter(([, isSelected]) => isSelected)
                        .map(([option]) => option);

                    if (selectedOptions.length > 0) {
                        filtered = filtered.filter(component => {
                            const componentValue = getComponentValue(component, filterName);
                            return selectedOptions.includes(componentValue);
                        });
                    }
                }
            });

            // Apply sorting
            switch (sortOption) {
                case 'price-asc':
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    filtered.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    filtered.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    // Default sorting (no change)
                    break;
            }

            setFilteredComponents(filtered);
            setIsLoading(false);
        }, 300); // Small delay to show loading state

        return () => clearTimeout(timeoutId);
    }, [activeFilters, searchTerm, compatibilityFilter, sortOption, components]);

    // Get filter sections for the current component type
    const filterSections = useMemo(() => {
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

        return componentType && filterMap[componentType.id]
            ? filterMap[componentType.id]
            : [
                {
                    title: "Price",
                    type: "range",
                    min: 2000,
                    max: 70000,
                    unit: "₱",
                },
                {
                    title: "Category",
                    type: "checkbox",
                    options: ["Option 1", "Option 2", "Option 3"],
                },
            ];
    }, [componentType]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleComponentSelect = (component) => {
        onSelect(component);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const toggleCompatibilityFilter = () => {
        setCompatibilityFilter(!compatibilityFilter);
    };

    // Calculate paginated components
    const itemsPerPage = 12;
    const paginatedComponents = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredComponents.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredComponents, currentPage, itemsPerPage]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer}>
                <ModalHeader
                    title={`Select ${componentType?.name}`}
                    onClose={onClose}
                />

                <div className={styles.modalContent}>
                    <div className={styles.filterSection}>
                        <ProductFilter
                            componentType={componentType}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    <div className={styles.mainContent}>
                        <div className={styles.filterBar}>
                            <div className={styles.compatibilityFilter}>
                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="compatibility"
                                        checked={compatibilityFilter}
                                        onChange={toggleCompatibilityFilter}
                                        className={styles.hiddenCheckbox}
                                    />
                                    <label htmlFor="compatibility" className={styles.customCheckbox}>
                                        {compatibilityFilter && (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6 9 17l-5-5"></path>
                                            </svg>
                                        )}
                                    </label>
                                    <label htmlFor="compatibility" className={styles.checkboxLabel}>
                                        Compatibility Filter
                                    </label>
                                </div>
                            </div>

                            <div className={styles.compareButtonContainer}>
                                {compareProducts.length > 0 ? (
                                    <>
                                        <button
                                            className={styles.clearCompareButton}
                                            onClick={handleClearCompare}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 6 6 18"></path>
                                                <path d="m6 6 12 12"></path>
                                            </svg>
                                            Clear Compare
                                        </button>
                                        <button
                                            className={styles.compareButtonActive}
                                            onClick={handleCompareNavigate}
                                        >
                                            Compare ({compareProducts.length})
                                        </button>
                                    </>
                                ) : (
                                    <button className={styles.compareButton} disabled>
                                        Compare
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.searchAndSortSection}>
                            <div className={styles.resultsInfo}>
                                <span className={styles.resultsCount}>
                                    {filteredComponents.length} Compatible Products
                                </span>
                            </div>

                            <div className={styles.sortAndSearch}>
                                <div className={styles.sortContainer}>
                                    <div className={styles.sortLabel}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m3 16 4 4 4-4"></path>
                                            <path d="M7 20V4"></path>
                                            <path d="m21 8-4-4-4 4"></path>
                                            <path d="M17 4v16"></path>
                                        </svg>
                                        <span>Sort by</span>
                                    </div>
                                    <select
                                        className={styles.sortSelect}
                                        value={sortOption}
                                        onChange={handleSortChange}
                                    >
                                        <option value="default">Default</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="name-asc">Name: A to Z</option>
                                        <option value="name-desc">Name: Z to A</option>
                                    </select>
                                </div>

                                <div className={styles.searchContainer}>
                                    <div className={styles.searchIcon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className={styles.searchInput}
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.componentsGrid}>
                            {isLoading ? (
                                // Show skeleton loading while filtering
                                Array.from({ length: itemsPerPage }).map((_, index) => (
                                    <ComponentCardSkeleton key={index} />
                                ))
                            ) : filteredComponents.length === 0 ? (
                                // Show no results message
                                <div className={styles.noResults}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters or search terms</p>
                                </div>
                            ) : (
                                // Show actual components
                                paginatedComponents.map((component) => (
                                    <ComponentCard
                                        key={component.id}
                                        component={component}
                                        onSelect={handleComponentSelect}
                                        onCompareToggle={handleCompareToggle}
                                        isComparing={compareProducts.some(item => item.id === component.id)}
                                    />
                                ))
                            )}
                        </div>

                        {filteredComponents.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(filteredComponents.length / itemsPerPage)}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddComponentModal;