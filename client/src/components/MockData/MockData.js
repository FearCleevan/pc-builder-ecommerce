// client/src/components/MockData/MockData.js
// Import sample product images
import SampleImg from '../../assets/banner4.jpeg';

// Banner data
export const banners = [
  { image: '', title: "Build Your Dream PC", description: "Custom computers built for gaming, creativity, and productivity" },
  { image: '', title: "Ultimate Gaming Experience", description: "High-performance components for the serious gamer" },
  { image: '', title: "Professional Workstations", description: "Powerful systems for content creation and professional work" },
  { image: '', title: "Cutting-Edge Technology", description: "Stay ahead with the latest innovations in PC hardware" },
];

// Explore products data
export const exploreProducts = [
  { name: "Graphics Card", img: SampleImg, category: "Components", series: "explore-series", subcategory: "gpu" },
  { name: "Processor Intel", img: SampleImg, category: "Components", series: "explore-series", subcategory: "cpu-intel" },
  { name: "Processor AMD", img: SampleImg, category: "Components", series: "explore-series", subcategory: "cpu-amd" },
  { name: "RAM", img: SampleImg, category: "Components", series: "explore-series", subcategory: "memory" },
  { name: "SSD", img: SampleImg, category: "Components", series: "explore-series", subcategory: "storage" },
  { name: "Motherboard", img: SampleImg, category: "Components", series: "explore-series", subcategory: "motherboard" },
  { name: "Keyboard", img: SampleImg, category: "Accessories", series: "explore-series", subcategory: "keyboard" },
  { name: "Mouse", img: SampleImg, category: "Accessories", series: "explore-series", subcategory: "mouse" },
  { name: "Monitor", img: SampleImg, category: "Accessories", series: "explore-series", subcategory: "monitor" },
  { name: "Headset", img: SampleImg, category: "Accessories", series: "explore-series", subcategory: "headset" },
  { name: "Power Supply", img: SampleImg, category: "Components", series: "explore-series", subcategory: "psu" },
  { name: "CPU Cooler", img: SampleImg, category: "Components", series: "explore-series", subcategory: "cooler" },
];

// Desktop products data
export const desktopProducts = [
  { 
    id: 1, name: "Gaming Desktop Pro", brand: "NVIDIA",
    description: "High-performance gaming desktop with RTX 4080",
    img: SampleImg, price: 85999, oldPrice: 89999,
    rating: 4.8, reviews: 124,
    category: "Desktop", series: "gaming-series", subcategory: "high-end"
  },
  { 
    id: 2, name: "Workstation Elite", brand: "Intel",
    description: "Professional workstation for content creators",
    img: SampleImg, price: 72999, oldPrice: 78999,
    rating: 4.6, reviews: 87,
    category: "Desktop", series: "workstation-series", subcategory: "creator"
  },
  { 
    id: 3, name: "Streamer PC", brand: "AMD",
    description: "Optimized for streaming and gaming simultaneously",
    img: SampleImg, price: 65999, oldPrice: 0,
    rating: 4.7, reviews: 56,
    category: "Desktop", series: "streaming-series", subcategory: "streaming"
  },
  { 
    id: 4, name: "Budget Gaming PC", brand: "ASUS",
    description: "Entry-level gaming desktop with great performance",
    img: SampleImg, price: 42999, oldPrice: 45999,
    rating: 4.5, reviews: 203,
    category: "Desktop", series: "gaming-series", subcategory: "budget"
  },
  { 
    id: 5, name: "Mini ITX Build", brand: "MSI",
    description: "Compact gaming PC with powerful components",
    img: SampleImg, price: 57999, oldPrice: 61999,
    rating: 4.9, reviews: 42,
    category: "Desktop", series: "compact-series", subcategory: "mini-itx"
  },
  { 
    id: 6, name: "RGB Gaming Beast", brand: "Corsair",
    description: "Fully customized RGB gaming desktop",
    img: SampleImg, price: 78999, oldPrice: 84999,
    rating: 4.8, reviews: 91,
    category: "Desktop", series: "gaming-series", subcategory: "rgb"
  },
  { 
    id: 7, name: "Silent Workstation", brand: "Be Quiet!",
    description: "Whisper quiet performance for professionals",
    img: SampleImg, price: 68999, oldPrice: 0,
    rating: 4.7, reviews: 38,
    category: "Desktop", series: "workstation-series", subcategory: "silent"
  },
  { 
    id: 8, name: "VR Ready Desktop", brand: "HP",
    description: "Optimized for virtual reality experiences",
    img: SampleImg, price: 75999, oldPrice: 79999,
    rating: 4.6, reviews: 67,
    category: "Desktop", series: "gaming-series", subcategory: "vr-ready"
  },
];

