import React, { useState } from 'react';
import { FiX, FiSave, FiEye, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import styles from './QuickActionModal.module.css';

const QuickActionModal = ({ product, action, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    stockStatus: product?.stockStatus || 'in_stock',
    category: product?.category || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(product.id, action, formData);
  };

  const renderContent = () => {
    switch (action) {
      case 'edit':
        return (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price (₱)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={styles.input}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={styles.input}
                min="0"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Stock Status</label>
              <select
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className={styles.saveButton}>
                <FiSave size={16} />
                Save Changes
              </button>
            </div>
          </form>
        );

      case 'toggleStock':
        return (
          <div className={styles.toggleContent}>
            <div className={styles.toggleIcon}>
              {product.stockStatus === 'in_stock' ? (
                <FiToggleLeft size={48} color="#e74c3c" />
              ) : (
                <FiToggleRight size={48} color="#27ae60" />
              )}
            </div>
            <h3 className={styles.toggleTitle}>
              {product.stockStatus === 'in_stock' ? 'Mark as Out of Stock' : 'Mark as In Stock'}
            </h3>
            <p className={styles.toggleDescription}>
              {product.stockStatus === 'in_stock'
                ? `This will set "${product.name}" as out of stock. Customers won't be able to purchase it.`
                : `This will set "${product.name}" as in stock and available for purchase.`}
            </p>
            <div className={styles.toggleActions}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button
                className={styles.toggleButton}
                onClick={() => onConfirm(product.id, 'toggleStock', {})}
              >
                Confirm
              </button>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className={styles.deleteContent}>
            <div className={styles.deleteIcon}>
              <FiTrash2 size={48} color="#e74c3c" />
            </div>
            <h3 className={styles.deleteTitle}>Delete Product</h3>
            <p className={styles.deleteDescription}>
              Are you sure you want to delete "<strong>{product.name}</strong>"? 
              This action cannot be undone and all product data will be permanently removed.
            </p>
            <div className={styles.deleteActions}>
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onConfirm(product.id, 'delete', {})}
              >
                Delete Product
              </button>
            </div>
          </div>
        );

      case 'view':
        return (
          <div className={styles.viewContent}>
            <div className={styles.viewHeader}>
              <h3 className={styles.viewTitle}>Product Details</h3>
              <div className={`${styles.statusBadge} ${styles[product.stockStatus]}`}>
                {product.stockStatus.replace('_', ' ')}
              </div>
            </div>
            <div className={styles.viewGrid}>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>Name:</span>
                <span className={styles.viewValue}>{product.name}</span>
              </div>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>Brand:</span>
                <span className={styles.viewValue}>{product.brand}</span>
              </div>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>Category:</span>
                <span className={styles.viewValue}>{product.category}</span>
              </div>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>Price:</span>
                <span className={styles.viewValue}>₱{product.price.toLocaleString()}</span>
              </div>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>Stock:</span>
                <span className={styles.viewValue}>
                  {product.stock}
                  {product.stock < 10 && (
                    <span className={styles.lowStockIndicator}> (Low Stock)</span>
                  )}
                </span>
              </div>
              <div className={styles.viewItem}>
                <span className={styles.viewLabel}>SKU:</span>
                <span className={styles.viewValue}>{product.sku}</span>
              </div>
              {product.ratings && (
                <div className={styles.viewItem}>
                  <span className={styles.viewLabel}>Ratings:</span>
                  <span className={styles.viewValue}>
                    <span className={styles.ratingStars}>
                      {'★'.repeat(Math.floor(product.ratings))}
                      {'☆'.repeat(5 - Math.floor(product.ratings))}
                    </span>
                    <span className={styles.ratingValue}>({product.ratings})</span>
                  </span>
                </div>
              )}
            </div>
            <div className={styles.viewActions}>
              <button className={styles.closeViewButton} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (action) {
      case 'edit': return 'Edit Product';
      case 'toggleStock': return 'Update Stock Status';
      case 'delete': return 'Delete Product';
      case 'view': return 'Product Details';
      default: return 'Quick Action';
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{getModalTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        <div className={styles.modalContent}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default QuickActionModal;