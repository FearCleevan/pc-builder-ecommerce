//client/src/components/MockData/LaptopMockData.js
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
        "Titan Series - Ultimate Performance",
        "Raider Series - Premium Gaming",
        "Vector Series - Mainstream Gaming",
        "Stealth Series - Slim Gaming",
        "Katana Series - Value Gaming",
        "Sword Series - Entry Level Gaming",
        "Cyborg Series - Futuristic Design",
        "Pulse Series - Balanced Performance",
      ];
    case "Content Creation Laptops":
      return [
        "Creator Z Series - Professional Content",
        "CreatorPro Series - Workstation Grade",
        "Prestige Series - Creative Professionals",
        "Modern Series - Modern Creators",
        "Summit Series - Executive Creative",
        "Content Master Series - All-in-One Creative",
      ];
    case "Business Laptops":
      return [
        "Modern Business Series",
        "Prestige Business Line",
        "Summit Business Series",
        "Pro Series - Enterprise Grade",
        "TravelMate Series - Mobile Professionals",
        "Executive Series - Premium Business",
      ];
    case "Thin & Light Laptops":
      return [
        "Prestige Slim Series",
        "Modern Thin Series",
        "Summit Ultra Slim",
        "Stealth Thin Series",
        "Zen Series - Ultra Portable",
        "Air Series - Featherlight",
      ];
    case "2-in-1 Convertibles":
      return [
        "Summit E Series - Convertible Elite",
        "Prestige Flip Series",
        "Modern Convertible Series",
        "Creator Flip - Creative Convertible",
        "Business Flip - Professional Convertible",
        "Style Series - Fashion Convertible",
      ];
    default:
      return [];
  }
};

export const getFeatures = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        "High Refresh Rate Displays",
        "NVIDIA GeForce RTX GPUs",
        "Advanced Cooling Systems",
        "Per Key RGB Keyboard",
        "VR Ready Performance",
        "4K Gaming Capability",
      ];
    case "Content Creation Laptops":
      return [
        "Color-Accurate Displays",
        "NVIDIA Studio Drivers",
        "High-Core Count CPUs",
        "Professional GPU Options",
        "Calibrated Color Accuracy",
        "Creator-Centric Software",
      ];
    case "Business Laptops":
      return [
        "Military Grade Durability",
        "Enhanced Security Features",
        "Long Battery Life",
        "Business-Class Support",
        "VPro Technology",
        "Privacy Protection",
      ];
    case "Thin & Light Laptops":
      return [
        "Ultra-Thin Design",
        "Lightweight Construction",
        "All-Day Battery Life",
        "Fast Charging Technology",
        "Premium Materials",
        "Silent Operation",
      ];
    case "2-in-1 Convertibles":
      return [
        "360° Hinge Design",
        "Touchscreen Display",
        "Active Pen Support",
        "Multiple Usage Modes",
        "Convertible Design",
        "Tablet Mode Capability",
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Gaming Laptops":
      return [
        "Gaming Performance Benchmarks",
        "Cooler Boost Technology",
        "MSI Center Gaming Mode",
        "Nahimic Audio Enhancement",
        "Mystic Light RGB Control",
        "Game Optimization Guides",
      ];
    case "Content Creation Laptops":
      return [
        "Color Calibration Tools",
        "Creator Software Bundle",
        "4K Video Editing Support",
        "3D Rendering Performance",
        "Creative Workflow Tips",
        "Professional Certification",
      ];
    case "Business Laptops":
      return [
        "Business Security Solutions",
        "Remote Management Tools",
        "Docking Station Compatibility",
        "Enterprise Software Support",
        "IT Management Features",
        "Warranty & Support Options",
      ];
    case "Thin & Light Laptops":
      return [
        "Portability Features",
        "Battery Life Optimization",
        "Travel Accessories",
        "Wireless Connectivity",
        "Mobile Productivity Tips",
        "Ultrabook Certification",
      ];
    case "2-in-1 Convertibles":
      return [
        "Pen & Touch Features",
        "Tablet Mode Applications",
        "Convertible Usage Tips",
        "Digital Note Taking",
        "Presentation Features",
        "Creative Drawing Tools",
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
      };
    case "Content Creation Laptops":
      return {
        image: LaptopImage,
        title: "Content Creation Power",
        description:
          "Bring your creative visions to life with color-accurate displays and professional performance",
        buttonText: "View Creator Laptops",
      };
    case "Business Laptops":
      return {
        image: LaptopImage,
        title: "Business Excellence",
        description:
          "Professional laptops with enterprise-grade security and reliability for business success",
        buttonText: "See Business Laptops",
      };
    case "Thin & Light Laptops":
      return {
        image: LaptopImage,
        title: "Slim & Powerful",
        description:
          "Ultra-portable laptops that don't compromise on performance or style",
        buttonText: "Discover Thin Laptops",
      };
    case "2-in-1 Convertibles":
      return {
        image: LaptopImage,
        title: "Versatile Convertibles",
        description:
          "Transform your workflow with flexible 2-in-1 laptops for work and play",
        buttonText: "Explore Convertibles",
      };
    default:
      return {
        image: LaptopImage,
        title: "MSI Laptops",
        description: "Discover our complete laptop lineup for every need",
        buttonText: "View All Laptops",
      };
  }
};
