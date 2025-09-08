// client/src/components/MockData/LaptopMockData.js
import LaptopImage from "../../assets/Laptop1.png";

export const categories = [
  "Gaming Laptops",
  "Content Creation Laptops",
  "Business Laptops",
  "Thin & Light Laptops",
  "2-in-1 Convertibles",
];

// Filter options moved from LaptopsFilter.jsx
export const gpuOptions = [
  {
    id: "geforce-rtx-50",
    series: "GeForce RTX™ 50 Series",
    options: [
      { id: "rtx5090", label: "GeForce RTX™ 5090" },
      { id: "rtx5080", label: "GeForce RTX™ 5080" },
      { id: "rtx5070ti", label: "GeForce RTX™ 5070 Ti" },
      { id: "rtx5070", label: "GeForce RTX™ 5070" },
      { id: "rtx5060", label: "GeForce RTX™ 5060" },
      { id: "rtx5050", label: "GeForce RTX™ 5050" },
    ],
  },
  {
    id: "geforce-rtx-40",
    series: "GeForce RTX™ 40 Series",
    options: [
      { id: "rtx4090", label: "GeForce RTX™ 4090" },
      { id: "rtx4080", label: "GeForce RTX™ 4080" },
      { id: "rtx4070", label: "GeForce RTX™ 4070" },
      { id: "rtx4060", label: "GeForce RTX™ 4060" },
      { id: "rtx4050", label: "GeForce RTX™ 4050" },
    ],
  },
  {
    id: "geforce-rtx-30",
    series: "GeForce RTX™ 30 Series",
    options: [
      { id: "rtx3090", label: "GeForce RTX™ 3090" },
      { id: "rtx3080", label: "GeForce RTX™ 3080" },
      { id: "rtx3070", label: "GeForce RTX™ 3070" },
      { id: "rtx3060", label: "GeForce RTX™ 3060" },
      { id: "rtx3050", label: "GeForce RTX™ 3050" },
    ],
  },
  {
    id: "geforce-rtx-20",
    series: "GeForce RTX™ 20 Series",
    options: [
      { id: "rtx2080", label: "GeForce RTX™ 2080" },
      { id: "rtx2070", label: "GeForce RTX™ 2070" },
      { id: "rtx2060", label: "GeForce RTX™ 2060" },
      { id: "rtx2050", label: "GeForce RTX™ 2050" },
    ],
  },
  {
    id: "professional-gpus",
    series: "Professional & Other GPUs",
    options: [
      { id: "rtx5000", label: "NVIDIA RTX™ 5000" },
      { id: "integrated", label: "Integrated Graphics" },
      { id: "apple-silicon", label: "Apple Silicon" },
    ],
  },
];

export const processorOptions = [
  { id: 'intel-i9', label: 'Intel® Core™ i9' },
  { id: 'intel-i7', label: 'Intel® Core™ i7' },
  { id: 'intel-i5', label: 'Intel® Core™ i5' },
  { id: 'intel-i3', label: 'Intel® Core™ i3' },
  { id: 'intel-xeon', label: 'Intel® Xeon®' },
  { id: 'amd-ryzen9', label: 'AMD Ryzen™ 9' },
  { id: 'amd-ryzen7', label: 'AMD Ryzen™ 7' },
  { id: 'amd-ryzen5', label: 'AMD Ryzen™ 5' },
  { id: 'amd-ryzen3', label: 'AMD Ryzen™ 3' },
  { id: 'apple-m2', label: 'Apple M2' },
  { id: 'apple-m1', label: 'Apple M1' }
];

export const screenSizeOptions = [
  { id: '13', label: '13"' },
  { id: '14', label: '14"' },
  { id: '15', label: '15"' },
  { id: '16', label: '16"' },
  { id: '17', label: '17"' },
  { id: '18', label: '18"' }
];

