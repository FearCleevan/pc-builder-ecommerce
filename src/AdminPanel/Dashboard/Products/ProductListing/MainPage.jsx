import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./MainPage.module.css";
import Header from "./Header/Header";
import SearchFilterSystem from "./SearchFilterSystem/SearchFilterSystem";
import ProductGridTableView from "./ProductGridTableView/ProductGridTableView";
import StatisticsOverview from "./StatisticsOverview/StatisticsOverview";
import BulkOperations from "./BulkOperations/BulkOperations";
import QuickActionModal from "./QuickAction/QuickActionModal";
import AddProductForm from "../AddProducts/AddProductForm";
import { getAllMockListingProducts } from "../shared/mockDataRegistry";
import {
  deleteAdminProduct,
  getAdminProducts,
  updateAdminProduct,
} from "../../../../firebase/services/productService";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priceRange: { min: 0, max: 150000 },
    stockStatus: "",
    sortBy: "name",
    sortOrder: "asc",
  });
  const [showBulkOperations, setShowBulkOperations] = useState(false);
  const [showQuickActionModal, setShowQuickActionModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductForAction, setSelectedProductForAction] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    categories: {},
  });

  const mockProducts = useMemo(() => getAllMockListingProducts(), []);

  const loadProducts = useCallback(async () => {
    try {
      const firestoreProducts = await getAdminProducts();
      const merged = [...firestoreProducts, ...mockProducts];
      setProducts(merged);
      setFilteredProducts(merged);
      calculateStatistics(merged);
    } catch {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      calculateStatistics(mockProducts);
    }
  }, [mockProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const calculateStatistics = (productsList) => {
    const stats = {
      totalProducts: productsList.length,
      inStock: productsList.filter((item) => item.stockStatus === "in_stock").length,
      lowStock: productsList.filter(
        (item) => Number(item.stock || 0) < 10 && item.stockStatus === "in_stock"
      ).length,
      outOfStock: productsList.filter((item) => item.stockStatus === "out_of_stock").length,
      categories: {},
    };

    productsList.forEach((item) => {
      stats.categories[item.category] = (stats.categories[item.category] || 0) + 1;
    });

    setStatistics(stats);
  };

  const applyFilters = (appliedFilters, list = products) => {
    let filtered = [...list];

    if (appliedFilters.search) {
      const query = appliedFilters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          String(item.name || "").toLowerCase().includes(query) ||
          String(item.sku || "").toLowerCase().includes(query) ||
          String(item.brand || "").toLowerCase().includes(query) ||
          String(item.description || "").toLowerCase().includes(query)
      );
    }

    if (appliedFilters.category) {
      filtered = filtered.filter((item) => item.category === appliedFilters.category);
    }

    filtered = filtered.filter(
      (item) =>
        Number(item.price || 0) >= appliedFilters.priceRange.min &&
        Number(item.price || 0) <= appliedFilters.priceRange.max
    );

    if (appliedFilters.stockStatus) {
      if (appliedFilters.stockStatus === "low_stock") {
        filtered = filtered.filter(
          (item) => Number(item.stock || 0) < 10 && item.stockStatus === "in_stock"
        );
      } else {
        filtered = filtered.filter((item) => item.stockStatus === appliedFilters.stockStatus);
      }
    }

    filtered.sort((a, b) => {
      const order = appliedFilters.sortOrder === "asc" ? 1 : -1;
      switch (appliedFilters.sortBy) {
        case "name":
          return order * String(a.name).localeCompare(String(b.name));
        case "price":
          return order * (Number(a.price || 0) - Number(b.price || 0));
        case "stock":
          return order * (Number(a.stock || 0) - Number(b.stock || 0));
        case "rating":
          return order * ((Number(b.ratings?.average) || 0) - (Number(a.ratings?.average) || 0));
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
    calculateStatistics(filtered);
  };

  const handleFilterChange = (newFilters) => {
    const nextFilters = { ...filters, ...newFilters };
    setFilters(nextFilters);
    applyFilters(nextFilters);
  };

  const handleProductSelect = (productId, isSelected) => {
    setSelectedProducts((prev) =>
      isSelected ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  const handleBulkSelect = (selectAll) => {
    setSelectedProducts(selectAll ? filteredProducts.map((item) => item.id) : []);
  };

  const handleQuickAction = (product, action) => {
    setSelectedProductForAction({ product, action });
    setShowQuickActionModal(true);
  };

  const persistFirestorePatch = async (item, updates) => {
    if (item.source !== "firestore" || !item.documentId) return;
    await updateAdminProduct(item.documentId, updates);
  };

  const handleBulkOperation = async (operation, data) => {
    let updated = [...products];
    const selectedSet = new Set(selectedProducts);

    if (operation === "delete") {
      const selectedFirestore = updated.filter(
        (item) => selectedSet.has(item.id) && item.source === "firestore"
      );
      await Promise.all(selectedFirestore.map((item) => deleteAdminProduct(item.documentId)));
      updated = updated.filter((item) => !selectedSet.has(item.id));
    } else {
      updated = updated.map((item) => {
        if (!selectedSet.has(item.id)) return item;

        let patch = {};
        if (operation === "updatePrice") {
          patch = { price: Number(data.newPrice || 0) };
        }
        if (operation === "updateStock") {
          const stock = Number(data.newStock || 0);
          patch = {
            stock,
            stockCount: stock,
            stockStatus: stock > 0 ? "in_stock" : "out_of_stock",
          };
        }
        if (operation === "updateCategory") {
          patch = { category: data.newCategory };
        }
        if (operation === "updateStatus") {
          patch = { stockStatus: data.newStatus };
        }
        if (operation === "addTag") {
          const existing = item.metadata?.tags || [];
          patch = {
            metadata: {
              ...(item.metadata || {}),
              tags: [...new Set([...existing, ...(data.tags || [])])],
            },
          };
        }

        if (Object.keys(patch).length > 0) {
          persistFirestorePatch(item, patch);
        }

        return { ...item, ...patch };
      });
    }

    setProducts(updated);
    applyFilters(filters, updated);
    setSelectedProducts([]);
    setShowBulkOperations(false);
  };

  const handleQuickActionConfirm = async (productId, action, data) => {
    let updated = [...products];
    const target = updated.find((item) => item.id === productId);

    if (!target) {
      setShowQuickActionModal(false);
      setSelectedProductForAction(null);
      return;
    }

    if (action === "delete") {
      if (target.source === "firestore" && target.documentId) {
        await deleteAdminProduct(target.documentId);
      }
      updated = updated.filter((item) => item.id !== productId);
    }

    if (action === "toggleStock") {
      updated = updated.map((item) => {
        if (item.id !== productId) return item;
        const nextStatus = item.stockStatus === "in_stock" ? "out_of_stock" : "in_stock";
        const patch = { stockStatus: nextStatus };
        persistFirestorePatch(item, patch);
        return { ...item, ...patch };
      });
    }

    if (action === "edit") {
      const updates = data.updates || {};
      updated = updated.map((item) => {
        if (item.id !== productId) return item;
        const stock = Number(updates.stock ?? item.stock ?? 0);
        const patch = {
          ...updates,
          stock,
          stockCount: stock,
          stockStatus: updates.stockStatus || (stock > 0 ? "in_stock" : "out_of_stock"),
        };
        persistFirestorePatch(item, patch);
        return { ...item, ...patch };
      });
    }

    if (action === "duplicate") {
      const duplicated = {
        ...target,
        id: `${target.id}-copy-${Date.now()}`,
        name: `${target.name} (Copy)`,
        sku: `${target.sku || target.id}-COPY`,
        source: "local",
        documentId: undefined,
      };
      updated = [duplicated, ...updated];
    }

    setProducts(updated);
    applyFilters(filters, updated);
    setShowQuickActionModal(false);
    setSelectedProductForAction(null);
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map((item) => item.category).filter(Boolean))),
    [products]
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((item) => item.brand).filter(Boolean))),
    [products]
  );

  return (
    <div className={styles.productListingContainer}>
      <Header
        title="Product Listing"
        subtitle="Manage all products from MockData and Firestore"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCount={selectedProducts.length}
        onBulkOperationsClick={() => setShowBulkOperations(true)}
        onAddProductClick={() => setShowAddModal(true)}
      />

      <StatisticsOverview statistics={statistics} />

      <SearchFilterSystem
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        brands={brands}
        priceRange={{ min: 0, max: 150000 }}
      />

      <ProductGridTableView
        products={filteredProducts}
        viewMode={viewMode}
        selectedProducts={selectedProducts}
        onProductSelect={handleProductSelect}
        onBulkSelect={handleBulkSelect}
        onQuickAction={handleQuickAction}
      />

      {showBulkOperations && (
        <BulkOperations
          selectedCount={selectedProducts.length}
          onClose={() => setShowBulkOperations(false)}
          onOperation={handleBulkOperation}
          categories={categories}
        />
      )}

      {showQuickActionModal && selectedProductForAction && (
        <QuickActionModal
          product={selectedProductForAction.product}
          action={selectedProductForAction.action}
          onClose={() => setShowQuickActionModal(false)}
          onConfirm={handleQuickActionConfirm}
          categories={categories}
          brands={brands}
        />
      )}

      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h2>Add Products</h2>
              <button type="button" onClick={() => setShowAddModal(false)}>
                Close
              </button>
            </div>
            <AddProductForm
              onCancel={() => setShowAddModal(false)}
              onSuccess={async () => {
                await loadProducts();
                setShowAddModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;
