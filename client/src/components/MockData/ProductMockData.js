import ComponentsImage from "../../assets/Products1.png";

export const categories = [
  "Components",
  "Peripherals",
  "Accessories",
  "OS & Softwares",
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
          id: "chassis-fan",
          name: "Chassis Fan",
          path: "/components/cooling/fans",
          image: ComponentsImage,
          description: "Case fans for optimal airflow",
        },
        {
          id: "cpu-cooling",
          name: "CPU Cooling",
          path: "/components/cooling/cpu",
          image: ComponentsImage,
          description: "CPU coolers and solutions",
        },
        {
          id: "graphics-card",
          name: "Graphics Card",
          path: "/components/gpu",
          image: ComponentsImage,
          description: "Graphics cards for gaming and productivity",
        },
        {
          id: "hard-disk-drive",
          name: "Hard Disk Drive",
          path: "/components/storage/hdd",
          image: ComponentsImage,
          description: "Traditional hard disk drives",
        },
        {
          id: "solid-state-drive",
          name: "Solid State Drive",
          path: "/components/storage/ssd",
          image: ComponentsImage,
          description: "Fast solid state drives",
        },
        {
          id: "ram",
          name: "RAM",
          path: "/components/memory",
          image: ComponentsImage,
          description: "Memory modules for your system",
        },
        {
          id: "motherboard",
          name: "Motherboard",
          path: "/components/motherboard",
          image: ComponentsImage,
          description: "Motherboards for various needs",
        },
        {
          id: "pc-case",
          name: "PC Case",
          path: "/components/cases",
          image: ComponentsImage,
          description: "Computer cases and enclosures",
        },
        {
          id: "power-supply",
          name: "Power Supply",
          path: "/components/psu",
          image: ComponentsImage,
          description: "Power supply units",
        },
        {
          id: "processor-amd",
          name: "Processor AMD",
          path: "/components/cpu/amd",
          image: ComponentsImage,
          description: "AMD processors",
        },
        {
          id: "processor-intel",
          name: "Processor Intel",
          path: "/components/cpu/intel",
          image: ComponentsImage,
          description: "Intel processors",
        },
      ];
    case "Peripherals":
      return [
        {
          id: "headset",
          name: "Headset",
          path: "/peripherals/audio/headsets",
          image: ComponentsImage,
          description: "Audio headsets for gaming and communication",
        },
        {
          id: "keyboard",
          name: "Keyboard",
          path: "/peripherals/input/keyboards",
          image: ComponentsImage,
          description: "Keyboards for various uses",
        },
        {
          id: "mouse",
          name: "Mouse",
          path: "/peripherals/input/mice",
          image: ComponentsImage,
          description: "Computer mice and pointing devices",
        },
        {
          id: "monitor",
          name: "Monitor",
          path: "/peripherals/displays",
          image: ComponentsImage,
          description: "Computer monitors and displays",
        },
        {
          id: "ups-avr",
          name: "UPS & AVR",
          path: "/peripherals/power",
          image: ComponentsImage,
          description: "Power protection devices",
        },
        {
          id: "mouse-pad",
          name: "Mouse Pad",
          path: "/peripherals/accessories/mousepads",
          image: ComponentsImage,
          description: "Mouse pads and surfaces",
        },
        {
          id: "web-digital-camera",
          name: "Web & Digital Camera",
          path: "/peripherals/cameras",
          image: ComponentsImage,
          description: "Cameras for computing",
        },
        {
          id: "printer-scanner",
          name: "Printer & Scanner",
          path: "/peripherals/printers",
          image: ComponentsImage,
          description: "Printing and scanning devices",
        },
        {
          id: "speaker",
          name: "Speaker",
          path: "/peripherals/audio/speakers",
          image: ComponentsImage,
          description: "Audio speakers and systems",
        },
      ];
    case "Accessories":
      return [
        {
          id: "cables",
          name: "Cables",
          path: "/accessories/cables",
          image: ComponentsImage,
          description: "Various computer cables",
        },
        {
          id: "earphones",
          name: "Earphones",
          path: "/accessories/audio/earphones",
          image: ComponentsImage,
          description: "Earphones and earbuds",
        },
        {
          id: "power-bank",
          name: "Power Bank",
          path: "/accessories/power/powerbanks",
          image: ComponentsImage,
          description: "Portable power banks",
        },
        {
          id: "adapters",
          name: "Adapters",
          path: "/accessories/adapters",
          image: ComponentsImage,
          description: "Adapters and converters",
        },
        {
          id: "mounts-stands",
          name: "Mounts & Stands",
          path: "/accessories/mounts",
          image: ComponentsImage,
          description: "Mounts and stands for devices",
        },
        {
          id: "cleaning-kits",
          name: "Cleaning Kits",
          path: "/accessories/cleaning",
          image: ComponentsImage,
          description: "Cleaning supplies for electronics",
        },
        {
          id: "tool-kits",
          name: "Tool Kits",
          path: "/accessories/tools",
          image: ComponentsImage,
          description: "Tool kits for computer maintenance",
        },
        {
          id: "cable-organizers",
          name: "Cable Organizers",
          path: "/accessories/organizers",
          image: ComponentsImage,
          description: "Cable management solutions",
        },
      ];
    case "OS & Softwares":
      return [
        {
          id: "antivirus",
          name: "Antivirus",
          path: "/software/security/antivirus",
          image: ComponentsImage,
          description: "Antivirus and security software",
        },
        {
          id: "office-applications",
          name: "Office Applications",
          path: "/software/productivity/office",
          image: ComponentsImage,
          description: "Office productivity software",
        },
        {
          id: "operating-system",
          name: "Operating System",
          path: "/software/os",
          image: ComponentsImage,
          description: "Operating systems",
        },
        {
          id: "creative-software",
          name: "Creative Software",
          path: "/software/creative",
          image: ComponentsImage,
          description: "Software for creative work",
        },
        {
          id: "utility-tools",
          name: "Utility Tools",
          path: "/software/tools",
          image: ComponentsImage,
          description: "Utility and maintenance tools",
        },
        {
          id: "driver-packages",
          name: "Driver Packages",
          path: "/software/drivers",
          image: ComponentsImage,
          description: "Driver packages and updates",
        },
        {
          id: "backup-solutions",
          name: "Backup Solutions",
          path: "/software/backup",
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
