// client/src/components/MockData/ProductNavbarMockData.js
import ComponentsImage from '../../assets/Products1.png';

export const categories = [
  "Components",
  "Peripherals",
  "Accessories",
  "OS & Softwares"
];

// Different series and explore items for each category
export const getSeriesItems = (category) => {
  switch (category) {
    case "Components":
      return [
        "Gaming Series",
        "Performance Series",
        "Budget Series",
        "RGB Series",
        "Silent Series",
        "Overclocking Series"
      ];
    case "Peripherals":
      return [
        "Gaming Series",
        "Professional Series",
        "Wireless Series",
        "Ergonomic Series",
        "RGB Lighting Series",
        "Ultra-Thin Series"
      ];
    case "Accessories":
      return [
        "Premium Series",
        "Essential Series",
        "Travel Series",
        "Gaming Series",
        "Office Series",
        "Protection Series"
      ];
    case "OS & Softwares":
      return [
        "Security Suite",
        "Productivity Bundle",
        "Gaming Optimization",
        "Creative Suite",
        "Business Solutions",
        "Education Package"
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Components":
      return [
        "Build Guides",
        "Compatibility Checker",
        "Performance Benchmarks",
        "Cooling Solutions",
        "RGB Sync Technology"
      ];
    case "Peripherals":
      return [
        "Customization Hub",
        "Driver & Software",
        "Gaming Profiles",
        "Wireless Connectivity",
        "Ergonomic Design"
      ];
    case "Accessories":
      return [
        "Setup Inspiration",
        "Cable Management",
        "Travel Solutions",
        "Device Protection",
        "Organization Tips"
      ];
    case "OS & Softwares":
      return [
        "Free Trials",
        "System Requirements",
        "License Options",
        "Update Center",
        "Support Resources"
      ];
    default:
      return [];
  }
};

export const getSubCategories = (category) => {
  switch (category) {
    case "Components":
      return [
        "Chassis Fan",
        "CPU Cooling",
        "Graphics Card",
        "Hard Disk Drive",
        "Solid State Drive",
        "RAM",
        "Motherboard",
        "PC Case",
        "Power Supply",
        "Processor AMD",
        "Processor Intel"
      ];
    case "Peripherals":
      return [
        "Headset",
        "Keyboard",
        "Mouse",
        "Monitor",
        "UPS & AVR",
        "Mouse Pad",
        "Web & Digital Camera",
        "Printer & Scanner",
        "Speaker"
      ];
    case "Accessories":
      return [
        "Cables",
        "Earphones",
        "Power Bank",
        "Adapters",
        "Mounts & Stands",
        "Cleaning Kits",
        "Tool Kits",
        "Cable Organizers"
      ];
    case "OS & Softwares":
      return [
        "Antivirus",
        "Office Applications",
        "Operating System",
        "Creative Software",
        "Utility Tools",
        "Driver Packages",
        "Backup Solutions"
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
        description: "Build the ultimate gaming rig with our premium components",
        buttonText: "View Components"
      };
    case "Peripherals":
      return {
        image: ComponentsImage,
        title: "Gaming Peripherals",
        description: "Enhance your gaming experience with precision equipment",
        buttonText: "Explore Peripherals"
      };
    case "Accessories":
      return {
        image: ComponentsImage,
        title: "Essential Accessories",
        description: "Complete your setup with must-have accessories",
        buttonText: "Shop Accessories"
      };
    case "OS & Softwares":
      return {
        image: ComponentsImage,
        title: "Software Solutions",
        description: "Optimize your system with professional software",
        buttonText: "Discover Software"
      };
    default:
      return {
        image: ComponentsImage,
        title: "Gaming Products",
        description: "Discover our complete product lineup",
        buttonText: "Explore All"
      };
  }
};