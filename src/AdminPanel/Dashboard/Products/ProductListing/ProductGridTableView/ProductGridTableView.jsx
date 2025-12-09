import React from 'react';
import { 
  FiEdit, 
  FiTrash2, 
  FiToggleLeft, 
  FiToggleRight,
  FiEye,
  FiCopy,
  FiPackage
} from 'react-icons/fi';
import styles from './ProductGridTableView.module.css';

const ProductGridTableView = ({
  products,
  viewMode,
  selectedProducts,
  onProductSelect,
  onBulkSelect,
  onQuickAction
}) => {
  const handleSelectAll = (e) => {
    onBulkSelect(e.target.checked);
  };

  const handleProductSelect = (productId, e) => {
    onProductSelect(productId, e.target.checked);
  };

  const renderTableView = () => {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.productsTable}>
          <thead>
            <tr>
              <th className={styles.checkboxColumn}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedProducts.length === products.length && products.length > 0}
                />
              </th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>SKU</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="8" className={styles.noProducts}>
                  <div className={styles.emptyState}>
                    <FiPackage size={48} />
                    <p>No products found</p>
                    <small>Try adjusting your filters</small>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className={selectedProducts.includes(product.id) ? styles.selectedRow : ''}>
                  <td className={styles.checkboxColumn}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) => handleProductSelect(product.id, e)}
                    />
                  </td>
                  <td>
                    <div className={styles.productInfo}>
                      <div className={styles.productImage}>
                        {product.image ? (
                          <img src={product.image} alt={product.name} />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <FiPackage size={20} />
                          </div>
                        )}
                      </div>
                      <div className={styles.productDetails}>
                        <div className={styles.productName}>{product.name}</div>
                        <div className={styles.productBrand}>{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.categoryBadge}>{product.category}</span>
                  </td>
                  <td className={styles.priceCell}>
                    ₱{product.price.toLocaleString()}
                  </td>
                  <td>
                    <div className={styles.stockInfo}>
                      <span className={styles.stockQuantity}>{product.stock}</span>
                      {product.stock < 10 && (
                        <span className={styles.lowStockIndicator}>Low</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={`${styles.statusBadge} ${styles[product.stockStatus]}`}>
                      {product.stockStatus.replace('_', ' ')}
                    </div>
                  </td>
                  <td className={styles.skuCell}>{product.sku}</td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.actionButton}
                        onClick={() => onQuickAction(product, 'edit')}
                        title="Edit Product"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        className={styles.actionButton}
                        onClick={() => onQuickAction(product, 'toggleStock')}
                        title="Toggle Stock Status"
                      >
                        {product.stockStatus === 'in_stock' ? (
                          <FiToggleLeft size={18} />
                        ) : (
                          <FiToggleRight size={18} />
                        )}
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.viewButton}`}
                        onClick={() => onQuickAction(product, 'view')}
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onQuickAction(product, 'delete')}
                        title="Delete Product"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderGridView = () => {
    return (
      <div className={styles.gridContainer}>
        {products.length === 0 ? (
          <div className={styles.emptyGridState}>
            <FiPackage size={64} />
            <p>No products found</p>
            <small>Try adjusting your filters</small>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div
                key={product.id}
                className={`${styles.productCard} ${
                  selectedProducts.includes(product.id) ? styles.selectedCard : ''
                }`}
              >
                <div className={styles.cardHeader}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => handleProductSelect(product.id, e)}
                    className={styles.cardCheckbox}
                  />
                  <div className={`${styles.statusBadge} ${styles[product.stockStatus]}`}>
                    {product.stockStatus.replace('_', ' ')}
                  </div>
                </div>
                
                <div className={styles.cardImage}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className={styles.cardImagePlaceholder}>
                      <FiPackage size={32} />
                    </div>
                  )}
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardCategory}>
                    <span className={styles.categoryBadge}>{product.category}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardBrand}>{product.brand}</p>
                  
                  <div className={styles.cardStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Price:</span>
                      <span className={styles.statValue}>₱{product.price.toLocaleString()}</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Stock:</span>
                      <span className={styles.statValue}>
                        {product.stock}
                        {product.stock < 10 && (
                          <span className={styles.lowStockIndicator}>Low</span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.cardSku}>
                    <span className={styles.skuLabel}>SKU:</span>
                    <span className={styles.skuValue}>{product.sku}</span>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <button
                    className={styles.cardActionButton}
                    onClick={() => onQuickAction(product, 'edit')}
                    title="Edit"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    className={styles.cardActionButton}
                    onClick={() => onQuickAction(product, 'view')}
                    title="View"
                  >
                    <FiEye size={16} />
                  </button>
                  <button
                    className={styles.cardActionButton}
                    onClick={() => onQuickAction(product, 'toggleStock')}
                    title="Toggle Stock"
                  >
                    {product.stockStatus === 'in_stock' ? (
                      <FiToggleLeft size={16} />
                    ) : (
                      <FiToggleRight size={16} />
                    )}
                  </button>
                  <button
                    className={`${styles.cardActionButton} ${styles.deleteAction}`}
                    onClick={() => onQuickAction(product, 'delete')}
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {viewMode === 'table' ? renderTableView() : renderGridView()}
    </div>
  );
};

export default ProductGridTableView;