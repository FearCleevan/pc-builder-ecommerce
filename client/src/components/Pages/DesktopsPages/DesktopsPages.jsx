//client/src/components/Pages/DesktopsPages/DesktopsPages.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import DesktopsFilter from './DesktopsFilter/DesktopsFilter';
import DesktopsGrid from './DesktopsGrid/DesktopsGrid';
import DesktopsBreadcrumb from './DesktopsBreadcrumb/DesktopsBreadcrumb';
import Pagination from './Pagination/Pagination';
import { desktopProducts } from '../../MockData/desktopProducts';
import styles from './DesktopsPages.module.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';


const DesktopsPages = () => {
    const [allProducts] = useState([...desktopProducts]);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [activeFilters, setActiveFilters] = useState({
        categories: '',
        series: [],
        subcategory: [],
        gpu: [],
        processor: [],
        screenSize: [],
        ram: [],
        storage: [],
    });
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
            setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 640);
            if (window.innerWidth > 992) {
                setIsMobileFilterOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const category = searchParams.get("category") || "";
        const series = searchParams.get("series") ? [searchParams.get("series")] : [];
        const subcategory = searchParams.get("subcategory") ? [searchParams.get("subcategory")] : [];
        const page = parseInt(searchParams.get("page")) || 1;

        setActiveFilters({
            category,
            series,
            subcategory,
            gpu: [],
            processor: [],
            screenSize: [],
            ram: [],
            storage: [],
        });

        setCurrentPage(page);

        // Apply filters based on URL parameters
        let filtered = allProducts;

        if (category) {
            filtered = filtered.filter((product) => product.category === category);
        }

        if (series.length > 0) {
            filtered = filtered.filter((product) => series.includes(product.series));
        }

        if (subcategory.length > 0) {
            filtered = filtered.filter((product) => subcategory.includes(product.subcategory));
        }

        setFilteredProducts(filtered);
    }, [searchParams, allProducts]); // ✅ include allProducts


    const itemsPerPage = useMemo(() => {
        if (isMobile) return 10;
        if (isTablet) return 16;
        return 15;
    }, [isMobile, isTablet]);

    const paginationData = useMemo(() => {
        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
        const currentItems = filteredProducts.slice(startIndex, endIndex);

        return {
            currentItems,
            totalPages,
            currentPage,
            totalItems,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1
        };
    }, [filteredProducts, currentPage, itemsPerPage]);

    const applyFilters = (category, series, subcategory, gpu, processor, screenSize, ram, storage) => {
        let filtered = allProducts;

        // Basic filters
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        if (series.length > 0) {
            filtered = filtered.filter(product => series.includes(product.series));
        }

        if (subcategory.length > 0) {
            filtered = filtered.filter(product => subcategory.includes(product.subcategory));
        }

        // Advanced specs filters
        if (gpu.length > 0) {
            filtered = filtered.filter(product => gpu.includes(product.specs.gpu));
        }

        if (processor.length > 0) {
            filtered = filtered.filter(product => processor.includes(product.specs.processor));
        }

        if (screenSize.length > 0) {
            filtered = filtered.filter(product => screenSize.includes(product.specs.screenSize));
        }

        if (ram.length > 0) {
            filtered = filtered.filter(product => ram.includes(product.specs.ram));
        }

        if (storage.length > 0) {
            filtered = filtered.filter(product => storage.includes(product.specs.storage));
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const handleFilterChange = (newFilters) => {
        setActiveFilters(newFilters);
        applyFilters(
            newFilters.category,
            newFilters.series,
            newFilters.subcategory,
            newFilters.gpu,
            newFilters.processor,
            newFilters.screenSize,
            newFilters.ram,
            newFilters.storage
        );

        const params = new URLSearchParams();
        if (newFilters.category) params.set('category', newFilters.category);
        if (newFilters.series.length > 0) params.set('series', newFilters.series[0]);
        if (newFilters.subcategory.length > 0) params.set('subcategory', newFilters.subcategory[0]);
        params.set('page', '1');

        setSearchParams(params);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        setSearchParams(params);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMobileFilter = () => {
        setIsMobileFilterOpen(!isMobileFilterOpen);
    };

    return (
        <div className={styles.laptopsPage}>
            <Header />
            <div className={styles.container}>
                <DesktopsBreadcrumb
                    category={activeFilters.category}
                    subcategory={activeFilters.subcategory[0]}
                    series={activeFilters.series[0]}
                    productCount={filteredProducts.length}
                />

                <div className={styles.content}>
                    {!isMobile && (
                        <aside className={styles.sidebar}>
                            <DesktopsFilter
                                activeFilters={activeFilters}
                                onFilterChange={handleFilterChange}
                                isMobile={false}
                            />
                        </aside>
                    )}

                    <main className={styles.mainContent}>
                        {isMobile && (
                            <div className={styles.mobileFilterContainer}>
                                <button
                                    className={`${styles.mobileFilterToggle} ${isMobileFilterOpen ? styles.active : ''}`}
                                    onClick={toggleMobileFilter}
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" stroke="#ccc" style={{ margin: '0px 5px 0px 0px' }}>
                                        <g id="Group_33" data-name="Group 33" transform="translate(-1651 -352)">
                                            <g id="Group_24" data-name="Group 24" transform="translate(1651 352)">
                                                <path id="Path_1" data-name="Path 1" d="M18.507,45.465H6.8V45A1.233,1.233,0,0,0,5.566,43.77H3.655A1.233,1.233,0,0,0,2.423,45v.463H.493a.493.493,0,0,0,0,.985h1.93v.463a1.233,1.233,0,0,0,1.232,1.232H5.566A1.233,1.233,0,0,0,6.8,46.913V46.45h11.71a.493.493,0,0,0,0-.985Zm-12.7,1.448a.247.247,0,0,1-.246.246H3.655a.247.247,0,0,1-.246-.246V45a.247.247,0,0,1,.246-.246H5.566A.247.247,0,0,1,5.812,45Z" transform="translate(0 -43.77)" fill="#999"></path>
                                            </g>
                                            <g id="Group_26" data-name="Group 26" transform="translate(1651 357.487)">
                                                <path id="Path_2" data-name="Path 2" d="M18.507,193.321h-1.93v-.463a1.233,1.233,0,0,0-1.232-1.232H13.434a1.233,1.233,0,0,0-1.232,1.232v.463H.493a.493.493,0,1,0,0,.985H12.2v.463A1.233,1.233,0,0,0,13.434,196h1.911a1.233,1.233,0,0,0,1.232-1.232v-.463h1.93a.493.493,0,0,0,0-.985Zm-2.916,1.448a.247.247,0,0,1-.246.246H13.434a.247.247,0,0,1-.246-.246v-1.911a.247.247,0,0,1,.246-.246h1.911a.247.247,0,0,1,.246.246Z" transform="translate(0 -191.626)" fill="#999"></path>
                                            </g>
                                            <g id="Group_28" data-name="Group 28" transform="translate(1651 363.377)">
                                                <path id="Path_3" data-name="Path 3" d="M18.507,352.047H10.258v-.463a1.233,1.233,0,0,0-1.232-1.232H7.115a1.233,1.233,0,0,0-1.232,1.232v.463H.493a.493.493,0,0,0,0,.985H5.884v.463a1.233,1.233,0,0,0,1.232,1.232H9.027a1.233,1.233,0,0,0,1.232-1.232v-.463h8.249a.493.493,0,0,0,0-.985ZM9.273,353.5a.247.247,0,0,1-.246.246H7.115a.247.247,0,0,1-.246-.246v-1.911a.247.247,0,0,1,.246-.246H9.027a.247.247,0,0,1,.246.246Z" transform="translate(0 -350.353)" fill="#999"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    ADVANCED SEARCH
                                </button>

                                {isMobileFilterOpen && (
                                    <div className={styles.mobileFilterDropdown}>
                                        <DesktopsFilter
                                            activeFilters={activeFilters}
                                            onFilterChange={handleFilterChange}
                                            isMobile={true}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className={`${styles.productsContainer} ${isMobileFilterOpen ? styles.productsShifted : ''}`}>
                            <DesktopsGrid products={paginationData.currentItems} />

                            {filteredProducts.length > 0 && (
                                <Pagination
                                    currentPage={paginationData.currentPage}
                                    totalPages={paginationData.totalPages}
                                    onPageChange={handlePageChange}
                                    totalItems={paginationData.totalItems}
                                    itemsPerPage={itemsPerPage}
                                />
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DesktopsPages;