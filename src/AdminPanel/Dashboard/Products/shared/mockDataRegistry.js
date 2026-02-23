import { caseData } from "../../../../components/PCBuilder/Modal/MockData/Case/Case";
import { caseFanData } from "../../../../components/PCBuilder/Modal/MockData/Case Fan/CaseFan";
import { cpuData } from "../../../../components/PCBuilder/Modal/MockData/CPU/CPU";
import { cpuCoolerData } from "../../../../components/PCBuilder/Modal/MockData/CPU Cooler/CPUCooler";
import { gpuData } from "../../../../components/PCBuilder/Modal/MockData/GPU/GPU";
import { headphonesData } from "../../../../components/PCBuilder/Modal/MockData/Headphones/Headphones";
import { keyboardData } from "../../../../components/PCBuilder/Modal/MockData/Keyboard/Keyboard";
import { microphoneData } from "../../../../components/PCBuilder/Modal/MockData/Microphone/Microphone";
import { monitorData } from "../../../../components/PCBuilder/Modal/MockData/Monitor/Monitor";
import { motherboardData } from "../../../../components/PCBuilder/Modal/MockData/Motherboard/Motherboard";
import { mouseData } from "../../../../components/PCBuilder/Modal/MockData/Mouse/Mouse";
import { powerSupplyData } from "../../../../components/PCBuilder/Modal/MockData/Power Suppy/PowerSupply";
import { ramData } from "../../../../components/PCBuilder/Modal/MockData/RAM/Ram";
import { speakerData } from "../../../../components/PCBuilder/Modal/MockData/Speaker/Speaker";
import { storageData } from "../../../../components/PCBuilder/Modal/MockData/Storage/Storage";
import { webcamData } from "../../../../components/PCBuilder/Modal/MockData/Webcam/Webcam";

const toTitle = (value = "") =>
  value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const deriveBrand = (specs = {}) =>
  specs.Manufacturer ||
  specs.Brand ||
  specs["Keyboard Brand"] ||
  specs["Mouse Brand"] ||
  "Generic";

const deriveSubcategory = (componentKey, specs = {}) => {
  if (componentKey === "case") return specs["Form Factor"] || "PC Case";
  if (componentKey === "case-fan") return specs.Size || "Case Fan";
  if (componentKey === "cpu-cooler") return specs.Type || "CPU Cooler";
  if (componentKey === "gpu") return specs.Chipset || "Graphics Card";
  if (componentKey === "motherboard") return specs["Form Factor"] || "Motherboard";
  if (componentKey === "ram") return specs.Type || "RAM";
  if (componentKey === "storage") return specs.Type || "Storage";
  if (componentKey === "power-supply") return specs["Form Factor"] || "PSU";
  return toTitle(componentKey);
};

const deriveSummary = (specs = {}) =>
  Object.entries(specs)
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" | ");

const createListingModel = (componentKey, item) => {
  const specs = item.specs || {};
  const images = Array.isArray(item.images)
    ? item.images.slice(0, 6)
    : item.image
      ? [item.image]
      : [];
  const stockCount = Number(item.stockCount ?? 0);

  return {
    id: item.id,
    name: item.name,
    image: images[0] || item.image || "",
    images,
    price: Number(item.price || 0),
    specs,
    specifications: { general: specs },
    stockCount,
    stock: stockCount,
    stockStatus: stockCount > 0 ? "in_stock" : "out_of_stock",
    brand: deriveBrand(specs),
    category: toTitle(componentKey),
    subcategory: deriveSubcategory(componentKey, specs),
    description: deriveSummary(specs) || item.name,
    short_description: deriveSummary(specs),
    sku: String(item.id || "").toUpperCase(),
    currency: "PHP",
    weight_kg: null,
    dimensions_cm: null,
    metadata: {
      tags: [componentKey],
      seo_keywords: [item.name],
      created_by: "mock-data",
    },
    componentType: componentKey,
    type: item.type || null,
    source: "mock",
  };
};

export const COMPONENT_REGISTRY = {
  case: { label: "Case", data: caseData, idPrefix: "case", includeType: true },
  "case-fan": {
    label: "Case Fan",
    data: caseFanData,
    idPrefix: "fan",
    includeType: false,
  },
  cpu: { label: "CPU", data: cpuData, idPrefix: "cpu", includeType: false },
  "cpu-cooler": {
    label: "CPU Cooler",
    data: cpuCoolerData,
    idPrefix: "cooler",
    includeType: false,
  },
  gpu: { label: "GPU", data: gpuData, idPrefix: "gpu", includeType: false },
  headphones: {
    label: "Headphones",
    data: headphonesData,
    idPrefix: "headphones",
    includeType: false,
  },
  keyboard: {
    label: "Keyboard",
    data: keyboardData,
    idPrefix: "keyboard",
    includeType: false,
  },
  microphone: {
    label: "Microphone",
    data: microphoneData,
    idPrefix: "microphone",
    includeType: false,
  },
  monitor: {
    label: "Monitor",
    data: monitorData,
    idPrefix: "monitor",
    includeType: false,
  },
  motherboard: {
    label: "Motherboard",
    data: motherboardData,
    idPrefix: "motherboard",
    includeType: false,
  },
  mouse: { label: "Mouse", data: mouseData, idPrefix: "mouse", includeType: false },
  "power-supply": {
    label: "Power Supply",
    data: powerSupplyData,
    idPrefix: "psu",
    includeType: false,
  },
  ram: { label: "RAM", data: ramData, idPrefix: "ram", includeType: false },
  speaker: {
    label: "Speaker",
    data: speakerData,
    idPrefix: "speaker",
    includeType: false,
  },
  storage: {
    label: "Storage",
    data: storageData,
    idPrefix: "storage",
    includeType: false,
  },
  webcam: {
    label: "Webcam",
    data: webcamData,
    idPrefix: "webcam",
    includeType: false,
  },
};

export const getComponentOptions = () =>
  Object.entries(COMPONENT_REGISTRY).map(([value, config]) => ({
    value,
    label: config.label,
  }));

export const getComponentTemplate = (componentKey) => {
  const config = COMPONENT_REGISTRY[componentKey];
  const sample = config?.data?.[0] || {};
  const specs = sample.specs || {};

  return {
    label: config?.label || "Product",
    idPrefix: config?.idPrefix || "product",
    includeType: Boolean(config?.includeType),
    defaultSpecs: { ...specs },
    specKeys: Object.keys(specs),
  };
};

export const getAllMockListingProducts = () =>
  Object.entries(COMPONENT_REGISTRY).flatMap(([componentKey, config]) =>
    (config.data || []).map((item) => createListingModel(componentKey, item))
  );