export const ramOptions = [
  { id: '8gb', label: '8GB' },
  { id: '16gb', label: '16GB' },
  { id: '32gb', label: '32GB' },
  { id: '64gb', label: '64GB' },
  { id: '128gb', label: '128GB' }
];

export const storageOptions = [
  { id: '256gb', label: '256GB SSD' },
  { id: '512gb', label: '512GB SSD' },
  { id: '1tb', label: '1TB SSD' },
  { id: '2tb', label: '2TB SSD' },
  { id: '4tb', label: '4TB SSD' }
];

// Enhanced data structure with IDs and additional metadata
export const getSeriesItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        {
          id: "titan-series",
          name: "Titan Series",
          path: "/laptops/gaming/titan",
          image: LaptopImage,
          description: "Top-tier gaming performance",
        },
        {
          id: "raider-series",
          name: "Raider Series",
          path: "/laptops/gaming/raider",
          image: LaptopImage,
          description: "Premium gaming experience",
        },
        {
          id: "vector-series",
          name: "Vector Series",
          path: "/laptops/gaming/vector",
          image: LaptopImage,
          description: "Mainstream gaming performance",
        },
        {
          id: "stealth-series",
          name: "Stealth Series",
          path: "/laptops/gaming/stealth",
          image: LaptopImage,
          description: "Slim gaming design",
        },
        {
          id: "katana-series",
          name: "Katana Series",
          path: "/laptops/gaming/katana",
          image: LaptopImage,
          description: "Great value for gaming",
        },
        {
          id: "sword-series",
          name: "Sword Series",
          path: "/laptops/gaming/sword",
          image: LaptopImage,
          description: "Entry-level gaming option",
        },
        {
          id: "cyborg-series",
          name: "Cyborg Series",
          path: "/laptops/gaming/cyborg",
          image: LaptopImage,
          description: "Futuristic gaming design",
        },
        {
          id: "pulse-series",
          name: "Pulse Series",
          path: "/laptops/gaming/pulse",
          image: LaptopImage,
          description: "Balanced gaming performance",
        },
      ];
    case "Content Creation Laptops":
      return [
        {
          id: "creator-z-series",
          name: "Creator Z Series",
          path: "/laptops/creator/z-series",
          image: LaptopImage,
          description: "Professional content creation",
        },
        {
          id: "creatorpro-series",
          name: "CreatorPro Series",
          path: "/laptops/creator/pro-series",
          image: LaptopImage,
          description: "Workstation-grade performance",
        },
        {
          id: "prestige-series",
          name: "Prestige Series",
          path: "/laptops/creator/prestige",
          image: LaptopImage,
          description: "For creative professionals",
        },
        {
          id: "modern-series",
          name: "Modern Series",
          path: "/laptops/creator/modern",
          image: LaptopImage,
          description: "Modern creator's choice",
        },
        {
          id: "summit-series",
          name: "Summit Series",
          path: "/laptops/creator/summit",
          image: LaptopImage,
          description: "Executive creative solution",
        },
        {
          id: "content-master-series",
          name: "Content Master Series",
          path: "/laptops/creator/master",
          image: LaptopImage,
          description: "All-in-one creative solution",
        },
      ];
    case "Business Laptops":
      return [
        {
          id: "modern-business-series",
          name: "Modern Business Series",
          path: "/laptops/business/modern",
          image: LaptopImage,
          description: "Modern business solution",
        },
        {
          id: "prestige-business-line",
          name: "Prestige Business Line",
          path: "/laptops/business/prestige",
          image: LaptopImage,
          description: "Prestige business line",
        },
        {
          id: "summit-business-series",
          name: "Summit Business Series",
          path: "/laptops/business/summit",
          image: LaptopImage,
          description: "Summit business series",
        },
        {
          id: "pro-series",
          name: "Pro Series",
          path: "/laptops/business/pro",
          image: LaptopImage,
          description: "Enterprise-grade performance",
        },
        {
          id: "travelmate-series",
          name: "TravelMate Series",
          path: "/laptops/business/travelmate",
          image: LaptopImage,
          description: "For mobile professionals",
        },
        {
          id: "executive-series",
          name: "Executive Series",
          path: "/laptops/business/executive",
          image: LaptopImage,
          description: "Premium business solution",
        },
      ];
    case "Thin & Light Laptops":
      return [
        {
          id: "prestige-slim-series",
          name: "Prestige Slim Series",
          path: "/laptops/thin-light/prestige",
          image: LaptopImage,
          description: "Prestige slim design",
        },
        {
          id: "modern-thin-series",
          name: "Modern Thin Series",
          path: "/laptops/thin-light/modern",
          image: LaptopImage,
          description: "Modern thin design",
        },
        {
          id: "summit-ultra-slim",
          name: "Summit Ultra Slim",
          path: "/laptops/thin-light/summit",
          image: LaptopImage,
          description: "Ultra-slim summit series",
        },
        {
          id: "stealth-thin-series",
          name: "Stealth Thin Series",
          path: "/laptops/thin-light/stealth",
          image: LaptopImage,
          description: "Stealth thin design",
        },
        {
          id: "zen-series",
          name: "Zen Series",
          path: "/laptops/thin-light/zen",
          image: LaptopImage,
          description: "Ultra-portable zen series",
        },
        {
          id: "air-series",
          name: "Air Series",
          path: "/laptops/thin-light/air",
          image: LaptopImage,
          description: "Featherlight air series",
        },
      ];
    case "2-in-1 Convertibles":
      return [
        {
          id: "summit-e-series",
          name: "Summit E Series",
          path: "/laptops/convertible/summit",
          image: LaptopImage,
          description: "Convertible elite series",
        },
        {
          id: "prestige-flip-series",
          name: "Prestige Flip Series",
          path: "/laptops/convertible/prestige",
          image: LaptopImage,
          description: "Prestige flip design",
        },
        {
          id: "modern-convertible-series",
          name: "Modern Convertible Series",
          path: "/laptops/convertible/modern",
          image: LaptopImage,
          description: "Modern convertible series",
        },
        {
          id: "creator-flip",
          name: "Creator Flip",
          path: "/laptops/convertible/creator",
          image: LaptopImage,
          description: "Creative convertible solution",
        },
        {
          id: "business-flip",
          name: "Business Flip",
          path: "/laptops/convertible/business",
          image: LaptopImage,
          description: "Professional convertible",
        },
        {
          id: "style-series",
          name: "Style Series",
          path: "/laptops/convertible/style",
          image: LaptopImage,
          description: "Fashion convertible",
        },
      ];
    default:
      return [];
  }
};

