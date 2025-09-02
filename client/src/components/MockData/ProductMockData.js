// client/src/components/MockData/ProductMockData.js
import ComponentsImage from "../../assets/Products1.png";

export const categories = [
  "Components",
  "Peripherals",
  "Accessories",
  "OS & Softwares",
];

// Different series and explore items for each category
export const getSeriesItems = (category) => {
  switch (category) {
    case "Components":
      return [
        { name: "Gaming Series", path: "/series/gaming" },
        { name: "Performance Series", path: "/series/performance" },
        { name: "Budget Series", path: "/series/budget" },
        { name: "RGB Series", path: "/series/rgb" },
        { name: "Silent Series", path: "/series/silent" },
        { name: "Overclocking Series", path: "/series/overclocking" },
      ];
    case "Peripherals":
      return [
        { name: "Gaming Series", path: "/series/gaming-peripherals" },
        { name: "Professional Series", path: "/series/professional" },
        { name: "Wireless Series", path: "/series/wireless" },
        { name: "Ergonomic Series", path: "/series/ergonomic" },
        { name: "RGB Lighting Series", path: "/series/rgb-lighting" },
        { name: "Ultra-Thin Series", path: "/series/ultra-thin" },
      ];
    case "Accessories":
      return [
        { name: "Premium Series", path: "/series/premium" },
        { name: "Essential Series", path: "/series/essential" },
        { name: "Travel Series", path: "/series/travel" },
        { name: "Gaming Series", path: "/series/gaming-accessories" },
        { name: "Office Series", path: "/series/office" },
        { name: "Protection Series", path: "/series/protection" },
      ];
    case "OS & Softwares":
      return [
        { name: "Security Suite", path: "/software/security" },
        { name: "Productivity Bundle", path: "/software/productivity" },
        { name: "Gaming Optimization", path: "/software/gaming" },
        { name: "Creative Suite", path: "/software/creative" },
        { name: "Business Solutions", path: "/software/business" },
        { name: "Education Package", path: "/software/education" },
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Components":
      return [
        { name: "Build Guides", path: "/guides/build" },
        { name: "Compatibility Checker", path: "/tools/compatibility" },
        { name: "Performance Benchmarks", path: "/benchmarks" },
        { name: "Cooling Solutions", path: "/solutions/cooling" },
        { name: "RGB Sync Technology", path: "/technology/rgb-sync" },
      ];
    case "Peripherals":
      return [
        { name: "Customization Hub", path: "/customization" },
        { name: "Driver & Software", path: "/support/drivers" },
        { name: "Gaming Profiles", path: "/profiles/gaming" },
        { name: "Wireless Connectivity", path: "/technology/wireless" },
        { name: "Ergonomic Design", path: "/design/ergonomic" },
      ];
    case "Accessories":
      return [
        { name: "Setup Inspiration", path: "/inspiration" },
        { name: "Cable Management", path: "/solutions/cable-management" },
        { name: "Travel Solutions", path: "/solutions/travel" },
        { name: "Device Protection", path: "/protection" },
        { name: "Organization Tips", path: "/tips/organization" },
      ];
    case "OS & Softwares":
      return [
        { name: "Free Trials", path: "/software/trials" },
        { name: "System Requirements", path: "/requirements" },
        { name: "License Options", path: "/licensing" },
        { name: "Update Center", path: "/updates" },
        { name: "Support Resources", path: "/support" },
      ];
    default:
      return [];
  }
};

export const getSubCategories = (category) => {
  switch (category) {
    case "Components":
      return [
        { name: "Chassis Fan", path: "/components/cooling/fans" },
        { name: "CPU Cooling", path: "/components/cooling/cpu" },
        { name: "Graphics Card", path: "/components/gpu" },
        { name: "Hard Disk Drive", path: "/components/storage/hdd" },
        { name: "Solid State Drive", path: "/components/storage/ssd" },
        { name: "RAM", path: "/components/memory" },
        { name: "Motherboard", path: "/components/motherboard" },
        { name: "PC Case", path: "/components/cases" },
        { name: "Power Supply", path: "/components/psu" },
        { name: "Processor AMD", path: "/components/cpu/amd" },
        { name: "Processor Intel", path: "/components/cpu/intel" },
      ];
    case "Peripherals":
      return [
        { name: "Headset", path: "/peripherals/audio/headsets" },
        { name: "Keyboard", path: "/peripherals/input/keyboards" },
        { name: "Mouse", path: "/peripherals/input/mice" },
        { name: "Monitor", path: "/peripherals/displays" },
        { name: "UPS & AVR", path: "/peripherals/power" },
        { name: "Mouse Pad", path: "/peripherals/accessories/mousepads" },
        { name: "Web & Digital Camera", path: "/peripherals/cameras" },
        { name: "Printer & Scanner", path: "/peripherals/printers" },
        { name: "Speaker", path: "/peripherals/audio/speakers" },
      ];
    case "Accessories":
      return [
        { name: "Cables", path: "/accessories/cables" },
        { name: "Earphones", path: "/accessories/audio/earphones" },
        { name: "Power Bank", path: "/accessories/power/powerbanks" },
        { name: "Adapters", path: "/accessories/adapters" },
        { name: "Mounts & Stands", path: "/accessories/mounts" },
        { name: "Cleaning Kits", path: "/accessories/cleaning" },
        { name: "Tool Kits", path: "/accessories/tools" },
        { name: "Cable Organizers", path: "/accessories/organizers" },
      ];
    case "OS & Softwares":
      return [
        { name: "Antivirus", path: "/software/security/antivirus" },
        { name: "Office Applications", path: "/software/productivity/office" },
        { name: "Operating System", path: "/software/os" },
        { name: "Creative Software", path: "/software/creative" },
        { name: "Utility Tools", path: "/software/tools" },
        { name: "Driver Packages", path: "/software/drivers" },
        { name: "Backup Solutions", path: "/software/backup" },
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
        buttonPath: "/components",
      };
    case "Peripherals":
      return {
        image: ComponentsImage,
        title: "Gaming Peripherals",
        description: "Enhance your gaming experience with precision equipment",
        buttonText: "Explore Peripherals",
        buttonPath: "/peripherals",
      };
    case "Accessories":
      return {
        image: ComponentsImage,
        title: "Essential Accessories",
        description: "Complete your setup with must-have accessories",
        buttonText: "Shop Accessories",
        buttonPath: "/accessories",
      };
    case "OS & Softwares":
      return {
        image: ComponentsImage,
        title: "Software Solutions",
        description: "Optimize your system with professional software",
        buttonText: "Discover Software",
        buttonPath: "/software",
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
