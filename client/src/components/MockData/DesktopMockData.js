// client/src/components/MockData/DesktopMockData.js
import DesktopImage from '../../assets/Desktop1.jpg';

export const categories = [
  "Gaming Desktops",
  "Workstation Desktops",
  "All-in-One PCs",
  "Mini PCs",
  "Barebones"
];

// Different content based on selected category
export const getSeriesItems = (category) => {
  switch(category) {
    case "Gaming Desktops":
      return [
        { name: "MEG Series - Flagship Performance", path: "/desktops/gaming/meg" },
        { name: "MPG Series - Mainstream Gaming", path: "/desktops/gaming/mpg" },
        { name: "MAG Series - Value Gaming", path: "/desktops/gaming/mag" },
        { name: "Infinite Series - Ready-to-Play", path: "/desktops/gaming/infinite" },
        { name: "Aegis Series - Compact Power", path: "/desktops/gaming/aegis" },
        { name: "Codex Series - Entry Level Gaming", path: "/desktops/gaming/codex" }
      ];
    case "Workstation Desktops":
      return [
        { name: "WT Series - Professional Workstation", path: "/desktops/workstation/wt" },
        { name: "Creator Series - Content Creation", path: "/desktops/workstation/creator" },
        { name: "Pro Series - Business Solutions", path: "/desktops/workstation/pro" },
        { name: "Engineering Series - CAD/Design", path: "/desktops/workstation/engineering" },
        { name: "Render Station - 3D Rendering", path: "/desktops/workstation/render" },
        { name: "Data Science Series - AI/ML", path: "/desktops/workstation/data-science" }
      ];
    case "All-in-One PCs":
      return [
        { name: "Modern Series - Sleek Design", path: "/desktops/aio/modern" },
        { name: "Pro Series - Business AIO", path: "/desktops/aio/pro" },
        { name: "Creative Series - Designer Focus", path: "/desktops/aio/creative" },
        { name: "Gaming AIO - All-in-One Gaming", path: "/desktops/aio/gaming" },
        { name: "Touch Series - Interactive Display", path: "/desktops/aio/touch" },
        { name: "Space-Saver Series - Compact", path: "/desktops/aio/space-saver" }
      ];
    case "Mini PCs":
      return [
        { name: "Cubi Series - Ultra Compact", path: "/desktops/mini/cubi" },
        { name: "Pro DP Series - Dual Display", path: "/desktops/mini/pro-dp" },
        { name: "Gaming Cube - Mini Gaming", path: "/desktops/mini/gaming-cube" },
        { name: "Office Series - Business Mini", path: "/desktops/mini/office" },
        { name: "Media Center - Home Entertainment", path: "/desktops/mini/media-center" },
        { name: "Industrial Series - Rugged Design", path: "/desktops/mini/industrial" }
      ];
    case "Barebones":
      return [
        { name: "Gaming Barebone Kits", path: "/desktops/barebone/gaming" },
        { name: "Workstation Barebone Systems", path: "/desktops/barebone/workstation" },
        { name: "Mini-ITX Barebones", path: "/desktops/barebone/mini-itx" },
        { name: "Custom Watercooling Kits", path: "/desktops/barebone/watercooling" },
        { name: "Server Barebone Solutions", path: "/desktops/barebone/server" },
        { name: "HTPC Barebone Packages", path: "/desktops/barebone/htpc" }
      ];
    default:
      return [];
  }
};

