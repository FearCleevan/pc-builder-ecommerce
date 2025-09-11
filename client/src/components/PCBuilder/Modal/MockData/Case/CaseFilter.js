//client/src/components/PCBuilder/Modal/MockData/Case/CaseFilter.js
export const caseFilter = [
  {
    title: "Price",
    type: "range",
    min: 38.99,
    max: 1399.99,
    unit: "$"
  },
  {
    title: "Form Factor",
    type: "checkbox",
    options: [
      "ATX Desktop", "ATX Full Tower", "ATX Mid Tower", "ATX Mini Tower",
      "ATX Test Bench", "EATX", "EATX Full Tower", "EATX Mid Tower",
      "HTPC", "Micro ATX Desktop", "Micro ATX Mid Tower", "Micro ATX Mini Tower",
      "Micro ATX Slim Tower", "Mini-ITX", "Mini-ITX Desktop", "Mini-ITX Test Bench",
      "Mini-ITX Tower"
    ]
  },
  {
    title: "Side Panel",
    type: "checkbox",
    options: [
      "Acrylic", "Aluminum", "Mesh", "None", "Solid", "Steel",
      "Tempered Glass", "Tinted Acrylic", "Tinted Tempered Glass"
    ]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "Cooler Master", "Corsair", "Thermaltake", "NZXT", "Lian Li", "Fractal Design",
      "be quiet!", "Antec", "Phanteks", "ASUS", "MSI", "Gigabyte", "DeepCool", "Cougar",
      "SilverStone", "In Win", "GALAX", "Razer", "AeroCool", "EVGA"
    ]
  },
  {
    title: "Color",
    type: "checkbox",
    options: [
      "BLACK", "BLUE", "BROWN", "GOLD", "GRAY", "GREEN", "GREY", "ORANGE",
      "PINK", "PURPLE", "RED", "RGB", "WHITE", "YELLOW"
    ]
  },
  {
    title: "Transparent Side Panel",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Max GPU Length",
    type: "range",
    min: 0,
    max: 635,
    unit: "mm"
  },
  {
    title: "Max CPU Cooler Height",
    type: "range",
    min: 0,
    max: 260,
    unit: "mm"
  },
  {
    title: "3.5\" Drive Bays",
    type: "range",
    min: 0,
    max: 20,
    unit: ""
  },
  {
    title: "2.5\" Drive Bays",
    type: "range",
    min: 0,
    max: 17,
    unit: ""
  },
  {
    title: "Expansion Slots",
    type: "range",
    min: 0,
    max: 12,
    unit: ""
  },
  {
    title: "Volume",
    type: "range",
    min: 0,
    max: 281.868,
    unit: "L"
  },
  {
    title: "Weight",
    type: "range",
    min: 0,
    max: 2246,
    unit: "lbs"
  }
];