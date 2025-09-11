//client/src/components/PCBuilder/Modal/MockData/Motherboard/MotherboardFilter.js
export const motherboardFilter = [
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
      "2 x G34", "2 x LGA1366", "2 x LGA2011", "2 x LGA2011-3", "2 x LGA2011-3 Narrow",
      "AM1", "AM2", "AM2+", "AM3", "AM3+", "AM4", "AM5", "FM1", "FM2", "FM2+",
      "Integrated AMD", "Integrated Atom", "Integrated Pentium", "Integrated Xeon D",
      "LGA1150", "LGA1151", "LGA1151v2", "LGA1155", "LGA1156", "LGA1200", "LGA1366",
      "LGA1700", "LGA1851", "LGA2011", "LGA2011-3", "LGA2011-3 Narrow", "LGA2066",
      "LGA3647", "LGA775", "sTR5", "sTRX4", "TR4"
    ]
  },
  {
    title: "Form Factor",
    type: "checkbox",
    options: [
      "ATX", "EATX", "Flex ATX", "HPTX", "Micro ATX", "Mini DTX", "Mini-ITX",
      "SSI CEB", "SSI EEB", "Thin Mini-ITX", "XL ATX"
    ]
  },
  {
    title: "Chipset",
    type: "checkbox",
    options: [
      "AMD 570X", "AMD 760G", "AMD 770", "AMD 785G", "AMD 790X", "AMD 870", "AMD 880G",
      "AMD 890FX", "AMD 890GX", "AMD 970", "AMD 990FX", "AMD 990X", "AMD A320", "AMD A520",
      "AMD A55", "AMD A620", "AMD A68H", "AMD A68M", "AMD A75", "AMD A78", "AMD A85X",
      "AMD A88X", "AMD AM1", "AMD B350", "AMD B450", "AMD B550", "AMD B650", "AMD B650E",
      "AMD B840", "AMD B850", "AMD SR5690", "AMD TRX40", "AMD TRX50", "AMD X370", "AMD X399",
      "AMD X470", "AMD X570", "AMD X670", "AMD X670E", "AMD X870", "AMD X870E", "CPU Integrated",
      "Intel 5520", "Intel B150", "Intel B250", "Intel B360", "Intel B365", "Intel B43", "Intel B460",
      "Intel B560", "Intel B65", "Intel B660", "Intel B75", "Intel B760", "Intel B85", "Intel B860",
      "Intel C204", "Intel C222", "Intel C224", "Intel C226", "Intel C232", "Intel C236", "Intel C242",
      "Intel C246", "Intel C602", "Intel C602J", "Intel C606", "Intel C612", "Intel C621", "Intel G31",
      "Intel G33", "Intel G41", "Intel G43", "Intel G45", "Intel H110", "Intel H170", "Intel H270",
      "Intel H310", "Intel H370", "Intel H410", "Intel H470", "Intel H510", "Intel H55", "Intel H57",
      "Intel H570", "Intel H61", "Intel H610", "Intel H67", "Intel H670", "Intel H77", "Intel H770",
      "Intel H81", "Intel H810", "Intel H87", "Intel H97", "Intel NM10", "Intel P35", "Intel P43",
      "Intel P45", "Intel P55", "Intel P67", "Intel Q170", "Intel Q270", "Intel Q370", "Intel Q45",
      "Intel Q470", "Intel Q57", "Intel Q570", "Intel Q67", "Intel Q670", "Intel Q77", "Intel Q87",
      "Intel X299", "Intel X58", "Intel X79", "Intel X99", "Intel Z170", "Intel Z270", "Intel Z370",
      "Intel Z390", "Intel Z490", "Intel Z590", "Intel Z68", "Intel Z690", "Intel Z75", "Intel Z77",
      "Intel Z790", "Intel Z87", "Intel Z890", "Intel Z97", "NVIDIA GeForce 6100", "NVIDIA GeForce 7025",
      "NVIDIA GeForce 7025 / nForce 630a", "NVIDIA GeForce 7050", "NVIDIA GeForce 9300", "NVIDIA ION",
      "NVIDIA nForce 430 MCP", "NVIDIA nForce 750i SLI", "VIA P4M890"
    ]
  },
  {
    title: "RAM Type",
    type: "checkbox",
    options: ["DDR2", "DDR3", "DDR4", "DDR5"]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "ASRock", "Asus", "ASUS", "Biostar", "Colorful", "ECS", "EVGA", "Foxconn", "Gigabyte",
      "Intel", "Jetway", "MAXSUN", "MSI", "NZXT", "Supermicro", "Zotac"
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
    title: "ECC Support",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "RAID Support",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "BIOS Flashback",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Clear CMOS Button",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Maximum Memory",
    type: "range",
    min: 0,
    max: 2048,
    unit: "GB"
  },
  {
    title: "Memory Slots",
    type: "range",
    min: 1,
    max: 16,
    unit: ""
  },
  {
    title: "SATA 6 Gb/s Ports",
    type: "range",
    min: 0,
    max: 13,
    unit: "Ports"
  },
  {
    title: "SATA 3 Gb/s Ports",
    type: "range",
    min: 0,
    max: 10,
    unit: "Ports"
  },
  {
    title: "U.2 Ports",
    type: "range",
    min: 0,
    max: 2,
    unit: "Ports"
  },
  {
    title: "USB 2.0 Headers",
    type: "range",
    min: 0,
    max: 6,
    unit: "Headers"
  },
  {
    title: "USB 3.2 Gen 1 Headers",
    type: "range",
    min: 0,
    max: 8,
    unit: "Headers"
  },
  {
    title: "USB 3.2 Gen 2 Headers",
    type: "range",
    min: 0,
    max: 8,
    unit: "Headers"
  },
  {
    title: "USB 3.2 Gen 2x2 Headers",
    type: "range",
    min: 0,
    max: 2,
    unit: "Headers"
  },
  {
    title: "USB 4 Headers",
    type: "range",
    min: 0,
    max: 2,
    unit: "Headers"
  }
];