export const getFeatures = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        {
          id: "high-refresh-displays",
          name: "High Refresh Rate Displays",
          path: "/features/display/gaming",
          image: LaptopImage,
          description: "Smooth gaming visuals",
        },
        {
          id: "nvidia-rtx-gpus",
          name: "NVIDIA GeForce RTX GPUs",
          path: "/features/gpu/rtx",
          image: LaptopImage,
          description: "Powerful graphics performance",
        },
        {
          id: "advanced-cooling",
          name: "Advanced Cooling Systems",
          path: "/features/cooling",
          image: LaptopImage,
          description: "Efficient thermal management",
        },
        {
          id: "rgb-keyboard",
          name: "Per Key RGB Keyboard",
          path: "/features/keyboard/rgb",
          image: LaptopImage,
          description: "Customizable RGB lighting",
        },
        {
          id: "vr-ready",
          name: "VR Ready Performance",
          path: "/features/vr",
          image: LaptopImage,
          description: "Virtual reality capable",
        },
        {
          id: "4k-gaming",
          name: "4K Gaming Capability",
          path: "/features/4k-gaming",
          image: LaptopImage,
          description: "4K gaming experience",
        },
      ];
    case "Content Creation Laptops":
      return [
        {
          id: "color-accurate-displays",
          name: "Color-Accurate Displays",
          path: "/features/display/color-accurate",
          image: LaptopImage,
          description: "Precise color reproduction",
        },
        {
          id: "studio-drivers",
          name: "NVIDIA Studio Drivers",
          path: "/features/studio-drivers",
          image: LaptopImage,
          description: "Optimized for creative work",
        },
        {
          id: "multi-core-cpus",
          name: "High-Core Count CPUs",
          path: "/features/cpu/multi-core",
          image: LaptopImage,
          description: "Multi-core processing power",
        },
        {
          id: "professional-gpus",
          name: "Professional GPU Options",
          path: "/features/gpu/professional",
          image: LaptopImage,
          description: "Professional-grade graphics",
        },
        {
          id: "color-calibration",
          name: "Calibrated Color Accuracy",
          path: "/features/color-calibration",
          image: LaptopImage,
          description: "Factory color calibration",
        },
        {
          id: "creator-software",
          name: "Creator-Centric Software",
          path: "/features/software/creator",
          image: LaptopImage,
          description: "Software for creators",
        },
      ];
    case "Business Laptops":
      return [
        {
          id: "military-durability",
          name: "Military Grade Durability",
          path: "/features/durability",
          image: LaptopImage,
          description: "Rugged construction",
        },
        {
          id: "security-features",
          name: "Enhanced Security Features",
          path: "/features/security",
          image: LaptopImage,
          description: "Advanced security options",
        },
        {
          id: "long-battery",
          name: "Long Battery Life",
          path: "/features/battery",
          image: LaptopImage,
          description: "Extended battery performance",
        },
        {
          id: "business-support",
          name: "Business-Class Support",
          path: "/features/support/business",
          image: LaptopImage,
          description: "Dedicated business support",
        },
        {
          id: "vpro-technology",
          name: "VPro Technology",
          path: "/features/vpro",
          image: LaptopImage,
          description: "Intel vPro technology",
        },
        {
          id: "privacy-protection",
          name: "Privacy Protection",
          path: "/features/privacy",
          image: LaptopImage,
          description: "Privacy features",
        },
      ];
    case "Thin & Light Laptops":
      return [
        {
          id: "ultra-thin-design",
          name: "Ultra-Thin Design",
          path: "/features/design/ultra-thin",
          image: LaptopImage,
          description: "Extremely thin profile",
        },
        {
          id: "lightweight-construction",
          name: "Lightweight Construction",
          path: "/features/design/lightweight",
          image: LaptopImage,
          description: "Lightweight build",
        },
        {
          id: "all-day-battery",
          name: "All-Day Battery Life",
          path: "/features/battery/all-day",
          image: LaptopImage,
          description: "All-day battery performance",
        },
        {
          id: "fast-charging",
          name: "Fast Charging Technology",
          path: "/features/charging/fast",
          image: LaptopImage,
          description: "Rapid charging capability",
        },
        {
          id: "premium-materials",
          name: "Premium Materials",
          path: "/features/materials/premium",
          image: LaptopImage,
          description: "High-quality materials",
        },
        {
          id: "silent-operation",
          name: "Silent Operation",
          path: "/features/performance/silent",
          image: LaptopImage,
          description: "Quiet performance",
        },
      ];
    case "2-in-1 Convertibles":
      return [
        {
          id: "hinge-design",
          name: "360° Hinge Design",
          path: "/features/hinge",
          image: LaptopImage,
          description: "Flexible hinge design",
        },
        {
          id: "touchscreen-display",
          name: "Touchscreen Display",
          path: "/features/display/touch",
          image: LaptopImage,
          description: "Touchscreen capability",
        },
        {
          id: "pen-support",
          name: "Active Pen Support",
          path: "/features/pen",
          image: LaptopImage,
          description: "Stylus pen support",
        },
        {
          id: "usage-modes",
          name: "Multiple Usage Modes",
          path: "/features/usage-modes",
          image: LaptopImage,
          description: "Versatile usage modes",
        },
        {
          id: "convertible-design",
          name: "Convertible Design",
          path: "/features/design/convertible",
          image: LaptopImage,
          description: "Convertible form factor",
        },
        {
          id: "tablet-mode",
          name: "Tablet Mode Capability",
          path: "/features/tablet-mode",
          image: LaptopImage,
          description: "Tablet functionality",
        },
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        {
          id: "gaming-benchmarks",
          name: "Gaming Performance Benchmarks",
          path: "/explore/benchmarks/gaming",
          image: LaptopImage,
          description: "Performance comparisons",
        },
        {
          id: "cooler-boost",
          name: "Cooler Boost Technology",
          path: "/explore/technology/cooler-boost",
          image: LaptopImage,
          description: "Advanced cooling technology",
        },
        {
          id: "msi-center",
          name: "MSI Center Gaming Mode",
          path: "/explore/software/msi-center",
          image: LaptopImage,
          description: "Gaming optimization software",
        },
        {
          id: "nahimic-audio",
          name: "Nahimic Audio Enhancement",
          path: "/explore/audio/nahimic",
          image: LaptopImage,
          description: "Audio enhancement technology",
        },
        {
          id: "mystic-light",
          name: "Mystic Light RGB Control",
          path: "/explore/rgb/mystic-light",
          image: LaptopImage,
          description: "RGB lighting control",
        },
        {
          id: "optimization-guides",
          name: "Game Optimization Guides",
          path: "/explore/guides/gaming",
          image: LaptopImage,
          description: "Performance optimization tips",
        },
      ];
    case "Content Creation Laptops":
      return [
        {
          id: "color-tools",
          name: "Color Calibration Tools",
          path: "/explore/tools/color-calibration",
          image: LaptopImage,
          description: "Color calibration utilities",
        },
        {
          id: "creator-bundle",
          name: "Creator Software Bundle",
          path: "/explore/software/creator-bundle",
          image: LaptopImage,
          description: "Software package for creators",
        },
        {
          id: "4k-editing",
          name: "4K Video Editing Support",
          path: "/explore/video-editing/4k",
          image: LaptopImage,
          description: "4K video editing capability",
        },
        {
          id: "3d-rendering",
          name: "3D Rendering Performance",
          path: "/explore/performance/3d-rendering",
          image: LaptopImage,
          description: "3D rendering performance",
        },
        {
          id: "workflow-tips",
          name: "Creative Workflow Tips",
          path: "/explore/guides/creative-workflow",
          image: LaptopImage,
          description: "Workflow optimization tips",
        },
        {
          id: "professional-cert",
          name: "Professional Certification",
          path: "/explore/certification",
          image: LaptopImage,
          description: "Professional certifications",
        },
      ];
    case "Business Laptops":
      return [
        {
          id: "business-security",
          name: "Business Security Solutions",
          path: "/explore/security/business",
          image: LaptopImage,
          description: "Security solutions for business",
        },
        {
          id: "remote-management",
          name: "Remote Management Tools",
          path: "/explore/tools/remote-management",
          image: LaptopImage,
          description: "Remote management capabilities",
        },
        {
          id: "docking-compatibility",
          name: "Docking Station Compatibility",
          path: "/explore/accessories/docking",
          image: LaptopImage,
          description: "Docking station support",
        },
        {
          id: "enterprise-software",
          name: "Enterprise Software Support",
          path: "/explore/software/enterprise",
          image: LaptopImage,
          description: "Enterprise software compatibility",
        },
        {
          id: "it-management",
          name: "IT Management Features",
          path: "/explore/features/it-management",
          image: LaptopImage,
          description: "IT management capabilities",
        },
        {
          id: "warranty-support",
          name: "Warranty & Support Options",
          path: "/explore/support/warranty",
          image: LaptopImage,
          description: "Warranty and support options",
        },
      ];
    case "Thin & Light Laptops":
      return [
        {
          id: "portability-features",
          name: "Portability Features",
          path: "/explore/features/portability",
          image: LaptopImage,
          description: "Portability enhancements",
        },
        {
          id: "battery-optimization",
          name: "Battery Life Optimization",
          path: "/explore/guides/battery-optimization",
          image: LaptopImage,
          description: "Battery optimization tips",
        },
        {
          id: "travel-accessories",
          name: "Travel Accessories",
          path: "/explore/accessories/travel",
          image: LaptopImage,
          description: "Travel accessories",
        },
        {
          id: "wireless-connectivity",
          name: "Wireless Connectivity",
          path: "/explore/connectivity/wireless",
          image: LaptopImage,
          description: "Wireless connectivity options",
        },
        {
          id: "mobile-productivity",
          name: "Mobile Productivity Tips",
          path: "/explore/guides/mobile-productivity",
          image: LaptopImage,
          description: "Productivity tips for mobile use",
        },
        {
          id: "ultrabook-cert",
          name: "Ultrabook Certification",
          path: "/explore/certification/ultrabook",
          image: LaptopImage,
          description: "Ultrabook certification",
        },
      ];
    case "2-in-1 Convertibles":
      return [
        {
          id: "pen-touch-features",
          name: "Pen & Touch Features",
          path: "/explore/features/pen-touch",
          image: LaptopImage,
          description: "Pen and touch capabilities",
        },
        {
          id: "tablet-applications",
          name: "Tablet Mode Applications",
          path: "/explore/applications/tablet",
          image: LaptopImage,
          description: "Tablet mode applications",
        },
        {
          id: "convertible-tips",
          name: "Convertible Usage Tips",
          path: "/explore/guides/convertible-usage",
          image: LaptopImage,
          description: "Usage tips for convertibles",
        },
        {
          id: "note-taking",
          name: "Digital Note Taking",
          path: "/explore/features/note-taking",
          image: LaptopImage,
          description: "Digital note taking capabilities",
        },
        {
          id: "presentation-features",
          name: "Presentation Features",
          path: "/explore/features/presentation",
          image: LaptopImage,
          description: "Presentation capabilities",
        },
        {
          id: "drawing-tools",
          name: "Creative Drawing Tools",
          path: "/explore/tools/drawing",
          image: LaptopImage,
          description: "Drawing and creative tools",
        },
      ];
    default:
      return [];
  }
};

