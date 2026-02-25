// client/src/components/MockData/ProductMockData.js
import ComponentsImage from "../../assets/Products1.png";

export const categories = [
  "Components",
  "Peripherals",
  "Accessories",
  "OS & Softwares",
];

export const gpuOptions = [
  { id: 'rtx5090', label: 'GeForce RTX™ 5090' },
  { id: 'rtx5080', label: 'GeForce RTX™ 5080' },
  { id: 'rtx5070ti', label: 'GeForce RTX™ 5070 Ti' },
  { id: 'rtx5070', label: 'GeForce RTX™ 5070' },
  { id: 'rtx5060', label: 'GeForce RTX™ 5060' },
  { id: 'rtx5050', label: 'GeForce RTX™ 5050' }
];

export const processorOptions = [
  { id: 'intel-series2', label: 'Intel Series 2' },
  { id: 'intel-series1', label: 'Intel Series 1' },
  { id: 'intel-14gen', label: 'Intel 14th Gen' },
  { id: 'intel-13gen', label: 'Intel 13th Gen' },
  { id: 'amd-ai300', label: 'AMD Ryzen™ AI 300 Series' },
  { id: 'amd-9000', label: 'AMD Ryzen™ 9000 Series' }
];

export const panelSizeOptions = [
  { id: '15', label: '15"' },
  { id: '16', label: '16"' },
  { id: '17', label: '17"' },
  { id: '18', label: '18"' },
  { id: 'oled', label: 'OLED' },
  { id: 'miniled', label: 'MiniLED' }
];

const CATEGORY_FILTER_LABELS = {
  Components: {
    subcategory: "Component Types",
    series: "Component Series",
  },
  Peripherals: {
    subcategory: "Peripheral Types",
    series: "Peripheral Series",
  },
  Accessories: {
    subcategory: "Accessory Types",
    series: "Accessory Series",
  },
  "OS & Softwares": {
    subcategory: "Software Types",
    series: "Software Suites",
  },
};

export const getProductFilterSections = (category) => {
  if (!category) return [];

  const labels = CATEGORY_FILTER_LABELS[category] || {
    subcategory: "Subcategories",
    series: "Series",
  };

  return [
    {
      id: "subcategory",
      label: labels.subcategory,
      filterType: "subcategory",
      options: getSubCategories(category),
      defaultCount: 6,
    },
    {
      id: "series",
      label: labels.series,
      filterType: "series",
      options: getSeriesItems(category),
      defaultCount: 6,
    },
  ];
};

