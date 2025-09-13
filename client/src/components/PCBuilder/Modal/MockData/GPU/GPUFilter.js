//client/src/components/PCBuilder/Modal/MockData/GPU/GPUFilter.js
export const gpuFilter = [
  {
    title: "Price",
    type: "range",
    min: 3000,
    max: 250000,
    unit: "₱"
  },
  {
    title: "Chipset",
    type: "checkbox",
    options: [
      "Arc A310", "Arc A380", "Arc A580", "Arc A750", "Arc A770", "Arc B570", "Arc B580",
      "ARC B580", "Arc Pro A40", "Arc Pro A50", "Arc Pro A60", "Ellesmere", "FirePro 2270",
      "FirePro RG220A", "FirePro V7900 SDI", "FirePro W4100", "FirePro W5000", "FirePro W5100",
      "FirePro W7100", "FirePro W9000", "FirePro W9100", "GA102", "GeForce 210", "GeForce 8400 GS",
      "GeForce 9500 GT", "GeForce GT 1030", "GeForce GT 1030 DDR4", "GeForce GT 520", "GeForce GT 610",
      "GeForce GT 620", "GeForce GT 630", "GeForce GT 640", "GeForce GT 710", "GeForce GT 720",
      "GeForce GT 730", "GeForce GT 740", "GeForce GTS 450", "GeForce GTX 1050", "GeForce GTX 1050 Ti",
      "GeForce GTX 1060 3GB", "GeForce GTX 1060 6GB", "GeForce GTX 1070", "GeForce GTX 1070 Ti",
      "GeForce GTX 1080", "GeForce GTX 1080 Ti", "GeForce GTX 1630", "GeForce GTX 1650", "GeForce GTX 1650 G5",
      "GeForce GTX 1650 G6", "GeForce GTX 1650 SUPER", "GeForce GTX 1660", "GeForce GTX 1660 SUPER",
      "GeForce GTX 1660 Ti", "GeForce GTX 460", "GeForce GTX 480", "GeForce GTX 550 Ti", "GeForce GTX 560",
      "GeForce GTX 560 SE", "GeForce GTX 560 Ti", "GeForce GTX 570", "GeForce GTX 580", "GeForce GTX 580 X2",
      "GeForce GTX 590", "GeForce GTX 650", "GeForce GTX 650 Ti", "GeForce GTX 650 Ti Boost", "GeForce GTX 660",
      "GeForce GTX 660 Ti", "GeForce GTX 670", "GeForce GTX 680", "GeForce GTX 690", "GeForce GTX 750",
      "GeForce GTX 750 Ti", "GeForce GTX 760", "GeForce GTX 770", "GeForce GTX 780", "GeForce GTX 780 Ti",
      "GeForce GTX 950", "GeForce GTX 950 75W", "GeForce GTX 960", "GeForce GTX 970", "GeForce GTX 980",
      "GeForce GTX 980 Ti", "GeForce GTX Titan", "GeForce GTX Titan Black", "GeForce GTX Titan X",
      "GeForce GTX Titan Z", "GeForce RTX 2060", "GeForce RTX 2060 12GB", "GeForce RTX 2060 SUPER",
      "GeForce RTX 2070", "GeForce RTX 2070 Super", "GeForce RTX 2070 SUPER", "GeForce RTX 2080",
      "GeForce RTX 2080 Super", "GeForce RTX 2080 SUPER", "GeForce RTX 2080 Ti", "GeForce RTX 3050",
      "GeForce RTX 3050 6GB", "GeForce RTX 3050 8GB", "GeForce RTX 3060", "GeForce RTX 3060 12GB",
      "GeForce RTX 3060 8GB", "GeForce RTX 3060 Ti", "GeForce RTX 3060 Ti LHR", "GeForce RTX 3070",
      "GeForce RTX 3070 LHR", "GeForce RTX 3070 Ti", "GeForce RTX 3080", "GeForce RTX 3080 10GB",
      "GeForce RTX 3080 10GB LHR", "GeForce RTX 3080 12GB LHR", "GeForce RTX 3080 Ti", "GeForce RTX 3090",
      "GeForce RTX 3090 Ti", "GeForce RTX 4060", "GeForce RTX 4060 Ti", "GeForce RTX 4070",
      "GeForce RTX 4070 SUPER", "GeForce RTX 4070 Ti", "GeForce RTX 4070 Ti SUPER", "GeForce RTX 4080",
      "GeForce RTX 4080 SUPER", "GeForce RTX 4090", "GeForce RTX 5050", "GeForce RTX 5060",
      "GeForce RTX 5060 Ti", "Geforce RTX 5070", "GeForce RTX 5070", "GeForce RTX 5070", "Geforce RTX 5070 Ti",
      "GeForce RTX 5070 Ti", "Geforce RTX 5080", "GeForce RTX 5080", "GeForce RTX 5090",
      "GeForce RTX™ 5060 Ti White OC 16GB", "GeForce® GTX 1650 SUPER", "GP102", "GP104", "GP106-400-A1",
      "GP107", "GP108", "Intel ARC B580", "Intel B580", "Lexa", "Navi 10", "Navi 10 XT", "Navi 21", "NVIDIA",
      "NVS 810", "Polaris 20", "Polaris 20 XL", "Polaris 21", "Polaris 30", "Quadro 2000D", "Quadro 410",
      "Quadro GP100", "Quadro GV100", "Quadro K1200", "Quadro K2200", "Quadro K4000", "Quadro K420",
      "Quadro K4200", "Quadro K5200", "Quadro K600", "Quadro K6000", "Quadro K620", "Quadro M2000",
      "Quadro M5000", "Quadro M6000", "Quadro NVS 295", "Quadro P1000", "Quadro P2000", "Quadro P2200",
      "Quadro P400", "Quadro P4000", "Quadro P600", "Quadro P6000", "Quadro P620", "Quadro RTX 4000",
      "Quadro RTX 5000", "Quadro RTX 6000", "Quadro RTX 8000", "Radeon AI PRO R9700 AI TOP 32G",
      "Radeon HD 4670", "Radeon HD 5450", "Radeon HD 6450", "Radeon HD 6570", "Radeon HD 6970",
      "Radeon HD 7750", "Radeon HD 7770", "Radeon HD 7770 GHz Edition", "Radeon HD 7850", "Radeon HD 7870",
      "Radeon HD 7870 GHz Edition", "Radeon HD 7950", "Radeon HD 7970", "Radeon Pro Duo Polaris",
      "Radeon Pro VII", "Radeon Pro W5500", "Radeon Pro W5700", "Radeon PRO W6400", "Radeon PRO W6600",
      "Radeon PRO W6800", "Radeon PRO W7500", "Radeon PRO W7600", "Radeon PRO W7700", "Radeon PRO W7800",
      "Radeon PRO W7900", "Radeon Pro WX 2100", "Radeon Pro WX 3100", "Radeon Pro WX 3200",
      "Radeon Pro WX 4100", "Radeon Pro WX 5100", "Radeon Pro WX 7100", "Radeon Pro WX 8200",
      "Radeon Pro WX 9100", "Radeon R5 220", "Radeon R5 230", "Radeon R7 240", "Radeon R7 250",
      "Radeon R7 350", "Radeon R7 360", "Radeon R7 370", "Radeon R9 270", "Radeon R9 270X", "Radeon R9 280",
      "Radeon R9 280X", "Radeon R9 290", "Radeon R9 290X", "Radeon R9 295X2", "Radeon R9 380", "Radeon R9 380X",
      "Radeon R9 390", "Radeon R9 390X", "Radeon R9 390X2", "Radeon R9 Fury", "Radeon R9 Nano", "Radeon RX 460",
      "Radeon RX 470", "Radeon RX 480", "Radeon RX 550 - 512", "Radeon RX 550 - 640", "Radeon RX 5500 XT",
      "Radeon RX 560", "Radeon RX 560 - 1024", "Radeon RX 560 - 896", "Radeon RX 5600 XT", "Radeon RX 570",
      "Radeon RX 5700", "Radeon RX 5700 XT", "Radeon RX 580", "Radeon RX 590", "Radeon RX 6400",
      "Radeon RX 6500 XT", "Radeon RX 6600", "Radeon RX 6600 XT", "Radeon RX 6650 XT", "Radeon RX 6700",
      "Radeon RX 6700 XT", "Radeon RX 6750 XT", "Radeon RX 6800", "Radeon RX 6800 XT", "Radeon RX 6900 XT",
      "Radeon RX 6950 XT", "Radeon RX 7600", "Radeon RX 7600 XT", "Radeon RX 7700 XT", "Radeon RX 7800 XT",
      "Radeon RX 7900 GRE", "Radeon RX 7900 XT", "Radeon RX 7900 XTX", "Radeon RX 9060 XT", "Radeon RX 9070",
      "Radeon RX 9070 XT", "Radeon RX Vega 56", "Radeon RX VEGA 56", "Radeon RX VEGA 64", "Radeon VII",
      "RTX 2000 Ada Generation", "RTX 2080 TI", "RTX 4000 Ada Generation", "RTX 4000 SFF Ada Generation",
      "RTX 4500 Ada Generation", "RTX 5000 Ada Generation", "RTX 6000 Ada Generation", "RTX A1000",
      "RTX A2000 12GB", "RTX A2000 6GB", "RTX A4000", "RTX A4500", "RTX A5000", "RTX A5500", "RTX A6000",
      "RX 5500 XT", "RX 5700", "RX 6600 XT", "RX 6750 XT", "T1000 4GB", "T1000 8GB", "T400 2GB", "T400 4GB",
      "T600", "TITAN RTX", "Titan V", "Titan X (Pascal)", "Titan Xp", "TU102", "TU104", "TU104-450-A1",
      "Vega 10 XT", "Vega 20 XT", "Vega Frontier Edition"
    ]
  },
  {
    title: "Memory Type",
    type: "checkbox",
    options: [
      "DDR2", "DDR3", "DDR4", "DDR5", "GDDR3", "GDDR5", "GDDR5X", "GDDR6", "GDDR6X", "GDDR7", "HBM", "HBM2", "SDDR4"
    ]
  },
  {
    title: "Interface",
    type: "checkbox",
    options: [
      "PCI Express 3.0", "PCI Express 3.0 x16", "PCI Express 4.0", "PCI Express 4.0 x 16", "PCI Express 4.0 x16",
      "PCI Express 4.0 x4", "PCI Express 4.0 x8", "PCI Express x16 3.0", "PCI Express® Gen 4", "PCI Express® Gen 4 x 8",
      "PCI Express® Gen 4 x16 (uses x8)", "PCI-E 3.0 x 16", "PCI-Express 4.0", "PCI-Express 4.0 x8", "PCIe 3.0",
      "PCIe 3.0 x16", "PCIe 3.0 x8", "PCIe 4.0", "PCIe 4.0 x 16", "PCIe 4.0 x16", "PCIe 4.0 x8", "PCIe 5.0 x16",
      "PCIe 5.0 x16", "PCIe 5.0 x16, PCIe x8", "PCIe 5.0 x8", "PCIe x1", "PCIe x16", "PCIe x16 GC-HPWR", "PCIe x8"
    ]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "Acer", "AMD", "ASRock", "Asus", "ASUS", "ATI", "Biostar", "Club 3D", "Colorful", "Corsair", "Dell", "Diamond",
      "EVGA", "Gainward", "GALAX", "Gigabyte", "GIGABYTE", "GUNNIR", "HP", "Inno3D", "Intel", "KFA2", "Lenovo", "MAXSUN",
      "MSI", "NVIDIA", "ONIX", "Palit", "PNY", "PowerColor", "Sapphire", "SAPPHIRE", "Sapphire Technology",
      "SONNET Technologies", "Sparkle", "Various", "VisionTek", "XFX", "Yeston", "Zotac", "ZOTAC"
    ]
  },
  {
    title: "Color",
    type: "checkbox",
    options: [
      "Black", "BLACK", "BLUE", "BROWN", "GOLD", "GREEN", "GREY", "ORANGE", "PINK", "PURPLE", "RED", "RGB", "WHITE", "YELLOW"
    ]
  },
  {
    title: "Memory Size",
    type: "range",
    min: 0,
    max: 48,
    unit: "GB"
  },
  {
    title: "TDP",
    type: "range",
    min: 0,
    max: 850,
    unit: "W"
  },
  {
    title: "Card Length",
    type: "range",
    min: 0,
    max: 369,
    unit: "mm"
  }
];