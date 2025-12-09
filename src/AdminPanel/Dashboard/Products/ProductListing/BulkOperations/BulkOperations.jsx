import React, { useState } from 'react';
import { FiX, FiPercent, FiBox, FiTrash2, FiTag } from 'react-icons/fi';
import styles from './BulkOperations.module.css';

const BulkOperations = ({ selectedCount, onClose, onOperation }) => {
  const [selectedOperation, setSelectedOperation] = useState('');
  const [operationData, setOperationData] = useState({});

  const operations = [
    {
      id: 'updatePrice',
      title: 'Update Price',
      icon: <FiPercent size={20} />,
      color: '#3498db',
      description: 'Apply price change to selected products',
      fields: [
        {
          name: 'priceChangeType',
          label: 'Change Type',
          type: 'select',
          options: [
            { value: 'fixed', label: 'Set Fixed Price' },
            { value: 'increase', label: 'Increase by Amount' },
            { value: 'decrease', label: 'Decrease by Amount' },
            { value: 'percentage', label: 'Change by Percentage' }
          ]
        },
        {
          name: 'priceValue',
          label: 'Value',
          type: 'number',
          placeholder: 'Enter amount or percentage',
          min: 0
        }
      ]
    },
    {
      id: 'updateStock',
      title: 'Update Stock',
      icon: <FiBox size={20} />,
      color: '#2ecc71',
      description: 'Update stock quantity and status',
      fields: [
        {
          name: 'newStock',
          label: 'New Stock Quantity',
          type: 'number',
          placeholder: 'Enter stock quantity',
          min: 0
        },
        {
          name: 'newStockStatus',
          label: 'Stock Status',
          type: 'select',
          options: [
            { value: 'in_stock', label: 'In Stock' },
            { value: 'low_stock', label: 'Low Stock' },
            { value: 'out_of_stock', label: 'Out of Stock' }
          ]
        }
      ]
    },
    {
      id: 'updateCategory',
      title: 'Update Category',
      icon: <FiTag size={20} />,
      color: '#9b59b6',
      description: 'Change category for selected products',
      fields: [
        {
          name: 'newCategory',
          label: 'New Category',
          type: 'text',
          placeholder: 'Enter new category name'
        }
      ]
    },
    {
      id: 'delete',
      title: 'Delete Products',
      icon: <FiTrash2 size={20} />,
      color: '#e74c3c',
      description: 'Permanently remove selected products',
      warning: 'This action cannot be undone',
      fields: [
        {
          name: 'confirmation',
          label: 'Type "DELETE" to confirm',
          type: 'text',
          placeholder: 'Type DELETE to confirm'
        }
      ]
    }
  ];

  const handleOperationSelect = (operationId) => {
    setSelectedOperation(operationId);
    setOperationData({});
  };

  const handleFieldChange = (fieldName, value) => {
    setOperationData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedOperation === 'delete' && operationData.confirmation !== 'DELETE') {
      alert('Please type "DELETE" to confirm deletion');
      return;
    }

    if (selectedOperation) {
      onOperation(selectedOperation, operationData);
    }
  };

  const getCurrentOperation = () => {
    return operations.find(op => op.id === selectedOperation);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Bulk Operations</h2>
          <p className={styles.modalSubtitle}>
            Apply operations to {selectedCount} selected product{selectedCount !== 1 ? 's' : ''}
          </p>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className={styles.operationsGrid}>
          {operations.map((operation) => (
            <button
              key={operation.id}
              className={`${styles.operationCard} ${
                selectedOperation === operation.id ? styles.selected : ''
              }`}
              onClick={() => handleOperationSelect(operation.id)}
              style={{
                borderColor: selectedOperation === operation.id ? operation.color : 'transparent'
              }}
            >
              <div 
                className={styles.operationIcon}
                style={{ backgroundColor: operation.color }}
              >
                {operation.icon}
              </div>
              <div className={styles.operationContent}>
                <h4 className={styles.operationTitle}>{operation.title}</h4>
                <p className={styles.operationDescription}>{operation.description}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedOperation && (
          <form className={styles.operationForm} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>{getCurrentOperation().title}</h3>
              {getCurrentOperation().warning && (
                <div className={styles.warningAlert}>
                  ⚠️ {getCurrentOperation().warning}
                </div>
              )}
            </div>

            <div className={styles.formFields}>
              {getCurrentOperation().fields.map((field) => (
                <div key={field.name} className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      className={styles.fieldInput}
                      value={operationData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className={styles.fieldInput}
                      value={operationData[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      min={field.min}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                style={{
                  backgroundColor: getCurrentOperation().color
                }}
              >
                Apply to {selectedCount} Product{selectedCount !== 1 ? 's' : ''}
              </button>
            </div>
          </form>
        )}

        {!selectedOperation && (
          <div className={styles.noOperationSelected}>
            <p>Select an operation from above to continue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperations;