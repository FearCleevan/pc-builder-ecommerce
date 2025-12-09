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
    priceRange: { min: 0, max: 150000 },
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

  // Mock data initialization based on provided JSON structure
  useEffect(() => {
    const mockProducts = [
      {
        id: "case-1",
        name: "Antec C8 ATX Full Tower",
        category: "Case",
        subcategory: "ATX Full Tower",
        brand: "Antec",
        price: 11413.93,
        currency: "PHP",
        stock: 15,
        stockStatus: "in_stock",
        images: [
          "https://example.com/images/cases/antec-c8-atx-full-tower-front.jpg",
          "https://example.com/images/cases/antec-c8-atx-full-tower-side.jpg",
          "https://example.com/images/cases/antec-c8-atx-full-tower-interior.jpg"
        ],
        description: "Antec C8 ATX Full Tower Case with Tempered Glass Side Panel",
        short_description: "ATX Full Tower case with excellent airflow and cable management",
        sku: "ANT-C8-BLK",
        upc: "761345623489",
        weight_kg: 12.9,
        dimensions_cm: {
          length: 55.0,
          width: 25.0,
          height: 60.0
        },
        specifications: {
          general: {
            form_factor: "ATX Full Tower",
            side_panel: "Tempered Glass",
            color: "Black",
            transparent_side_panel: true,
            expansion_slots: 8,
            volume_liters: 68,
            weight_kg: 12.9
          },
          compatibility: {
            max_gpu_length_mm: 450,
            max_cpu_cooler_height_mm: 185,
            motherboard_support: ["ATX", "Micro-ATX", "Mini-ITX"]
          },
          storage: {
            drive_bays_3_5: 6,
            drive_bays_2_5: 4
          },
          cooling: {
            fan_support_front: "3x 120mm or 2x 140mm",
            fan_support_top: "3x 120mm or 2x 140mm",
            fan_support_rear: "1x 120mm",
            radiator_support: "360mm front, 280mm top"
          }
        },
        ratings: {
          average: 4.5,
          count: 128,
          breakdown: {
            "5_star": 85,
            "4_star": 30,
            "3_star": 8,
            "2_star": 3,
            "1_star": 2
          }
        },
        metadata: {
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          created_by: "admin@system",
          tags: ["gaming", "full_tower", "tempered_glass", "high_airflow"],
          seo_keywords: ["Antec C8", "ATX Full Tower", "gaming case", "tempered glass case"]
        },
        related_products: [
          "cpu-cooler-nzxt-kraken-x73",
          "case-fan-noctua-nf-a12x25",
          "power-supply-corsair-rm1000x"
        ]
      },
      {
        id: "fan-1",
        name: "Noctua NF-A12x25 PWM Premium Quiet Fan",
        category: "Case Fan",
        subcategory: "120mm Fan",
        brand: "Noctua",
        price: 1710.43,
        currency: "PHP",
        stock: 50,
        stockStatus: "in_stock",
        images: [
          "https://example.com/images/fans/noctua-nf-a12x25-front.jpg",
          "https://example.com/images/fans/noctua-nf-a12x25-side.jpg"
        ],
        description: "Noctua NF-A12x25 PWM 120mm Premium Quiet Fan with SSO2 Bearing",
        short_description: "High-performance 120mm fan with advanced aerodynamic design",
        sku: "NF-A12x25-PWM",
        upc: "789456123012",
        weight_kg: 0.21,
        dimensions_cm: {
          length: 12.0,
          width: 12.0,
          height: 2.5
        },
        specifications: {
          performance: {
            size_mm: 120,
            airflow_cfm: 60.1,
            noise_level_dba: 22.6,
            static_pressure_mmh2o: 2.34,
            rpm: "2000 RPM",
            voltage: "12V"
          },
          construction: {
            bearing_type: "SSO2",
            connector: "4-pin PWM",
            led: "None",
            color: "Brown",
            frame_material: "Fiberglass reinforced polyamide"
          },
          reliability: {
            mtbf_hours: 150000,
            warranty_months: 72
          }
        },
        compatibility: {
          mounting_holes: "120mm",
          thickness_mm: 25
        },
        warranty: {
          period_months: 72,
          type: "Manufacturer Warranty",
          international_warranty: true
        },
        ratings: {
          average: 4.9,
          count: 456,
          breakdown: {
            "5_star": 420,
            "4_star": 30,
            "3_star": 4,
            "2_star": 1,
            "1_star": 1
          }
        },
        metadata: {
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          created_by: "admin@system",
          tags: ["quiet", "premium", "pwm", "high_airflow"],
          seo_keywords: ["Noctua NF-A12x25", "quiet fan", "PWM fan", "120mm fan"]
        },
        related_products: [
          "case-antec-c8-atx-full-tower",
          "cpu-cooler-nzxt-kraken-x73"
        ]
      },
      {
        id: "cpu-cooler-1",
        name: "NZXT Kraken X73 RGB 360mm AIO Liquid Cooler",
        category: "CPU Cooler",
        subcategory: "Liquid Cooler",
        brand: "NZXT",
        price: 10260.00,
        currency: "PHP",
        stock: 25,
        stockStatus: "in_stock",
        images: [
          "https://example.com/images/coolers/nzxt-kraken-x73-front.jpg",
          "https://example.com/images/coolers/nzxt-kraken-x73-radiator.jpg",
          "https://example.com/images/coolers/nzxt-kraken-x73-pump.jpg"
        ],
        description: "NZXT Kraken X73 RGB 360mm All-in-One Liquid CPU Cooler with RGB Lighting",
        short_description: "360mm AIO liquid cooler with RGB lighting and CAM software control",
        sku: "KRAKEN-X73",
        upc: "789456123345",
        weight_kg: 1.8,
        dimensions_cm: {
          length: 40.0,
          width: 12.0,
          height: 39.5
        },
        specifications: {
          cooling: {
            type: "Liquid Cooler",
            water_cooled: true,
            radiator_size_mm: 360,
            fan_size_mm: 120,
            fan_quantity: 3,
            fan_rpm: "500-2000 RPM",
            pump_rpm: "800-2800 RPM",
            noise_level_dba: "21-36 dB"
          },
          performance: {
            tdp_w: 350,
            liquid_type: "Ethylene Glycol-based"
          },
          features: {
            rgb_lighting: true,
            software_control: "NZXT CAM",
            lcd_display: false
          }
        },
        compatibility: {
          cpu_sockets: ["Intel LGA 1150", "LGA 1151", "LGA 1155", "LGA 1156", "LGA 1200", "LGA 1366", "LGA 1700", "LGA 2011", "LGA 2011-3", "LGA 2066", "AMD AM4", "AM5"],
          case_compatibility: ["Supports 360mm radiator"]
        },
        warranty: {
          period_months: 72,
          type: "Manufacturer Warranty",
          international_warranty: true
        },
        ratings: {
          average: 4.7,
          count: 289,
          breakdown: {
            "5_star": 220,
            "4_star": 50,
            "3_star": 15,
            "2_star": 3,
            "1_star": 1
          }
        },
        metadata: {
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          created_by: "admin@system",
          tags: ["aio", "liquid_cooling", "rgb", "360mm", "premium"],
          seo_keywords: ["NZXT Kraken X73", "360mm AIO", "liquid cooler", "RGB cooler"]
        },
        related_products: [
          "cpu-amd-ryzen-9-7950x",
          "case-antec-c8-atx-full-tower",
          "case-fan-noctua-nf-a12x25"
        ]
      },
      {
        id: "gpu-1",
        name: "NVIDIA GeForce RTX 4090 24GB",
        category: "GPU",
        subcategory: "Graphics Card",
        brand: "NVIDIA",
        price: 91200.00,
        currency: "PHP",
        stock: 8,
        stockStatus: "in_stock",
        images: [
          "https://example.com/images/gpu/nvidia-rtx-4090-front.jpg",
          "https://example.com/images/gpu/nvidia-rtx-4090-back.jpg",
          "https://example.com/images/gpu/nvidia-rtx-4090-side.jpg"
        ],
        description: "NVIDIA GeForce RTX 4090 24GB GDDR6X Graphics Card with DLSS 3",
        short_description: "Flagship 24GB GDDR6X GPU with Ada Lovelace architecture",
        sku: "RTX4090-24G",
        upc: "789456123456",
        weight_kg: 2.5,
        dimensions_cm: {
          length: 30.4,
          width: 13.5,
          height: 6.1
        },
        specifications: {
          performance: {
            chipset: "GeForce RTX 4090",
            cuda_cores: 16384,
            memory_type: "GDDR6X",
            memory_size_gb: 24,
            memory_interface_bit: 384,
            memory_speed_gbps: 21,
            base_clock_mhz: 2235,
            boost_clock_mhz: 2520,
            tdp_w: 450
          },
          architecture: {
            architecture: "Ada Lovelace",
            process_nm: 5,
            pcie_version: "PCIe 4.0",
            ray_tracing_cores: "3rd Gen",
            tensor_cores: "4th Gen",
            dlss_support: "DLSS 3"
          },
          display: {
            displayport_outputs: 3,
            hdmi_outputs: 1,
            hdmi_version: "2.1",
            displayport_version: "1.4a",
            max_resolution: "7680x4320 @ 60Hz"
          },
          power: {
            power_connectors: "16-pin (12VHPWR)",
            recommended_psu_w: 850
          }
        },
        compatibility: {
          interface: "PCIe 4.0 x16",
          required_psu_w: 850,
          case_clearance_mm: 304
        },
        warranty: {
          period_months: 36,
          type: "Manufacturer Warranty",
          international_warranty: true
        },
        ratings: {
          average: 4.8,
          count: 421,
          breakdown: {
            "5_star": 350,
            "4_star": 55,
            "3_star": 10,
            "2_star": 4,
            "1_star": 2
          }
        },
        metadata: {
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          created_by: "admin@system",
          tags: ["gaming", "4k", "ray_tracing", "ai", "flagship"],
          seo_keywords: ["RTX 4090", "NVIDIA", "24GB GPU", "gaming graphics card"]
        },
        related_products: [
          "cpu-amd-ryzen-9-7950x",
          "monitor-samsung-odyssey-g7-32",
          "power-supply-corsair-rm1000x"
        ]
      },
      {
        id: "motherboard-1",
        name: "ASRock B450 Pro4 R2.0 ATX AM4",
        category: "Motherboard",
        subcategory: "ATX Motherboard",
        brand: "ASRock",
        price: 5700.00,
        currency: "PHP",
        stock: 30,
        stockStatus: "in_stock",
        images: [
          "https://example.com/images/motherboard/asrock-b450-pro4-front.jpg",
          "https://example.com/images/motherboard/asrock-b450-pro4-back.jpg",
          "https://example.com/images/motherboard/asrock-b450-pro4-package.jpg"
        ],
        description: "ASRock B450 Pro4 R2.0 ATX Motherboard for AMD Ryzen AM4 CPUs",
        short_description: "ATX motherboard with AMD B450 chipset for AM4 processors",
        sku: "B450-PRO4-R2",
        upc: "789456123567",
        weight_kg: 1.2,
        dimensions_cm: {
          length: 30.5,
          width: 24.4,
          height: 0.6
        },
        specifications: {
          general: {
            socket: "AM4",
            chipset: "AMD B450",
            form_factor: "ATX",
            color: "Black",
            ecc_support: false,
            raid_support: true,
            bios_flashback: false
          },
          memory: {
            memory_type: "DDR4",
            memory_slots: 4,
            max_memory_gb: 64,
            memory_speed_mhz: [3200, 2933, 2666]
          },
          expansion: {
            pcie_slots: "1x PCIe 3.0 x16, 1x PCIe 2.0 x16, 3x PCIe 2.0 x1",
            m2_slots: 1,
            sata_6gb_ports: 6
          },
          connectivity: {
            usb_2_0_headers: 2,
            usb_3_2_gen1_headers: 1,
            audio_codec: "Realtek ALC892",
            lan_speed: "Gigabit Ethernet",
            audio_channels: "7.1"
          }
        },
        compatibility: {
          cpu_sockets: ["AM4"],
          memory_types: ["DDR4"],
          cooler_compatibility: ["AM4"]
        },
        warranty: {
          period_months: 36,
          type: "Manufacturer Warranty",
          international_warranty: true
        },
        ratings: {
          average: 4.3,
          count: 187,
          breakdown: {
            "5_star": 120,
            "4_star": 45,
            "3_star": 15,
            "2_star": 5,
            "1_star": 2
          }
        },
        metadata: {
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-20T14:45:00Z",
          created_by: "admin@system",
          tags: ["budget", "am4", "atx", "gaming", "vr_ready"],
          seo_keywords: ["ASRock B450", "AM4 motherboard", "B450 chipset", "ATX motherboard"]
        },
        related_products: [
          "cpu-amd-ryzen-9-7950x",
          "ram-corsair-vengeance-rgb-32gb",
          "case-antec-c8-atx-full-tower"
        ]
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
      lowStock: productsList.filter(p => p.stock < 10 && p.stockStatus === 'in_stock').length,
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
        product.brand.toLowerCase().includes(appliedFilters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(appliedFilters.search.toLowerCase())
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
      if (appliedFilters.stockStatus === 'low_stock') {
        filtered = filtered.filter(product => product.stock < 10 && product.stockStatus === 'in_stock');
      } else {
        filtered = filtered.filter(product => product.stockStatus === appliedFilters.stockStatus);
      }
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
        case 'rating':
          return order * (b.ratings?.average || 0) - (a.ratings?.average || 0);
        case 'date':
          return order * (new Date(a.metadata?.created_at || a.createdAt) - new Date(b.metadata?.created_at || b.createdAt));
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
    let updatedProducts = [...products];
    
    switch (operation) {
      case 'updatePrice':
        updatedProducts = updatedProducts.map(product => {
          if (selectedProducts.includes(product.id)) {
            return {
              ...product,
              price: data.newPrice
            };
          }
          return product;
        });
        break;
        
      case 'updateStock':
        updatedProducts = updatedProducts.map(product => {
          if (selectedProducts.includes(product.id)) {
            const newStock = data.newStock;
            const newStockStatus = newStock === 0 ? 'out_of_stock' : 
                                  newStock < 10 ? 'in_stock' : 'in_stock';
            return {
              ...product,
              stock: newStock,
              stockStatus: newStockStatus
            };
          }
          return product;
        });
        break;
        
      case 'updateCategory':
        updatedProducts = updatedProducts.map(product => {
          if (selectedProducts.includes(product.id)) {
            return {
              ...product,
              category: data.newCategory
            };
          }
          return product;
        });
        break;
        
      case 'delete':
        updatedProducts = updatedProducts.filter(product => 
          !selectedProducts.includes(product.id)
        );
        break;
        
      case 'updateStatus':
        updatedProducts = updatedProducts.map(product => {
          if (selectedProducts.includes(product.id)) {
            return {
              ...product,
              stockStatus: data.newStatus
            };
          }
          return product;
        });
        break;
        
      case 'addTag':
        updatedProducts = updatedProducts.map(product => {
          if (selectedProducts.includes(product.id)) {
            const currentTags = product.metadata?.tags || [];
            const newTags = [...new Set([...currentTags, ...data.tags])];
            return {
              ...product,
              metadata: {
                ...product.metadata,
                tags: newTags
              }
            };
          }
          return product;
        });
        break;
    }

    setProducts(updatedProducts);
    applyFilters(filters);
    setSelectedProducts([]);
    setShowBulkOperations(false);
  };

  const handleQuickActionConfirm = (productId, action, data) => {
    let updatedProducts = [...products];
    
    switch (action) {
      case 'edit':
        updatedProducts = updatedProducts.map(product => {
          if (product.id === productId) {
            return {
              ...product,
              ...data.updates,
              metadata: {
                ...product.metadata,
                updated_at: new Date().toISOString()
              }
            };
          }
          return product;
        });
        break;
        
      case 'toggleStock':
        updatedProducts = updatedProducts.map(product => {
          if (product.id === productId) {
            const newStatus = product.stockStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
            return {
              ...product,
              stockStatus: newStatus
            };
          }
          return product;
        });
        break;
        
      case 'delete':
        updatedProducts = updatedProducts.filter(product => product.id !== productId);
        break;
        
      case 'duplicate':
        const originalProduct = products.find(p => p.id === productId);
        if (originalProduct) {
          const newProduct = {
            ...originalProduct,
            id: `${productId}-copy-${Date.now()}`,
            name: `${originalProduct.name} (Copy)`,
            sku: `${originalProduct.sku}-COPY`,
            metadata: {
              ...originalProduct.metadata,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              created_by: "admin@system"
            }
          };
          updatedProducts.push(newProduct);
        }
        break;
    }

    setProducts(updatedProducts);
    applyFilters(filters);
    setShowQuickActionModal(false);
    setSelectedProductForAction(null);
  };

  const getAllCategories = () => {
    const categoriesSet = new Set();
    products.forEach(product => {
      categoriesSet.add(product.category);
    });
    return Array.from(categoriesSet);
  };

  const getAllBrands = () => {
    const brandsSet = new Set();
    products.forEach(product => {
      brandsSet.add(product.brand);
    });
    return Array.from(brandsSet);
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
        categories={getAllCategories()}
        brands={getAllBrands()}
        priceRange={{ min: 0, max: 150000 }}
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
          categories={getAllCategories()}
        />
      )}

      {/* Quick Action Modal */}
      {showQuickActionModal && selectedProductForAction && (
        <QuickActionModal
          product={selectedProductForAction.product}
          action={selectedProductForAction.action}
          onClose={() => setShowQuickActionModal(false)}
          onConfirm={handleQuickActionConfirm}
          categories={getAllCategories()}
          brands={getAllBrands()}
        />
      )}
    </div>
  );
};

export default ProductListing;