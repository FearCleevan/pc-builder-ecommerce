//src/AdminPanel/Dashboard/Products/ProductListing/MainPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './MainPage.module.css';

// Import child components
import Header from './Header/Header';
import SearchFilterSystem from './SearchFilterSystem/SearchFilterSystem';
import ProductGridTableView from './ProductGridTableView/ProductGridTableView';
import StatisticsOverview from './StatisticsOverview/StatisticsOverview';
import BulkOperations from './BulkOperations/BulkOperations';
import QuickActionModal from './QuickAction/QuickActionModal';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: { min: 0, max: 100000 },
    stockStatus: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [selectedProductForAction, setSelectedProductForAction] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    categories: {}
  });

  // Mock data initialization
  useEffect(() => {
    // In real implementation, fetch from API
    const mockProducts = [
      {
        id: 'cpu-1',
        name: 'AMD Ryzen 9 7950X',
        category: 'CPU',
        price: 34200.00,
        stock: 15,
        stockStatus: 'in_stock',
        brand: 'AMD',
        sku: '100-100000514',
        createdAt: '2024-01-15',
        ratings: 4.8
      },
      {
        id: 'gpu-1',
        name: 'NVIDIA GeForce RTX 4090 24GB',
        category: 'GPU',
        price: 91200.00,
        stock: 5,
        stockStatus: 'in_stock',
        brand: 'NVIDIA',
        sku: '100-100000515',
        createdAt: '2024-01-10',
        ratings: 4.9
      }
    ];
    
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    calculateStatistics(mockProducts);
  }, []);

  const calculateStatistics = (productsList) => {
    const stats = {
      totalProducts: productsList.length,
      inStock: productsList.filter(p => p.stockStatus === 'in_stock').length,
      lowStock: productsList.filter(p => p.stockStatus === 'low_stock').length,
      outOfStock: productsList.filter(p => p.stockStatus === 'out_of_stock').length,
      categories: {}
    };

    productsList.forEach(product => {
      stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    });

    setStatistics(stats);
  };

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const applyFilters = (appliedFilters) => {
    let filtered = [...products];

    // Search filter
    if (appliedFilters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        product.sku.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(appliedFilters.search.toLowerCase())
      );
    }

    // Category filter
    if (appliedFilters.category) {
      filtered = filtered.filter(product => product.category === appliedFilters.category);
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= appliedFilters.priceRange.min &&
      product.price <= appliedFilters.priceRange.max
    );

    // Stock status filter
    if (appliedFilters.stockStatus) {
      filtered = filtered.filter(product => product.stockStatus === appliedFilters.stockStatus);
    }

    // Sorting
    filtered.sort((a, b) => {
      const order = appliedFilters.sortOrder === 'asc' ? 1 : -1;
      
      switch (appliedFilters.sortBy) {
        case 'name':
          return order * a.name.localeCompare(b.name);
        case 'price':
          return order * (a.price - b.price);
        case 'stock':
          return order * (a.stock - b.stock);
        case 'date':
          return order * (new Date(a.createdAt) - new Date(b.createdAt));
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    calculateStatistics(filtered);
  };

  const handleProductSelect = (productId, isSelected) => {
    if (isSelected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  const handleBulkSelect = (selectAll) => {
    if (selectAll) {
      setSelectedProducts(filteredProducts.map(p => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleQuickAction = (product, action) => {
    setSelectedProductForAction({ product, action });
    setShowQuickActionModal(true);
  };

  const handleBulkOperation = (operation, data) => {
    // Handle bulk operations like update price, stock, delete, etc.
    console.log(`Bulk ${operation}:`, data);
    
    // Update products state
    const updatedProducts = [...products];
    selectedProducts.forEach(productId => {
      const index = updatedProducts.findIndex(p => p.id === productId);
      if (index !== -1) {
        switch (operation) {
          case 'updatePrice':
            updatedProducts[index].price = data.newPrice;
            break;
          case 'updateStock':
            updatedProducts[index].stock = data.newStock;
            updatedProducts[index].stockStatus = data.newStockStatus;
            break;
          case 'delete':
            updatedProducts.splice(index, 1);
            break;
          case 'updateCategory':
            updatedProducts[index].category = data.newCategory;
            break;
        }
      }
    });

    setProducts(updatedProducts);
    applyFilters(filters);
    setSelectedProducts([]);
    setShowBulkOperations(false);
  };

  const handleQuickActionConfirm = (productId, action, data) => {
    // Handle individual product actions
    console.log(`${action} for product ${productId}:`, data);
    
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        switch (action) {
          case 'edit':
            return { ...product, ...data };
          case 'toggleStock':
            const newStatus = product.stockStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
            return { ...product, stockStatus: newStatus };
          case 'delete':
            return null;
          default:
            return product;
        }
      }
      return product;
    }).filter(Boolean);

    setProducts(updatedProducts);
    applyFilters(filters);
    setShowQuickActionModal(false);
    setSelectedProductForAction(null);
  };

  return (
    <div className={styles.productListingContainer}>
      {/* Header */}
      <Header
        title="Product Listing"
        subtitle="Manage all products in your store"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCount={selectedProducts.length}
        onBulkOperationsClick={() => setShowBulkOperations(true)}
      />

      {/* Statistics Overview */}
      <StatisticsOverview statistics={statistics} />

      {/* Search and Filter System */}
      <SearchFilterSystem
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={Object.keys(statistics.categories)}
      />

      {/* Product Grid/Table View */}
      <ProductGridTableView
        products={filteredProducts}
        viewMode={viewMode}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        onBulkSelect={handleBulkSelect}
        onQuickAction={handleQuickAction}
      />

      {/* Bulk Operations Modal */}
      {showBulkOperations && (
        <BulkOperations
          selectedCount={selectedProducts.length}
          onClose={() => setShowBulkOperations(false)}
          onOperation={handleBulkOperation}
        />
      )}

      {/* Quick Action Modal */}
      {showQuickActionModal && (
        <QuickActionModal
          product={selectedProductForAction.product}
          action={selectedProductForAction.action}
          onClose={() => setShowQuickActionModal(false)}
          onConfirm={handleQuickActionConfirm}
        />
      )}
    </div>
  );
};

export default ProductListing;