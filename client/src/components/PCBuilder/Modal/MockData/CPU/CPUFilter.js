//client/src/components/PCBuilder/Modal/MockData/CPU/CPUFilter.js
export const cpuFilter = [
  {
    title: "Price",
    type: "range",
    min: 38.99,
    max: 1399.99,
    unit: "$"
  },
  {
    title: "Socket",
    type: "checkbox",
    options: [
      "AM3+", "AM4", "AM5", "FM2", "FM2+", "G34", "LGA1150", "LGA1151",
      "LGA1155", "LGA1200", "LGA1356", "LGA1700", "LGA1851", "LGA2011",
      "LGA2011-3", "LGA2066", "sTR5", "sTRX4", "TR4"
    ]
  },
  {
    title: "Microarchitecture",
    type: "checkbox",
    options: [
      "Alder Lake", "Arrow Lake", "Bristol Ridge", "Broadwell", "Bulldozer",
      "Cascade Lake", "Coffee Lake", "Coffee Lake Refresh", "Comet Lake",
      "Excavator", "Haswell", "Haswell Refresh", "Ivy Bridge", "Kaby Lake",
      "Piledriver", "Puma+", "Raptor Lake", "Raptor Lake Refresh", "Rocket Lake",
      "Sandy Bridge", "Skylake", "Skylake-X", "Steamroller", "Vishera", "Zen",
      "Zen 2", "Zen 3", "Zen 4", "Zen 5", "Zen+"
    ]
  },
  {
    title: "Integrated Graphics",
    type: "checkbox",
    options: [
      "AMD Radeon", "AMD Radeon 740M", "AMD Radeon 760M", "AMD Radeon 780M",
      "AMD Radeon HD 8000 Series", "AMD Radeon HD 8370D", "AMD Radeon HD 8470D",
      "AMD Radeon HD 8670D", "AMD Radeon R5 (on-die)", "AMD Radeon R7 (on-die)",
      "AMD Radeon Vega 11", "AMD Radeon Vega 3", "AMD Radeon Vega 7",
      "AMD Radeon Vega 8", "Intel HD Graphics", "Intel HD Graphics 2500",
      "Intel HD Graphics 4000", "Intel HD Graphics 4600", "Intel HD Graphics 510",
      "Intel HD Graphics 530", "Intel HD Graphics 630", "Intel HD Graphics P4600",
      "Intel HD Graphics P530", "Intel HD Graphics P630", "Intel Iris Pro Graphics 6200",
      "Intel UHD Graphics 610", "Intel UHD Graphics 630", "Intel UHD Graphics 710",
      "Intel UHD Graphics 730", "Intel UHD Graphics 750", "Intel UHD Graphics 770",
      "Intel Xe Graphics", "None", "Radeon", "Radeon HD 7480D", "Radeon HD 8000 Series",
      "Radeon HD 8370D", "Radeon HD 8650D", "Radeon R5 (on die)", "Radeon R7 (on-die)"
    ]
  },
  {
    title: "TDP",
    type: "range",
    min: 25,
    max: 350,
    unit: "W"
  },
  {
    title: "Core Count",
    type: "range",
    min: 2,
    max: 64,
    unit: "Cores"
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "AMD", "Intel"
    ]
  }
];