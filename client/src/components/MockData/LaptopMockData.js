// client/src/components/MockData/LaptopMockData.js
import LaptopImage from "../../assets/Laptop1.png";

export const categories = [
  "Gaming Laptops",
  "Content Creation Laptops",
  "Business Laptops",
  "Thin & Light Laptops",
  "2-in-1 Convertibles",
];

// Enhanced data structure with IDs and additional metadata
export const getSeriesItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        {
          id: "titan-series",
          name: "Titan Series - Ultimate Performance",
          path: "/laptops/gaming/titan",
          image: LaptopImage,
          description: "Top-tier gaming performance",
        },
        {
          id: "raider-series",
          name: "Raider Series - Premium Gaming",
          path: "/laptops/gaming/raider",
          image: LaptopImage,
          description: "Premium gaming experience",
        },
        {
          id: "vector-series",
          name: "Vector Series - Mainstream Gaming",
          path: "/laptops/gaming/vector",
          image: LaptopImage,
          description: "Mainstream gaming performance",
        },
        {
          id: "stealth-series",
          name: "Stealth Series - Slim Gaming",
          path: "/laptops/gaming/stealth",
          image: LaptopImage,
          description: "Slim gaming design",
        },
        {
          id: "katana-series",
          name: "Katana Series - Value Gaming",
          path: "/laptops/gaming/katana",
          image: LaptopImage,
          description: "Great value for gaming",
        },
      ];
    case "Content Creation Laptops":
      return [
        {
          id: "creator-z-series",
          name: "Creator Z Series - Professional Content",
          path: "/laptops/creator/z-series",
          image: LaptopImage,
          description: "Professional content creation",
        },
        {
          id: "creatorpro-series",
          name: "CreatorPro Series - Workstation Grade",
          path: "/laptops/creator/pro-series",
          image: LaptopImage,
          description: "Workstation-grade performance",
        },
        {
          id: "prestige-series",
          name: "Prestige Series - Creative Professionals",
          path: "/laptops/creator/prestige",
          image: LaptopImage,
          description: "For creative professionals",
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
          id: "pro-series",
          name: "Pro Series - Enterprise Grade",
          path: "/laptops/business/pro",
          image: LaptopImage,
          description: "Enterprise-grade performance",
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
          id: "zen-series",
          name: "Zen Series - Ultra Portable",
          path: "/laptops/thin-light/zen",
          image: LaptopImage,
          description: "Ultra-portable zen series",
        },
      ];
    case "2-in-1 Convertibles":
      return [
        {
          id: "summit-e-series",
          name: "Summit E Series - Convertible Elite",
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
      ];
    case "Business Laptops":
      return [
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
          id: "vpro-technology",
          name: "VPro Technology",
          path: "/features/vpro",
          image: LaptopImage,
          description: "Intel vPro technology",
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
        description: "Dominate the competition with high-refresh displays and powerful RTX graphics",
        buttonText: "Explore Gaming Laptops",
        buttonPath: "/laptops?category=Gaming+Laptops",
      };
    case "Content Creation Laptops":
      return {
        image: LaptopImage,
        title: "Content Creation Power",
        description: "Bring your creative visions to life with color-accurate displays and professional performance",
        buttonText: "View Creator Laptops",
        buttonPath: "/laptops?category=Content+Creation+Laptops",
      };
    case "Business Laptops":
      return {
        image: LaptopImage,
        title: "Business Excellence",
        description: "Professional laptops with enterprise-grade security and reliability for business success",
        buttonText: "See Business Laptops",
        buttonPath: "/laptops?category=Business+Laptops",
      };
    case "Thin & Light Laptops":
      return {
        image: LaptopImage,
        title: "Slim & Powerful",
        description: "Ultra-portable laptops that don't compromise on performance or style",
        buttonText: "Discover Thin Laptops",
        buttonPath: "/laptops?category=Thin+%26+Light+Laptops",
      };
    case "2-in-1 Convertibles":
      return {
        image: LaptopImage,
        title: "Versatile Convertibles",
        description: "Transform your workflow with flexible 2-in-1 laptops for work and play",
        buttonText: "Explore Convertibles",
        buttonPath: "/laptops?category=2-in-1+Convertibles",
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