// Laptop products data
export const laptopProducts = [
  { 
    id: 1, name: "Gaming Laptop Pro", brand: "ASUS ROG",
    description: "17-inch gaming laptop with RTX 4070",
    img: SampleImg, price: 95999, oldPrice: 99999,
    rating: 4.8, reviews: 156,
    category: "Laptop", series: "gaming-series", subcategory: "high-end"
  },
  { 
    id: 2, name: "Ultrabook Elite", brand: "Dell",
    description: "Thin and light for professionals on the go",
    img: SampleImg, price: 72999, oldPrice: 76999,
    rating: 4.5, reviews: 89,
    category: "Laptop", series: "ultrabook-series", subcategory: "business"
  },
  { 
    id: 3, name: "Content Creator Laptop", brand: "MSI",
    description: "Color-accurate display for creative work",
    img: SampleImg, price: 85999, oldPrice: 89999,
    rating: 4.7, reviews: 64,
    category: "Laptop", series: "creator-series", subcategory: "design"
  },
  { 
    id: 4, name: "Budget Gaming Laptop", brand: "Acer",
    description: "Affordable gaming performance",
    img: SampleImg, price: 49999, oldPrice: 54999,
    rating: 4.3, reviews: 187,
    category: "Laptop", series: "gaming-series", subcategory: "budget"
  },
  { 
    id: 5, name: "2-in-1 Convertible", brand: "Lenovo",
    description: "Versatile laptop and tablet combination",
    img: SampleImg, price: 65999, oldPrice: 69999,
    rating: 4.6, reviews: 112,
    category: "Laptop", series: "convertible-series", subcategory: "2-in-1"
  },
  { 
    id: 6, name: "MacBook Pro", brand: "Apple",
    description: "Professional laptop for creatives",
    img: SampleImg, price: 112999, oldPrice: 119999,
    rating: 4.9, reviews: 245,
    category: "Laptop", series: "creator-series", subcategory: "macbook"
  },
  { 
    id: 7, name: "Business Laptop", brand: "HP",
    description: "Security-focused for enterprise use",
    img: SampleImg, price: 58999, oldPrice: 62999,
    rating: 4.4, reviews: 76,
    category: "Laptop", series: "business-series", subcategory: "enterprise"
  },
  { 
    id: 8, name: "RGB Gaming Laptop", brand: "Razer",
    description: "Sleek design with customizable lighting",
    img: SampleImg, price: 102999, oldPrice: 109999,
    rating: 4.7, reviews: 98,
    category: "Laptop", series: "gaming-series", subcategory: "rgb"
  },
];

// Other products data
export const otherProducts = [
    {
    id: 9,
    name: "MSI MAG Series Fan",
    brand: "MSI",
    description: "High-performance chassis fan with RGB lighting",
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.5,
    reviews: 128,
    img: SampleImg,
    category: "Components",
    series: "gaming-series",
    subcategory: "chassis-fan"
  },
  {
    id: 10,
    name: "MSI Silent Fan",
    brand: "MSI",
    description: "Quiet operation chassis fan",
    price: 24.99,
    oldPrice: 0,
    rating: 4.3,
    reviews: 87,
    img: SampleImg,
    category: "Components",
    series: "silent-series",
    subcategory: "chassis-fan"
  },
  { 
    id: 1, name: "Mechanical Keyboard", brand: "Corsair",
    description: "RGB mechanical keyboard with Cherry MX switches",
    img: SampleImg, price: 6999, oldPrice: 7999,
    rating: 4.8, reviews: 342,
    category: "Accessories", series: "peripherals-series", subcategory: "keyboard"
  },
  { 
    id: 2, name: "Gaming Mouse", brand: "Logitech",
    description: "Wireless gaming mouse with Hero sensor",
    img: SampleImg, price: 5499, oldPrice: 5999,
    rating: 4.7, reviews: 287,
    category: "Accessories", series: "peripherals-series", subcategory: "mouse"
  },
  { 
    id: 3, name: "4K Monitor", brand: "Samsung",
    description: "32-inch 4K display with HDR support",
    img: SampleImg, price: 23999, oldPrice: 25999,
    rating: 4.6, reviews: 154,
    category: "Accessories", series: "display-series", subcategory: "monitor"
  },
  { 
    id: 4, name: "Gaming Headset", brand: "SteelSeries",
    description: "7.1 surround sound with noise cancellation",
    img: SampleImg, price: 6999, oldPrice: 7999,
    rating: 4.5, reviews: 213,
    category: "Accessories", series: "peripherals-series", subcategory: "headset"
  },
  { 
    id: 5, name: "Webcam", brand: "Logitech",
    description: "4K webcam with background replacement",
    img: SampleImg, price: 8999, oldPrice: 9999,
    rating: 4.4, reviews: 178,
    category: "Accessories", series: "peripherals-series", subcategory: "webcam"
  },
  { 
    id: 6, name: "SSD 1TB", brand: "Samsung",
    description: "NVMe SSD with read speeds up to 7000MB/s",
    img: SampleImg, price: 7999, oldPrice: 8999,
    rating: 4.9, reviews: 432,
    category: "Components", series: "storage-series", subcategory: "ssd"
  },
  { 
    id: 7, name: "Router", brand: "TP-Link",
    description: "Wi-Fi 6 gaming router with prioritization",
    img: SampleImg, price: 5999, oldPrice: 6999,
    rating: 4.3, reviews: 167,
    category: "Accessories", series: "network-series", subcategory: "router"
  },
  { 
    id: 8, name: "Mouse Pad", brand: "Razer",
    description: "Extended RGB gaming mouse pad",
    img: SampleImg, price: 2999, oldPrice: 3499,
    rating: 4.6, reviews: 198,
    category: "Accessories", series: "peripherals-series", subcategory: "mousepad"
  },
];

// Helper functions
export const formatPrice = (price) => {
  return `₱${price.toLocaleString('en-PH')}`;
};
