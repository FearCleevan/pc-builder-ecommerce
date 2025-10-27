//client/src/components/PCBuilder/Modal/MockData/Storage/StorageFilter.js
export const storageFilter = [
  {
    title: "Price",
    type: "range",
    min: 350,
    max: 225000,
    unit: "₱"
  },
  {
    title: "Type",
    type: "checkbox",
    options: [
      "10000 RPM", "10500 RPM", "15000 RPM", "5000 RPM", "5200 RPM", "5400 RPM",
      "5640 RPM", "5700 RPM", "5900 RPM", "5940 RPM", "7200 RPM", "HDD", "Hybrid", "SSD"
    ]
  },
  {
    title: "Form Factor",
    type: "checkbox",
    options: [
      "2.5-inch", "2.5\"", "3.5 inches", "3.5-inch", "3.5-Inch", "3.5\"", "M.2",
      "M.2 2280", "M.2 2280 M Key", "M.2-22110", "M.2-2230", "M.2-2242", "M.2-2260",
      "M.2-2280", "mSATA", "PCIe"
    ]
  },
  {
    title: "Manufacturer",
    type: "checkbox",
    options: [
      "Acer", "ADATA", "Addlink", "AGI", "AITC Kingsman", "AMD", "Angelbird", "Apacer",
      "Asura", "Asus", "Axiom", "Biostar", "Biwin", "Centon", "Corsair", "Crucial",
      "CRUCIAL TECHNOLOGY", "Dell", "Drevo", "Enmotus", "Fantom Drives", "FanXiang",
      "Fastro", "FFF Smart Life Connected", "G.Skill", "GameStop", "Gigabyte", "GOODRAM",
      "Hitachi", "HP", "Hyundai Technology", "IBM", "Inland", "Integral", "Intel", "Intenso",
      "KingDian", "KingSpec", "Kingston", "Kingston Technology", "Kingston Technology Corp.",
      "KIOXIA", "Klevv", "Lenovo", "Leven", "Lexar", "Maxtor", "Micron", "MSI", "Mushkin",
      "MyDigitalSSD", "NEMIX RAM", "Neo Forza", "Netac", "Nextorage", "OCZ", "Orico", "OWC",
      "Oyen Digital", "Patriot", "Pioneer", "Plextor", "PNY", "Sabrent", "SABRENT", "Samsung",
      "SAMSUNG", "SanDisk", "Seagate", "Seagate Bare Drives", "Seagate Technology", "Silicon Power",
      "SK hynix", "SK Hynix", "Solidigm", "Supermicro", "Synology", "TC SUNBOW", "TCSunBow",
      "TEAMGROUP", "Timetec", "Titanium Micro", "Toshiba", "Transcend", "V7", "Verbatim",
      "VisionTek", "Water Panther", "WD", "WD_BLACK", "Western Digital", "XOC", "XPG", "YMTC",
      "Zalman", "Zotac"
    ]
  },
  {
    title: "NVMe",
    type: "checkbox",
    options: ["No", "Yes"]
  },
  {
    title: "Capacity",
    type: "range",
    min: 8,
    max: 26000,
    unit: "GB"
  }
];