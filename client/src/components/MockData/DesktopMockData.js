// client/src/components/MockData/DesktopMockData.js
import DesktopImage from '../../assets/Desktop1.jpg';

export const categories = [
  "Gaming Desktops",
  "Workstation Desktops",
  "All-in-One PCs",
  "Mini PCs",
  "Barebones"
];

// Enhanced data structure with IDs and additional metadata
export const getSeriesItems = (category) => {
  switch (category) {
    case "Gaming Desktops":
      return [
        {
          id: "meg-series",
          name: "MEG Series - Flagship Performance",
          path: "/desktops/gaming/meg",
          image: DesktopImage,
          description: "Top-tier gaming performance",
        },
        {
          id: "mpg-series",
          name: "MPG Series - Mainstream Gaming",
          path: "/desktops/gaming/mpg",
          image: DesktopImage,
          description: "Mainstream gaming experience",
        },
        {
          id: "mag-series",
          name: "MAG Series - Value Gaming",
          path: "/desktops/gaming/mag",
          image: DesktopImage,
          description: "Great value for gaming",
        },
        {
          id: "infinite-series",
          name: "Infinite Series - Ready-to-Play",
          path: "/desktops/gaming/infinite",
          image: DesktopImage,
          description: "Ready-to-play gaming systems",
        },
        {
          id: "aegis-series",
          name: "Aegis Series - Compact Power",
          path: "/desktops/gaming/aegis",
          image: DesktopImage,
          description: "Compact gaming power",
        },
        {
          id: "codex-series",
          name: "Codex Series - Entry Level Gaming",
          path: "/desktops/gaming/codex",
          image: DesktopImage,
          description: "Entry-level gaming option",
        },
      ];
    case "Workstation Desktops":
      return [
        {
          id: "wt-series",
          name: "WT Series - Professional Workstation",
          path: "/desktops/workstation/wt",
          image: DesktopImage,
          description: "Professional workstation grade",
        },
        {
          id: "creator-series",
          name: "Creator Series - Content Creation",
          path: "/desktops/workstation/creator",
          image: DesktopImage,
          description: "Content creation workstation",
        },
        {
          id: "pro-series",
          name: "Pro Series - Business Solutions",
          path: "/desktops/workstation/pro",
          image: DesktopImage,
          description: "Business solutions",
        },
        {
          id: "engineering-series",
          name: "Engineering Series - CAD/Design",
          path: "/desktops/workstation/engineering",
          image: DesktopImage,
          description: "CAD and design workstation",
        },
        {
          id: "render-station",
          name: "Render Station - 3D Rendering",
          path: "/desktops/workstation/render",
          image: DesktopImage,
          description: "3D rendering workstation",
        },
        {
          id: "data-science-series",
          name: "Data Science Series - AI/ML",
          path: "/desktops/workstation/data-science",
          image: DesktopImage,
          description: "AI/ML data science workstation",
        },
      ];
    case "All-in-One PCs":
      return [
        {
          id: "modern-aio-series",
          name: "Modern Series - Sleek Design",
          path: "/desktops/aio/modern",
          image: DesktopImage,
          description: "Sleek all-in-one design",
        },
        {
          id: "pro-aio-series",
          name: "Pro Series - Business AIO",
          path: "/desktops/aio/pro",
          image: DesktopImage,
          description: "Business all-in-one solution",
        },
        {
          id: "creative-aio-series",
          name: "Creative Series - Designer Focus",
          path: "/desktops/aio/creative",
          image: DesktopImage,
          description: "Designer-focused all-in-one",
        },
        {
          id: "gaming-aio-series",
          name: "Gaming AIO - All-in-One Gaming",
          path: "/desktops/aio/gaming",
          image: DesktopImage,
          description: "All-in-one gaming system",
        },
        {
          id: "touch-aio-series",
          name: "Touch Series - Interactive Display",
          path: "/desktops/aio/touch",
          image: DesktopImage,
          description: "Interactive touch display",
        },
        {
          id: "space-saver-series",
          name: "Space-Saver Series - Compact",
          path: "/desktops/aio/space-saver",
          image: DesktopImage,
          description: "Compact space-saving design",
        },
      ];
    case "Mini PCs":
      return [
        {
          id: "cubi-series",
          name: "Cubi Series - Ultra Compact",
          path: "/desktops/mini/cubi",
          image: DesktopImage,
          description: "Ultra-compact mini PC",
        },
        {
          id: "pro-dp-series",
          name: "Pro DP Series - Dual Display",
          path: "/desktops/mini/pro-dp",
          image: DesktopImage,
          description: "Dual display mini PC",
        },
        {
          id: "gaming-cube-series",
          name: "Gaming Cube - Mini Gaming",
          path: "/desktops/mini/gaming-cube",
          image: DesktopImage,
          description: "Mini gaming PC",
        },
        {
          id: "office-mini-series",
          name: "Office Series - Business Mini",
          path: "/desktops/mini/office",
          image: DesktopImage,
          description: "Business mini PC",
        },
        {
          id: "media-center-series",
          name: "Media Center - Home Entertainment",
          path: "/desktops/mini/media-center",
          image: DesktopImage,
          description: "Home entertainment mini PC",
        },
        {
          id: "industrial-series",
          name: "Industrial Series - Rugged Design",
          path: "/desktops/mini/industrial",
          image: DesktopImage,
          description: "Rugged industrial mini PC",
        },
      ];
    case "Barebones":
      return [
        {
          id: "gaming-barebone-kits",
          name: "Gaming Barebone Kits",
          path: "/desktops/barebone/gaming",
          image: DesktopImage,
          description: "Gaming barebone kits",
        },
        {
          id: "workstation-barebone-systems",
          name: "Workstation Barebone Systems",
          path: "/desktops/barebone/workstation",
          image: DesktopImage,
          description: "Workstation barebone systems",
        },
        {
          id: "mini-itx-barebones",
          name: "Mini-ITX Barebones",
          path: "/desktops/barebone/mini-itx",
          image: DesktopImage,
          description: "Mini-ITX barebone systems",
        },
        {
          id: "custom-watercooling-kits",
          name: "Custom Watercooling Kits",
          path: "/desktops/barebone/watercooling",
          image: DesktopImage,
          description: "Custom watercooling kits",
        },
        {
          id: "server-barebone-solutions",
          name: "Server Barebone Solutions",
          path: "/desktops/barebone/server",
          image: DesktopImage,
          description: "Server barebone solutions",
        },
        {
          id: "htpc-barebone-packages",
          name: "HTPC Barebone Packages",
          path: "/desktops/barebone/htpc",
          image: DesktopImage,
          description: "HTPC barebone packages",
        },
      ];
    default:
      return [];
  }
};

