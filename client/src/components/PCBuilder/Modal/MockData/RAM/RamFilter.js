//client/src/components/PCBuilder/Modal/MockData/RAM/RamFilter.js
export const ramFilter = [
  {
    title: "Price",
    type: "range",
    min: 5,
    max: 3794.99,
    unit: "$"
  },
  {
    title: "RAM Type",
    type: "checkbox",
    options: ["DDR1", "DDR2", "DDR3", "DDR4", "DDR5"]
  },
  {
    title: "Form Factor",
    type: "checkbox",
    options: [
      "184-pin DIMM (DDR1)", "200-pin SODIMM (DDR1)", "204-pin SODIMM (DDR3)",
      "240-pin DIMM (DDR2)", "240-pin DIMM (DDR3)", "260-pin SODIMM (DDR4)",
      "262-pin SODIMM (DDR5)", "288-pin DIMM", "288-pin DIMM (DDR4)",
      "288-pin DIMM (DDR5)", "DIMM", "UDIMM"
    ]
  },
  {
    title: "ECC",
    type: "checkbox",
    options: ["ECC", "Non-ECC"]
  },
  {
    title: "Registered",
    type: "checkbox",
    options: ["Registered", "Unbuffered"]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "Acer", "ADATA", "Addlink", "AMD", "Apacer", "Avexir", "Ballistix", "Biwin",
      "Corsair", "Crucial", "Dell", "EVGA", "G.Skill", "G.SKILL", "GeIL", "GIGABYTE",
      "GIGASTONE", "Gloway", "GOODRAM", "HP", "HyperX", "IBM", "KingBank", "KINGBANK",
      "Kingston", "Klevv", "Lenovo", "Lexar", "Micron", "Mushkin", "Neo Forza", "Netac",
      "OCZ", "OLoy", "OLOy", "Patriot", "PNY", "PROXMEM", "Samsung", "Silicon Power",
      "SK Hynix", "Supermicro", "TEAMGROUP", "Thermaltake", "Timetec", "Transcend",
      "v-color", "V-Color", "VisionTek", "Wintec"
    ]
  },
  {
    title: "Color",
    type: "checkbox",
    options: [
      "BLACK", "BLUE", "GOLD", "GREEN", "GREY", "ORANGE", "PINK", "PURPLE",
      "RED", "WHITE", "YELLOW"
    ]
  },
  {
    title: "Heat Spreader",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "RGB",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Speed",
    type: "range",
    min: 333,
    max: 8400,
    unit: "MHz"
  },
  {
    title: "Total Capacity",
    type: "range",
    min: 1,
    max: 512,
    unit: "GB"
  },
  {
    title: "Number of Modules",
    type: "range",
    min: 1,
    max: 8,
    unit: "Modules"
  },
  {
    title: "CAS Latency",
    type: "range",
    min: 0,
    max: 52,
    unit: ""
  },
  {
    title: "Module Height",
    type: "range",
    min: 0,
    max: 44,
    unit: "mm"
  }
];