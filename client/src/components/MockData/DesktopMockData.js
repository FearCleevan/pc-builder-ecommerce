//client/src/components/MockData/DesktopMockData.js
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
          "MEG Series - Flagship Performance",
          "MPG Series - Mainstream Gaming",
          "MAG Series - Value Gaming",
          "Infinite Series - Ready-to-Play",
          "Aegis Series - Compact Power",
          "Codex Series - Entry Level Gaming"
        ];
      case "Workstation Desktops":
        return [
          "WT Series - Professional Workstation",
          "Creator Series - Content Creation",
          "Pro Series - Business Solutions",
          "Engineering Series - CAD/Design",
          "Render Station - 3D Rendering",
          "Data Science Series - AI/ML"
        ];
      case "All-in-One PCs":
        return [
          "Modern Series - Sleek Design",
          "Pro Series - Business AIO",
          "Creative Series - Designer Focus",
          "Gaming AIO - All-in-One Gaming",
          "Touch Series - Interactive Display",
          "Space-Saver Series - Compact"
        ];
      case "Mini PCs":
        return [
          "Cubi Series - Ultra Compact",
          "Pro DP Series - Dual Display",
            "Gaming Cube - Mini Gaming",
          "Office Series - Business Mini",
          "Media Center - Home Entertainment",
          "Industrial Series - Rugged Design"
        ];
      case "Barebones":
        return [
          "Gaming Barebone Kits",
          "Workstation Barebone Systems",
          "Mini-ITX Barebones",
          "Custom Watercooling Kits",
          "Server Barebone Solutions",
          "HTPC Barebone Packages"
        ];
      default:
        return [];
    }
  };

  export const getExploreItems = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return [
          "Gaming Performance Benchmarks",
          "RGB Lighting Control",
          "Overclocking Guides",
          "Streaming Setup Tips",
          "VR Ready Systems",
          "Custom Cooling Solutions"
        ];
      case "Workstation Desktops":
        return [
          "Professional Certification",
          "Software Compatibility",
          "Multi-GPU Configuration",
          "ECC Memory Support",
          "RAID Storage Options",
          "Remote Management"
        ];
      case "All-in-One PCs":
        return [
          "Space Saving Solutions",
          "Touch Screen Technology",
          "Wireless Connectivity",
          "Built-in Webcam & Mic",
          "Wall Mount Options",
          "Energy Efficiency"
        ];
      case "Mini PCs":
        return [
          "Portable Computing",
          "Multiple Display Support",
          "Low Power Consumption",
          "VESA Mount Compatibility",
          "Silent Operation",
          "Industrial Applications"
        ];
      case "Barebones":
        return [
          "Custom Build Guides",
          "Component Compatibility",
          "Cooling Solutions",
          "Cable Management Tips",
          "BIOS Configuration",
          "Warranty Information"
        ];
      default:
        return [];
    }
  };

   export const getFeatures = (category) => {
    switch(category) {
      case "Gaming Desktops":
        return [
          "Latest GPU Technology",
          "High Refresh Rate Ready",
          "Advanced Cooling Systems",
          "RGB Fusion 2.0",
          "VR Ready",
          "4K Gaming Capable"
        ];
      case "Workstation Desktops":
        return [
          "Professional GPUs (NVIDIA RTX)",
          "ECC Memory Support",
          "Multiple CPU Options",
          "Enterprise Storage",
          "ISV Certified",
          "Remote Management"
        ];
      case "All-in-One PCs":
        return [
          "Slim Bezels Design",
          "Touch Screen Options",
          "Built-in Speakers",
          "Wireless Keyboard/Mouse",
          "Webcam & Microphone",
          "Space Saving Design"
        ];
      case "Mini PCs":
        return [
          "Compact Form Factor",
          "Multiple I/O Ports",
          "VESA Mount Compatible",
          "Low Power Consumption",
          "Silent Operation",
          "4K Output Support"
        ];
      case "Barebones":
        return [
          "Customizable Components",
          "Various Form Factors",
          "Cooling Options",
          "Power Supply Options",
          "Expansion Slots",
          "Build Flexibility"
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
          buttonText: "View Gaming Desktops"
        };
      case "Workstation Desktops":
        return {
          image: DesktopImage,
          title: "Professional Workstations",
          description: "Power through demanding professional applications with certified hardware and reliable performance",
          buttonText: "Explore Workstations"
        };
      case "All-in-One PCs":
        return {
          image: DesktopImage,
          title: "All-in-One Solutions",
          description: "Sleek, space-saving computers with integrated displays and powerful performance",
          buttonText: "Discover AIO PCs"
        };
      case "Mini PCs":
        return {
          image: DesktopImage,
          title: "Compact Mini PCs",
          description: "Powerful computing in a small form factor perfect for office, home, or industrial use",
          buttonText: "See Mini PCs"
        };
      case "Barebones":
        return {
          image: DesktopImage,
          title: "Barebone Systems",
          description: "Build your dream system with our customizable barebone kits and components",
          buttonText: "Start Building"
        };
      default:
        return {
          image: "https://storage-asset.msi.com/global/picture/image/feature/desktop/MPG-Trident-AS/MPG-Trident-AS-banner.png",
          title: "MSI Desktops",
          description: "Discover our complete desktop lineup",
          buttonText: "Explore All"
        };
    }
  };