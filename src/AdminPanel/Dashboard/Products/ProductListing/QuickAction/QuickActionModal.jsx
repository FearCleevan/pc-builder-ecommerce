import React, { useState, useEffect } from 'react';
import styles from './QuickActionModal.module.css';

// SVG Icons components
const CloseIcon = ({ size = 24, color = "#495057" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SaveIcon = ({ size = 16, color = "#fff" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const EyeIcon = ({ size = 48, color = "#3498db" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const TrashIcon = ({ size = 48, color = "#e74c3c" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const ToggleLeftIcon = ({ size = 48, color = "#e74c3c" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
    <circle cx="8" cy="12" r="3"></circle>
  </svg>
);

const ToggleRightIcon = ({ size = 48, color = "#27ae60" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
    <circle cx="16" cy="12" r="3"></circle>
  </svg>
);

const DuplicateIcon = ({ size = 48, color = "#3498db" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const QuickActionModal = ({ product, action, onClose, onConfirm, categories = [], brands = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    subcategory: '',
    price: '',
    currency: 'PHP',
    stock: '',
    stockStatus: 'in_stock',
    description: '',
    short_description: '',
    image: '',
    imagesText: '',
    sku: '',
    upc: '',
    weight_kg: '',
    dimensions_cm: { length: '', width: '', height: '' },
    specifications: {},
    tags: [],
    seo_keywords: []
  });

  const [activeTab, setActiveTab] = useState('basic');

  // Initialize form data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        price: product.price || '',
        currency: product.currency || 'PHP',
        stock: product.stock || '',
        stockStatus: product.stockStatus || 'in_stock',
        description: product.description || '',
        short_description: product.short_description || '',
        image: product.image || product.images?.[0] || '',
        imagesText: (product.images || []).join(', '),
        sku: product.sku || '',
        upc: product.upc || '',
        weight_kg: product.weight_kg || '',
        dimensions_cm: product.dimensions_cm || { length: '', width: '', height: '' },
        specifications: product.specifications || {},
        tags: product.metadata?.tags || [],
        seo_keywords: product.metadata?.seo_keywords || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      // Handle nested object properties (e.g., dimensions_cm.length)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? parseFloat(value) || 0 : value
        }
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageArray = (formData.imagesText || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const normalizedImages = imageArray.length > 0 ? imageArray : formData.image ? [formData.image] : [];
    const mainImage = formData.image || normalizedImages[0] || product.image || '';

    const updates = {
      ...formData,
      image: mainImage,
      images: normalizedImages.length > 0 ? normalizedImages : product.images || [],
    };

    delete updates.imagesText;

    onConfirm(product.id, action, { updates });
  };

  // Helper function to render rating stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className={styles.fullStar}>★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className={styles.halfStar}>★</span>);
      } else {
        stars.push(<span key={i} className={styles.emptyStar}>★</span>);
      }
    }
    
    return <div className={styles.ratingStars}>{stars}</div>;
  };

  // Helper function to get specs summary
  const getSpecsSummary = () => {
    const specs = product.specifications;
    if (!specs) return '';
    
    switch (product.category) {
      case 'Case':
        return specs.general?.form_factor || '';
      case 'Case Fan':
        return specs.performance?.size_mm ? `${specs.performance.size_mm}mm` : '';
      case 'CPU Cooler':
        return specs.cooling?.radiator_size_mm ? `${specs.cooling.radiator_size_mm}mm AIO` : '';
      case 'GPU':
        return `${specs.performance?.memory_size_gb || ''}GB ${specs.performance?.memory_type || ''}`;
      case 'Motherboard':
        return `${specs.general?.chipset || ''} ${specs.general?.form_factor || ''}`;
      default:
        return '';
    }
  };

  // Helper function to format dimensions
  const formatDimensions = () => {
    if (!product.dimensions_cm) return 'N/A';
    return `${product.dimensions_cm.length}×${product.dimensions_cm.width}×${product.dimensions_cm.height} cm`;
  };

  const renderEditContent = () => (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.tabs}>
        <button 
          type="button"
          className={`${styles.tab} ${activeTab === 'basic' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button 
          type="button"
          className={`${styles.tab} ${activeTab === 'specs' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Specifications
        </button>
        <button 
          type="button"
          className={`${styles.tab} ${activeTab === 'seo' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO & Tags
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'basic' && (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Product Name *</label>
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
                <label className={styles.label}>Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Price (₱) *</label>
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
                <label className={styles.label}>Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="PHP">PHP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Stock Quantity *</label>
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
                <label className={styles.label}>Stock Status *</label>
                <select
                  name="stockStatus"
                  value={formData.stockStatus}
                  onChange={handleChange}
                  className={styles.select}
                  required
                >
                  <option value="in_stock">In Stock</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>SKU *</label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>UPC</label>
              <input
                type="text"
                name="upc"
                value={formData.upc}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Main Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Image URLs (comma separated)</label>
              <textarea
                name="imagesText"
                value={formData.imagesText}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
                placeholder="https://img1.jpg, https://img2.jpg"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Short Description *</label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                className={styles.textarea}
                rows="2"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Full Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                rows="4"
              />
            </div>
          </>
        )}

        {activeTab === 'specs' && (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Weight (kg)</label>
                <input
                  type="number"
                  name="weight_kg"
                  value={formData.weight_kg}
                  onChange={handleChange}
                  className={styles.input}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Dimensions (cm)</div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Length</label>
                <input
                  type="number"
                  name="dimensions_cm.length"
                  value={formData.dimensions_cm.length}
                  onChange={handleChange}
                  className={styles.input}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Width</label>
                <input
                  type="number"
                  name="dimensions_cm.width"
                  value={formData.dimensions_cm.width}
                  onChange={handleChange}
                  className={styles.input}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Height</label>
                <input
                  type="number"
                  name="dimensions_cm.height"
                  value={formData.dimensions_cm.height}
                  onChange={handleChange}
                  className={styles.input}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === 'seo' && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tags (comma separated)</label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleArrayChange('tags', e.target.value)}
                className={styles.input}
                placeholder="gaming, premium, rgb"
              />
              <div className={styles.tagsPreview}>
                {formData.tags.map((tag, index) => (
                  <span key={index} className={styles.tagPreview}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>SEO Keywords (comma separated)</label>
              <input
                type="text"
                value={formData.seo_keywords.join(', ')}
                onChange={(e) => handleArrayChange('seo_keywords', e.target.value)}
                className={styles.input}
                placeholder="gaming pc, high performance, computer parts"
              />
            </div>
          </>
        )}
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={styles.saveButton}>
          <SaveIcon size={16} />
          Save Changes
        </button>
      </div>
    </form>
  );

  const renderToggleStockContent = () => (
    <div className={styles.toggleContent}>
      <div className={styles.toggleIcon}>
        {product.stockStatus === 'in_stock' ? (
          <ToggleLeftIcon size={48} />
        ) : (
          <ToggleRightIcon size={48} />
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

  const renderDeleteContent = () => (
    <div className={styles.deleteContent}>
      <div className={styles.deleteIcon}>
        <TrashIcon size={48} />
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

  const renderDuplicateContent = () => (
    <div className={styles.duplicateContent}>
      <div className={styles.duplicateIcon}>
        <DuplicateIcon size={48} />
      </div>
      <h3 className={styles.duplicateTitle}>Duplicate Product</h3>
      <p className={styles.duplicateDescription}>
        This will create a copy of "<strong>{product.name}</strong>" with a new SKU.
        The duplicated product will have "(Copy)" appended to its name.
      </p>
      <div className={styles.duplicateActions}>
        <button className={styles.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button
          className={styles.duplicateButton}
          onClick={() => onConfirm(product.id, 'duplicate', {})}
        >
          Duplicate Product
        </button>
      </div>
    </div>
  );

  const renderViewContent = () => (
    <div className={styles.viewContent}>
      <div className={styles.viewHeader}>
        <h3 className={styles.viewTitle}>{product.name}</h3>
        <div className={`${styles.statusBadge} ${styles[product.stockStatus]}`}>
          {product.stockStatus.replace('_', ' ')}
        </div>
      </div>

      {product.images && product.images.length > 0 && (
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <img src={product.images[0]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.slice(1, 4).map((img, index) => (
                <div key={index} className={styles.thumbnail}>
                  <img src={img} alt={`${product.name} ${index + 2}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.viewGrid}>
        <div className={styles.viewSection}>
          <h4 className={styles.sectionTitle}>Basic Information</h4>
          <div className={styles.viewRow}>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Brand:</span>
              <span className={styles.viewValue}>{product.brand}</span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Category:</span>
              <span className={styles.viewValue}>{product.category}</span>
              {product.subcategory && (
                <span className={styles.viewSubcategory}> ({product.subcategory})</span>
              )}
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>SKU:</span>
              <span className={styles.viewValue}>{product.sku}</span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>UPC:</span>
              <span className={styles.viewValue}>{product.upc || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className={styles.viewSection}>
          <h4 className={styles.sectionTitle}>Pricing & Stock</h4>
          <div className={styles.viewRow}>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Price:</span>
              <span className={styles.viewValue}>{product.currency || '₱'}{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Stock:</span>
              <span className={styles.viewValue}>
                <span className={product.stock < 10 ? styles.lowStockValue : ''}>
                  {product.stock}
                </span>
                {product.stock < 10 && (
                  <span className={styles.lowStockIndicator}> (Low Stock)</span>
                )}
              </span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Weight:</span>
              <span className={styles.viewValue}>{product.weight_kg ? `${product.weight_kg} kg` : 'N/A'}</span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Dimensions:</span>
              <span className={styles.viewValue}>{formatDimensions()}</span>
            </div>
          </div>
        </div>

        <div className={styles.viewSection}>
          <h4 className={styles.sectionTitle}>Specifications</h4>
          <div className={styles.specsPreview}>
            <div className={styles.specsSummary}>
              <strong>Summary:</strong> {getSpecsSummary()}
            </div>
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className={styles.specsDetails}>
                {Object.entries(product.specifications).map(([category, specs], idx) => (
                  <div key={idx} className={styles.specsCategory}>
                    <strong>{category}:</strong>
                    {typeof specs === 'object' ? (
                      <ul>
                        {Object.entries(specs).map(([key, value]) => (
                          <li key={key}>
                            <span className={styles.specKey}>{key}:</span>
                            <span className={styles.specValue}>
                              {Array.isArray(value) ? value.join(', ') : value.toString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className={styles.specValue}>{specs.toString()}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {product.ratings && (
          <div className={styles.viewSection}>
            <h4 className={styles.sectionTitle}>Ratings & Reviews</h4>
            <div className={styles.ratingSection}>
              <div className={styles.ratingOverview}>
                <div className={styles.ratingStarsLarge}>
                  {renderRatingStars(product.ratings.average)}
                </div>
                <div className={styles.ratingScore}>
                  <span className={styles.ratingAverage}>{product.ratings.average.toFixed(1)}</span>
                  <span className={styles.ratingCount}>({product.ratings.count} reviews)</span>
                </div>
              </div>
              {product.ratings.breakdown && (
                <div className={styles.ratingBreakdown}>
                  {Object.entries(product.ratings.breakdown).map(([stars, count]) => (
                    <div key={stars} className={styles.ratingBar}>
                      <span className={styles.ratingLabel}>{stars.replace('_', ' ')}:</span>
                      <div className={styles.ratingBarContainer}>
                        <div 
                          className={styles.ratingBarFill}
                          style={{ 
                            width: `${(count / product.ratings.count) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className={styles.ratingCountSmall}>{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {product.metadata?.tags && product.metadata.tags.length > 0 && (
          <div className={styles.viewSection}>
            <h4 className={styles.sectionTitle}>Tags & SEO</h4>
            <div className={styles.tagsSection}>
              <div className={styles.tagsList}>
                {product.metadata.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>{tag.replace('_', ' ')}</span>
                ))}
              </div>
              {product.metadata.seo_keywords && product.metadata.seo_keywords.length > 0 && (
                <div className={styles.seoKeywords}>
                  <strong>SEO Keywords:</strong>
                  <p>{product.metadata.seo_keywords.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.viewSection}>
          <h4 className={styles.sectionTitle}>Metadata</h4>
          <div className={styles.viewRow}>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Created:</span>
              <span className={styles.viewValue}>
                {new Date(product.metadata?.created_at || product.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Updated:</span>
              <span className={styles.viewValue}>
                {new Date(product.metadata?.updated_at || product.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.viewItem}>
              <span className={styles.viewLabel}>Created By:</span>
              <span className={styles.viewValue}>{product.metadata?.created_by || 'System'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.viewActions}>
        <button className={styles.closeViewButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (action) {
      case 'edit':
        return renderEditContent();
      case 'toggleStock':
        return renderToggleStockContent();
      case 'delete':
        return renderDeleteContent();
      case 'duplicate':
        return renderDuplicateContent();
      case 'view':
        return renderViewContent();
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (action) {
      case 'edit': return 'Edit Product';
      case 'toggleStock': return 'Update Stock Status';
      case 'delete': return 'Delete Product';
      case 'duplicate': return 'Duplicate Product';
      case 'view': return 'Product Details';
      default: return 'Quick Action';
    }
  };

  if (!product) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modal} ${action === 'view' ? styles.viewModal : ''}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{getModalTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon size={24} />
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
