// client/src/components/MockData/LaptopMockData.js
import LaptopImage from "../../assets/Laptop1.png";

export const categories = [
  "Gaming Laptops",
  "Content Creation Laptops",
  "Business Laptops",
  "Thin & Light Laptops",
  "2-in-1 Convertibles",
];

// Different content based on selected category
export const getSeriesItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        { name: "Titan Series - Ultimate Performance", path: "/laptops/gaming/titan" },
        { name: "Raider Series - Premium Gaming", path: "/laptops/gaming/raider" },
        { name: "Vector Series - Mainstream Gaming", path: "/laptops/gaming/vector" },
        { name: "Stealth Series - Slim Gaming", path: "/laptops/gaming/stealth" },
        { name: "Katana Series - Value Gaming", path: "/laptops/gaming/katana" },
        { name: "Sword Series - Entry Level Gaming", path: "/laptops/gaming/sword" },
        { name: "Cyborg Series - Futuristic Design", path: "/laptops/gaming/cyborg" },
        { name: "Pulse Series - Balanced Performance", path: "/laptops/gaming/pulse" },
      ];
    case "Content Creation Laptops":
      return [
        { name: "Creator Z Series - Professional Content", path: "/laptops/creator/z-series" },
        { name: "CreatorPro Series - Workstation Grade", path: "/laptops/creator/pro-series" },
        { name: "Prestige Series - Creative Professionals", path: "/laptops/creator/prestige" },
        { name: "Modern Series - Modern Creators", path: "/laptops/creator/modern" },
        { name: "Summit Series - Executive Creative", path: "/laptops/creator/summit" },
        { name: "Content Master Series - All-in-One Creative", path: "/laptops/creator/master" },
      ];
    case "Business Laptops":
      return [
        { name: "Modern Business Series", path: "/laptops/business/modern" },
        { name: "Prestige Business Line", path: "/laptops/business/prestige" },
        { name: "Summit Business Series", path: "/laptops/business/summit" },
        { name: "Pro Series - Enterprise Grade", path: "/laptops/business/pro" },
        { name: "TravelMate Series - Mobile Professionals", path: "/laptops/business/travelmate" },
        { name: "Executive Series - Premium Business", path: "/laptops/business/executive" },
      ];
    case "Thin & Light Laptops":
      return [
        { name: "Prestige Slim Series", path: "/laptops/thin-light/prestige" },
        { name: "Modern Thin Series", path: "/laptops/thin-light/modern" },
        { name: "Summit Ultra Slim", path: "/laptops/thin-light/summit" },
        { name: "Stealth Thin Series", path: "/laptops/thin-light/stealth" },
        { name: "Zen Series - Ultra Portable", path: "/laptops/thin-light/zen" },
        { name: "Air Series - Featherlight", path: "/laptops/thin-light/air" },
      ];
    case "2-in-1 Convertibles":
      return [
        { name: "Summit E Series - Convertible Elite", path: "/laptops/convertible/summit" },
        { name: "Prestige Flip Series", path: "/laptops/convertible/prestige" },
        { name: "Modern Convertible Series", path: "/laptops/convertible/modern" },
        { name: "Creator Flip - Creative Convertible", path: "/laptops/convertible/creator" },
        { name: "Business Flip - Professional Convertible", path: "/laptops/convertible/business" },
        { name: "Style Series - Fashion Convertible", path: "/laptops/convertible/style" },
      ];
    default:
      return [];
  }
};