const SERIES_DRILLDOWN_CONFIG = {
  "graphics-series": {
    sectionId: "gpu-generation",
    label: "GPU Generation",
    options: [
      { id: "gpu-rtx-50", label: "NVIDIA RTX 50 Series", pattern: /\brtx\s*50/i },
      { id: "gpu-rtx-40", label: "NVIDIA RTX 40 Series", pattern: /\brtx\s*40/i },
      { id: "gpu-rtx-30", label: "NVIDIA RTX 30 Series", pattern: /\brtx\s*30/i },
      { id: "gpu-rtx-20", label: "NVIDIA RTX 20 Series", pattern: /\brtx\s*20/i },
      { id: "gpu-amd-7000", label: "AMD RX 7000 Series", pattern: /\brx\s*7\d{3}/i },
      { id: "gpu-amd-6000", label: "AMD RX 6000 Series", pattern: /\brx\s*6\d{3}/i },
      { id: "gpu-amd-5000", label: "AMD RX 5000 Series", pattern: /\brx\s*5\d{3}/i },
      { id: "gpu-intel-arc", label: "Intel Arc Series", pattern: /\barc\s*a\d{3}/i },
    ],
  },
  "intel-processors-series": {
    sectionId: "intel-generation",
    label: "Intel Processor Family",
    options: [
      { id: "intel-14th-gen", label: "Intel 14th Gen", pattern: /\b14\d{3}[a-z]?/i },
      { id: "intel-13th-gen", label: "Intel 13th Gen", pattern: /\b13\d{3}[a-z]?/i },
      { id: "intel-12th-gen", label: "Intel 12th Gen", pattern: /\b12\d{3}[a-z]?/i },
      { id: "intel-11th-gen", label: "Intel 11th Gen", pattern: /\b11\d{3}[a-z]?/i },
      { id: "intel-10th-gen", label: "Intel 10th Gen", pattern: /\b10\d{3}[a-z]?/i },
      { id: "intel-xeon", label: "Intel Xeon", pattern: /\bxeon\b/i },
    ],
  },
  "amd-processors-series": {
    sectionId: "amd-generation",
    label: "AMD Processor Family",
    options: [
      { id: "amd-9000", label: "Ryzen 9000 Series", pattern: /\b9\d{3,4}[xgkt]*\b/i },
      { id: "amd-7000", label: "Ryzen 7000 Series", pattern: /\b7\d{3,4}[xgkt]*\b/i },
      { id: "amd-5000", label: "Ryzen 5000 Series", pattern: /\b5\d{3,4}[xgkt]*\b/i },
      { id: "amd-4000", label: "Ryzen 4000 Series", pattern: /\b4\d{3,4}[xgkt]*\b/i },
      { id: "amd-3000", label: "Ryzen 3000 Series", pattern: /\b3\d{3,4}[xgkt]*\b/i },
      { id: "amd-threadripper", label: "Threadripper", pattern: /\bthreadripper\b/i },
    ],
  },
  "motherboards-series": {
    sectionId: "motherboard-platform",
    label: "Motherboard Platform",
    options: [
      { id: "mb-am5", label: "AMD AM5", pattern: /\bam5\b/i },
      { id: "mb-am4", label: "AMD AM4", pattern: /\bam4\b/i },
      { id: "mb-lga1700", label: "Intel LGA1700", pattern: /\blga1700\b/i },
      { id: "mb-lga1200", label: "Intel LGA1200", pattern: /\blga1200\b/i },
      { id: "mb-ddr5", label: "DDR5 Boards", pattern: /\bddr5\b/i },
      { id: "mb-ddr4", label: "DDR4 Boards", pattern: /\bddr4\b/i },
    ],
  },
  "memory-series": {
    sectionId: "memory-type",
    label: "Memory Type",
    options: [
      { id: "ram-ddr5", label: "DDR5", pattern: /\bddr5\b/i },
      { id: "ram-ddr4", label: "DDR4", pattern: /\bddr4\b/i },
      { id: "ram-ddr3", label: "DDR3", pattern: /\bddr3\b/i },
      { id: "ram-16gb-up", label: "16GB and Up", pattern: /\b(16|32|64|128)\s*gb\b/i },
    ],
  },
};

const getPriceTierOptions = () => [
  { id: "tier-budget", label: "Budget (<= ₱15,000)" },
  { id: "tier-mid", label: "Mid Range (₱15,001 - ₱40,000)" },
  { id: "tier-premium", label: "Premium (>= ₱40,001)" },
];