export const getPromoContent = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return {
        image: LaptopImage,
        title: "Ultimate Gaming Laptops",
        description:
          "Dominate the competition with high-refresh displays and powerful RTX graphics",
        buttonText: "Explore Gaming Laptops",
        buttonPath: "/laptops/gaming",
      };
    case "Content Creation Laptops":
      return {
        image: LaptopImage,
        title: "Content Creation Power",
        description:
          "Bring your creative visions to life with color-accurate displays and professional performance",
        buttonText: "View Creator Laptops",
        buttonPath: "/laptops/creator",
      };
    case "Business Laptops":
      return {
        image: LaptopImage,
        title: "Business Excellence",
        description:
          "Professional laptops with enterprise-grade security and reliability for business success",
        buttonText: "See Business Laptops",
        buttonPath: "/laptops/business",
      };
    case "Thin & Light Laptops":
      return {
        image: LaptopImage,
        title: "Slim & Powerful",
        description:
          "Ultra-portable laptops that don't compromise on performance or style",
        buttonText: "Discover Thin Laptops",
        buttonPath: "/laptops/thin-light",
      };
    case "2-in-1 Convertibles":
      return {
        image: LaptopImage,
        title: "Versatile Convertibles",
        description:
          "Transform your workflow with flexible 2-in-1 laptops for work and play",
        buttonText: "Explore Convertibles",
        buttonPath: "/laptops/convertible",
      };
    default:
      return {
        image: LaptopImage,
        title: "MSI Laptops",
        description: "Discover our complete laptop lineup for every need",
        buttonText: "View All Laptops",
        buttonPath: "/laptops",
      };
  }
};