export const getFeatures = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        { name: "High Refresh Rate Displays", path: "/features/display/gaming" },
        { name: "NVIDIA GeForce RTX GPUs", path: "/features/gpu/rtx" },
        { name: "Advanced Cooling Systems", path: "/features/cooling" },
        { name: "Per Key RGB Keyboard", path: "/features/keyboard/rgb" },
        { name: "VR Ready Performance", path: "/features/vr" },
        { name: "4K Gaming Capability", path: "/features/4k-gaming" },
      ];
    case "Content Creation Laptops":
      return [
        { name: "Color-Accurate Displays", path: "/features/display/color-accurate" },
        { name: "NVIDIA Studio Drivers", path: "/features/studio-drivers" },
        { name: "High-Core Count CPUs", path: "/features/cpu/multi-core" },
        { name: "Professional GPU Options", path: "/features/gpu/professional" },
        { name: "Calibrated Color Accuracy", path: "/features/color-calibration" },
        { name: "Creator-Centric Software", path: "/features/software/creator" },
      ];
    case "Business Laptops":
      return [
        { name: "Military Grade Durability", path: "/features/durability" },
        { name: "Enhanced Security Features", path: "/features/security" },
        { name: "Long Battery Life", path: "/features/battery" },
        { name: "Business-Class Support", path: "/features/support/business" },
        { name: "VPro Technology", path: "/features/vpro" },
        { name: "Privacy Protection", path: "/features/privacy" },
      ];
    case "Thin & Light Laptops":
      return [
        { name: "Ultra-Thin Design", path: "/features/design/ultra-thin" },
        { name: "Lightweight Construction", path: "/features/design/lightweight" },
        { name: "All-Day Battery Life", path: "/features/battery/all-day" },
        { name: "Fast Charging Technology", path: "/features/charging/fast" },
        { name: "Premium Materials", path: "/features/materials/premium" },
        { name: "Silent Operation", path: "/features/performance/silent" },
      ];
    case "2-in-1 Convertibles":
      return [
        { name: "360° Hinge Design", path: "/features/hinge" },
        { name: "Touchscreen Display", path: "/features/display/touch" },
        { name: "Active Pen Support", path: "/features/pen" },
        { name: "Multiple Usage Modes", path: "/features/usage-modes" },
        { name: "Convertible Design", path: "/features/design/convertible" },
        { name: "Tablet Mode Capability", path: "/features/tablet-mode" },
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        { name: "Gaming Performance Benchmarks", path: "/explore/benchmarks/gaming" },
        { name: "Cooler Boost Technology", path: "/explore/technology/cooler-boost" },
        { name: "MSI Center Gaming Mode", path: "/explore/software/msi-center" },
        { name: "Nahimic Audio Enhancement", path: "/explore/audio/nahimic" },
        { name: "Mystic Light RGB Control", path: "/explore/rgb/mystic-light" },
        { name: "Game Optimization Guides", path: "/explore/guides/gaming" },
      ];
    case "Content Creation Laptops":
      return [
        { name: "Color Calibration Tools", path: "/explore/tools/color-calibration" },
        { name: "Creator Software Bundle", path: "/explore/software/creator-bundle" },
        { name: "4K Video Editing Support", path: "/explore/video-editing/4k" },
        { name: "3D Rendering Performance", path: "/explore/performance/3d-rendering" },
        { name: "Creative Workflow Tips", path: "/explore/guides/creative-workflow" },
        { name: "Professional Certification", path: "/explore/certification" },
      ];
    case "Business Laptops":
      return [
        { name: "Business Security Solutions", path: "/explore/security/business" },
        { name: "Remote Management Tools", path: "/explore/tools/remote-management" },
        { name: "Docking Station Compatibility", path: "/explore/accessories/docking" },
        { name: "Enterprise Software Support", path: "/explore/software/enterprise" },
        { name: "IT Management Features", path: "/explore/features/it-management" },
        { name: "Warranty & Support Options", path: "/explore/support/warranty" },
      ];
    case "Thin & Light Laptops":
      return [
        { name: "Portability Features", path: "/explore/features/portability" },
        { name: "Battery Life Optimization", path: "/explore/guides/battery-optimization" },
        { name: "Travel Accessories", path: "/explore/accessories/travel" },
        { name: "Wireless Connectivity", path: "/explore/connectivity/wireless" },
        { name: "Mobile Productivity Tips", path: "/explore/guides/mobile-productivity" },
        { name: "Ultrabook Certification", path: "/explore/certification/ultrabook" },
      ];
    case "2-in-1 Convertibles":
      return [
        { name: "Pen & Touch Features", path: "/explore/features/pen-touch" },
        { name: "Tablet Mode Applications", path: "/explore/applications/tablet" },
        { name: "Convertible Usage Tips", path: "/explore/guides/convertible-usage" },
        { name: "Digital Note Taking", path: "/explore/features/note-taking" },
        { name: "Presentation Features", path: "/explore/features/presentation" },
        { name: "Creative Drawing Tools", path: "/explore/tools/drawing" },
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
        buttonPath: "/laptops/gaming"
      };
    case "Content Creation Laptops":
      return {
        image: LaptopImage,
        title: "Content Creation Power",
        description:
          "Bring your creative visions to life with color-accurate displays and professional performance",
        buttonText: "View Creator Laptops",
        buttonPath: "/laptops/creator"
      };
    case "Business Laptops":
      return {
        image: LaptopImage,
        title: "Business Excellence",
        description:
          "Professional laptops with enterprise-grade security and reliability for business success",
        buttonText: "See Business Laptops",
        buttonPath: "/laptops/business"
      };
    case "Thin & Light Laptops":
      return {
        image: LaptopImage,
        title: "Slim & Powerful",
        description:
          "Ultra-portable laptops that don't compromise on performance or style",
        buttonText: "Discover Thin Laptops",
        buttonPath: "/laptops/thin-light"
      };
    case "2-in-1 Convertibles":
      return {
        image: LaptopImage,
        title: "Versatile Convertibles",
        description:
          "Transform your workflow with flexible 2-in-1 laptops for work and play",
        buttonText: "Explore Convertibles",
        buttonPath: "/laptops/convertible"
      };
    default:
      return {
        image: LaptopImage,
        title: "MSI Laptops",
        description: "Discover our complete laptop lineup for every need",
        buttonText: "View All Laptops",
        buttonPath: "/laptops"
      };
  }
};