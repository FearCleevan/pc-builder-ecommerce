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

// Enhanced data structure with IDs and additional metadata
export const getSeriesItems = (category) => {
  switch (category) {
    case "Components":
      return [
        {
          id: "gaming-series",
          name: "Gaming Series",
          path: "/series/gaming",
          image: ComponentsImage,
          description: "High-performance gaming components",
        },
        {
          id: "performance-series",
          name: "Performance Series",
          path: "/series/performance",
          image: ComponentsImage,
          description: "Professional grade components",
        },
        {
          id: "budget-series",
          name: "Budget Series",
          path: "/series/budget",
          image: ComponentsImage,
          description: "Affordable yet reliable components",
        },
        {
          id: "rgb-series",
          name: "RGB Series",
          path: "/series/rgb",
          image: ComponentsImage,
          description: "Components with customizable RGB lighting",
        },
        {
          id: "silent-series",
          name: "Silent Series",
          path: "/series/silent",
          image: ComponentsImage,
          description: "Quiet operation optimized components",
        },
        {
          id: "overclocking-series",
          name: "Overclocking Series",
          path: "/series/overclocking",
          image: ComponentsImage,
          description: "Components designed for overclocking",
        },
      ];
    case "Peripherals":
      return [
        {
          id: "gaming-peripherals",
          name: "Gaming Series",
          path: "/series/gaming-peripherals",
          image: ComponentsImage,
          description: "High-performance gaming peripherals",
        },
        {
          id: "professional-series",
          name: "Professional Series",
          path: "/series/professional",
          image: ComponentsImage,
          description: "Professional grade peripherals",
        },
        {
          id: "wireless-series",
          name: "Wireless Series",
          path: "/series/wireless",
          image: ComponentsImage,
          description: "Wireless connectivity peripherals",
        },
        {
          id: "ergonomic-series",
          name: "Ergonomic Series",
          path: "/series/ergonomic",
          image: ComponentsImage,
          description: "Ergonomically designed peripherals",
        },
        {
          id: "rgb-lighting-series",
          name: "RGB Lighting Series",
          path: "/series/rgb-lighting",
          image: ComponentsImage,
          description: "Peripherals with RGB lighting",
        },
        {
          id: "ultra-thin-series",
          name: "Ultra-Thin Series",
          path: "/series/ultra-thin",
          image: ComponentsImage,
          description: "Slim and lightweight peripherals",
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
          id: "ups-avr",
          name: "UPS & AVR",
          path: "/products?category=Peripherals&subcategory=ups-avr",
          image: ComponentsImage,
          description: "Power protection devices",
        },
        {
          id: "mouse-pad",
          name: "Mouse Pad",
          path: "/products?category=Peripherals&subcategory=mouse-pad",
          image: ComponentsImage,
          description: "Mouse pads and surfaces",
        },
        {
          id: "web-digital-camera",
          name: "Web & Digital Camera",
          path: "/products?category=Peripherals&subcategory=web-digital-camera",
          image: ComponentsImage,
          description: "Cameras for computing",
        },
        {
          id: "printer-scanner",
          name: "Printer & Scanner",
          path: "/products?category=Peripherals&subcategory=printer-scanner",
          image: ComponentsImage,
          description: "Printing and scanning devices",
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