export const getSeriesDrilldownSections = (category, selectedSeries = [], products = []) => {
  if (!category || selectedSeries.length === 0) return [];

  const sectionMap = new Map();

  selectedSeries.forEach((seriesId) => {
    const seriesConfig = SERIES_DRILLDOWN_CONFIG[seriesId];
    if (seriesConfig) {
      sectionMap.set(seriesConfig.sectionId, {
        id: seriesConfig.sectionId,
        label: seriesConfig.label,
        filterType: "seriesFacet",
        options: seriesConfig.options,
        defaultCount: 6,
      });
    }
  });

  const matchingProducts = products.filter(
    (product) => product.category === category && selectedSeries.includes(product.series)
  );

  const brands = Array.from(
    new Set(
      matchingProducts
        .map((product) => product.brand || product.specs?.Manufacturer)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));

  if (brands.length > 0) {
    sectionMap.set("series-brand", {
      id: "series-brand",
      label: "Brand",
      filterType: "seriesFacet",
      options: brands.map((brand) => ({
        id: `brand-${String(brand).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        label: brand,
      })),
      defaultCount: 8,
    });
  }

  sectionMap.set("series-price-tier", {
    id: "series-price-tier",
    label: "Price Tier",
    filterType: "seriesFacet",
    options: getPriceTierOptions(),
    defaultCount: 3,
  });

  return Array.from(sectionMap.values());
};

const getProductSearchBlob = (product) => {
  const specValues = Object.values(product.specs || {}).join(" ");
  return `${product.name || ""} ${specValues}`.toLowerCase();
};

const inPriceTier = (product, tierId) => {
  const price = Number(product.price || 0);
  if (tierId === "tier-budget") return price <= 15000;
  if (tierId === "tier-mid") return price > 15000 && price <= 40000;
  if (tierId === "tier-premium") return price > 40000;
  return false;
};

export const matchesSeriesFacet = (product, facetId) => {
  if (!facetId) return true;
  if (facetId.startsWith("brand-")) {
    const brand = String(product.brand || product.specs?.Manufacturer || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    return `brand-${brand}` === facetId;
  }

  if (facetId.startsWith("tier-")) {
    return inPriceTier(product, facetId);
  }

  const blob = getProductSearchBlob(product);
  const allConfigs = Object.values(SERIES_DRILLDOWN_CONFIG).flatMap((section) => section.options);
  const matchOption = allConfigs.find((option) => option.id === facetId);

  if (!matchOption) return true;
  return matchOption.pattern.test(blob);
};

// Dedicated filter schema for product pages/navigation
export const productFilterConfig = {
  route: "/products",
  params: {
    category: "category",
    series: "series",
    subcategory: "subcategory",
    seriesFacet: "seriesFacet",
    availability: "availability",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
  },
  getFilterSections: getProductFilterSections,
  getSeriesDrilldownSections,
};

// Enhanced data structure with IDs and additional metadata
export const getSeriesItems = (category) => {
  switch (category) {
    case "Components":
      return [
        {
          id: "graphics-series",
          name: "Graphics Series",
          path: "/products?category=Components&series=graphics-series",
          image: ComponentsImage,
          description: "Dedicated GPUs for gaming and creator builds",
        },
        {
          id: "intel-processors-series",
          name: "Intel Processor Series",
          path: "/products?category=Components&series=intel-processors-series",
          image: ComponentsImage,
          description: "Intel processor lineup for all build tiers",
        },
        {
          id: "amd-processors-series",
          name: "AMD Processor Series",
          path: "/products?category=Components&series=amd-processors-series",
          image: ComponentsImage,
          description: "AMD processor lineup for gaming and productivity",
        },
        {
          id: "motherboards-series",
          name: "Motherboards Series",
          path: "/products?category=Components&series=motherboards-series",
          image: ComponentsImage,
          description: "Boards for Intel and AMD platforms",
        },
        {
          id: "memory-series",
          name: "Memory Series",
          path: "/products?category=Components&series=memory-series",
          image: ComponentsImage,
          description: "High-capacity and high-speed RAM kits",
        },
        {
          id: "storage-series",
          name: "Storage Series",
          path: "/products?category=Components&series=storage-series",
          image: ComponentsImage,
          description: "SSD and HDD storage options",
        },
        {
          id: "power-series",
          name: "Power Series",
          path: "/products?category=Components&series=power-series",
          image: ComponentsImage,
          description: "Reliable power supply units",
        },
        {
          id: "cooling-series",
          name: "Cooling Series",
          path: "/products?category=Components&series=cooling-series",
          image: ComponentsImage,
          description: "CPU coolers and case fans",
        },
        {
          id: "chassis-series",
          name: "Chassis Series",
          path: "/products?category=Components&series=chassis-series",
          image: ComponentsImage,
          description: "PC cases for every form factor",
        },
      ];
    case "Peripherals":
      return [
        {
          id: "input-devices-series",
          name: "Input Devices Series",
          path: "/products?category=Peripherals&series=input-devices-series",
          image: ComponentsImage,
          description: "Keyboards and mice for work and gaming",
        },
        {
          id: "display-series",
          name: "Display Series",
          path: "/products?category=Peripherals&series=display-series",
          image: ComponentsImage,
          description: "Monitor lineup for different use cases",
        },
        {
          id: "audio-series",
          name: "Audio Series",
          path: "/products?category=Peripherals&series=audio-series",
          image: ComponentsImage,
          description: "Headphones, speakers, and microphones",
        },
        {
          id: "streaming-series",
          name: "Streaming Series",
          path: "/products?category=Peripherals&series=streaming-series",
          image: ComponentsImage,
          description: "Webcams and content creation peripherals",
        },
      ];
    case "Accessories":
      return [
        {
          id: "premium-series",
          name: "Premium Series",
          path: "/series/premium",
          image: ComponentsImage,
          description: "High-end accessories",
        },
        {
          id: "essential-series",
          name: "Essential Series",
          path: "/series/essential",
          image: ComponentsImage,
          description: "Essential computer accessories",
        },
        {
          id: "travel-series",
          name: "Travel Series",
          path: "/series/travel",
          image: ComponentsImage,
          description: "Accessories for on-the-go use",
        },
        {
          id: "gaming-accessories",
          name: "Gaming Series",
          path: "/series/gaming-accessories",
          image: ComponentsImage,
          description: "Accessories for gamers",
        },
        {
          id: "office-series",
          name: "Office Series",
          path: "/series/office",
          image: ComponentsImage,
          description: "Office productivity accessories",
        },
        {
          id: "protection-series",
          name: "Protection Series",
          path: "/series/protection",
          image: ComponentsImage,
          description: "Device protection accessories",
        },
      ];
    case "OS & Softwares":
      return [
        {
          id: "security-suite",
          name: "Security Suite",
          path: "/software/security",
          image: ComponentsImage,
          description: "Comprehensive security solutions",
        },
        {
          id: "productivity-bundle",
          name: "Productivity Bundle",
          path: "/software/productivity",
          image: ComponentsImage,
          description: "Software for enhanced productivity",
        },
        {
          id: "gaming-optimization",
          name: "Gaming Optimization",
          path: "/software/gaming",
          image: ComponentsImage,
          description: "Software to optimize gaming performance",
        },
        {
          id: "creative-suite",
          name: "Creative Suite",
          path: "/software/creative",
          image: ComponentsImage,
          description: "Tools for creative professionals",
        },
        {
          id: "business-solutions",
          name: "Business Solutions",
          path: "/software/business",
          image: ComponentsImage,
          description: "Software for business needs",
        },
        {
          id: "education-package",
          name: "Education Package",
          path: "/software/education",
          image: ComponentsImage,
          description: "Educational software solutions",
        },
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Components":
      return [
        {
          id: "build-guides",
          name: "Build Guides",
          path: "/guides/build",
          image: ComponentsImage,
          description: "Step-by-step PC building guides",
        },
        {
          id: "compatibility-checker",
          name: "Compatibility Checker",
          path: "/tools/compatibility",
          image: ComponentsImage,
          description: "Check component compatibility",
        },
        {
          id: "performance-benchmarks",
          name: "Performance Benchmarks",
          path: "/benchmarks",
          image: ComponentsImage,
          description: "Performance comparison data",
        },
        {
          id: "cooling-solutions",
          name: "Cooling Solutions",
          path: "/solutions/cooling",
          image: ComponentsImage,
          description: "Cooling options for your build",
        },
        {
          id: "rgb-sync-technology",
          name: "RGB Sync Technology",
          path: "/technology/rgb-sync",
          image: ComponentsImage,
          description: "Synchronize RGB lighting across devices",
        },
      ];
    case "Peripherals":
      return [
        {
          id: "customization-hub",
          name: "Customization Hub",
          path: "/customization",
          image: ComponentsImage,
          description: "Customize your peripherals",
        },
        {
          id: "driver-software",
          name: "Driver & Software",
          path: "/support/drivers",
          image: ComponentsImage,
          description: "Download drivers and software",
        },
        {
          id: "gaming-profiles",
          name: "Gaming Profiles",
          path: "/profiles/gaming",
          image: ComponentsImage,
          description: "Pre-configured gaming settings",
        },
        {
          id: "wireless-connectivity",
          name: "Wireless Connectivity",
          path: "/technology/wireless",
          image: ComponentsImage,
          description: "Wireless technology information",
        },
        {
          id: "ergonomic-design",
          name: "Ergonomic Design",
          path: "/design/ergonomic",
          image: ComponentsImage,
          description: "Ergonomics and comfort features",
        },
      ];
    case "Accessories":
      return [
        {
          id: "setup-inspiration",
          name: "Setup Inspiration",
          path: "/inspiration",
          image: ComponentsImage,
          description: "Get inspired by others' setups",
        },
        {
          id: "cable-management",
          name: "Cable Management",
          path: "/solutions/cable-management",
          image: ComponentsImage,
          description: "Cable management solutions",
        },
        {
          id: "travel-solutions",
          name: "Travel Solutions",
          path: "/solutions/travel",
          image: ComponentsImage,
          description: "Accessories for traveling",
        },
        {
          id: "device-protection",
          name: "Device Protection",
          path: "/protection",
          image: ComponentsImage,
          description: "Protect your devices",
        },
        {
          id: "organization-tips",
          name: "Organization Tips",
          path: "/tips/organization",
          image: ComponentsImage,
          description: "Tips for organizing your setup",
        },
      ];
    case "OS & Softwares":
      return [
        {
          id: "free-trials",
          name: "Free Trials",
          path: "/software/trials",
          image: ComponentsImage,
          description: "Try before you buy",
        },
        {
          id: "system-requirements",
          name: "System Requirements",
          path: "/requirements",
          image: ComponentsImage,
          description: "Check system requirements",
        },
        {
          id: "license-options",
          name: "License Options",
          path: "/licensing",
          image: ComponentsImage,
          description: "Various licensing options",
        },
        {
          id: "update-center",
          name: "Update Center",
          path: "/updates",
          image: ComponentsImage,
          description: "Get the latest updates",
        },
        {
          id: "support-resources",
          name: "Support Resources",
          path: "/support",
          image: ComponentsImage,
          description: "Help and support resources",
        },
      ];
    default:
      return [];
  }
};

export const getSubCategories = (category) => {
  switch (category) {
    case "Components":
      return [
        {
          id: "motherboard",
          name: "Motherboard",
          path: "/products?category=Components&subcategory=motherboard",
          image: ComponentsImage,
          description: "Motherboards for various needs",
        },
        {
          id: "gpu",
          name: "Graphics Card",
          path: "/products?category=Components&subcategory=gpu",
          image: ComponentsImage,
          description: "Graphics cards for gaming and productivity",
        },
        {
          id: "cpu-intel",
          name: "Processor Intel",
          path: "/products?category=Components&subcategory=cpu-intel",
          image: ComponentsImage,
          description: "Intel processors",
        },
        {
          id: "cpu-amd",
          name: "Processor AMD",
          path: "/products?category=Components&subcategory=cpu-amd",
          image: ComponentsImage,
          description: "AMD processors",
        },
        {
          id: "memory",
          name: "RAM",
          path: "/products?category=Components&subcategory=memory",
          image: ComponentsImage,
          description: "Memory modules for your system",
        },
        {
          id: "storage",
          name: "SSD/HDD",
          path: "/products?category=Components&subcategory=storage",
          image: ComponentsImage,
          description: "Fast solid state drives",
        },
        {
          id: "psu",
          name: "Power Supply",
          path: "/products?category=Components&subcategory=psu",
          image: ComponentsImage,
          description: "Power supply units",
        },
        {
          id: "cooler",
          name: "CPU Cooler",
          path: "/products?category=Components&subcategory=cooler",
          image: ComponentsImage,
          description: "CPU coolers and solutions",
        },
        {
          id: "chassis-fan",
          name: "Chassis Fan",
          path: "/products?category=Components&subcategory=chassis-fan",
          image: ComponentsImage,
          description: "Case fans for optimal airflow",
        },
        {
          id: "pc-case",
          name: "PC Case",
          path: "/products?category=Components&subcategory=pc-case",
          image: ComponentsImage,
          description: "Computer cases and enclosures",
        },
      ];
    case "Peripherals":
      return [
        {
          id: "headset",
          name: "Headset",
          path: "/products?category=Peripherals&subcategory=headset",
          image: ComponentsImage,
          description: "Audio headsets for gaming and communication",
        },
        {
          id: "keyboard",
          name: "Keyboard",
          path: "/products?category=Peripherals&subcategory=keyboard",
          image: ComponentsImage,
          description: "Keyboards for various uses",
        },
        {
          id: "mouse",
          name: "Mouse",
          path: "/products?category=Peripherals&subcategory=mouse",
          image: ComponentsImage,
          description: "Computer mice and pointing devices",
        },
        {
          id: "monitor",
          name: "Monitor",
          path: "/products?category=Peripherals&subcategory=monitor",
          image: ComponentsImage,
          description: "Computer monitors and displays",
        },
        {
          id: "microphone",
          name: "Microphone",
          path: "/products?category=Peripherals&subcategory=microphone",
          image: ComponentsImage,
          description: "USB and XLR microphones",
        },
        {
          id: "web-digital-camera",
          name: "Web & Digital Camera",
          path: "/products?category=Peripherals&subcategory=web-digital-camera",
          image: ComponentsImage,
          description: "Cameras for computing",
        },
        {
          id: "speaker",
          name: "Speaker",
          path: "/products?category=Peripherals&subcategory=speaker",
          image: ComponentsImage,
          description: "Audio speakers and systems",
        },
      ];
    case "Accessories":
      return [
        {
          id: "cables",
          name: "Cables",
          path: "/products?category=Accessories&subcategory=cables",
          image: ComponentsImage,
          description: "Various computer cables",
        },
        {
          id: "earphones",
          name: "Earphones",
          path: "/products?category=Accessories&subcategory=earphones",
          image: ComponentsImage,
          description: "Earphones and earbuds",
        },
        {
          id: "power-bank",
          name: "Power Bank",
          path: "/products?category=Accessories&subcategory=power-bank",
          image: ComponentsImage,
          description: "Portable power banks",
        },
        {
          id: "adapters",
          name: "Adapters",
          path: "/products?category=Accessories&subcategory=adapters",
          image: ComponentsImage,
          description: "Adapters and converters",
        },
        {
          id: "mounts-stands",
          name: "Mounts & Stands",
          path: "/products?category=Accessories&subcategory=mounts-stands",
          image: ComponentsImage,
          description: "Mounts and stands for devices",
        },
        {
          id: "cleaning-kits",
          name: "Cleaning Kits",
          path: "/products?category=Accessories&subcategory=cleaning-kits",
          image: ComponentsImage,
          description: "Cleaning supplies for electronics",
        },
        {
          id: "tool-kits",
          name: "Tool Kits",
          path: "/products?category=Accessories&subcategory=tool-kits",
          image: ComponentsImage,
          description: "Tool kits for computer maintenance",
        },
        {
          id: "cable-organizers",
          name: "Cable Organizers",
          path: "/products?category=Accessories&subcategory=cable-organizers",
          image: ComponentsImage,
          description: "Cable management solutions",
        },
      ];
    case "OS & Softwares":
      return [
        {
          id: "antivirus",
          name: "Antivirus",
          path: "/products?category=OS & Softwares&subcategory=antivirus",
          image: ComponentsImage,
          description: "Antivirus and security software",
        },
        {
          id: "office-applications",
          name: "Office Applications",
          path: "/products?category=OS & Softwares&subcategory=office-applications",
          image: ComponentsImage,
          description: "Office productivity software",
        },
        {
          id: "operating-system",
          name: "Operating System",
          path: "/products?category=OS & Softwares&subcategory=operating-system",
          image: ComponentsImage,
          description: "Operating systems",
        },
        {
          id: "creative-software",
          name: "Creative Software",
          path: "/products?category=OS & Softwares&subcategory=creative-software",
          image: ComponentsImage,
          description: "Software for creative work",
        },
        {
          id: "utility-tools",
          name: "Utility Tools",
          path: "/products?category=OS & Softwares&subcategory=utility-tools",
          image: ComponentsImage,
          description: "Utility and maintenance tools",
        },
        {
          id: "driver-packages",
          name: "Driver Packages",
          path: "/products?category=OS & Softwares&subcategory=driver-packages",
          image: ComponentsImage,
          description: "Driver packages and updates",
        },
        {
          id: "backup-solutions",
          name: "Backup Solutions",
          path: "/products?category=OS & Softwares&subcategory=backup-solutions",
          image: ComponentsImage,
          description: "Backup and recovery software",
        },
      ];
    default:
      return [];
  }
};

export const getPromoContent = (category) => {
  switch (category) {
    case "Components":
      return {
        image: ComponentsImage,
        title: "High-Performance Components",
        description:
          "Build the ultimate gaming rig with our premium components",
        buttonText: "View Components",
        buttonPath: "/products?category=Components",
      };
    case "Peripherals":
      return {
        image: ComponentsImage,
        title: "Gaming Peripherals",
        description: "Enhance your gaming experience with precision equipment",
        buttonText: "Explore Peripherals",
        buttonPath: "/products?category=Peripherals",
      };
    case "Accessories":
      return {
        image: ComponentsImage,
        title: "Essential Accessories",
        description: "Complete your setup with must-have accessories",
        buttonText: "Shop Accessories",
        buttonPath: "/products?category=Accessories",
      };
    case "OS & Softwares":
      return {
        image: ComponentsImage,
        title: "Software Solutions",
        description: "Optimize your system with professional software",
        buttonText: "Discover Software",
        buttonPath: "/products?category=OS & Softwares",
      };
    default:
      return {
        image: ComponentsImage,
        title: "Gaming Products",
        description: "Discover our complete product lineup",
        buttonText: "Explore All",
        buttonPath: "/products",
      };
  }
};
