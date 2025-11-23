//src/components/PCBuilder/Modal/MockData/CPU/CPU.js
import CloudinaryService from "../../../../../firebase/services/cloudinaryService";

// Helper function to generate Cloudinary image URLs
const generateImageUrl = (productName) => {
  return CloudinaryService.getProcessorImage(productName, {
    width: 400,
    height: 400
  });
};

export const cpuData = [
  {
    id: 'cpu-1',
    name: 'AMD Ryzen 9 7950X',
    image: generateImageUrl('AMD Ryzen 9 7950X'),
    price: 34200.00,
    specs: {
      "Socket": "AM5",
      "Microarchitecture": "Zen 4",
      "Integrated Graphics": "AMD Radeon Graphics",
      "TDP": "170 W",
      "Core Count": "16",
      "Thread Count": "32",
      "Base Clock": "4.5 GHz",
      "Max Boost Clock": "5.7 GHz",
      "L2 Cache": "16 MB",
      "L3 Cache": "64 MB",
      "Manufacturer": "AMD"
    },
    has3D: true,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-2',
    name: 'Intel Core i9-13900K',
    image: generateImageUrl('Intel Core i9-13900K'),
    price: 33630.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Raptor Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "24",
      "Thread Count": "32",
      "Base Clock": "3.0 GHz",
      "Max Boost Clock": "5.8 GHz",
      "L2 Cache": "32 MB",
      "L3 Cache": "36 MB",
      "Manufacturer": "Intel"
    },
    has3D: true,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-3',
    name: 'AMD Ryzen 7 7800X3D',
    image: generateImageUrl('AMD Ryzen 7 7800X3D'),
    price: 25650.00,
    specs: {
      "Socket": "AM5",
      "Microarchitecture": "Zen 4",
      "Integrated Graphics": "AMD Radeon Graphics",
      "TDP": "120 W",
      "Core Count": "8",
      "Thread Count": "16",
      "Base Clock": "4.2 GHz",
      "Max Boost Clock": "5.0 GHz",
      "L2 Cache": "8 MB",
      "L3 Cache": "96 MB",
      "Manufacturer": "AMD"
    },
    has3D: true,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-4',
    name: 'Intel Core i7-13700K',
    image: generateImageUrl('Intel Core i7-13700K'),
    price: 23940.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Raptor Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "16",
      "Thread Count": "24",
      "Base Clock": "3.4 GHz",
      "Max Boost Clock": "5.4 GHz",
      "L2 Cache": "24 MB",
      "L3 Cache": "30 MB",
      "Manufacturer": "Intel"
    },
    has3D: true,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-5',
    name: 'AMD Ryzen 5 7600X',
    image: generateImageUrl('AMD Ryzen 5 7600X'),
    price: 17100.00,
    specs: {
      "Socket": "AM5",
      "Microarchitecture": "Zen 4",
      "Integrated Graphics": "AMD Radeon Graphics",
      "TDP": "105 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "4.7 GHz",
      "Max Boost Clock": "5.3 GHz",
      "L2 Cache": "6 MB",
      "L3 Cache": "32 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-6',
    name: 'Intel Core i5-13600K',
    image: generateImageUrl('Intel Core i5-13600K'),
    price: 18240.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Raptor Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "14",
      "Thread Count": "20",
      "Base Clock": "3.5 GHz",
      "Max Boost Clock": "5.1 GHz",
      "L2 Cache": "20 MB",
      "L3 Cache": "24 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-7',
    name: 'AMD Ryzen 9 5950X',
    image: generateImageUrl('AMD Ryzen 9 5950X'),
    price: 28500.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "105 W",
      "Core Count": "16",
      "Thread Count": "32",
      "Base Clock": "3.4 GHz",
      "Max Boost Clock": "4.9 GHz",
      "L2 Cache": "8 MB",
      "L3 Cache": "64 MB",
      "Manufacturer": "AMD"
    },
    has3D: true,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-8',
    name: 'Intel Core i9-12900K',
    image: generateImageUrl('Intel Core i9-12900K'),
    price: 25650.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Alder Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "16",
      "Thread Count": "24",
      "Base Clock": "3.2 GHz",
      "Max Boost Clock": "5.2 GHz",
      "L2 Cache": "14 MB",
      "L3 Cache": "30 MB",
      "Manufacturer": "Intel"
    },
    has3D: true,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-9',
    name: 'AMD Ryzen 7 5800X3D',
    image: generateImageUrl('AMD Ryzen 7 5800X3D'),
    price: 19950.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "105 W",
      "Core Count": "8",
      "Thread Count": "16",
      "Base Clock": "3.4 GHz",
      "Max Boost Clock": "4.5 GHz",
      "L2 Cache": "4 MB",
      "L3 Cache": "96 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-10',
    name: 'Intel Core i7-12700K',
    image: generateImageUrl('Intel Core i7-12700K'),
    price: 21660.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Alder Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "12",
      "Thread Count": "20",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "5.0 GHz",
      "L2 Cache": "12 MB",
      "L3 Cache": "25 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-11',
    name: 'AMD Ryzen 5 5600X',
    image: generateImageUrl('AMD Ryzen 5 5600X'),
    price: 11400.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.7 GHz",
      "Max Boost Clock": "4.6 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "32 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-12',
    name: 'Intel Core i5-12600K',
    image: generateImageUrl('Intel Core i5-12600K'),
    price: 14250.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Alder Lake",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "10",
      "Thread Count": "16",
      "Base Clock": "3.7 GHz",
      "Max Boost Clock": "4.9 GHz",
      "L2 Cache": "9.5 MB",
      "L3 Cache": "20 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-13',
    name: 'AMD Ryzen 9 7900X',
    image: generateImageUrl('AMD Ryzen 9 7900X'),
    price: 28500.00,
    specs: {
      "Socket": "AM5",
      "Microarchitecture": "Zen 4",
      "Integrated Graphics": "AMD Radeon Graphics",
      "TDP": "170 W",
      "Core Count": "12",
      "Thread Count": "24",
      "Base Clock": "4.7 GHz",
      "Max Boost Clock": "5.6 GHz",
      "L2 Cache": "12 MB",
      "L3 Cache": "64 MB",
      "Manufacturer": "AMD"
    },
    has3D: true,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-14',
    name: 'Intel Core i3-13100',
    image: generateImageUrl('Intel Core i3-13100'),
    price: 8550.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Raptor Lake",
      "Integrated Graphics": "Intel UHD Graphics 730",
      "TDP": "60 W",
      "Core Count": "4",
      "Thread Count": "8",
      "Base Clock": "3.4 GHz",
      "Max Boost Clock": "4.5 GHz",
      "L2 Cache": "5 MB",
      "L3 Cache": "12 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-15',
    name: 'AMD Ryzen 3 4100',
    image: generateImageUrl('AMD Ryzen 3 4100'),
    price: 5700.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 2",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "4",
      "Thread Count": "8",
      "Base Clock": "3.8 GHz",
      "Max Boost Clock": "4.0 GHz",
      "L2 Cache": "2 MB",
      "L3 Cache": "4 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-16',
    name: 'Intel Pentium Gold G7400',
    image: generateImageUrl('Intel Pentium Gold G7400'),
    price: 4560.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Alder Lake",
      "Integrated Graphics": "Intel UHD Graphics 710",
      "TDP": "46 W",
      "Core Count": "2",
      "Thread Count": "4",
      "Base Clock": "3.7 GHz",
      "Max Boost Clock": "N/A",
      "L2 Cache": "2.5 MB",
      "L3 Cache": "6 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-17',
    name: 'AMD Ryzen Threadripper 3970X',
    image: generateImageUrl('AMD Ryzen Threadripper 3970X'),
    price: 114000.00,
    specs: {
      "Socket": "sTRX4",
      "Microarchitecture": "Zen 2",
      "Integrated Graphics": "None",
      "TDP": "280 W",
      "Core Count": "32",
      "Thread Count": "64",
      "Base Clock": "3.7 GHz",
      "Max Boost Clock": "4.5 GHz",
      "L2 Cache": "16 MB",
      "L3 Cache": "128 MB",
      "Manufacturer": "AMD"
    },
    has3D: true,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-18',
    name: 'Intel Xeon W-3375',
    image: generateImageUrl('Intel Xeon W-3375'),
    price: 199500.00,
    specs: {
      "Socket": "LGA4189",
      "Microarchitecture": "Ice Lake",
      "Integrated Graphics": "None",
      "TDP": "270 W",
      "Core Count": "38",
      "Thread Count": "76",
      "Base Clock": "2.5 GHz",
      "Max Boost Clock": "4.0 GHz",
      "L2 Cache": "38 MB",
      "L3 Cache": "57 MB",
      "Manufacturer": "Intel"
    },
    has3D: true,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-19',
    name: 'AMD Ryzen 7 5700G',
    image: generateImageUrl('AMD Ryzen 7 5700G'),
    price: 14250.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "AMD Radeon Vega 8",
      "TDP": "65 W",
      "Core Count": "8",
      "Thread Count": "16",
      "Base Clock": "3.8 GHz",
      "Max Boost Clock": "4.6 GHz",
      "L2 Cache": "4 MB",
      "L3 Cache": "16 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-20',
    name: 'Intel Core i9-11900K',
    image: generateImageUrl('Intel Core i9-11900K'),
    price: 22800.00,
    specs: {
      "Socket": "LGA1200",
      "Microarchitecture": "Rocket Lake",
      "Integrated Graphics": "Intel UHD Graphics 750",
      "TDP": "125 W",
      "Core Count": "8",
      "Thread Count": "16",
      "Base Clock": "3.5 GHz",
      "Max Boost Clock": "5.3 GHz",
      "L2 Cache": "4 MB",
      "L3 Cache": "16 MB",
      "Manufacturer": "Intel"
    },
    has3D: true,
    store: "Amazon",
    stock: "In stock"
  },
  // Additional CPUs to match your uploaded assets
  {
    id: 'cpu-21',
    name: 'AMD Ryzen 5 3600',
    image: generateImageUrl('AMD Ryzen 5 3600'),
    price: 7980.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 2",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "4.2 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "32 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-22',
    name: 'AMD Ryzen 5 4500',
    image: generateImageUrl('AMD Ryzen 5 4500'),
    price: 6840.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 2",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "4.1 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "8 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-23',
    name: 'AMD Ryzen 5 5500',
    image: generateImageUrl('AMD Ryzen 5 5500'),
    price: 9120.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "4.2 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "16 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-24',
    name: 'AMD Ryzen 5 5500GT',
    image: generateImageUrl('AMD Ryzen 5 5500GT'),
    price: 10260.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "AMD Radeon Vega 7",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "4.4 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "16 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-25',
    name: 'AMD Ryzen 5 5600',
    image: generateImageUrl('AMD Ryzen 5 5600'),
    price: 10260.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.5 GHz",
      "Max Boost Clock": "4.4 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "32 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-26',
    name: 'AMD Ryzen 5 5600G',
    image: generateImageUrl('AMD Ryzen 5 5600G'),
    price: 11400.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "AMD Radeon Vega 7",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.9 GHz",
      "Max Boost Clock": "4.4 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "16 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  },
  {
    id: 'cpu-27',
    name: 'AMD Ryzen 5 5600XT',
    image: generateImageUrl('AMD Ryzen 5 5600XT'),
    price: 12540.00,
    specs: {
      "Socket": "AM4",
      "Microarchitecture": "Zen 3",
      "Integrated Graphics": "None",
      "TDP": "65 W",
      "Core Count": "6",
      "Thread Count": "12",
      "Base Clock": "3.7 GHz",
      "Max Boost Clock": "4.6 GHz",
      "L2 Cache": "3 MB",
      "L3 Cache": "32 MB",
      "Manufacturer": "AMD"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-28',
    name: 'Intel Core i3-10100',
    image: generateImageUrl('Intel Core i3-10100'),
    price: 5700.00,
    specs: {
      "Socket": "LGA1200",
      "Microarchitecture": "Comet Lake",
      "Integrated Graphics": "Intel UHD Graphics 630",
      "TDP": "65 W",
      "Core Count": "4",
      "Thread Count": "8",
      "Base Clock": "3.6 GHz",
      "Max Boost Clock": "4.3 GHz",
      "L2 Cache": "1 MB",
      "L3 Cache": "6 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Newegg",
    stock: "In stock"
  },
  {
    id: 'cpu-29',
    name: 'Intel Core i3-12100',
    image: generateImageUrl('Intel Core i3-12100'),
    price: 6840.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Alder Lake",
      "Integrated Graphics": "Intel UHD Graphics 730",
      "TDP": "60 W",
      "Core Count": "4",
      "Thread Count": "8",
      "Base Clock": "3.3 GHz",
      "Max Boost Clock": "4.3 GHz",
      "L2 Cache": "5 MB",
      "L3 Cache": "12 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Amazon",
    stock: "In stock"
  },
  {
    id: 'cpu-30',
    name: 'Intel Core i5-14600K',
    image: generateImageUrl('Intel Core i5-14600K'),
    price: 20520.00,
    specs: {
      "Socket": "LGA1700",
      "Microarchitecture": "Raptor Lake Refresh",
      "Integrated Graphics": "Intel UHD Graphics 770",
      "TDP": "125 W",
      "Core Count": "14",
      "Thread Count": "20",
      "Base Clock": "3.5 GHz",
      "Max Boost Clock": "5.3 GHz",
      "L2 Cache": "20 MB",
      "L3 Cache": "24 MB",
      "Manufacturer": "Intel"
    },
    has3D: false,
    store: "Best Buy",
    stock: "In stock"
  }
];