export const getExploreItems = (category) => {
  switch(category) {
    case "Gaming Desktops":
      return [
        { name: "Gaming Performance Benchmarks", path: "/explore/benchmarks/gaming" },
        { name: "RGB Lighting Control", path: "/explore/features/rgb" },
        { name: "Overclocking Guides", path: "/explore/guides/overclocking" },
        { name: "Streaming Setup Tips", path: "/explore/guides/streaming" },
        { name: "VR Ready Systems", path: "/explore/features/vr" },
        { name: "Custom Cooling Solutions", path: "/explore/features/cooling" }
      ];
    case "Workstation Desktops":
      return [
        { name: "Professional Certification", path: "/explore/certification/professional" },
        { name: "Software Compatibility", path: "/explore/compatibility/software" },
        { name: "Multi-GPU Configuration", path: "/explore/configuration/multi-gpu" },
        { name: "ECC Memory Support", path: "/explore/features/ecc-memory" },
        { name: "RAID Storage Options", path: "/explore/storage/raid" },
        { name: "Remote Management", path: "/explore/features/remote-management" }
      ];
    case "All-in-One PCs":
      return [
        { name: "Space Saving Solutions", path: "/explore/features/space-saving" },
        { name: "Touch Screen Technology", path: "/explore/technology/touch" },
        { name: "Wireless Connectivity", path: "/explore/connectivity/wireless" },
        { name: "Built-in Webcam & Mic", path: "/explore/features/webcam-mic" },
        { name: "Wall Mount Options", path: "/explore/accessories/wall-mount" },
        { name: "Energy Efficiency", path: "/explore/features/energy-efficiency" }
      ];
    case "Mini PCs":
      return [
        { name: "Portable Computing", path: "/explore/features/portable" },
        { name: "Multiple Display Support", path: "/explore/features/multi-display" },
        { name: "Low Power Consumption", path: "/explore/features/low-power" },
        { name: "VESA Mount Compatibility", path: "/explore/accessories/vesa-mount" },
        { name: "Silent Operation", path: "/explore/features/silent" },
        { name: "Industrial Applications", path: "/explore/applications/industrial" }
      ];
    case "Barebones":
      return [
        { name: "Custom Build Guides", path: "/explore/guides/custom-build" },
        { name: "Component Compatibility", path: "/explore/compatibility/components" },
        { name: "Cooling Solutions", path: "/explore/solutions/cooling" },
        { name: "Cable Management Tips", path: "/explore/guides/cable-management" },
        { name: "BIOS Configuration", path: "/explore/guides/bios" },
        { name: "Warranty Information", path: "/explore/support/warranty" }
      ];
    default:
      return [];
  }
};

export const getFeatures = (category) => {
  switch(category) {
    case "Gaming Desktops":
      return [
        { name: "Latest GPU Technology", path: "/features/gpu/latest" },
        { name: "High Refresh Rate Ready", path: "/features/display/high-refresh" },
        { name: "Advanced Cooling Systems", path: "/features/cooling/advanced" },
        { name: "RGB Fusion 2.0", path: "/features/rgb/fusion" },
        { name: "VR Ready", path: "/features/vr/ready" },
        { name: "4K Gaming Capable", path: "/features/gaming/4k" }
      ];
    case "Workstation Desktops":
      return [
        { name: "Professional GPUs (NVIDIA RTX)", path: "/features/gpu/professional" },
        { name: "ECC Memory Support", path: "/features/memory/ecc" },
        { name: "Multiple CPU Options", path: "/features/cpu/options" },
        { name: "Enterprise Storage", path: "/features/storage/enterprise" },
        { name: "ISV Certified", path: "/features/certification/isv" },
        { name: "Remote Management", path: "/features/management/remote" }
      ];
    case "All-in-One PCs":
      return [
        { name: "Slim Bezels Design", path: "/features/design/slim-bezels" },
        { name: "Touch Screen Options", path: "/features/display/touch" },
        { name: "Built-in Speakers", path: "/features/audio/speakers" },
        { name: "Wireless Keyboard/Mouse", path: "/features/accessories/wireless" },
        { name: "Webcam & Microphone", path: "/features/communication/webcam-mic" },
        { name: "Space Saving Design", path: "/features/design/space-saving" }
      ];
    case "Mini PCs":
      return [
        { name: "Compact Form Factor", path: "/features/design/compact" },
        { name: "Multiple I/O Ports", path: "/features/connectivity/io-ports" },
        { name: "VESA Mount Compatible", path: "/features/mounting/vesa" },
        { name: "Low Power Consumption", path: "/features/power/low-consumption" },
        { name: "Silent Operation", path: "/features/performance/silent" },
        { name: "4K Output Support", path: "/features/display/4k-output" }
      ];
    case "Barebones":
      return [
        { name: "Customizable Components", path: "/features/customization/components" },
        { name: "Various Form Factors", path: "/features/design/form-factors" },
        { name: "Cooling Options", path: "/features/cooling/options" },
        { name: "Power Supply Options", path: "/features/power/supply-options" },
        { name: "Expansion Slots", path: "/features/expansion/slots" },
        { name: "Build Flexibility", path: "/features/flexibility/build" }
      ];
    default:
      return [];
  }
};

export const getPromoContent = (category) => {
  switch(category) {
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