//client/src/components/PCBuilder/Modal/MockData/Power Supply/PowerSupplyFilter.js
export const powerSupplyFilter = [
  {
    title: "Price",
    type: "range",
    min: 1400,
    max: 200000,
    unit: "₱"
  },
  {
    title: "Form Factor",
    type: "checkbox",
    options: [
      "ATX", "ATX/EPS", "ATX12V v2.4, EPS 2.92", "Flex ATX", "Mini-ITX", "SFX", "SFX-L", "TFX"
    ]
  },
  {
    title: "Efficiency Rating",
    type: "checkbox",
    options: [
      "80 PLUS", "80 PLUS Bronze", "80 Plus Gold", "80 PLUS Gold", "80 PLUS Platinum",
      "80 PLUS PLATINUM", "80 PLUS Silver", "80 PLUS Standard", "80 PLUS Standard Certified",
      "80 PLUS Titanium", "80+", "80+ Bronze", "80+ Gold", "80+ Platinum", "80+ Silver",
      "80+ Titanium", "Bronze", "Cybenetics Platinum", "Gold", "White"
    ]
  },
  {
    title: "Modularity",
    type: "checkbox",
    options: [
      "Full", "Full Modular", "Fully", "Fully modular", "Fully Modular", "Modular", "No",
      "Non-Modular", "Semi-modular", "Semi-Modular"
    ]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "1STPLAYER", "ABS", "ADATA", "Aerocool", "Antec", "Apevia", "Apex", "ARESGAME", "ASRock",
      "Asus", "ASUS", "Athena Power", "Azza", "be quiet!", "BFG", "BitFenix", "Chieftec",
      "Cooler Master", "CoolMax", "Corsair", "CORSAIR", "Cougar", "Cyonic", "Deepcool", "Diablotek",
      "Dynapower", "E-Power", "ENDORFY", "Enermax", "Enhance", "EVGA", "FirePower", "Fractal Design",
      "FSP Group", "G.Skill", "GALAX", "GAMDIAS", "GameMax", "Gigabyte", "GIGABYTE", "HEC", "High Power",
      "In Win", "Insignia", "Inter-Tech", "iStarUSA", "iTek", "Kingwin", "KOLINK", "Kuroutoshikou",
      "LC-Power", "LEPA", "Lian Li", "Linkworld", "Logisys", "Mars Gaming", "Mistel", "Montech", "MSI",
      "Mushkin", "Nexus", "Nfortec", "Noua", "NOX", "NZXT", "OCZ", "PC Cooler", "PC Power & Cooling",
      "Phanteks", "PowerSpec", "Raidmax", "RAIJINTEK", "Razer", "Replace Power", "RIOTORO", "Rocketfish",
      "Rosewill", "SAMA", "Seasonic", "SeaSonic", "Segotep", "Sentey", "SHARKOON", "SilentiumPC",
      "Silverstone", "SilverStone", "SilverStone Technology", "sohoo", "Solid Gear", "Sparkle", "StarTech",
      "Sunbeam", "Super Flower", "Tacens", "Tecnoware", "Thermalright", "Thermaltake", "Thortech", "Topower",
      "TUNIQ", "Ultra", "Vetroo", "Vida", "VisionTek", "VIVO", "XClio", "XFX", "Xigmatek", "Xilence", "Xion",
      "YEYIAN", "Zalman"
    ]
  },
  {
    title: "Color",
    type: "checkbox",
    options: [
      "BLACK", "BLUE", "BROWN", "GOLD", "GREEN", "GREY", "ORANGE", "PINK", "PURPLE",
      "RED", "RGB", "WHITE", "YELLOW"
    ]
  },
  {
    title: "Fanless",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Wattage",
    type: "range",
    min: 200,
    max: 2800,
    unit: "W"
  },
  {
    title: "Length",
    type: "range",
    min: 0,
    max: 241,
    unit: "mm"
  },
  {
    title: "EPS 8-pin (CPU)",
    type: "range",
    min: 0,
    max: 4,
    unit: ""
  },
  {
    title: "PCIe 12VHPWR",
    type: "range",
    min: 0,
    max: 4,
    unit: ""
  },
  {
    title: "PCIe 6+2-pin",
    type: "range",
    min: 0,
    max: 18,
    unit: ""
  },
  {
    title: "SATA",
    type: "range",
    min: 0,
    max: 20,
    unit: ""
  },
  {
    title: "Molex 4-pin",
    type: "range",
    min: 0,
    max: 14,
    unit: ""
  }
];