export const getFeatures = (category) => {
  switch (category) {
    case "Gaming Desktops":
      return [
        {
          id: "latest-gpu-technology",
          name: "Latest GPU Technology",
          path: "/features/gpu/latest",
          image: DesktopImage,
          description: "Cutting-edge graphics technology",
        },
        {
          id: "high-refresh-rate-ready",
          name: "High Refresh Rate Ready",
          path: "/features/display/high-refresh",
          image: DesktopImage,
          description: "High refresh rate support",
        },
        {
          id: "advanced-cooling-systems",
          name: "Advanced Cooling Systems",
          path: "/features/cooling/advanced",
          image: DesktopImage,
          description: "Advanced cooling technology",
        },
        {
          id: "rgb-fusion",
          name: "RGB Fusion 2.0",
          path: "/features/rgb/fusion",
          image: DesktopImage,
          description: "RGB lighting control",
        },
        {
          id: "vr-ready",
          name: "VR Ready",
          path: "/features/vr/ready",
          image: DesktopImage,
          description: "Virtual reality capable",
        },
        {
          id: "4k-gaming-capable",
          name: "4K Gaming Capable",
          path: "/features/gaming/4k",
          image: DesktopImage,
          description: "4K gaming experience",
        },
      ];
    case "Workstation Desktops":
      return [
        {
          id: "professional-gpus",
          name: "Professional GPUs (NVIDIA RTX)",
          path: "/features/gpu/professional",
          image: DesktopImage,
          description: "Professional-grade graphics",
        },
        {
          id: "ecc-memory-support",
          name: "ECC Memory Support",
          path: "/features/memory/ecc",
          image: DesktopImage,
          description: "Error-correcting code memory",
        },
        {
          id: "multiple-cpu-options",
          name: "Multiple CPU Options",
          path: "/features/cpu/options",
          image: DesktopImage,
          description: "Various CPU configurations",
        },
        {
          id: "enterprise-storage",
          name: "Enterprise Storage",
          path: "/features/storage/enterprise",
          image: DesktopImage,
          description: "Enterprise-grade storage",
        },
        {
          id: "isv-certified",
          name: "ISV Certified",
          path: "/features/certification/isv",
          image: DesktopImage,
          description: "Independent software vendor certified",
        },
        {
          id: "remote-management",
          name: "Remote Management",
          path: "/features/management/remote",
          image: DesktopImage,
          description: "Remote management capabilities",
        },
      ];
    case "All-in-One PCs":
      return [
        {
          id: "slim-bezels-design",
          name: "Slim Bezels Design",
          path: "/features/design/slim-bezels",
          image: DesktopImage,
          description: "Slim bezel display design",
        },
        {
          id: "touch-screen-options",
          name: "Touch Screen Options",
          path: "/features/display/touch",
          image: DesktopImage,
          description: "Touch screen capability",
        },
        {
          id: "built-in-speakers",
          name: "Built-in Speakers",
          path: "/features/audio/speakers",
          image: DesktopImage,
          description: "Integrated audio system",
        },
        {
          id: "wireless-keyboard-mouse",
          name: "Wireless Keyboard/Mouse",
          path: "/features/accessories/wireless",
          image: DesktopImage,
          description: "Wireless peripherals included",
        },
        {
          id: "webcam-microphone",
          name: "Webcam & Microphone",
          path: "/features/communication/webcam-mic",
          image: DesktopImage,
          description: "Integrated webcam and microphone",
        },
        {
          id: "space-saving-design",
          name: "Space Saving Design",
          path: "/features/design/space-saving",
          image: DesktopImage,
          description: "Space-efficient design",
        },
      ];
    case "Mini PCs":
      return [
        {
          id: "compact-form-factor",
          name: "Compact Form Factor",
          path: "/features/design/compact",
          image: DesktopImage,
          description: "Small form factor design",
        },
        {
          id: "multiple-io-ports",
          name: "Multiple I/O Ports",
          path: "/features/connectivity/io-ports",
          image: DesktopImage,
          description: "Various input/output ports",
        },
        {
          id: "vesa-mount-compatible",
          name: "VESA Mount Compatible",
          path: "/features/mounting/vesa",
          image: DesktopImage,
          description: "VESA mount compatibility",
        },
        {
          id: "low-power-consumption",
          name: "Low Power Consumption",
          path: "/features/power/low-consumption",
          image: DesktopImage,
          description: "Energy-efficient operation",
        },
        {
          id: "silent-operation",
          name: "Silent Operation",
          path: "/features/performance/silent",
          image: DesktopImage,
          description: "Quiet performance",
        },
        {
          id: "4k-output-support",
          name: "4K Output Support",
          path: "/features/display/4k-output",
          image: DesktopImage,
          description: "4K output capability",
        },
      ];
    case "Barebones":
      return [
        {
          id: "customizable-components",
          name: "Customizable Components",
          path: "/features/customization/components",
          image: DesktopImage,
          description: "Component customization options",
        },
        {
          id: "various-form-factors",
          name: "Various Form Factors",
          path: "/features/design/form-factors",
          image: DesktopImage,
          description: "Multiple form factor options",
        },
        {
          id: "cooling-options",
          name: "Cooling Options",
          path: "/features/cooling/options",
          image: DesktopImage,
          description: "Various cooling solutions",
        },
        {
          id: "power-supply-options",
          name: "Power Supply Options",
          path: "/features/power/supply-options",
          image: DesktopImage,
          description: "Power supply choices",
        },
        {
          id: "expansion-slots",
          name: "Expansion Slots",
          path: "/features/expansion/slots",
          image: DesktopImage,
          description: "Expansion capabilities",
        },
        {
          id: "build-flexibility",
          name: "Build Flexibility",
          path: "/features/flexibility/build",
          image: DesktopImage,
          description: "Flexible building options",
        },
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch (category) {
    case "Gaming Desktops":
      return [
        {
          id: "gaming-performance-benchmarks",
          name: "Gaming Performance Benchmarks",
          path: "/explore/benchmarks/gaming",
          image: DesktopImage,
          description: "Performance comparisons",
        },
        {
          id: "rgb-lighting-control",
          name: "RGB Lighting Control",
          path: "/explore/features/rgb",
          image: DesktopImage,
          description: "RGB lighting customization",
        },
        {
          id: "overclocking-guides",
          name: "Overclocking Guides",
          path: "/explore/guides/overclocking",
          image: DesktopImage,
          description: "Overclocking tutorials",
        },
        {
          id: "streaming-setup-tips",
          name: "Streaming Setup Tips",
          path: "/explore/guides/streaming",
          image: DesktopImage,
          description: "Streaming configuration tips",
        },
        {
          id: "vr-ready-systems",
          name: "VR Ready Systems",
          path: "/explore/features/vr",
          image: DesktopImage,
          description: "Virtual reality compatibility",
        },
        {
          id: "custom-cooling-solutions",
          name: "Custom Cooling Solutions",
          path: "/explore/features/cooling",
          image: DesktopImage,
          description: "Cooling system options",
        },
      ];
    case "Workstation Desktops":
      return [
        {
          id: "professional-certification",
          name: "Professional Certification",
          path: "/explore/certification/professional",
          image: DesktopImage,
          description: "Professional certifications",
        },
        {
          id: "software-compatibility",
          name: "Software Compatibility",
          path: "/explore/compatibility/software",
          image: DesktopImage,
          description: "Software compatibility information",
        },
        {
          id: "multi-gpu-configuration",
          name: "Multi-GPU Configuration",
          path: "/explore/configuration/multi-gpu",
          image: DesktopImage,
          description: "Multiple GPU setup",
        },
        {
          id: "ecc-memory-support",
          name: "ECC Memory Support",
          path: "/explore/features/ecc-memory",
          image: DesktopImage,
          description: "Error-correcting memory support",
        },
        {
          id: "raid-storage-options",
          name: "RAID Storage Options",
          path: "/explore/storage/raid",
          image: DesktopImage,
          description: "RAID storage configurations",
        },
        {
          id: "remote-management",
          name: "Remote Management",
          path: "/explore/features/remote-management",
          image: DesktopImage,
          description: "Remote management features",
        },
      ];
    case "All-in-One PCs":
      return [
        {
          id: "space-saving-solutions",
          name: "Space Saving Solutions",
          path: "/explore/features/space-saving",
          image: DesktopImage,
          description: "Space-efficient solutions",
        },
        {
          id: "touch-screen-technology",
          name: "Touch Screen Technology",
          path: "/explore/technology/touch",
          image: DesktopImage,
          description: "Touch screen technology",
        },
        {
          id: "wireless-connectivity",
          name: "Wireless Connectivity",
          path: "/explore/connectivity/wireless",
          image: DesktopImage,
          description: "Wireless connection options",
        },
        {
          id: "built-in-webcam-mic",
          name: "Built-in Webcam & Mic",
          path: "/explore/features/webcam-mic",
          image: DesktopImage,
          description: "Integrated camera and microphone",
        },
        {
          id: "wall-mount-options",
          name: "Wall Mount Options",
          path: "/explore/accessories/wall-mount",
          image: DesktopImage,
          description: "Wall mounting solutions",
        },
        {
          id: "energy-efficiency",
          name: "Energy Efficiency",
          path: "/explore/features/energy-efficiency",
          image: DesktopImage,
          description: "Energy-efficient operation",
        },
      ];
    case "Mini PCs":
      return [
        {
          id: "portable-computing",
          name: "Portable Computing",
          path: "/explore/features/portable",
          image: DesktopImage,
          description: "Portable computing solutions",
        },
        {
          id: "multiple-display-support",
          name: "Multiple Display Support",
          path: "/explore/features/multi-display",
          image: DesktopImage,
          description: "Multi-monitor support",
        },
        {
          id: "low-power-consumption",
          name: "Low Power Consumption",
          path: "/explore/features/low-power",
          image: DesktopImage,
          description: "Energy-efficient performance",
        },
        {
          id: "vesa-mount-compatibility",
          name: "VESA Mount Compatibility",
          path: "/explore/accessories/vesa-mount",
          image: DesktopImage,
          description: "VESA mount compatibility",
        },
        {
          id: "silent-operation",
          name: "Silent Operation",
          path: "/explore/features/silent",
          image: DesktopImage,
          description: "Quiet operation",
        },
        {
          id: "industrial-applications",
          name: "Industrial Applications",
          path: "/explore/applications/industrial",
          image: DesktopImage,
          description: "Industrial use cases",
        },
      ];
    case "Barebones":
      return [
        {
          id: "custom-build-guides",
          name: "Custom Build Guides",
          path: "/explore/guides/custom-build",
          image: DesktopImage,
          description: "Custom building tutorials",
        },
        {
          id: "component-compatibility",
          name: "Component Compatibility",
          path: "/explore/compatibility/components",
          image: DesktopImage,
          description: "Component compatibility check",
        },
        {
          id: "cooling-solutions",
          name: "Cooling Solutions",
          path: "/explore/solutions/cooling",
          image: DesktopImage,
          description: "Cooling system options",
        },
        {
          id: "cable-management-tips",
          name: "Cable Management Tips",
          path: "/explore/guides/cable-management",
          image: DesktopImage,
          description: "Cable organization tips",
        },
        {
          id: "bios-configuration",
          name: "BIOS Configuration",
          path: "/explore/guides/bios",
          image: DesktopImage,
          description: "BIOS setup guides",
        },
        {
          id: "warranty-information",
          name: "Warranty Information",
          path: "/explore/support/warranty",
          image: DesktopImage,
          description: "Warranty details",
        },
      ];
    default:
      return [];
  }
};

export const getPromoContent = (category) => {
  switch (category) {
    case "Gaming Desktops":
      return {
        image: DesktopImage,
        title: "Ultimate Gaming Desktops",
        description: "Experience unparalleled gaming performance with cutting-edge technology and stunning RGB lighting",
        buttonText: "View Gaming Desktops",
        buttonPath: "/desktops/gaming"
      };
    case "Workstation Desktops":
      return {
        image: DesktopImage,
        title: "Professional Workstations",
        description: "Power through demanding professional applications with certified hardware and reliable performance",
        buttonText: "Explore Workstations",
        buttonPath: "/desktops/workstation"
      };
    case "All-in-One PCs":
      return {
        image: DesktopImage,
        title: "All-in-One Solutions",
        description: "Sleek, space-saving computers with integrated displays and powerful performance",
        buttonText: "Discover AIO PCs",
        buttonPath: "/desktops/aio"
      };
    case "Mini PCs":
      return {
        image: DesktopImage,
        title: "Compact Mini PCs",
        description: "Powerful computing in a small form factor perfect for office, home, or industrial use",
        buttonText: "See Mini PCs",
        buttonPath: "/desktops/mini"
      };
    case "Barebones":
      return {
        image: DesktopImage,
        title: "Barebone Systems",
        description: "Build your dream system with our customizable barebone kits and components",
        buttonText: "Start Building",
        buttonPath: "/desktops/barebone"
      };
    default:
      return {
        image: DesktopImage,
        title: "MSI Desktops",
        description: "Discover our complete desktop lineup",
        buttonText: "Explore All",
        buttonPath: "/desktops"
      };
  }
};