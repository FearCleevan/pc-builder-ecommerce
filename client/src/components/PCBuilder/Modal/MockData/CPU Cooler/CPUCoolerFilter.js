//client/src/components/PCBuilder/Modal/MockData/CPU Cooler/CPUCoolerFilter.js
export const cpuCoolerFilter = [
  {
    title: "Price",
    type: "range",
    min: 3000,
    max: 150000,
    unit: "₱"
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "ABKONCORE", "ADATA", "Aerocool", "aigo", "Akasa", "Alpenföhn", "Alphacool",
      "Amazon", "AMD", "Antec", "APNX", "AQIRYS", "Arctic", "ARCTIC", "ARESGAME",
      "Asus", "ASUS", "Azza", "be quiet!", "BitFenix", "Cooler Master", "Corsair",
      "Cougar", "CRYORIG", "darkFlash", "DarkFlash", "Deepcool", "Dynatron", "EK",
      "ENDORFY", "Enermax", "Evercool", "EVGA", "Fractal Design", "FSP Group", "GAMDIAS",
      "GameMax", "Gelid Solutions", "Geometric Future", "Gigabyte", "GIGABYTE", "HYTE",
      "iBuypower", "Iceberg Thermal", "IceGiant", "ID-COOLING", "In Win", "Intel",
      "Inter-Tech", "iTek", "Jonsbo", "KOLINK", "LC-Power", "Lian Li", "Mars Gaming",
      "Masscool", "Montech", "MSI", "Noctua", "NoFan", "Noua", "NZXT", "Ocypus",
      "PC Cooler", "Phanteks", "Prolimatech", "Raidmax", "RAIJINTEK", "Razer", "Reeven",
      "Rosewill", "SAMA", "Sapphire", "Scythe", "SilentiumPC", "SilenX", "Silverstone",
      "StarTech", "Sunbeam", "Syba", "TEAMGROUP", "Tempest", "Thermalright", "Thermaltake",
      "Titan", "TRYX", "TUNIQ", "upHere", "Valkyrie", "Vetroo", "Xigmatek", "Xilence",
      "Yeston", "YEYIAN", "Zalman"
    ]
  },
  {
    title: "Color",
    type: "checkbox",
    options: [
      "BLACK", "BLUE", "BROWN", "GOLD", "GREEN", "GREY", "ORANGE", "PINK",
      "PURPLE", "RED", "RGB", "WHITE", "YELLOW"
    ]
  },
  {
    title: "Water Cooled",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Fanless",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Height",
    type: "range",
    min: 0,
    max: 397,
    unit: "mm"
  },
  {
    title: "Fan Size",
    type: "range",
    min: 0,
    max: 140,
    unit: "mm"
  },
  {
    title: "Fan Quantity",
    type: "range",
    min: 0,
    max: 3,
    unit: ""
  },
  {
    title: "Radiator Size",
    type: "range",
    min: 0,
    max: 420,
    unit: "mm"
  },
  {
    title: "Noise Level",
    type: "range",
    min: 0,
    max: 59.14,
    unit: "dB"
  },
  {
    title: "Fan RPM",
    type: "range",
    min: 0,
    max: 21500,
    unit: "RPM"
  }
];